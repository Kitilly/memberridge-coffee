import { Sprout, Package, Timer, Award, Truck, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: Sprout,
    title: "Ethically Sourced",
    body: "Direct and cooperative relationships with growers, paid above composite pricing every harvest.",
  },
  {
    icon: Package,
    title: "Small Batch Roasted",
    body: "Roasted in lots under 25kg so every profile gets full attention, not an average.",
  },
  {
    icon: Timer,
    title: "Freshly Packed",
    body: "Bagged within 48 hours of roasting, with the roast date printed on every bag.",
  },
  {
    icon: Award,
    title: "Expert Roasting",
    body: "Profiles developed and adjusted lot by lot, not run on a single fixed curve.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    body: "Orders roasted and shipped within the week — never from aging warehouse stock.",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    body: "Every lot cupped and scored before it earns a place in the collection.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Memberridge"
          title="The details behind every bag"
          align="center"
          className="mx-auto mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center flex flex-col items-center">
              <Icon size={26} strokeWidth={1.2} className="text-copper mb-5" />
              <h3 className="font-display text-xl mb-2">{title}</h3>
              <p className="text-sm text-coffee leading-relaxed max-w-[240px]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
