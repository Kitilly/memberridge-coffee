"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { origins } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function FarmOrigins() {
  const [active, setActive] = useState(0);
  const origin = origins[active];

  return (
    <section id="origins" className="py-28 bg-espresso text-ivory">
      <Container>
        <SectionHeading
          eyebrow="Farm Origins"
          title="Where every harvest begins"
          description="Three regions, three growing seasons, one standard for quality. Select an origin to read its story."
          tone="light"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {origins.map((o, i) => (
              <button
                key={o.country}
                onClick={() => setActive(i)}
                className={cn(
                  "text-left px-6 py-5 border shrink-0 w-full transition-colors",
                  i === active
                    ? "border-gold bg-ivory/5"
                    : "border-ivory/15 hover:border-ivory/40"
                )}
              >
                <p className="font-display text-xl">{o.country}</p>
                <p className="text-sm text-cream/60 mt-1">{o.region}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/5]">
              <Image
                src={origin.image}
                alt={`Coffee farm landscape in ${origin.region}, ${origin.country}`}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-cream/80 leading-relaxed mb-6">{origin.story}</p>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <dt className="text-cream/50">Altitude</dt>
                  <dd>{origin.altitude}</dd>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <dt className="text-cream/50">Farmers</dt>
                  <dd className="text-right">{origin.farmers}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
