import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderLookup } from "@/components/account/OrderLookup";

export const metadata: Metadata = {
  robots: { index: false },
  title: "Order Tracking",
};

export default function OrdersPage() {
  return (
    <Container className="py-20 max-w-4xl">
      <SectionHeading
        eyebrow="Your Orders"
        title="Track an order"
        description="Every order is roasted to order, rested, and shipped within two business days. Enter your details to see where yours is."
      />
      <div className="mt-14">
        <OrderLookup />
      </div>
    </Container>
  );
}
