"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso placeholder:text-espresso/40";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-espresso/15 p-10 text-center">
        <h3 className="font-display text-2xl mb-3">Message sent</h3>
        <p className="text-coffee">
          Thanks for reaching out — we typically reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input required placeholder="Name" className={inputClass} />
        <input required type="email" placeholder="Email" className={inputClass} />
      </div>
      <select required defaultValue="" className={inputClass}>
        <option value="" disabled>
          Topic
        </option>
        <option>Order Support</option>
        <option>Subscription</option>
        <option>Wholesale</option>
        <option>Press</option>
        <option>General Question</option>
      </select>
      <textarea required placeholder="Message" rows={6} className={inputClass} />
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
