


import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@nomad-life/core';

export async function POST(request: NextRequest) {
  try {
    const { userId, email, country = 'US' } = await request.json();
    
    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      );
    }

    const stripeService = new StripeService();
    const account = await stripeService.createConnectAccount(userId, email, country);

    return NextResponse.json({
      accountId: account.id,
      email: account.email,
    });
  } catch (error) {
    console.error('Error creating Connect account:', error);
    return NextResponse.json(
      { error: 'Failed to create Connect account' },
      { status: 500 }
    );
  }
}


