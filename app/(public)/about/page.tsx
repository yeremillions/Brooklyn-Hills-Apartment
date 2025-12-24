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

      {/* Mission Statement Section - Redesigned */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-3 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            {/* Left: Image with overlay card */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
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
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  At <span className="font-bold text-orange-600">Brooklyn Hills Apartment Uyo</span>, nestled in the heart of Akwa Ibom State, our mission is to provide a <span className="font-semibold text-gray-900">serene, secure, and luxurious home-away-from-home</span> where every guest can truly unwind, recharge, and create unforgettable holiday memories.
                </p>

                <p className="text-base text-gray-600 leading-relaxed">
                  We are committed to delivering exceptional hospitality with warmth and authenticity, blending modern comfort with the rich cultural essence of Uyo.
                </p>
              </div>

              {/* Key pillars */}
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-orange-500">
                  <div className="bg-orange-100 rounded-lg p-3 flex-shrink-0">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Safety First</h3>
                    <p className="text-sm text-gray-600">24/7 security, gated premises, and well-lit surroundings ensure complete peace of mind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-500">
                  <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Home Away From Home</h3>
                    <p className="text-sm text-gray-600">Luxurious comfort combined with authentic Akwa Ibom hospitality.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
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

          {/* Bottom quote section */}
          <div className="relative">
            <Card className="border-none shadow-2xl bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
              <CardContent className="p-8 md:p-12 relative">
                {/* Decorative quote mark */}
                <div className="absolute top-4 left-4 text-white/10 text-[120px] font-serif leading-none">"</div>

                <div className="relative z-10 text-center">
                  <p className="text-xl md:text-2xl font-semibold text-white mb-4 leading-relaxed">
                    Brooklyn Hills Apartment Uyo is more than just a place to stay — it is where holidays feel like home, and every guest leaves feeling refreshed, valued, and eager to return.
                  </p>

                  <div className="w-16 h-1 bg-white/50 mx-auto my-6"></div>

                  <p className="text-2xl md:text-3xl font-bold text-white">
                    Welcome to your safe haven in Uyo.
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-orange-100 mt-2">
                    Welcome to Brooklyn Hills.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
