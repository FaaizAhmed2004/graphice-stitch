create table public.project_activity (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null check (event_type in ('created', 'status_changed', 'file_uploaded', 'message_sent')),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger leads_set_updated_at
before update on public.leads
for each row execute procedure public.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

create trigger cms_pages_set_updated_at
before update on public.cms_pages
for each row execute procedure public.set_updated_at();

create or replace function public.record_project_activity()
returns trigger language plpgsql security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.project_activity (project_id, actor_id, event_type, details)
    values (new.id, auth.uid(), 'created', jsonb_build_object('name', new.name));
  elsif old.status is distinct from new.status then
    insert into public.project_activity (project_id, actor_id, event_type, details)
    values (new.id, auth.uid(), 'status_changed', jsonb_build_object('from', old.status, 'to', new.status));
    insert into public.notifications (recipient_id, project_id, title, body)
    values (new.client_id, new.id, 'Project status updated', 'Your project is now ' || replace(new.status::text, '_', ' ') || '.');
  end if;
  return new;
end;
$$;

create trigger projects_record_activity
after insert or update of status on public.projects
for each row execute procedure public.record_project_activity();

create or replace function public.record_message_activity()
returns trigger language plpgsql security definer
set search_path = public
as $$
declare
  client_id uuid;
  recipient_id uuid;
begin
  select p.client_id into client_id from public.projects p where p.id = new.project_id;
  recipient_id := case when client_id = new.sender_id then (select id from public.profiles where role = 'admin' order by created_at limit 1) else client_id end;
  insert into public.project_activity (project_id, actor_id, event_type, details)
  values (new.project_id, new.sender_id, 'message_sent', jsonb_build_object('message_id', new.id));
  if recipient_id is not null and recipient_id <> new.sender_id then
    insert into public.notifications (recipient_id, project_id, title, body)
    values (recipient_id, new.project_id, 'New project message', left(new.body, 140));
  end if;
  return new;
end;
$$;

create trigger messages_record_activity
after insert on public.messages
for each row execute procedure public.record_message_activity();

create or replace function public.record_file_activity()
returns trigger language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.project_activity (project_id, actor_id, event_type, details)
  values (new.project_id, new.uploaded_by, 'file_uploaded', jsonb_build_object('file_id', new.id, 'name', new.name));
  return new;
end;
$$;

create trigger project_files_record_activity
after insert on public.project_files
for each row execute procedure public.record_file_activity();

alter table public.project_activity enable row level security;
alter table public.notifications enable row level security;

create policy "Project members view activity" on public.project_activity
for select using (exists (select 1 from public.projects where id = project_id and (client_id = auth.uid() or public.is_admin())));

create policy "Admins manage activity" on public.project_activity
for all using (public.is_admin()) with check (public.is_admin());

create policy "Users view their notifications" on public.notifications
for select using (recipient_id = auth.uid() or public.is_admin());

create policy "Users mark their notifications read" on public.notifications
for update using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());

create policy "Admins manage notifications" on public.notifications
for all using (public.is_admin()) with check (public.is_admin());

create policy "Project members delete their files" on public.project_files
for delete using (uploaded_by = auth.uid() or public.is_admin());

create index project_activity_project_id_idx on public.project_activity(project_id, created_at desc);
create index notifications_recipient_id_idx on public.notifications(recipient_id, created_at desc);