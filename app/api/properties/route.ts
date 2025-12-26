import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Property } from '@/types'
import { MOCK_PROPERTIES } from '@/lib/constants/mock-data'

// Check if Supabase is configured
function isSupabaseConfigured() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY !== 'placeholder-service-role-key'
  )
}

// GET /api/properties - Get all properties
export async function GET(request: NextRequest) {
  try {
    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, returning mock data')
      return NextResponse.json(MOCK_PROPERTIES)
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform database format to app format
    const properties: Property[] = data.map((prop: any) => ({
      id: prop.id,
      name: prop.name,
      description: prop.description,
      location: prop.location,
      nightlyRate: prop.nightly_rate,
      cleaningFee: prop.cleaning_fee,
      serviceChargePercent: prop.service_charge_percent,
      capacity: {
        guests: prop.guests,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
      },
      amenities: prop.amenities,
      hasBarAccess: prop.has_bar_access,
      images: prop.images,
      status: prop.status,
      cleaningTimeMinutes: prop.cleaning_time_minutes,
      createdAt: prop.created_at,
      updatedAt: prop.updated_at,
    }))

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    // If Supabase is not configured, return error
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error: 'Supabase is not configured. Please set up your database credentials in .env.local to add properties.',
          instructions: 'See SUPABASE_SETUP.md for setup instructions.'
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const supabase = createServerSupabaseClient()

    // Transform app format to database format
    const propertyData = {
      name: body.name,
      description: body.description,
      location: body.location,
      nightly_rate: body.nightlyRate,
      cleaning_fee: body.cleaningFee,
      service_charge_percent: body.serviceChargePercent,
      guests: body.capacity.guests,
      bedrooms: body.capacity.bedrooms,
      bathrooms: body.capacity.bathrooms,
      amenities: body.amenities,
      has_bar_access: body.hasBarAccess,
      images: body.images,
      status: body.status,
      cleaning_time_minutes: body.cleaningTimeMinutes,
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single()

    if (error) {
      console.error('Error creating property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform back to app format
    const property: Property = {
      id: data.id,
      name: data.name,
      description: data.description,
      location: data.location,
      nightlyRate: data.nightly_rate,
      cleaningFee: data.cleaning_fee,
      serviceChargePercent: data.service_charge_percent,
      capacity: {
        guests: data.guests,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
      },
      amenities: data.amenities,
      hasBarAccess: data.has_bar_access,
      images: data.images,
      status: data.status,
      cleaningTimeMinutes: data.cleaning_time_minutes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
