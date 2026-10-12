import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { FarmOrigins } from "@/components/home/FarmOrigins";
import { CoffeeBeltMap } from "@/components/home/CoffeeBeltMap";
import { images } from "@/lib/images";
import { Stats } from "@/components/home/Stats";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Memberridge Coffee believes exceptional coffee begins long before roasting. Learn about our sourcing, craftsmanship, and the farmers behind every bag.",
};

const values = [
  {
    title: "Sourced with Purpose",
    body: "We work directly with cooperatives and smallholder farms, paying above composite pricing to keep quality — and the relationship — sustainable year over year.",
  },
  {
    title: "Roasted with Care",
    body: "Every lot is profiled individually in batches under 25kg. Nothing runs on a single fixed curve; the bean dictates the roast, not the schedule.",
  },
  {
    title: "Shared with Intention",
    body: "From the bag design to the brewing guide tucked inside, every touchpoint is built to make a good cup easier to reach at home.",
  },
];

const timeline = [
  {
    step: "01",
    title: "The Farm",
    body: "Cherries are hand-picked at peak ripeness, then processed on-site using washed, honey, or natural methods depending on the lot.",
  },
  {
    step: "02",
    title: "The Cupping Table",
    body: "Green samples are cupped blind against last year's harvest before we commit to a purchase — consistency matters as much as character.",
  },
  {
    step: "03",
    title: "The Roast",
    body: "Each lot gets its own profile, developed and adjusted in small batches until the roast reveals rather than hides the origin.",
  },
  {
    step: "04",
    title: "Your Door",
    body: "Bagged within 48 hours of roasting and shipped within the week — never from aging warehouse stock.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src={images.heroAbout}
          alt="Terraced coffee farmland on a misty mountainside"
          fill
          preload
          sizes="100vw"
          className="object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-espresso/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Our Story</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-ivory leading-[1.05] max-w-2xl">
            Every Bean Has a Story
          </h1>
        </div>
      </section>

      <section className="py-28">
        <Container className="max-w-3xl text-center">
          <p className="font-display text-2xl sm:text-3xl leading-relaxed text-espresso">
            Memberridge Coffee believes exceptional coffee begins long before
            roasting. Every bean carries the fingerprints of the farmer who
            grew it — the altitude, the harvest, the hour it was picked. Our
            work is to protect that story from farm to cup.
          </p>
        </Container>
      </section>

      <section aria-label="Memberridge by the numbers" className="pb-28">
        <Container>
          <Stats />
        </Container>
      </section>

      <section className="py-28 bg-cream">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] mt-12">
              <Image
                src={images.storyHands}
                alt="Hands picking ripe red coffee cherries from a branch"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src={images.storyRoaster}
                alt="Coffee roaster pouring beans into a roasting machine"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="max-w-lg">
            <p className="eyebrow text-copper-ink mb-4">How We Started</p>
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] text-espresso">
              A relationship, not a transaction.
            </h2>
            <p className="mt-6 text-coffee leading-relaxed">
              Memberridge began with a simple frustration: too much
              &ldquo;specialty&rdquo; coffee treated origin as a marketing
              line rather than a standard. We set out to build a roastery
              where sourcing decisions were made at the cupping table, not
              the spreadsheet.
            </p>
            <p className="mt-4 text-coffee leading-relaxed">
              That means fewer coffees on the shelf at any given time, longer
              relationships with fewer farms, and a willingness to sell out of
              a lot rather than stretch it thin.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-28">
        <Container>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Three commitments behind every bag"
            align="center"
            className="mx-auto mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="font-display text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-coffee leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-28 bg-cream">
        <Container>
          <SectionHeading
            eyebrow="From Farm to Bag"
            title="How a harvest becomes your cup"
            align="center"
            className="mx-auto mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {timeline.map((t) => (
              <div key={t.step}>
                <p className="font-display text-4xl text-copper/60 mb-4">{t.step}</p>
                <h3 className="font-display text-xl mb-2">{t.title}</h3>
                <p className="text-sm text-coffee leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FarmOrigins map={<CoffeeBeltMap />} />

      <section className="py-28">
        <Container className="text-center max-w-xl">
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] text-espresso mb-6">
            Taste what the relationship produces.
          </h2>
          <LinkButton href="/coffee" variant="primary">
            Shop the Collection
          </LinkButton>
        </Container>
      </section>
    </>
  );
}
