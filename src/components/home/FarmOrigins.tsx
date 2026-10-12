"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { origins } from "@/lib/data/content";
import { products } from "@/lib/data/products";
import { MAP_H as H, MAP_W as W, mapX as x, mapY as y } from "@/lib/map-projection";
import { cn } from "@/lib/utils";

// Neighbouring origins that would overlap at world scale, nudged apart (map units).
const nudge: Record<string, [number, number]> = {
  "Costa Rica": [-7, -5],
  Panamá: [7, 5],
  Ethiopia: [3, -3],
  Kenya: [-2, 3],
};

export function FarmOrigins({ map }: { map: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const origin = origins[active];
  const coffee = products.find((p) => p.slug === origin.coffee);

  return (
    <section id="origins" className="py-28 bg-espresso text-ivory overflow-hidden scroll-mt-20">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading
            eyebrow="Farm Origins"
            title="Where every harvest begins"
            description="Coffee grows in a narrow band between the tropics. Select an origin to meet the people and places behind each bag."
            tone="light"
          />
          <p className="text-sm text-cream/60 tabular shrink-0">
            {origins.length} origins · 3 continents
          </p>
        </div>

        {/* The coffee belt map */}
        <figure className="relative mt-14 reveal">
          {map}

          {/* Pins are HTML buttons layered over the SVG so they're keyboard- and screen-reader-friendly. */}
          {origins.map((o, i) => {
            const [dx, dy] = nudge[o.country] ?? [0, 0];
            const isActive = i === active;
            return (
              <button
                key={o.country}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${o.country}, ${o.region}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                style={{ left: `${((x(o.lon) + dx) / W) * 100}%`, top: `${((y(o.lat) + dy) / H) * 100}%` }}
              >
                <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
                  {isActive && <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />}
                  <span
                    className={cn(
                      "relative h-full w-full rounded-full border border-espresso transition-all duration-300",
                      isActive ? "bg-gold scale-125" : "bg-cream group-hover:bg-gold"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap text-[0.65rem] tracking-[0.14em] uppercase px-2 py-1 bg-ivory text-espresso transition-opacity pointer-events-none hidden sm:block",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  )}
                >
                  {o.country}
                </span>
              </button>
            );
          })}
        </figure>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[220px_1fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div role="tablist" aria-label="Origins" className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            {origins.map((o, i) => (
              <button
                key={o.country}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "text-left shrink-0 py-3 lg:py-3.5 px-4 lg:px-0 lg:pl-5 border-b-2 lg:border-b-0 lg:border-l-2 transition-colors",
                  i === active ? "border-gold text-ivory" : "border-transparent text-cream/50 hover:text-cream"
                )}
              >
                <span className="block font-display text-2xl leading-none">{o.country}</span>
                <span className="block text-xs mt-1 opacity-70">{o.region}</span>
              </button>
            ))}
          </div>

          <div key={origin.country} className="relative aspect-[4/5] overflow-hidden animate-fade-in">
            <Image
              src={origin.image}
              alt={`Coffee growing in ${origin.region}, ${origin.country}`}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover animate-slow-zoom"
            />
          </div>

          <div key={`${origin.country}-copy`} className="animate-fade-up" role="tabpanel" aria-label={origin.country}>
            <p className="eyebrow text-gold mb-3">{origin.region}</p>
            <h3 className="font-display text-5xl leading-none mb-6">{origin.country}</h3>
            <p className="text-cream/80 leading-relaxed text-[1.05rem]">{origin.story}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ivory/10 pt-6">
              {[
                ["Altitude", origin.altitude],
                ["Process", origin.process],
                ["Harvest", origin.harvest],
                ["Growers", origin.farmers],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-cream/50 mb-1">{label}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
            {coffee && (
              <Link
                href={`/coffee/${coffee.slug}`}
                className="group mt-10 flex items-center gap-4 border border-ivory/15 p-3 pr-5 hover:border-gold transition-colors"
              >
                <div className="relative h-16 w-14 shrink-0 overflow-hidden">
                  <Image src={coffee.images[0]} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-cream/60">Taste this origin</p>
                  <p className="font-display text-xl">{coffee.name}</p>
                </div>
                <ArrowRight size={16} className="text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
