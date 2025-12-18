'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Property } from '@/types'
import { formatNaira } from '@/lib/utils/currency'
import { Wifi, Wind, Car, Utensils, Wine, Shield, Zap, Users, Bed, Bath } from 'lucide-react'

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  ac: <Wind className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
  kitchen: <Utensils className="h-4 w-4" />,
  bar_access: <Wine className="h-4 w-4" />,
  security: <Shield className="h-4 w-4" />,
  generator: <Zap className="h-4 w-4" />,
}

interface FeaturedPropertyCardProps {
  property: Property
}

export function FeaturedPropertyCard({ property }: FeaturedPropertyCardProps) {
  // Get top amenities to display
  const topAmenities = property.amenities
    .filter((a) => AMENITY_ICONS[a])
    .slice(0, 6)

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all group">
      {/* Image */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}

        {/* Bar Access Badge */}
        {property.hasBarAccess && (
          <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700">
            <Wine className="h-3 w-3 mr-1" />
            Bar Access
          </Badge>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
          <div className="text-xs text-gray-600">From</div>
          <div className="text-lg font-bold text-primary">{formatNaira(property.nightlyRate)}</div>
          <div className="text-xs text-gray-500">per night</div>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Property Name */}
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{property.name}</h3>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-4">{property.location}</p>

        {/* Capacity Info */}
        <div className="flex items-center gap-4 text-sm text-gray-700 mb-4 pb-4 border-b">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gray-500" />
            {property.capacity.guests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-gray-500" />
            {property.capacity.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gray-500" />
            {property.capacity.bathrooms} Baths
          </span>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Facilities</p>
          <div className="grid grid-cols-3 gap-2">
            {topAmenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-1.5 text-xs text-gray-600"
              >
                {AMENITY_ICONS[amenity]}
                <span className="capitalize">{amenity.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/properties/${property.id}`} className="block">
          <Button className="w-full" size="lg">
            View Details & Book
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
