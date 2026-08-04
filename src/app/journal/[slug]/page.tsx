import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { journalPosts } from "@/lib/data/content";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function JournalPostPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = journalPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article>
      <Container className="pt-16 pb-10 max-w-3xl">
        <p className="eyebrow text-copper mb-4">
          {post.category} · {formatDate(post.date)}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-light leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-sm text-espresso/50 mt-4">
          {post.author} · {post.readTime}
        </p>
      </Container>

      <Container className="pb-16">
        <div className="relative aspect-[16/9] max-w-4xl mx-auto overflow-hidden bg-cream">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Container className="max-w-2xl pb-24">
        <div className="space-y-6">
          {post.body.map((para, i) => (
            <p key={i} className="text-coffee leading-relaxed text-[1.05rem]">
              {para}
            </p>
          ))}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="pb-24 pt-16 border-t border-espresso/10">
          <p className="eyebrow text-espresso mb-10">Continue Reading</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-lg mt-4 leading-snug link-underline inline">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
