import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations } from "@/lib/data/content";
import { images } from "@/lib/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Visit Memberridge Coffee — our roastery, flagship café, and neighborhood locations.",
};

export default function LocationsPage() {
  return (
    <>
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={images.cafeInterior}
          alt="Memberridge café interior"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Visit Us</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">
            Locations
          </h1>
        </div>
      </section>

      <JsonLd
        data={locations.map((loc) => ({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: `Memberridge Coffee — ${loc.name}`,
          address: loc.address,
          telephone: loc.phone,
          url: `${SITE.url}/locations`,
          image: loc.image,
          servesCuisine: "Coffee",
          parentOrganization: { "@type": "Organization", name: SITE.name },
        }))}
      />
      <Container className="py-20">
        <SectionHeading
          eyebrow="Find a Café"
          title="Three cities, one standard"
          description="Every location pours the same freshly roasted coffee — some with a full bar, others focused purely on filter."
        />

        <div className="mt-16 space-y-16">
          {locations.map((loc, i) => (
            <div
              key={loc.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream reveal">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-4xl mb-4">{loc.name}</h2>
                <p className="text-coffee leading-relaxed mb-6">{loc.description}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin size={16} strokeWidth={1.5} className="text-copper-ink mt-0.5 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Phone size={16} strokeWidth={1.5} className="text-copper-ink mt-0.5 shrink-0" />
                    <a href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-copper-ink">{loc.phone}</a>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock size={16} strokeWidth={1.5} className="text-copper-ink mt-0.5 shrink-0" />
                    <div>
                      {loc.hours.map((h) => (
                        <p key={h.days}>
                          {h.days}: {h.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-[0.14em] link-underline"
                >
                  Get directions <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only">(opens Google Maps)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
