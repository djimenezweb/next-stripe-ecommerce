export function formatPrice(price: number, currency: string) {
  return (price / 100).toLocaleString(undefined, { style: 'currency', currency });
}

export function formatPriceIntl(price: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(price / 100);
}
