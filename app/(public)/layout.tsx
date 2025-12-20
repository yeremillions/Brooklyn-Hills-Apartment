'use client'

import { usePathname } from 'next/navigation'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { NewsletterSignup } from '@/components/public/newsletter-signup'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBookingPage = pathname?.startsWith('/booking')

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      {!isBookingPage && <NewsletterSignup />}
      <PublicFooter />
    </div>
  )
}
