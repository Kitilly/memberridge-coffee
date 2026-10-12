import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journalPosts } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on sourcing, brewing, and the craft behind Memberridge Coffee.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function JournalPage() {
  const [featured, ...rest] = journalPosts;

  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Journal"
        title="Notes from the roastery"
        description="Sourcing decisions, brewing fundamentals, and the thinking behind how we work."
      />

      <Link
        href={`/journal/${featured.slug}`}
        className="group mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          <p className="eyebrow text-copper-ink mb-4">
            {featured.category} · {formatDate(featured.date)}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight link-underline inline">
            {featured.title}
          </h2>
          <p className="text-coffee mt-4 leading-relaxed">{featured.excerpt}</p>
          <p className="text-xs text-espresso/50 mt-4">{featured.readTime}</p>
        </div>
      </Link>

      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {rest.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="eyebrow text-copper-ink mt-5 mb-3">
              {post.category} · {formatDate(post.date)}
            </p>
            <h3 className="font-display text-xl leading-snug link-underline inline">
              {post.title}
            </h3>
            <p className="text-sm text-coffee mt-3 leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
