export function formatCents(cents: number): string {
  const dollars = cents / 100;
  const hasFractionalCents = cents % 100 !== 0;
  return `$${dollars.toLocaleString("en-US", {
    minimumFractionDigits: hasFractionalCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
