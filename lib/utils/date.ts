import { differenceInDays, format, parseISO } from 'date-fns'

/**
 * Calculate number of nights between two dates
 */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  return Math.max(0, differenceInDays(checkOut, checkIn))
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, formatString = 'MMM dd, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatString)
}

/**
 * Check if date is in the past
 */
export function isPastDate(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

/**
 * Generate date range between two dates
 */
export function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = []
  const currentDate = new Date(start)

  while (currentDate <= end) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
