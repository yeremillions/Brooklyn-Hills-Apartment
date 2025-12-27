import { Property } from '@/types'

const API_BASE = '/api/properties'

// Get all properties
export async function getAllProperties(): Promise<Property[]> {
  try {
    const response = await fetch(API_BASE, {
      cache: 'no-store', // Always get fresh data
    })

    if (!response.ok) {
      throw new Error('Failed to fetch properties')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Get property by slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE}/${slug}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error('Failed to fetch property')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

// Alias for backward compatibility (deprecated - use getPropertyBySlug)
export const getPropertyById = getPropertyBySlug

// Add new property
export async function addProperty(
  property: Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
): Promise<Property | null> {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.error || 'Failed to create property'
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating property:', error)
    // Re-throw with better message
    throw error
  }
}

// Update existing property
export async function updateProperty(
  slug: string,
  updates: Partial<Omit<Property, 'id' | 'slug' | 'createdAt' | 'updatedAt'>>
): Promise<Property | null> {
  try {
    // First get the existing property
    const existing = await getPropertyBySlug(slug)
    if (!existing) return null

    // Merge updates with existing property
    const updatedProperty = {
      ...existing,
      ...updates,
    }

    const response = await fetch(`${API_BASE}/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProperty),
    })

    if (!response.ok) {
      throw new Error('Failed to update property')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating property:', error)
    return null
  }
}

// Delete property
export async function deleteProperty(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/${slug}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete property')
    }

    return true
  } catch (error) {
    console.error('Error deleting property:', error)
    return false
  }
}
