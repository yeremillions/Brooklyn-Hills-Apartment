'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Check } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-orange-500 to-orange-600">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Get exclusive deals, new property listings, and travel tips delivered straight to your inbox. Join our community of savvy travelers!
          </p>

          {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-white">
                <Check className="h-6 w-6" />
                <p className="font-semibold text-lg">Successfully subscribed!</p>
              </div>
              <p className="text-white/90 text-sm mt-2">
                Check your email for a confirmation message.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white border-0"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              <p className="text-white/80 text-xs mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
