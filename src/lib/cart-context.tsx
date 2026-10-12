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

export const FREE_SHIPPING_THRESHOLD_CENTS = 4500;
export const SHIPPING_RATES_CENTS = { standard: 500, express: 1500 } as const;
export type ShippingMethod = keyof typeof SHIPPING_RATES_CENTS;

/** Front-end-only promo codes. Gift cards are never discounted. */
const PROMO_CODES: Record<
  string,
  { label: string; percentOff?: number; freeShipping?: boolean; minSubtotalCents?: number }
> = {
  WELCOME10: { label: "10% off your first order", percentOff: 10 },
  RIDGE15: { label: "15% off orders over $60", percentOff: 15, minSubtotalCents: 6000 },
  SHIPFREE: { label: "Free standard shipping", freeShipping: true },
};

export type CartLine = {
  key: string;
  /** Absent on gift cards, which have no product page. */
  productSlug?: string;
  kind?: "coffee" | "gift-card";
  name: string;
  image: string;
  size: string;
  grams: number;
  grind: string;
  priceCents: number;
  quantity: number;
  subscribed: boolean;
};

type PromoState = { code: string; label: string } | null;

type CartContextValue = {
  lines: CartLine[];
  addItem: (input: {
    product: Product;
    sizeIndex: number;
    grind: string;
    quantity?: number;
    subscribed?: boolean;
  }) => void;
  addGiftCard: (input: { amountCents: number; delivery: "Digital" | "Printed"; image: string }) => void;
  removeLine: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotalCents: number;
  discountCents: number;
  itemCount: number;
  promo: PromoState;
  applyPromo: (code: string) => { ok: true; label: string } | { ok: false; error: string };
  removePromo: () => void;
  shippingCents: (method: ShippingMethod) => number;
  /** Text for an aria-live region, so screen readers hear what was added. */
  announcement: string;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "memberridge-cart";
const PROMO_KEY = "memberridge-promo";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [promo, setPromo] = useState<PromoState>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client hydration from localStorage
      if (raw) setLines(JSON.parse(raw));
      const rawPromo = window.localStorage.getItem(PROMO_KEY);
      if (rawPromo) setPromo(JSON.parse(rawPromo));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    if (promo) window.localStorage.setItem(PROMO_KEY, JSON.stringify(promo));
    else window.localStorage.removeItem(PROMO_KEY);
  }, [lines, promo, hydrated]);

  const upsert = useCallback((line: CartLine) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.key === line.key);
      if (existing) {
        return prev.map((l) =>
          l.key === line.key ? { ...l, quantity: l.quantity + line.quantity } : l
        );
      }
      return [...prev, line];
    });
    setAnnouncement(`${line.name}, ${line.size}, added to your bag.`);
    setIsOpen(true);
  }, []);

  const addItem = useCallback<CartContextValue["addItem"]>(
    ({ product, sizeIndex, grind, quantity = 1, subscribed = false }) => {
      const size = product.sizes[sizeIndex];
      const discount = subscribed ? product.subscriptionDiscountPercent : 0;
      upsert({
        key: `${product.slug}-${size.label}-${grind}-${subscribed}`,
        productSlug: product.slug,
        kind: "coffee",
        name: product.name,
        image: product.images[0],
        size: size.label,
        grams: size.grams,
        grind,
        priceCents: Math.round(size.priceCents * (1 - discount / 100)),
        quantity,
        subscribed,
      });
    },
    [upsert]
  );

  const addGiftCard = useCallback<CartContextValue["addGiftCard"]>(
    ({ amountCents, delivery, image }) => {
      upsert({
        key: `gift-card-${amountCents}-${delivery}`,
        kind: "gift-card",
        name: "Memberridge Gift Card",
        image,
        size: delivery,
        grams: 0,
        grind: "",
        priceCents: amountCents,
        quantity: 1,
        subscribed: false,
      });
    },
    [upsert]
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

  const clear = useCallback(() => {
    setLines([]);
    setPromo(null);
  }, []);

  const subtotalCents = useMemo(
    () => lines.reduce((sum, l) => sum + l.priceCents * l.quantity, 0),
    [lines]
  );
  const discountableCents = useMemo(
    () =>
      lines
        .filter((l) => l.kind !== "gift-card")
        .reduce((sum, l) => sum + l.priceCents * l.quantity, 0),
    [lines]
  );
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const activeRule = promo ? PROMO_CODES[promo.code] : undefined;
  const promoQualifies =
    !!activeRule && discountableCents >= (activeRule.minSubtotalCents ?? 0);
  const discountCents =
    promoQualifies && activeRule?.percentOff
      ? Math.round((discountableCents * activeRule.percentOff) / 100)
      : 0;

  const applyPromo = useCallback<CartContextValue["applyPromo"]>(
    (raw) => {
      const code = raw.trim().toUpperCase();
      const rule = PROMO_CODES[code];
      if (!rule) return { ok: false, error: "That code isn't valid." };
      if (rule.minSubtotalCents && discountableCents < rule.minSubtotalCents) {
        return {
          ok: false,
          error: `${code} applies to coffee orders over $${rule.minSubtotalCents / 100}.`,
        };
      }
      setPromo({ code, label: rule.label });
      return { ok: true, label: rule.label };
    },
    [discountableCents]
  );

  const shippingCents = useCallback(
    (method: ShippingMethod) => {
      if (lines.length > 0 && lines.every((l) => l.kind === "gift-card" && l.size === "Digital")) {
        return 0;
      }
      if (method === "standard") {
        if (subtotalCents - discountCents >= FREE_SHIPPING_THRESHOLD_CENTS) return 0;
        if (promoQualifies && activeRule?.freeShipping) return 0;
      }
      return SHIPPING_RATES_CENTS[method];
    },
    [lines, subtotalCents, discountCents, promoQualifies, activeRule]
  );

  const value: CartContextValue = {
    lines,
    addItem,
    addGiftCard,
    removeLine,
    updateQuantity,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    subtotalCents,
    discountCents,
    itemCount,
    promo,
    applyPromo,
    removePromo: () => setPromo(null),
    shippingCents,
    announcement,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
