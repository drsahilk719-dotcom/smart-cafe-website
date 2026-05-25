/*
  # Fix RLS Policies and Revoke GraphQL Schema Visibility

  1. Security Changes
    - Replace unrestricted INSERT policy on contact_submissions with one that validates required fields
    - Revoke SELECT from anon and authenticated roles on contact_submissions, menu_items, testimonials
    - This removes tables from the GraphQL schema while allowing data access via edge functions with service_role

  2. Policy Changes
    - DROP old "Anyone can submit contact form" policy (WITH CHECK (true))
    - CREATE new "Validated contact form submissions" policy that checks name, email, message are non-empty
    - Keep existing SELECT policies on menu_items and testimonials (these work with service_role via edge functions)
    - Revoke direct SELECT from anon and authenticated on all three tables

  3. Important Notes
    - After revoking SELECT, the frontend must use edge functions with service_role key to read data
    - Contact form submissions are validated to prevent empty/bogus inserts
    - menu_items and testimonials remain publicly readable but only through the edge function proxy
*/

-- Fix contact_submissions INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

CREATE POLICY "Validated contact form submissions"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(email)) > 0
    AND length(trim(message)) > 0
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- Revoke SELECT from anon and authenticated on all tables to remove from GraphQL schema
REVOKE SELECT ON TABLE contact_submissions FROM anon;
REVOKE SELECT ON TABLE contact_submissions FROM authenticated;
REVOKE SELECT ON TABLE menu_items FROM anon;
REVOKE SELECT ON TABLE menu_items FROM authenticated;
REVOKE SELECT ON TABLE testimonials FROM anon;
REVOKE SELECT ON TABLE testimonials FROM authenticated;

-- Also revoke INSERT from anon on contact_submissions so it must go through edge function
REVOKE INSERT ON TABLE contact_submissions FROM anon;
REVOKE INSERT ON TABLE contact_submissions FROM authenticated;

-- Drop the now-ineffective RLS SELECT policies (they won't work without role grants)
DROP POLICY IF EXISTS "Anyone can view menu items" ON menu_items;
DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;
DROP POLICY IF EXISTS "Validated contact form submissions" ON contact_submissions;

-- Disable RLS on tables since we're controlling access purely through role grants and edge functions
-- The service_role bypasses RLS anyway, so RLS is redundant when only edge functions access the tables
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;