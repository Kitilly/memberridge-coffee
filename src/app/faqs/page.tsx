import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/faqs/Accordion";
import { faqCategories } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about ordering, shipping, subscriptions, brewing, and returns.",
};

export default function FAQsPage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Can't find what you're looking for? Reach out on our Contact page."
      />

      <div className="mt-16 space-y-16 max-w-3xl">
        {faqCategories.map((cat) => (
          <div key={cat.category}>
            <h2 className="eyebrow text-copper mb-6">{cat.category}</h2>
            <Accordion items={cat.questions} />
          </div>
        ))}
      </div>
    </Container>
  );
}
