import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { HeroSearchForm } from '@/components/public/hero-search-form'
import { FeaturedPropertyCard } from '@/components/public/featured-property-card'
import { TestimonialCard } from '@/components/public/testimonial-card'
import { FAQSection } from '@/components/public/faq-section'
import { NewsletterSection } from '@/components/public/newsletter-section'
import { MOCK_PROPERTIES, MOCK_TESTIMONIALS } from '@/lib/constants/mock-data'
import { Building2, Calendar, Shield, Wifi, RefreshCw, Zap, BadgePercent, Search, Lock, Key } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[546px] md:h-[623px] flex items-center">
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
          <div className="absolute inset-0 bg-black/50"></div>
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
            <div className="text-white/90 text-sm md:text-base">
              <span className="font-semibold">4.8/5 ⭐⭐⭐⭐⭐</span> from 150+ guests
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-8 px-4 md:px-8 bg-white border-y border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-gray-200">
            {/* Stat 1 */}
            <div className="flex items-center justify-center gap-4">
              <div className="bg-orange-100 rounded-full p-3">
                <RefreshCw className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Flexible Cancellation</div>
                <div className="text-sm text-gray-500">Cancel anytime</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center justify-center gap-4">
              <div className="bg-orange-100 rounded-full p-3">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Same-Day Booking</div>
                <div className="text-sm text-gray-500">Book today, check-in today</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center justify-center gap-4">
              <div className="bg-orange-100 rounded-full p-3">
                <BadgePercent className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Corporate Discounts</div>
                <div className="text-sm text-gray-500">Special business rates</div>
              </div>
            </div>
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
              Booking your perfect apartment is quick and easy. Follow these simple steps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="bg-orange-500 rounded-full p-6">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Search & Compare</h3>
              <p className="text-gray-600">
                Browse our premium properties, compare amenities, and find the perfect apartment that meets your needs and budget.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="bg-orange-500 rounded-full p-6">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Securely</h3>
              <p className="text-gray-600">
                Select your dates, enter guest details, and complete your booking with our secure payment system via Paystack.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="bg-orange-500 rounded-full p-6">
                    <Key className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Check-in & Enjoy</h3>
              <p className="text-gray-600">
                Receive your confirmation, check-in at your scheduled time, and enjoy a comfortable, luxurious stay at Brooklyn Hills.
              </p>
            </div>
          </div>

          {/* CTA Message */}
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900 mb-4">It's that simple!</p>
            <Link href="/properties">
              <Button size="lg" className="px-8">
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
              <Button size="lg" className="px-8">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
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
      <section id="features" className="py-16 px-4 md:px-8 bg-white">
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

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-primary text-white">
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
              className="text-base px-8 bg-white text-primary hover:bg-gray-100"
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
