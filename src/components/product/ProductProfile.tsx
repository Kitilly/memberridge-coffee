import type { Profile } from "@/lib/types";

const rows: { key: keyof Profile; label: string }[] = [
  { key: "acidity", label: "Acidity" },
  { key: "sweetness", label: "Sweetness" },
  { key: "body", label: "Body" },
];

export function ProductProfile({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-3">
      {rows.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-4">
          <span className="text-sm text-coffee w-24 shrink-0">{label}</span>
          <div className="flex gap-1.5 flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 ${
                  i <= profile[key] ? "bg-copper" : "bg-espresso/10"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
