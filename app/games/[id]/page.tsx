import { getProducts } from '@/lib/get-products';
import { notFound } from 'next/navigation';
import AddToCart from './AddToCart';
import Image from 'next/image';
import { formatPrice } from '@/utils';
import Link from 'next/link';

export default async function GameDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const products = await getProducts();
  if (!products.find(product => product.id === id)) {
    return notFound();
  }

  const [game] = products.filter(item => item.id === id);

  return (
    <div className="pt-8 flex flex-col lg:flex-row gap-8">
      <div>
        <Image src={game.images[0]} alt={game.name} width={300} height={300} className="w-auto h-auto" priority={true} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-3xl mb-4">{game.name}</h2>
        <p className="text-2xl mb-8">{game.priceEur && formatPrice(game.priceEur, game.currency)}</p>
        <p className="mb-4">{game.description}</p>
        <Link href={game.bgg}>BGG</Link>
        <div className="mt-auto">
          <AddToCart id={id} name={game.name} price={game.priceEur} />
        </div>
      </div>
    </div>
  );
}
