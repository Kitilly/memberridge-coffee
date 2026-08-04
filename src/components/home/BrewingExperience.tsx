import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brewMethods } from "@/lib/data/content";

export function BrewingExperience() {
  return (
    <section className="py-28 bg-espresso text-ivory">
      <Container>
        <SectionHeading
          eyebrow="The Brewing Experience"
          title="One bean, six rituals"
          description="The same coffee tells a different story depending on how you brew it. Find the method that suits your morning."
          tone="light"
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brewMethods.map((method) => (
            <Link
              key={method.slug}
              href={`/education/brewing-guides/${method.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={method.image}
                alt={`${method.name} brewing method`}
                fill
                sizes="(min-width: 1024px) 16vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-ivory font-display text-lg leading-tight">
                  {method.name}
                </p>
                <p className="text-cream/70 text-xs mt-1">{method.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
