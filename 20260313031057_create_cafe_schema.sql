/*
  # Smart Café Database Schema

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `category` (text, not null) - Coffee, Tea, Desserts, Snacks
      - `description` (text)
      - `price` (decimal, not null)
      - `image_url` (text)
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `customer_name` (text, not null)
      - `rating` (integer, 1-5)
      - `comment` (text, not null)
      - `created_at` (timestamptz)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on menu_items and testimonials
    - Add policy for public insert on contact_submissions
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('Coffee', 'Tea', 'Desserts', 'Snacks')),
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view testimonials"
  ON testimonials
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

INSERT INTO menu_items (name, category, description, price, image_url) VALUES
  ('Espresso', 'Coffee', 'Rich and bold single shot', 2.50, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'),
  ('Cappuccino', 'Coffee', 'Espresso with steamed milk and foam', 4.00, 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg'),
  ('Latte', 'Coffee', 'Smooth espresso with creamy milk', 4.50, 'https://images.pexels.com/photos/1493704/pexels-photo-1493704.jpeg'),
  ('Americano', 'Coffee', 'Espresso with hot water', 3.00, 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg'),
  ('Mocha', 'Coffee', 'Espresso with chocolate and milk', 5.00, 'https://images.pexels.com/photos/1329578/pexels-photo-1329578.jpeg'),
  ('Cold Brew', 'Coffee', 'Smooth, cold-steeped coffee', 4.50, 'https://images.pexels.com/photos/1797103/pexels-photo-1797103.jpeg'),
  ('Green Tea', 'Tea', 'Fresh Japanese green tea', 3.00, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg'),
  ('Earl Grey', 'Tea', 'Classic black tea with bergamot', 3.50, 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg'),
  ('Chamomile', 'Tea', 'Soothing herbal tea', 3.50, 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg'),
  ('Matcha Latte', 'Tea', 'Premium matcha with steamed milk', 5.50, 'https://images.pexels.com/photos/4051126/pexels-photo-4051126.jpeg'),
  ('Chocolate Cake', 'Desserts', 'Rich dark chocolate layered cake', 6.00, 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg'),
  ('Cheesecake', 'Desserts', 'Creamy New York style', 6.50, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg'),
  ('Tiramisu', 'Desserts', 'Classic Italian coffee dessert', 7.00, 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg'),
  ('Croissant', 'Snacks', 'Buttery French pastry', 3.50, 'https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg'),
  ('Blueberry Muffin', 'Snacks', 'Fresh baked with real berries', 4.00, 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg'),
  ('Bagel & Cream Cheese', 'Snacks', 'Toasted with choice of spread', 4.50, 'https://images.pexels.com/photos/2951692/pexels-photo-2951692.jpeg');

INSERT INTO testimonials (customer_name, rating, comment) VALUES
  ('Sarah Johnson', 5, 'The best coffee in town! The atmosphere is cozy and the staff is incredibly friendly.'),
  ('Michael Chen', 5, 'Amazing cappuccinos and the desserts are to die for. Highly recommend the tiramisu!'),
  ('Emily Rodriguez', 4, 'Great spot for working remotely. Good WiFi and excellent coffee selection.'),
  ('David Thompson', 5, 'Smart Cafe has become my daily routine. Quality is consistently excellent!');