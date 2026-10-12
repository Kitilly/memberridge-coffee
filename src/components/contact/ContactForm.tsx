"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, SelectField, TextAreaField } from "@/components/ui/Field";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-espresso/15 p-10 text-center" role="status">
        <Check size={26} strokeWidth={1.5} className="mx-auto text-olive-ink mb-4" />
        <h3 className="font-display text-3xl mb-3">Message sent</h3>
        <p className="text-coffee">Thanks for reaching out — we typically reply within one business day.</p>
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
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
      </div>
      <Field label="Order number" name="order" optional placeholder="MR-10482" hint="Helps us find your order faster." />
      <SelectField label="Topic" name="topic" defaultValue="">
        <option value="" disabled>
          Choose a topic
        </option>
        <option>Order support</option>
        <option>Subscription</option>
        <option>Wholesale</option>
        <option>Press</option>
        <option>General question</option>
      </SelectField>
      <TextAreaField label="Message" name="message" rows={6} />
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
