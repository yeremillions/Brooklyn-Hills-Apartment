'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface AdminSidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function AdminSidebar({ mobileOpen = false, onMobileClose }: AdminSidebarProps = {}) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState))
    // Dispatch custom event for layout to update
    window.dispatchEvent(new Event('sidebarToggle'))
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
        isCollapsed ? "lg:w-20" : "lg:w-64"
      )}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white pb-4 relative">
        <div className={cn(
          "flex h-16 shrink-0 items-center border-b justify-between transition-all",
          isCollapsed ? "px-3" : "px-6"
        )}>
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Building2 className="h-6 w-6 text-primary flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-lg font-bold whitespace-nowrap overflow-hidden"
                >
                  Brooklyn Hills
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className={cn(
            "absolute top-20 h-6 w-6 rounded-full border bg-white shadow-md hover:shadow-lg z-50 p-0 transition-all duration-300",
            isCollapsed ? "-right-3 rotate-180" : "-right-3"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary',
                          'group flex rounded-md p-2 text-sm font-medium leading-6 relative overflow-hidden transition-all duration-200',
                          isCollapsed ? 'justify-center' : 'gap-x-3'
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary/10 rounded-md"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <item.icon
                          className={cn(
                            isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                            'h-5 w-5 shrink-0 relative z-10 transition-transform duration-200 group-hover:scale-110'
                          )}
                          aria-hidden="true"
                        />
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              className="relative z-10 whitespace-nowrap overflow-hidden"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </li>
            <li className={cn("mt-auto", isCollapsed ? "px-2" : "-mx-2")}>
              <Link
                href="/"
                title={isCollapsed ? "Back to Website" : undefined}
                className={cn(
                  "group flex rounded-md p-2 text-sm font-medium leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary",
                  isCollapsed ? 'justify-center' : 'gap-x-3'
                )}
              >
                <Home className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      Back to Website
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Mobile Sidebar Panel */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-6 pb-4 h-full">
                <div className="flex h-16 shrink-0 items-center border-b -mx-6 px-6 justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold">Brooklyn Hills</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMobileClose}
                    className="lg:hidden"
                  >
                    <X className="h-5 w-5" />
                  </Button>
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
                                onClick={onMobileClose}
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
                        onClick={onMobileClose}
                        className="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary"
                      >
                        <Home className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-primary" />
                        Back to Website
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
