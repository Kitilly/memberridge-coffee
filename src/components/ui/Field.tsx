import { useId } from "react";
import { cn } from "@/lib/utils";

export const controlClass =
  "w-full border border-espresso/25 bg-transparent px-4 py-3 text-[0.95rem] text-espresso outline-none transition-colors placeholder:text-espresso/35 hover:border-espresso/45 focus:border-espresso";

type BaseProps = { label: string; hint?: string; className?: string; optional?: boolean };

function Label({ htmlFor, label, optional }: { htmlFor: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium tracking-wide text-coffee mb-1.5">
      {label}
      {optional && <span className="font-normal text-espresso/45"> (optional)</span>}
    </label>
  );
}

export function Field({
  label,
  hint,
  className,
  optional,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} optional={optional} />
      <input id={id} required={!optional} className={controlClass} aria-describedby={hint ? `${id}-hint` : undefined} {...props} />
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-espresso/50 mt-1.5">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  className,
  optional,
  children,
  ...props
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} optional={optional} />
      <select id={id} required={!optional} className={cn(controlClass, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 stroke=%22%232a1b14%22 stroke-width=%221.5%22><path d=%22M2 4l4 4 4-4%22/></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10")} {...props}>
        {children}
      </select>
    </div>
  );
}

export function TextAreaField({
  label,
  className,
  optional,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} optional={optional} />
      <textarea id={id} required={!optional} className={cn(controlClass, "resize-y min-h-28")} {...props} />
    </div>
  );
}
