import { getProducts } from '@/lib/get-products';
import { getStats } from '@/lib/get-stats';
import { notFound } from 'next/navigation';
import AddToCart from './AddToCart';
import Image from 'next/image';
import { formatPrice } from '@/lib/format-price';
import Link from 'next/link';
import AnimatedCount from '@/app/(pages)/prod/[id]/AnimatedCount';
import { stripe } from '@/lib/stripe';

export async function generateStaticParams() {
  const products = await stripe.products.list();

  return products.data.map(product => ({
    id: product.id
  }));
}

export default async function GameDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const products = await getProducts();
  if (!products.find(product => product.id === id)) {
    return notFound();
  }

  const [game] = products.filter(item => item.id === id);

  const stats = await getStats(game.bggID);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="shrink-0">
        <Image src={game.images[0]} alt={game.name} width={372} height={372} />
      </div>

      <div className="flex flex-col items-start w-full">
        <h2 className="text-3xl mb-4 font-patua">{game.name}</h2>
        <p className="mb-4">{game.description}</p>

        <div className="bg-zinc-200 w-full sm:w-auto mb-4 p-4 rounded-md flex justify-center gap-4">
          <p className="text-3xl">{game.priceEur && formatPrice(game.priceEur, game.currency)}</p>
          <div>
            <AddToCart id={id} name={game.name} price={game.priceEur} image={game.images[0]} />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="px-4 py-4 bg-white w-full sm:max-w-[200px] flex flex-col justify-center items-center gap-2 rounded-md shadow-sm">
            <AnimatedCount value={stats.rating} />
            <Link href={game.bggURL}>Board Game Geek</Link>
          </div>
          <div className="px-4 py-4 bg-white w-full sm:max-w-[200px] flex flex-col justify-center items-center gap-2 rounded-md shadow-sm">
            <span className="text-2xl font-semibold">
              {stats.minPlayers} - {stats.maxPlayers}
            </span>
            <span>players</span>
          </div>
          <div className="px-4 py-4 bg-white w-full sm:max-w-[200px] flex flex-col justify-center items-center gap-2 rounded-md shadow-sm">
            <span className="text-2xl font-semibold">
              {stats.minPlayTime} - {stats.maxPlayTime}
            </span>
            <span>min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
