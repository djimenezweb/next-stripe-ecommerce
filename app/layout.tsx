import './globals.css';
import type { Metadata } from 'next';
import { Patua_One, Inter } from 'next/font/google';
import Nav from './components/Nav';
import { auth } from '@/auth';
import Hydrate from './components/Hydrate';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'GWT Store',
  description: 'Your Great Western Trail online store'
};

const inter = Inter({ weight: ['400', '600', '800'], subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const patua = Patua_One({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-patua' });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" className={`${inter.variable} ${patua.variable} w-screen overflow-x-hidden`}>
      <body className="bg-zinc-50 text-neutral-800 font-inter">
        <Hydrate>
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Nav user={session?.user} expires={session?.expires as string} />
            {children}

            <Footer />
          </div>
        </Hydrate>
      </body>
    </html>
  );
}
