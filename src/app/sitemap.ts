import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { brewMethods, journalPosts } from "@/lib/data/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["", 1, "weekly"],
    ["/coffee", 0.9, "weekly"],
    ["/subscriptions", 0.8, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/education", 0.7, "monthly"],
    ["/education/brewing-guides", 0.6, "monthly"],
    ["/journal", 0.6, "weekly"],
    ["/wholesale", 0.5, "monthly"],
    ["/gift-cards", 0.5, "monthly"],
    ["/locations", 0.5, "monthly"],
    ["/faqs", 0.4, "monthly"],
    ["/contact", 0.4, "yearly"],
    ["/policies/shipping", 0.2, "yearly"],
    ["/policies/privacy", 0.2, "yearly"],
  ] as const;

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE.url}${path}`,
      priority,
      changeFrequency,
    })),
    ...products.map((p) => ({ url: `${SITE.url}/coffee/${p.slug}`, priority: 0.8, changeFrequency: "weekly" as const })),
    ...brewMethods.map((m) => ({ url: `${SITE.url}/education/brewing-guides/${m.slug}`, priority: 0.5 })),
    ...journalPosts.map((p) => ({ url: `${SITE.url}/journal/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
