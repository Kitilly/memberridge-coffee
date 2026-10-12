import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/wholesale/InquiryForm";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Wholesale coffee program for cafés, offices, and hospitality — consistent roasting, dedicated support, and flexible volume.",
};

const partners = [
  {
    title: "Cafés & Restaurants",
    body: "Consistent, cupped-and-scored lots with a dedicated account contact and training support for your bar team.",
  },
  {
    title: "Offices",
    body: "Bulk whole bean or pre-ground programs sized to your headcount, with recurring delivery so someone doesn't have to remember to reorder.",
  },
  {
    title: "Hotels & Hospitality",
    body: "Branded or house-label options, in-room and lobby service formats, and volume pricing for multi-property groups.",
  },
];

const included = [
  "Dedicated wholesale account contact",
  "Volume-based pricing tiers",
  "Custom roast profiles available at scale",
  "Equipment guidance and staff training",
  "Recurring or on-demand delivery scheduling",
  "Optional private label packaging",
];

export default function WholesalePage() {
  return (
    <>
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={images.cafeInterior}
          alt="Warm, dimly lit café interior"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-cream/90 mb-4">Wholesale</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">
            Coffee for Your Business
          </h1>
        </div>
      </section>

      <section className="py-28">
        <Container>
          <SectionHeading
            eyebrow="Who We Work With"
            title="Built for businesses that take coffee seriously"
            align="center"
            className="mx-auto mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {partners.map((p) => (
              <div key={p.title} className="text-center">
                <h3 className="font-display text-xl mb-3">{p.title}</h3>
                <p className="text-sm text-coffee leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-28 bg-cream">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow text-copper-ink mb-4">What&rsquo;s Included</p>
            <h2 className="font-display text-4xl leading-[1.1] mb-8">
              Every wholesale account gets
            </h2>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-coffee">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-copper-ink mb-4">Get Started</p>
            <h2 className="font-display text-4xl leading-[1.1] mb-8">
              Tell us about your business
            </h2>
            <InquiryForm />
          </div>
        </Container>
      </section>
    </>
  );
}
