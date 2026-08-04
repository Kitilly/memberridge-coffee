"use client";

import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeLine, subtotalCents } =
    useCart();

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-espresso/40"
        onClick={closeCart}
      />
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-ivory flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-espresso/10">
          <h2 className="font-display text-xl">
            Your Bag{lines.length > 0 ? ` (${lines.length})` : ""}
          </h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <p className="text-coffee">Your bag is empty.</p>
              <LinkButton href="/coffee" variant="outline" onClick={closeCart}>
                Shop Coffee
              </LinkButton>
            </div>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 bg-cream">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug">{line.name}</p>
                      <button
                        onClick={() => removeLine(line.key)}
                        aria-label="Remove item"
                        className="text-espresso/40 hover:text-espresso shrink-0"
                      >
                        <X size={15} />
                      </button>
                    </div>
                    <p className="text-xs text-coffee mt-1">
                      {line.size} · {line.grind}
                      {line.subscribed ? " · Subscription" : ""}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-espresso/20">
                        <button
                          className="p-1.5 hover:bg-cream"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-7 text-center text-sm">{line.quantity}</span>
                        <button
                          className="p-1.5 hover:bg-cream"
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
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-espresso/10 px-8 py-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-coffee">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotalCents)}</span>
            </div>
            <p className="text-xs text-coffee">
              Shipping and taxes calculated at checkout.
            </p>
            <LinkButton
              href="/checkout"
              variant="primary"
              className="w-full"
              onClick={closeCart}
            >
              Checkout
            </LinkButton>
            <LinkButton
              href="/cart"
              variant="outline"
              className="w-full"
              onClick={closeCart}
            >
              View Bag
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}
