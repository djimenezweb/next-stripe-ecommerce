'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from './CheckoutForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Checkout() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  const cartStore = useCartStore();
  const router = useRouter();

  if (cartStore.cart.length === 0) {
    router.back();
  }

  const setPaymentIntent = cartStore.setPaymentIntent;
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSecret() {
      try {
        const res = await fetch('/api/create-payment-intent', {
          next: { revalidate: 0 },
          cache: 'no-cache',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartStore.cart, payment_intent_id: cartStore.paymentIntent })
        });

        if (res.status === 401) {
          return router.push('/api/auth/signin');
        }

        if (res.ok) {
          const data = await res.json();
          setPaymentIntent(data.id);
          setClientSecret(data.client_secret);
          setLoading(false);
        }
      } catch (error) {
        console.error('CLIENT ERROR!!!', error);
      }
    }

    fetchSecret();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!clientSecret) return <p>Client Secret Error. Try again.</p>;

  if (clientSecret)
    return (
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl mb-8 font-patua">Checkout</h2>
          <Link href="https://stripe.com/">
            <Image src="/images/powered_by_stripe.svg" className="hover:opacity-70" width={150} height={34} alt="Stripe" />
          </Link>
        </div>
        <p className="opacity-50 mb-8">
          This is a payment simulation. Enter 4242 4242 4242 4242 as the card number, any future date for card expiry and any 3-digit number for CVC to simulate
          a successful payment.
        </p>
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', labels: 'floating' } }}>
          <CheckoutForm />
        </Elements>
      </div>
    );
}
