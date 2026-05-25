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
