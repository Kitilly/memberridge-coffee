"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-espresso/10 border-t border-b border-espresso/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg">{item.q}</span>
              <Plus
                size={18}
                strokeWidth={1.5}
                className={cn(
                  "text-copper shrink-0 transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              )}
              style={{ display: "grid" }}
            >
              <div className="overflow-hidden">
                <p className="text-coffee leading-relaxed max-w-2xl">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
