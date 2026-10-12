import { CountUp } from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";

const stats = [
  { value: 6, suffix: "", label: "Origin countries", note: "Three continents, one standard" },
  { value: 38, suffix: "", label: "Partner farms", note: "Most for five harvests or more" },
  { value: 48, suffix: "h", label: "Roast to bag", note: "Packed within two days of roasting" },
  { value: 24, suffix: "kg", label: "Largest batch", note: "Small enough to roast by ear" },
];

export function Stats({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "px-6 reveal flex flex-col-reverse justify-end",
            i > 0 && "lg:border-l",
            i % 2 === 1 && "border-l lg:border-l",
            tone === "dark" ? "border-ivory/15" : "border-espresso/10"
          )}
        >
          <dt className="mt-3">
            <span className={cn("eyebrow block", tone === "dark" ? "text-gold" : "text-copper-ink")}>{s.label}</span>
            <span className={cn("block text-sm mt-1.5", tone === "dark" ? "text-cream/60" : "text-coffee")}>{s.note}</span>
          </dt>
          <dd className="font-display text-6xl sm:text-7xl leading-none">
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
