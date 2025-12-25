import { Property } from '@/types'
import { MOCK_PROPERTIES } from '@/lib/constants/mock-data'

const STORAGE_KEY = 'brooklyn_hills_properties'

// Initialize localStorage with mock data if empty
function initializeProperties(): Property[] {
  if (typeof window === 'undefined') return MOCK_PROPERTIES

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PROPERTIES))
    return MOCK_PROPERTIES
  }
  return JSON.parse(stored)
}

// Get all properties
export function getAllProperties(): Property[] {
  if (typeof window === 'undefined') return MOCK_PROPERTIES

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return initializeProperties()
  }
  return JSON.parse(stored)
}

// Get property by ID
export function getPropertyById(id: string): Property | undefined {
  const properties = getAllProperties()
  return properties.find((p) => p.id === id)
}

// Add new property
export function addProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Property {
  const properties = getAllProperties()

  const newProperty: Property = {
    ...property,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  properties.push(newProperty)
  saveProperties(properties)

  return newProperty
}

// Update existing property
export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  const properties = getAllProperties()
  const index = properties.findIndex((p) => p.id === id)

  if (index === -1) return null

  properties[index] = {
    ...properties[index],
    ...updates,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  }

  saveProperties(properties)
  return properties[index]
}

// Delete property
export function deleteProperty(id: string): boolean {
  const properties = getAllProperties()
  const filtered = properties.filter((p) => p.id !== id)

  if (filtered.length === properties.length) return false

  saveProperties(filtered)
  return true
}

// Save properties to localStorage
function saveProperties(properties: Property[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
}

// Generate unique ID
function generateId(): string {
  return `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Reset to mock data (useful for testing)
export function resetProperties(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PROPERTIES))
}
