'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Zap,
  Wifi,
  Tv,
  UtensilsCrossed,
  Wine,
  Home,
  Clock,
  Sparkles,
  Car,
  MapPin,
  Users,
  DollarSign,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const metadata: Metadata = {
  title: 'About Us - Brooklyn Hills Apartment Uyo | Your Safe Haven',
  description:
    'Discover Brooklyn Hills Apartment Uyo - where safety, comfort, and convenience meet. Premium shortlet apartments with 24/7 security, constant power, ultra-fast WiFi, and exceptional hospitality in Akwa Ibom State.',
  keywords: [
    'about brooklyn hills',
    'uyo apartments',
    'safe accommodation uyo',
    'luxury shortlet akwa ibom',
    'vacation rental uyo',
  ],
}

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80',
    caption: 'Luxurious Living Room',
    description: 'Spacious and elegantly furnished living areas'
  },
  {
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80',
    caption: 'Modern Bedrooms',
    description: 'Comfortable king-sized beds with premium linens'
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80',
    caption: 'Fully Equipped Kitchen',
    description: 'Everything you need for self-catering convenience'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    caption: 'Outdoor Bar & Lounge',
    description: 'Private relaxation space for your enjoyment'
  },
  {
    url: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1920&q=80',
    caption: 'Serene Environment',
    description: 'Peaceful surroundings in upscale residential area'
  },
]

const advantages = [
  {
    icon: MapPin,
    title: 'Prime Location',
    description: 'Only 15 minutes from Uyo city center and major attractions, offering convenience without the noise and congestion of downtown.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: 'Uncompromising Safety',
    description: '24/7 armed security personnel, CCTV surveillance, gated premises, and well-lit surroundings for total peace of mind.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Constant Power Supply',
    description: '24-hour electricity with backup generators and inverters; no interruptions, even during public power outages.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Wifi,
    title: 'Ultra-Fast Wi-Fi',
    description: 'High-speed, reliable internet in every room and common area – perfect for remote work, streaming, or staying connected.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Tv,
    title: 'Smart Entertainment',
    description: 'Smart TVs with Netflix, YouTube, and cable channels in all rooms for unlimited relaxation and entertainment.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fully Equipped Kitchens',
    description: 'Each apartment features a refrigerator, microwave, gas cooker, and cooking utensils for complete self-catering convenience.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Wine,
    title: 'Private Outdoor Bar & Lounge',
    description: 'Exclusive chill-out bar and barbecue area for guests to relax, entertain, or enjoy evening drinks in a secure, private setting.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Home,
    title: 'Spacious & Modern Apartments',
    description: 'Modern, airy rooms with king-sized beds, quality linens, and stylish interiors for maximum comfort.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Sparkles,
    title: 'Daily Housekeeping',
    description: 'Professional cleaning service every day to keep your space spotless and refreshing.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Clock,
    title: 'Standby Generator & Solar',
    description: 'Double assurance of uninterrupted power and lighting at all times.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Car,
    title: 'Ample Secure Parking',
    description: 'Free, well-secured parking space within the gated compound.',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  {
    icon: MapPin,
    title: 'Quiet & Serene Environment',
    description: 'Located in a calm, upscale residential area away from road noise – ideal for rest and recovery.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Users,
    title: 'Friendly & Attentive Staff',
    description: 'Warm, professional team available around the clock to cater to your needs with genuine Akwa Ibom hospitality.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    icon: DollarSign,
    title: 'Affordable Luxury',
    description: 'Premium vacation experience at competitive rates with no hidden charges.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Heart,
    title: 'Family-Friendly & Couple-Ready',
    description: 'Safe, spacious, and romantic environment perfect for families, couples, or solo travelers.',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
]

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80"
            alt="Brooklyn Hills Apartment Uyo"
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Brooklyn Hills
            <span className="block text-orange-400 mt-2">Your Safe Haven in Uyo</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Where exceptional hospitality meets modern comfort in the heart of Akwa Ibom State
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering serene, secure, and luxurious experiences for every guest
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Image with overlay card */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
                  alt="Brooklyn Hills Luxury Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Floating stats card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-orange-600">24/7</div>
                      <div className="text-xs text-gray-600 mt-1">Security</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">4.8★</div>
                      <div className="text-xs text-gray-600 mt-1">Guest Rating</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">100%</div>
                      <div className="text-xs text-gray-600 mt-1">Safe</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mission Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At <span className="font-bold text-orange-600">Brooklyn Hills Apartment Uyo</span>, nestled in the heart of Akwa Ibom State, our mission is to provide a <span className="font-semibold text-gray-900">serene, secure, and luxurious home-away-from-home</span> where every guest can truly unwind, recharge, and create unforgettable holiday memories.
              </p>

              <p className="text-base text-gray-600 leading-relaxed">
                We are committed to delivering exceptional hospitality with warmth and authenticity, blending modern comfort with the rich cultural essence of Uyo.
              </p>

              {/* Key pillars */}
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-3 shadow-sm flex-shrink-0">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Safety First</h3>
                    <p className="text-sm text-gray-600">24/7 security, gated premises, and well-lit surroundings ensure complete peace of mind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-3 shadow-sm flex-shrink-0">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Home Away From Home</h3>
                    <p className="text-sm text-gray-600">Luxurious comfort combined with authentic Akwa Ibom hospitality.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full p-3 shadow-sm flex-shrink-0">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Genuine Care</h3>
                    <p className="text-sm text-gray-600">Professional staff trained to anticipate your needs and exceed expectations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment Gallery Carousel */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience Brooklyn Hills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a visual tour of our premium apartments and amenities
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.caption}</h3>
                    <p className="text-base md:text-lg text-gray-200">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-orange-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-100 via-gray-100 to-slate-200">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Brooklyn Hills?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what sets us apart as the preferred choice for vacation and holiday stays in Akwa Ibom State
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <Card
                  key={index}
                  className="bg-white hover:shadow-xl transition-all duration-300 border-none"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Icon className={`h-10 w-10 ${advantage.color}`} />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {advantage.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-orange-100 to-orange-200">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Experience luxury, safety, and comfort at Brooklyn Hills Apartment Uyo
          </p>
          <Link href="/properties">
            <Button size="lg" className="px-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              View All Properties
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
