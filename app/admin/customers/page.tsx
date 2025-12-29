'use client'

import { useState } from 'react'
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
import {
  Users,
  Search,
  Star,
  TrendingUp,
  Calendar,
  DollarSign,
  Eye,
  Mail,
  Phone,
} from 'lucide-react'
import { format } from 'date-fns'

// Mock customer data
const CUSTOMERS = [
  {
    id: 'CUST001',
    name: 'Adebayo Johnson',
    email: 'adebayo.j@email.com',
    phone: '+234 803 123 4567',
    totalBookings: 5,
    totalSpent: 1850000,
    lastBooking: '2024-12-25T00:00:00Z',
    joinedDate: '2024-01-15T00:00:00Z',
    status: 'vip',
    preferredProperty: 'Luxury 3-Bedroom Penthouse',
    rating: 5,
    notes: 'Prefers late check-in. Excellent guest.',
  },
  {
    id: 'CUST002',
    name: 'Grace Eze',
    email: 'grace.eze@email.com',
    phone: '+234 809 456 7890',
    totalBookings: 8,
    totalSpent: 3250000,
    lastBooking: '2024-12-28T00:00:00Z',
    joinedDate: '2023-11-20T00:00:00Z',
    status: 'vip',
    preferredProperty: 'Family 4-Bedroom Home',
    rating: 5,
    notes: 'Repeat customer. Books for family gatherings.',
  },
  {
    id: 'CUST003',
    name: 'Tunde Williams',
    email: 'tunde.w@email.com',
    phone: '+234 807 345 6789',
    totalBookings: 3,
    totalSpent: 680000,
    lastBooking: '2024-12-20T00:00:00Z',
    joinedDate: '2024-06-10T00:00:00Z',
    status: 'regular',
    preferredProperty: 'Executive Studio',
    rating: 4,
    notes: 'Business traveler. Clean and quiet.',
  },
  {
    id: 'CUST004',
    name: 'Chioma Okafor',
    email: 'chioma.ok@email.com',
    phone: '+234 805 234 5678',
    totalBookings: 2,
    totalSpent: 560000,
    lastBooking: '2024-12-23T00:00:00Z',
    joinedDate: '2024-08-05T00:00:00Z',
    status: 'regular',
    preferredProperty: 'Cozy 2-Bedroom Apartment',
    rating: 5,
    notes: 'Friendly and communicative.',
  },
  {
    id: 'CUST005',
    name: 'Ibrahim Musa',
    email: 'ibrahim.m@email.com',
    phone: '+234 810 567 8901',
    totalBookings: 1,
    totalSpent: 450000,
    lastBooking: '2024-12-15T00:00:00Z',
    joinedDate: '2024-12-01T00:00:00Z',
    status: 'new',
    preferredProperty: 'Luxury Penthouse',
    rating: 5,
    notes: 'First-time guest. Left great review.',
  },
  {
    id: 'CUST006',
    name: 'Folake Adeyemi',
    email: 'folake.a@email.com',
    phone: '+234 811 678 9012',
    totalBookings: 4,
    totalSpent: 1120000,
    lastBooking: '2024-11-18T00:00:00Z',
    joinedDate: '2024-03-22T00:00:00Z',
    status: 'regular',
    preferredProperty: 'Luxury Penthouse',
    rating: 4,
    notes: 'Books for weekends. Punctual.',
  },
]

const BOOKING_HISTORY = [
  { customerId: 'CUST001', date: '2024-12-25', property: 'Luxury Penthouse', amount: 495000, nights: 3 },
  { customerId: 'CUST001', date: '2024-10-10', property: 'Luxury Penthouse', amount: 330000, nights: 2 },
  { customerId: 'CUST001', date: '2024-08-15', property: 'Executive Studio', amount: 242000, nights: 2 },
  { customerId: 'CUST001', date: '2024-06-20', property: 'Luxury Penthouse', amount: 495000, nights: 3 },
  { customerId: 'CUST001', date: '2024-02-14', property: '2-Bedroom Apartment', amount: 288000, nights: 2 },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredCustomers = CUSTOMERS.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: CUSTOMERS.length,
    vip: CUSTOMERS.filter((c) => c.status === 'vip').length,
    regular: CUSTOMERS.filter((c) => c.status === 'regular').length,
    new: CUSTOMERS.filter((c) => c.status === 'new').length,
    totalRevenue: CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0),
    avgBookings: Math.round(
      CUSTOMERS.reduce((sum, c) => sum + c.totalBookings, 0) / CUSTOMERS.length
    ),
  }

  // Top customers by spending
  const topCustomers = [...CUSTOMERS]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: 'default' | 'success' | 'warning' }
    > = {
      vip: { label: 'VIP', variant: 'success' },
      regular: { label: 'Regular', variant: 'default' },
      new: { label: 'New', variant: 'warning' },
    }

    const config = variants[status] || variants.new
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
        <p className="mt-1 text-gray-600">
          Manage guest profiles, booking history, and customer relationships
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Customers</span>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600 mt-1">Registered guests</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">VIP Guests</span>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.vip}</div>
            <p className="text-xs text-gray-600 mt-1">Premium customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">New Guests</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.new}</div>
            <p className="text-xs text-gray-600 mt-1">First-time bookers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Avg Bookings</span>
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.avgBookings}</div>
            <p className="text-xs text-gray-600 mt-1">Per customer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Revenue</span>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatNaira(stats.totalRevenue)}
            </div>
            <p className="text-xs text-gray-600 mt-1">All customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Customers by Spending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {customer.totalBookings} bookings
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {getRatingStars(customer.rating)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    {formatNaira(customer.totalSpent)}
                  </p>
                  {getStatusBadge(customer.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[250px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="min-w-[180px]">Name & Contact</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="w-[80px] text-center hidden xl:table-cell">Bookings</TableHead>
                  <TableHead className="min-w-[110px]">Total Spent</TableHead>
                  <TableHead className="w-[80px] text-center hidden lg:table-cell">Rating</TableHead>
                  <TableHead className="min-w-[120px] hidden 2xl:table-cell">Last Booking</TableHead>
                  <TableHead className="w-[80px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="py-3">
                        <span className="font-mono font-semibold text-xs">{customer.id}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div>
                          <p className="font-medium text-xs leading-tight">{customer.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-[10px] text-gray-600 truncate max-w-[150px]">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-[10px] text-gray-600">{customer.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">{getStatusBadge(customer.status)}</TableCell>
                      <TableCell className="py-3 text-center hidden xl:table-cell">
                        <span className="font-semibold text-xs">{customer.totalBookings}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="font-semibold text-xs">
                          {formatNaira(customer.totalSpent)}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-center hidden lg:table-cell">
                        <span className="text-xs">{getRatingStars(customer.rating)}</span>
                      </TableCell>
                      <TableCell className="py-3 hidden 2xl:table-cell">
                        <span className="text-xs">
                          {format(new Date(customer.lastBooking), 'MMM dd, yyyy')}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center justify-center">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredCustomers.length} of {CUSTOMERS.length} customers
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
