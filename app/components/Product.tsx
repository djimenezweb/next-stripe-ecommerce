import Image from 'next/image';
import { formatPrice, slugify } from '@/utils';
import Link from 'next/link';

export default function Product({ id, name, images, priceEur, currency }: Product) {
  return (
    <Link href={`/games/${id}`}>
      <div>
        <Image src={images[0]} alt={name} width={200} height={200} className="w-full h-auto" priority={true} />
        <p>{name}</p>
        <p>{priceEur && formatPrice(priceEur, currency)}</p>
      </div>
    </Link>
  );
}
