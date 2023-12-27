import Image from 'next/image';
import Link from 'next/link';
import { SignOutButton } from './Buttons';
import placeholder from '@/public/images/profile_placeholder.png';
import { motion } from 'framer-motion';

type UserPanelProps = {
  email: string | null | undefined;
  name: string | null | undefined;
  profile: string | null | undefined;
  setIsUserPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserPanel({ email, name, profile, setIsUserPanelOpen }: UserPanelProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setIsUserPanelOpen(false);
  }

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="absolute top-14 sm:top-16 right-0 z-10 p-4 bg-zinc-100 text-neutral-800 w-60 h-auto flex flex-col items-center justify-center gap-4 shadow-lg rounded-b-md">
      <span className="text-sm">{email}</span>
      <motion.div layoutId="profilePicture" layout="position">
        <Image src={profile || placeholder} className="rounded-full" width={64} height={64} alt="Profile picture" />
      </motion.div>
      <span>Hi, {name}!</span>
      <Link href="/dashboard" onClick={() => setIsUserPanelOpen(false)}>
        My orders
      </Link>
      <SignOutButton />
    </motion.div>
  );
}
