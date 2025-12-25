import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Property } from '@/types'

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      console.error('Error fetching property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform database format to app format
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

    return NextResponse.json(property)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
      .update(propertyData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating property:', error)
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

    return NextResponse.json(property)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
