"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { popularSearches, search } from "@/lib/search";
import { products } from "@/lib/data/products";
import { useModal } from "@/lib/use-modal";
import { cn, formatPrice } from "@/lib/utils";

/** Mounted only while open, so every search starts fresh. */
export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const ref = useModal<HTMLDivElement>(true, onClose);

  const results = useMemo(() => search(query), [query]);
  const featured = useMemo(() => products.filter((p) => p.badges?.includes("Best Seller")), []);

  const close = onClose;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(results[active].href);
      close();
    }
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-espresso/50 animate-overlay" onClick={close} />
      <div ref={ref} className="relative bg-ivory shadow-2xl shadow-espresso/20 animate-overlay">
        <Container className="py-6 sm:py-8">
          <div className="flex items-center gap-4 border-b border-espresso/20 pb-4">
            <Search size={20} strokeWidth={1.5} className="text-coffee shrink-0" aria-hidden />
            <input
              data-autofocus
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search coffees, origins, flavors, brewing guides…"
              aria-label="Search the site"
              aria-controls="search-results"
              aria-activedescendant={results[active] ? `sr-${results[active].id}` : undefined}
              className="flex-1 min-w-0 bg-transparent font-display text-2xl sm:text-3xl outline-none placeholder:text-espresso/35"
            />
            <button onClick={close} aria-label="Close search" className="p-2 -mr-2 text-espresso/70 hover:text-espresso">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="py-6 max-h-[70vh] overflow-y-auto overflow-x-hidden">
            {query.trim() === "" ? (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                <div>
                  <p className="eyebrow text-copper-ink mb-4">Popular Searches</p>
                  <ul className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <li key={term}>
                        <button
                          onClick={() => setQuery(term)}
                          className="text-sm border border-espresso/20 px-3.5 py-1.5 hover:border-espresso transition-colors"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow text-copper-ink mb-4">Best Sellers</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {featured.map((p) => (
                      <li key={p.id}>
                        <Link href={`/coffee/${p.slug}`} onClick={close} className="group flex sm:block gap-3">
                          <div className="relative h-16 w-14 sm:h-auto sm:w-auto sm:aspect-[4/3] shrink-0 overflow-hidden bg-cream">
                            <Image src={p.images[0]} alt="" fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          </div>
                          <div className="sm:mt-2">
                            <p className="font-display text-lg leading-tight">{p.name}</p>
                            <p className="text-xs text-coffee tabular">from {formatPrice(p.sizes[0].priceCents)}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-coffee py-6">
                Nothing matches &ldquo;{query}&rdquo;. Try an origin like Kenya, a
                flavor like caramel, or a method like pour over.
              </p>
            ) : (
              <ul id="search-results" role="listbox" aria-label="Search results" className="divide-y divide-espresso/10">
                {results.map((r, i) => (
                  <li key={r.id} id={`sr-${r.id}`} role="option" aria-selected={i === active}>
                    <Link
                      href={r.href}
                      onClick={close}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        "flex items-center gap-4 py-3 px-3 transition-colors",
                        i === active && "bg-cream"
                      )}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-cream">
                        {r.image && <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-lg leading-tight truncate">{r.title}</p>
                        <p className="text-xs text-coffee truncate">{r.subtitle}</p>
                      </div>
                      <span className="eyebrow text-espresso/50 hidden sm:block">{r.type}</span>
                      <ArrowRight size={15} strokeWidth={1.5} className="text-espresso/40 shrink-0" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="hidden sm:block text-xs text-espresso/45">
            <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to move ·{" "}
            <kbd className="font-sans">Enter</kbd> to open · <kbd className="font-sans">Esc</kbd> to close
          </p>
        </Container>
      </div>
    </div>
  );
}
