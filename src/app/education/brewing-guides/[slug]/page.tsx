import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Gauge, Scale } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { brewMethods } from "@/lib/data/content";

export function generateStaticParams() {
  return brewMethods.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/education/brewing-guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const method = brewMethods.find((m) => m.slug === slug);
  if (!method) return {};
  return {
    title: `${method.name} Brewing Guide`,
    description: method.description,
  };
}

export default async function BrewingGuidePage({
  params,
}: PageProps<"/education/brewing-guides/[slug]">) {
  const { slug } = await params;
  const method = brewMethods.find((m) => m.slug === slug);
  if (!method) notFound();

  const others = brewMethods.filter((m) => m.slug !== slug);

  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={method.image}
          alt={`${method.name} brewing method`}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-espresso/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Brewing Guide</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">
            {method.name}
          </h1>
        </div>
      </section>

      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <p className="text-coffee leading-relaxed mb-8">{method.description}</p>

            <dl className="space-y-4 border-t border-espresso/10 pt-6">
              <div className="flex items-center gap-3">
                <Clock size={16} strokeWidth={1.5} className="text-copper-ink" />
                <dt className="text-sm text-coffee w-20">Brew Time</dt>
                <dd className="text-sm">{method.time}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Gauge size={16} strokeWidth={1.5} className="text-copper-ink" />
                <dt className="text-sm text-coffee w-20">Grind</dt>
                <dd className="text-sm">{method.grind}</dd>
              </div>
              <div className="flex items-center gap-3">
                <Scale size={16} strokeWidth={1.5} className="text-copper-ink" />
                <dt className="text-sm text-coffee w-20">Ratio</dt>
                <dd className="text-sm">{method.ratio}</dd>
              </div>
            </dl>

            <div className="mt-8 pt-8 border-t border-espresso/10">
              <p className="eyebrow text-espresso mb-4">You&rsquo;ll Need</p>
              <ul className="space-y-2">
                {method.equipment.map((item) => (
                  <li key={item} className="text-sm text-coffee">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <LinkButton href="/coffee" variant="outline">
                Shop Coffee
              </LinkButton>
            </div>
          </div>

          <div>
            <p className="eyebrow text-espresso mb-8">Step by Step</p>
            <ol className="space-y-8">
              {method.steps.map((step, i) => (
                <li key={step.title} className="flex gap-6">
                  <span className="font-display text-3xl text-copper/50 shrink-0 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-coffee leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-espresso/10">
          <p className="eyebrow text-espresso mb-8">Other Methods</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/education/brewing-guides/${m.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-cream">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-sm link-underline inline-block">{m.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
