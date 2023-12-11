'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice } from '@/utils';
import { X } from '@phosphor-icons/react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function CartContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed top-0 right-0 bottom-0 bg-orange-100 z-10 p-4 w-full lg:w-1/2 2xl:w-1/3 flex flex-col">
      {children}
    </motion.div>
  );
}

export default function Cart() {
  const cartStore = useCartStore();
  const totalItems = cartStore.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = cartStore.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  if (totalItems > 0) {
    return (
      <CartContainer>
        <button onClick={cartStore.toggleCart} className="absolute top-4 right-8 z-10">
          <X size={32} />
        </button>
        <h2>My Shopping Cart</h2>

        <p className="mb-4">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>
        <motion.div layout className="grow flex flex-col">
          {cartStore.cart.map(product => (
            <motion.div layout key={product.id} className="border-orange-200 border-t last:border-b pt-4 pb-8">
              <div className="font-patua text-lg flex justify-between items-center">
                <h3>{product.name}</h3>
                <span>{formatPrice(product.price * product.quantity, 'eur')}</span>
              </div>
              <p>{formatPrice(product.price, 'eur')}</p>

              <div className="flex justify-between items-center">
                <div className="border border-black flex justify-center items-center">
                  <button
                    className={`flex shrink-0 justify-center items-center w-16 h-16 ${product.quantity === 1 ? 'cursor-not-allowed' : ''}`}
                    onClick={() => cartStore.decrease(product.id)}
                    disabled={product.quantity === 1}>
                    -
                  </button>
                  <span className="flex shrink-0 justify-center items-center w-16 h-16">×{product.quantity}</span>
                  <button className="flex shrink-0 justify-center items-center w-16 h-16" onClick={() => cartStore.increase(product.id)}>
                    +
                  </button>
                </div>
                <button onClick={() => cartStore.removeFromCart(product.id)}>Delete all</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div>
          <h3 className="text-2xl flex justify-between mb-4">
            <span className="font-patua">Subtotal</span>
            <span>{formatPrice(totalPrice, 'eur')}</span>
          </h3>
          <Link href="/checkout" onClick={cartStore.toggleCart}>
            <button className=" w-full bg-orange-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75" disabled={totalItems <= 0}>
              Checkout
            </button>
          </Link>
        </div>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <button onClick={cartStore.toggleCart} className="absolute top-4 right-8 z-10">
        <X size={32} />
      </button>
      <p>Cart is empty</p>
    </CartContainer>
  );
}
