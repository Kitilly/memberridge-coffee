"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";

// Most-reviewed first — the coffees people actually reorder.
const sellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);

export function BestSellers() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="py-28 bg-cream">
      <Container>
        <div className="flex items-end justify-between mb-14">
          <SectionHeading eyebrow="Fan Favorites" title="Best Sellers" />
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="h-11 w-11 flex items-center justify-center border border-espresso/20 hover:border-espresso transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="h-11 w-11 flex items-center justify-center border border-espresso/20 hover:border-espresso transition-colors"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar reveal"
        >
          {sellers.map((product) => (
            <div key={product.id} className="w-[78%] sm:w-[42%] lg:w-[27%] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
