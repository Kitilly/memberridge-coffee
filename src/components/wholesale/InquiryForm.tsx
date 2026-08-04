"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso placeholder:text-espresso/40";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-espresso/15 p-10 text-center">
        <h3 className="font-display text-2xl mb-3">Inquiry received</h3>
        <p className="text-coffee">
          Thank you — our wholesale team typically responds within two
          business days.
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
      className="border border-espresso/15 p-8 sm:p-10 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input required placeholder="Business name" className={inputClass} />
        <input required placeholder="Contact name" className={inputClass} />
        <input required type="email" placeholder="Email" className={inputClass} />
        <input placeholder="Phone (optional)" className={inputClass} />
      </div>
      <select required defaultValue="" className={inputClass}>
        <option value="" disabled>
          Business type
        </option>
        <option>Café or Restaurant</option>
        <option>Office</option>
        <option>Hotel or Hospitality</option>
        <option>Retail</option>
        <option>Other</option>
      </select>
      <select required defaultValue="" className={inputClass}>
        <option value="" disabled>
          Estimated monthly volume
        </option>
        <option>Under 25 lbs</option>
        <option>25–100 lbs</option>
        <option>100–300 lbs</option>
        <option>300+ lbs</option>
      </select>
      <textarea
        placeholder="Tell us about your business (optional)"
        rows={4}
        className={inputClass}
      />
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Submit Inquiry
      </Button>
    </form>
  );
}
