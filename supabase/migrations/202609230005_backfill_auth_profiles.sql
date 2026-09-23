insert into public.profiles (id, email, full_name, first_name, company_name)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', split_part(coalesce(u.email, ''), '@', 1)),
  u.raw_user_meta_data ->> 'first_name',
  u.raw_user_meta_data ->> 'company_name'
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, first_name, company_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'company_name'
  )
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;
