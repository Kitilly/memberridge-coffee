"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextAreaField } from "@/components/ui/Field";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { images } from "@/lib/images";

const amounts = [2500, 5000, 10000, 15000];

export function GiftCardForm() {
  const [amount, setAmount] = useState(amounts[1]);
  const [delivery, setDelivery] = useState<"Digital" | "Printed">("Digital");
  const { addGiftCard } = useCart();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addGiftCard({ amountCents: amount, delivery, image: images.productFlatLay });
      }}
      className="border border-espresso/15 p-8 sm:p-10 space-y-8"
    >
      <fieldset>
        <legend className="eyebrow text-espresso mb-3">Amount</legend>
        <div className="grid grid-cols-4 gap-2">
          {amounts.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => setAmount(a)}
              aria-pressed={a === amount}
              className={cn(
                "py-3 text-sm border transition-colors tabular",
                a === amount
                  ? "border-espresso bg-espresso text-ivory"
                  : "border-espresso/25 hover:border-espresso"
              )}
            >
              {formatPrice(a).replace(".00", "")}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-espresso mb-3">Delivery</legend>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["Digital", "By email, instantly"],
              ["Printed", "Letterpress card, mailed"],
            ] as const
          ).map(([value, note]) => (
            <button
              type="button"
              key={value}
              onClick={() => setDelivery(value)}
              aria-pressed={delivery === value}
              className={cn(
                "py-3 px-4 text-left border transition-colors",
                delivery === value
                  ? "border-espresso bg-espresso text-ivory"
                  : "border-espresso/25 hover:border-espresso"
              )}
            >
              <span className="block text-sm">{value}</span>
              <span className="block text-xs opacity-70">{note}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Recipient name" name="recipient" autoComplete="off" />
        {delivery === "Digital" ? (
          <Field label="Recipient email" name="recipientEmail" type="email" autoComplete="off" />
        ) : (
          <Field label="Your name" name="sender" autoComplete="name" />
        )}
        <TextAreaField label="Personal note" name="note" rows={3} optional className="sm:col-span-2" />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Add to Bag — <span className="tabular">{formatPrice(amount)}</span>
      </Button>
    </form>
  );
}
