import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HeroSearchForm } from '@/components/public/hero-search-form'
import { FeaturedPropertyCard } from '@/components/public/featured-property-card'
import { TestimonialCard } from '@/components/public/testimonial-card'
import { FAQSection } from '@/components/public/faq-section'
import { StickyCTABar } from '@/components/public/sticky-cta-bar'
import { MOCK_PROPERTIES, MOCK_TESTIMONIALS } from '@/lib/constants/mock-data'
import { Building2, Calendar, Shield, Wifi, RefreshCw, Zap, BadgePercent, Search, Lock, Key } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <StickyCTABar />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[85vh] pt-[12vh] pb-[8vh] md:pt-[12.75vh] md:pb-[8.5vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80"
            alt="Luxury apartment interior"
            fill
            className="object-cover scale-107"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Shortlet Apartments
              <span className="block text-orange-400 mt-2">in the heart of Uyo</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
              Experience comfort and luxury with our fully furnished apartments.
              Perfect for business trips, vacations, and extended stays.
            </p>

            {/* Search Form */}
            <div className="mb-4">
              <HeroSearchForm />
            </div>

            {/* Rating Summary */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-white font-bold text-base md:text-lg">4.8/5</span>
              <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
              <span className="text-white/90 text-sm md:text-base">from 150+ guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-8 px-4 md:px-8 bg-white border-y border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 md:divide-x divide-gray-200">
            {/* Stat 1 */}
            <div className="flex items-center justify-center gap-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-3 shadow-sm">
                <RefreshCw className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Flexible Cancellation</div>
                <div className="text-sm text-gray-500">Cancel anytime</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center justify-center gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-3 shadow-sm">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Same-Day Booking</div>
                <div className="text-sm text-gray-500">Book today, check-in today</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center justify-center gap-4 col-span-2 md:col-span-1">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full p-3 shadow-sm">
                <BadgePercent className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Corporate Discounts</div>
                <div className="text-sm text-gray-500">Special business rates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-6 px-4 md:px-8 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Verified Properties</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Secure Payments</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold">24/7 Support</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <div className="flex items-center gap-2 text-orange-600">
              <span className="font-bold">🔥 12 properties booked today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apartments Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Apartments in Uyo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium apartments, each offering
              luxury, comfort, and modern amenities for your perfect stay.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {MOCK_PROPERTIES.slice(0, 3).map((property) => (
              <FeaturedPropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link href="/properties">
              <Button size="lg" className="px-8 shadow-lg hover:shadow-xl transition-shadow">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your perfect apartment in three simple steps
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
              </div>
              <div className="mb-4">
                <Search className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Search & Compare</h3>
              <p className="text-gray-600">
                Browse our premium properties and compare amenities to find your perfect match.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
              </div>
              <div className="mb-4">
                <Lock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Securely</h3>
              <p className="text-gray-600">
                Select your dates and complete your booking with our secure payment system.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
              </div>
              <div className="mb-4">
                <Key className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Check-in & Enjoy</h3>
              <p className="text-gray-600">
                Receive confirmation and enjoy a comfortable stay at Brooklyn Hills.
              </p>
            </div>
          </div>

          {/* CTA Message */}
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900 mb-4">It's that simple!</p>
            <Link href="/properties">
              <Button size="lg" className="px-8 shadow-lg hover:shadow-xl transition-shadow">
                Start Your Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Apartments Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Apartments in Uyo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium apartments, each offering
              luxury, comfort, and modern amenities for your perfect stay.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {MOCK_PROPERTIES.slice(0, 3).map((property) => (
              <FeaturedPropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link href="/properties">
              <Button size="lg" className="px-8 shadow-lg hover:shadow-xl transition-shadow">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our guests have to say about their
              experiences at Brooklyn Hills Apartments.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_TESTIMONIALS.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Brooklyn Hills?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Building2 className="h-10 w-10 text-primary" />}
              title="Premium Locations"
              description="Strategically located properties in prime areas across Nigeria"
            />
            <FeatureCard
              icon={<Wifi className="h-10 w-10 text-primary" />}
              title="Modern Amenities"
              description="High-speed WiFi, AC, fully equipped kitchens, and more"
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Flexible Booking"
              description="Book for a night, week, or month with competitive rates"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Secure & Safe"
              description="24/7 security, verified properties, and trusted host"
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our available properties and book instantly with secure payment
          </p>
          <Link href="/properties">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 bg-white text-primary hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              View All Properties
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center p-6">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
