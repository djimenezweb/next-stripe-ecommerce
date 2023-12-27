export function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { dateStyle: 'long' });
}
