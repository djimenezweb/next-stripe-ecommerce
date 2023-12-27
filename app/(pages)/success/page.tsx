'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/hooks/useCartStore';
import { useEffect } from 'react';

export default function Success() {
  const resetCart = useCartStore(state => state.resetCart);

  useEffect(() => {
    resetCart();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl font-patua">Thank you!</h3>

      <motion.svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 256 256" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.path
          fill="none"
          stroke="#059669"
          strokeWidth={24}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 40.00894,143.94657 95.964327,199.90227 223.96372,72.044657"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.15 }}
        />
      </motion.svg>

      <p className="mb-4">Your order has been placed</p>
      <Link href="/dashboard">
        <button className="bg-emerald-600 text-white py-[0.5em] px-[1em] rounded-md hover:opacity-75">OK</button>
      </Link>
    </div>
  );
}
