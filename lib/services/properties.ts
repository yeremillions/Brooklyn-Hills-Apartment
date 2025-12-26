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

// Get property by ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
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

// Add new property
export async function addProperty(
  property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>
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
      throw new Error('Failed to create property')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating property:', error)
    return null
  }
}

// Update existing property
export async function updateProperty(
  id: string,
  updates: Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Property | null> {
  try {
    // First get the existing property
    const existing = await getPropertyById(id)
    if (!existing) return null

    // Merge updates with existing property
    const updatedProperty = {
      ...existing,
      ...updates,
    }

    const response = await fetch(`${API_BASE}/${id}`, {
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
export async function deleteProperty(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
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
