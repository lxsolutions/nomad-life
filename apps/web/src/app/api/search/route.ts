
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@nomad-life/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const checkin = searchParams.get('checkin');
    const checkout = searchParams.get('checkout');
    const guests = searchParams.get('guests');
    const budget = searchParams.get('budget');
    const filters = searchParams.getAll('filters[]');

    // Basic validation
    if (!city) {
      return NextResponse.json(
        { error: 'City is required' },
        { status: 400 }
      );
    }

    // Build search query
    const where: any = {
      city: {
        contains: city,
        mode: 'insensitive'
      },
      available: true
    };

    // Add budget filter if provided
    if (budget) {
      const monthlyBudget = parseInt(budget);
      where.monthlyPrice = {
        lte: monthlyBudget
      };
    }

    // Add guest filter if provided
    if (guests) {
      const guestCount = parseInt(guests);
      where.maxGuests = {
        gte: guestCount
      };
    }

    // Add amenity filters if provided
    if (filters.length > 0) {
      const amenityConditions = filters.map(filter => {
        switch (filter) {
          case 'Desk':
            return { hasDedicatedWorkspace: true };
          case '100+ Mbps WiFi':
            return { wifiSpeed: { gte: 100 } };
          case 'Kitchen':
            return { hasKitchen: true };
          case 'Laundry':
            return { hasLaundry: true };
          default:
            return {};
        }
      });

      where.AND = amenityConditions.filter(cond => Object.keys(cond).length > 0);
    }

    // Search for properties
    const properties = await prisma.property.findMany({
      where,
      include: {
        amenities: true,
        host: {
          select: {
            name: true,
            trustScore: true
          }
        }
      },
      take: 20
    });

    // For now, redirect to a search results page with query params
    // In a real implementation, you'd return the search results as JSON
    // or render a search results page
    const searchUrl = `/search-results?city=${encodeURIComponent(city)}&checkin=${checkin}&checkout=${checkout}&guests=${guests}&budget=${budget}`;
    
    return NextResponse.redirect(new URL(searchUrl, request.url));
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
