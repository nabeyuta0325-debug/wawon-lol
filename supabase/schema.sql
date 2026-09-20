-- Supabase SQL Editorで一度だけ実行してください。
create table if not exists public.champions (
  slug text primary key,
  name text not null,
  en text not null,
  role text not null check (role in ('TOP', 'JG', 'MID', 'ADC', 'SUP')),
  tag text not null,
  color text not null default '#496c8b',
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  slug text primary key,
  category text not null,
  title text not null,
  published_at date not null,
  tone text not null default 'blue',
  visual text not null default 'NEW',
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.champions enable row level security;
alter table public.articles enable row level security;

create policy "Public can read champions" on public.champions for select using (true);
create policy "Public can read published articles" on public.articles for select using (is_published = true);
create policy "Authenticated users manage champions" on public.champions for all to authenticated using (true) with check (true);
create policy "Authenticated users manage articles" on public.articles for all to authenticated using (true) with check (true);
