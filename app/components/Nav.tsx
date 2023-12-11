'use client';

import { useState } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import placeholder from '@/public/profile-placeholder.png';
import Link from 'next/link';
import { SignInButton } from './Buttons';
import Cart from './Cart';
import { useCartStore } from '@/hooks/useCartStore';
import { ShoppingCart } from '@phosphor-icons/react';
import UserPanel from './UserPanel';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  const totalItems = cartStore.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const isCartOpen = useCartStore(state => state.isOpen);
  const toggleCart = useCartStore(state => state.toggleCart);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  return (
    <>
      <nav className="bg-orange-200 dark:bg-orange-200 px-2 sm:px-4 py-4">
        <div className="mx-auto max-w-6xl flex justify-between items-center relative">
          <Link href="/">
            <h1 className="font-patua">Logo</h1>
          </Link>
          <AnimatePresence>
            {user && isUserPanelOpen && <UserPanel email={user.email} name={user.name} profile={user.image} setIsUserPanelOpen={setIsUserPanelOpen} />}
          </AnimatePresence>

          <div className="flex items-center gap-4 relative">
            {!user && <SignInButton />}
            {user?.image && (
              <motion.button onClick={() => setIsUserPanelOpen(state => !state)} layoutId="profilePicture">
                <Image src={user.image || placeholder} className="rounded-full" width={32} height={32} alt="Profile picture" />
              </motion.button>
            )}

            <button onClick={toggleCart} className="relative">
              <ShoppingCart size={32} />
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  className="absolute -top-1 -right-3 bg-stone-800 text-white rounded-full flex justify-center items-center w-6 h-6 text-sm overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} key={totalItems}>
                      {totalItems}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </button>
          </div>
          <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
          <AnimatePresence>
            {isCartOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30" onClick={toggleCart} />
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
