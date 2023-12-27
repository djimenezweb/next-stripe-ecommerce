'use client';

import { signIn, signOut } from 'next-auth/react';

function SignInButton() {
  return (
    <button className="bg-orange-600 hover:bg-orange-500 text-orange-100 py-[0.5em] px-[1em] rounded-md" onClick={() => signIn()}>
      Sign in
    </button>
  );
}

function SignOutButton() {
  return (
    <button className="bg-red-600 hover:bg-red-500 text-orange-100 py-[0.5em] px-[1em] rounded-md" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </button>
  );
}

export { SignInButton, SignOutButton };
