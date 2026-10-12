import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data/content";

export function Reviews() {
  return (
    <section className="py-28">
      <Container>
        <SectionHeading
          eyebrow="From Our Customers"
          title="Trusted by people who take coffee seriously"
          align="center"
          className="mx-auto mb-16"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              className={i === 1 ? "lg:mt-10 reveal" : "reveal"}
            >
              <Quote size={28} strokeWidth={1} className="text-copper-ink mb-5" />
              <blockquote className="font-display text-xl leading-snug text-espresso">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium text-espresso">{t.author}</span>
                <span className="text-coffee"> — {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
