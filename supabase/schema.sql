-- Brooklyn Hills Apartment Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  nightly_rate INTEGER NOT NULL,
  cleaning_fee INTEGER NOT NULL,
  service_charge_percent INTEGER NOT NULL DEFAULT 10,
  guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  has_bar_access BOOLEAN NOT NULL DEFAULT false,
  images TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'under_maintenance', 'being_cleaned', 'ready')),
  cleaning_time_minutes INTEGER NOT NULL DEFAULT 120,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  guests_count INTEGER NOT NULL,
  nightly_rate INTEGER NOT NULL,
  subtotal INTEGER NOT NULL,
  cleaning_fee INTEGER NOT NULL,
  service_charge INTEGER NOT NULL,
  bar_charges INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
  payment_reference TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bar Items Table
CREATE TABLE IF NOT EXISTS bar_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('alcoholic', 'non_alcoholic', 'snacks')),
  price INTEGER NOT NULL,
  current_stock INTEGER NOT NULL DEFAULT 0,
  minimum_stock INTEGER NOT NULL DEFAULT 10,
  status TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'low_stock', 'out_of_stock')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bar Transactions Table
CREATE TABLE IF NOT EXISTS bar_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total INTEGER NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'transfer', 'charge_to_room')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Housekeeping Tasks Table
CREATE TABLE IF NOT EXISTS housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  assigned_to TEXT,
  fee INTEGER NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  actual_minutes INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'inspected', 'rework_needed')),
  urgency TEXT NOT NULL DEFAULT 'normal' CHECK (urgency IN ('low', 'normal', 'high', 'urgent')),
  instructions TEXT,
  checklist JSONB NOT NULL DEFAULT '[]',
  issues JSONB NOT NULL DEFAULT '[]',
  photos JSONB NOT NULL DEFAULT '[]',
  quality_score INTEGER,
  inspected_by TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Maintenance Tasks Table
CREATE TABLE IF NOT EXISTS maintenance_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('plumbing', 'electrical', 'appliances', 'furniture', 'cleaning', 'pest_control', 'security', 'structural', 'bar_equipment', 'refrigeration', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reported' CHECK (status IN ('reported', 'assigned', 'in_progress', 'completed', 'cancelled')),
  assigned_vendor JSONB,
  estimated_cost INTEGER NOT NULL,
  actual_cost INTEGER,
  scheduled_date TIMESTAMPTZ,
  completed_date TIMESTAMPTZ,
  photos TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT[] NOT NULL DEFAULT '{}',
  materials TEXT[] NOT NULL DEFAULT '{}',
  reported_by TEXT NOT NULL,
  recurring JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_housekeeping_property_id ON housekeeping_tasks(property_id);
CREATE INDEX IF NOT EXISTS idx_housekeeping_status ON housekeeping_tasks(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON maintenance_tasks(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_tasks(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bar_items_updated_at BEFORE UPDATE ON bar_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_housekeeping_tasks_updated_at BEFORE UPDATE ON housekeeping_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_tasks_updated_at BEFORE UPDATE ON maintenance_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample properties (optional - remove if not needed)
INSERT INTO properties (name, description, location, nightly_rate, cleaning_fee, service_charge_percent, guests, bedrooms, bathrooms, amenities, has_bar_access, images, status, cleaning_time_minutes)
VALUES
(
  'Luxury 3-Bedroom Penthouse',
  'Experience ultimate luxury in this stunning 3-bedroom penthouse with panoramic city views. Features include a modern kitchen, spacious living area, and exclusive access to our premium bar lounge.',
  'Victoria Island, Lagos',
  45000,
  15000,
  10,
  6,
  3,
  3,
  ARRAY['wifi', 'ac', 'parking', 'kitchen', 'pool', 'gym', 'security', 'generator', 'bar_access', 'tv', 'washing_machine', 'balcony'],
  true,
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
  'active',
  180
),
(
  'Cozy 2-Bedroom Apartment',
  'Perfect for couples or small families. This cozy apartment offers comfort and convenience with modern amenities and easy access to shopping centers and restaurants.',
  'Lekki Phase 1, Lagos',
  28000,
  10000,
  10,
  4,
  2,
  2,
  ARRAY['wifi', 'ac', 'parking', 'kitchen', 'security', 'generator', 'tv', 'washing_machine'],
  false,
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
  'active',
  120
);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bar_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE housekeeping_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to properties
CREATE POLICY "Properties are viewable by everyone" ON properties
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage properties (you can customize this based on your auth setup)
CREATE POLICY "Authenticated users can insert properties" ON properties
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties" ON properties
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete properties" ON properties
  FOR DELETE USING (true);

-- Create policies for bookings
CREATE POLICY "Bookings are viewable by everyone" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update bookings" ON bookings
  FOR UPDATE USING (true);

-- Create policies for bar items
CREATE POLICY "Bar items are viewable by everyone" ON bar_items
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage bar items" ON bar_items
  FOR ALL USING (true);

-- Create policies for bar transactions
CREATE POLICY "Bar transactions are viewable by everyone" ON bar_transactions
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create bar transactions" ON bar_transactions
  FOR INSERT WITH CHECK (true);

-- Create policies for housekeeping tasks
CREATE POLICY "Housekeeping tasks are viewable by everyone" ON housekeeping_tasks
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage housekeeping tasks" ON housekeeping_tasks
  FOR ALL USING (true);

-- Create policies for maintenance tasks
CREATE POLICY "Maintenance tasks are viewable by everyone" ON maintenance_tasks
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage maintenance tasks" ON maintenance_tasks
  FOR ALL USING (true);
