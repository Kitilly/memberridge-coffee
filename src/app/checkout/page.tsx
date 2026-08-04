"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";

const inputClass =
  "w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso placeholder:text-espresso/40";

export default function CheckoutPage() {
  const { lines, subtotalCents, clear } = useCart();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [placed, setPlaced] = useState(false);

  const shippingCost =
    subtotalCents >= 4500 ? 0 : shippingMethod === "express" ? 1500 : 500;
  const total = subtotalCents + shippingCost;

  if (placed) {
    return (
      <Container className="py-32 text-center max-w-lg">
        <div className="h-14 w-14 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto mb-6">
          <Check size={24} strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl mb-4">Order Confirmed</h1>
        <p className="text-coffee mb-8">
          Thank you — a confirmation has been sent to your email. Your coffee
          will be roasted to order and shipped within two business days.
        </p>
        <LinkButton href="/coffee" variant="primary">
          Continue Shopping
        </LinkButton>
      </Container>
    );
  }

  if (lines.length === 0) {
    return (
      <Container className="py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Nothing to check out</h1>
        <p className="text-coffee mb-8">Your bag is currently empty.</p>
        <LinkButton href="/coffee" variant="primary">
          Shop the Collection
        </LinkButton>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="flex items-center gap-2 mb-12">
        <Lock size={14} className="text-olive" />
        <p className="text-xs text-coffee">Secure checkout</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlaced(true);
          clear();
        }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16"
      >
        <div className="space-y-12">
          <section>
            <h2 className="eyebrow mb-5">Contact</h2>
            <input
              type="email"
              required
              placeholder="Email address"
              className={inputClass}
            />
            <label className="flex items-center gap-2 mt-3 text-sm text-coffee">
              <input type="checkbox" className="accent-espresso" defaultChecked />
              Email me with news and offers
            </label>
          </section>

          <section>
            <h2 className="eyebrow mb-5">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="First name" className={inputClass} />
              <input required placeholder="Last name" className={inputClass} />
              <input
                required
                placeholder="Address"
                className={cn(inputClass, "sm:col-span-2")}
              />
              <input placeholder="Apartment, suite, etc. (optional)" className={cn(inputClass, "sm:col-span-2")} />
              <input required placeholder="City" className={inputClass} />
              <input required placeholder="State" className={inputClass} />
              <input required placeholder="ZIP code" className={inputClass} />
              <input required placeholder="Phone" className={inputClass} />
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-5">Shipping Method</h2>
            <div className="space-y-3">
              <label
                className={cn(
                  "flex items-center justify-between border p-4 cursor-pointer",
                  shippingMethod === "standard" ? "border-espresso" : "border-espresso/20"
                )}
              >
                <span className="flex items-center gap-3 text-sm">
                  <input
                    type="radio"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="accent-espresso"
                  />
                  Standard (3–5 business days)
                </span>
                <span className="text-sm">
                  {subtotalCents >= 4500 ? "Free" : formatPrice(500)}
                </span>
              </label>
              <label
                className={cn(
                  "flex items-center justify-between border p-4 cursor-pointer",
                  shippingMethod === "express" ? "border-espresso" : "border-espresso/20"
                )}
              >
                <span className="flex items-center gap-3 text-sm">
                  <input
                    type="radio"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="accent-espresso"
                  />
                  Express (1–2 business days)
                </span>
                <span className="text-sm">{formatPrice(1500)}</span>
              </label>
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-5">Payment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                placeholder="Card number"
                className={cn(inputClass, "sm:col-span-2")}
              />
              <input required placeholder="MM / YY" className={inputClass} />
              <input required placeholder="CVC" className={inputClass} />
              <input
                required
                placeholder="Name on card"
                className={cn(inputClass, "sm:col-span-2")}
              />
            </div>
            <p className="text-xs text-coffee mt-3">
              Payment is not actually processed in this preview.
            </p>
          </section>

          <Button type="submit" variant="primary" className="w-full">
            Place Order — {formatPrice(total)}
          </Button>
        </div>

        <div className="border border-espresso/10 p-8 h-fit">
          <p className="eyebrow mb-6">Order Summary</p>
          <ul className="space-y-5 mb-6">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4">
                <div className="relative h-16 w-14 shrink-0 bg-cream">
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-espresso text-ivory text-[10px] leading-5 text-center">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{line.name}</p>
                  <p className="text-xs text-coffee">
                    {line.size} · {line.grind}
                  </p>
                </div>
                <span className="text-sm">
                  {formatPrice(line.priceCents * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="space-y-3 text-sm border-t border-espresso/10 pt-6">
            <div className="flex justify-between">
              <span className="text-coffee">Subtotal</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-coffee">Shipping</span>
              <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-3 border-t border-espresso/10">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
