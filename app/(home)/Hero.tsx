'use client';

import Image from 'next/image';
import banner from '@/public/images/gwt_banner.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], ['-5%', '-40%']);

  return (
    <>
      <div className="w-full aspect-[3] absolute top-0 left-0 z-[-1] bg-zinc-50 overflow-hidden">
        <motion.div className="w-full" style={{ y }}>
          <Image src={banner} alt="GWT Store" className="w-full object-cover object-center opacity-40" />
        </motion.div>
        <div className="h-1/2 absolute bottom-0 w-full bg-gradient-to-b from-transparent to-zinc-50" />
      </div>
    </>
  );
}
