import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2, Calendar, Shield, Wifi } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-orange-100 py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Shortlet Apartments
              <span className="block text-primary mt-2">in Nigeria</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Experience comfort and luxury with our fully furnished apartments.
              Perfect for business trips, vacations, and extended stays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="text-base px-8">
                  Browse Properties
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Learn More
                </Button>
              </Link>
            </div>
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
