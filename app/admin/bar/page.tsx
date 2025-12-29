'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatNaira } from '@/lib/utils/currency'
import {
  Wine,
  Plus,
  TrendingUp,
  Package,
  AlertTriangle,
  DollarSign,
  Users,
  Search,
  Download,
  ShoppingCart,
} from 'lucide-react'
import { format } from 'date-fns'

// Mock data for bar management
const BAR_SALES = [
  {
    id: 'BS001',
    date: '2024-12-22T18:30:00Z',
    guestName: 'Adebayo Johnson',
    room: 'Penthouse',
    items: [
      { name: 'Premium Whiskey', quantity: 2, price: 5000 },
      { name: 'Red Wine', quantity: 1, price: 8000 },
    ],
    total: 18000,
    paymentMethod: 'cash',
    status: 'paid',
  },
  {
    id: 'BS002',
    date: '2024-12-22T20:15:00Z',
    guestName: 'Grace Eze',
    room: '4-Bedroom Home',
    items: [
      { name: 'Champagne', quantity: 1, price: 25000 },
      { name: 'Cocktail Mix', quantity: 3, price: 3500 },
    ],
    total: 35500,
    paymentMethod: 'card',
    status: 'paid',
  },
  {
    id: 'BS003',
    date: '2024-12-22T19:45:00Z',
    guestName: 'Tunde Williams',
    room: 'Studio',
    items: [
      { name: 'Beer (Local)', quantity: 6, price: 800 },
      { name: 'Soft Drinks', quantity: 4, price: 500 },
    ],
    total: 6800,
    paymentMethod: 'room_charge',
    status: 'pending',
  },
  {
    id: 'BS004',
    date: '2024-12-22T21:00:00Z',
    guestName: 'Ibrahim Musa',
    room: 'Penthouse',
    items: [
      { name: 'Cognac', quantity: 1, price: 35000 },
      { name: 'Mixers', quantity: 2, price: 1000 },
    ],
    total: 37000,
    paymentMethod: 'cash',
    status: 'paid',
  },
]

const INVENTORY = [
  { id: 1, name: 'Premium Whiskey', category: 'Spirits', stock: 8, minStock: 10, price: 5000, status: 'low' },
  { id: 2, name: 'Champagne', category: 'Wine', stock: 3, minStock: 5, price: 25000, status: 'critical' },
  { id: 3, name: 'Red Wine', category: 'Wine', stock: 15, minStock: 10, price: 8000, status: 'good' },
  { id: 4, name: 'Beer (Local)', category: 'Beer', stock: 45, minStock: 30, price: 800, status: 'good' },
  { id: 5, name: 'Vodka', category: 'Spirits', stock: 7, minStock: 8, price: 4500, status: 'low' },
  { id: 6, name: 'Cognac', category: 'Spirits', stock: 2, minStock: 5, price: 35000, status: 'critical' },
  { id: 7, name: 'Soft Drinks', category: 'Non-Alcoholic', stock: 60, minStock: 40, price: 500, status: 'good' },
  { id: 8, name: 'Cocktail Mix', category: 'Mixers', stock: 5, minStock: 10, price: 3500, status: 'low' },
]

const GUEST_TABS = [
  { guestName: 'Adebayo Johnson', room: 'Penthouse', balance: 18000, lastOrder: '2024-12-22T18:30:00Z' },
  { guestName: 'Grace Eze', room: '4-Bedroom Home', balance: 35500, lastOrder: '2024-12-22T20:15:00Z' },
  { guestName: 'Tunde Williams', room: 'Studio', balance: 6800, lastOrder: '2024-12-22T19:45:00Z' },
]

export default function BarManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredInventory = INVENTORY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Calculate stats
  const todaySales = BAR_SALES.reduce((sum, sale) => sum + sale.total, 0)
  const paidSales = BAR_SALES.filter((s) => s.status === 'paid').length
  const pendingSales = BAR_SALES.filter((s) => s.status === 'pending').length
  const lowStockItems = INVENTORY.filter((i) => i.status === 'low' || i.status === 'critical').length
  const totalGuestTabs = GUEST_TABS.reduce((sum, tab) => sum + tab.balance, 0)

  // Top selling items
  const itemSales: Record<string, { count: number; revenue: number }> = {}
  BAR_SALES.forEach((sale) => {
    sale.items.forEach((item) => {
      if (!itemSales[item.name]) {
        itemSales[item.name] = { count: 0, revenue: 0 }
      }
      itemSales[item.name].count += item.quantity
      itemSales[item.name].revenue += item.quantity * item.price
    })
  })

  const topSelling = Object.entries(itemSales)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  const getStockBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }
    > = {
      good: { label: 'In Stock', variant: 'success' },
      low: { label: 'Low Stock', variant: 'warning' },
      critical: { label: 'Critical', variant: 'destructive' },
    }

    const config = variants[status] || variants.good
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bar Management</h1>
          <p className="mt-1 text-gray-600">
            Manage sales, inventory, and guest tabs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/bar/sales/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Sale
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Today's Sales</span>
              <Wine className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{formatNaira(todaySales)}</div>
            <p className="text-xs text-gray-600 mt-1">{BAR_SALES.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Paid Sales</span>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{paidSales}</div>
            <p className="text-xs text-gray-600 mt-1">Completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Guest Tabs</span>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{formatNaira(totalGuestTabs)}</div>
            <p className="text-xs text-gray-600 mt-1">{GUEST_TABS.length} open tabs</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Low Stock</span>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems}</div>
            <p className="text-xs text-gray-600 mt-1">Items need restock</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Inventory Value</span>
              <Package className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {formatNaira(INVENTORY.reduce((sum, item) => sum + item.stock * item.price, 0))}
            </div>
            <p className="text-xs text-gray-600 mt-1">Total stock value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Selling Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Selling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSelling.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.count} sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{formatNaira(item.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guest Tabs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Open Guest Tabs
              </CardTitle>
              <Link href="/admin/bar/tabs">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {GUEST_TABS.map((tab, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{tab.guestName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {tab.room}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Last order: {format(new Date(tab.lastOrder), 'h:mm a')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{formatNaira(tab.balance)}</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      Settle Tab
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wine className="h-5 w-5" />
            Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead className="min-w-[130px]">Date & Time</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">Guest</TableHead>
                  <TableHead className="min-w-[140px]">Items</TableHead>
                  <TableHead className="min-w-[100px]">Total</TableHead>
                  <TableHead className="min-w-[90px] hidden xl:table-cell">Payment</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="w-[80px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BAR_SALES.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="py-3">
                      <span className="font-mono font-semibold text-xs">{sale.id}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-xs">
                        {format(new Date(sale.date), 'MMM d, h:mm a')}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 hidden lg:table-cell">
                      <div>
                        <p className="font-medium text-xs leading-tight">{sale.guestName}</p>
                        <p className="text-[10px] text-gray-500">{sale.room}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="text-xs">
                        {sale.items.map((item, idx) => (
                          <div key={idx} className="text-gray-600 leading-tight">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="font-semibold text-xs">{formatNaira(sale.total)}</span>
                    </TableCell>
                    <TableCell className="py-3 hidden xl:table-cell">
                      <Badge variant="outline" className="text-xs capitalize">
                        {sale.paymentMethod.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge variant={sale.status === 'paid' ? 'success' : 'warning'}>
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center justify-center">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Inventory
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Spirits">Spirits</SelectItem>
                  <SelectItem value="Wine">Wine</SelectItem>
                  <SelectItem value="Beer">Beer</SelectItem>
                  <SelectItem value="Mixers">Mixers</SelectItem>
                  <SelectItem value="Non-Alcoholic">Non-Alcoholic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Item Name</TableHead>
                  <TableHead className="min-w-[90px] hidden lg:table-cell">Category</TableHead>
                  <TableHead className="w-[90px] text-center">Stock</TableHead>
                  <TableHead className="w-[80px] text-center hidden xl:table-cell">Min</TableHead>
                  <TableHead className="min-w-[100px]">Unit Price</TableHead>
                  <TableHead className="min-w-[110px] hidden 2xl:table-cell">Total Value</TableHead>
                  <TableHead className="min-w-[90px]">Status</TableHead>
                  <TableHead className="w-[100px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-3">
                      <span className="font-medium text-xs">{item.name}</span>
                    </TableCell>
                    <TableCell className="py-3 hidden lg:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className="font-semibold text-xs">{item.stock}</span>
                    </TableCell>
                    <TableCell className="py-3 text-center hidden xl:table-cell">
                      <span className="text-xs text-gray-600">{item.minStock}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-xs">{formatNaira(item.price)}</span>
                    </TableCell>
                    <TableCell className="py-3 hidden 2xl:table-cell">
                      <span className="font-semibold text-xs">
                        {formatNaira(item.stock * item.price)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">{getStockBadge(item.status)}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center justify-center">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          Restock
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInventory.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredInventory.length} of {INVENTORY.length} items
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
