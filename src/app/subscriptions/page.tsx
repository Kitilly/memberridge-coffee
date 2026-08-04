import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, PauseCircle, Percent, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanBuilder } from "@/components/subscriptions/PlanBuilder";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Coffee Subscription",
  description:
    "Build a flexible coffee subscription — choose your coffee, size, and delivery frequency, with savings on every order.",
};

const benefits = [
  {
    icon: Percent,
    title: "Save on Every Bag",
    body: "Subscribers save up to 10% off single-purchase pricing, automatically applied to every delivery.",
  },
  {
    icon: Calendar,
    title: "Flexible Delivery",
    body: "Weekly, biweekly, or monthly — set the rhythm that matches how much coffee you actually drink.",
  },
  {
    icon: PauseCircle,
    title: "Pause or Cancel Anytime",
    body: "No contracts, no fees. Skip a delivery before a trip or cancel entirely in a couple of clicks.",
  },
  {
    icon: Truck,
    title: "Always Freshly Roasted",
    body: "Every subscription order is roasted within 72 hours of shipping — never pulled from aging stock.",
  },
];

export default function SubscriptionsPage() {
  return (
    <>
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={images.cafeInterior}
          alt="Bags of Memberridge coffee arranged on a shelf"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Subscriptions</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-ivory">
            Never Run Out
          </h1>
        </div>
      </section>

      <section className="py-28">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 mb-24">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center flex flex-col items-center">
                <Icon size={26} strokeWidth={1.2} className="text-copper mb-5" />
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-coffee leading-relaxed max-w-[220px]">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <SectionHeading
            eyebrow="Build Your Plan"
            title="Three choices, one great cup"
            align="center"
            className="mx-auto mb-14"
          />
          <PlanBuilder />
        </Container>
      </section>
    </>
  );
}
