'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice } from '@/lib/format-price';
import { Cactus, X } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CartItem from './CartItem';
import { useEffect } from 'react';

export default function Cart() {
  const cartStore = useCartStore();
  const toggleCart = useCartStore(state => state.toggleCart);
  const totalItems = cartStore.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = cartStore.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  useEffect(() => {
    document.documentElement.classList.add('overflow-y-hidden');
    return () => document.documentElement.classList.remove('overflow-y-hidden');
  }, []);

  return (
    <>
      <motion.div className="fixed inset-0 bg-black/50 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleCart} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween' }}
        className="fixed top-0 right-0 bottom-0 z-50 p-4 sm:p-8 w-full lg:w-1/2 flex flex-col bg-zinc-100 text-neutral-800 overflow-auto">
        <button onClick={toggleCart} className="absolute top-4 right-4 sm:top-8 sm:right-8">
          <X size={32} />
        </button>
        <h2 className="text-2xl mb-8 font-patua">
          My Shopping Cart{' '}
          {totalItems > 0 && (
            <span className="text-base font-inter">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          )}
        </h2>

        {totalItems === 0 && (
          <div className="py-8 flex flex-col items-center justify-center gap-8">
            <p className="text-xl">Cart is empty</p>
            <Cactus size={64} weight="light" />
          </div>
        )}

        {totalItems > 0 && (
          <>
            <motion.div layout className="grow flex flex-col">
              <div className="mb-4 text-xs flex justify-between items-center opacity-50">
                <span className="uppercase">Product</span>
                <span className="uppercase">Total</span>
              </div>
              {cartStore.cart.map(product => (
                <CartItem key={product.id} {...product} />
              ))}
            </motion.div>
            <div>
              <h3 className="text-3xl flex justify-between my-4">
                <span className="font-patua">Subtotal</span>
                <span>{formatPrice(totalPrice, 'eur')}</span>
              </h3>
              <Link href="/checkout" onClick={toggleCart}>
                <button className=" w-full bg-orange-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75" disabled={totalItems <= 0}>
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}
