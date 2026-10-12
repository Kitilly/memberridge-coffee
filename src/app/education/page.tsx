import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brewMethods } from "@/lib/data/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Coffee Education",
  description:
    "Brewing guides and coffee fundamentals — grind size, ratios, processing methods, and how to read a bag of specialty coffee.",
};

const fundamentals = [
  {
    title: "Reading a Flavor Note",
    body: "Flavor notes describe what a coffee tastes like, not what was added to it. A note of 'blackberry' means the coffee's natural acids and sugars evoke that fruit — nothing is flavored or infused.",
  },
  {
    title: "Grind Size, Explained",
    body: "Grind size controls extraction speed. Finer grinds expose more surface area and extract faster — which is why espresso uses a fine grind for a short brew, and cold brew uses coarse for a long one.",
  },
  {
    title: "Washed vs. Natural Process",
    body: "Washed coffees are pulped and fermented before drying, producing a cleaner, brighter cup. Natural coffees dry with the fruit still on, producing a heavier, fruitier profile.",
  },
  {
    title: "Why Roast Dates Matter",
    body: "Coffee peaks in flavor 5–14 days after roasting and declines steadily after that. A 'best by' date a year out tells you nothing — look for an actual roast date.",
  },
];

export default function EducationPage() {
  return (
    <>
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={images.storyBeans}
          alt="Close-up of roasted coffee beans"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Learn</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">
            Coffee Education
          </h1>
        </div>
      </section>

      <section className="py-28">
        <Container>
          <SectionHeading
            eyebrow="Brewing Guides"
            title="Choose your method"
            description="Six ways to brew, each with its own ratio, grind, and rhythm. Pick one below for a full step-by-step guide."
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
      </section>

      <section className="py-28 bg-cream">
        <Container>
          <SectionHeading
            eyebrow="Fundamentals"
            title="A shorter path to understanding your coffee"
            align="center"
            className="mx-auto mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {fundamentals.map((f) => (
              <div key={f.title}>
                <h3 className="font-display text-xl mb-3">{f.title}</h3>
                <p className="text-sm text-coffee leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
