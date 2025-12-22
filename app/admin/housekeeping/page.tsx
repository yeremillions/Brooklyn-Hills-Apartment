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
import {
  Sparkles,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Home,
  ClipboardCheck,
  Package,
} from 'lucide-react'
import { format } from 'date-fns'

// Mock housekeeping data
const HOUSEKEEPERS = [
  { id: '1', name: 'Mary Obi', tasksToday: 3, tasksCompleted: 12, rating: 4.9 },
  { id: '2', name: 'Grace Eze', tasksToday: 2, tasksCompleted: 15, rating: 4.8 },
  { id: '3', name: 'Blessing Okoro', tasksToday: 4, tasksCompleted: 8, rating: 4.7 },
  { id: '4', name: 'Fatima Ibrahim', tasksToday: 1, tasksCompleted: 10, rating: 4.9 },
]

const CLEANING_TASKS = [
  {
    id: 'CL001',
    property: 'Luxury 3-Bedroom Penthouse',
    type: 'checkout_clean',
    priority: 'urgent',
    assignedTo: 'Mary Obi',
    status: 'in_progress',
    scheduledTime: '2024-12-22T10:00:00Z',
    estimatedDuration: 180,
    notes: 'Deep clean required. Guest checked out early.',
  },
  {
    id: 'CL002',
    property: 'Cozy 2-Bedroom Apartment',
    type: 'turnover',
    priority: 'high',
    assignedTo: 'Grace Eze',
    status: 'pending',
    scheduledTime: '2024-12-22T14:00:00Z',
    estimatedDuration: 120,
    notes: 'New guest checking in at 3:00 PM. Priority clean.',
  },
  {
    id: 'CL003',
    property: 'Executive Studio',
    type: 'regular',
    priority: 'normal',
    assignedTo: 'Blessing Okoro',
    status: 'pending',
    scheduledTime: '2024-12-23T09:00:00Z',
    estimatedDuration: 90,
    notes: 'Weekly maintenance clean.',
  },
  {
    id: 'CL004',
    property: 'Family 4-Bedroom Home',
    type: 'inspection',
    priority: 'normal',
    assignedTo: null,
    status: 'unassigned',
    scheduledTime: '2024-12-23T11:00:00Z',
    estimatedDuration: 60,
    notes: 'Quality inspection required.',
  },
  {
    id: 'CL005',
    property: 'Luxury Penthouse',
    type: 'checkout_clean',
    priority: 'urgent',
    assignedTo: 'Fatima Ibrahim',
    status: 'completed',
    scheduledTime: '2024-12-22T08:00:00Z',
    estimatedDuration: 180,
    completedAt: '2024-12-22T11:30:00Z',
    notes: 'Completed ahead of schedule.',
  },
]

const INVENTORY_ALERTS = [
  { item: 'Bed Linens (Queen)', quantity: 5, threshold: 10, status: 'low' },
  { item: 'Towel Sets', quantity: 3, threshold: 8, status: 'critical' },
  { item: 'Cleaning Supplies', quantity: 12, threshold: 10, status: 'good' },
  { item: 'Toilet Paper (Rolls)', quantity: 15, threshold: 20, status: 'low' },
]

export default function HousekeepingPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const filteredTasks = CLEANING_TASKS.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const stats = {
    totalTasks: CLEANING_TASKS.length,
    pending: CLEANING_TASKS.filter((t) => t.status === 'pending').length,
    inProgress: CLEANING_TASKS.filter((t) => t.status === 'in_progress').length,
    completed: CLEANING_TASKS.filter((t) => t.status === 'completed').length,
    unassigned: CLEANING_TASKS.filter((t) => t.status === 'unassigned').length,
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }
    > = {
      pending: { label: 'Pending', variant: 'warning' },
      in_progress: { label: 'In Progress', variant: 'default' },
      completed: { label: 'Completed', variant: 'success' },
      unassigned: { label: 'Unassigned', variant: 'destructive' },
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

  const getTaskTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      checkout_clean: 'Checkout Clean',
      turnover: 'Turnover',
      regular: 'Regular Clean',
      inspection: 'Inspection',
      deep_clean: 'Deep Clean',
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Housekeeping</h1>
          <p className="mt-1 text-gray-600">
            Manage cleaning tasks, staff assignments, and inventory
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total Tasks</span>
              <Sparkles className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-gray-600 mt-1">All cleaning tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Pending</span>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-gray-600 mt-1">Awaiting start</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">In Progress</span>
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-gray-600 mt-1">Currently cleaning</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Completed</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-gray-600 mt-1">Finished today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Unassigned</span>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{stats.unassigned}</div>
            <p className="text-xs text-gray-600 mt-1">Needs assignment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Housekeeping Staff */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Staff Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {HOUSEKEEPERS.map((housekeeper) => (
                <div
                  key={housekeeper.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{housekeeper.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">
                        {housekeeper.tasksToday} tasks today
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-yellow-600">★ {housekeeper.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {housekeeper.tasksCompleted} done
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Alerts
              </CardTitle>
              <Link href="/admin/housekeeping/inventory">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {INVENTORY_ALERTS.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    alert.status === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : alert.status === 'low'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.item}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Current: {alert.quantity} | Threshold: {alert.threshold}
                    </p>
                  </div>
                  <div>
                    {alert.status === 'critical' && (
                      <Badge variant="destructive" className="text-xs">
                        Critical
                      </Badge>
                    )}
                    {alert.status === 'low' && (
                      <Badge variant="warning" className="text-xs">
                        Low Stock
                      </Badge>
                    )}
                    {alert.status === 'good' && (
                      <Badge variant="success" className="text-xs">
                        In Stock
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Cleaning Tasks
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <span className="font-mono font-semibold text-sm">{task.id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{task.property}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{getTaskTypeLabel(task.type)}</span>
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {task.assignedTo || (
                            <span className="text-red-600 font-medium">Unassigned</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {format(new Date(task.scheduledTime), 'MMM d, h:mm a')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{task.estimatedDuration} min</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
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

          {filteredTasks.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredTasks.length} of {CLEANING_TASKS.length} tasks
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
