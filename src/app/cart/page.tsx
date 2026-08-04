"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lines, updateQuantity, removeLine, subtotalCents } = useCart();

  if (lines.length === 0) {
    return (
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Your bag is empty</h1>
        <p className="text-coffee mb-8">
          Looks like you haven&rsquo;t added any coffee yet.
        </p>
        <LinkButton href="/coffee" variant="primary">
          Shop the Collection
        </LinkButton>
      </Container>
    );
  }

  const freeShippingThreshold = 4500;
  const remaining = Math.max(0, freeShippingThreshold - subtotalCents);

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl sm:text-5xl font-light mb-12">
        Your Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
        <div className="divide-y divide-espresso/10">
          {lines.map((line) => (
            <div key={line.key} className="flex gap-6 py-8">
              <div className="relative h-32 w-28 shrink-0 bg-cream">
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg">{line.name}</p>
                  <p className="text-sm text-coffee mt-1">
                    {line.size} · {line.grind}
                  </p>
                  {line.subscribed && (
                    <p className="text-xs text-olive mt-1">Subscription</p>
                  )}
                  <button
                    onClick={() => removeLine(line.key)}
                    className="flex items-center gap-1 text-xs text-espresso/50 hover:text-espresso mt-3"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                  <div className="flex items-center border border-espresso/20">
                    <button
                      className="p-2 hover:bg-cream"
                      onClick={() => updateQuantity(line.key, line.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button
                      className="p-2 hover:bg-cream"
                      onClick={() => updateQuantity(line.key, line.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(line.priceCents * line.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-espresso/10 p-8 h-fit">
          <p className="eyebrow mb-6">Order Summary</p>
          {remaining > 0 ? (
            <p className="text-sm text-coffee mb-6">
              Add {formatPrice(remaining)} more for free shipping.
            </p>
          ) : (
            <p className="text-sm text-olive mb-6">
              You&rsquo;ve unlocked free shipping.
            </p>
          )}
          <div className="space-y-3 text-sm border-b border-espresso/10 pb-6 mb-6">
            <div className="flex justify-between">
              <span className="text-coffee">Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-coffee">Shipping</span>
              <span>{remaining > 0 ? formatPrice(500) : "Free"}</span>
            </div>
          </div>
          <div className="flex justify-between font-medium mb-8">
            <span>Estimated Total</span>
            <span>{formatPrice(subtotalCents + (remaining > 0 ? 500 : 0))}</span>
          </div>
          <LinkButton href="/checkout" variant="primary" className="w-full">
            Proceed to Checkout
          </LinkButton>
          <Link
            href="/coffee"
            className="block text-center text-sm text-coffee mt-4 link-underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}
