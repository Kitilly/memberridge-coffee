"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, LinkButton } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { PromoCodeForm } from "@/components/cart/PromoCodeForm";
import { OrderTotals } from "@/components/cart/OrderTotals";
import { type CartLine, type ShippingMethod, useCart } from "@/lib/cart-context";
import { cn, formatPrice } from "@/lib/utils";

const methods: { value: ShippingMethod; label: string; detail: string }[] = [
  { value: "standard", label: "Standard", detail: "3–5 business days after roasting" },
  { value: "express", label: "Express", detail: "1–2 business days after roasting" },
];

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`}>
      <h2 id={`step-${n}`} className="flex items-baseline gap-3 mb-6">
        <span className="font-display text-2xl text-copper-ink tabular">{String(n).padStart(2, "0")}</span>
        <span className="font-display text-3xl">{title}</span>
      </h2>
      {children}
    </section>
  );
}

type Confirmation = { number: string; email: string; lines: CartLine[]; shipsBy: string };

export function CheckoutView() {
  const { lines, clear, shippingCents, subtotalCents, discountCents } = useCart();
  const [method, setMethod] = useState<ShippingMethod>("standard");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  if (confirmation) {
    return (
      <Container className="py-24 max-w-2xl">
        <div className="text-center">
          <div className="h-14 w-14 rounded-full bg-olive/15 text-olive-ink flex items-center justify-center mx-auto mb-6">
            <Check size={24} strokeWidth={1.5} />
          </div>
          <p className="eyebrow text-copper-ink mb-3">Order {confirmation.number}</p>
          <h1 className="font-display text-5xl mb-4">Thank you — it&rsquo;s on the roaster.</h1>
          <p className="text-coffee">
            A confirmation is on its way to <span className="text-espresso">{confirmation.email}</span>. Your
            coffee will be roasted to order and ship by {confirmation.shipsBy}.
          </p>
        </div>
        <ul className="mt-12 divide-y divide-espresso/10 border-y border-espresso/10">
          {confirmation.lines.map((l) => (
            <li key={l.key} className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-14 shrink-0 bg-cream overflow-hidden">
                <Image src={l.image} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg">{l.name}</p>
                <p className="text-xs text-coffee">
                  {[l.size, l.grind].filter(Boolean).join(" · ")} · Qty {l.quantity}
                </p>
              </div>
              <span className="text-sm tabular">{formatPrice(l.priceCents * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <LinkButton href="/education" variant="outline">
            Read the Brewing Guides
          </LinkButton>
          <LinkButton href="/coffee" variant="primary">
            Continue Shopping
          </LinkButton>
        </div>
      </Container>
    );
  }

  if (lines.length === 0) {
    return (
      <Container className="py-32 text-center">
        <h1 className="font-display text-5xl mb-4">Nothing to check out</h1>
        <p className="text-coffee mb-8">Your bag is currently empty.</p>
        <LinkButton href="/coffee" variant="primary">
          Shop the Collection
        </LinkButton>
      </Container>
    );
  }

  const total = subtotalCents - discountCents + shippingCents(method);

  return (
    <Container className="py-14">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-display text-5xl">Checkout</h1>
        <p className="flex items-center gap-2 text-xs text-coffee">
          <Lock size={13} className="text-olive-ink" aria-hidden /> Secure checkout
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const ships = new Date();
          ships.setDate(ships.getDate() + (ships.getDay() >= 4 ? 4 : 2));
          setConfirmation({
            number: `MR-${Math.floor(10000 + Math.random() * 89999)}`,
            email: String(data.get("email") ?? ""),
            lines,
            shipsBy: ships.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
          });
          clear();
          window.scrollTo({ top: 0 });
        }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16"
      >
        <div className="space-y-14">
          <Step n={1} title="Contact">
            <Field label="Email" name="email" type="email" autoComplete="email" />
            <label className="flex items-center gap-2.5 mt-4 text-sm text-coffee">
              <input type="checkbox" name="news" className="h-4 w-4 accent-espresso" defaultChecked />
              Email me roasting notes and new arrivals
            </label>
            <p className="text-sm text-coffee mt-4">
              Have an account?{" "}
              <Link href="/account" className="text-espresso link-underline">
                Sign in
              </Link>{" "}
              — or continue as a guest.
            </p>
          </Step>

          <Step n={2} title="Delivery">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="First name" name="given" autoComplete="given-name" />
              <Field label="Last name" name="family" autoComplete="family-name" />
              <Field label="Address" name="address1" autoComplete="address-line1" className="sm:col-span-2" />
              <Field label="Apartment, suite, etc." name="address2" autoComplete="address-line2" optional className="sm:col-span-2" />
              <Field label="City" name="city" autoComplete="address-level2" />
              <div className="grid grid-cols-2 gap-5">
                <Field label="State" name="state" autoComplete="address-level1" />
                <Field label="ZIP code" name="zip" autoComplete="postal-code" inputMode="numeric" />
              </div>
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" optional hint="Only used for delivery issues." className="sm:col-span-2" />
            </div>
          </Step>

          <Step n={3} title="Shipping">
            <fieldset className="space-y-3">
              <legend className="sr-only">Shipping method</legend>
              {methods.map((m) => {
                const cost = shippingCents(m.value);
                return (
                  <label
                    key={m.value}
                    className={cn(
                      "flex items-center justify-between gap-4 border p-5 cursor-pointer transition-colors",
                      method === m.value ? "border-espresso bg-cream/50" : "border-espresso/20 hover:border-espresso/50"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={m.value}
                        checked={method === m.value}
                        onChange={() => setMethod(m.value)}
                        className="accent-espresso"
                      />
                      <span>
                        <span className="block text-sm font-medium">{m.label}</span>
                        <span className="block text-xs text-coffee">{m.detail}</span>
                      </span>
                    </span>
                    <span className="text-sm tabular">{cost === 0 ? "Free" : formatPrice(cost)}</span>
                  </label>
                );
              })}
            </fieldset>
          </Step>

          <Step n={4} title="Payment">
            <div className="grid grid-cols-2 gap-5">
              <Field label="Card number" name="cc" autoComplete="cc-number" inputMode="numeric" placeholder="1234 1234 1234 1234" className="col-span-2" />
              <Field label="Expiry" name="exp" autoComplete="cc-exp" placeholder="MM / YY" />
              <Field label="Security code" name="cvc" autoComplete="cc-csc" inputMode="numeric" placeholder="CVC" />
              <Field label="Name on card" name="ccname" autoComplete="cc-name" className="col-span-2" />
            </div>
            <p className="text-xs text-coffee mt-4 bg-cream px-4 py-3">
              Preview store — no payment is processed and no card details leave your browser.
            </p>
          </Step>

          <Button type="submit" variant="primary" className="w-full py-4">
            <Lock size={14} aria-hidden /> Place Order · <span className="tabular">{formatPrice(total)}</span>
          </Button>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit bg-cream/60 border border-espresso/10 p-8 space-y-6">
          <p className="eyebrow">Order Summary</p>
          <ul className="space-y-5">
            {lines.map((line) => (
              <li key={line.key} className="flex gap-4">
                <div className="relative h-16 w-14 shrink-0 bg-cream">
                  <Image src={line.image} alt="" fill sizes="56px" className="object-cover" />
                  <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-espresso text-ivory text-[10px] leading-5 text-center tabular">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg leading-snug">{line.name}</p>
                  <p className="text-xs text-coffee">
                    {[line.size, line.grind, line.subscribed && "Subscription"].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="text-sm tabular">{formatPrice(line.priceCents * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <PromoCodeForm />
          <OrderTotals method={method} />
        </aside>
      </form>
    </Container>
  );
}
