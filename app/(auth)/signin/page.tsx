import { ProviderType } from 'next-auth/providers';
import ProviderSignInButton from './button';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  const response = await fetch(process.env.BASE_URL + '/api/auth/providers');
  if (!response.ok) return;
  const providers: Promise<ProviderType[]> = await response.json();

  return (
    <div className="flex justify-center items-center h-full">
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <ProviderSignInButton id={provider.id} name={provider.name} />
        </div>
      ))}
    </div>
  );
}
