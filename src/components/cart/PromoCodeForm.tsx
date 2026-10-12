"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function PromoCodeForm() {
  const { promo, applyPromo, removePromo } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (promo) {
    return (
      <div className="flex items-center justify-between bg-cream px-4 py-3 text-sm">
        <span className="flex items-center gap-2">
          <Tag size={14} className="text-copper-ink" aria-hidden />
          <span className="font-medium tracking-wide">{promo.code}</span>
          <span className="text-coffee">· {promo.label}</span>
        </span>
        <button onClick={removePromo} aria-label={`Remove code ${promo.code}`} className="p-1 -m-1 text-espresso/50 hover:text-espresso">
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const result = applyPromo(code);
        setError(result.ok ? null : result.error);
        if (result.ok) setCode("");
      }}
    >
      <label htmlFor="promo" className="block text-xs font-medium tracking-wide text-coffee mb-1.5">
        Discount code
      </label>
      <div className="flex">
        <input
          id="promo"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? "promo-error" : undefined}
          className="flex-1 min-w-0 border border-r-0 border-espresso/25 bg-transparent px-4 py-2.5 text-sm uppercase tracking-wide outline-none focus:border-espresso placeholder:normal-case placeholder:tracking-normal placeholder:text-espresso/35"
          placeholder="Enter code"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="border border-espresso px-5 text-[0.75rem] uppercase tracking-[0.14em] hover:bg-espresso hover:text-ivory transition-colors disabled:opacity-40"
        >
          Apply
        </button>
      </div>
      {error && (
        <p id="promo-error" role="alert" className="text-xs text-[#9b2c1f] mt-2">
          {error}
        </p>
      )}
    </form>
  );
}
