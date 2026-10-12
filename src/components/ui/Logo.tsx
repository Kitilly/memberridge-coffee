import { cn } from "@/lib/utils";

/**
 * The ridge mark: two peaks that read as an "M", resting on a horizon line —
 * Memberridge's name and the mountains its coffees grow on, in one stroke.
 */
export function RidgeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 22"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 17 L10 5 L15.5 12 L21 3 L30 17" />
      <path d="M6.5 20.5 H25.5" opacity={0.55} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <RidgeMark className="h-[18px] w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.6rem] tracking-[0.01em]">Memberridge</span>
        <span className="text-[0.55rem] font-medium uppercase tracking-[0.42em] mt-0.5 opacity-70 pl-px">
          Coffee Roasters
        </span>
      </span>
    </span>
  );
}
