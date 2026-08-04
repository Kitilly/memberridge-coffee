import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";

export function OurStory() {
  return (
    <section className="py-28 bg-cream">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] mt-12">
            <Image
              src={images.storyHands}
              alt="Hands sorting freshly picked coffee cherries"
              fill
              sizes="(min-width: 1024px) 25vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4]">
            <Image
              src={images.storyRoaster}
              alt="Coffee roaster at work, beans tumbling from the drum"
              fill
              sizes="(min-width: 1024px) 25vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-lg">
          <p className="eyebrow text-copper mb-4">Our Story</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.1] text-espresso">
            Coffee begins long before the roast.
          </h2>
          <p className="mt-6 text-coffee leading-relaxed">
            Every bean carries the fingerprints of the person who grew it —
            the altitude of their farm, the year&rsquo;s rainfall, the hour they
            chose to pick. Our work starts by listening to that story, then
            roasting carefully enough not to talk over it.
          </p>
          <p className="mt-4 text-coffee leading-relaxed">
            We built Memberridge on the belief that exceptional coffee is a
            relationship, not a transaction — with the land, the farmer, and
            eventually, your morning.
          </p>
          <div className="mt-8">
            <LinkButton href="/about" variant="outline">
              Read Our Full Story
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
