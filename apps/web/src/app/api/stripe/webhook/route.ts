
import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@nomad-life/core';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    const stripeService = new StripeService();
    const event = stripeService.verifyWebhookSignature(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('Stripe webhook received:', event.type);

    // Handle different webhook events
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        // TODO: Update booking status, send confirmation emails, etc.
        break;

      case 'payment_intent.payment_failed':
        // Handle failed payment
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        // TODO: Update booking status, notify user, etc.
        break;

      case 'account.updated':
        // Handle Stripe Connect account updates
        const account = event.data.object;
        console.log('Account updated:', account.id);
        // TODO: Update user's Stripe Connect status
        break;

      case 'payout.paid':
        // Handle successful payout to host/driver
        const payout = event.data.object;
        console.log('Payout paid:', payout.id);
        // TODO: Update payout status in database
        break;

      case 'charge.refunded':
        // Handle refunds
        const charge = event.data.object;
        console.log('Charge refunded:', charge.id);
        // TODO: Update booking refund status
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

