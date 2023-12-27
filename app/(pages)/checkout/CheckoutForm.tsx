'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice } from '@/lib/format-price';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const cartStore = useCartStore();
  const router = useRouter();
  const totalPrice = cartStore.cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  const formattedPrice = formatPrice(totalPrice, 'eur');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({ elements, redirect: 'if_required' });

    if (result.error) {
      console.log('CONFIRM PAYMENT ERROR', result.error);
    }

    if (!result.error) {
      router.push('/success');
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    //setIsLoading(false);
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <div className="flex my-8">
        <h3 className="text-2xl w-full">Total: {formattedPrice}</h3>
        <button
          id="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-orange-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75  disabled:bg-orange-300 disabled:cursor-not-allowed disabled:hover:opacity-100">
          <span>{isLoading ? '...' : 'Pay'}</span>
        </button>
      </div>
    </form>
  );
}
