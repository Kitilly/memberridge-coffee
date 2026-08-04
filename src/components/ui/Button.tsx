import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-espresso text-ivory hover:bg-roast border border-espresso hover:border-roast",
  inverse:
    "bg-ivory text-espresso hover:bg-cream border border-ivory hover:border-cream",
  outline:
    "bg-transparent text-espresso border border-espresso/40 hover:border-espresso",
  "outline-inverse":
    "bg-transparent text-ivory border border-ivory/50 hover:border-ivory",
  ghost: "bg-transparent text-espresso border-0 underline-offset-4 hover:underline",
};

type Variant = keyof typeof variants;

const base =
  "inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ease-out disabled:opacity-40 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
