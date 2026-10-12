"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data/products";

const frequencies = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 Weeks" },
  { value: "monthly", label: "Monthly" },
];

const subscribableProducts = products.filter(
  (p) => p.subscriptionDiscountPercent > 0
);

export function PlanBuilder() {
  const [productSlug, setProductSlug] = useState(subscribableProducts[0].slug);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [frequency, setFrequency] = useState("biweekly");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const product = subscribableProducts.find((p) => p.slug === productSlug)!;
  const size = product.sizes[sizeIndex];
  const discountedPrice = Math.round(
    size.priceCents * (1 - product.subscriptionDiscountPercent / 100)
  );

  const handleAdd = () => {
    addItem({ product, sizeIndex, grind: "Whole Bean", subscribed: true });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="border border-espresso/15 p-8 sm:p-12 bg-ivory">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <label htmlFor="plan-coffee" className="eyebrow text-espresso mb-3 block">1. Choose Your Coffee</label>
            <select
              id="plan-coffee"
              value={productSlug}
              onChange={(e) => {
                setProductSlug(e.target.value);
                setSizeIndex(0);
              }}
              className="w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso"
            >
              {subscribableProducts.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="eyebrow text-espresso mb-3">2. Choose Your Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSizeIndex(i)}
                  aria-pressed={i === sizeIndex}
                  className={cn(
                    "px-5 py-2.5 text-sm border transition-colors",
                    i === sizeIndex
                      ? "border-espresso bg-espresso text-ivory"
                      : "border-espresso/25 text-espresso hover:border-espresso"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-espresso mb-3">3. Choose Your Frequency</p>
            <div className="flex flex-wrap gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFrequency(f.value)}
                  aria-pressed={frequency === f.value}
                  className={cn(
                    "px-5 py-2.5 text-sm border transition-colors",
                    frequency === f.value
                      ? "border-espresso bg-espresso text-ivory"
                      : "border-espresso/25 text-espresso hover:border-espresso"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-cream p-8 flex flex-col justify-between">
          <div>
            <p className="eyebrow text-copper-ink mb-4">Your Plan</p>
            <p className="font-display text-4xl mb-1">{product.name}</p>
            <p className="text-sm text-coffee mb-6">
              {size.label} · Delivered {frequencies.find((f) => f.value === frequency)?.label.toLowerCase()}
            </p>

            <div className="space-y-3 text-sm border-t border-espresso/10 pt-6">
              <div className="flex justify-between">
                <span className="text-coffee">One-time price</span>
                <span className="line-through text-espresso/40">
                  {formatPrice(size.priceCents)}
                </span>
              </div>
              <div className="flex justify-between font-medium text-base">
                <span>Subscription price</span>
                <span>{formatPrice(discountedPrice)}</span>
              </div>
              <p className="text-olive-ink text-xs">
                You save {product.subscriptionDiscountPercent}% every delivery
              </p>
            </div>
          </div>

          <Button variant="primary" className="w-full mt-8" onClick={handleAdd}>
            {added ? "Added to Bag" : "Start Subscription"}
          </Button>
        </div>
      </div>
    </div>
  );
}
