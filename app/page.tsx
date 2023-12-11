import { getProducts } from '@/lib/get-products';
import Product from './components/Product';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <h2 className="text-2xl my-4">Products</h2>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-8">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </section>
    </>
  );
}
