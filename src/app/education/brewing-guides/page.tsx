import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brewMethods } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Brewing Guides",
  description:
    "Step-by-step brewing guides for French Press, Pour Over, Espresso, Cold Brew, Chemex, and AeroPress.",
};

export default function BrewingGuidesPage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Coffee Education"
        title="Brewing Guides"
        description="Six methods, each with its own ratio, grind, and rhythm. Choose one below for the full walkthrough."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {brewMethods.map((method) => (
          <Link
            key={method.slug}
            href={`/education/brewing-guides/${method.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Image
                src={method.image}
                alt={`${method.name} brewing method`}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-display text-xl link-underline inline-block">
                {method.name}
              </h3>
              <p className="text-sm text-coffee mt-1">
                {method.time} · {method.grind} grind
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
