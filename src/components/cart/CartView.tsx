"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, Minus, Plus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { PromoCodeForm } from "@/components/cart/PromoCodeForm";
import { OrderTotals } from "@/components/cart/OrderTotals";
import { FREE_SHIPPING_THRESHOLD_CENTS, useCart } from "@/lib/cart-context";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const { lines, updateQuantity, removeLine, subtotalCents, discountCents } = useCart();

  const inCart = new Set(lines.map((l) => l.productSlug));
  const recommendations = [...products]
    .filter((p) => !inCart.has(p.slug))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  if (lines.length === 0) {
    return (
      <Container className="py-24">
        <div className="text-center max-w-md mx-auto">
          <h1 className="font-display text-5xl mb-4">Your bag is empty</h1>
          <p className="text-coffee mb-8">Start with one of the coffees our customers reorder most.</p>
          <LinkButton href="/coffee" variant="primary">
            Shop the Collection
          </LinkButton>
        </div>
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {recommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - (subtotalCents - discountCents));

  return (
    <Container className="py-16">
      <h1 className="font-display text-5xl sm:text-6xl mb-12">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
        <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
          {lines.map((line) => (
            <li key={line.key} className="flex gap-6 py-8">
              <div className="relative h-36 w-28 shrink-0 bg-cream overflow-hidden">
                <Image src={line.image} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  {line.productSlug ? (
                    <Link href={`/coffee/${line.productSlug}`} className="font-display text-2xl link-underline">
                      {line.name}
                    </Link>
                  ) : (
                    <p className="font-display text-2xl">{line.name}</p>
                  )}
                  <p className="text-sm text-coffee mt-1">
                    {[line.size, line.grind].filter(Boolean).join(" · ")}
                  </p>
                  {line.subscribed && <p className="text-xs text-olive-ink mt-1">Subscription · ships on your schedule</p>}
                  <button
                    onClick={() => removeLine(line.key)}
                    className="flex items-center gap-1 text-xs text-espresso/55 hover:text-espresso mt-4"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                  <div className="flex items-center border border-espresso/20">
                    <button
                      className="p-2.5 hover:bg-cream"
                      onClick={() => updateQuantity(line.key, line.quantity - 1)}
                      aria-label={`Decrease quantity of ${line.name}`}
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm tabular">{line.quantity}</span>
                    <button
                      className="p-2.5 hover:bg-cream"
                      onClick={() => updateQuantity(line.key, line.quantity + 1)}
                      aria-label={`Increase quantity of ${line.name}`}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-medium tabular">{formatPrice(line.priceCents * line.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-28 h-fit bg-cream/60 border border-espresso/10 p-8 space-y-6">
          <p className="eyebrow">Order Summary</p>
          <p className="text-sm text-coffee">
            {remaining > 0 ? (
              <>
                Add <span className="text-espresso font-medium tabular">{formatPrice(remaining)}</span> more for free shipping.
              </>
            ) : (
              <span className="text-olive-ink">Free standard shipping unlocked.</span>
            )}
          </p>
          <PromoCodeForm />
          <OrderTotals label="Estimated total" />
          <LinkButton href="/checkout" variant="primary" className="w-full">
            <Lock size={14} aria-hidden /> Secure Checkout
          </LinkButton>
          <Link href="/coffee" className="block text-center text-sm text-coffee link-underline w-fit mx-auto">
            Continue shopping
          </Link>
        </aside>
      </div>

      {recommendations.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-4xl mb-10">Pairs well with your bag</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
