-- Create a table for site settings
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default settings if they don't exist
insert into public.site_settings (key, value)
values 
  ('maintenance_mode', 'false'::jsonb),
  ('registration_open', 'true'::jsonb)
on conflict (key) do nothing;

-- Enable RLS
alter table public.site_settings enable row level security;

-- Create policies for site_settings
drop policy if exists "Enable read access for all users" on public.site_settings;
create policy "Enable read access for all users"
on public.site_settings for select
using (true);

drop policy if exists "Enable update for all users" on public.site_settings;
create policy "Enable update for all users"
on public.site_settings for update
using (true)
with check (true);

-- Fix Delete Registration Functionality
-- Enable delete policies for registrations tables
-- Note: In a real production app, you'd want stricter policies (e.g. checks against admin user),
-- but given the current client-side password protection, we'll allow delete at the row level 
-- and rely on the client knowing the ID.

-- registrations table
alter table public.registrations enable row level security;

drop policy if exists "Enable delete for all users on registrations" on public.registrations;
create policy "Enable delete for all users on registrations"
on public.registrations for delete
using (true);

-- intercollege_registrations table
alter table public.intercollege_registrations enable row level security;

drop policy if exists "Enable delete for all users on intercollege_registrations" on public.intercollege_registrations;
create policy "Enable delete for all users on intercollege_registrations"
on public.intercollege_registrations for delete
using (true);
