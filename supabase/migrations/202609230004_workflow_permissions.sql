create table if not exists public.order_approvals (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade,
  file_id uuid references public.files(id) on delete set null,
  decision text not null check (decision in ('approved', 'revision_requested')),
  comment text,
  decided_by uuid not null references public.profiles(id) on delete cascade,
  decided_at timestamptz not null default now()
);

alter table public.order_approvals enable row level security;
create policy "Order members view approvals" on public.order_approvals for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Clients decide approvals" on public.order_approvals for insert with check (client_id = auth.uid() and decided_by = auth.uid());
create policy "Staff manage approvals" on public.order_approvals for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());

create policy "Company owners manage members" on public.company_members for all using (exists (select 1 from public.companies where id = company_id and owner_id = auth.uid()) or public.is_staff_or_admin()) with check (exists (select 1 from public.companies where id = company_id and owner_id = auth.uid()) or public.is_staff_or_admin());
create policy "Users update own message reads" on public.conversation_messages for update using (exists (select 1 from public.conversations where id = conversation_id and (client_id = auth.uid() or public.is_staff_or_admin()))) with check (exists (select 1 from public.conversations where id = conversation_id and (client_id = auth.uid() or public.is_staff_or_admin())));

create index if not exists order_approvals_order_id_idx on public.order_approvals(order_id);
