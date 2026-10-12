"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD_CENTS, useCart } from "@/lib/cart-context";
import { useModal } from "@/lib/use-modal";
import { cn, formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeLine, subtotalCents, discountCents, announcement } =
    useCart();
  const ref = useModal<HTMLDivElement>(isOpen, closeCart);

  const net = subtotalCents - discountCents;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - net);
  const progress = Math.min(100, (net / FREE_SHIPPING_THRESHOLD_CENTS) * 100);

  return (
    <>
      {/* Announces additions even when the drawer itself isn't focused. */}
      <p className="sr-only" aria-live="polite" role="status">
        {announcement}
      </p>

      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        inert={!isOpen}
      >
        <div className="absolute inset-0 bg-espresso/40" onClick={closeCart} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Your bag"
          className={cn(
            "absolute inset-y-0 right-0 w-full max-w-md bg-ivory flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-8 h-20 border-b border-espresso/10">
            <h2 className="font-display text-2xl">
              Your Bag
              {lines.length > 0 && (
                <span className="text-base text-coffee font-sans tabular"> ({lines.length})</span>
              )}
            </h2>
            <button onClick={closeCart} aria-label="Close bag" className="p-2 -mr-2">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {lines.length > 0 && (
            <div className="px-8 pt-5">
              <p className="text-xs text-coffee mb-2">
                {remaining > 0 ? (
                  <>
                    You&rsquo;re <span className="font-medium text-espresso tabular">{formatPrice(remaining)}</span> away from free shipping.
                  </>
                ) : (
                  <span className="text-olive-ink">Free standard shipping unlocked.</span>
                )}
              </p>
              <div
                className="h-1 bg-espresso/10"
                role="progressbar"
                aria-label="Progress toward free shipping"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div className="h-full bg-copper transition-[width] duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-8 py-6">
            {lines.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-5">
                <p className="font-display text-2xl">Your bag is empty</p>
                <p className="text-sm text-coffee max-w-xs">
                  Start with a best seller, or let us choose — our subscriptions ship freshly roasted on your schedule.
                </p>
                <LinkButton href="/coffee" variant="outline" onClick={closeCart}>
                  Shop Coffee
                </LinkButton>
              </div>
            ) : (
              <ul className="space-y-6">
                {lines.map((line) => (
                  <li key={line.key} className="flex gap-4">
                    <div className="relative h-24 w-20 shrink-0 bg-cream overflow-hidden">
                      <Image src={line.image} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        {line.productSlug ? (
                          <Link
                            href={`/coffee/${line.productSlug}`}
                            onClick={closeCart}
                            className="font-display text-lg leading-snug link-underline"
                          >
                            {line.name}
                          </Link>
                        ) : (
                          <p className="font-display text-lg leading-snug">{line.name}</p>
                        )}
                        <button
                          onClick={() => removeLine(line.key)}
                          aria-label={`Remove ${line.name}`}
                          className="text-espresso/40 hover:text-espresso shrink-0 p-1 -m-1"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <p className="text-xs text-coffee mt-1">
                        {[line.size, line.grind, line.subscribed && "Subscription"].filter(Boolean).join(" · ")}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-espresso/20">
                          <button
                            className="p-1.5 hover:bg-cream"
                            onClick={() => updateQuantity(line.key, line.quantity - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center text-sm tabular" aria-label="Quantity">
                            {line.quantity}
                          </span>
                          <button
                            className="p-1.5 hover:bg-cream"
                            onClick={() => updateQuantity(line.key, line.quantity + 1)}
                            aria-label={`Increase quantity of ${line.name}`}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-sm font-medium tabular">
                          {formatPrice(line.priceCents * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {lines.length > 0 && (
            <div className="border-t border-espresso/10 px-8 py-6 space-y-4">
              {discountCents > 0 && (
                <div className="flex items-center justify-between text-sm text-olive-ink">
                  <span>Discount</span>
                  <span className="tabular">−{formatPrice(discountCents)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-coffee">Subtotal</span>
                <span className="font-medium tabular">{formatPrice(net)}</span>
              </div>
              <p className="text-xs text-coffee">Shipping and taxes calculated at checkout.</p>
              <LinkButton href="/checkout" variant="primary" className="w-full" onClick={closeCart}>
                Checkout
              </LinkButton>
              <LinkButton href="/cart" variant="outline" className="w-full" onClick={closeCart}>
                View Bag
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
