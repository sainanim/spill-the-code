"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getOfferingById, type Offering } from "@/lib/offerings";
import CartDrawer from "./CartDrawer";
import CartToast, { type ToastState } from "./CartToast";

const STORAGE_KEY = "stc_cart_v1";
const MAX_QUANTITY = 20;
const TOAST_DURATION_MS = 2500;

interface CartLineItem {
  offeringId: string;
  quantity: number;
}

export type ResolvedCartItem = Offering & {
  quantity: number;
  lineTotalCents: number;
};

interface CartContextValue {
  resolvedItems: ResolvedCartItem[];
  itemCount: number;
  totalCents: number;
  // False until the persisted cart has been read from localStorage — lets
  // consumers hold a neutral state instead of flashing "cart is empty".
  hydrated: boolean;
  addItem: (offeringId: string, quantity?: number) => void;
  removeItem: (offeringId: string) => void;
  setQuantity: (offeringId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isValidLineItems(value: unknown): value is CartLineItem[] {
  if (!Array.isArray(value)) return false;
  return value.every((item): item is CartLineItem => {
    if (typeof item !== "object" || item === null) return false;
    const candidate = item as Record<string, unknown>;
    return (
      typeof candidate.offeringId === "string" &&
      Number.isInteger(candidate.quantity) &&
      (candidate.quantity as number) > 0
    );
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Read persisted cart once on mount. Deferred to an effect (never read in
  // render or in a useState initializer) so server and first client render match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (isValidLineItems(parsed)) {
          // Clamp on the way in so a corrupted/tampered stored quantity can't
          // render totals the server would reject anyway.
          setItems(
            parsed.map((item) => ({ ...item, quantity: Math.min(item.quantity, MAX_QUANTITY) }))
          );
        }
      }
    } catch {
      // malformed or unavailable localStorage — start with an empty cart
    } finally {
      setHydrated(true);
    }
  }, []);

  // Gated on `hydrated` so this never fires before the read effect above,
  // which would otherwise overwrite real persisted data with an empty array.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write failures (e.g. storage disabled/full)
    }
  }, [items, hydrated]);

  // quantity lets the product detail page add several at once; the cart and
  // course pages call this with no second argument and still add one.
  const addItem = (offeringId: string, quantity: number = 1) => {
    const offering = getOfferingById(offeringId);
    if (!offering) return;
    const toAdd = Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY);
    setItems((prev) => {
      const existing = prev.find((item) => item.offeringId === offeringId);
      if (existing) {
        return prev.map((item) =>
          item.offeringId === offeringId
            ? { ...item, quantity: Math.min(item.quantity + toAdd, MAX_QUANTITY) }
            : item
        );
      }
      return [...prev, { offeringId, quantity: toAdd }];
    });

    // A brief toast confirms the add without interrupting browsing the way
    // popping the full drawer open on every click would.
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ id: Date.now(), message: `Added "${offering.shortLabel}" to cart` });
    toastTimeoutRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  };

  const removeItem = (offeringId: string) => {
    setItems((prev) => prev.filter((item) => item.offeringId !== offeringId));
  };

  const setQuantity = (offeringId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(offeringId);
      return;
    }
    const clamped = Math.min(quantity, MAX_QUANTITY);
    setItems((prev) =>
      prev.map((item) =>
        item.offeringId === offeringId ? { ...item, quantity: clamped } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  // Title/price are never stored in cart state — always resolved from the
  // canonical offerings data, which also drops any id that no longer exists.
  const resolvedItems = useMemo<ResolvedCartItem[]>(() => {
    return items.flatMap((item) => {
      const offering = getOfferingById(item.offeringId);
      if (!offering) return [];
      return [
        {
          ...offering,
          quantity: item.quantity,
          lineTotalCents: offering.priceCents * item.quantity,
        },
      ];
    });
  }, [items]);

  const itemCount = resolvedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCents = resolvedItems.reduce((sum, item) => sum + item.lineTotalCents, 0);

  const value: CartContextValue = {
    resolvedItems,
    itemCount,
    totalCents,
    hydrated,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
      <CartToast
        toast={toast}
        onViewCart={() => {
          setIsOpen(true);
          setToast(null);
        }}
      />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
