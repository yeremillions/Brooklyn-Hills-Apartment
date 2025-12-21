'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How do I book an apartment?',
    answer: 'Simply browse our available properties, select your preferred dates, and complete the booking process. You can pay securely online via Paystack with your debit card or bank transfer.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major debit cards, bank transfers, and online payments through Paystack. All payments are processed securely in Nigerian Naira (₦).',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes! We offer flexible cancellation. You can cancel or modify your booking up to 24 hours before check-in for a full refund. Contact us for specific terms.',
  },
  {
    question: 'What is the check-in and check-out time?',
    answer: 'Standard check-in is from 2:00 PM and check-out is by 12:00 PM. Early check-in or late check-out may be available upon request, subject to availability.',
  },
  {
    question: 'Are the apartments fully furnished?',
    answer: 'Yes! All our apartments are fully furnished with modern amenities including WiFi, AC, fully equipped kitchen, TV, and quality linens. Some properties also include bar access.',
  },
  {
    question: 'Do you offer corporate discounts?',
    answer: 'Yes, we offer special rates for corporate bookings and long-term stays. Contact our team to discuss customized packages for your business needs.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about booking, payments, and our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
