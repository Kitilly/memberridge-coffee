"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [submitted, setSubmitted] = useState(false);
  const id = useId();
  const light = tone === "light";

  if (submitted) {
    return (
      <p role="status" className={cn("text-sm py-3 max-w-sm", light ? "text-cream/85" : "text-coffee")}>
        You&rsquo;re on the list. Use{" "}
        <span className={cn("font-medium tracking-wide", light ? "text-gold" : "text-espresso")}>WELCOME10</span> for
        10% off your first order.
      </p>
    );
  }

  return (
    <form
      className="flex items-stretch w-full max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className={cn(
          "flex-1 min-w-0 bg-transparent border-b py-3 text-sm outline-none transition-colors",
          light
            ? "border-cream/30 text-ivory placeholder:text-cream/45 focus:border-ivory"
            : "border-espresso/30 text-espresso placeholder:text-espresso/45 focus:border-espresso"
        )}
      />
      <button
        type="submit"
        className={cn(
          "eyebrow shrink-0 border-b py-3 pl-5 transition-colors",
          light ? "border-cream/30 text-ivory hover:text-gold" : "border-espresso/30 text-espresso hover:text-copper-ink"
        )}
      >
        Subscribe
      </button>
    </form>
  );
}
