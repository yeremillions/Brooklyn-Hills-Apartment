import type { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
} from 'lucide-react'

export const metadata: Metadata = {
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80"
            alt="Brooklyn Hills Apartment Uyo"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 md:px-8 relative z-10 text-center">
          <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm">
            Premium Vacation Experience
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            About Brooklyn Hills
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            Your Safe Haven in Uyo
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-4">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
                Our Mission
              </h2>

              <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
                <p>
                  At <span className="font-semibold text-orange-600">Brooklyn Hills Apartment Uyo</span>, nestled in the heart of Akwa Ibom State, our mission is to provide a serene, secure, and luxurious home-away-from-home where every guest can truly unwind, recharge, and create unforgettable holiday memories.
                </p>

                <p>
                  We are committed to delivering exceptional hospitality with warmth and authenticity, blending modern comfort with the rich cultural essence of Uyo. Whether you're visiting for a peaceful vacation, a family getaway, or a quiet retreat, we promise a sanctuary of safety, tranquility, and genuine care.
                </p>

                <p className="font-medium text-gray-900">
                  Your safety is our highest priority. From 24/7 security and gated premises to well-lit surroundings and professional staff trained to anticipate your needs, we ensure complete peace of mind from the moment you arrive.
                </p>

                <p className="text-xl font-semibold text-center text-orange-600 pt-4">
                  Brooklyn Hills Apartment Uyo is more than just a place to stay — it is where holidays feel like home, and every guest leaves feeling refreshed, valued, and eager to return.
                </p>

                <p className="text-center text-2xl font-bold text-gray-900 pt-4">
                  Welcome to your safe haven in Uyo.<br />
                  <span className="text-orange-600">Welcome to Brooklyn Hills.</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Competitive Advantages Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Our Competitive Advantages
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets Brooklyn Hills Apartment Uyo apart as the preferred choice for vacation and holiday stays in Akwa Ibom State
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-200"
                >
                  <CardContent className="p-6">
                    <div className={`${advantage.bgColor} rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-7 w-7 ${advantage.color}`} />
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
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience the Ultimate Holiday
          </h2>
          <p className="text-xl text-orange-50 mb-8">
            Where safety, comfort, and convenience meet to deliver the ultimate holiday experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/properties"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-orange-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              View Our Properties
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-orange-700 rounded-lg hover:bg-orange-800 transition-colors border-2 border-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
