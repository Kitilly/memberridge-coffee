import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { Accordion } from "@/components/faqs/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqCategories } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about ordering, shipping, subscriptions, brewing, and returns.",
  alternates: { canonical: "/faqs" },
};

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function FAQsPage() {
  return (
    <Container className="py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqCategories.flatMap((c) =>
            c.questions.map((q) => ({
              "@type": "Question",
              name: q.q,
              acceptedAnswer: { "@type": "Answer", text: q.a },
            }))
          ),
        }}
      />
      <SectionHeading
        eyebrow="Support"
        title="Frequently asked questions"
        description="Quick answers on ordering, subscriptions, brewing, and returns."
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16">
        <aside className="lg:sticky lg:top-28 h-fit">
          <nav aria-label="FAQ topics">
            <ul className="flex lg:flex-col flex-wrap gap-x-6 gap-y-3">
              {faqCategories.map((cat) => (
                <li key={cat.category}>
                  <a href={`#${anchor(cat.category)}`} className="text-sm text-coffee hover:text-espresso link-underline">
                    {cat.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block mt-12 bg-cream p-6">
            <p className="font-display text-2xl leading-tight mb-2">Still need a hand?</p>
            <p className="text-sm text-coffee mb-5">We reply within one business day.</p>
            <LinkButton href="/contact" variant="outline" className="w-full px-4">
              Contact Us
            </LinkButton>
          </div>
        </aside>

        <div className="space-y-16 max-w-3xl">
          {faqCategories.map((cat) => (
            <section key={cat.category} id={anchor(cat.category)} className="scroll-mt-28" aria-labelledby={`${anchor(cat.category)}-h`}>
              <h2 id={`${anchor(cat.category)}-h`} className="font-display text-3xl mb-4">
                {cat.category}
              </h2>
              <Accordion items={cat.questions} />
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
