import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";

export function NewsletterBanner() {
  return (
    <section className="py-28 bg-espresso text-ivory">
      <Container className="text-center flex flex-col items-center">
        <p className="eyebrow text-gold mb-4">Stay in the Loop</p>
        <h2 className="font-display text-4xl sm:text-5xl font-light leading-[1.1] max-w-xl">
          Roasting notes, new arrivals, and the occasional discount.
        </h2>
        <p className="mt-5 text-cream/70 max-w-md">
          One email every couple of weeks. No spam, unsubscribe whenever you like.
        </p>
        <div className="mt-8">
          <NewsletterForm tone="light" />
        </div>
      </Container>
    </section>
  );
}
