'use client';

import { signIn } from 'next-auth/react';

// According to https://tailwindcss.com/docs/content-configuration#dynamic-class-names

const colorVariants: { [id: string]: string } = {
  google: 'bg-[#4285f4] hover:bg-[#76a7fa] text-[#f2f2f2]'
};

export default function ProviderSignInButton({ id, name }: { id: string; name: string }) {
  return (
    <button onClick={() => signIn(id)} className={`${colorVariants[id]} py-[0.5em] px-[1em] rounded-md`}>
      Sign in with {name}
    </button>
  );
}
