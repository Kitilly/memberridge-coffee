import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Coffee, MapPin, Mountain, Sprout, Star, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductProfile } from "@/components/product/ProductProfile";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ReviewsList } from "@/components/product/ReviewsList";
import { ProductCard } from "@/components/product/ProductCard";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { JsonLd } from "@/components/seo/JsonLd";
import { brewMethods } from "@/lib/data/content";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/coffee/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.origin.country}`,
    description: `${product.shortDescription} ${product.flavorNotes.join(", ")}. ${product.roastLevel} roast.`,
    alternates: { canonical: `/coffee/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 1400, height: 1750, alt: product.name }],
    },
  };
}

const categoryNames = { "single-origin": "Single Origin", blend: "Blends", espresso: "Espresso" };

export default async function ProductPage({ params }: PageProps<"/coffee/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const prices = product.sizes.map((s) => s.priceCents / 100);

  const specs = [
    { icon: MapPin, label: "Region", value: `${product.origin.region}, ${product.origin.country}` },
    { icon: User, label: "Producer", value: product.origin.producer },
    { icon: Mountain, label: "Altitude", value: product.origin.altitude },
    { icon: Sprout, label: "Variety", value: product.origin.variety },
    { icon: Coffee, label: "Process", value: product.origin.process },
    { icon: Calendar, label: "Harvest", value: product.origin.harvestSeason },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description.join(" "),
          image: product.images,
          sku: product.id,
          brand: { "@type": "Brand", name: SITE.name },
          category: categoryNames[product.category],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
          review: product.reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            name: r.title,
            reviewBody: r.body,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
          })),
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: product.sizes.length,
            availability: "https://schema.org/InStock",
            url: `${SITE.url}/coffee/${product.slug}`,
          },
        }}
      />

      <Container className="pt-8 pb-16">
        <Breadcrumbs
          items={[
            { label: "Coffee", href: "/coffee" },
            { label: categoryNames[product.category], href: `/coffee?category=${product.category}` },
            { label: product.name, href: `/coffee/${product.slug}` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            {product.badges && product.badges.length > 0 && (
              <p className="eyebrow text-copper-ink mb-4">{product.badges.join(" · ")}</p>
            )}
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.02]">{product.name}</h1>
            <p className="mt-3 text-sm text-coffee">
              {product.origin.region}, {product.origin.country} · {product.roastLevel} roast
            </p>
            <a href="#reviews" className="mt-4 inline-flex items-center gap-2 text-sm group">
              <span className="flex text-copper" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} strokeWidth={1.5} fill={i <= Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
              </span>
              <span className="tabular link-underline">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </a>

            <p className="mt-6 text-lg text-coffee leading-relaxed">{product.shortDescription}</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-8 py-8 border-y border-espresso/10">
              <div>
                <p className="eyebrow text-espresso mb-3">In the cup</p>
                <p className="font-display text-2xl italic leading-snug">
                  {product.flavorNotes.join(", ")}
                </p>
              </div>
              <ProductProfile profile={product.profile} />
            </div>

            <div className="mt-8">
              <PurchasePanel product={product} />
            </div>
          </div>
        </div>
      </Container>

      {/* Story & origin */}
      <section className="bg-cream py-24 mt-12">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden reveal">
            <Image src={product.images[1] ?? product.images[0]} alt="" fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="The Story" title={`From ${product.origin.region.split(",")[0]} to your cup`} />
            <div className="mt-6 space-y-4">
              {product.description.map((para, i) => (
                <p key={i} className="text-coffee leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-2 eyebrow text-coffee mb-1.5">
                    <Icon size={14} strokeWidth={1.5} className="text-copper" aria-hidden />
                    {label}
                  </dt>
                  <dd className="font-display text-xl leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Container>
        {/* Brewing */}
        <section className="py-24" aria-labelledby="brew-heading">
          <p className="eyebrow text-copper-ink mb-4">How We Brew It</p>
          <h2 id="brew-heading" className="font-display text-4xl sm:text-5xl leading-[1.1] mb-10">
            Recommended methods
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {product.brewRecommendations.map((name) => {
              const guide = brewMethods.find((m) => m.name.toLowerCase() === name.toLowerCase());
              const body = (
                <>
                  <p className="font-display text-2xl">{name}</p>
                  <p className="text-sm text-coffee mt-1">
                    {guide ? `${guide.ratio.split(" ")[0]} · ${guide.grind} grind · ${guide.time}` : "Medium grind · 1:16 ratio"}
                  </p>
                  {guide && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em]">
                      Read the guide <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </>
              );
              return (
                <li key={name}>
                  {guide ? (
                    <Link href={`/education/brewing-guides/${guide.slug}`} className="group block border border-espresso/15 p-6 h-full hover:border-espresso transition-colors">
                      {body}
                    </Link>
                  ) : (
                    <div className="border border-espresso/15 p-6 h-full">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="reviews" className="py-24 border-t border-espresso/10 scroll-mt-28">
          <SectionHeading eyebrow="Reviews" title="What people are tasting" />
          <div className="mt-12">
            <ReviewsList reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-24 border-t border-espresso/10">
            <SectionHeading eyebrow="You Might Also Like" title="Related coffees" />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="pb-24">
          <RecentlyViewed currentSlug={product.slug} />
        </div>
      </Container>
    </>
  );
}
