create type public.user_role as enum ('client', 'admin');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
create type public.project_status as enum ('brief', 'in_progress', 'review', 'revision', 'completed', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  phone text,
  role public.user_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  size text,
  notes text,
  status public.lead_status not null default 'new',
  owner_id uuid references public.profiles(id) on delete set null,
  converted_client_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  name text not null,
  service text not null,
  description text,
  status public.project_status not null default 'brief',
  due_date date,
  quoted_amount numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  storage_path text not null,
  file_type text,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, company_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'company_name');
  return new;
end;
$$;

create or replace function public.prevent_role_escalation()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role
    and not public.is_admin()
    and coalesce(auth.jwt() ->> 'role', '') <> 'service_role' then
    raise exception 'Only admins can change user roles';
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create trigger protect_profile_role
before update on public.profiles
for each row execute procedure public.prevent_role_escalation();

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.projects enable row level security;
alter table public.project_files enable row level security;
alter table public.messages enable row level security;
alter table public.cms_pages enable row level security;

create policy "Users can view their profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "Users can update their profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "Anyone can create a lead" on public.leads for insert with check (true);
create policy "Admins manage leads" on public.leads for all using (public.is_admin()) with check (public.is_admin());
create policy "Clients view converted leads" on public.leads for select using (converted_client_id = auth.uid());

create policy "Clients view their projects" on public.projects for select using (client_id = auth.uid() or public.is_admin());
create policy "Admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "Clients create projects" on public.projects for insert with check (client_id = auth.uid());

create policy "Project members view files" on public.project_files for select using (exists (select 1 from public.projects where id = project_id and (client_id = auth.uid() or public.is_admin())));
create policy "Project members upload files" on public.project_files for insert with check (uploaded_by = auth.uid() and exists (select 1 from public.projects where id = project_id and (client_id = auth.uid() or public.is_admin())));
create policy "Admins manage files" on public.project_files for all using (public.is_admin()) with check (public.is_admin());

create policy "Project members view messages" on public.messages for select using (exists (select 1 from public.projects where id = project_id and (client_id = auth.uid() or public.is_admin())));
create policy "Project members send messages" on public.messages for insert with check (sender_id = auth.uid() and exists (select 1 from public.projects where id = project_id and (client_id = auth.uid() or public.is_admin())));
create policy "Admins manage messages" on public.messages for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can view published CMS pages" on public.cms_pages for select using (published = true or public.is_admin());
create policy "Admins manage CMS pages" on public.cms_pages for all using (public.is_admin()) with check (public.is_admin());

create index leads_status_idx on public.leads(status);
create index projects_client_id_idx on public.projects(client_id);
create index projects_status_idx on public.projects(status);
create index messages_project_id_idx on public.messages(project_id);

insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false)
on conflict (id) do nothing;

create policy "Project members can upload project files" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'project-files'
  and exists (
    select 1 from public.projects
    where id = (storage.foldername(name))[1]::uuid
    and (client_id = auth.uid() or public.is_admin())
  )
);

create policy "Project members can view project files" on storage.objects
for select to authenticated
using (
  bucket_id = 'project-files'
  and exists (
    select 1 from public.projects
    where id = (storage.foldername(name))[1]::uuid
    and (client_id = auth.uid() or public.is_admin())
  )
);
