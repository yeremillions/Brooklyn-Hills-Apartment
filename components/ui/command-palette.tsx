'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
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
  Plus,
  Search,
  Home,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const commands = [
  {
    group: 'Navigation',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard', keywords: ['home', 'overview'] },
      { id: 'properties', label: 'Properties', icon: Building2, href: '/admin/properties', keywords: ['apartments', 'listings'] },
      { id: 'bookings', label: 'Bookings', icon: Calendar, href: '/admin/bookings', keywords: ['reservations'] },
      { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/admin/calendar', keywords: ['schedule'] },
      { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers', keywords: ['guests', 'clients'] },
      { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles, href: '/admin/housekeeping', keywords: ['cleaning'] },
      { id: 'bar', label: 'Bar Management', icon: Wine, href: '/admin/bar', keywords: ['drinks', 'sales'] },
      { id: 'maintenance', label: 'Maintenance', icon: Wrench, href: '/admin/maintenance', keywords: ['repairs', 'issues'] },
      { id: 'financial', label: 'Financial', icon: DollarSign, href: '/admin/financial', keywords: ['revenue', 'money'] },
      { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings', keywords: ['preferences', 'config'] },
    ],
  },
  {
    group: 'Quick Actions',
    items: [
      { id: 'add-property', label: 'Add Property', icon: Plus, href: '/admin/properties/new', keywords: ['create', 'new'] },
      { id: 'home', label: 'Back to Website', icon: Home, href: '/', keywords: ['public', 'site'] },
    ],
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setOpen(false)}
          />

          {/* Command Palette */}
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[20vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="w-full max-w-2xl"
            >
              <Command className="rounded-lg border shadow-2xl bg-white overflow-hidden">
                <div className="flex items-center border-b px-3">
                  <Search className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
                  />
                  <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 sm:flex">
                    <span className="text-xs">ESC</span>
                  </kbd>
                </div>
                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500">
                    No results found.
                  </Command.Empty>
                  {commands.map((group) => (
                    <Command.Group key={group.group} heading={group.group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-gray-500">
                      {group.items.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={`${item.label} ${item.keywords?.join(' ')}`}
                          onSelect={() => handleSelect(item.href)}
                          className="relative flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 hover:bg-gray-50"
                        >
                          <item.icon className="h-4 w-4 text-gray-400" />
                          <span>{item.label}</span>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>
                <div className="border-t bg-gray-50 px-3 py-2 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>Press <kbd className="px-1.5 py-0.5 rounded border bg-white text-gray-600 font-mono">↑↓</kbd> to navigate</span>
                    <span>Press <kbd className="px-1.5 py-0.5 rounded border bg-white text-gray-600 font-mono">Enter</kbd> to select</span>
                  </div>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
