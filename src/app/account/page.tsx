import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AuthForm } from "@/components/account/AuthForm";

export const metadata: Metadata = {
  robots: { index: false },
  title: "Account",
  description: "Sign in or create a Memberridge Coffee account.",
};

export default function AccountPage() {
  return (
    <Container className="py-24 max-w-md">
      <AuthForm />
    </Container>
  );
}
