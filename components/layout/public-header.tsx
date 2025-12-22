'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export function PublicHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Brooklyn Hills</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/properties"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive('/properties')
                  ? 'text-primary'
                  : 'text-gray-600'
              )}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive('/about') ? 'text-primary' : 'text-gray-600'
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive('/contact') ? 'text-primary' : 'text-gray-600'
              )}
            >
              Contact
            </Link>
            <div className="flex items-center gap-3 ml-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
