"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full border border-espresso/25 bg-transparent px-4 py-3 text-sm outline-none focus:border-espresso placeholder:text-espresso/40";

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "register">("signin");

  return (
    <>
      <h1 className="font-display text-4xl font-light text-center mb-2">
        {mode === "signin" ? "Sign In" : "Create an Account"}
      </h1>
      <p className="text-coffee text-center mb-10">
        {mode === "signin"
          ? "Access your orders, subscriptions, and wishlist."
          : "Save your details for faster checkout next time."}
      </p>

      <div className="flex border border-espresso/20 mb-10">
        <button
          onClick={() => setMode("signin")}
          className={`flex-1 py-3 text-sm ${
            mode === "signin" ? "bg-espresso text-ivory" : "text-espresso"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 py-3 text-sm ${
            mode === "register" ? "bg-espresso text-ivory" : "text-espresso"
          }`}
        >
          Register
        </button>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {mode === "register" && (
          <input required placeholder="Full name" className={inputClass} />
        )}
        <input required type="email" placeholder="Email" className={inputClass} />
        <input required type="password" placeholder="Password" className={inputClass} />
        <Button type="submit" variant="primary" className="w-full">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="flex items-center justify-between mt-6 text-sm text-coffee">
        <Link href="#" className="link-underline">
          Forgot password?
        </Link>
        <Link href="/coffee" className="link-underline">
          Continue as guest
        </Link>
      </div>
    </>
  );
}
