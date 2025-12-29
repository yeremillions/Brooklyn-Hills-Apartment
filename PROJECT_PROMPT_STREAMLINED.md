# Brooklyn Hills Apartment - Streamlined Project Prompt

## Overview

Build a full-stack single-vendor apartment booking platform for the Nigerian short-term rental market. The platform manages luxury properties with **integrated bar services**, **housekeeping workflows**, and **maintenance tracking** - key differentiators from standard booking platforms.

**Target User**: Single property owner/manager with 4-6 premium units, bar amenities, and in-house housekeeping staff.

## Tech Stack

- **Framework**: Next.js 14 (App Router), TypeScript
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Payments**: Paystack (Nigerian payment gateway)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **Calendar**: React Big Calendar

## Domain Model

```typescript
// Core Entities
interface Property {
  id: string
  name: string
  slug: string
  description: string
  location: string
  nightlyRate: number
  cleaningFee: number
  serviceChargePercent: number
  capacity: { guests: number; bedrooms: number; bathrooms: number }
  amenities: Amenity[]
  hasBarAccess: boolean
  images: string[] // Supabase Storage URLs
  status: 'active' | 'inactive' | 'under_maintenance' | 'being_cleaned' | 'ready'
  cleaningTimeMinutes: number
  createdAt: string
  updatedAt: string
}

interface Booking {
  id: string
  propertyId: string
  guest: { name: string; email: string; phone: string }
  checkIn: string
  checkOut: string
  nights: number
  pricing: {
    nightlyRate: number
    subtotal: number
    cleaningFee: number
    serviceCharge: number
    barCharges: number
    total: number
  }
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  paymentStatus: 'pending' | 'completed' | 'refunded' | 'failed'
  paymentReference?: string
  specialRequests?: string
  createdAt: string
}

interface HousekeepingTask {
  id: string
  propertyId: string
  bookingId?: string
  assignedTo?: { id: string; name: string; phone: string }
  fee: number
  estimatedMinutes: number
  actualMinutes?: number
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'inspected'
  urgency: 'low' | 'normal' | 'high' | 'urgent'
  checklist: Array<{
    area: 'living_room' | 'bedroom' | 'kitchen' | 'bathroom' | 'bar_area'
    item: string
    completed: boolean
    photoUrl?: string
  }>
  photos: string[]
  qualityScore?: number
  createdAt: string
  completedAt?: string
}

interface MaintenanceTask {
  id: string
  propertyId: string
  category: 'plumbing' | 'electrical' | 'appliances' | 'furniture' | 'bar_equipment' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  status: 'reported' | 'assigned' | 'in_progress' | 'completed'
  assignedVendor?: { id: string; name: string; phone: string }
  estimatedCost: number
  actualCost?: number
  photos: string[]
  reportedBy: 'guest' | 'housekeeper' | 'staff'
  createdAt: string
  completedDate?: string
}

interface BarItem {
  id: string
  name: string
  category: 'alcoholic' | 'non_alcoholic' | 'snacks'
  price: number
  currentStock: number
  minimumStock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

interface BarTransaction {
  id: string
  bookingId?: string
  guestName: string
  items: Array<{
    itemId: string
    itemName: string
    quantity: number
    price: number
    subtotal: number
  }>
  total: number
  paymentMethod: 'cash' | 'transfer' | 'charge_to_room'
  createdAt: string
}

type Amenity = 'wifi' | 'ac' | 'parking' | 'kitchen' | 'pool' | 'gym' |
  'security' | 'generator' | 'bar_access' | 'tv' | 'washing_machine' | 'balcony'
```

## Key Features

### Public Website

**Property Discovery**
- Landing page: Hero, featured properties, amenities, testimonials
- Listings page: Grid/list view, filters (price, capacity, amenities), search, sort
- Property details: Image gallery, info, amenities, pricing breakdown, availability calendar

**Booking Flow**
- Date picker with unavailable dates disabled
- Guest count selector with capacity validation
- Real-time price calculation: `(nights × rate) + cleaningFee + (subtotal × serviceCharge%)`
- Guest info form + special requests
- Paystack payment integration
- Confirmation page with booking reference

### Admin Dashboard

**Layout**
- Collapsible sidebar (256px → 80px) with localStorage persistence
- Mobile slide-over sidebar
- Header with notification bell (unread badge) and profile dropdown
- Framer Motion page transitions

**Dashboard**
- Metric cards: bookings, revenue, occupancy %, bar sales (with mini trend charts)
- Recent bookings table
- Upcoming check-ins/outs
- Alert cards: urgent maintenance, low stock, pending bookings
- Revenue chart (12 months)

**Properties Management**
- Grid/table view toggle
- CRUD operations with image upload to Supabase Storage
- Filters: All/Active/Inactive
- Sort: Name/Price/Capacity
- Status management workflow

**Bookings Management**
- Table with responsive column hiding
- Status badges and filters
- Payment status tracking
- Bar charges integration (charge_to_room)
- Export functionality

**Customers**
- Customer profiles with booking history
- Spending analytics
- VIP/Regular/New status tiers
- Top spenders list

**Calendar**
- Month view (React Big Calendar)
- Color-coded by booking status
- Filter by property

**Housekeeping**
- Auto-create task on checkout
- Assign to housekeeper
- Checklist by area with photo upload
- Quality scoring
- Time tracking (estimated vs actual)
- Property status updates: `checked_out → being_cleaned → ready`

**Maintenance**
- Issue reporting with photos
- Priority-based workflow
- Vendor assignment
- Cost tracking (estimated vs actual)
- Category-based organization

**Bar Management**
- **Inventory**: Stock levels, low stock alerts, restock actions
- **Sales**: Transaction history, guest charges, payment methods
- **Integration**: Add charges to active bookings (charge_to_room)
- Revenue reporting

**Financial**
- Revenue breakdown: accommodation + bar + services
- Expense tracking: maintenance + housekeeping + inventory
- Profit margins per property
- Monthly/quarterly reports

### Unique Features

**Command Palette (Cmd/Ctrl+K)**
- Quick navigation to any admin page
- Keyboard shortcuts
- Fuzzy search

**Notification Center**
- Slide-over panel from right
- Grouped by type: bookings, alerts, system
- Mark as read/unread (individual + bulk)
- Delete notifications
- Action buttons with quick links

**Responsive Tables**
- Progressive column hiding based on screen size
- Compact styling (text-xs, reduced padding)
- Always show critical columns
- Example breakpoints:
  - Base: ID, Name, Amount, Status, Actions
  - lg (1024px+): + Secondary info
  - xl (1280px+): + Tertiary info
  - 2xl (1536px+): All columns

**Empty States**
- Contextual illustrations
- Clear messaging
- Action CTAs

**Skeleton Loading**
- Placeholder content during async operations
- Maintains layout stability

## Design System

**Colors**
```
Primary: Blue-500 (#3B82F6)
Success: Green-500 (#10B981)
Warning: Amber-500 (#F59E0B)
Error: Red-500 (#EF4444)
Neutral: Gray-50 to Gray-900
```

**Visual Style**
- Gradient backgrounds: `bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20`
- Glassmorphism cards: `backdrop-blur-xl bg-white/80`
- Custom scrollbar: Subtle light gray, 8px width
- Shadows: sm (cards), md (elevated), lg (floating), 2xl (modals)

**Typography**
- Headings: font-bold
- Body: font-normal, text-sm (14px)
- Small: text-xs (12px)
- Tiny: text-[10px]

**Responsive**
- Mobile-first approach
- Breakpoints: sm(640), md(768), lg(1024), xl(1280), 2xl(1536)
- Sidebar collapses to slide-over on mobile
- Tables hide non-critical columns progressively

**Animations**
- Framer Motion for page transitions
- Stagger children animations
- Hover effects: scale(1.05), rotate(5deg)
- Smooth sidebar collapse
- Type assertion required: `type: 'spring' as const`

## Integrations

### Paystack Payment Flow
1. Generate unique reference: `${bookingId}-${Date.now()}`
2. Initialize Paystack with public key
3. On success callback: verify payment on backend
4. Update booking: `status: 'confirmed'`, `paymentStatus: 'completed'`
5. Send confirmation email
6. Handle failures: `paymentStatus: 'failed'`, allow retry

### Supabase Setup
- **Database**: PostgreSQL tables for all entities
- **Auth**: Row-level security policies
- **Storage**: `property-images` bucket for uploads
- **Client**: Lazy-load using Proxy pattern (avoid build-time initialization)

**Critical Implementation**:
```typescript
// Lazy-loaded client to prevent build errors
let supabaseInstance: SupabaseClient | null = null

function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) throw new Error('Supabase env vars not configured')

  supabaseInstance = createClient(url, key)
  return supabaseInstance
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    return getSupabaseClient()[prop]
  }
})
```

## Constraints & Gotchas

### Build-Time Supabase Issue
- **Problem**: Next.js tries to pre-render pages that import Supabase client, but env vars aren't available at build time
- **Solution**: Add `export const dynamic = 'force-dynamic'` to pages that use Supabase
- **Example**: Property create/edit pages, any page with data fetching

### Nigerian Payment Specifics
- Use Paystack (not Stripe) - dominant in Nigeria
- Currency: Nigerian Naira (₦)
- Format: `formatNaira(45000)` → "₦45,000"
- Test mode available for development

### Responsive Table Pattern
- Core principle: Hide less critical data on smaller screens
- Always show: ID, primary info, status, actions
- Progressive reveal: secondary → tertiary → all details
- Use `hidden lg:table-cell`, `hidden xl:table-cell`, etc.
- Horizontal scroll as last resort

### Image Optimization
- Use Next.js Image component
- Configure allowed domains in `next.config.js`
- Supabase Storage for user uploads
- Unsplash for demo images

### Bar Integration Logic
- Guest books property → Booking created
- Guest orders from bar → BarTransaction created
- Payment method options:
  - `cash` / `transfer`: Immediate payment
  - `charge_to_room`: Add to `booking.barCharges`
- On checkout: Total = accommodation + bar charges

### Housekeeping Automation
- Checkout triggers: Auto-create housekeeping task
- Property status flow: `active → being_cleaned → ready → active`
- Buffer time: Admin-configurable minutes between bookings
- Next booking: Only if property status is `ready` or `active`

## Development Notes

- Provide realistic mock data for all entities (4-6 properties minimum)
- Use TypeScript strictly - no `any` types
- Implement proper error handling and loading states
- Toast notifications for all user actions
- Proper form validation with Zod schemas
- Nigerian phone format: `+234 XXX XXX XXXX`
- Date handling: Use `date-fns` for formatting
- Currency: Always use `formatNaira()` helper
- Build config: Force dynamic rendering where needed

This is a production-ready booking platform with enterprise features tailored for the Nigerian luxury short-term rental market.
