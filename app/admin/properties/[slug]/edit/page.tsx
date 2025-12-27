'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { Amenity } from '@/types'
import { getPropertyBySlug, updateProperty } from '@/lib/services/properties'

const AMENITIES: { value: Amenity; label: string }[] = [
  { value: 'wifi', label: 'WiFi' },
  { value: 'ac', label: 'Air Conditioning' },
  { value: 'parking', label: 'Parking' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'pool', label: 'Pool' },
  { value: 'gym', label: 'Gym' },
  { value: 'security', label: '24/7 Security' },
  { value: 'generator', label: 'Generator' },
  { value: 'bar_access', label: 'Bar Access' },
  { value: 'tv', label: 'TV' },
  { value: 'washing_machine', label: 'Washing Machine' },
  { value: 'balcony', label: 'Balcony' },
]

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const propertySlug = params.slug as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    nightlyRate: '',
    cleaningFee: '',
    serviceChargePercent: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as Amenity[],
    hasBarAccess: false,
    cleaningTimeMinutes: '',
    status: 'active' as 'active' | 'inactive' | 'under_maintenance',
    images: [] as string[],
  })

  // Load property data
  useEffect(() => {
    async function loadProperty() {
      setIsLoading(true)
      const property = await getPropertyBySlug(propertySlug)

      if (!property) {
        alert('Property not found')
        router.push('/admin/properties')
        return
      }

      // Populate form with existing data
      setFormData({
        name: property.name,
        description: property.description,
        location: property.location,
        nightlyRate: property.nightlyRate.toString(),
        cleaningFee: property.cleaningFee.toString(),
        serviceChargePercent: property.serviceChargePercent.toString(),
        guests: property.capacity.guests.toString(),
        bedrooms: property.capacity.bedrooms.toString(),
        bathrooms: property.capacity.bathrooms.toString(),
        amenities: property.amenities,
        hasBarAccess: property.hasBarAccess,
        cleaningTimeMinutes: property.cleaningTimeMinutes.toString(),
        status: property.status,
        images: property.images,
      })
      setIsLoading(false)
    }

    loadProperty()
  }, [propertySlug, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const updatedProperty = await updateProperty(propertySlug, {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        nightlyRate: parseInt(formData.nightlyRate),
        cleaningFee: parseInt(formData.cleaningFee),
        serviceChargePercent: parseInt(formData.serviceChargePercent),
        capacity: {
          guests: parseInt(formData.guests),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
        },
        amenities: formData.amenities,
        hasBarAccess: formData.hasBarAccess,
        images: formData.images,
        status: formData.status,
        cleaningTimeMinutes: parseInt(formData.cleaningTimeMinutes),
      })

      if (!updatedProperty) {
        throw new Error('Failed to update property')
      }

      console.log('Property updated successfully:', updatedProperty)

      // Redirect to properties list
      router.push('/admin/properties')
      router.refresh()
    } catch (error) {
      console.error('Error updating property:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update property. Please try again.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAmenityToggle = (amenity: Amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // TODO: Implement actual image upload to cloud storage
    // For now, just add placeholder URLs
    const newImages = Array.from(files).map(
      (file) => URL.createObjectURL(file)
    )
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Loading property...</div>
          <div className="text-sm text-gray-500">Please wait</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/properties">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
          <p className="mt-1 text-gray-600">Update property information and settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Property Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., Luxury 3-Bedroom Penthouse"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, location: e.target.value }))
                    }
                    placeholder="e.g., Victoria Island, Lagos"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Describe the property, its features, and what makes it special..."
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="nightlyRate">Nightly Rate (₦) *</Label>
                    <Input
                      id="nightlyRate"
                      type="number"
                      value={formData.nightlyRate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, nightlyRate: e.target.value }))
                      }
                      placeholder="45000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cleaningFee">Cleaning Fee (₦) *</Label>
                    <Input
                      id="cleaningFee"
                      type="number"
                      value={formData.cleaningFee}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, cleaningFee: e.target.value }))
                      }
                      placeholder="15000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceCharge">Service Charge (%)</Label>
                    <Input
                      id="serviceCharge"
                      type="number"
                      value={formData.serviceChargePercent}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          serviceChargePercent: e.target.value,
                        }))
                      }
                      placeholder="10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card>
              <CardHeader>
                <CardTitle>Capacity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="guests">Max Guests *</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, guests: e.target.value }))
                      }
                      placeholder="6"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bedrooms">Bedrooms *</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))
                      }
                      placeholder="3"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Bathrooms *</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))
                      }
                      placeholder="3"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {AMENITIES.map((amenity) => (
                    <div key={amenity.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.value}
                        checked={formData.amenities.includes(amenity.value)}
                        onCheckedChange={() => handleAmenityToggle(amenity.value)}
                      />
                      <label
                        htmlFor={amenity.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Property Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="images">Upload Images</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">Click to upload images</p>
                      </div>
                      <input
                        id="images"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Property Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive' | 'under_maintenance') =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="under_maintenance">Under Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cleaningTime">Cleaning Time (minutes)</Label>
                  <Input
                    id="cleaningTime"
                    type="number"
                    value={formData.cleaningTimeMinutes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cleaningTimeMinutes: e.target.value,
                      }))
                    }
                    placeholder="120"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Time required for cleaning between bookings
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasBarAccess"
                    checked={formData.hasBarAccess}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, hasBarAccess: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="hasBarAccess"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Includes Bar Access
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
                <Link href="/admin/properties" className="block">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
