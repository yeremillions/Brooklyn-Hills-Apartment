'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Users,
  Sparkles,
  Wine,
  Wrench,
  DollarSign,
  Settings,
  Home,
  BookOpen,
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Properties',
    href: '/admin/properties',
    icon: Building2,
  },
  {
    name: 'Bookings',
    href: '/admin/bookings',
    icon: BookOpen,
  },
  {
    name: 'Calendar',
    href: '/admin/calendar',
    icon: Calendar,
  },
  {
    name: 'Housekeeping',
    href: '/admin/housekeeping',
    icon: Sparkles,
  },
  {
    name: 'Bar Management',
    href: '/admin/bar',
    icon: Wine,
  },
  {
    name: 'Maintenance',
    href: '/admin/maintenance',
    icon: Wrench,
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
  },
  {
    name: 'Financial',
    href: '/admin/financial',
    icon: DollarSign,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center border-b -mx-6 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Brooklyn Hills Admin</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6'
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                            'h-5 w-5 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            <li className="mt-auto -mx-2">
              <Link
                href="/"
                className="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary"
              >
                <Home className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary" />
                Back to Website
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
