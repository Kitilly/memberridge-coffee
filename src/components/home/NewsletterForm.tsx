"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <form
      className="flex items-stretch max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("submitted");
      }}
    >
      {status === "submitted" ? (
        <p
          className={cn(
            "text-sm py-3",
            tone === "light" ? "text-ivory" : "text-espresso"
          )}
        >
          You&rsquo;re on the list — welcome.
        </p>
      ) : (
        <>
          <input
            type="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            className={cn(
              "flex-1 min-w-0 bg-transparent border-b py-3 text-sm outline-none placeholder:text-current placeholder:opacity-50",
              tone === "light"
                ? "border-cream/30 text-ivory focus:border-ivory"
                : "border-espresso/30 text-espresso focus:border-espresso"
            )}
          />
          <button
            type="submit"
            className={cn(
              "eyebrow shrink-0 border-b py-3 pl-4 transition-colors",
              tone === "light"
                ? "border-cream/30 text-ivory hover:border-ivory"
                : "border-espresso/30 text-espresso hover:border-espresso"
            )}
          >
            Sign Up
          </button>
        </>
      )}
    </form>
  );
}
