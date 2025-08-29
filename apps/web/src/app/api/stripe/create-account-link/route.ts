


import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@nomad-life/core';

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();
    
    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const stripeService = new StripeService();
    const url = await stripeService.createAccountLink(accountId);

    return NextResponse.json({
      url,
    });
  } catch (error) {
    console.error('Error creating account link:', error);
    return NextResponse.json(
      { error: 'Failed to create account link' },
      { status: 500 }
    );
  }
}


