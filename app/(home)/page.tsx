import { getProducts } from '@/lib/get-products';
import Product from './Product';
import Hero from './Hero';
import Image from 'next/image';
import logo from '@/public/logos/gwt_full.svg';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="relative">
        <Hero />
      </div>
      <div className="max-w-7xl mx-auto p-2">
        <h2 className="w-10/12 max-w-4xl mx-auto py-12 sm:py-24">
          <Image src={logo} alt="GWT Store" />
        </h2>
        <section className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-2 sm:gap-8">
          {products.map(product => (
            <Product key={product.id} {...product} />
          ))}
        </section>
      </div>
    </>
  );
}
