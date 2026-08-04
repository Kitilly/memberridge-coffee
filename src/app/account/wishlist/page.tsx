import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WishlistGrid } from "@/components/account/WishlistGrid";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <Container className="py-20">
      <h1 className="font-display text-4xl sm:text-5xl font-light mb-12">
        Your Wishlist
      </h1>
      <WishlistGrid />
    </Container>
  );
}
