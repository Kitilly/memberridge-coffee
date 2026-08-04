"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Category, Product, RoastLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<Category, string> = {
  "single-origin": "Single Origin",
  blend: "Blend",
  espresso: "Espresso",
};

const roastLevels: RoastLevel[] = [
  "Light",
  "Light-Medium",
  "Medium",
  "Medium-Dark",
  "Dark",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export function CoffeeCollection({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: Category;
}) {
  const [categories, setCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [roasts, setRoasts] = useState<RoastLevel[]>([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(list: T[], setList: (v: T[]) => void, value: T) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false;
      if (roasts.length && !roasts.includes(p.roastLevel)) return false;
      if (p.sizes[0].priceCents > maxPrice * 100) return false;
      return true;
    });

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.sizes[0].priceCents - b.sizes[0].priceCents);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.sizes[0].priceCents - a.sizes[0].priceCents);
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, categories, roasts, maxPrice, sort]);

  const activeFilterCount = categories.length + roasts.length + (maxPrice < 30 ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-10">
      <div>
        <p className="eyebrow text-espresso mb-4">Category</p>
        <ul className="space-y-3">
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 text-sm text-coffee cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggle(categories, setCategories, cat)}
                  className="h-4 w-4 accent-espresso"
                />
                {categoryLabels[cat]}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow text-espresso mb-4">Roast Level</p>
        <ul className="space-y-3">
          {roastLevels.map((roast) => (
            <li key={roast}>
              <label className="flex items-center gap-3 text-sm text-coffee cursor-pointer">
                <input
                  type="checkbox"
                  checked={roasts.includes(roast)}
                  onChange={() => toggle(roasts, setRoasts, roast)}
                  className="h-4 w-4 accent-espresso"
                />
                {roast}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow text-espresso mb-4">Max Price: ${maxPrice}</p>
        <input
          type="range"
          min={15}
          max={30}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-espresso"
        />
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={() => {
            setCategories([]);
            setRoasts([]);
            setMaxPrice(30);
          }}
          className="text-sm text-copper link-underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
      <aside className="hidden lg:block">{FilterPanel}</aside>

      <div>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm border border-espresso/20 px-4 py-2"
          >
            <SlidersHorizontal size={15} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <p className="text-sm text-coffee">{filtered.length} coffees</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border-b border-espresso/20 bg-transparent py-1.5 pr-2 outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-coffee py-20 text-center">
            No coffees match those filters right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-espresso/40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-ivory p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="eyebrow">Filters</span>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  );
}
