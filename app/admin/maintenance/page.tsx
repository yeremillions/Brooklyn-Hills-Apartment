'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  Wrench,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Home,
  TrendingUp,
  Download,
} from 'lucide-react'
import { format } from 'date-fns'

// Mock maintenance data
const MAINTENANCE_ISSUES = [
  {
    id: 'MT001',
    property: 'Luxury 3-Bedroom Penthouse',
    issue: 'AC not cooling properly in master bedroom',
    category: 'hvac',
    priority: 'urgent',
    status: 'in_progress',
    reportedBy: 'Guest - Adebayo Johnson',
    reportedDate: '2024-12-21T10:30:00Z',
    assignedTo: 'John AC Services',
    estimatedCost: 25000,
    notes: 'Compressor issue detected. Parts ordered.',
  },
  {
    id: 'MT002',
    property: 'Cozy 2-Bedroom Apartment',
    issue: 'Leaking kitchen faucet',
    category: 'plumbing',
    priority: 'high',
    status: 'pending',
    reportedBy: 'Housekeeping - Mary Obi',
    reportedDate: '2024-12-22T08:15:00Z',
    assignedTo: null,
    estimatedCost: 8000,
    notes: 'Needs immediate attention before next guest check-in.',
  },
  {
    id: 'MT003',
    property: 'Executive Studio',
    issue: 'Broken door lock on main entrance',
    category: 'security',
    priority: 'urgent',
    status: 'pending',
    reportedBy: 'Security - Night Shift',
    reportedDate: '2024-12-22T06:00:00Z',
    assignedTo: null,
    estimatedCost: 15000,
    notes: 'Security risk. Priority fix required.',
  },
  {
    id: 'MT004',
    property: 'Family 4-Bedroom Home',
    issue: 'Generator not starting',
    category: 'electrical',
    priority: 'high',
    status: 'assigned',
    reportedBy: 'Property Manager',
    reportedDate: '2024-12-22T07:45:00Z',
    assignedTo: 'PowerFix Solutions',
    estimatedCost: 35000,
    notes: 'Scheduled for inspection today at 2 PM.',
  },
  {
    id: 'MT005',
    property: 'Luxury Penthouse',
    issue: 'Pool pump making unusual noise',
    category: 'facilities',
    priority: 'normal',
    status: 'in_progress',
    reportedBy: 'Maintenance Staff',
    reportedDate: '2024-12-20T14:00:00Z',
    assignedTo: 'AquaMaint Ltd',
    estimatedCost: 12000,
    notes: 'Parts replacement in progress.',
  },
  {
    id: 'MT006',
    property: 'Cozy 2-Bedroom',
    issue: 'Cracked bathroom tile',
    category: 'general',
    priority: 'low',
    status: 'scheduled',
    reportedBy: 'Housekeeping - Grace Eze',
    reportedDate: '2024-12-19T11:20:00Z',
    assignedTo: 'TilePro Services',
    estimatedCost: 5000,
    notes: 'Scheduled for next week.',
  },
  {
    id: 'MT007',
    property: 'Executive Studio',
    issue: 'Wi-Fi router replacement',
    category: 'electrical',
    priority: 'normal',
    status: 'completed',
    reportedBy: 'Guest Support',
    reportedDate: '2024-12-18T16:30:00Z',
    assignedTo: 'NetFix Tech',
    estimatedCost: 18000,
    actualCost: 16500,
    completedDate: '2024-12-19T10:00:00Z',
    notes: 'Router replaced and tested successfully.',
  },
]

const VENDORS = [
  { id: 1, name: 'John AC Services', category: 'HVAC', rating: 4.8, jobsCompleted: 15 },
  { id: 2, name: 'PowerFix Solutions', category: 'Electrical', rating: 4.9, jobsCompleted: 22 },
  { id: 3, name: 'AquaMaint Ltd', category: 'Pool/Facilities', rating: 4.7, jobsCompleted: 8 },
  { id: 4, name: 'TilePro Services', category: 'General Repairs', rating: 4.6, jobsCompleted: 12 },
  { id: 5, name: 'NetFix Tech', category: 'IT/Electrical', rating: 4.9, jobsCompleted: 18 },
]

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredIssues = MAINTENANCE_ISSUES.filter((issue) => {
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter
    return matchesStatus && matchesPriority && matchesCategory
  })

  const stats = {
    total: MAINTENANCE_ISSUES.length,
    urgent: MAINTENANCE_ISSUES.filter((i) => i.priority === 'urgent').length,
    pending: MAINTENANCE_ISSUES.filter((i) => i.status === 'pending').length,
    inProgress: MAINTENANCE_ISSUES.filter((i) => i.status === 'in_progress').length,
    completed: MAINTENANCE_ISSUES.filter((i) => i.status === 'completed').length,
    totalCost: MAINTENANCE_ISSUES.filter((i) => i.status === 'completed').reduce(
      (sum, i) => sum + (i.actualCost || i.estimatedCost),
      0
    ),
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }
    > = {
      pending: { label: 'Pending', variant: 'destructive' },
      assigned: { label: 'Assigned', variant: 'warning' },
      scheduled: { label: 'Scheduled', variant: 'default' },
      in_progress: { label: 'In Progress', variant: 'default' },
      completed: { label: 'Completed', variant: 'success' },
    }

    const config = variants[status] || variants.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, { className: string }> = {
      urgent: { className: 'bg-red-100 text-red-800 border-red-200' },
      high: { className: 'bg-orange-100 text-orange-800 border-orange-200' },
      normal: { className: 'bg-blue-100 text-blue-800 border-blue-200' },
      low: { className: 'bg-gray-100 text-gray-800 border-gray-200' },
    }

    const config = variants[priority] || variants.normal
    return (
      <Badge variant="outline" className={config.className}>
        {priority.toUpperCase()}
      </Badge>
    )
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      hvac: 'HVAC',
      plumbing: 'Plumbing',
      electrical: 'Electrical',
      security: 'Security',
      facilities: 'Facilities',
      general: 'General',
    }
    return labels[category] || category
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Tracking</h1>
          <p className="mt-1 text-gray-600">
            Manage property maintenance issues and vendor assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/maintenance/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Report Issue
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Issues</span>
              <Wrench className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Urgent</span>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
            <p className="text-xs text-gray-600 mt-1">High priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending</span>
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-gray-600 mt-1">Not assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">In Progress</span>
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-gray-600 mt-1">Being fixed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Completed</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-gray-600 mt-1">Resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Cost</span>
              <span className="text-xs text-primary">₦</span>
            </div>
            <div className="text-2xl font-bold text-primary">{formatNaira(stats.totalCost)}</div>
            <p className="text-xs text-gray-600 mt-1">Completed jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendors Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Preferred Vendors
            </CardTitle>
            <Link href="/admin/maintenance/vendors">
              <Button variant="ghost" size="sm">
                Manage Vendors
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VENDORS.map((vendor) => (
              <div
                key={vendor.id}
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium text-sm text-center mb-1">{vendor.name}</p>
                <Badge variant="outline" className="text-xs mb-2">
                  {vendor.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <span>★</span>
                  <span>{vendor.rating}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{vendor.jobsCompleted} jobs</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Issues Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance Issues
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="general">General</SelectItem>
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
                  <TableHead className="w-[90px]">ID</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">Property</TableHead>
                  <TableHead className="min-w-[180px]">Issue</TableHead>
                  <TableHead className="min-w-[90px] hidden xl:table-cell">Category</TableHead>
                  <TableHead className="min-w-[90px]">Priority</TableHead>
                  <TableHead className="min-w-[110px] hidden 2xl:table-cell">Assigned To</TableHead>
                  <TableHead className="min-w-[100px]">Cost</TableHead>
                  <TableHead className="min-w-[90px]">Status</TableHead>
                  <TableHead className="w-[80px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No maintenance issues found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="py-3">
                        <span className="font-mono font-semibold text-xs">{issue.id}</span>
                      </TableCell>
                      <TableCell className="py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Home className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{issue.property}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div>
                          <p className="text-xs font-medium leading-tight line-clamp-2">{issue.issue}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            By: {issue.reportedBy}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 hidden xl:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(issue.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3">{getPriorityBadge(issue.priority)}</TableCell>
                      <TableCell className="py-3 hidden 2xl:table-cell">
                        <span className="text-xs">
                          {issue.assignedTo || (
                            <span className="text-red-600 font-medium">Unassigned</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="text-xs">
                          <p className="font-semibold">
                            {formatNaira(issue.actualCost || issue.estimatedCost)}
                          </p>
                          {issue.actualCost && (
                            <p className="text-[10px] text-gray-500">Actual</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">{getStatusBadge(issue.status)}</TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredIssues.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredIssues.length} of {MAINTENANCE_ISSUES.length} issues
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
