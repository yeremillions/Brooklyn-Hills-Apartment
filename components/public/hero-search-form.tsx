'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Search } from 'lucide-react'
import { format } from 'date-fns'

export function HeroSearchForm() {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to properties page with date filters
    if (checkIn && checkOut) {
      router.push(`/properties?checkIn=${checkIn}&checkOut=${checkOut}`)
    } else {
      router.push('/properties')
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-4 md:p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="pl-10"
              placeholder="Select date"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || format(new Date(), 'yyyy-MM-dd')}
              className="pl-10"
              placeholder="Select date"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            size="lg"
            className="w-full"
          >
            <Search className="h-5 w-5 mr-2" />
            Check Availability
          </Button>
        </div>
      </div>
    </form>
  )
}
