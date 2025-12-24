'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80"
            alt="Contact Brooklyn Hills"
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Questions about our apartments? Ready to book? Contact us today
          </p>
        </div>
      </section>

      {/* Quick Contact Cards - Below Hero */}
      <section className="py-12 px-4 md:px-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <Card className="text-center hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                <a href="tel:+234XXXXXXXXXX" className="text-orange-600 hover:text-orange-700 font-medium">
                  +234 XXX XXX XXXX
                </a>
                <p className="text-xs text-gray-500 mt-2">24/7 Available</p>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="text-center hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
                <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium">
                  Chat with Us
                </a>
                <p className="text-xs text-gray-500 mt-2">Quick Response</p>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="text-center hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                <a href="mailto:info@brooklynhills.ng" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  info@brooklynhills.ng
                </a>
                <p className="text-xs text-gray-500 mt-2">Within 24hrs</p>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="text-center hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-purple-600 font-medium text-sm">Brooklyn Hills Estate</p>
                <p className="text-xs text-gray-500 mt-2">Uyo, Akwa Ibom</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Business Hours Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Business Hours & Additional Info - Takes 1 column */}
            <div className="space-y-6">
              {/* Business Hours */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-slate-100 to-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-3">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-300">
                      <span className="text-gray-700 font-medium">Check-in</span>
                      <span className="text-gray-900 font-semibold">2:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-300">
                      <span className="text-gray-700 font-medium">Check-out</span>
                      <span className="text-gray-900 font-semibold">12:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">Support</span>
                      <span className="text-orange-600 font-semibold">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Contact Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-sm">Personalized booking assistance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-sm">Special requests & packages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-sm">Corporate & group bookings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-200 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 text-sm">Property inquiries & tours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right: Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl">
                <CardContent className="p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you as soon as possible
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+234 XXX XXX XXXX"
                          className="w-full h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us about your inquiry, preferred dates, or any questions you have..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12 text-base">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Map Section */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
            alt="Brooklyn Hills Apartments"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>
        </div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <MapPin className="h-20 w-20 text-orange-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Find Us in Uyo</h2>
            <p className="text-lg text-gray-100 mb-6 text-center max-w-xl px-4">
              Brooklyn Hills Estate, located in the heart of Uyo<br />
              Just 15 minutes from city center
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://maps.google.com/?q=Uyo,Akwa+Ibom,Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                  Get Directions via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-orange-100 to-orange-200">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Browse our available apartments and make a reservation today
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
