'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
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
import { DeleteConfirmationDialog } from '@/components/ui/delete-confirmation-dialog'
import { formatNaira } from '@/lib/utils/currency'
import { getAllProperties, deleteProperty } from '@/lib/services/properties'
import { Property } from '@/types'
import { Building2, Plus, Search, Edit, Trash2, Eye, MapPin, Grid3x3, List, Home, SlidersHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MetricCardSkeleton } from '@/components/ui/metric-card-skeleton'
import { PropertyCardSkeleton } from '@/components/ui/property-card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; name: string } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'rate' | 'capacity'>('name')

  // Load properties from API on mount
  useEffect(() => {
    async function fetchProperties() {
      setIsLoading(true)
      const data = await getAllProperties()
      setProperties(data)
      setIsLoading(false)
    }
    fetchProperties()
  }, [])

  // Open delete confirmation dialog
  const openDeleteDialog = (propertyId: string, propertyName: string) => {
    setPropertyToDelete({ id: propertyId, name: propertyName })
    setDeleteDialogOpen(true)
  }

  // Handle confirmed deletion
  const handleConfirmDelete = async () => {
    if (!propertyToDelete) return

    setDeletingId(propertyToDelete.id)
    try {
      const success = await deleteProperty(propertyToDelete.id)

      if (success) {
        // Remove from local state
        setProperties((prev) => prev.filter((p) => p.slug !== propertyToDelete.id))
        toast.success('Property deleted successfully', {
          description: `"${propertyToDelete.name}" has been removed from your listings.`
        })
        setDeleteDialogOpen(false)
      } else {
        toast.error('Failed to delete property', {
          description: 'Please try again or contact support if the issue persists.'
        })
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      toast.error('Failed to delete property', {
        description: 'An unexpected error occurred. Please try again.'
      })
    } finally {
      setDeletingId(null)
      setPropertyToDelete(null)
    }
  }

  const filteredProperties = properties
    .filter((property) => {
      // Search filter
      const matchesSearch =
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus =
        statusFilter === 'all' ||
        property.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Sorting
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'rate') {
        return b.nightlyRate - a.nightlyRate // Descending
      } else if (sortBy === 'capacity') {
        return b.capacity.guests - a.capacity.guests // Descending
      }
      return 0
    })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="mt-1 text-gray-600">
            Manage your shortlet apartments and their details
          </p>
        </div>
        <Link href="/admin/properties/new">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
        <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="h-full">
          <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total Properties</span>
                <Building2 className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{properties.length}</div>
              <p className="text-xs text-gray-600 mt-1">Across all locations</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="h-full">
          <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 via-white to-green-50/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Active</span>
                <motion.div
                  className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div className="text-2xl font-bold">
                {properties.filter((p) => p.status === 'active').length}
              </div>
              <p className="text-xs text-gray-600 mt-1">Available for booking</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="h-full">
          <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 via-white to-purple-50/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Avg. Nightly Rate</span>
                <span className="text-xs text-primary font-bold">₦</span>
              </div>
              <div className="text-2xl font-bold">
                {properties.length > 0
                  ? formatNaira(
                      Math.round(
                        properties.reduce((sum, p) => sum + p.nightlyRate, 0) / properties.length
                      )
                    )
                  : formatNaira(0)}
              </div>
              <p className="text-xs text-gray-600 mt-1">Across all properties</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="h-full">
          <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total Capacity</span>
                <span className="text-xs text-amber-600">Guests</span>
              </div>
              <div className="text-2xl font-bold">
                {properties.reduce((sum, p) => sum + p.capacity.guests, 0)}
              </div>
              <p className="text-xs text-gray-600 mt-1">Maximum guests</p>
            </CardContent>
          </Card>
        </motion.div>
          </>
        )}
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants}>
        <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Properties</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="gap-2"
              >
                <Grid3x3 className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                Table
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('inactive')}
                >
                  Inactive
                </Button>
              </div>

              <div className="h-4 w-px bg-gray-300" />

              <span className="text-sm text-gray-600">Sort by:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {sortBy === 'name' ? 'Name' : sortBy === 'rate' ? 'Price' : 'Capacity'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy('name')}>
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rate')}>
                    Price (High to Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('capacity')}>
                    Capacity (High to Low)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {isLoading ? (
                <>
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                  <PropertyCardSkeleton />
                </>
              ) : filteredProperties.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState
                    icon={searchQuery ? Search : Building2}
                    title={searchQuery ? 'No properties found' : 'No properties yet'}
                    description={
                      searchQuery
                        ? `We couldn't find any properties matching "${searchQuery}". Try adjusting your search.`
                        : 'Get started by adding your first property to the system.'
                    }
                    actionLabel={searchQuery ? undefined : 'Add Property'}
                    actionHref={searchQuery ? undefined : '/admin/properties/new'}
                  />
                </div>
              ) : (
                filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-gradient-to-br from-gray-50 via-white to-white relative">
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={property.images[0] || '/placeholder.jpg'}
                          alt={property.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-3 right-3 z-10">
                          <Badge variant={property.status === 'active' ? 'success' : 'default'} className="shadow-lg">
                            {property.status}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{property.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span>{property.capacity.bedrooms} bed</span>
                          <span>·</span>
                          <span>{property.capacity.bathrooms} bath</span>
                          <span>·</span>
                          <span>{property.capacity.guests} guests</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-2xl font-bold text-primary">
                              {formatNaira(property.nightlyRate)}
                            </p>
                            <p className="text-xs text-gray-500">per night</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/properties/${property.slug}`} target="_blank" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </Link>
                          <Link href={`/admin/properties/${property.slug}/edit`} className="flex-1">
                            <Button variant="default" size="sm" className="w-full gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => openDeleteDialog(property.slug, property.name)}
                            disabled={deletingId === property.slug}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border rounded-lg overflow-hidden"
            >
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
                  {isLoading ? (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-12 w-16 rounded" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Skeleton className="h-8 w-8 rounded" />
                              <Skeleton className="h-8 w-8 rounded" />
                              <Skeleton className="h-8 w-8 rounded" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : filteredProperties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <EmptyState
                          icon={searchQuery ? Search : Building2}
                          title={searchQuery ? 'No properties found' : 'No properties yet'}
                          description={
                            searchQuery
                              ? `We couldn't find any properties matching "${searchQuery}". Try adjusting your search.`
                              : 'Get started by adding your first property to the system.'
                          }
                          actionLabel={searchQuery ? undefined : 'Add Property'}
                          actionHref={searchQuery ? undefined : '/admin/properties/new'}
                        />
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
                            <Link href={`/properties/${property.slug}`} target="_blank">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/properties/${property.slug}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => openDeleteDialog(property.slug, property.name)}
                              disabled={deletingId === property.slug}
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
            </motion.div>
          )}

          {filteredProperties.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredProperties.length} of {properties.length} properties
            </div>
          )}
        </CardContent>
      </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Property"
        description="Are you sure you want to delete this property?"
        itemName={propertyToDelete?.name}
        isDeleting={deletingId !== null}
      />
    </motion.div>
  )
}
