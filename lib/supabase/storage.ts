import { supabase } from './client'

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'property-images')
 * @returns The public URL of the uploaded image
 */
export async function uploadPropertyImage(
  file: File,
  bucket: string = 'property-images'
): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      throw error
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name (default: 'property-images')
 */
export async function deletePropertyImage(
  url: string,
  bucket: string = 'property-images'
): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = url.split('/')
    const filePath = urlParts[urlParts.length - 1]

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}

/**
 * Upload multiple images
 * @param files - Array of files to upload
 * @param bucket - The storage bucket name
 * @returns Array of public URLs
 */
export async function uploadMultipleImages(
  files: File[],
  bucket: string = 'property-images'
): Promise<string[]> {
  const uploadPromises = files.map(file => uploadPropertyImage(file, bucket))
  return Promise.all(uploadPromises)
}
