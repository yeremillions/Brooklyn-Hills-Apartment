import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatNaira } from '@/lib/utils/currency'
import { MapPin, Users, Bed, Bath, Wine } from 'lucide-react'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
        {property.hasBarAccess && (
          <Badge className="absolute top-3 right-3 bg-purple-600">
            <Wine className="h-3 w-3 mr-1" />
            Bar Access
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">
            {property.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <MapPin className="h-4 w-4" />
            {property.location}
          </p>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
          {property.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {property.capacity.guests}
          </span>
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {property.capacity.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.capacity.bathrooms}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {property.amenities.slice(0, 4).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity.replace('_', ' ')}
            </Badge>
          ))}
          {property.amenities.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-primary">
            {formatNaira(property.nightlyRate)}
          </div>
          <div className="text-xs text-gray-600">per night</div>
        </div>
        <Link href={`/properties/${property.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
