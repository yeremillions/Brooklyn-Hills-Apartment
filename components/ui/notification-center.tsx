'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, Calendar, AlertCircle, DollarSign, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

interface Notification {
  id: string
  type: 'booking' | 'alert' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionHref?: string
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'New Booking Request',
    message: 'Sarah Johnson requested to book Penthouse Suite for 3 nights',
    timestamp: '5 minutes ago',
    read: false,
    actionLabel: 'View Booking',
    actionHref: '/admin/bookings',
  },
  {
    id: '2',
    type: 'alert',
    title: 'Maintenance Required',
    message: 'Unit 204 requires immediate attention - AC not working',
    timestamp: '1 hour ago',
    read: false,
    actionLabel: 'View Issue',
    actionHref: '/admin/maintenance',
  },
  {
    id: '3',
    type: 'booking',
    title: 'Check-out Reminder',
    message: 'Guest in Unit 305 is checking out today at 11:00 AM',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Payment Received',
    message: 'Payment of $450 received for booking #1234',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'alert',
    title: 'Low Inventory Alert',
    message: 'Bar inventory for premium whiskey is running low',
    timestamp: 'Yesterday',
    read: true,
    actionLabel: 'Manage Inventory',
    actionHref: '/admin/bar',
  },
]

interface NotificationCenterProps {
  open: boolean
  onClose: () => void
}

export function NotificationCenter({ open, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIconByType = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return Calendar
      case 'alert':
        return AlertCircle
      case 'system':
        return DollarSign
      default:
        return Bell
    }
  }

  const getColorByType = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return 'text-blue-600 bg-blue-100'
      case 'alert':
        return 'text-red-600 bg-red-100'
      case 'system':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const group = notification.type
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(notification)
    return acc
  }, {} as Record<string, Notification[]>)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="px-6 py-3 border-b bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sm text-primary hover:text-primary"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              </div>
            )}

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-sm text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {Object.entries(groupedNotifications).map(([type, items]) => (
                    <div key={type}>
                      <div className="px-6 py-2 bg-gray-50">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {type === 'booking' ? 'Bookings' : type === 'alert' ? 'Alerts' : 'System'}
                        </h3>
                      </div>
                      {items.map((notification) => {
                        const Icon = getIconByType(notification.type)
                        return (
                          <motion.div
                            key={notification.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className={cn(
                              'px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer relative',
                              !notification.read && 'bg-blue-50/50'
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            {/* Unread indicator */}
                            {!notification.read && (
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                            )}

                            <div className="flex gap-3">
                              <div className={cn('flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', getColorByType(notification.type))}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className={cn('text-sm font-semibold', notification.read ? 'text-gray-700' : 'text-gray-900')}>
                                    {notification.title}
                                  </h4>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                                  {notification.actionLabel && notification.actionHref && (
                                    <a
                                      href={notification.actionHref}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        onClose()
                                      }}
                                      className="text-xs font-medium text-primary hover:text-primary/80"
                                    >
                                      {notification.actionLabel} →
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
