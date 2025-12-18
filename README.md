# Brooklyn Hills Apartments - Booking Platform

A comprehensive single-vendor apartment shortlet booking website for the Nigerian market, featuring property management, booking system, housekeeping automation, bar management, and facility maintenance.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Date Handling:** date-fns
- **Charts:** Recharts
- **Icons:** Lucide React
- **Payment:** Paystack integration (UI ready)

## Features Implemented

### ✅ Public-Facing Site

1. **Home Page**
   - Hero section with CTAs
   - Feature highlights
   - WhatsApp contact integration

2. **Property Listings Page** (`/properties`)
   - Grid/card layout with property images
   - Advanced filtering:
     - Location
     - Price range
     - Guest capacity
     - Amenities (WiFi, AC, Pool, Bar Access, etc.)
   - Search functionality
   - Mobile-responsive design
   - Bar access badge highlighting

3. **Individual Property Page** (`/properties/[id]`)
   - Image gallery with carousel
   - Detailed property information
   - Amenities display with icons
   - Capacity information (guests, bedrooms, bathrooms)
   - Bar access information section
   - Pricing breakdown (nightly rate, cleaning fee, service charge)
   - House rules
   - Location map placeholder
   - Book Now CTA with WhatsApp support

4. **Booking Flow** (`/booking/[id]`)
   - Multi-step booking process:
     - **Step 1:** Date selection with availability check
     - **Step 2:** Guest information form
     - **Step 3:** Payment integration (Paystack UI ready)
     - **Step 4:** Confirmation page
   - Real-time pricing calculation
   - Guest capacity validation
   - Special requests field
   - Booking reference generation
   - Mobile-friendly interface

### ✅ Admin Dashboard

1. **Dashboard Layout**
   - Responsive sidebar navigation
   - Header with notifications
   - Clean, professional design
   - Mobile menu support

2. **Dashboard Overview** (`/admin/dashboard`)
   - **Key Metrics:**
     - Today's bookings and revenue
     - Weekly/monthly statistics
     - Occupancy rate
     - Bar sales tracking
   - **Alerts & Notifications:**
     - Low stock alerts (bar inventory)
     - Urgent maintenance issues
     - Housekeeping status updates
   - **Quick Actions:**
     - Add Property
     - View Bookings
     - Manage Calendar
     - Report Issue
     - Assign Cleaning
     - Record Bar Sale
   - **Today's Schedule:**
     - Upcoming check-ins
     - Upcoming check-outs
   - **Recent Bookings:** Status tracking
   - **Housekeeping Tasks:** Current status
   - **Monthly Overview:** Revenue breakdown

## Currency Implementation

All financial information is displayed in **Nigerian Naira (₦)** with the following format:
- Format: `₦25,000` (comma separators for thousands)
- Utility functions in `lib/utils/currency.ts`:
  - `formatNaira(amount)` - Format number as Naira
  - `parseNaira(value)` - Parse Naira string to number
  - `calculateBookingTotal()` - Calculate booking costs

## Project Structure

```
brooklyn-hills-apartment/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── properties/    # Property listings
│   │   └── booking/       # Booking flow
│   ├── admin/             # Admin dashboard
│   │   └── dashboard/     # Dashboard overview
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── public/           # Public site components
│   └── admin/            # Admin components
├── lib/
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants and mock data
│   └── stores/           # State management
├── types/
│   └── index.ts          # TypeScript types
└── public/               # Static assets
```

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Key Pages

- **Home:** `/`
- **Properties:** `/properties`
- **Property Detail:** `/properties/[id]`
- **Booking:** `/booking/[id]`
- **Admin Dashboard:** `/admin/dashboard`

## Pending Modules

The following modules are designed and ready to be implemented:

- [ ] Property Management (CRUD operations)
- [ ] Booking Management (table, filters, actions)
- [ ] Calendar/Availability System
- [ ] Housekeeping Management
  - [ ] Task Dashboard
  - [ ] Assignment & Scheduling
  - [ ] Checklists & Quality Control
  - [ ] Inventory & Linen Management
- [ ] Bar Management
  - [ ] Sales Recording
  - [ ] Menu & Inventory
  - [ ] Guest Tabs & Payment Tracking
  - [ ] Reports
- [ ] Facility Maintenance
  - [ ] Issue Reporting
  - [ ] Task Management
  - [ ] Vendor Management
  - [ ] Inspection System
- [ ] Customer Management
- [ ] Financial Overview
- [ ] Settings & Configuration

## Data Models

Comprehensive TypeScript interfaces are defined in `types/index.ts` including:

- Property & Amenities
- Bookings & Guests
- Bar Items & Transactions
- Housekeeping Tasks & Checklists
- Maintenance Tasks & Vendors
- Inventory & Linen
- Financial Data
- User Roles & Permissions

## Design System

### Colors
- **Primary:** Orange (#FF8800) - Warm, welcoming
- **Success:** Green
- **Warning:** Yellow/Orange
- **Error:** Red
- **Neutral:** Gray scale

### Typography
- System font stack for optimal performance
- Clear hierarchy with Tailwind typography utilities

### Components
- Consistent spacing and sizing
- Accessible form controls
- Responsive design patterns
- Mobile-first approach

## Future Enhancements

- Real API integration (replace mock data)
- Database connection (PostgreSQL/MongoDB recommended)
- Authentication & authorization
- File upload for property images
- Email notifications
- SMS notifications
- PWA for housekeeping staff
- QR code integration
- Smart lock integration points
- Multi-currency support
- Analytics dashboard

## Contributing

This is a custom-built solution for Brooklyn Hills Apartments. For support or feature requests, please contact the development team.

## License

Proprietary - Brooklyn Hills Apartments
