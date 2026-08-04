"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

export type CartLine = {
  key: string;
  productSlug: string;
  name: string;
  image: string;
  size: string;
  grams: number;
  grind: string;
  priceCents: number;
  quantity: number;
  subscribed: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (input: {
    product: Product;
    sizeIndex: number;
    grind: string;
    quantity?: number;
    subscribed?: boolean;
  }) => void;
  removeLine: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotalCents: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "memberridge-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>(
    ({ product, sizeIndex, grind, quantity = 1, subscribed = false }) => {
      const size = product.sizes[sizeIndex];
      const discount = subscribed ? product.subscriptionDiscountPercent : 0;
      const priceCents = Math.round(size.priceCents * (1 - discount / 100));
      const key = `${product.slug}-${size.label}-${grind}-${subscribed}`;

      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, quantity: l.quantity + quantity } : l
          );
        }
        return [
          ...prev,
          {
            key,
            productSlug: product.slug,
            name: product.name,
            image: product.images[0],
            size: size.label,
            grams: size.grams,
            grind,
            priceCents,
            quantity,
            subscribed,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotalCents = useMemo(
    () => lines.reduce((sum, l) => sum + l.priceCents * l.quantity, 0),
    [lines]
  );
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    addItem,
    removeLine,
    updateQuantity,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    subtotalCents,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
