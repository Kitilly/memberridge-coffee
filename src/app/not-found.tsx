import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { RidgeMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <Container className="py-32 text-center max-w-xl">
      <RidgeMark className="h-8 w-auto mx-auto text-copper mb-8" />
      <p className="eyebrow text-copper-ink mb-4">404 · Page not found</p>
      <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mb-6">This trail doesn&rsquo;t lead anywhere.</h1>
      <p className="text-coffee mb-10">
        The page may have moved, or the lot may have sold through for the season.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <LinkButton href="/coffee" variant="primary">
          Shop Coffee
        </LinkButton>
        <LinkButton href="/" variant="outline">
          Back to Home
        </LinkButton>
      </div>
      <p className="mt-10 text-sm text-coffee">
        Looking for something specific?{" "}
        <Link href="/contact" className="text-espresso link-underline">
          Ask us
        </Link>
        .
      </p>
    </Container>
  );
}
