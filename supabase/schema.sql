-- =====================================================================
-- مربع الفكرة — Supabase schema
-- شغّله مرة واحدة: Supabase Dashboard → SQL Editor → New query → الصق → Run
-- آمن لو اتشغّل أكتر من مرة (idempotent).
-- =====================================================================

-- ---------- 1) الأدمن ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- 2) الجداول ----------
create table if not exists public.site_settings (
  id          int primary key default 1 check (id = 1),
  call_number text not null default '' check (char_length(call_number) <= 40),
  wa_number   text not null default '' check (char_length(wa_number) <= 40),
  email       text not null default '' check (char_length(email) <= 120),
  hours_ar    text not null default '' check (char_length(hours_ar) <= 300),
  hours_en    text not null default '' check (char_length(hours_en) <= 300),
  updated_at  timestamptz not null default now()
);

create table if not exists public.social_links (
  id         uuid primary key default gen_random_uuid(),
  platform   text not null check (platform in
             ('instagram','tiktok','facebook','x','snapchat','youtube','linkedin','telegram','whatsapp')),
  url        text not null check (char_length(url) <= 500 and url ~* '^https?://'),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique check (slug ~ '^[a-z0-9-]{2,40}$'),
  title_ar   text not null check (char_length(title_ar) between 1 and 80),
  title_en   text not null default '' check (char_length(title_en) <= 80),
  items_ar   text not null default '' check (char_length(items_ar) <= 1000),
  items_en   text not null default '' check (char_length(items_en) <= 1000),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.service_images (
  id         uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  path       text not null check (char_length(path) <= 300),
  alt_ar     text not null default '' check (char_length(alt_ar) <= 200),
  alt_en     text not null default '' check (char_length(alt_en) <= 200),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists service_images_service_idx on public.service_images(service_id);

create table if not exists public.works (
  id         uuid primary key default gen_random_uuid(),
  path       text not null check (char_length(path) <= 300),
  alt_ar     text not null default '' check (char_length(alt_ar) <= 200),
  alt_en     text not null default '' check (char_length(alt_en) <= 200),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  name_ar    text not null check (char_length(name_ar) between 1 and 80),
  name_en    text not null default '' check (char_length(name_en) <= 80),
  text_ar    text not null check (char_length(text_ar) between 1 and 600),
  text_en    text not null default '' check (char_length(text_en) <= 600),
  rating     int  not null default 5 check (rating between 1 and 5),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

-- صف الإعدادات الأساسي (بيانات التواصل الحالية)
insert into public.site_settings (id, call_number, wa_number, email, hours_ar, hours_en)
values (
  1, '0540330205', '+966 54 033 0205', 'm.alebttkar@gmail.com',
  E'السبت إلى الخميس: 10 ص – 7 م\nالجمعة: إجازة',
  E'Saturday – Thursday: 10 AM – 7 PM\nFriday: Closed'
)
on conflict (id) do nothing;

-- ---------- 3) الصلاحيات (Grants) ----------
grant usage on schema public to anon, authenticated;
grant select on public.site_settings, public.social_links, public.services,
                public.service_images, public.works, public.reviews to anon, authenticated;
grant insert, update, delete on public.site_settings, public.social_links, public.services,
                public.service_images, public.works, public.reviews to authenticated;
grant select on public.admins to authenticated;

-- ---------- 4) RLS: الزائر يقرأ بس، الأدمن بس يكتب ----------
alter table public.admins          enable row level security;
alter table public.site_settings   enable row level security;
alter table public.social_links    enable row level security;
alter table public.services        enable row level security;
alter table public.service_images  enable row level security;
alter table public.works           enable row level security;
alter table public.reviews         enable row level security;

-- admins: المستخدم يقدر يشوف صفّه هو بس (عشان الموقع يتأكد إنه أدمن). مفيش كتابة من الـ API.
drop policy if exists "admins_select_own" on public.admins;
create policy "admins_select_own" on public.admins
  for select to authenticated using (user_id = auth.uid());

do $$
declare t text;
begin
  foreach t in array array['site_settings','social_links','services','service_images','works','reviews']
  loop
    execute format('drop policy if exists "%1$s_public_read" on public.%1$s', t);
    execute format('create policy "%1$s_public_read" on public.%1$s for select to anon, authenticated using (true)', t);
    execute format('drop policy if exists "%1$s_admin_write" on public.%1$s', t);
    execute format('create policy "%1$s_admin_write" on public.%1$s for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- ---------- 5) Storage: bucket عام للقراءة، الرفع/الحذف للأدمن ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 3145728, array['image/webp','image/jpeg','image/png'])
on conflict (id) do update
  set public = true,
      file_size_limit = 3145728,
      allowed_mime_types = array['image/webp','image/jpeg','image/png'];

drop policy if exists "media_admin_select" on storage.objects;
create policy "media_admin_select" on storage.objects
  for select to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
