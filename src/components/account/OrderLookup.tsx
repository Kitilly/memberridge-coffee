"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

const stages = ["Order placed", "Roasting", "Resting & packing", "Shipped", "Delivered"];

export function OrderLookup() {
  const [looked, setLooked] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLooked(String(new FormData(e.currentTarget).get("order") ?? "").toUpperCase());
        }}
        className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end"
      >
        <Field label="Order number" name="order" placeholder="MR-10482" autoComplete="off" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Button type="submit" variant="primary" className="h-[50px]">
          Track
        </Button>
      </form>

      <div>
        <p className="eyebrow text-copper-ink mb-6">How an order moves</p>
        <ol className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {stages.map((s, i) => (
            <li key={s} className="border-t-2 border-espresso/15 pt-4">
              <span className="font-display text-2xl text-copper-ink tabular">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm mt-1">{s}</p>
            </li>
          ))}
        </ol>
      </div>

      {looked && (
        <p role="status" className="bg-cream px-5 py-4 text-sm text-coffee">
          We couldn&rsquo;t look up <span className="text-espresso font-medium">{looked}</span> — live order tracking
          isn&rsquo;t connected in this preview. Your confirmation email includes a carrier tracking link once the order
          ships.
        </p>
      )}
    </div>
  );
}
