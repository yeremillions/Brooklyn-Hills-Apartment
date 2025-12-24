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

const advantageCategories = [
  {
    category: 'Security & Safety',
    description: 'Your peace of mind is our priority',
    items: [
      {
        icon: Shield,
        title: 'Uncompromising Safety',
        description: '24/7 armed security, CCTV surveillance, gated premises, and well-lit surroundings.',
      },
      {
        icon: Car,
        title: 'Secure Parking',
        description: 'Free, well-secured parking space within the gated compound.',
      },
      {
        icon: MapPin,
        title: 'Serene Environment',
        description: 'Calm, upscale residential area away from road noise – ideal for rest.',
      },
    ],
  },
  {
    category: 'Power & Connectivity',
    description: 'Stay connected and powered 24/7',
    items: [
      {
        icon: Zap,
        title: 'Constant Power Supply',
        description: '24-hour electricity with backup generators and inverters.',
      },
      {
        icon: Clock,
        title: 'Generator & Solar Backup',
        description: 'Double assurance of uninterrupted power at all times.',
      },
      {
        icon: Wifi,
        title: 'Ultra-Fast Wi-Fi',
        description: 'High-speed internet throughout – perfect for work and streaming.',
      },
    ],
  },
  {
    category: 'Accommodation & Amenities',
    description: 'Everything you need for a comfortable stay',
    items: [
      {
        icon: Home,
        title: 'Modern Apartments',
        description: 'King-sized beds, quality linens, and stylish interiors.',
      },
      {
        icon: UtensilsCrossed,
        title: 'Fully Equipped Kitchens',
        description: 'Refrigerator, microwave, gas cooker, and cooking utensils.',
      },
      {
        icon: Tv,
        title: 'Smart Entertainment',
        description: 'Smart TVs with Netflix, YouTube, and cable channels.',
      },
      {
        icon: Wine,
        title: 'Private Bar & Lounge',
        description: 'Exclusive outdoor space with barbecue area.',
      },
      {
        icon: Sparkles,
        title: 'Daily Housekeeping',
        description: 'Professional cleaning service to keep your space spotless.',
      },
    ],
  },
  {
    category: 'Location & Service',
    description: 'Prime location with exceptional hospitality',
    items: [
      {
        icon: MapPin,
        title: 'Prime Location',
        description: '15 minutes from Uyo city center – convenient yet peaceful.',
      },
      {
        icon: Users,
        title: 'Attentive Staff',
        description: '24/7 professional team with genuine Akwa Ibom hospitality.',
      },
      {
        icon: DollarSign,
        title: 'Affordable Luxury',
        description: 'Premium experience at competitive rates, no hidden charges.',
      },
      {
        icon: Heart,
        title: 'For Everyone',
        description: 'Perfect for families, couples, or solo travelers.',
      },
    ],
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
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Where exceptional hospitality meets modern comfort in the heart of Akwa Ibom State
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              To provide a serene, secure, and luxurious home-away-from-home where every guest can truly unwind, recharge, and create unforgettable memories.
            </p>
          </div>

          {/* Key Pillars - Minimalist Cards */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center border-2 border-gray-900 rounded-full">
                <Shield className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Safety First</h3>
              <p className="text-gray-600 leading-relaxed">
                24/7 security, gated premises, and well-lit surroundings ensure complete peace of mind.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center border-2 border-gray-900 rounded-full">
                <Home className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Comfort & Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Luxurious comfort combined with authentic Akwa Ibom hospitality.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center border-2 border-gray-900 rounded-full">
                <Heart className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Genuine Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional staff trained to anticipate your needs and exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment Gallery Carousel */}
      <section className="py-16 px-4 md:px-8 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience Brooklyn Hills
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Brooklyn Hills?
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for an exceptional stay, organized for your convenience
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-16">
            {advantageCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Category Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {category.category}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>

                {/* Category Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon
                    return (
                      <Card
                        key={itemIndex}
                        className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-100">
                                <Icon className="h-6 w-6 text-orange-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
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
