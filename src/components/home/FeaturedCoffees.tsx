import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data/products";

export function FeaturedCoffees() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-28">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="This Season's Selection"
            title="Featured Coffees"
            description="Four lots we're pouring right now, chosen for what's at peak flavor this harvest."
          />
          <LinkButton href="/coffee" variant="outline" className="shrink-0">
            View All Coffee
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 reveal">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
