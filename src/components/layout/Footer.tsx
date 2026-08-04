import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

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
    <footer className="bg-espresso text-cream/90 mt-32">
      <Container className="pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-16 pb-16 border-b border-cream/10">
          <div>
            <p className="font-display text-3xl text-ivory mb-4">Memberridge</p>
            <p className="text-sm leading-relaxed text-cream/70 max-w-sm mb-6">
              Roasted with Purpose. Shared with Passion. Small-batch specialty
              coffee, ethically sourced and roasted for the way you actually
              drink it.
            </p>
            <NewsletterForm tone="light" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow text-copper mb-4">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/70 hover:text-ivory transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8">
          <div className="text-xs text-cream/50 space-y-1">
            <p>&copy; {new Date().getFullYear()} Memberridge Coffee Co. All rights reserved.</p>
            <p>
              Roastery &amp; Flagship — 214 Ridge Street, Portland, OR · Open Daily
              7am–6pm
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-cream/60 hover:text-ivory transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-cream/60 hover:text-ivory transition-colors"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
