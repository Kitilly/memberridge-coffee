import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Memberridge Coffee collects, uses, and protects your information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — name, email, shipping address, and payment details at checkout — along with basic usage data like pages visited and products viewed, used to improve the site.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to process orders, manage subscriptions, respond to support requests, and, if you've opted in, send occasional email updates about new coffees and offers.",
  },
  {
    title: "Payment Information",
    body: "Payment details are processed by our payment provider and are never stored on Memberridge servers in full.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep items in your cart, remember your preferences, and understand how the site is used. You can disable cookies in your browser, though some features may not work correctly.",
  },
  {
    title: "Sharing Your Information",
    body: "We don't sell your personal information. We share only what's necessary with service providers who help us operate — shipping carriers, payment processors, and email delivery services.",
  },
  {
    title: "Your Choices",
    body: "You can unsubscribe from marketing emails at any time using the link in any email, and can request access to or deletion of your data by contacting hello@memberridgecoffee.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-20 max-w-3xl">
      <SectionHeading
        eyebrow="Policies"
        title="Privacy Policy"
        description="Last updated July 2026."
      />
      <div className="mt-14 space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl mb-3">{s.title}</h2>
            <p className="text-coffee leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
