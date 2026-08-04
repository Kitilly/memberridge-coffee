import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Coffee, MapPin, Mountain, Sprout, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductProfile } from "@/components/product/ProductProfile";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ReviewsList } from "@/components/product/ReviewsList";
import { ProductCard } from "@/components/product/ProductCard";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/coffee/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

const specRows = (product: NonNullable<ReturnType<typeof getProductBySlug>>) => [
  { icon: MapPin, label: "Origin", value: `${product.origin.region}, ${product.origin.country}` },
  { icon: Mountain, label: "Altitude", value: product.origin.altitude },
  { icon: Sprout, label: "Variety", value: product.origin.variety },
  { icon: Coffee, label: "Process", value: product.origin.process },
  { icon: Calendar, label: "Harvest Season", value: product.origin.harvestSeason },
];

export default async function ProductPage({ params }: PageProps<"/coffee/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <Container className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {product.badges && product.badges.length > 0 && (
            <p className="eyebrow text-copper mb-3">{product.badges.join(" · ")}</p>
          )}
          <h1 className="font-display text-4xl sm:text-5xl font-light leading-[1.1]">
            {product.name}
          </h1>
          <p className="text-coffee mt-4 leading-relaxed">{product.shortDescription}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {product.flavorNotes.map((note) => (
              <span
                key={note}
                className="text-xs uppercase tracking-wide border border-espresso/20 px-3 py-1.5 text-coffee"
              >
                {note}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ProductProfile profile={product.profile} />
          </div>

          <div className="mt-10 pt-10 border-t border-espresso/10">
            <PurchasePanel product={product} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-24 pt-24 border-t border-espresso/10">
        <div>
          <SectionHeading eyebrow="The Story" title="About This Coffee" />
          <div className="mt-6 space-y-4">
            {product.description.map((para, i) => (
              <p key={i} className="text-coffee leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="The Details" title="Origin & Specifications" />
          <dl className="mt-6 divide-y divide-espresso/10">
            {specRows(product).map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between py-3">
                <dt className="flex items-center gap-2 text-sm text-coffee">
                  <Icon size={15} strokeWidth={1.5} className="text-copper" />
                  {label}
                </dt>
                <dd className="text-sm text-right">{value}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-coffee">Roast Level</dt>
              <dd className="text-sm text-right">{product.roastLevel}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-coffee">Producer</dt>
              <dd className="text-sm text-right">{product.origin.producer}</dd>
            </div>
          </dl>

          <p className="eyebrow text-espresso mt-8 mb-3">Recommended Brewing</p>
          <div className="flex flex-wrap gap-2">
            {product.brewRecommendations.map((method) => (
              <span
                key={method}
                className="text-sm bg-cream px-4 py-2 text-espresso"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 pt-24 border-t border-espresso/10">
        <SectionHeading eyebrow="Reviews" title="What people are tasting" />
        <div className="mt-10">
          <ReviewsList
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 pt-24 border-t border-espresso/10">
          <SectionHeading eyebrow="You Might Also Like" title="Related Coffees" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
