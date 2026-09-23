do $$
begin
  alter type public.user_role add value if not exists 'staff';
exception when duplicate_object then null;
end $$;

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists email text,
  add column if not exists avatar_url text,
  add column if not exists company_website text,
  add column if not exists country text,
  add column if not exists address text,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists postal_code text,
  add column if not exists timezone text;

update public.profiles
set email = coalesce(email, (select email from auth.users where auth.users.id = profiles.id))
where email is null;

create type public.quote_status as enum ('new', 'reviewing', 'quoted', 'client_questions', 'accepted', 'rejected', 'expired', 'converted');
create type public.order_status as enum ('quote_requested', 'quote_sent', 'awaiting_payment', 'payment_received', 'pending_review', 'in_progress', 'proof_ready', 'awaiting_client_approval', 'revision_requested', 'revision_in_progress', 'approved', 'finalizing', 'completed', 'cancelled');
create type public.invoice_status as enum ('draft', 'sent', 'pending', 'paid', 'overdue', 'cancelled');
create type public.payment_status as enum ('pending', 'processing', 'paid', 'failed', 'refunded');
create type public.payment_method as enum ('stripe', 'paypal', 'bank_transfer', 'manual');
create type public.revision_status as enum ('requested', 'accepted', 'rejected', 'in_progress', 'completed');
create type public.file_category as enum ('original_artwork', 'reference', 'proof', 'revision', 'final', 'invoice', 'other');

create sequence if not exists public.quote_number_seq start 1;
create sequence if not exists public.order_number_seq start 1;
create sequence if not exists public.invoice_number_seq start 1;

create or replace function public.next_document_number(prefix text, sequence_name text)
returns text language plpgsql security definer set search_path = public
as $$
declare next_value bigint;
begin
  if sequence_name = 'quote' then next_value := nextval('public.quote_number_seq');
  elsif sequence_name = 'order' then next_value := nextval('public.order_number_seq');
  elsif sequence_name = 'invoice' then next_value := nextval('public.invoice_number_seq');
  else raise exception 'Unsupported document sequence'; end if;
  return prefix || '-' || extract(year from now())::text || '-' || lpad(next_value::text, 4, '0');
end;
$$;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null, website text, industry text, country text, address text, tax_id text, billing_email text, logo_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade, member_role text not null default 'requester',
  created_at timestamptz not null default now(), unique(company_id, user_id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, category text not null,
  description text, short_description text, featured_image text, starting_price numeric(10,2), pricing_type text default 'starting_at',
  delivery_time text, features jsonb not null default '[]'::jsonb, faq jsonb not null default '[]'::jsonb,
  seo_title text, seo_description text, published boolean not null default true, featured boolean not null default false,
  sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(), service_id uuid references public.services(id) on delete set null,
  name text not null, price numeric(10,2) not null, currency text not null default 'USD', description text,
  features jsonb not null default '[]'::jsonb, delivery_time text, revisions integer, active boolean not null default true,
  featured boolean not null default false, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(), quote_number text unique not null default public.next_document_number('QT', 'quote'),
  client_id uuid not null references public.profiles(id) on delete cascade, company_id uuid references public.companies(id) on delete set null,
  service_id uuid references public.services(id) on delete set null, service text not null, design_type text, quantity integer not null default 1,
  required_format text, size text, color_requirements text, deadline date, priority text, description text not null,
  additional_instructions text, status public.quote_status not null default 'new', price numeric(10,2), estimated_delivery text,
  admin_notes text, included_revisions integer, terms text, expires_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(), order_number text unique not null default public.next_document_number('ORD', 'order'),
  client_id uuid not null references public.profiles(id) on delete cascade, company_id uuid references public.companies(id) on delete set null,
  quote_id uuid references public.quotes(id) on delete set null, service text not null, description text, status public.order_status not null default 'quote_requested',
  assigned_to uuid references public.profiles(id) on delete set null, order_date timestamptz not null default now(), deadline date,
  price numeric(10,2), payment_status public.payment_status not null default 'pending', client_notes text, internal_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
  service text not null, quantity integer not null default 1, unit_price numeric(10,2) not null default 0, description text
);
create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
  from_status public.order_status, to_status public.order_status not null, changed_by uuid references public.profiles(id) on delete set null,
  note text, created_at timestamptz not null default now()
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(), client_id uuid not null references public.profiles(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null, order_id uuid references public.orders(id) on delete cascade,
  name text not null, storage_path text not null, bucket text not null default 'client-files', mime_type text, file_size bigint,
  uploaded_by uuid not null references public.profiles(id) on delete cascade, category public.file_category not null default 'other',
  version integer not null default 1, created_at timestamptz not null default now()
);
create table if not exists public.revisions (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade, revision_number integer not null,
  description text not null, priority text, status public.revision_status not null default 'requested', response text,
  created_by uuid not null references public.profiles(id) on delete cascade, completed_at timestamptz,
  created_at timestamptz not null default now(), unique(order_id, revision_number)
);
create table if not exists public.revision_comments (
  id uuid primary key default gen_random_uuid(), revision_id uuid not null references public.revisions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade, body text not null, created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(), client_id uuid not null references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete cascade, subject text not null, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade, user_id uuid not null references public.profiles(id) on delete cascade,
  primary key(conversation_id, user_id)
);
create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade, body text not null, read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(), invoice_number text unique not null default public.next_document_number('INV', 'invoice'),
  client_id uuid not null references public.profiles(id) on delete cascade, company_id uuid references public.companies(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null, status public.invoice_status not null default 'draft', currency text not null default 'USD',
  subtotal numeric(10,2) not null default 0, discount numeric(10,2) not null default 0, tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0, due_date date, notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(), invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null, quantity integer not null default 1, unit_price numeric(10,2) not null default 0
);
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(), invoice_id uuid references public.invoices(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null, client_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(10,2) not null, currency text not null default 'USD', method public.payment_method not null default 'manual',
  status public.payment_status not null default 'pending', transaction_reference text, paid_at timestamptz, created_at timestamptz not null default now()
);

alter table public.cms_pages add column if not exists meta_title text, add column if not exists meta_description text, add column if not exists og_image text;
create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(), page_id uuid not null references public.cms_pages(id) on delete cascade,
  section_type text not null, title text, subtitle text, description text, image_url text, button_text text, button_url text,
  settings jsonb not null default '{}'::jsonb, enabled boolean not null default true, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(), title text not null, description text, category text not null, tags text[] not null default '{}',
  image_url text, before_image_url text, after_image_url text, published boolean not null default true, featured boolean not null default false,
  sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(), client_name text not null, company text, position text, avatar_url text, testimonial text not null,
  rating integer check (rating between 1 and 5), featured boolean not null default false, published boolean not null default true, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(), question text not null, answer text not null, category text, published boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text, content text not null,
  featured_image text, category text, tags text[] not null default '{}', author_id uuid references public.profiles(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')), published_at timestamptz,
  meta_title text, meta_description text, canonical_url text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(), label text not null, url text not null, parent_id uuid references public.navigation_items(id) on delete cascade,
  location text not null default 'header', sort_order integer not null default 0, visible boolean not null default true, open_new_tab boolean not null default false
);
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(), setting_key text unique not null, value jsonb not null default '{}'::jsonb, updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(), actor_id uuid references public.profiles(id) on delete set null, action text not null, entity text not null,
  entity_id uuid, description text, created_at timestamptz not null default now()
);

create or replace function public.is_staff_or_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role::text in ('admin', 'staff')); $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, first_name, company_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'company_name')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.services enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.quotes enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_status_history enable row level security;
alter table public.files enable row level security;
alter table public.revisions enable row level security;
alter table public.revision_comments enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.page_sections enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.blog_posts enable row level security;
alter table public.navigation_items enable row level security;
alter table public.site_settings enable row level security;
alter table public.activity_logs enable row level security;

create policy "Public view published services" on public.services for select using (published = true or public.is_staff_or_admin());
create policy "Public view active pricing" on public.pricing_plans for select using (active = true or public.is_staff_or_admin());
create policy "Public view portfolio" on public.portfolio_items for select using (published = true or public.is_staff_or_admin());
create policy "Public view testimonials" on public.testimonials for select using (published = true or public.is_staff_or_admin());
create policy "Public view faqs" on public.faqs for select using (published = true or public.is_staff_or_admin());
create policy "Public view blog" on public.blog_posts for select using (status = 'published' or public.is_staff_or_admin());
create policy "Public view navigation" on public.navigation_items for select using (visible = true or public.is_staff_or_admin());
create policy "Public view settings" on public.site_settings for select using (true);
create policy "Staff manage services" on public.services for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage pricing" on public.pricing_plans for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage public content" on public.portfolio_items for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage testimonials" on public.testimonials for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage faqs" on public.faqs for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage blog" on public.blog_posts for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage navigation" on public.navigation_items for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage settings" on public.site_settings for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff manage sections" on public.page_sections for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Staff view and manage companies" on public.companies for all using (owner_id = auth.uid() or public.is_staff_or_admin()) with check (owner_id = auth.uid() or public.is_staff_or_admin());
create policy "Company members view membership" on public.company_members for select using (user_id = auth.uid() or public.is_staff_or_admin());
create policy "Staff manage quotes" on public.quotes for all using (client_id = auth.uid() or public.is_staff_or_admin()) with check (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Staff manage orders" on public.orders for all using (client_id = auth.uid() or public.is_staff_or_admin()) with check (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Order members view items" on public.order_items for select using (exists (select 1 from public.orders where id = order_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Staff manage order items" on public.order_items for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Order members view history" on public.order_status_history for select using (exists (select 1 from public.orders where id = order_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Staff manage history" on public.order_status_history for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "File owners view files" on public.files for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Users upload own files" on public.files for insert with check (uploaded_by = auth.uid() and (client_id = auth.uid() or public.is_staff_or_admin()));
create policy "Staff manage files" on public.files for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Order members view revisions" on public.revisions for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Clients request revisions" on public.revisions for insert with check (client_id = auth.uid());
create policy "Staff manage revisions" on public.revisions for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Revision members view comments" on public.revision_comments for select using (exists (select 1 from public.revisions where id = revision_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Revision members send comments" on public.revision_comments for insert with check (author_id = auth.uid() and exists (select 1 from public.revisions where id = revision_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Staff manage invoices" on public.invoices for all using (client_id = auth.uid() or public.is_staff_or_admin()) with check (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Invoice members view items" on public.invoice_items for select using (exists (select 1 from public.invoices where id = invoice_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Staff manage invoice items" on public.invoice_items for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Payment owners view payments" on public.payments for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Staff manage payments" on public.payments for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Conversation members view conversations" on public.conversations for select using (client_id = auth.uid() or public.is_staff_or_admin());
create policy "Staff manage conversations" on public.conversations for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Conversation members view messages" on public.conversation_messages for select using (exists (select 1 from public.conversations where id = conversation_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Conversation members send messages" on public.conversation_messages for insert with check (sender_id = auth.uid() and exists (select 1 from public.conversations where id = conversation_id and (client_id = auth.uid() or public.is_staff_or_admin())));
create policy "Staff manage activity logs" on public.activity_logs for all using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy "Public view page sections" on public.page_sections for select using (enabled = true or public.is_staff_or_admin());

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists quotes_client_status_idx on public.quotes(client_id, status);
create index if not exists orders_client_status_idx on public.orders(client_id, status);
create index if not exists orders_order_number_idx on public.orders(order_number);
create index if not exists invoices_client_status_idx on public.invoices(client_id, status);
create index if not exists files_client_order_idx on public.files(client_id, order_id);
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists activity_logs_created_at_idx on public.activity_logs(created_at desc);

insert into storage.buckets (id, name, public) values
  ('public-media', 'public-media', true), ('client-files', 'client-files', false), ('order-files', 'order-files', false), ('final-deliveries', 'final-deliveries', false)
on conflict (id) do nothing;

create policy "Public media is readable" on storage.objects for select using (bucket_id = 'public-media');
create policy "Staff manage public media" on storage.objects for all to authenticated using (bucket_id = 'public-media' and public.is_staff_or_admin()) with check (bucket_id = 'public-media' and public.is_staff_or_admin());
create policy "Users upload client files" on storage.objects for insert to authenticated with check (bucket_id = 'client-files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Users read own client files" on storage.objects for select to authenticated using (bucket_id = 'client-files' and (storage.foldername(name))[1] = auth.uid()::text or bucket_id = 'client-files' and public.is_staff_or_admin());
create policy "Staff manage order storage" on storage.objects for all to authenticated using (bucket_id in ('order-files', 'final-deliveries') and public.is_staff_or_admin()) with check (bucket_id in ('order-files', 'final-deliveries') and public.is_staff_or_admin());
