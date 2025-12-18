'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MOCK_PROPERTIES } from '@/lib/constants/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { formatNaira, calculateBookingTotal } from '@/lib/utils/currency'
import { calculateNights, formatDate } from '@/lib/utils/date'
import { Calendar, Users, Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [step, setStep] = useState<'dates' | 'details' | 'payment' | 'confirmation'>('dates')

  // Booking state
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('1')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [bookingReference, setBookingReference] = useState('')

  const property = MOCK_PROPERTIES.find((p) => p.id === params.id)

  // Calculate pricing
  const pricing = useMemo(() => {
    if (!property || !checkIn || !checkOut) {
      return null
    }

    const nights = calculateNights(new Date(checkIn), new Date(checkOut))
    if (nights <= 0) return null

    return calculateBookingTotal(
      property.nightlyRate,
      nights,
      property.cleaningFee,
      property.serviceChargePercent
    )
  }, [property, checkIn, checkOut])

  if (!property) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <Button onClick={() => router.push('/properties')}>
          Back to Properties
        </Button>
      </div>
    )
  }

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkIn && checkOut && pricing && parseInt(guests) <= property.capacity.guests) {
      setStep('details')
    }
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (guestName && guestEmail && guestPhone) {
      setStep('payment')
    }
  }

  const handlePaymentSubmit = () => {
    // Simulate payment success
    const reference = `BKH-${Date.now()}`
    setBookingReference(reference)
    setStep('confirmation')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => step === 'dates' ? router.back() : setStep('dates')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">{property.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <StepIndicator active={step === 'dates'} completed={step !== 'dates'} number={1} label="Dates" />
            <div className="w-12 h-0.5 bg-gray-300" />
            <StepIndicator active={step === 'details'} completed={step === 'payment' || step === 'confirmation'} number={2} label="Details" />
            <div className="w-12 h-0.5 bg-gray-300" />
            <StepIndicator active={step === 'payment'} completed={step === 'confirmation'} number={3} label="Payment" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Dates & Guests */}
            {step === 'dates' && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDateSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Check-in Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={format(new Date(), 'yyyy-MM-dd')}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Check-out Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="number"
                          min="1"
                          max={property.capacity.guests}
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Maximum {property.capacity.guests} guests
                      </p>
                    </div>

                    {checkIn && checkOut && pricing && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800">
                          ✓ Available for{' '}
                          {calculateNights(new Date(checkIn), new Date(checkOut))} nights
                        </p>
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={!pricing}>
                      Continue to Guest Details
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Guest Details */}
            {step === 'details' && (
              <Card>
                <CardHeader>
                  <CardTitle>Guest Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+234 XXX XXX XXXX"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Special Requests (Optional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Any special requests or requirements..."
                          className="w-full min-h-24 px-3 py-2 pl-10 border rounded-md"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      You will be redirected to Paystack to complete your secure payment.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Guest Name:</span>
                        <span className="font-medium">{guestName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{guestEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{guestPhone}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handlePaymentSubmit}
                  >
                    Pay {pricing && formatNaira(pricing.total)} with Paystack
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Secure payment powered by Paystack
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {step === 'confirmation' && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Your booking has been successfully confirmed. We&apos;ve sent a confirmation email to {guestEmail}.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold mb-3">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking Reference:</span>
                        <span className="font-mono font-medium">{bookingReference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property:</span>
                        <span className="font-medium">{property.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">{formatDate(checkIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">{formatDate(checkOut)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">{guests}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Total Paid:</span>
                        <span className="font-bold text-lg text-primary">
                          {pricing && formatNaira(pricing.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => router.push('/properties')}
                    >
                      Browse More Properties
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => router.push('/')}
                    >
                      Back to Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Pricing Sidebar */}
          {step !== 'confirmation' && (
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">{property.name}</h4>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>

                  {checkIn && checkOut && (
                    <div className="pt-4 border-t space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">{formatDate(checkIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">{formatDate(checkOut)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">{guests}</span>
                      </div>
                    </div>
                  )}

                  {pricing && (
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {formatNaira(property.nightlyRate)} × {calculateNights(new Date(checkIn), new Date(checkOut))} nights
                        </span>
                        <span className="font-medium">{formatNaira(pricing.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cleaning Fee</span>
                        <span className="font-medium">{formatNaira(pricing.cleaningFee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service Charge ({property.serviceChargePercent}%)</span>
                        <span className="font-medium">{formatNaira(pricing.serviceCharge)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-lg text-primary">
                          {formatNaira(pricing.total)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StepIndicator({
  active,
  completed,
  number,
  label,
}: {
  active: boolean
  completed: boolean
  number: number
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
          completed
            ? 'bg-green-500 text-white'
            : active
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span className="text-xs font-medium hidden md:block">{label}</span>
    </div>
  )
}
