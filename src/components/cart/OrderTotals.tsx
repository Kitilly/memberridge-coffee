"use client";

import { type ShippingMethod, useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export function OrderTotals({ method = "standard", label = "Total" }: { method?: ShippingMethod; label?: string }) {
  const { subtotalCents, discountCents, promo, shippingCents } = useCart();
  const shipping = shippingCents(method);
  const total = subtotalCents - discountCents + shipping;

  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-coffee">Subtotal</dt>
        <dd className="tabular">{formatPrice(subtotalCents)}</dd>
      </div>
      {discountCents > 0 && (
        <div className="flex justify-between text-olive-ink">
          <dt>Discount{promo ? ` (${promo.code})` : ""}</dt>
          <dd className="tabular">−{formatPrice(discountCents)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-coffee">Shipping</dt>
        <dd className="tabular">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className="flex justify-between items-baseline pt-4 border-t border-espresso/10">
        <dt className="font-medium">{label}</dt>
        <dd className="font-display text-3xl tabular">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}
