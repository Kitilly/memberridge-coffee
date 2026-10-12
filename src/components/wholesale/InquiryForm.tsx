"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, SelectField, TextAreaField } from "@/components/ui/Field";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-espresso/15 bg-ivory p-10 text-center" role="status">
        <Check size={26} strokeWidth={1.5} className="mx-auto text-olive-ink mb-4" />
        <h3 className="font-display text-3xl mb-3">Inquiry received</h3>
        <p className="text-coffee">
          Thank you — our wholesale team typically responds within two business days with pricing and sample options.
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
      className="border border-espresso/15 bg-ivory p-8 sm:p-10 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business name" name="business" autoComplete="organization" />
        <Field label="Contact name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" optional />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField label="Business type" name="type" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Café or restaurant</option>
          <option>Office</option>
          <option>Hotel or hospitality</option>
          <option>Retail</option>
          <option>Other</option>
        </SelectField>
        <SelectField label="Monthly volume" name="volume" defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          <option>Under 25 lbs</option>
          <option>25–100 lbs</option>
          <option>100–300 lbs</option>
          <option>300+ lbs</option>
        </SelectField>
      </div>
      <TextAreaField label="Tell us about your business" name="notes" rows={4} optional />
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Request Pricing &amp; Samples
      </Button>
    </form>
  );
}
