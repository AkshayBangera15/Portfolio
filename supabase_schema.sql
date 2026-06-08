-- ============================================================
-- Portfolio Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Projects ──────────────────────────────────────────────
create table if not exists projects (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  skills      text[] default '{}',
  github_url  text,
  demo_url    text,
  year        integer not null default extract(year from now()),
  roadmap     text[] default '{}',
  images      text[] default '{}',
  created_at  timestamptz default now()
);

-- ── Achievements ──────────────────────────────────────────
create table if not exists achievements (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  skills      text[] default '{}',
  year        integer not null default extract(year from now()),
  created_at  timestamptz default now()
);

-- ── Skill Categories ──────────────────────────────────────
create table if not exists skill_categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,   -- Languages | Core CS | Databases | Technologies & Tools
  skills     text[] default '{}',
  created_at timestamptz default now()
);

-- ── Experience ────────────────────────────────────────────
create table if not exists experience (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  company     text not null,
  description text not null,
  start_date  text not null,
  end_date    text not null,
  created_at  timestamptz default now()
);

-- ── Education ─────────────────────────────────────────────
create table if not exists education (
  id          uuid primary key default uuid_generate_v4(),
  institution text not null,
  degree      text not null,
  branch      text not null,
  start_date  text not null,
  end_date    text not null,
  score_type  text not null default 'CGPA',  -- CGPA | Percentage
  score       text not null,
  coursework  text,
  created_at  timestamptz default now()
);

-- ── Contact Info ──────────────────────────────────────────
create table if not exists contact_info (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null default '',
  email        text not null default '',
  linkedin_url text,
  github_url   text,
  twitter_url  text,
  hero_summary text not null default '',
  resume_url   text,
  updated_at   timestamptz default now()
);

-- ── Row Level Security ────────────────────────────────────
-- Public: SELECT only (portfolio visitors)
-- Admin writes go through service role key (bypasses RLS)

alter table projects        enable row level security;
alter table achievements    enable row level security;
alter table skill_categories enable row level security;
alter table experience      enable row level security;
alter table education       enable row level security;
alter table contact_info    enable row level security;

-- Allow anyone to read
create policy "Public read projects"        on projects        for select using (true);
create policy "Public read achievements"    on achievements    for select using (true);
create policy "Public read skills"          on skill_categories for select using (true);
create policy "Public read experience"      on experience      for select using (true);
create policy "Public read education"       on education       for select using (true);
create policy "Public read contact"         on contact_info    for select using (true);

-- ── Storage Bucket for Resume ─────────────────────────────
insert into storage.buckets (id, name, public)
values ('resume', 'resume', true)
on conflict do nothing;

create policy "Public read resume"
  on storage.objects for select
  using (bucket_id = 'resume');

create policy "Service role upload resume"
  on storage.objects for insert
  with check (bucket_id = 'resume');

-- ── Seed: Default Skill Categories ───────────────────────
insert into skill_categories (name, skills) values
  ('Languages',              array['Python','Go','TypeScript','Rust','C++','SQL','Bash']),
  ('Core CS',                array['Distributed Systems','System Design','Data Structures','Algorithms','OS Concepts','Computer Networks']),
  ('Databases',              array['PostgreSQL','Redis','MongoDB','Cassandra','Elasticsearch','ClickHouse']),
  ('Technologies & Tools',   array['Docker','Kubernetes','Kafka','AWS','Terraform','PyTorch','FastAPI','gRPC'])
on conflict (name) do nothing;

-- ── Seed: Default Contact Row ─────────────────────────────
insert into contact_info (name, email, hero_summary)
values (
  'Akshay Bangera',
  'akshay.bangera2004@gmail.com',
  'Building intelligent systems at the intersection of AI/ML and backend engineering. Passionate about distributed systems, neural architectures, and writing code that scales to infinity.'
)
on conflict do nothing;
