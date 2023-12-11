import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event | null = null;
  try {
    event = stripe.webhooks.constructEvent(payload, signature!, webhookSecret);
    switch (event?.type) {
      case 'payment_intent.succeeded':
        console.log('Stripe Webhook API route - Payment succeeded');
        const paymentIntentSucceeded = event.data.object;
        const updateOrder = await prisma.order.update({ where: { paymentIntentID: paymentIntentSucceeded.id }, data: { status: 'completed' } });
        break;
      default:
        console.log('Unhandled event type ' + event.type);
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ received: true });
}
