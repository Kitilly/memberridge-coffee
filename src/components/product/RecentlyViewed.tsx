"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data/products";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { formatPrice } from "@/lib/utils";

export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const slugs = useRecentlyViewed(currentSlug);
  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section className="mt-24 pt-20 border-t border-espresso/10" aria-labelledby="recently-viewed">
      <h2 id="recently-viewed" className="eyebrow text-copper-ink mb-8">
        Recently Viewed
      </h2>
      <ul className="flex gap-6 overflow-x-auto no-scrollbar snap-x pb-2">
        {items.map((p) => (
          <li key={p.slug} className="snap-start shrink-0 w-40">
            <Link href={`/coffee/${p.slug}`} className="group block">
              <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                <Image src={p.images[0]} alt="" fill sizes="160px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="font-display text-lg leading-tight mt-3">{p.name}</p>
              <p className="text-xs text-coffee tabular">from {formatPrice(p.sizes[0].priceCents)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
