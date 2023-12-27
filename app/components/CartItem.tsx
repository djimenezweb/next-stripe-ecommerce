'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { formatPrice } from '@/lib/format-price';
import { Trash, Minus, Plus } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function CartItem({ name, id, price, image, quantity }: CartItem) {
  const cartStore = useCartStore();
  const [isTrashHover, setIsTrashHover] = useState(false);

  return (
    <motion.div layout key={id} className="border-zinc-300 border-t last:border-b py-4 sm:py-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <Image src={image} width={96} height={96} alt={name} className="hidden sm:block" />

        <div className="flex flex-col grow gap-1 justify-center items-start">
          <h3 className="font-patua text-lg">{name}</h3>
          <p className="text-sm">
            <span className="text-xs px-[0.5em] py-[0.25em] bg-emerald-600 text-white font-semibold rounded">In Stock</span>
            <span className="inline-flex w-4 justify-end">{quantity}</span> × <span>{formatPrice(price, 'eur')}</span>
          </p>
        </div>

        <div className="flex items-center w-full sm:w-auto">
          <div className="w-8 h-8 mr-4 flex justify-center items-center">
            <button onClick={() => cartStore.removeFromCart(id)} onMouseEnter={() => setIsTrashHover(true)} onMouseLeave={() => setIsTrashHover(false)}>
              <Trash size={24} weight={isTrashHover ? 'fill' : 'light'} color={isTrashHover ? 'crimson' : 'currentColor'} />
            </button>
          </div>
          <button
            onClick={() => cartStore.decrease(id)}
            disabled={quantity === 1}
            className={`w-8 h-8 border border-zinc-300 hover:border-slate-800 flex justify-center items-center ${
              quantity === 1 ? 'hover:bg-neutral-200 cursor-not-allowed' : 'hover:bg-orange-400 cursor-pointer'
            }`}>
            <Minus size={16} weight="light" />
          </button>
          <div className="w-8 h-8 border-y border-zinc-300 flex justify-center items-center">
            <span>{quantity}</span>
          </div>
          <button
            onClick={() => cartStore.increase(id)}
            className="w-8 h-8 border border-zinc-300 hover:border-slate-800 hover:bg-orange-400 flex justify-center items-center cursor-pointer">
            <Plus size={16} weight="light" />
          </button>

          <div className="flex items-center justify-end ml-auto sm:ml-2 basis-24 w-24">
            <span className="font-patua text-xl">{formatPrice(price * quantity, 'eur')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
