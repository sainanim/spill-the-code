"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatCents } from "@/lib/money";

export default function CartDrawer() {
  const { isOpen, closeCart, resolvedItems, totalCents, removeItem, setQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[60] flex justify-end"
          onClick={closeCart}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="bg-white h-full w-full max-w-md shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-[var(--color-primary)]">Your Cart</h2>
              <button
                onClick={closeCart}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {resolvedItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
                <ShoppingCart className="h-10 w-10 text-[var(--text-secondary)]" />
                <p className="text-[var(--text-secondary)]">Your cart is empty.</p>
                <button
                  onClick={closeCart}
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  Continue browsing
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {resolvedItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3 border-b pb-4">
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">{item.shortLabel}</p>
                        {item.isPlaceholderPrice && (
                          <p className="text-xs text-[var(--text-secondary)]">
                            Estimated price — final pricing TBD
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 flex items-center justify-center border rounded hover:bg-[var(--background-secondary)]"
                            aria-label={`Decrease quantity of ${item.shortLabel}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 flex items-center justify-center border rounded hover:bg-[var(--background-secondary)]"
                            aria-label={`Increase quantity of ${item.shortLabel}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-medium text-[var(--text-primary)]">
                          {formatCents(item.lineTotalCents)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--text-secondary)] hover:text-red-600 transition-colors"
                          aria-label={`Remove ${item.shortLabel}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t space-y-3">
                  <div className="flex items-center justify-between font-semibold text-[var(--text-primary)]">
                    <span>Subtotal</span>
                    <span>{formatCents(totalCents)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full text-center py-3 bg-[var(--color-accent)] text-white font-semibold rounded-lg hover:opacity-90 transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
