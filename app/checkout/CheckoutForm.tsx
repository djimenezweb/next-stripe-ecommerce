'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice } from '@/utils';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CheckoutFormProps = {
  clientSecret: string;
};

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const cartStore = useCartStore();
  const router = useRouter();
  const totalPrice = cartStore.cart.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  const formattedPrice = formatPrice(totalPrice, 'eur');

  // useEffect(() => {
  //   if (!stripe) return;
  //   if (!clientSecret) return;
  // }, [stripe, clientSecret]);

  function handleConfirm() {
    // cartStore.resetCart();
    router.push('/dashboard');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({ elements, redirect: 'if_required' });
    setConfirmed(true);
    cartStore.resetCart();
    if (result.error) {
      console.log(result.error.message);
    }

    if (!result.error) {
      setIsLoading(false);
      console.log('CONFIRM PAYMENT ERROR!!!!!!', result.error);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  if (!confirmed)
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
        <h2>Total: {formattedPrice}</h2>
        <button
          id="submit"
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-orange-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75  disabled:bg-orange-300 disabled:cursor-not-allowed disabled:hover:opacity-100">
          <span>{isLoading ? 'Processing...' : 'Pay'}</span>
        </button>
      </form>
    );

  if (confirmed)
    return (
      <div className="flex flex-col justify-center items-center">
        <h2>Your order has been placed!</h2>
        <button onClick={handleConfirm}>OK</button>
      </div>
    );
}
