import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Memberridge Coffee shipping timelines, costs, and return policy.",
};

const sections = [
  {
    title: "Processing Time",
    body: "Every order is roasted to order. Orders placed before 2pm PT on a roasting day ship within two business days; orders placed after may take an additional day.",
  },
  {
    title: "Shipping Options",
    body: "Standard shipping (3–5 business days) is $5.00, and free on orders over $45. Express shipping (1–2 business days) is available for $15.00. Rates apply to the continental United States.",
  },
  {
    title: "Order Tracking",
    body: "You'll receive a tracking link by email as soon as your order ships. Signed-in customers can also track orders from their account.",
  },
  {
    title: "Returns",
    body: "Because coffee is perishable, we don't accept returns on opened bags. Unopened, unexpired items can be returned within 14 days of delivery for a full refund.",
  },
  {
    title: "Damaged or Incorrect Orders",
    body: "If your order arrives damaged or isn't what you ordered, email hello@memberridgecoffee.com with a photo within 14 days and we'll send a replacement or refund at no cost to you.",
  },
  {
    title: "Subscription Changes",
    body: "Subscription orders can be edited, skipped, paused, or canceled anytime from your account up until 48 hours before the next scheduled charge.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <Container className="py-20 max-w-3xl">
      <SectionHeading
        eyebrow="Policies"
        title="Shipping & Returns"
        description="Last updated July 2026."
      />
      <div className="mt-14 space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl mb-3">{s.title}</h2>
            <p className="text-coffee leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
