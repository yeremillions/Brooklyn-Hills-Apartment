import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brooklyn Hills Apartments - Premium Shortlet Apartments in Nigeria',
  description:
    'Book premium shortlet apartments with bar access and modern amenities across Nigeria. Perfect for business trips, vacations, and extended stays.',
  keywords: [
    'shortlet',
    'apartment rental',
    'Nigeria accommodation',
    'vacation rental',
    'furnished apartments',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
