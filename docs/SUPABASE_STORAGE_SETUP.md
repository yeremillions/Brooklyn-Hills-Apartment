# Supabase Storage Setup for Property Images

## Overview

This guide explains how to set up Supabase Storage to upload and store property images instead of using temporary blob URLs.

## Why This Is Needed

When you upload images through the admin panel, they need to be stored somewhere permanent. Previously, the app was creating temporary blob URLs which don't work after refresh. With Supabase Storage, images are uploaded to cloud storage and you get permanent URLs.

## Setup Steps

### 1. Create Storage Bucket

1. **Go to your Supabase Dashboard**: https://app.supabase.com
2. **Click on "Storage"** in the left sidebar
3. **Click "New Bucket"** button
4. **Configure the bucket**:
   - **Name**: `property-images`
   - **Public bucket**: ✅ Check this (so images can be viewed publicly)
   - **File size limit**: 5 MB (or your preference)
   - **Allowed MIME types**: Leave empty or add: `image/jpeg,image/png,image/webp,image/gif`
5. **Click "Create Bucket"**

### 2. Set Up Storage Policies

After creating the bucket, you need to set up policies so the app can upload and read images.

**Go to Storage → Policies → property-images**

#### Policy 1: Public Read Access (so everyone can view images)

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-images');
```

Or via UI:
- **Policy name**: "Public Access"
- **Allowed operation**: SELECT
- **Policy definition**: `bucket_id = 'property-images'`

#### Policy 2: Authenticated Upload (so admin can upload)

```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');
```

Or via UI:
- **Policy name**: "Authenticated users can upload"
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'property-images'`

#### Policy 3: Authenticated Delete (so admin can delete)

```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');
```

### 3. Alternative: Make Bucket Completely Public

If you want simpler policies (anyone can upload), you can make the bucket public:

1. Go to **Storage → property-images → Policies**
2. Click **"New Policy"**
3. Choose **"Enable read access for all users"**
4. Repeat for upload and delete if needed

## How It Works

### Uploading Images

When you upload an image through the admin panel:

1. File is selected from your computer
2. JavaScript calls `uploadPropertyImage(file)` function
3. File is uploaded to Supabase Storage bucket
4. Supabase returns a permanent public URL
5. URL is saved to the database
6. Image displays using the permanent URL

### Example URLs

**Before (broken blob URLs):**
```
blob:http://localhost:3000/728df07c-17c6-4ef0-9505-1252be1d9a68
```

**After (permanent Supabase URLs):**
```
https://xxxxxxxxxxxxx.supabase.co/storage/v1/object/public/property-images/abc123.jpg
```

## Testing

After setup:

1. **Go to**: `/admin/properties/new`
2. **Upload an image**: Click the upload area
3. **Wait**: You'll see "Uploading images..." message
4. **Success**: You'll get an alert "Successfully uploaded X image(s)"
5. **Check**: The image should appear in the preview
6. **Save property**: The permanent URL is saved to database
7. **View property**: Image displays correctly everywhere

## Troubleshooting

### Error: "Failed to upload images"

**Cause**: Storage bucket doesn't exist or policies aren't set up

**Fix**:
1. Check bucket name is exactly `property-images`
2. Check bucket is marked as public
3. Check policies are created (see step 2 above)

### Error: "Access denied"

**Cause**: Missing upload policy

**Fix**:
1. Go to Storage → Policies
2. Add the "Authenticated users can upload" policy
3. Make sure you're logged in to the admin panel

### Images still don't load

**Cause**: Old blob URLs still in database

**Fix**: Delete properties with blob URLs and recreate them with real uploads, or update the database:

```sql
-- Clear invalid blob URLs from existing properties
UPDATE properties
SET images = ARRAY[]::text[]
WHERE images::text LIKE '%blob:http%';
```

## Quick Fix: Use External URLs

If you don't want to set up storage right now, you can use direct image URLs from Unsplash:

1. Go to https://unsplash.com
2. Search for "apartment" or "luxury home"
3. Right-click image → Copy image address
4. Paste URL into admin form (instead of uploading)

Example working URLs:
```
https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80
https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80
https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80
https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80
```

## Security Notes

1. **Public bucket**: Images are publicly accessible (good for property listings)
2. **File size**: Limit to prevent abuse (default 5MB)
3. **MIME types**: Only allow image types for security
4. **Authentication**: Only authenticated users can upload/delete

## Cost

Supabase Storage Free Tier:
- **Storage**: 1 GB free
- **Bandwidth**: 2 GB free per month
- **More than enough** for property images

Each property image is typically 200-500 KB, so:
- 1 GB = ~2,000 to 5,000 property images

## Need Help?

If you encounter issues:

1. Check Supabase Dashboard → Storage → Logs
2. Check browser console for errors (F12)
3. Verify policies are correctly set up
4. Make sure bucket name matches exactly: `property-images`
