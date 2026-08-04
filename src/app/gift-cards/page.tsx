import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GiftCardForm } from "@/components/gift-cards/GiftCardForm";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give the gift of specialty coffee — digital or printed Memberridge gift cards in any amount.",
};

export default function GiftCardsPage() {
  return (
    <Container className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Image
            src={images.productFlatLay}
            alt="Coffee cup styled for a gift card presentation"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Gift Cards"
            title="Give the gift of a good morning"
            description="Redeemable on any coffee, subscription, or brewing gear. Delivered by email in minutes, or mailed as a printed card."
          />
          <div className="mt-10">
            <GiftCardForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
