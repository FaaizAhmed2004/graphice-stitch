create table public.project_briefs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  artwork_description text not null,
  garment_type text,
  placement text,
  finished_width text,
  finished_height text,
  thread_colors text,
  machine_formats text,
  special_instructions text,
  sample_file_id uuid references public.project_files(id) on delete set null,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_project_brief_updated_at()
returns trigger language plpgsql security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger project_briefs_set_updated_at
before update on public.project_briefs
for each row execute procedure public.set_project_brief_updated_at();

alter table public.project_briefs enable row level security;

create policy "Project members view briefs" on public.project_briefs
for select using (exists (select 1 from public.projects where id = project_id and (client_id = auth.uid() or public.is_admin())));

create policy "Clients create their briefs" on public.project_briefs
for insert with check (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));

create policy "Clients update their briefs" on public.project_briefs
for update using (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()))
with check (exists (select 1 from public.projects where id = project_id and client_id = auth.uid()));

create policy "Admins manage briefs" on public.project_briefs
for all using (public.is_admin()) with check (public.is_admin());

create index project_briefs_project_id_idx on public.project_briefs(project_id);
