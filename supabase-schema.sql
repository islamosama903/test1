-- supabase-schema.sql
-- Clean schema for Supabase SQL editor.
-- This file creates all required tables and RLS policies in public schema.

-- Create extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  username text UNIQUE,
  password_hash text,
  role text NOT NULL DEFAULT 'couple',
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Weddings table
CREATE TABLE IF NOT EXISTS public.weddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  groom_name text,
  bride_name text,
  venue_name text,
  address text,
  google_maps_url text,
  wedding_date text,
  wedding_time text,
  story text,
  groom_image_url text,
  bride_image_url text,
  cover_image_url text,
  guest_message_audio text,
  mp3_url text,
  visible_sections jsonb DEFAULT '{}',
  theme text DEFAULT 'classic',
  allow_guest_uploads boolean DEFAULT true,
  is_active boolean DEFAULT true,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RSVPs table
CREATE TABLE IF NOT EXISTS public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  guest_name text,
  attending boolean,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Guests table
CREATE TABLE IF NOT EXISTS public.guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Voice messages table
CREATE TABLE IF NOT EXISTS public.voice_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  file_url text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Congratulations table
CREATE TABLE IF NOT EXISTS public.congratulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  message text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Visitor logs table
CREATE TABLE IF NOT EXISTS public.visitor_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id uuid REFERENCES public.weddings(id) ON DELETE CASCADE,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.congratulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

-- Policies for users
DROP POLICY IF EXISTS "admin_manage_users" ON public.users;
CREATE POLICY "admin_manage_users" ON public.users
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Policies for weddings
DROP POLICY IF EXISTS "public_select_weddings" ON public.weddings;
CREATE POLICY "public_select_weddings" ON public.weddings
  FOR SELECT
  USING (is_published = true);

-- Policies for public RSVPs
DROP POLICY IF EXISTS "public_insert_rsvps" ON public.rsvps;
CREATE POLICY "public_insert_rsvps" ON public.rsvps
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_rsvps" ON public.rsvps;
CREATE POLICY "public_select_rsvps" ON public.rsvps
  FOR SELECT
  USING (true);

-- Policies for guests
DROP POLICY IF EXISTS "public_insert_guests" ON public.guests;
CREATE POLICY "public_insert_guests" ON public.guests
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_guests" ON public.guests;
CREATE POLICY "public_select_guests" ON public.guests
  FOR SELECT
  USING (true);

-- Policies for photos
DROP POLICY IF EXISTS "public_insert_photos" ON public.photos;
CREATE POLICY "public_insert_photos" ON public.photos
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_photos" ON public.photos;
CREATE POLICY "public_select_photos" ON public.photos
  FOR SELECT
  USING (true);

-- Policies for videos
DROP POLICY IF EXISTS "public_insert_videos" ON public.videos;
CREATE POLICY "public_insert_videos" ON public.videos
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_videos" ON public.videos;
CREATE POLICY "public_select_videos" ON public.videos
  FOR SELECT
  USING (true);

-- Policies for voice messages
DROP POLICY IF EXISTS "public_insert_voice_messages" ON public.voice_messages;
CREATE POLICY "public_insert_voice_messages" ON public.voice_messages
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_voice_messages" ON public.voice_messages;
CREATE POLICY "public_select_voice_messages" ON public.voice_messages
  FOR SELECT
  USING (true);

-- Policies for congratulations
DROP POLICY IF EXISTS "public_insert_congratulations" ON public.congratulations;
CREATE POLICY "public_insert_congratulations" ON public.congratulations
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_congratulations" ON public.congratulations;
CREATE POLICY "public_select_congratulations" ON public.congratulations
  FOR SELECT
  USING (true);

-- Policies for visitor logs
DROP POLICY IF EXISTS "public_insert_visitor_logs" ON public.visitor_logs;
CREATE POLICY "public_insert_visitor_logs" ON public.visitor_logs
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_visitor_logs" ON public.visitor_logs;
CREATE POLICY "public_select_visitor_logs" ON public.visitor_logs
  FOR SELECT
  USING (true);
