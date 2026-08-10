"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors duration-300"
      aria-label="Open cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white text-xs font-bold">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
