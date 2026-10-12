import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CoffeeCollection } from "@/components/coffee/CoffeeCollection";
import { products } from "@/lib/data/products";
import { images } from "@/lib/images";
import type { Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Coffee Collection",
  description:
    "Single origin, blend, and espresso coffees — small-batch roasted and shipped fresh.",
};

const validCategories: Category[] = ["single-origin", "blend", "espresso"];

export default async function CoffeePage({
  searchParams,
}: PageProps<"/coffee">) {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const initialCategory = validCategories.includes(categoryParam as Category)
    ? (categoryParam as Category)
    : undefined;

  return (
    <>
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={images.heroCoffeeCollection}
          alt="Roasted coffee beans arranged in a shallow dish"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/45" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Shop</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">
            The Coffee Collection
          </h1>
        </div>
      </section>

      <Container className="py-20">
        <CoffeeCollection products={products} initialCategory={initialCategory} />
      </Container>
    </>
  );
}
