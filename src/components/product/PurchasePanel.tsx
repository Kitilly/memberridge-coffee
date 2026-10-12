"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus, RefreshCw, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const frequencies = ["Every week", "Every 2 weeks", "Every month"];

export function PurchasePanel({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [grind, setGrind] = useState(product.grindOptions[0]);
  const [subscribed, setSubscribed] = useState(false);
  const [frequency, setFrequency] = useState(frequencies[1]);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const size = product.sizes[sizeIndex];
  const canSubscribe = product.subscriptionDiscountPercent > 0;
  const discount = subscribed ? product.subscriptionDiscountPercent : 0;
  const unitPrice = Math.round(size.priceCents * (1 - discount / 100));
  const per100g = Math.round((unitPrice / size.grams) * 100);

  // Show the sticky bar once the main Add button has scrolled out above the viewport.
  useEffect(() => {
    const el = addButtonRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleAdd = () => addItem({ product, sizeIndex, grind, quantity, subscribed });

  const optionButton = (active: boolean) =>
    cn(
      "px-5 py-2.5 text-sm border transition-colors",
      active ? "border-espresso bg-espresso text-ivory" : "border-espresso/25 text-espresso hover:border-espresso"
    );

  return (
    <div className="space-y-8">
      <div className="flex items-baseline gap-3">
        <p className="font-display text-4xl tabular">{formatPrice(unitPrice * quantity)}</p>
        {discount > 0 && (
          <p className="text-sm text-espresso/45 line-through tabular">{formatPrice(size.priceCents * quantity)}</p>
        )}
        <p className="text-xs text-coffee tabular ml-auto">{formatPrice(per100g)} / 100g</p>
      </div>

      <fieldset>
        <legend className="eyebrow text-espresso mb-3">Size</legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s, i) => (
            <button key={s.label} type="button" onClick={() => setSizeIndex(i)} aria-pressed={i === sizeIndex} className={optionButton(i === sizeIndex)}>
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-espresso mb-3">Grind</legend>
        <div className="flex flex-wrap gap-2">
          {product.grindOptions.map((g) => (
            <button key={g} type="button" onClick={() => setGrind(g)} aria-pressed={grind === g} className={optionButton(grind === g)}>
              {g}
            </button>
          ))}
        </div>
        <p className="text-xs text-coffee mt-2.5">
          {grind === "Whole Bean"
            ? "Best for freshness — grind just before brewing."
            : "Ground to order on the day it ships."}
        </p>
      </fieldset>

      {canSubscribe && (
        <fieldset className="border border-espresso/15 divide-y divide-espresso/15">
          <legend className="sr-only">Purchase type</legend>
          <label className={cn("flex items-center justify-between gap-4 p-4 cursor-pointer", !subscribed && "bg-cream/60")}>
            <span className="flex items-center gap-3">
              <input type="radio" name="purchase-type" checked={!subscribed} onChange={() => setSubscribed(false)} className="accent-espresso" />
              <span className="text-sm">One-time purchase</span>
            </span>
            <span className="text-sm tabular">{formatPrice(size.priceCents)}</span>
          </label>
          <div className={cn(subscribed && "bg-cream/60")}>
            <label className="flex items-center justify-between gap-4 p-4 cursor-pointer">
              <span className="flex items-center gap-3">
                <input type="radio" name="purchase-type" checked={subscribed} onChange={() => setSubscribed(true)} className="accent-espresso" />
                <span className="text-sm">
                  Subscribe &amp; save {product.subscriptionDiscountPercent}%
                  <span className="block text-xs text-coffee">Skip, swap, or cancel anytime</span>
                </span>
              </span>
              <span className="text-sm tabular">
                {formatPrice(Math.round(size.priceCents * (1 - product.subscriptionDiscountPercent / 100)))}
              </span>
            </label>
            {subscribed && (
              <div className="px-4 pb-4 pl-11">
                <label className="flex items-center gap-3 text-sm">
                  <span className="text-coffee">Deliver</span>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="border-b border-espresso/30 bg-transparent py-1 outline-none focus:border-espresso"
                  >
                    {frequencies.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </div>
        </fieldset>
      )}

      <div ref={addButtonRef} className="flex items-stretch gap-3">
        <div className="flex items-center border border-espresso/25">
          <button type="button" className="px-3 h-full hover:bg-cream" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span className="w-9 text-center text-sm tabular" aria-live="polite" aria-label={`Quantity ${quantity}`}>
            {quantity}
          </span>
          <button type="button" className="px-3 h-full hover:bg-cream" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </div>
        <Button variant="primary" className="flex-1 py-4 px-4 whitespace-nowrap" onClick={handleAdd}>
          {subscribed ? "Subscribe" : "Add to Bag"}
          <span className="hidden sm:inline tabular">· {formatPrice(unitPrice * quantity)}</span>
        </Button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-coffee pt-2">
        <li className="flex items-center gap-2.5">
          <Truck size={15} strokeWidth={1.5} className="text-copper shrink-0" aria-hidden />
          Free shipping over $45 · ships in 2 days
        </li>
        <li className="flex items-center gap-2.5">
          <RefreshCw size={15} strokeWidth={1.5} className="text-copper shrink-0" aria-hidden />
          Roasted to order, never from stock
        </li>
      </ul>

      {/* Sticky add-to-bag once the main button scrolls away. */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 bg-ivory/95 backdrop-blur-sm border-t border-espresso/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showSticky ? "translate-y-0" : "translate-y-full"
        )}
        inert={!showSticky}
      >
        <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-16 py-3 flex items-center gap-4">
          <div className="relative h-12 w-10 shrink-0 bg-cream hidden sm:block">
            <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-xl leading-tight truncate">{product.name}</p>
            <p className="text-xs text-coffee truncate">
              {size.label} · {grind}
              {subscribed && ` · ${frequency.toLowerCase()}`}
            </p>
          </div>
          <Button variant="primary" onClick={handleAdd} className="shrink-0 px-6">
            Add · <span className="tabular">{formatPrice(unitPrice * quantity)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
