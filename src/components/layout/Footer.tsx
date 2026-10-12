import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "All Coffee", href: "/coffee" },
      { label: "Single Origin", href: "/coffee?category=single-origin" },
      { label: "Blends", href: "/coffee?category=blend" },
      { label: "Espresso", href: "/coffee?category=espresso" },
      { label: "Subscriptions", href: "/subscriptions" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Coffee Education", href: "/education" },
      { label: "Brewing Guides", href: "/education/brewing-guides" },
      { label: "Journal", href: "/journal" },
      { label: "Farm Origins", href: "/about#origins" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Wholesale", href: "/wholesale" },
      { label: "Locations", href: "/locations" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign In", href: "/account" },
      { label: "Order Tracking", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Shipping & Returns", href: "/policies/shipping" },
      { label: "Privacy Policy", href: "/policies/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-roast text-cream/90">
      <Container className="pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-16 pb-16 border-b border-cream/10">
          <div>
            <Link href="/" aria-label="Memberridge Coffee — home" className="text-ivory">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed text-cream/70 max-w-sm mt-6 mb-8">
              Roasted with purpose, shared with passion. Small-batch specialty
              coffee, ethically sourced and roasted to order in Portland, Oregon.
            </p>
            <p className="eyebrow text-gold mb-3">Roasting notes, every other week</p>
            <NewsletterForm tone="light" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="eyebrow text-gold mb-5">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-cream/70 hover:text-ivory transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-b border-cream/10 text-sm">
          <div>
            <p className="eyebrow text-gold mb-3">Roastery &amp; Flagship</p>
            <address className="not-italic text-cream/70 leading-relaxed">
              214 Ridge Street
              <br />
              Portland, OR 97209
            </address>
          </div>
          <div>
            <p className="eyebrow text-gold mb-3">Hours</p>
            <p className="text-cream/70 leading-relaxed">
              Mon – Fri · 7am – 6pm
              <br />
              Sat – Sun · 8am – 6pm
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold mb-3">Contact</p>
            <p className="text-cream/70 leading-relaxed">
              <a href={`mailto:${SITE.email}`} className="hover:text-ivory">{SITE.email}</a>
              <br />
              <a href={`tel:${SITE.phone}`} className="hover:text-ivory">(503) 555-0142</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8">
          <p className="text-xs text-cream/50">
            &copy; {new Date().getFullYear()} Memberridge Coffee Co. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href={SITE.social[0]} target="_blank" rel="noreferrer" aria-label="Memberridge on Instagram" className="text-cream/60 hover:text-ivory transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href={SITE.social[1]} target="_blank" rel="noreferrer" aria-label="Memberridge on Facebook" className="text-cream/60 hover:text-ivory transition-colors">
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
