import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  // Check user
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: { message: 'User not logged in' } }, { status: 401 });
    // Redirect no funciona
    // return NextResponse.redirect('http://localhost:3000/');
  }

  // Extract Data from Body
  const { items, payment_intent_id }: { items: CartItem[]; payment_intent_id: string } = await req.json();

  // Create the order data
  const orderData = {
    user: { connect: { id: session.user.id } },
    amount: items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
    currency: 'EUR',
    status: 'pending',
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }
  };

  // Check if the payment intent already exists
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: orderData.amount });
      const existingOrder = await prisma.order.findFirst({
        where: { paymentIntentID: updated_intent.id },
        include: { products: true }
      });
      if (!existingOrder) {
        return NextResponse.json({ error: { message: 'Invalid Payment Intent' } }, { status: 400 });
      }
      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          amount: Number(orderData.amount),
          products: {
            deleteMany: {},
            create: items.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity
            }))
          }
        }
      });
      return NextResponse.json(updated_intent, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }
  } else {
    // Payment intent doesn't exist, create a new order with Prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(orderData.amount),
      currency: 'EUR',
      automatic_payment_methods: { enabled: true }
    });
    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({ data: orderData });
    return NextResponse.json(paymentIntent, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }
};
