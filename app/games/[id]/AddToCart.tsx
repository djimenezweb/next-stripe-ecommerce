'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

type AddToCartProps = {
  id: string;
  name: string;
  price: number;
};

export default function AddToCart({ id, name, price }: AddToCartProps) {
  const cartStore = useCartStore();
  const productDetails = { id, name, price, quantity: 0 };
  const quantity = cartStore.cart.find(p => p.id === id)?.quantity;

  return (
    <button
      className="relative bg-orange-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75"
      onClick={() => cartStore.addToCart(productDetails)}>
      <span>Add to cart</span>
      <AnimatePresence>
        {quantity && (
          <motion.div
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            className="absolute -top-2 -right-3 bg-orange-900 text-white rounded-full flex justify-center items-center w-6 h-6 text-sm overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} key={quantity}>
                {quantity}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
