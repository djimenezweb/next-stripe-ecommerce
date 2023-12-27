'use client';

import { useState } from 'react';
import { Session } from 'next-auth';
import Image from 'next/image';
import placeholder from '@/public/images/profile_placeholder.png';
import Link from 'next/link';
import { SignInButton } from './Buttons';
import Cart from './Cart';
import { useCartStore } from '@/hooks/useCartStore';
import { ShoppingCart } from '@phosphor-icons/react';
import UserPanel from './UserPanel';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/public/logos/gwt_small.svg';

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  const totalItems = cartStore.cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const isCartOpen = useCartStore(state => state.isOpen);
  const toggleCart = useCartStore(state => state.toggleCart);
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-800 text-zinc-50">
        <nav className="mx-auto max-w-7xl pl-3 sm:pl-4 flex justify-between items-center relative">
          <Link href="/">
            <Image src={logo} alt="GWT Store Logo" width={55} height={32} className="relative top-1" />
          </Link>

          <AnimatePresence>
            {user && isUserPanelOpen && <UserPanel email={user.email} name={user.name} profile={user.image} setIsUserPanelOpen={setIsUserPanelOpen} />}
          </AnimatePresence>

          <div className="flex items-center justify-end gap-4 relative w-60 z-20 bg-slate-800 py-3 sm:py-4 pr-3 sm:pr-4">
            {!user && <SignInButton />}
            {user?.image && (
              <button className="cursor-default" onClick={() => setIsUserPanelOpen(state => !state)}>
                <motion.div className="cursor-pointer" layoutId="profilePicture" layout="position">
                  <Image src={user.image || placeholder} className="rounded-full" width={32} height={32} alt="Profile picture" />
                </motion.div>
              </button>
            )}

            <button onClick={toggleCart} className="relative">
              <ShoppingCart size={32} weight="light" />
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  className="absolute -top-1 -right-3 bg-orange-600 text-white rounded-full flex justify-center items-center w-6 h-6 text-sm overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.span initial={{ y: '100%' }} animate={{ y: -1 }} exit={{ y: '-100%' }} key={totalItems}>
                      {totalItems}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </button>
          </div>
          <AnimatePresence>{isCartOpen && <Cart />}</AnimatePresence>
        </nav>
      </header>
    </>
  );
}
