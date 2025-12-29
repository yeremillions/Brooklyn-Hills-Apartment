'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatNaira } from '@/lib/utils/currency'
import {
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MoreVertical,
} from 'lucide-react'
import { format } from 'date-fns'

// Mock booking data - replace with API
const MOCK_BOOKINGS = [
  {
    id: 'BK001',
    guestName: 'Adebayo Johnson',
    guestEmail: 'adebayo.j@email.com',
    guestPhone: '+234 803 123 4567',
    property: 'Luxury 3-Bedroom Penthouse',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: 4,
    totalAmount: 495000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-12-18T10:00:00Z',
  },
  {
    id: 'BK002',
    guestName: 'Chioma Okafor',
    guestEmail: 'chioma.ok@email.com',
    guestPhone: '+234 805 234 5678',
    property: 'Cozy 2-Bedroom Apartment',
    checkIn: '2024-12-23',
    checkOut: '2024-12-26',
    guests: 3,
    totalAmount: 308000,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-12-19T14:30:00Z',
  },
  {
    id: 'BK003',
    guestName: 'Tunde Williams',
    guestEmail: 'tunde.w@email.com',
    guestPhone: '+234 807 345 6789',
    property: 'Executive Studio',
    checkIn: '2024-12-20',
    checkOut: '2024-12-22',
    guests: 2,
    totalAmount: 242000,
    status: 'checked_in',
    paymentStatus: 'paid',
    createdAt: '2024-12-15T09:15:00Z',
  },
  {
    id: 'BK004',
    guestName: 'Grace Eze',
    guestEmail: 'grace.eze@email.com',
    guestPhone: '+234 809 456 7890',
    property: 'Family 4-Bedroom Home',
    checkIn: '2024-12-28',
    checkOut: '2025-01-02',
    guests: 8,
    totalAmount: 1430000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-12-17T16:45:00Z',
  },
  {
    id: 'BK005',
    guestName: 'Ibrahim Musa',
    guestEmail: 'ibrahim.m@email.com',
    guestPhone: '+234 810 567 8901',
    property: 'Luxury Penthouse',
    checkIn: '2024-12-15',
    checkOut: '2024-12-17',
    guests: 5,
    totalAmount: 450000,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-12-10T11:20:00Z',
  },
  {
    id: 'BK006',
    guestName: 'Folake Adeyemi',
    guestEmail: 'folake.a@email.com',
    guestPhone: '+234 811 678 9012',
    property: 'Cozy 2-Bedroom',
    checkIn: '2024-12-22',
    checkOut: '2024-12-24',
    guests: 2,
    totalAmount: 280000,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: '2024-12-16T13:00:00Z',
  },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.property.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const stats = {
    total: MOCK_BOOKINGS.length,
    confirmed: MOCK_BOOKINGS.filter((b) => b.status === 'confirmed').length,
    pending: MOCK_BOOKINGS.filter((b) => b.status === 'pending').length,
    checkedIn: MOCK_BOOKINGS.filter((b) => b.status === 'checked_in').length,
    revenue: MOCK_BOOKINGS.filter((b) => b.paymentStatus === 'paid').reduce(
      (sum, b) => sum + b.totalAmount,
      0
    ),
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }
    > = {
      confirmed: { label: 'Confirmed', variant: 'success' },
      pending: { label: 'Pending', variant: 'warning' },
      checked_in: { label: 'Checked In', variant: 'default' },
      completed: { label: 'Completed', variant: 'default' },
      cancelled: { label: 'Cancelled', variant: 'destructive' },
    }

    const config = variants[status] || variants.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }
    > = {
      paid: { label: 'Paid', variant: 'success' },
      pending: { label: 'Pending', variant: 'warning' },
      failed: { label: 'Failed', variant: 'destructive' },
      refunded: { label: 'Refunded', variant: 'default' },
    }

    const config = variants[status] || variants.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="mt-1 text-gray-600">Manage all property reservations and guest stays</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Bookings</span>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Confirmed</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <p className="text-xs text-gray-600 mt-1">Upcoming stays</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending</span>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600 mt-1">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Checked In</span>
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.checkedIn}</div>
            <p className="text-xs text-gray-600 mt-1">Currently occupied</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Revenue</span>
              <span className="text-xs text-primary">₦</span>
            </div>
            <div className="text-2xl font-bold text-primary">{formatNaira(stats.revenue)}</div>
            <p className="text-xs text-gray-600 mt-1">From paid bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by guest, booking ID, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="checked_in">Checked In</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead className="w-[160px]">Guest</TableHead>
                  <TableHead className="w-[140px]">Property</TableHead>
                  <TableHead className="w-[140px]">Check-in / Out</TableHead>
                  <TableHead className="w-[60px] text-center">Guests</TableHead>
                  <TableHead className="w-[110px]">Amount</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[90px]">Payment</TableHead>
                  <TableHead className="w-[70px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="py-3">
                        <span className="font-mono font-semibold text-xs">{booking.id}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div>
                          <p className="font-medium text-xs leading-tight">{booking.guestName}</p>
                          <p className="text-[10px] text-gray-500 truncate max-w-[150px]">{booking.guestEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="text-xs line-clamp-2 leading-tight">{booking.property}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="text-[11px] space-y-0.5">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-500">In:</span>
                            <span className="font-medium">{format(new Date(booking.checkIn), 'MMM dd')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-500">Out:</span>
                            <span className="text-gray-600">{format(new Date(booking.checkOut), 'MMM dd')}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        <span className="text-xs font-medium">{booking.guests}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="font-semibold text-xs">{formatNaira(booking.totalAmount)}</span>
                      </TableCell>
                      <TableCell className="py-3">{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="py-3">{getPaymentBadge(booking.paymentStatus)}</TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center justify-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredBookings.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredBookings.length} of {MOCK_BOOKINGS.length} bookings
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
