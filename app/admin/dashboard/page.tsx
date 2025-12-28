'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendChart } from '@/components/ui/trend-chart'
import { formatNaira } from '@/lib/utils/currency'
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Building2,
  BookOpen,
  Sparkles,
  Wine,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
} from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
}

export default function DashboardPage() {
  // Mock data - replace with real data from API
  const metrics = {
    todayBookings: 3,
    weekBookings: 12,
    monthBookings: 45,
    todayRevenue: 135000,
    weekRevenue: 540000,
    monthRevenue: 1950000,
    occupancyRate: 78,
    pendingInquiries: 5,
    barSalesToday: 25000,
    barSalesWeek: 105000,
  }

  // Trend data for sparkline charts (last 7 days)
  const trendData = {
    bookings: [2, 3, 4, 2, 5, 4, 3],
    revenue: [120000, 135000, 150000, 128000, 165000, 145000, 135000],
    occupancy: [72, 75, 78, 76, 80, 79, 78],
    barSales: [20000, 22000, 25000, 23000, 28000, 26000, 25000],
  }

  const upcomingCheckIns = [
    { id: '1', guest: 'Adebayo Johnson', property: 'Luxury 3-Bedroom Penthouse', time: '2:00 PM' },
    { id: '2', guest: 'Chioma Okafor', property: 'Executive Studio', time: '3:30 PM' },
  ]

  const upcomingCheckOuts = [
    { id: '1', guest: 'Tunde Williams', property: 'Cozy 2-Bedroom Apartment', time: '12:00 PM' },
  ]

  const alerts = [
    { id: '1', type: 'bar', message: 'Low stock: Premium Whiskey - 2 bottles remaining', severity: 'warning' },
    { id: '2', type: 'maintenance', message: 'Urgent: AC repair needed in Property #3', severity: 'error' },
    { id: '3', type: 'cleaning', message: 'Same-day turnover required for Property #1', severity: 'warning' },
  ]

  const recentBookings = [
    { id: '1', guest: 'Folake Adeyemi', property: 'Luxury Penthouse', status: 'confirmed', amount: 450000 },
    { id: '2', guest: 'Ibrahim Musa', property: 'Family Home', status: 'pending', amount: 650000 },
    { id: '3', guest: 'Grace Okonkwo', property: 'Executive Studio', status: 'confirmed', amount: 220000 },
  ]

  const housekeepingTasks = [
    { id: '1', property: 'Property #1', status: 'in_progress', housekeeper: 'Mary Obi' },
    { id: '2', property: 'Property #4', status: 'pending', housekeeper: null },
    { id: '3', property: 'Property #2', status: 'completed', housekeeper: 'Grace Eze' },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Today's Bookings"
            value={metrics.todayBookings}
            icon={<BookOpen className="h-5 w-5" />}
            subtitle={`${metrics.weekBookings} this week`}
            trend="+12%"
            trendData={trendData.bookings}
            trendColor="#3b82f6"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Today's Revenue"
            value={formatNaira(metrics.todayRevenue)}
            icon={<DollarSign className="h-5 w-5" />}
            subtitle={formatNaira(metrics.weekRevenue) + ' this week'}
            trend="+8%"
            trendData={trendData.revenue}
            trendColor="#10b981"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Occupancy Rate"
            value={`${metrics.occupancyRate}%`}
            icon={<TrendingUp className="h-5 w-5" />}
            subtitle="This month"
            trend="+5%"
            trendData={trendData.occupancy}
            trendColor="#8b5cf6"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Bar Sales Today"
            value={formatNaira(metrics.barSalesToday)}
            icon={<Wine className="h-5 w-5" />}
            subtitle={formatNaira(metrics.barSalesWeek) + ' this week'}
            trend="+15%"
            trendData={trendData.barSales}
            trendColor="#f59e0b"
          />
        </motion.div>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      alert.severity === 'error'
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-yellow-50 border border-yellow-200'
                    }`}
                  >
                    <AlertTriangle
                      className={`h-5 w-5 mt-0.5 ${
                        alert.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          alert.severity === 'error' ? 'text-red-900' : 'text-yellow-900'
                        }`}
                      >
                        {alert.message}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <QuickActionButton
              icon={<Building2 className="h-6 w-6" />}
              label="Add Property"
              href="/admin/properties/new"
            />
            <QuickActionButton
              icon={<BookOpen className="h-6 w-6" />}
              label="View Bookings"
              href="/admin/bookings"
            />
            <QuickActionButton
              icon={<Calendar className="h-6 w-6" />}
              label="Manage Calendar"
              href="/admin/calendar"
            />
            <QuickActionButton
              icon={<Wrench className="h-6 w-6" />}
              label="Report Issue"
              href="/admin/maintenance/new"
            />
            <QuickActionButton
              icon={<Sparkles className="h-6 w-6" />}
              label="Assign Cleaning"
              href="/admin/housekeeping"
            />
            <QuickActionButton
              icon={<Wine className="h-6 w-6" />}
              label="Record Bar Sale"
              href="/admin/bar/sales/new"
            />
          </div>
        </CardContent>
      </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Check-ins/Check-outs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Check-ins</h4>
              <div className="space-y-2">
                {upcomingCheckIns.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{booking.guest}</p>
                      <p className="text-xs text-gray-600">{booking.property}</p>
                    </div>
                    <Badge variant="outline" className="text-green-700 border-green-700">
                      {booking.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Check-outs</h4>
              <div className="space-y-2">
                {upcomingCheckOuts.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{booking.guest}</p>
                      <p className="text-xs text-gray-600">{booking.property}</p>
                    </div>
                    <Badge variant="outline" className="text-blue-700 border-blue-700">
                      {booking.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Bookings
              </CardTitle>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{booking.guest}</p>
                    <p className="text-xs text-gray-600">{booking.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatNaira(booking.amount)}</p>
                    <Badge
                      variant={booking.status === 'confirmed' ? 'success' : 'warning'}
                      className="text-xs"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Housekeeping Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Housekeeping Tasks
              </CardTitle>
              <Link href="/admin/housekeeping">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {housekeepingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">{task.property}</p>
                    <p className="text-xs text-gray-600">
                      {task.housekeeper || 'Unassigned'}
                    </p>
                  </div>
                  <TaskStatusBadge status={task.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Bookings</span>
              <span className="text-lg font-bold">{metrics.monthBookings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Accommodation Revenue</span>
              <span className="text-lg font-bold">{formatNaira(metrics.monthRevenue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bar Revenue</span>
              <span className="text-lg font-bold">{formatNaira(315000)}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm font-semibold text-gray-900">Total Revenue</span>
              <span className="text-xl font-bold text-primary">
                {formatNaira(metrics.monthRevenue + 315000)}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function MetricCard({
  title,
  value,
  icon,
  subtitle,
  trend,
  trendData,
  trendColor,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  subtitle: string
  trend?: string
  trendData?: number[]
  trendColor?: string
}) {
  // Gradient backgrounds for each metric type
  const gradients = {
    bookings: 'from-blue-50 via-white to-blue-50/50',
    revenue: 'from-green-50 via-white to-green-50/50',
    occupancy: 'from-purple-50 via-white to-purple-50/50',
    barSales: 'from-amber-50 via-white to-amber-50/50',
  }

  const getGradient = () => {
    if (trendColor === '#3b82f6') return gradients.bookings
    if (trendColor === '#10b981') return gradients.revenue
    if (trendColor === '#8b5cf6') return gradients.occupancy
    if (trendColor === '#f59e0b') return gradients.barSales
    return 'from-gray-50 via-white to-gray-50/50'
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={`h-full hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-0 bg-gradient-to-br ${getGradient()} backdrop-blur-sm relative`}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{title}</span>
            <motion.div
              className="text-gray-400"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {icon}
            </motion.div>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-600">{subtitle}</p>
              {trend && (
                <Badge variant="success" className="text-xs">
                  {trend}
                </Badge>
              )}
            </div>
            {trendData && trendData.length > 0 && (
              <div className="mt-4 -mb-2">
                <TrendChart data={trendData} color={trendColor} height={32} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function QuickActionButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="h-auto flex-col gap-2 p-4 hover:bg-primary/5 hover:border-primary w-full"
        >
          {icon}
          <span className="text-xs text-center">{label}</span>
        </Button>
      </motion.div>
    </Link>
  )
}

function TaskStatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; variant: 'default' | 'warning' | 'success' }> = {
    pending: { label: 'Pending', variant: 'default' },
    in_progress: { label: 'In Progress', variant: 'warning' },
    completed: { label: 'Completed', variant: 'success' },
  }

  const config = variants[status] || variants.pending

  return <Badge variant={config.variant}>{config.label}</Badge>
}
