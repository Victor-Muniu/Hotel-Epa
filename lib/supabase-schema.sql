-- Supabase Hotel Management System Schema
-- Run this in your Supabase SQL Editor

-- Create rooms table
CREATE TABLE IF NOT EXISTS public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  description text,
  capacity integer,
  beds integer,
  bathrooms numeric,
  size_m2 integer,
  price numeric,
  currency text DEFAULT 'USD',
  amenities text[],
  images text[],
  visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out');

CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.rooms(id) ON DELETE SET NULL,
  booking_request_id integer REFERENCES public.booking_requests(id) ON DELETE SET NULL,
  first_name text,
  last_name text,
  email text,
  phone text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  guests integer,
  children integer DEFAULT 0,
  total_price numeric,
  currency text DEFAULT 'USD',
  board_type text,
  status booking_status DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create booking_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.booking_requests (
  id serial PRIMARY KEY,
  type text,
  first_name text,
  last_name text,
  full_name text,
  email text NOT NULL,
  phone text,
  start_date date,
  end_date date,
  guests integer,
  children integer DEFAULT 0,
  rooms integer,
  room text,
  nationality text,
  id_document text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create room_availability table for tracking availability
CREATE TABLE IF NOT EXISTS public.room_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES public.rooms(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text DEFAULT 'available',
  booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL,
  rate numeric,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_rooms_slug ON public.rooms(slug);
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON public.bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_room_availability_room_date ON public.room_availability(room_id, date);

-- Insert sample rooms
INSERT INTO public.rooms (name, slug, description, capacity, beds, bathrooms, size_m2, price, amenities, images, visible)
VALUES 
  (
    'Premium Apartment with 2 Bedrooms',
    'premium-apartment-2br',
    'Luxurious apartment with 2 bedrooms, 4 beds, and 1.5 baths. Perfect for small groups and families.',
    6,
    4,
    1.5,
    85,
    150.00,
    ARRAY['Free Wi-Fi', 'Smart TV', 'Ensuite Bathroom', 'Balcony', 'Work desk', 'Coffee & Tea', 'Air Conditioning', 'Minibar'],
    ARRAY[
      'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Faf539d9179ee431cb44e93451fbbe692?format=webp&width=1600',
      'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2Fa51eef199a4f441c90df189c41ff09ab?format=webp&width=800',
      'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F38a2d423b8b64feea778ad2778fb42a4?format=webp&width=800'
    ],
    true
  ),
  (
    'Deluxe Suite',
    'deluxe-suite',
    'Spacious suite with king bed, modern amenities, and spectacular views. Ideal for couples.',
    2,
    1,
    1,
    60,
    120.00,
    ARRAY['Free Wi-Fi', 'Smart TV', 'Ensuite Bathroom', 'Balcony', 'Spa Bath'],
    ARRAY[
      'https://cdn.builder.io/api/v1/image/assets%2F63e670d5cbe5459ba070252373268feb%2F9b88117c787d46b6afe6a697975b9237?format=webp&width=1200'
    ],
    true
  ),
  (
    'Standard Room',
    'standard-room',
    'Comfortable room with essential amenities. Great value for solo travelers and business guests.',
    2,
    1,
    1,
    35,
    80.00,
    ARRAY['Free Wi-Fi', 'TV', 'Private Bathroom', 'Work Desk'],
    ARRAY[],
    true
  ),
  (
    'Economy Room',
    'economy-room',
    'Budget-friendly room with basic amenities. Perfect for short stays.',
    1,
    1,
    1,
    25,
    50.00,
    ARRAY['Free Wi-Fi', 'Private Bathroom'],
    ARRAY[],
    true
  );

-- Enable Row Level Security (RLS) for public access to read rooms
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_availability ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous users
CREATE POLICY "Allow anon to read rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow anon to insert booking_requests" ON public.booking_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon to read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow anon to insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon to read room_availability" ON public.room_availability FOR SELECT USING (true);

-- Grants
GRANT SELECT ON public.rooms TO anon;
GRANT INSERT ON public.booking_requests TO anon;
GRANT SELECT, INSERT ON public.bookings TO anon;
GRANT SELECT ON public.room_availability TO anon;
