"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductProfile } from "@/components/product/ProductProfile";
import { useModal } from "@/lib/use-modal";
import type { Category, Product, RoastLevel } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

const categoryLabels: Record<Category, string> = {
  "single-origin": "Single Origin",
  blend: "Blends",
  espresso: "Espresso",
};

const roastLevels: RoastLevel[] = ["Light", "Light-Medium", "Medium", "Medium-Dark", "Dark"];

const flavorFamilies = {
  "Bright & Fruity": ["lemon", "apple", "blackcurrant", "grapefruit", "cherry", "peach", "fig", "tomato", "orange"],
  Floral: ["jasmine", "blossom", "honeysuckle", "bergamot"],
  "Chocolate & Nutty": ["cocoa", "chocolate", "almond", "hazelnut", "pecan", "marzipan"],
  "Caramel & Sweet": ["honey", "sugar", "caramel", "molasses", "butter"],
} as const;
type Flavor = keyof typeof flavorFamilies;

function hasFlavor(p: Product, family: Flavor) {
  const notes = p.flavorNotes.join(" ").toLowerCase();
  return flavorFamilies[family].some((k) => notes.includes(k));
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "roast", label: "Roast: light to dark" },
];

const MAX_PRICE = 30;
const MAX_COMPARE = 3;

function toggleIn<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function CoffeeCollection({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: Category;
}) {
  const [categories, setCategories] = useState<Category[]>(initialCategory ? [initialCategory] : []);
  const [roasts, setRoasts] = useState<RoastLevel[]>([]);
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const filtersRef = useModal<HTMLDivElement>(filtersOpen, () => setFiltersOpen(false));

  const filtered = useMemo(() => {
    const result = products.filter(
      (p) =>
        (!categories.length || categories.includes(p.category)) &&
        (!roasts.length || roasts.includes(p.roastLevel)) &&
        (!flavors.length || flavors.some((f) => hasFlavor(p, f))) &&
        p.sizes[0].priceCents <= maxPrice * 100
    );
    const by: Record<string, (a: Product, b: Product) => number> = {
      "price-asc": (a, b) => a.sizes[0].priceCents - b.sizes[0].priceCents,
      "price-desc": (a, b) => b.sizes[0].priceCents - a.sizes[0].priceCents,
      rating: (a, b) => b.rating - a.rating,
      roast: (a, b) => roastLevels.indexOf(a.roastLevel) - roastLevels.indexOf(b.roastLevel),
    };
    return by[sort] ? [...result].sort(by[sort]) : result;
  }, [products, categories, roasts, flavors, maxPrice, sort]);

  const chips = [
    ...categories.map((c) => ({ label: categoryLabels[c], clear: () => setCategories((l) => l.filter((x) => x !== c)) })),
    ...roasts.map((r) => ({ label: `${r} roast`, clear: () => setRoasts((l) => l.filter((x) => x !== r)) })),
    ...flavors.map((f) => ({ label: f, clear: () => setFlavors((l) => l.filter((x) => x !== f)) })),
    ...(maxPrice < MAX_PRICE ? [{ label: `Under $${maxPrice}`, clear: () => setMaxPrice(MAX_PRICE) }] : []),
  ];
  const clearAll = () => {
    setCategories([]);
    setRoasts([]);
    setFlavors([]);
    setMaxPrice(MAX_PRICE);
  };

  const compared = compare.map((s) => products.find((p) => p.slug === s)!).filter(Boolean);

  const filterGroup = (
    legend: string,
    options: readonly string[],
    selected: string[],
    onToggle: (v: string) => void,
    label?: (v: string) => string
  ) => (
    <fieldset>
      <legend className="eyebrow text-espresso mb-4">{legend}</legend>
      <ul className="space-y-3">
        {options.map((o) => (
          <li key={o}>
            <label className="flex items-center gap-3 text-sm text-coffee cursor-pointer hover:text-espresso">
              <input
                type="checkbox"
                checked={selected.includes(o)}
                onChange={() => onToggle(o)}
                className="h-4 w-4 accent-espresso"
              />
              {label ? label(o) : o}
              <span className="ml-auto text-xs text-espresso/40 tabular">
                {
                  products.filter((p) =>
                    legend === "Category"
                      ? p.category === o
                      : legend === "Roast"
                        ? p.roastLevel === o
                        : hasFlavor(p, o as Flavor)
                  ).length
                }
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );

  const FilterPanel = (
    <div className="space-y-10">
      {filterGroup("Category", Object.keys(categoryLabels), categories, (v) => setCategories((l) => toggleIn(l, v as Category)), (v) => categoryLabels[v as Category])}
      {filterGroup("Roast", roastLevels, roasts, (v) => setRoasts((l) => toggleIn(l, v as RoastLevel)))}
      {filterGroup("Flavor", Object.keys(flavorFamilies), flavors, (v) => setFlavors((l) => toggleIn(l, v as Flavor)))}
      <div>
        <label htmlFor="max-price" className="eyebrow text-espresso mb-4 flex justify-between">
          <span>Price</span>
          <span className="normal-case tracking-normal text-coffee tabular">up to ${maxPrice}</span>
        </label>
        <input
          id="max-price"
          type="range"
          min={18}
          max={MAX_PRICE}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-espresso"
        />
        <p className="text-xs text-espresso/45 mt-1">Starting price per bag</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-14">
        <aside className="hidden lg:block lg:sticky lg:top-28 h-fit" aria-label="Filters">
          {FilterPanel}
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-espresso/10">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm border border-espresso/25 px-4 py-2"
            >
              <SlidersHorizontal size={15} />
              Filters{chips.length > 0 && ` (${chips.length})`}
            </button>
            <p className="text-sm text-coffee tabular" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "coffee" : "coffees"}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-coffee">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border-b border-espresso/25 bg-transparent py-1.5 pr-1 outline-none focus:border-espresso"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {chips.map((c) => (
                <button
                  key={c.label}
                  onClick={c.clear}
                  className="inline-flex items-center gap-1.5 bg-cream px-3 py-1.5 text-xs hover:bg-espresso hover:text-ivory transition-colors"
                  aria-label={`Remove filter: ${c.label}`}
                >
                  {c.label} <X size={12} />
                </button>
              ))}
              <button onClick={clearAll} className="text-xs text-coffee link-underline ml-2">
                Clear all
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-3xl mb-3">No coffees match those filters</p>
              <p className="text-coffee mb-6">Try widening the price range or removing a flavor.</p>
              <button onClick={clearAll} className="text-sm link-underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw"
                  compare={{
                    active: compare.includes(product.slug),
                    disabled: compare.length >= MAX_COMPARE,
                    onToggle: () => setCompare((l) => toggleIn(l, product.slug)),
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compare tray */}
      {compared.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-espresso text-ivory animate-fade-up" role="region" aria-label="Compare coffees">
          <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-16 py-4 flex items-center gap-4 sm:gap-6">
            <p className="eyebrow text-gold hidden sm:block shrink-0">Compare</p>
            <ul className="flex gap-3 flex-1 min-w-0 overflow-x-auto no-scrollbar">
              {compared.map((p) => (
                <li key={p.slug} className="flex items-center gap-2 bg-ivory/10 pr-2 shrink-0">
                  <div className="relative h-10 w-10 shrink-0">
                    <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                  </div>
                  <span className="text-sm whitespace-nowrap">{p.name}</span>
                  <button
                    onClick={() => setCompare((l) => l.filter((s) => s !== p.slug))}
                    aria-label={`Remove ${p.name} from comparison`}
                    className="p-1 text-cream/60 hover:text-ivory"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
              {Array.from({ length: MAX_COMPARE - compared.length }).map((_, i) => (
                <li key={i} className="hidden md:block h-10 w-40 border border-dashed border-cream/25 shrink-0" aria-hidden />
              ))}
            </ul>
            <button
              onClick={() => setCompareOpen(true)}
              disabled={compared.length < 2}
              className="shrink-0 bg-ivory text-espresso text-[0.72rem] uppercase tracking-[0.14em] px-5 py-3 disabled:opacity-40"
            >
              Compare {compared.length}/{MAX_COMPARE}
            </button>
          </div>
        </div>
      )}

      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-espresso/40" onClick={() => setFiltersOpen(false)} />
          <div ref={filtersRef} className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-ivory flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-espresso/10">
              <span className="eyebrow">Filters</span>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="p-2 -mr-2">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{FilterPanel}</div>
            <div className="border-t border-espresso/10 p-4 flex gap-3">
              <button onClick={clearAll} className="flex-1 border border-espresso/25 py-3 text-[0.72rem] uppercase tracking-[0.14em]">
                Clear
              </button>
              <button onClick={() => setFiltersOpen(false)} className="flex-1 bg-espresso text-ivory py-3 text-[0.72rem] uppercase tracking-[0.14em]">
                Show {filtered.length}
              </button>
            </div>
          </div>
        </div>
      )}

      <CompareDialog open={compareOpen} onClose={() => setCompareOpen(false)} products={compared} />
    </>
  );
}

function CompareDialog({ open, onClose, products }: { open: boolean; onClose: () => void; products: Product[] }) {
  const ref = useModal<HTMLDivElement>(open, onClose);
  if (!open) return null;

  const rows: { label: string; value: (p: Product) => React.ReactNode }[] = [
    { label: "Origin", value: (p) => `${p.origin.region}, ${p.origin.country}` },
    { label: "Roast", value: (p) => p.roastLevel },
    { label: "Process", value: (p) => p.origin.process },
    { label: "Variety", value: (p) => p.origin.variety },
    { label: "Altitude", value: (p) => p.origin.altitude },
    { label: "Tasting notes", value: (p) => p.flavorNotes.join(", ") },
    { label: "Profile", value: (p) => <ProductProfile profile={p.profile} compact /> },
    { label: "Best for", value: (p) => p.brewRecommendations.join(", ") },
    { label: "Rating", value: (p) => `${p.rating.toFixed(1)} (${p.reviewCount})` },
    { label: "From", value: (p) => `${formatPrice(p.sizes[0].priceCents)} / ${p.sizes[0].label}` },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label="Compare coffees">
      <div className="absolute inset-0 bg-espresso/50 animate-overlay" onClick={onClose} />
      <div ref={ref} className="relative bg-ivory w-full max-w-5xl max-h-[90vh] overflow-auto animate-fade-up">
        <div className="sticky top-0 bg-ivory flex items-center justify-between px-6 sm:px-8 h-16 border-b border-espresso/10 z-10">
          <h2 className="font-display text-3xl">Side by side</h2>
          <button onClick={onClose} aria-label="Close comparison" className="p-2 -mr-2">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="w-32 sm:w-40" />
              {products.map((p) => (
                <th key={p.slug} scope="col" className="p-4 sm:p-6 text-left align-top font-normal">
                  <Link href={`/coffee/${p.slug}`} onClick={onClose} className="group block">
                    <div className="relative h-36 sm:h-44 bg-cream overflow-hidden mb-3">
                      <Image src={p.images[0]} alt="" fill sizes="300px" className="object-cover" />
                    </div>
                    <span className="font-display text-xl link-underline">{p.name}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-espresso/10">
                <th scope="row" className="p-4 sm:px-6 text-left align-top eyebrow text-coffee font-medium">
                  {row.label}
                </th>
                {products.map((p) => (
                  <td key={p.slug} className={cn("p-4 sm:px-6 align-top", row.label === "From" && "tabular")}>
                    {row.value(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
