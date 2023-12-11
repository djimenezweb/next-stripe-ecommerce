'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {
  const cartStore = useCartStore();
  const setPaymentIntent = cartStore.setPaymentIntent;
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('This useEffect should fire once! - ' + Date.now());

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

  if (!clientSecret) return <p>Client Secret Error</p>;

  if (clientSecret)
    return (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', labels: 'floating' } }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    );
}
