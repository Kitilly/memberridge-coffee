import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { images } from "@/lib/images";

const benefits = [
  "Save up to 10% on every delivery",
  "Choose weekly, biweekly, or monthly delivery",
  "Swap, pause, or cancel anytime, no fees",
  "Always roasted within 72 hours of shipping",
];

export function SubscriptionPromo() {
  return (
    <section className="py-28">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/3] order-2 lg:order-1 overflow-hidden reveal">
          <Image
            src={images.cafeInterior}
            alt="Bags of Memberridge coffee arranged on a shelf"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 lg:order-2 max-w-lg reveal">
          <p className="eyebrow text-copper-ink mb-4">Coffee Subscription</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.1] text-espresso">
            Never run out on a Monday morning.
          </h2>
          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check size={18} strokeWidth={1.5} className="text-olive-ink mt-0.5 shrink-0" />
                <span className="text-coffee">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <LinkButton href="/subscriptions" variant="primary">
              Build Your Subscription
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
