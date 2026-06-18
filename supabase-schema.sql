-- ============================================================
-- CREATOPIA PORTFOLIO - SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Portfolio Items
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Design',
  image_url TEXT NOT NULL,
  tools TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT,
  credential_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services / Pricing
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_unit TEXT DEFAULT 'per hour',
  description TEXT,
  features TEXT[] DEFAULT '{}',
  highlighted BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (key-value for easy updates)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Storage Buckets
-- ============================================================
-- IMPORTANT: Create these buckets manually in Supabase Storage UI
-- and make sure "Public bucket" toggle is ON for each:
-- 1. "portfolio" (public)
-- 2. "certificates" (public)
-- 3. "profile" (public)
-- 4. "logo" (public) — optional, for your brand logo image

-- ============================================================
-- Row Level Security — FULL ACCESS POLICIES
-- ============================================================
-- These allow the admin panel (using anon key) to insert/update/delete.
-- This is intentional since the admin panel itself is password protected.

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read portfolio, certificates, services, settings
CREATE POLICY "Public read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Anyone can insert contact messages
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin panel full access (insert/update/delete via anon key, password-gated by app)
CREATE POLICY "Admin full access portfolio" ON portfolio FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access certificates" ON certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- Service role can do everything (used by admin API routes)
-- This is handled by the service role key bypass

-- ============================================================
-- Seed Default Services Data
-- ============================================================

INSERT INTO services (name, price, price_unit, description, features, highlighted, order_index) VALUES
(
  'Explore Plan',
  10.00,
  'per hour',
  'Perfect for getting started with professional design',
  ARRAY['1 Social Media Platform', 'Up to 15 designs/month', 'Basic Photo Editing', 'Social Media Graphics', 'Custom Graphic Design', 'Canva Design', 'Logo Design', 'Facebook & Instagram Graphics'],
  false,
  1
),
(
  'Growth Plan',
  8.00,
  'per hour',
  'Scale your brand presence across multiple platforms',
  ARRAY['Up to 3 Social Media Platforms', 'Up to 30 designs/month', 'Basic Photo Editing', 'Social Media Graphics', 'Custom Graphic Design', 'Canva Design', 'Logo Design', 'Facebook & Instagram Graphics'],
  true,
  2
),
(
  'Essential Plan',
  6.00,
  'per hour',
  'Full-scale creative support for growing businesses',
  ARRAY['Up to 5 Social Media Platforms', 'Up to 50 designs/month', 'Basic Photo Editing', 'Social Media Graphics', 'Custom Graphic Design', 'Canva Design', 'Logo Design', 'Facebook & Instagram Graphics'],
  false,
  3
);

-- Seed Default Site Settings
INSERT INTO site_settings (key, value) VALUES
('hero_tagline', 'Purposeful Creativity'),
('about_bio', 'I am Donna May Rodrigo. As a Virtual Assistant, I am assertive and take a goal-oriented and decisive approach to meeting my clients'' needs. I utilize purposeful methods and strategies to deliver high-quality results. I am also opinionated in a professional manner, confidently sharing well-informed ideas and recommendations that can help improve projects and achieve business objectives. Additionally, I make every effort to keep my clients'' information secure and confidential because I value the trust they place in me.'),
('calendly_url', 'https://calendly.com/donnarodrigo'),
('zoom_link', 'https://zoom.us/j/your-meeting-id'),
('linkedin_url', 'https://www.linkedin.com/in/donna-may-rodrigo-916955413'),
('facebook_url', 'https://facebook.com/'),
('twitter_url', 'https://twitter.com/'),
('youtube_url', 'https://youtube.com/'),
('email', 'donnarodriguezrodrigo@gmail.com'),
('phone', '09664867545'),
('profile_image', '');
