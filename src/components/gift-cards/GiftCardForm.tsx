"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const amounts = [2500, 5000, 10000, 15000];

const inputClass =
  "w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso placeholder:text-espresso/40";

export function GiftCardForm() {
  const [amount, setAmount] = useState(amounts[1]);
  const [delivery, setDelivery] = useState<"email" | "print">("email");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      product: {
        id: "gift-card",
        slug: "gift-card",
        name: "Memberridge Gift Card",
        category: "espresso",
        shortDescription: "",
        description: [],
        origin: {
          country: "",
          region: "",
          producer: "",
          altitude: "",
          variety: "",
          process: "",
          harvestSeason: "",
        },
        roastLevel: "Medium",
        flavorNotes: [],
        profile: { acidity: 1, sweetness: 1, body: 1 },
        brewRecommendations: [],
        grindOptions: ["N/A"],
        sizes: [{ label: delivery === "email" ? "Digital" : "Print", grams: 0, priceCents: amount }],
        images: ["https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&q=80&w=800"],
        rating: 5,
        reviewCount: 0,
        subscriptionDiscountPercent: 0,
        reviews: [],
      },
      sizeIndex: 0,
      grind: "N/A",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="border border-espresso/15 p-8 sm:p-10 space-y-8">
      <div>
        <p className="eyebrow text-espresso mb-3">Choose an Amount</p>
        <div className="flex flex-wrap gap-2">
          {amounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={cn(
                "px-5 py-2.5 text-sm border transition-colors",
                a === amount
                  ? "border-espresso bg-espresso text-ivory"
                  : "border-espresso/25 text-espresso hover:border-espresso"
              )}
            >
              {formatPrice(a)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow text-espresso mb-3">Delivery Method</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDelivery("email")}
            className={cn(
              "px-5 py-2.5 text-sm border transition-colors",
              delivery === "email"
                ? "border-espresso bg-espresso text-ivory"
                : "border-espresso/25 text-espresso hover:border-espresso"
            )}
          >
            Email (Instant)
          </button>
          <button
            onClick={() => setDelivery("print")}
            className={cn(
              "px-5 py-2.5 text-sm border transition-colors",
              delivery === "print"
                ? "border-espresso bg-espresso text-ivory"
                : "border-espresso/25 text-espresso hover:border-espresso"
            )}
          >
            Printed Card (Mailed)
          </button>
        </div>
      </div>

      {delivery === "email" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Recipient email" type="email" className={inputClass} />
          <input placeholder="Recipient name" className={inputClass} />
          <textarea
            placeholder="Personal message (optional)"
            rows={3}
            className={cn(inputClass, "sm:col-span-2")}
          />
        </div>
      )}

      <Button variant="primary" className="w-full" onClick={handleAdd}>
        {added ? "Added to Bag" : `Add to Bag — ${formatPrice(amount)}`}
      </Button>
    </div>
  );
}
