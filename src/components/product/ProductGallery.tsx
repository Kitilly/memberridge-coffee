"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const main = (
    <Image
      src={images[active]}
      alt={`${name} — image ${active + 1} of ${images.length}`}
      fill
      preload
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover transition-transform duration-300 ease-out"
      style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
    />
  );

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div
        className="relative aspect-[4/5] bg-cream overflow-hidden [@media(hover:hover)]:cursor-zoom-in"
        onMouseMove={(e) => {
          if (!window.matchMedia("(hover: hover)").matches) return;
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        {main}
        <p className="absolute bottom-4 right-4 text-[0.7rem] tracking-[0.14em] bg-ivory/90 px-2.5 py-1 tabular" aria-hidden>
          {active + 1} / {images.length}
        </p>
      </div>
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={`${name} images`}
          className="mt-4 grid grid-cols-4 gap-3"
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            const next = (active + (e.key === "ArrowRight" ? 1 : -1) + images.length) % images.length;
            setActive(next);
            (e.currentTarget.children[next] as HTMLElement)?.focus();
          }}
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square bg-cream overflow-hidden transition-opacity",
                i === active ? "ring-1 ring-espresso ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"
              )}
              aria-label={`Show image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="140px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
