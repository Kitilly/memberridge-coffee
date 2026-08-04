"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function PurchasePanel({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [grind, setGrind] = useState(product.grindOptions[0]);
  const [subscribed, setSubscribed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const size = product.sizes[sizeIndex];
  const discount = subscribed ? product.subscriptionDiscountPercent : 0;
  const unitPrice = Math.round(size.priceCents * (1 - discount / 100));

  const handleAdd = () => {
    addItem({ product, sizeIndex, grind, quantity, subscribed });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-2xl font-medium">
          {formatPrice(unitPrice)}
          {size.grams && (
            <span className="text-sm text-coffee font-normal">
              {" "}
              · {(unitPrice / (size.grams / 100)).toFixed(0)}¢/10g
            </span>
          )}
        </p>
        {discount > 0 && (
          <p className="text-sm text-olive mt-1">
            Save {discount}% with a subscription
          </p>
        )}
      </div>

      <div>
        <p className="eyebrow text-espresso mb-3">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSizeIndex(i)}
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
        <p className="eyebrow text-espresso mb-3">Grind</p>
        <select
          value={grind}
          onChange={(e) => setGrind(e.target.value)}
          className="w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso"
        >
          {product.grindOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {product.subscriptionDiscountPercent > 0 && (
        <div className="border border-espresso/15 divide-y divide-espresso/15">
          <label className="flex items-center justify-between p-4 cursor-pointer">
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="purchase-type"
                checked={!subscribed}
                onChange={() => setSubscribed(false)}
                className="accent-espresso"
              />
              <span className="text-sm">One-time purchase</span>
            </span>
            <span className="text-sm">{formatPrice(size.priceCents)}</span>
          </label>
          <label className="flex items-center justify-between p-4 cursor-pointer bg-cream/50">
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="purchase-type"
                checked={subscribed}
                onChange={() => setSubscribed(true)}
                className="accent-espresso"
              />
              <span className="text-sm">
                Subscribe &amp; save {product.subscriptionDiscountPercent}%
              </span>
            </span>
            <span className="text-sm">
              {formatPrice(
                Math.round(
                  size.priceCents * (1 - product.subscriptionDiscountPercent / 100)
                )
              )}
            </span>
          </label>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-espresso/25">
          <button
            className="p-3 hover:bg-cream"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            className="p-3 hover:bg-cream"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
        <Button variant="primary" className="flex-1" onClick={handleAdd}>
          {added ? "Added to Bag" : "Add to Bag"}
        </Button>
      </div>

      <div className="text-xs text-coffee space-y-1 pt-2 border-t border-espresso/10">
        <p>Free shipping on orders over $45.</p>
        <p>Roasted to order — ships within 2 business days.</p>
      </div>
    </div>
  );
}
