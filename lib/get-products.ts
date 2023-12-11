import { stripe } from '@/lib/stripe';

export async function getProducts() {
  const products = await stripe.products.list();

  const productsWithPrices = await Promise.all(
    products.data.map(async product => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        bgg: product.metadata.bgg,
        priceEur: prices.data[0].unit_amount as number,
        currency: prices.data[0].currency
      };
    })
  );
  return productsWithPrices;
}
