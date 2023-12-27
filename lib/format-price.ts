export function formatPrice(price: number, currency: string) {
  return (price / 100).toLocaleString(undefined, { style: 'currency', currency });
}
