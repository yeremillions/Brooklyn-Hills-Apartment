'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/layout/admin-sidebar'
import { AdminHeader } from '@/components/layout/admin-header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Listen to sidebar collapsed state
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('sidebarCollapsed')
      if (saved) {
        setSidebarCollapsed(JSON.parse(saved))
      }
    }

    // Initial load
    handleStorage()

    // Listen for changes
    window.addEventListener('storage', handleStorage)
    // Custom event for same-window changes
    window.addEventListener('sidebarToggle', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('sidebarToggle', handleStorage)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
