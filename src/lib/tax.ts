// Ontario HST. Kept in basis points so both the arithmetic and the "13%"
// label are exact integer math — 0.13 * 100 is 13.000000000000002 in floating
// point, and a rate that lives in one constant is a one-line change if it moves.
export const HST_BASIS_POINTS = 1300;

export const HST_LABEL = `HST (${HST_BASIS_POINTS / 100}%)`;

export interface OrderTotals {
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
}

// Tax is applied to the order subtotal rather than line by line: it matches how
// the invoice is actually taxed, and it guarantees subtotal + tax === total with
// no accumulated per-line rounding drift.
export function calculateOrderTotals(subtotalCents: number): OrderTotals {
  const taxCents = Math.round((subtotalCents * HST_BASIS_POINTS) / 10_000);
  return { subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}
