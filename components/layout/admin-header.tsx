'use client'

import { useState } from 'react'
import { Bell, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NotificationCenter } from '@/components/ui/notification-center'

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const unreadCount = 2 // This would come from your notification state/API

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Notifications */}
            <button
              type="button"
              onClick={() => setNotificationOpen(true)}
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative transition-colors"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

            {/* Profile */}
            <div className="flex items-center gap-x-2">
              <div className="hidden lg:block text-right">
                <div className="text-sm font-semibold text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">Owner</div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Center */}
      <NotificationCenter open={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </>
  )
}
