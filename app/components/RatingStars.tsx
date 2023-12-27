'use client';

import { motion } from 'framer-motion';

function Star({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="#000000" viewBox="0 0 256 256">
      <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
    </svg>
  );
}

function StarMask({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="#000000" viewBox="0 0 256 256">
      <path
        className="fill-orange-50"
        d="M 0,0 V 256 H 256 V 0 Z m 128,16 a 15.95,15.95 0 0 1 14.72917,9.8125 L 166,81.166667 225.4375,86.3125 a 16,16 0 0 1 9.10417,28.0625 H 234.5 l -45.10417,39.375 13.52084,58.58333 A 16,16 0 0 1 179.0625,229.6875 l -51.10417,-31 -50.999997,31 A 16,16 0 0 1 53.125,212.33333 L 66.604167,153.79167 21.5,114.375 A 16,16 0 0 1 30.604167,86.3125 L 90.0625,81.166667 113.27083,25.8125 A 15.95,15.95 0 0 1 128,16 Z"
      />
    </svg>
  );
}

export default function RatingStars({ rating, stars, size = 24 }: { rating: string; stars: number; size?: number }) {
  const ratingPercent = Number.parseFloat(rating) * 10;
  const containerWidth = size * stars;

  return (
    <>
      <div className="relative h-8" style={{ width: `${containerWidth}px`, height: `${size}px` }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: 'spring', stiffness: 50, damping: 13, mass: 1 }}
          className="absolute top-0 left-0 h-full bg-amber-500 z-[-1]"
          style={{ width: `${ratingPercent}%`, originX: 0 }}
        />

        <div className="absolute top-0 left-0 w-full h-full flex">
          {Array.from(Array(stars).keys()).map(n => (
            <StarMask key={n} size={size} />
          ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex">
          {Array.from(Array(stars).keys()).map(n => (
            <Star key={n} size={size} />
          ))}
        </div>
      </div>
    </>
  );
}
