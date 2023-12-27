'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedCount({ value }: { value: string }) {
  const rating = Number(value);
  const spring = useSpring(0, { stiffness: 40, damping: 13, mass: 1 });
  const display = useTransform(spring, current => Number.parseFloat(current).toFixed(1));

  useEffect(() => {
    spring.set(rating);
  }, [spring, rating]);

  return (
    <motion.div
      initial={{ backgroundColor: 'hsl(148,0%,60%)' }}
      animate={{ backgroundColor: 'hsl(148,63%,31%)' }}
      transition={{ type: 'spring', stiffness: 40, damping: 13, mass: 1 }}
      className="w-12 h-14 text-white text-xl font-semibold flex justify-center items-center [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]">
      <motion.span>{display}</motion.span>
    </motion.div>
  );
}
