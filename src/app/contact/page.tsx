import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Memberridge Coffee team.",
};

export default function ContactPage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Questions about an order, a subscription, or a partnership — we read every message."
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Mail size={18} strokeWidth={1.5} className="text-copper mt-0.5" />
            <div>
              <p className="text-sm text-coffee">Email</p>
              <p>hello@memberridgecoffee.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone size={18} strokeWidth={1.5} className="text-copper mt-0.5" />
            <div>
              <p className="text-sm text-coffee">Phone</p>
              <p>(503) 555-0142</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin size={18} strokeWidth={1.5} className="text-copper mt-0.5" />
            <div>
              <p className="text-sm text-coffee">Roastery &amp; Flagship</p>
              <p>214 Ridge Street, Portland, OR 97209</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock size={18} strokeWidth={1.5} className="text-copper mt-0.5" />
            <div>
              <p className="text-sm text-coffee">Support Hours</p>
              <p>Monday – Friday, 8am – 5pm PT</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
