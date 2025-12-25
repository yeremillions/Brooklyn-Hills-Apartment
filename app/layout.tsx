import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/providers/auth-provider'

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
