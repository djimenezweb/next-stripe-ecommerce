'use client';

import Link from 'next/link';
import logos from '@/constants/logos';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { GithubLogo } from '@phosphor-icons/react';
import { wrap } from '@/lib/wrap';

const AUTO_DELAY = 3333;

export default function Footer() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive(prev => wrap(0, logos.length, prev + 1));
    }, AUTO_DELAY);
    intervalRef.current = intervalId;
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <footer className="bg-slate-700 px-2 sm:px-4 py-8 text-zinc-50 text-sm">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex justify-start items-center gap-2">
            <Link href="https://github.com/djimenezweb/next-stripe-ecommerce">
              <GithubLogo size={24} weight="light" />
            </Link>

            <Link href="https://github.com/djimenezweb/next-stripe-ecommerce">
              <span className="opacity-60">Coded by Daniel Jiménez</span>{' '}
              <span className="block sm:inline">
                <span className="opacity-60">with</span> <span className="opacity-90">{logos[active].name}</span>
              </span>
            </Link>
          </div>

          <div className="flex w-full max-w-md justify-between sm:justify-start sm:gap-3 sm:w-auto sm:max-w-none">
            {logos.map((logo, index) => (
              <Link key={logo.id} href={logo.url} onMouseEnter={() => setActive(index)}>
                <Image
                  src={logo.src}
                  width={16}
                  height={16}
                  alt={logo.name}
                  className={`invert opacity-40 hover:opacity-90 transition-opacity ${index === active ? 'opacity-90' : ''}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
