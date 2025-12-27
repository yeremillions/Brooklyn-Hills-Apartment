-- Migration: Add slug field to properties table
-- This migration adds a slug field for SEO-friendly URLs

-- Step 1: Add slug column (allowing NULL temporarily for existing rows)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS slug TEXT;

-- Step 2: Create function to generate slug from property name
CREATE OR REPLACE FUNCTION generate_slug(name TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
  final_slug TEXT;
BEGIN
  -- Convert to lowercase, replace spaces and special chars with hyphens
  slug := lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'));
  -- Remove leading/trailing hyphens
  slug := trim(both '-' from slug);

  -- Ensure uniqueness by adding counter if needed
  final_slug := slug;
  WHILE EXISTS (SELECT 1 FROM properties WHERE properties.slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Generate slugs for existing properties
UPDATE properties
SET slug = generate_slug(name)
WHERE slug IS NULL;

-- Step 4: Make slug column NOT NULL and UNIQUE
ALTER TABLE properties ALTER COLUMN slug SET NOT NULL;
ALTER TABLE properties ADD CONSTRAINT properties_slug_unique UNIQUE (slug);

-- Step 5: Create index on slug for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);

-- Step 6: Create function to auto-generate slug before insert/update
CREATE OR REPLACE FUNCTION set_property_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate slug if it's not provided or if name changed
  IF NEW.slug IS NULL OR NEW.slug = '' OR (TG_OP = 'UPDATE' AND NEW.name != OLD.name) THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create trigger to auto-generate slug
DROP TRIGGER IF EXISTS set_properties_slug ON properties;
CREATE TRIGGER set_properties_slug BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION set_property_slug();

-- Migration complete! Property URLs will now use SEO-friendly slugs instead of UUIDs
