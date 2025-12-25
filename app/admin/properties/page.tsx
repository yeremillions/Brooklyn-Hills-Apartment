'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatNaira } from '@/lib/utils/currency'
import { getAllProperties } from '@/lib/services/properties'
import { Property } from '@/types'
import { Building2, Plus, Search, Edit, Trash2, Eye, MapPin } from 'lucide-react'

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [properties, setProperties] = useState<Property[]>([])

  // Load properties from localStorage on mount
  useEffect(() => {
    setProperties(getAllProperties())
  }, [])

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="mt-1 text-gray-600">
            Manage your shortlet apartments and their details
          </p>
        </div>
        <Link href="/admin/properties/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Properties</span>
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-gray-600 mt-1">Across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Active</span>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div className="text-2xl font-bold">
              {properties.filter((p) => p.status === 'active').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Available for booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Avg. Nightly Rate</span>
              <span className="text-xs text-primary">₦</span>
            </div>
            <div className="text-2xl font-bold">
              {formatNaira(
                Math.round(
                  properties.reduce((sum, p) => sum + p.nightlyRate, 0) / properties.length
                )
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">Across all properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Capacity</span>
              <span className="text-xs text-gray-400">Guests</span>
            </div>
            <div className="text-2xl font-bold">
              {properties.reduce((sum, p) => sum + p.capacity.guests, 0)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Maximum guests</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Properties Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Nightly Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No properties found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={property.images[0]}
                              alt={property.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{property.name}</p>
                            <p className="text-xs text-gray-500">
                              {property.capacity.bedrooms} bed · {property.capacity.bathrooms} bath
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{property.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{property.capacity.guests} guests</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{formatNaira(property.nightlyRate)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={property.status === 'active' ? 'success' : 'default'}
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/properties/${property.id}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/properties/${property.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredProperties.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredProperties.length} of {properties.length} properties
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
