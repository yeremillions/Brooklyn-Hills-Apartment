'use client'

import { useState, useMemo } from 'react'
import { addDays } from 'date-fns'
import { FeaturedPropertyCard } from '@/components/public/featured-property-card'
import { AvailabilityCalendar } from '@/components/public/availability-calendar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_PROPERTIES, AMENITY_LABELS } from '@/lib/constants/mock-data'
import { Amenity } from '@/types'
import { Search, SlidersHorizontal, X, Calendar } from 'lucide-react'

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minGuests, setMinGuests] = useState<string>('')
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  // Mock booked dates for demonstration
  const today = new Date()
  const bookedDates = [
    addDays(today, 3),
    addDays(today, 4),
    addDays(today, 5),
    addDays(today, 10),
    addDays(today, 11),
    addDays(today, 18),
    addDays(today, 19),
    addDays(today, 20),
    addDays(today, 25),
  ]

  // Extract unique locations
  const locations = useMemo(() => {
    const uniqueLocations = new Set(
      MOCK_PROPERTIES.map((p) => p.location)
    )
    return Array.from(uniqueLocations)
  }, [])

  // Filter properties
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((property) => {
      // Search query
      if (
        searchQuery &&
        !property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Location filter
      if (selectedLocation && property.location !== selectedLocation) {
        return false
      }

      // Price filter
      if (minPrice && property.nightlyRate < parseInt(minPrice)) {
        return false
      }
      if (maxPrice && property.nightlyRate > parseInt(maxPrice)) {
        return false
      }

      // Guests filter
      if (minGuests && property.capacity.guests < parseInt(minGuests)) {
        return false
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          property.amenities.includes(amenity)
        )
        if (!hasAllAmenities) {
          return false
        }
      }

      return true
    })
  }, [
    searchQuery,
    selectedLocation,
    minPrice,
    maxPrice,
    minGuests,
    selectedAmenities,
  ])

  const toggleAmenity = (amenity: Amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedLocation('')
    setMinPrice('')
    setMaxPrice('')
    setMinGuests('')
    setSelectedAmenities([])
  }

  const hasActiveFilters =
    selectedLocation ||
    minPrice ||
    maxPrice ||
    minGuests ||
    selectedAmenities.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Browse our collection of premium apartments across Nigeria
          </p>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by property name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2" variant="destructive">
                  {[
                    selectedLocation,
                    minPrice,
                    maxPrice,
                    minGuests,
                    ...selectedAmenities,
                  ].filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Calendar Toggle Link */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="text-sm text-orange-600 hover:text-orange-700 underline flex items-center gap-2 mx-auto"
            >
              <Calendar className="h-4 w-4" />
              Or try our availability calendar
            </button>
          </div>
        </div>
      </div>

      {/* Availability Calendar - Slides down */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showCalendar ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white py-8 px-4 md:px-8 border-b border-gray-200">
          <div className="container mx-auto max-w-4xl">
            <AvailabilityCalendar
              bookedDates={bookedDates}
              onClose={() => setShowCalendar(false)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="lg:w-80">
              <Card className="p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range (per night)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum Guests
                    </label>
                    <Input
                      type="number"
                      placeholder="Number of guests"
                      value={minGuests}
                      onChange={(e) => setMinGuests(e.target.value)}
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Amenities
                    </label>
                    <div className="space-y-2">
                      {(
                        [
                          'wifi',
                          'ac',
                          'parking',
                          'kitchen',
                          'pool',
                          'gym',
                          'bar_access',
                        ] as Amenity[]
                      ).map((amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                            className="rounded"
                          />
                          <span className="text-sm">
                            {AMENITY_LABELS[amenity]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </aside>
          )}

          {/* Properties Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProperties.length}{' '}
                {filteredProperties.length === 1 ? 'property' : 'properties'}{' '}
                found
              </p>
            </div>

            {filteredProperties.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600 mb-4">
                  No properties match your filters
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <FeaturedPropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
