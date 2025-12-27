// Property Types
export interface Property {
  id: string
  name: string
  slug: string
  description: string
  location: string
  nightlyRate: number
  cleaningFee: number
  serviceChargePercent: number
  capacity: {
    guests: number
    bedrooms: number
    bathrooms: number
  }
  amenities: Amenity[]
  hasBarAccess: boolean
  images: string[]
  status: PropertyStatus
  cleaningTimeMinutes: number
  createdAt: string
  updatedAt: string
}

export type PropertyStatus =
  | 'active'
  | 'inactive'
  | 'under_maintenance'
  | 'being_cleaned'
  | 'ready'

export type Amenity =
  | 'wifi'
  | 'ac'
  | 'parking'
  | 'kitchen'
  | 'pool'
  | 'gym'
  | 'security'
  | 'generator'
  | 'bar_access'
  | 'tv'
  | 'washing_machine'
  | 'balcony'

// Booking Types
export interface Booking {
  id: string
  propertyId: string
  property?: Property
  guest: Guest
  checkIn: string
  checkOut: string
  nights: number
  pricing: BookingPricing
  status: BookingStatus
  paymentStatus: PaymentStatus
  paymentReference?: string
  specialRequests?: string
  barCharges: number
  barTab: BarTransaction[]
  checkoutStatus?: CheckoutStatus
  createdAt: string
  updatedAt: string
}

export interface BookingPricing {
  nightlyRate: number
  subtotal: number
  cleaningFee: number
  serviceCharge: number
  barCharges: number
  total: number
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'refunded'
  | 'failed'

export type CheckoutStatus =
  | 'checked_out'
  | 'cleaning_scheduled'
  | 'cleaning_in_progress'
  | 'ready'

export interface Guest {
  id?: string
  name: string
  email: string
  phone: string
  totalBookings?: number
  totalSpent?: number
  barSpending?: number
  notes?: string
}

// Bar Management Types
export interface BarItem {
  id: string
  name: string
  category: BarCategory
  price: number
  currentStock: number
  minimumStock: number
  status: StockStatus
  createdAt: string
  updatedAt: string
}

export type BarCategory = 'alcoholic' | 'non_alcoholic' | 'snacks'

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface BarTransaction {
  id: string
  bookingId?: string
  guestName: string
  items: BarTransactionItem[]
  total: number
  paymentMethod: PaymentMethod
  createdAt: string
}

export interface BarTransactionItem {
  itemId: string
  itemName: string
  quantity: number
  price: number
  subtotal: number
}

export type PaymentMethod = 'cash' | 'transfer' | 'charge_to_room'

// Housekeeping Types
export interface HousekeepingTask {
  id: string
  propertyId: string
  property?: Property
  bookingId?: string
  checkoutTime?: string
  checkInTime?: string
  assignedTo?: Housekeeper
  fee: number
  estimatedMinutes: number
  actualMinutes?: number
  status: TaskStatus
  urgency: TaskUrgency
  instructions?: string
  checklist: ChecklistItem[]
  issues: Issue[]
  photos: TaskPhoto[]
  qualityScore?: number
  inspectedBy?: string
  createdAt: string
  updatedAt: string
  startedAt?: string
  completedAt?: string
}

export type TaskStatus =
  | 'pending'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'inspected'
  | 'rework_needed'

export type TaskUrgency = 'low' | 'normal' | 'high' | 'urgent'

export interface ChecklistItem {
  id: string
  area: CleaningArea
  item: string
  completed: boolean
  notes?: string
  photoRequired: boolean
  photoUrl?: string
  completedAt?: string
}

export type CleaningArea =
  | 'living_room'
  | 'bedroom'
  | 'kitchen'
  | 'bathroom'
  | 'bar_area'
  | 'outdoor'
  | 'general'

export interface Housekeeper {
  id: string
  name: string
  phone: string
  email?: string
  zones: string[]
  availability: string[]
  performance: HousekeeperPerformance
  rate: number
  certifications: string[]
  createdAt: string
}

export interface HousekeeperPerformance {
  totalJobs: number
  averageTime: number
  averageRating: number
  punctualityScore: number
}

export interface TaskPhoto {
  id: string
  url: string
  type: 'before' | 'after' | 'issue'
  uploadedAt: string
}

// Maintenance Types
export interface MaintenanceTask {
  id: string
  propertyId: string
  property?: Property
  location: string
  category: MaintenanceCategory
  priority: Priority
  description: string
  status: MaintenanceStatus
  assignedVendor?: Vendor
  estimatedCost: number
  actualCost?: number
  scheduledDate?: string
  completedDate?: string
  photos: string[]
  notes: string[]
  materials: string[]
  reportedBy: ReportedBy
  recurring?: RecurringSchedule
  createdAt: string
  updatedAt: string
}

export type MaintenanceCategory =
  | 'plumbing'
  | 'electrical'
  | 'appliances'
  | 'furniture'
  | 'cleaning'
  | 'pest_control'
  | 'security'
  | 'structural'
  | 'bar_equipment'
  | 'refrigeration'
  | 'other'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type MaintenanceStatus =
  | 'reported'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type ReportedBy = 'guest' | 'housekeeper' | 'bar_staff' | 'staff' | 'inspection'

export interface RecurringSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  nextDue: string
}

export interface Vendor {
  id: string
  name: string
  category: MaintenanceCategory[]
  phone: string
  email?: string
  performance: VendorPerformance
  availability: 'available' | 'busy' | 'unavailable'
  createdAt: string
}

export interface VendorPerformance {
  totalJobs: number
  averageResponseTime: number
  averageCost: number
  rating: number
}

export interface Issue {
  id: string
  description: string
  severity: 'minor' | 'moderate' | 'severe'
  photos: string[]
  reportedAt: string
  resolvedAt?: string
}

// Inventory Types
export interface InventoryItem {
  id: string
  name: string
  category: InventoryCategory
  currentStock: number
  minimumStock: number
  unit: string
  lastRestocked?: string
  supplier?: string
  costPerUnit: number
}

export type InventoryCategory =
  | 'cleaning_supplies'
  | 'toiletries'
  | 'bar_supplies'
  | 'equipment'
  | 'linens'

export interface LinenItem {
  id: string
  type: LinenType
  propertyId?: string
  quantity: number
  condition: LinenCondition
  location: LinenLocation
  lastWashed?: string
  nextReplacement?: string
}

export type LinenType =
  | 'bed_sheets'
  | 'pillowcases'
  | 'towels'
  | 'bar_towels'
  | 'napkins'

export type LinenCondition = 'new' | 'good' | 'fair' | 'poor' | 'damaged'

export type LinenLocation = 'property' | 'laundry' | 'storage'

// Financial Types
export interface RevenueData {
  period: string
  accommodation: number
  bar: number
  otherServices: number
  total: number
}

export interface ExpenseData {
  period: string
  maintenance: number
  housekeeping: number
  barInventory: number
  supplies: number
  total: number
}

export interface PropertyProfitMargin {
  propertyId: string
  propertyName: string
  revenue: number
  costs: number
  profit: number
  margin: number
}

// User & Settings Types
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  createdAt: string
}

export type UserRole =
  | 'owner'
  | 'admin'
  | 'property_manager'
  | 'housekeeper'
  | 'maintenance_staff'

export type Permission =
  | 'manage_properties'
  | 'manage_bookings'
  | 'manage_calendar'
  | 'manage_bar'
  | 'manage_housekeeping'
  | 'manage_maintenance'
  | 'manage_customers'
  | 'view_financial'
  | 'manage_settings'

export interface BusinessSettings {
  name: string
  phone: string
  email: string
  address: string
  logo?: string
  defaultCleaningFee: number
  defaultServiceChargePercent: number
  taxRate: number
  vatRate: number
  bufferTimeMinutes: number
  paystackPublicKey: string
  paystackSecretKey: string
}

// Dashboard Types
export interface DashboardMetrics {
  todayBookings: number
  weekBookings: number
  monthBookings: number
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  occupancyRate: number
  pendingInquiries: number
  barSalesToday: number
  barSalesWeek: number
  barSalesMonth: number
}

export interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  severity: 'info' | 'warning' | 'error'
  createdAt: string
  read: boolean
}

export type AlertType =
  | 'low_stock'
  | 'bar_low_stock'
  | 'maintenance_urgent'
  | 'cleaning_overdue'
  | 'booking_pending'
