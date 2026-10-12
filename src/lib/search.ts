import { products } from "@/lib/data/products";
import { brewMethods, journalPosts } from "@/lib/data/content";
import { formatPrice } from "@/lib/utils";

export type SearchResult = {
  id: string;
  type: "Coffee" | "Brewing Guide" | "Journal" | "Page";
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  /** Lower-cased text searched against. */
  haystack: string;
};

const pages: Omit<SearchResult, "haystack">[] = [
  { id: "p-subs", type: "Page", title: "Subscriptions", subtitle: "Save up to 10% on every delivery", href: "/subscriptions" },
  { id: "p-whole", type: "Page", title: "Wholesale", subtitle: "Coffee for cafés, offices and hotels", href: "/wholesale" },
  { id: "p-gift", type: "Page", title: "Gift Cards", subtitle: "Digital or printed", href: "/gift-cards" },
  { id: "p-loc", type: "Page", title: "Locations", subtitle: "Portland, Seattle, San Francisco", href: "/locations" },
  { id: "p-faq", type: "Page", title: "FAQs", subtitle: "Shipping, subscriptions, returns", href: "/faqs" },
  { id: "p-story", type: "Page", title: "Our Story", subtitle: "Sourcing, roasting, and the people behind it", href: "/about" },
  { id: "p-contact", type: "Page", title: "Contact", subtitle: "hello@memberridgecoffee.com", href: "/contact" },
];

const index: SearchResult[] = [
  ...products.map((p) => ({
    id: p.id,
    type: "Coffee" as const,
    title: p.name,
    subtitle: `${p.origin.country} · ${p.roastLevel} · from ${formatPrice(p.sizes[0].priceCents)}`,
    href: `/coffee/${p.slug}`,
    image: p.images[0],
    haystack: [
      p.name,
      p.category.replace("-", " "),
      p.roastLevel,
      p.origin.country,
      p.origin.region,
      p.origin.process,
      p.origin.variety,
      ...p.flavorNotes,
      ...p.brewRecommendations,
    ]
      .join(" ")
      .toLowerCase(),
  })),
  ...brewMethods.map((m) => ({
    id: `b-${m.slug}`,
    type: "Brewing Guide" as const,
    title: `${m.name} Guide`,
    subtitle: `${m.time} · ${m.grind} grind`,
    href: `/education/brewing-guides/${m.slug}`,
    image: m.image,
    haystack: `${m.name} brew guide ${m.grind} ${m.description}`.toLowerCase(),
  })),
  ...journalPosts.map((p) => ({
    id: `j-${p.slug}`,
    type: "Journal" as const,
    title: p.title,
    subtitle: `${p.category} · ${p.readTime}`,
    href: `/journal/${p.slug}`,
    image: p.image,
    haystack: `${p.title} ${p.category} ${p.excerpt}`.toLowerCase(),
  })),
  ...pages.map((p) => ({ ...p, haystack: `${p.title} ${p.subtitle}`.toLowerCase() })),
];

/**
 * Every query word must appear somewhere; matches in the title rank first,
 * then coffees ahead of other content.
 */
export function search(query: string, limit = 8): SearchResult[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const typeRank = { Coffee: 0, "Brewing Guide": 1, Journal: 2, Page: 3 };
  return index
    .filter((r) => words.every((w) => r.haystack.includes(w) || r.title.toLowerCase().includes(w)))
    .map((r) => ({
      r,
      score:
        (words.every((w) => r.title.toLowerCase().includes(w)) ? 0 : 10) + typeRank[r.type],
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(({ r }) => r);
}

export const popularSearches = ["Ethiopia", "Espresso", "Washed", "Chocolate", "Cold Brew", "Light Roast"];
