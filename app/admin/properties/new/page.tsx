'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { addProperty } from '@/lib/services/properties'
import { uploadMultipleImages } from '@/lib/supabase/storage'

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

export default function NewPropertyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    nightlyRate: '',
    cleaningFee: '',
    serviceChargePercent: '10',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as Amenity[],
    hasBarAccess: false,
    cleaningTimeMinutes: '120',
    status: 'active' as 'active' | 'inactive' | 'under_maintenance',
    images: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create new property with proper structure
      const newProperty = await addProperty({
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
        images: formData.images.length > 0 ? formData.images : [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
        ],
        status: formData.status,
        cleaningTimeMinutes: parseInt(formData.cleaningTimeMinutes),
      })

      if (!newProperty) {
        throw new Error('Failed to create property')
      }

      console.log('Property created successfully:', newProperty)

      // Redirect to properties list
      router.push('/admin/properties')
      router.refresh()
    } catch (error) {
      console.error('Error creating property:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create property. Please try again.'
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploadingImages(true)
    try {
      const filesArray = Array.from(files)

      // Upload images to Supabase Storage
      const uploadedUrls = await uploadMultipleImages(filesArray)

      // Add uploaded URLs to form data
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }))

      alert(`Successfully uploaded ${uploadedUrls.length} image(s)`)
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload images. Please ensure Supabase Storage is set up correctly.')
    } finally {
      setIsUploadingImages(false)
      // Reset file input
      e.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
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
          <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
          <p className="mt-1 text-gray-600">Create a new shortlet apartment listing</p>
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
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg ${
                        isUploadingImages ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-100'
                      } bg-gray-50`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className={`w-8 h-8 mb-2 text-gray-500 ${isUploadingImages ? 'animate-pulse' : ''}`} />
                        <p className="text-sm text-gray-500">
                          {isUploadingImages ? 'Uploading images...' : 'Click to upload images'}
                        </p>
                        {isUploadingImages && (
                          <p className="text-xs text-gray-400 mt-1">Please wait</p>
                        )}
                      </div>
                      <input
                        id="images"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImages}
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
                  {isSubmitting ? 'Creating...' : 'Create Property'}
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
