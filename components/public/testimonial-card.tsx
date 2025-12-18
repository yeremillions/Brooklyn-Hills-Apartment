import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

export interface Testimonial {
  id: string
  guestName: string
  guestPhoto: string
  location: string
  rating: number
  reviewText: string
  date: string
  propertyStayed?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        {/* Quote Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 rounded-full p-3">
            <Quote className="h-6 w-6 text-orange-600" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500 text-lg">
              {i < testimonial.rating ? '⭐' : '☆'}
            </span>
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 text-center mb-6 italic leading-relaxed">
          "{testimonial.reviewText}"
        </p>

        {/* Guest Info */}
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-orange-200">
            <Image
              src={testimonial.guestPhoto}
              alt={testimonial.guestName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <h4 className="font-semibold text-gray-900">{testimonial.guestName}</h4>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
          <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
        </div>
      </CardContent>
    </Card>
  )
}
