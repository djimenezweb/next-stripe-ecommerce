import Image from 'next/image';
import { SignOutButton } from './Buttons';
import placeholder from '@/public/profile-placeholder.png';
import Link from 'next/link';
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
      transition={{ duration: 0.6 }}
      onClick={handleClick}
      className="absolute top-0 mt-16 right-0 p-4 bg-orange-300 w-60 h-auto flex flex-col items-center justify-center gap-4">
      <span>{email}</span>
      <motion.div layoutId="profilePicture">
        <Image src={profile || placeholder} className="rounded-full" width={96} height={96} alt="Profile picture" />
      </motion.div>
      <span>Hi, {name}!</span>
      <Link href="/dashboard" onClick={() => setIsUserPanelOpen(false)}>
        My orders
      </Link>
      <SignOutButton />
    </motion.div>
  );
}
