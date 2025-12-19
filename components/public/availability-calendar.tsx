'use client'

import { useState } from 'react'
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface AvailabilityCalendarProps {
  bookedDates?: Date[]
}

export function AvailabilityCalendar({ bookedDates = [] }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = monthStart.getDay()

  // Create padding for days before month starts
  const paddingDays = Array(firstDayOfWeek).fill(null)

  // Check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate =>
      format(bookedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }

  // Check if a date is in the past
  const isPast = (date: Date) => {
    return isBefore(date, startOfDay(new Date()))
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <Card className="p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Padding days */}
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="aspect-square" />
        ))}

        {/* Actual days */}
        {daysInMonth.map((day) => {
          const past = isPast(day)
          const booked = isDateBooked(day)
          const today = isToday(day)
          const available = !past && !booked

          return (
            <div
              key={day.toISOString()}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                ${today ? 'ring-2 ring-orange-500' : ''}
                ${available ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer' : ''}
                ${booked ? 'bg-red-100 text-red-700' : ''}
                ${past ? 'bg-gray-100 text-gray-400' : ''}
              `}
            >
              {format(day, 'd')}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
          <span className="text-gray-600">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200"></div>
          <span className="text-gray-600">Past</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link href="/properties">
          <Button size="lg" className="w-full md:w-auto px-8">
            Book Your Dates
          </Button>
        </Link>
      </div>
    </Card>
  )
}
