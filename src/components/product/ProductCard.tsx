"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

type CompareProps = { active: boolean; disabled: boolean; onToggle: () => void };

export function ProductCard({
  product,
  compare,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  product: Product;
  compare?: CompareProps;
  sizes?: string;
}) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.slug);
  const href = `/coffee/${product.slug}`;
  const quickAdd = () => addItem({ product, sizeIndex: 0, grind: "Whole Bean" });

  const image = (
    <Image
      src={product.images[0]}
      alt={`${product.name}, ${product.origin.country}`}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
    />
  );

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link href={href} className="relative block h-full w-full" tabIndex={-1} aria-hidden>
          {image}
        </Link>

        {product.badges && product.badges.length > 0 && (
          <span className="absolute top-4 left-4 eyebrow !text-[0.65rem] bg-ivory/95 text-espresso px-2.5 py-1.5">
            {product.badges[0]}
          </span>
        )}

        <button
          onClick={() => toggle(product.slug)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={wished}
          className={cn(
            "absolute top-3 right-3 h-9 w-9 flex items-center justify-center bg-ivory/95 transition-colors",
            wished ? "text-copper-ink" : "text-espresso hover:text-copper-ink"
          )}
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? "currentColor" : "none"} />
        </button>

        {/* Pointer devices: reveal on hover or keyboard focus. */}
        <div className="absolute inset-x-0 bottom-0 hidden [@media(hover:hover)]:flex translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            onClick={quickAdd}
            className="flex-1 bg-espresso text-ivory text-[0.72rem] uppercase tracking-[0.14em] py-3.5 hover:bg-roast transition-colors"
          >
            Quick Add · <span className="tabular">{formatPrice(product.sizes[0].priceCents)}</span>
          </button>
          <Link
            href={href}
            className="flex-1 bg-ivory text-espresso text-[0.72rem] uppercase tracking-[0.14em] py-3.5 text-center hover:bg-cream transition-colors"
          >
            View Details
          </Link>
        </div>

        {/* Touch devices: always-visible quick add. */}
        <button
          onClick={quickAdd}
          aria-label={`Quick add ${product.name}, ${product.sizes[0].label}`}
          className="[@media(hover:hover)]:hidden absolute bottom-3 right-3 h-10 w-10 flex items-center justify-center bg-espresso text-ivory"
        >
          <Plus size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-display text-[1.45rem] leading-tight">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-coffee mt-1">
          {product.origin.country} · {product.roastLevel}
        </p>
        <p className="text-xs text-espresso/55 mt-1 truncate">{product.flavorNotes.join(", ")}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <Star size={13} fill="currentColor" strokeWidth={0} className="text-copper" aria-hidden />
            <span className="text-xs text-coffee tabular">
              {product.rating.toFixed(1)}
              <span className="sr-only"> out of 5,</span> ({product.reviewCount}
              <span className="sr-only"> reviews</span>)
            </span>
          </div>
          <span className="text-sm font-medium tabular">from {formatPrice(product.sizes[0].priceCents)}</span>
        </div>
        {compare && (
          <label
            className={cn(
              "mt-3 inline-flex items-center gap-2 text-xs text-coffee cursor-pointer select-none",
              compare.disabled && !compare.active && "opacity-40 cursor-not-allowed"
            )}
          >
            <input
              type="checkbox"
              checked={compare.active}
              disabled={compare.disabled && !compare.active}
              onChange={compare.onToggle}
              className="h-3.5 w-3.5 accent-espresso"
            />
            Compare
          </label>
        )}
      </div>
    </article>
  );
}
