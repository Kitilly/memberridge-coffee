import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-espresso text-cream/85 text-[0.68rem] sm:text-[0.7rem] tracking-[0.14em] uppercase">
      <p className="mx-auto max-w-8xl px-6 py-2.5 text-center whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="hidden md:inline">Every bag roasted to order · </span>
        Free shipping over $45
        <span className="hidden sm:inline">
          {" "}
          ·{" "}
          <Link href="/subscriptions" className="text-gold underline-offset-4 hover:underline">
            Subscribe &amp; save 10%
          </Link>
        </span>
      </p>
    </div>
  );
}
