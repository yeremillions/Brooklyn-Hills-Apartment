'use client'

import { useState } from 'react'
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface AvailabilityCalendarProps {
  bookedDates?: Date[]
  onClose?: () => void
}

export function AvailabilityCalendar({ bookedDates = [], onClose }: AvailabilityCalendarProps) {
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
    <Card className="p-4 relative max-w-md mx-auto">
      {/* Close Button */}
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-100"
        >
          <X className="h-3 w-3" />
        </Button>
      )}

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            className="h-7 w-7 p-0"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={`${day}-${index}`} className="text-center text-[10px] font-semibold text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5">
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
                aspect-square flex items-center justify-center rounded text-xs font-medium transition-colors
                ${today ? 'ring-1 ring-orange-500' : ''}
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
      <div className="mt-3 flex items-center justify-center gap-3 text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-green-100 border border-green-200"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-red-100 border border-red-200"></div>
          <span className="text-gray-600">Booked</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded bg-gray-100 border border-gray-200"></div>
          <span className="text-gray-600">Past</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 text-center">
        <Link href="/properties">
          <Button className="w-full px-4 h-9 text-sm">
            Book Your Dates
          </Button>
        </Link>
      </div>
    </Card>
  )
}
