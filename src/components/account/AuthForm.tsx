"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [notice, setNotice] = useState(false);

  return (
    <>
      <h1 className="font-display text-5xl text-center mb-3">
        {mode === "signin" ? "Welcome back" : "Create an account"}
      </h1>
      <p className="text-coffee text-center mb-10">
        {mode === "signin"
          ? "Manage your orders, subscriptions, and saved coffees."
          : "Save your details for faster checkout and manage subscriptions in one place."}
      </p>

      <div role="tablist" aria-label="Account" className="grid grid-cols-2 border border-espresso/20 mb-10">
        {(["signin", "register"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setNotice(false);
            }}
            className={cn(
              "py-3 text-[0.8rem] uppercase tracking-[0.14em] transition-colors",
              mode === m ? "bg-espresso text-ivory" : "text-espresso hover:bg-cream"
            )}
          >
            {m === "signin" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
      >
        {mode === "register" && <Field label="Full name" name="name" autoComplete="name" />}
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          minLength={8}
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          hint={mode === "register" ? "At least 8 characters." : undefined}
        />
        <Button type="submit" variant="primary" className="w-full">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </Button>
        {notice && (
          <p role="status" className="text-sm text-coffee bg-cream px-4 py-3">
            Accounts aren&rsquo;t live in this preview yet — you can still check out as a guest.
          </p>
        )}
      </form>

      <div className="flex items-center justify-between mt-6 text-sm text-coffee">
        <Link href="/contact" className="link-underline">
          Forgot password?
        </Link>
        <Link href="/coffee" className="link-underline">
          Continue as guest
        </Link>
      </div>
    </>
  );
}
