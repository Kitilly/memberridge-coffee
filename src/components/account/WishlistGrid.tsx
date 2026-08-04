"use client";

import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/lib/data/products";

export function WishlistGrid() {
  const { slugs } = useWishlist();
  const items = products.filter((p) => slugs.includes(p.slug));

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-coffee mb-8">
          You haven&rsquo;t saved any coffees yet. Tap the heart icon on any
          product to add it here.
        </p>
        <LinkButton href="/coffee" variant="primary">
          Shop the Collection
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
