# Brooklyn Hills Apartment - Project Creation Prompt

## Project Overview
Create a full-stack single-vendor apartment shortlet booking platform specifically designed for the Nigerian market. The platform should manage a collection of luxury short-term rental properties with integrated bar services, housekeeping management, and comprehensive admin controls.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: date-fns
- **Notifications**: Sonner (toast notifications)
- **State Management**: Zustand
- **Calendar**: React Big Calendar

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for property images)
- **API**: Next.js API Routes

### Payments
- **Payment Gateway**: Paystack (Nigerian payment processor)
- **Integration**: react-paystack

## Project Structure

```
brooklyn-hills-apartment/
├── app/
│   ├── (public)/              # Public-facing pages
│   │   ├── page.tsx           # Landing page
│   │   ├── properties/        # Property listings & details
│   │   ├── booking/           # Booking flow
│   │   └── about/             # About page
│   ├── admin/                 # Admin dashboard
│   │   ├── dashboard/         # Dashboard with metrics
│   │   ├── properties/        # Property management (CRUD)
│   │   ├── bookings/          # Booking management
│   │   ├── customers/         # Customer management
│   │   ├── calendar/          # Calendar view
│   │   ├── housekeeping/      # Cleaning task management
│   │   ├── maintenance/       # Maintenance tracking
│   │   ├── bar/               # Bar sales & inventory
│   │   ├── financial/         # Financial reports
│   │   └── settings/          # System settings
│   └── api/                   # API routes
├── components/
│   ├── public/                # Public site components
│   ├── layout/                # Layout components (sidebar, header)
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── services/              # API service layer
│   ├── supabase/              # Supabase client & utilities
│   ├── utils/                 # Utility functions
│   └── constants/             # Constants & mock data
└── types/                     # TypeScript type definitions
```

## Core Features

### 1. Public Website
**Landing Page:**
- Hero section with compelling headline and CTA
- Featured properties grid (3-4 properties)
- Key amenities showcase
- Customer testimonials
- Bar access highlight section
- Footer with contact info and links

**Property Listings:**
- Grid/List view toggle
- Filter by: price range, capacity, amenities, location
- Sort by: price, capacity, rating
- Search functionality
- Property cards showing: image, name, location, price, capacity, amenities

**Property Details Page:**
- Image gallery with main image and thumbnails
- Property information: description, location, capacity (guests, bedrooms, bathrooms)
- Amenities list with icons
- Pricing breakdown: nightly rate, cleaning fee, service charge
- Bar access badge (if applicable)
- Availability calendar
- Booking form with date selection and guest count
- Related properties section

**Booking Flow:**
- Date range picker with unavailable dates grayed out
- Guest count selector
- Automatic price calculation (nights × rate + cleaning fee + service charge %)
- Guest information form (name, email, phone)
- Special requests textarea
- Paystack payment integration
- Booking confirmation page with booking ID

### 2. Admin Dashboard

**Layout:**
- Collapsible sidebar navigation (256px expanded, 80px collapsed)
- Persist sidebar state in localStorage
- Mobile-responsive with slide-over sidebar
- Header with notifications bell (badge count) and user profile
- Smooth animations using Framer Motion

**Dashboard Page:**
- Metrics cards with mini trend charts:
  - Total bookings (today/week/month)
  - Revenue (today/week/month)
  - Occupancy rate
  - Bar sales (today/week/month)
  - Pending inquiries
- Recent bookings table
- Upcoming check-ins/check-outs
- Urgent maintenance alerts
- Low stock alerts (bar inventory)
- Revenue chart (last 12 months)
- Property performance breakdown
- Glassmorphism effects on cards
- Skeleton loading states

**Properties Management:**
- Grid/Table view toggle
- CRUD operations (Create, Read, Update, Delete)
- Property form fields:
  - Name, slug (auto-generated), description
  - Location, nightly rate, cleaning fee, service charge %
  - Capacity: guests, bedrooms, bathrooms
  - Amenities (multi-select checkboxes)
  - Bar access toggle
  - Cleaning time (minutes)
  - Status: active, inactive, under_maintenance, being_cleaned, ready
  - Multiple image upload (Supabase Storage)
- Status filters (All/Active/Inactive)
- Sorting (Name/Price/Capacity)
- Search functionality
- Empty states with illustrations and CTAs
- Responsive tables with progressive column hiding

**Bookings Management:**
- Table view with columns:
  - Booking ID, Guest info, Property, Check-in/out dates
  - Guest count, Total amount, Status, Payment status
- Status badges: pending, confirmed, checked_in, completed, cancelled
- Payment status: pending, paid, failed, refunded
- Filters by status and payment status
- Search by guest name, booking ID, or property
- Export functionality
- Booking details modal/page
- Bar charges tracking
- Responsive table (hides less critical columns on smaller screens)

**Customers/Guests:**
- Customer list table with:
  - Customer ID, Name, Email, Phone
  - Total bookings, Total spent, Rating, Last booking date
  - Status: VIP, Regular, New
- Top customers by spending (top 5)
- Booking history per customer
- Customer notes/preferences
- Performance metrics
- Responsive table layout

**Calendar View:**
- Month view with React Big Calendar
- Color-coded bookings by status
- Click to view booking details
- Drag & drop to reschedule (future enhancement)
- Filter by property

**Housekeeping:**
- Task list table:
  - Task ID, Property, Task type, Priority, Assigned to
  - Scheduled time, Duration, Status
- Task types: checkout_cleaning, routine_cleaning, deep_cleaning, inspection
- Status: pending, assigned, in_progress, completed, inspected, rework_needed
- Priority levels with color coding
- Checklist items per area (living room, bedroom, bathroom, kitchen, etc.)
- Photo upload (before/after)
- Quality scoring
- Housekeeper assignment
- Performance tracking
- Responsive table

**Maintenance:**
- Issue tracking table:
  - Issue ID, Property, Issue description, Category, Priority
  - Assigned vendor, Estimated/actual cost, Status
- Categories: plumbing, electrical, appliances, furniture, bar_equipment, etc.
- Priority: low, medium, high, urgent
- Status workflow: reported → assigned → in_progress → completed
- Vendor management
- Photo documentation
- Recurring maintenance schedules
- Cost tracking
- Responsive table

**Bar Management:**
- Dual tables: Sales & Inventory
- **Sales Table:**
  - Sale ID, Date/time, Guest, Items, Total, Payment method, Status
  - Payment methods: cash, transfer, charge_to_room
- **Inventory Table:**
  - Item name, Category, Current stock, Min stock, Unit price, Total value, Status
  - Categories: alcoholic, non_alcoholic, snacks
  - Status badges: in_stock, low_stock, out_of_stock
  - Restock functionality
- Real-time stock updates
- Low stock alerts
- Revenue tracking
- Responsive tables

**Financial Reports:**
- Revenue breakdown (accommodation + bar + services)
- Expense tracking (maintenance + housekeeping + supplies)
- Profit margins per property
- Monthly/quarterly/yearly reports
- Export functionality
- Charts and visualizations

**Settings:**
- Business information (name, contact, address)
- Default fees (cleaning fee, service charge %)
- Buffer time between bookings
- Tax rates (VAT)
- Paystack API keys
- User management (future)

### 3. UI/UX Enhancements

**Animations:**
- Page transitions with Framer Motion
- Card hover effects with subtle scale
- Icon animations on hover (rotate, scale)
- Stagger children animations
- Smooth sidebar collapse/expand
- Notification slide-over panel

**Design System:**
- Color palette: Primary (blue), Secondary (purple), Accent
- Gradient backgrounds: from-gray-50 via-blue-50/30 to-purple-50/20
- Glassmorphism: backdrop-blur-xl bg-white/80
- Custom scrollbar styling (subtle light gray)
- Consistent spacing scale
- Typography hierarchy

**Components:**
- **Command Palette**: Cmd/Ctrl+K for quick navigation
  - Search all admin pages
  - Keyboard shortcuts
  - Fuzzy search
- **Notification Center**: Slide-over panel from right
  - Grouped notifications (bookings, alerts, system)
  - Mark as read/unread (individual and bulk)
  - Delete functionality
  - Action buttons with navigation
- **Empty States**: Contextual illustrations with CTAs
- **Skeleton Loading**: Placeholder content during data fetching
- **Badges**: Color-coded status indicators
- **Trend Charts**: Mini sparklines in metric cards
- **Responsive Tables**: Progressive column display based on screen size
  - Hide less critical columns on smaller screens (lg/xl/2xl breakpoints)
  - Compact font sizes (text-xs, text-[10px])
  - Centered numeric columns
  - Horizontal scroll on very small screens

**Accessibility:**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support

## Database Schema

### Properties Table
```typescript
{
  id: string (uuid)
  name: string
  slug: string (unique)
  description: text
  location: string
  nightlyRate: number
  cleaningFee: number
  serviceChargePercent: number
  capacity: {
    guests: number
    bedrooms: number
    bathrooms: number
  }
  amenities: Amenity[] // Array of strings
  hasBarAccess: boolean
  images: string[] // URLs from Supabase Storage
  status: PropertyStatus
  cleaningTimeMinutes: number
  createdAt: timestamp
  updatedAt: timestamp
}

PropertyStatus: 'active' | 'inactive' | 'under_maintenance' | 'being_cleaned' | 'ready'
Amenities: 'wifi' | 'ac' | 'parking' | 'kitchen' | 'pool' | 'gym' | 'security' | 'generator' | 'bar_access' | 'tv' | 'washing_machine' | 'balcony'
```

### Bookings Table
```typescript
{
  id: string
  propertyId: string (FK)
  guest: {
    name: string
    email: string
    phone: string
  }
  checkIn: date
  checkOut: date
  nights: number (calculated)
  pricing: {
    nightlyRate: number
    subtotal: number
    cleaningFee: number
    serviceCharge: number
    barCharges: number
    total: number
  }
  status: BookingStatus
  paymentStatus: PaymentStatus
  paymentReference: string
  specialRequests: text
  barCharges: number
  createdAt: timestamp
  updatedAt: timestamp
}

BookingStatus: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
PaymentStatus: 'pending' | 'completed' | 'refunded' | 'failed'
```

### Housekeeping Tasks Table
```typescript
{
  id: string
  propertyId: string (FK)
  bookingId: string (FK, optional)
  checkoutTime: timestamp
  checkInTime: timestamp
  assignedTo: {
    id: string
    name: string
    phone: string
  }
  fee: number
  estimatedMinutes: number
  actualMinutes: number
  status: TaskStatus
  urgency: 'low' | 'normal' | 'high' | 'urgent'
  instructions: text
  checklist: ChecklistItem[]
  photos: string[]
  qualityScore: number (1-5)
  createdAt: timestamp
  completedAt: timestamp
}
```

### Bar Items Table
```typescript
{
  id: string
  name: string
  category: 'alcoholic' | 'non_alcoholic' | 'snacks'
  price: number
  currentStock: number
  minimumStock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Bar Transactions Table
```typescript
{
  id: string
  bookingId: string (FK, optional)
  guestName: string
  items: {
    itemId: string
    itemName: string
    quantity: number
    price: number
    subtotal: number
  }[]
  total: number
  paymentMethod: 'cash' | 'transfer' | 'charge_to_room'
  createdAt: timestamp
}
```

### Maintenance Tasks Table
```typescript
{
  id: string
  propertyId: string (FK)
  location: string
  category: MaintenanceCategory
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: text
  status: 'reported' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  assignedVendor: {
    id: string
    name: string
    phone: string
    category: MaintenanceCategory[]
  }
  estimatedCost: number
  actualCost: number
  scheduledDate: date
  completedDate: date
  photos: string[]
  notes: string[]
  reportedBy: 'guest' | 'housekeeper' | 'staff' | 'inspection'
  createdAt: timestamp
}

MaintenanceCategory: 'plumbing' | 'electrical' | 'appliances' | 'furniture' | 'cleaning' | 'pest_control' | 'security' | 'structural' | 'bar_equipment' | 'refrigeration' | 'other'
```

## Key Requirements

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Sidebar collapses on mobile (slide-over)
- Tables progressively hide columns based on screen size
- Touch-friendly buttons and inputs

### 2. Performance
- Image optimization with Next.js Image component
- Lazy loading for images and components
- Code splitting by route
- Minimize bundle size
- Efficient data fetching (cache strategies)
- Lazy-loaded Supabase client (Proxy pattern to avoid build-time initialization)

### 3. Security
- Environment variables for sensitive data
- API route protection
- Input validation (Zod schemas)
- SQL injection prevention (Supabase handles this)
- XSS protection
- CSRF protection

### 4. Payment Integration
- Paystack initialization with public key
- Generate payment reference (unique)
- Handle payment callbacks
- Verify payments on backend
- Update booking status after successful payment
- Handle failed payments
- Send confirmation emails

### 5. Build Configuration
- Force dynamic rendering for pages that use Supabase (`export const dynamic = 'force-dynamic'`)
- Configure image domains in next.config.js
- Transpile Supabase packages
- Webpack fallbacks for node modules

## Implementation Guidelines

### 1. Start with Foundation
- Initialize Next.js project with TypeScript
- Install all dependencies
- Set up Tailwind CSS configuration
- Create folder structure
- Set up Supabase project and get credentials

### 2. Build Type System
- Define all TypeScript types in `/types/index.ts`
- Create comprehensive interfaces for all entities
- Export all types for reuse

### 3. Create Supabase Client
- Implement lazy-loaded client using Proxy pattern
- Handle missing environment variables gracefully
- Create storage utilities for image uploads

### 4. Build UI Component Library
- Create base components using Radix UI
- Implement consistent styling with Tailwind
- Add animations with Framer Motion
- Test components in isolation

### 5. Implement Public Website
- Build landing page with hero and featured properties
- Create property listing page with filters
- Implement property details page
- Build booking flow with payment integration
- Add testimonials and about page

### 6. Build Admin Dashboard
- Create admin layout with sidebar and header
- Implement dashboard with metrics and charts
- Build all management pages (properties, bookings, etc.)
- Add CRUD functionality
- Implement filters, search, and sorting
- Add responsive tables

### 7. Add Advanced Features
- Command palette (Cmd+K)
- Notification center
- Calendar view
- Reports and analytics
- Export functionality

### 8. Testing & Deployment
- Test all user flows
- Verify responsive design on all screen sizes
- Test payment integration in test mode
- Deploy to Vercel
- Configure environment variables
- Set up custom domain

## Mock Data
For development, create mock data for:
- 4-6 properties with different configurations
- Sample bookings in various states
- Customer records
- Housekeeping tasks
- Maintenance issues
- Bar inventory items
- Bar transactions

## Styling Guidelines

### Colors
```css
Primary: #3B82F6 (blue-500)
Secondary: #8B5CF6 (purple-500)
Success: #10B981 (green-500)
Warning: #F59E0B (amber-500)
Error: #EF4444 (red-500)
Gray scale: gray-50 to gray-900
```

### Spacing Scale
Follow Tailwind's default spacing scale (4px increments)

### Typography
```
Headings: font-bold
Body: font-normal
Small text: text-sm (14px)
Extra small: text-xs (12px)
Tiny: text-[10px]
```

### Shadows
```
Card: shadow-sm
Elevated: shadow-md
Floating: shadow-lg
Modal: shadow-2xl
```

## Final Notes
- Use `'use client'` directive for components with interactivity
- Implement proper error handling and loading states
- Add success/error toast notifications for user actions
- Use semantic HTML and proper ARIA labels
- Follow Next.js 14 App Router conventions
- Implement proper SEO with metadata
- Add proper logging for debugging
- Use consistent naming conventions (camelCase for variables, PascalCase for components)
- Comment complex logic
- Keep components small and focused (Single Responsibility Principle)

This is a comprehensive booking platform with enterprise-level features designed specifically for the Nigerian short-term rental market with integrated bar services and property management capabilities.
