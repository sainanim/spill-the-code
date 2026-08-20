"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

// Mirrors the cart drawer's clamp so the stepper can't offer a quantity the
// provider would silently reduce on add.
const MAX_QUANTITY = 20;

export default function AddToCartControls({ offeringId }: { offeringId: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const step = (delta: number) =>
    setQuantity((q) => Math.min(Math.max(q + delta, 1), MAX_QUANTITY));

  return (
    <div className="flex items-center gap-3">
      {/* Quantity adjuster sits to the left of the add-to-cart button */}
      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={quantity <= 1}
          className="h-11 w-11 flex items-center justify-center text-[var(--text-primary)]
                     hover:bg-[var(--background-secondary)] rounded-l-lg transition-colors
                     disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center font-medium tabular-nums" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={quantity >= MAX_QUANTITY}
          className="h-11 w-11 flex items-center justify-center text-[var(--text-primary)]
                     hover:bg-[var(--background-secondary)] rounded-r-lg transition-colors
                     disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => addItem(offeringId, quantity)}
        className="h-11 flex-1 sm:flex-none sm:px-8 inline-flex items-center justify-center gap-2
                   rounded-lg bg-[var(--color-primary)] text-white font-semibold
                   hover:opacity-90 active:scale-[0.98] transition"
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>
    </div>
  );
}
