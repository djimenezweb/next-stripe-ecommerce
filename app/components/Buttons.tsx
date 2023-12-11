'use client';

import { signIn, signOut } from 'next-auth/react';

function SignInButton() {
  return (
    <button className="bg-orange-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75" onClick={() => signIn()}>
      Sign in
    </button>
  );
}

function SignOutButton() {
  return (
    <button className="bg-red-600 text-orange-100 py-[0.5em] px-[1em] rounded-md hover:opacity-75" onClick={() => signOut()}>
      Sign out
    </button>
  );
}

export { SignInButton, SignOutButton };
