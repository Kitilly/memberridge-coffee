"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="divide-y divide-espresso/10 border-y border-espresso/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={`${base}-b${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
              >
                <span className="font-display text-xl group-hover:text-copper-ink transition-colors">{item.q}</span>
                <Plus
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden
                  className={cn("text-copper shrink-0 transition-transform duration-300", isOpen && "rotate-45")}
                />
              </button>
            </h3>
            <div
              id={`${base}-p${i}`}
              role="region"
              aria-labelledby={`${base}-b${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="text-coffee leading-relaxed max-w-2xl pb-6">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
