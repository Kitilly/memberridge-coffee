import type { Metadata } from "next";
import { PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Order Tracking",
};

export default function OrdersPage() {
  return (
    <Container className="py-24 text-center max-w-md">
      <PackageSearch size={32} strokeWidth={1.2} className="text-copper mx-auto mb-6" />
      <h1 className="font-display text-4xl font-light mb-4">No Orders Yet</h1>
      <p className="text-coffee mb-8">
        Once you place an order, you&rsquo;ll be able to track its roast date,
        shipping status, and delivery here.
      </p>
      <LinkButton href="/coffee" variant="primary">
        Shop the Collection
      </LinkButton>
    </Container>
  );
}
