import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

const rows: { key: keyof Profile; label: string }[] = [
  { key: "acidity", label: "Acidity" },
  { key: "sweetness", label: "Sweetness" },
  { key: "body", label: "Body" },
];

export function ProductProfile({ profile, compact = false }: { profile: Profile; compact?: boolean }) {
  return (
    <dl className={cn(compact ? "space-y-1.5" : "space-y-3")}>
      {rows.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-4">
          <dt className={cn("text-coffee shrink-0", compact ? "text-xs w-16" : "text-sm w-24")}>{label}</dt>
          <dd className="flex gap-1 flex-1" aria-label={`${profile[key]} out of 5`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                aria-hidden
                className={cn(compact ? "h-1" : "h-1.5", "flex-1", i <= profile[key] ? "bg-copper" : "bg-espresso/10")}
              />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
