# Supabase Setup Guide for Brooklyn Hills Apartment

This guide will walk you through setting up Supabase as the database for the Brooklyn Hills Apartment booking platform.

## Prerequisites

- A Supabase account (free tier is sufficient to start)
- Node.js and npm installed locally

## Step 1: Create a Supabase Project

1. **Go to Supabase**
   - Visit: https://app.supabase.com
   - Sign in or create a free account

2. **Create New Project**
   - Click "New Project"
   - Fill in the details:
     - **Project Name**: `Brooklyn Hills Apartment` (or any name you prefer)
     - **Database Password**: Create a strong password and save it securely
     - **Region**: Choose the region closest to your users (e.g., `West US` for Nigeria traffic via international routing)
   - Click "Create new project"
   - Wait 2-3 minutes for the project to be provisioned

## Step 2: Run Database Schema

1. **Open SQL Editor**
   - In your Supabase project dashboard, click on "SQL Editor" in the left sidebar
   - Click "New query"

2. **Copy and Run Schema**
   - Open the file `supabase/schema.sql` from this project
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run" (or press Ctrl/Cmd + Enter)

3. **Verify Tables Created**
   - Click on "Table Editor" in the left sidebar
   - You should see the following tables:
     - `properties`
     - `bookings`
     - `bar_items`
     - `bar_transactions`
     - `housekeeping_tasks`
     - `maintenance_tasks`

## Step 3: Get API Credentials

1. **Navigate to Project Settings**
   - Click on the "Settings" icon (gear icon) in the left sidebar
   - Click on "API" in the settings menu

2. **Copy Your Credentials**
   You'll need three values:

   - **Project URL**:
     - Found under "Project URL"
     - Looks like: `https://xxxxxxxxxxxxx.supabase.co`

   - **Anon (public) key**:
     - Found under "Project API keys" → "anon public"
     - This is safe to use in client-side code

   - **Service Role key**:
     - Found under "Project API keys" → "service_role"
     - ⚠️ **KEEP THIS SECRET!** Never expose this in client-side code

## Step 4: Configure Environment Variables

1. **Create .env.local File**
   - In the project root directory, create a new file named `.env.local`
   - Copy the contents from `.env.example`
   - Replace the placeholder values with your actual credentials:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
   ```

2. **Verify .env.local is in .gitignore**
   - Make sure `.env.local` is listed in your `.gitignore` file
   - This prevents accidentally committing your secrets to Git

## Step 5: Install Dependencies

If you haven't already, install the required packages:

```bash
npm install
```

The Supabase client (`@supabase/supabase-js`) should already be installed.

## Step 6: Test the Connection

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Test Property Creation**
   - Open your browser to `http://localhost:3000/admin/properties/new`
   - Fill out the form and create a test property
   - Check if it appears in `/admin/properties` and `/properties`

3. **Verify in Supabase Dashboard**
   - Go back to your Supabase dashboard
   - Click "Table Editor" → "properties"
   - You should see your newly created property in the database

## Step 7: Configure Row Level Security (Optional but Recommended)

The schema includes basic RLS policies, but you may want to customize them:

1. **Open Authentication**
   - Click "Authentication" in the left sidebar
   - Set up authentication if you want to restrict admin access

2. **Update RLS Policies**
   - Go to "Table Editor"
   - Click on a table (e.g., "properties")
   - Click "RLS" tab
   - Modify policies based on your security requirements

## Database Schema Overview

### Properties Table
Stores apartment/property listings with:
- Basic info (name, description, location)
- Pricing (nightly rate, cleaning fee, service charge)
- Capacity (guests, bedrooms, bathrooms)
- Amenities array
- Images array
- Status tracking

### Bookings Table
Stores customer bookings with:
- Guest information
- Check-in/check-out dates
- Pricing breakdown
- Payment status
- Bar charges

### Bar Items Table
Manages bar inventory with:
- Item details
- Stock levels
- Pricing

### Bar Transactions Table
Tracks bar sales with:
- Transaction items (JSON)
- Payment method
- Guest association

### Housekeeping Tasks Table
Manages cleaning schedules with:
- Property assignment
- Task status
- Checklists (JSON)
- Quality tracking

### Maintenance Tasks Table
Tracks property maintenance with:
- Issue details
- Priority levels
- Vendor assignment
- Cost tracking

## Troubleshooting

### "Failed to fetch properties" Error

**Possible Causes:**
1. **Environment variables not set**
   - Check `.env.local` exists
   - Verify all three variables are set correctly
   - Restart the dev server after changing env variables

2. **API keys incorrect**
   - Double-check you copied the full keys from Supabase dashboard
   - Make sure there are no extra spaces or line breaks

3. **RLS (Row Level Security) blocking access**
   - Check policies in Supabase dashboard
   - Temporarily disable RLS for testing: `ALTER TABLE properties DISABLE ROW LEVEL SECURITY;`

### "Cannot find module '@supabase/supabase-js'"

**Solution:**
```bash
npm install @supabase/supabase-js
```

### Properties not appearing after creation

**Solutions:**
1. Check browser console for errors
2. Verify data in Supabase Table Editor
3. Check API route logs in terminal
4. Make sure RLS policies allow reads

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add Environment Variables**
   - In your hosting platform's dashboard
   - Add all three Supabase environment variables
   - Use the same values as your `.env.local`

2. **Update CORS Settings (if needed)**
   - In Supabase Dashboard → Settings → API
   - Add your production domain to allowed origins

3. **Enable Backups**
   - In Supabase Dashboard → Settings → Database
   - Enable automatic backups (available on paid plans)

## Next Steps

- Set up authentication for admin users
- Configure image storage using Supabase Storage
- Set up realtime subscriptions for live updates
- Add database triggers for automated workflows
- Implement backup and recovery procedures

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Project Issues**: Check terminal logs and browser console

---

**Security Reminder**: Never commit `.env.local` to Git. Always use environment variables for sensitive data.
