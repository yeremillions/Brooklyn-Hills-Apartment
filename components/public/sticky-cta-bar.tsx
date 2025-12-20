'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 shadow-2xl">
        <Link href="/properties">
          <Button
            size="lg"
            className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold shadow-lg h-12"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Check Availability
          </Button>
        </Link>
      </div>
    </div>
  )
}
