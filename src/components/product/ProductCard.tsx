"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.slug);

  return (
    <div className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link href={`/coffee/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badges && product.badges.length > 0 && (
          <span className="absolute top-4 left-4 eyebrow bg-ivory/90 text-espresso px-3 py-1.5">
            {product.badges[0]}
          </span>
        )}

        <button
          onClick={() => toggle(product.slug)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center bg-ivory/90 text-espresso hover:text-copper transition-colors"
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? "currentColor" : "none"} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex">
          <button
            onClick={() =>
              addItem({ product, sizeIndex: 0, grind: "Whole Bean" })
            }
            className="flex-1 bg-espresso text-ivory text-[0.75rem] uppercase tracking-[0.14em] py-3 hover:bg-roast transition-colors"
          >
            Quick Add
          </button>
          <Link
            href={`/coffee/${product.slug}`}
            className="flex-1 bg-cream text-espresso text-[0.75rem] uppercase tracking-[0.14em] py-3 text-center hover:bg-sage/40 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/coffee/${product.slug}`}>
            <h3 className="font-display text-lg leading-snug text-espresso link-underline">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-coffee mt-1">
          {product.origin.country} · {product.roastLevel} Roast
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-copper">
            <Star size={13} fill="currentColor" strokeWidth={0} />
            <span className="text-xs text-coffee">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
          <span className={cn("text-sm font-medium")}>
            {formatPrice(product.sizes[0].priceCents)}
          </span>
        </div>
      </div>
    </div>
  );
}
