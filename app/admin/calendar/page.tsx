'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatNaira } from '@/lib/utils/currency'
import { MOCK_PROPERTIES } from '@/lib/constants/mock-data'
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Info,
} from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  parseISO,
} from 'date-fns'

// Mock booking data - same as in bookings page
const MOCK_BOOKINGS = [
  {
    id: 'BK001',
    propertyId: '1',
    guestName: 'Adebayo Johnson',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    status: 'confirmed',
    totalAmount: 495000,
  },
  {
    id: 'BK002',
    propertyId: '2',
    guestName: 'Chioma Okafor',
    checkIn: '2024-12-23',
    checkOut: '2024-12-26',
    status: 'pending',
    totalAmount: 308000,
  },
  {
    id: 'BK003',
    propertyId: '3',
    guestName: 'Tunde Williams',
    checkIn: '2024-12-20',
    checkOut: '2024-12-22',
    status: 'checked_in',
    totalAmount: 242000,
  },
  {
    id: 'BK004',
    propertyId: '4',
    guestName: 'Grace Eze',
    checkIn: '2024-12-28',
    checkOut: '2025-01-02',
    status: 'confirmed',
    totalAmount: 1430000,
  },
  {
    id: 'BK005',
    propertyId: '1',
    guestName: 'Ibrahim Musa',
    checkIn: '2024-12-15',
    checkOut: '2024-12-17',
    status: 'completed',
    totalAmount: 450000,
  },
  {
    id: 'BK006',
    propertyId: '1',
    guestName: 'Folake Adeyemi',
    checkIn: '2025-01-05',
    checkOut: '2025-01-08',
    status: 'confirmed',
    totalAmount: 495000,
  },
]

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedProperty, setSelectedProperty] = useState<string>('all')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Filter bookings by selected property
  const filteredBookings =
    selectedProperty === 'all'
      ? MOCK_BOOKINGS
      : MOCK_BOOKINGS.filter((b) => b.propertyId === selectedProperty)

  // Get bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    return filteredBookings.filter((booking) => {
      const checkIn = parseISO(booking.checkIn)
      const checkOut = parseISO(booking.checkOut)
      return isWithinInterval(date, { start: checkIn, end: checkOut })
    })
  }

  // Get occupancy rate for current month
  const getOccupancyRate = () => {
    const totalDays = days.length
    const properties = selectedProperty === 'all' ? MOCK_PROPERTIES : MOCK_PROPERTIES.filter(p => p.id === selectedProperty)
    const totalPropertyDays = totalDays * properties.length

    let bookedDays = 0
    days.forEach((day) => {
      const bookingsOnDay = getBookingsForDate(day)
      bookedDays += bookingsOnDay.length
    })

    return Math.round((bookedDays / totalPropertyDays) * 100)
  }

  // Get total bookings for current month
  const getMonthlyBookings = () => {
    return filteredBookings.filter((booking) => {
      const checkIn = parseISO(booking.checkIn)
      return isSameMonth(checkIn, currentMonth)
    }).length
  }

  // Get total revenue for current month
  const getMonthlyRevenue = () => {
    return filteredBookings
      .filter((booking) => {
        const checkIn = parseISO(booking.checkIn)
        return isSameMonth(checkIn, currentMonth) && booking.status !== 'cancelled'
      })
      .reduce((sum, booking) => sum + booking.totalAmount, 0)
  }

  const selectedProperty Data = MOCK_PROPERTIES.find((p) => p.id === selectedProperty)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Availability</h1>
          <p className="mt-1 text-gray-600">Manage property availability and view bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {MOCK_PROPERTIES.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Occupancy Rate</span>
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{getOccupancyRate()}%</div>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Bookings</span>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div className="text-2xl font-bold">{getMonthlyBookings()}</div>
            <p className="text-xs text-gray-600 mt-1">
              {format(currentMonth, 'MMMM yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Revenue</span>
              <span className="text-xs text-primary">₦</span>
            </div>
            <div className="text-2xl font-bold">{formatNaira(getMonthlyRevenue())}</div>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Properties</span>
              <Info className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">
              {selectedProperty === 'all' ? MOCK_PROPERTIES.length : 1}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {selectedProperty === 'all' ? 'All properties' : 'Selected'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex items-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border-2 border-orange-500 rounded"></div>
              <span>Partially Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-500 rounded"></div>
              <span>Fully Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
              <span>Past Date</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Calendar Days */}
            {days.map((day) => {
              const bookings = getBookingsForDate(day)
              const isPast = day < new Date() && !isSameDay(day, new Date())
              const isToday = isSameDay(day, new Date())
              const isSelected = selectedDate && isSameDay(day, selectedDate)

              // Determine availability status
              const maxProperties = selectedProperty === 'all' ? MOCK_PROPERTIES.length : 1
              const bookedCount = bookings.length
              let bgColor = 'bg-green-100 border-green-500'

              if (isPast) {
                bgColor = 'bg-gray-100 border-gray-300'
              } else if (bookedCount === 0) {
                bgColor = 'bg-green-100 border-green-500'
              } else if (bookedCount < maxProperties) {
                bgColor = 'bg-orange-100 border-orange-500'
              } else {
                bgColor = 'bg-red-100 border-red-500'
              }

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square p-2 border-2 rounded-lg hover:shadow-md transition-all ${bgColor} ${
                    isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                  } ${isToday ? 'font-bold' : ''}`}
                  disabled={isPast}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-sm ${isToday ? 'text-primary' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </span>
                    {bookings.length > 0 && (
                      <div className="mt-auto">
                        <Badge
                          variant="secondary"
                          className="text-xs px-1 py-0 h-auto"
                        >
                          {bookings.length}
                        </Badge>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Bookings for {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const dateBookings = getBookingsForDate(selectedDate)
              if (dateBookings.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No bookings on this date</p>
                  </div>
                )
              }

              return (
                <div className="space-y-3">
                  {dateBookings.map((booking) => {
                    const property = MOCK_PROPERTIES.find((p) => p.id === booking.propertyId)
                    return (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono font-semibold text-sm">
                              {booking.id}
                            </span>
                            <Badge
                              variant={
                                booking.status === 'confirmed'
                                  ? 'success'
                                  : booking.status === 'checked_in'
                                  ? 'default'
                                  : 'warning'
                              }
                            >
                              {booking.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="font-medium text-gray-900">{booking.guestName}</p>
                          <p className="text-sm text-gray-600">{property?.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(parseISO(booking.checkIn), 'MMM d')} -{' '}
                            {format(parseISO(booking.checkOut), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {formatNaira(booking.totalAmount)}
                          </p>
                          <Button variant="ghost" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
