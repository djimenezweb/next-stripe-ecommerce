import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/format-price';

export default function Product({ id, name, images, priceEur, currency, description }: Product) {
  return (
    <div className="relative p-1 bg-zinc-50 shadow-lg group">
      <Link href={`/prod/${id}`}>
        <div className="overflow-hidden">
          <Image
            src={images[0]}
            alt={name}
            width={200}
            height={200}
            className="w-full h-auto sm:transition-transform sm:group-hover:-translate-y-4 sm:ease-[cubic-bezier(0.33,1,0.68,1)] sm:duration-400"
            priority={true}
          />
        </div>
        <div className="bg-zinc-50 px-2 sm:px-4 pt-2 pb-8 sm:py-5 sm:transition-transform sm:group-hover:-translate-y-14 sm:ease-[cubic-bezier(0.33,1,0.68,1)] sm:duration-400">
          <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-extrabold text-slate-800 sm:max-w-[90%] font-patua">{name}</h3>
          <p className="text-sm sm:text-base mb-2 sm:max-w-[80%] opacity-70 sm:transition sm:group-hover:opacity-90 sm:group-hover:translate-y-2 sm:ease-[cubic-bezier(0.33,1,0.68,1)] sm:duration-400">
            {description}
          </p>
        </div>
        <p className="font-semibold absolute bottom-2 sm:bottom-0 left-3 sm:left-5 sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:group-hover:-translate-y-8 sm:ease-[cubic-bezier(0.33,1,0.68,1)] sm:duration-400">
          {priceEur && formatPrice(priceEur, currency)}
        </p>
      </Link>
    </div>
  );
}
