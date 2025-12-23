'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatNaira } from '@/lib/utils/currency'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calendar,
  Download,
  Home,
  Wine,
  Wrench,
  Users,
} from 'lucide-react'
import { useState } from 'react'

// Mock financial data
const MONTHLY_DATA = {
  revenue: {
    accommodation: 1950000,
    bar: 315000,
    other: 45000,
    total: 2310000,
  },
  expenses: {
    housekeeping: 180000,
    maintenance: 95000,
    utilities: 120000,
    staff: 250000,
    supplies: 85000,
    total: 730000,
  },
  profit: 1580000,
  profitMargin: 68.4,
}

const REVENUE_BREAKDOWN = [
  { category: 'Accommodation', amount: 1950000, percentage: 84.4, color: 'bg-primary' },
  { category: 'Bar Sales', amount: 315000, percentage: 13.6, color: 'bg-purple-500' },
  { category: 'Other Services', amount: 45000, percentage: 2.0, color: 'bg-blue-500' },
]

const EXPENSE_BREAKDOWN = [
  { category: 'Staff Salaries', amount: 250000, percentage: 34.2, color: 'bg-red-500' },
  { category: 'Housekeeping', amount: 180000, percentage: 24.7, color: 'bg-orange-500' },
  { category: 'Utilities', amount: 120000, percentage: 16.4, color: 'bg-yellow-500' },
  { category: 'Maintenance', amount: 95000, percentage: 13.0, color: 'bg-green-500' },
  { category: 'Supplies', amount: 85000, percentage: 11.6, color: 'bg-blue-500' },
]

const PROPERTY_PERFORMANCE = [
  {
    property: 'Luxury 3-Bedroom Penthouse',
    bookings: 12,
    revenue: 540000,
    occupancyRate: 85,
    avgRate: 45000,
  },
  {
    property: 'Family 4-Bedroom Home',
    bookings: 8,
    revenue: 520000,
    occupancyRate: 72,
    avgRate: 65000,
  },
  {
    property: 'Cozy 2-Bedroom Apartment',
    bookings: 15,
    revenue: 420000,
    occupancyRate: 90,
    avgRate: 28000,
  },
  {
    property: 'Executive Studio',
    bookings: 10,
    revenue: 220000,
    occupancyRate: 68,
    avgRate: 22000,
  },
]

const MONTHLY_TRENDS = [
  { month: 'Jul', revenue: 1850000, expenses: 680000 },
  { month: 'Aug', revenue: 2100000, expenses: 720000 },
  { month: 'Sep', revenue: 1920000, expenses: 695000 },
  { month: 'Oct', revenue: 2250000, expenses: 750000 },
  { month: 'Nov', revenue: 2180000, expenses: 710000 },
  { month: 'Dec', revenue: 2310000, expenses: 730000 },
]

export default function FinancialPage() {
  const [period, setPeriod] = useState('month')

  const avgMonthlyRevenue =
    MONTHLY_TRENDS.reduce((sum, m) => sum + m.revenue, 0) / MONTHLY_TRENDS.length
  const revenueGrowth = ((MONTHLY_DATA.revenue.total - avgMonthlyRevenue) / avgMonthlyRevenue) * 100

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
          <p className="mt-1 text-gray-600">
            Track revenue, expenses, and profitability
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Revenue</span>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{formatNaira(MONTHLY_DATA.revenue.total)}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {revenueGrowth.toFixed(1)}%
              </Badge>
              <span className="text-xs text-gray-600">vs avg month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Expenses</span>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              {formatNaira(MONTHLY_DATA.expenses.total)}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {((MONTHLY_DATA.expenses.total / MONTHLY_DATA.revenue.total) * 100).toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Net Profit</span>
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatNaira(MONTHLY_DATA.profit)}
            </div>
            <p className="text-xs text-gray-600 mt-2">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Profit Margin</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {MONTHLY_DATA.profitMargin.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600 mt-2">Healthy margin</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {REVENUE_BREAKDOWN.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-semibold">{formatNaira(item.amount)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Total Revenue</span>
                  <span className="text-lg font-bold text-primary">
                    {formatNaira(MONTHLY_DATA.revenue.total)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {EXPENSE_BREAKDOWN.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-semibold">{formatNaira(item.amount)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Total Expenses</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatNaira(MONTHLY_DATA.expenses.total)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {PROPERTY_PERFORMANCE.map((property) => (
              <div
                key={property.property}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium mb-2">{property.property}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Bookings: </span>
                      <span className="font-semibold">{property.bookings}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Occupancy: </span>
                      <Badge variant="outline" className="text-xs">
                        {property.occupancyRate}%
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Avg Rate: </span>
                      <span className="font-semibold">{formatNaira(property.avgRate)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    {formatNaira(property.revenue)}
                  </p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            6-Month Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MONTHLY_TRENDS.map((month) => {
              const profit = month.revenue - month.expenses
              const margin = (profit / month.revenue) * 100

              return (
                <div key={month.month} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-12 text-sm font-semibold text-gray-600">{month.month}</div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Revenue</p>
                      <p className="font-semibold text-sm">{formatNaira(month.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Expenses</p>
                      <p className="font-semibold text-sm text-red-600">
                        {formatNaira(month.expenses)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Profit</p>
                      <p className="font-semibold text-sm text-green-600">
                        {formatNaira(profit)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={margin >= 60 ? 'success' : 'warning'}>
                      {margin.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
