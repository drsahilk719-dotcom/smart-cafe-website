import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MenuItem = {
  id: string;
  name: string;
  category: 'Coffee' | 'Tea' | 'Desserts' | 'Snacks';
  description: string;
  price: number;
  image_url: string;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

const API_BASE = `${supabaseUrl}/functions/v1/cafe-api`;

const headers = {
  Authorization: `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
};

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const res = await fetch(`${API_BASE}/menu-items`, { headers });
  if (!res.ok) throw new Error('Failed to fetch menu items');
  return res.json();
}

export async function fetchFeaturedItems(limit = 3): Promise<MenuItem[]> {
  const res = await fetch(`${API_BASE}/menu-items/featured?limit=${limit}`, { headers });
  if (!res.ok) throw new Error('Failed to fetch featured items');
  return res.json();
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE}/testimonials`, { headers });
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}

export async function submitContactForm(data: ContactSubmission): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Failed to submit form');
  return result;
}
