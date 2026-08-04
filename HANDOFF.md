# Memberridge Coffee — Handoff

Status: **design-first foundation, fully built and verified**. Every page in the brief exists, every internal link resolves, lint/typecheck/production build all pass clean. No real backend, payments, or auth are wired up — see [What's Mocked](#whats-mocked-vs-real) before treating anything as production-ready.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — theme tokens live in `src/app/globals.css` under `@theme inline` (no `tailwind.config.js`; v4 uses CSS-based config)
- **lucide-react** for icons (note: this major version dropped brand/social icons — see [Known Quirks](#known-quirks))
- No other runtime dependencies besides `clsx` / `tailwind-merge` (the `cn()` helper in `src/lib/utils.ts`)

## Running It

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — also regenerates typed-route types
npm run lint
```

If port 3000 is taken, `next dev` will pick another port automatically.

## Architecture

```
src/
  app/                      routes (App Router — one folder per URL segment)
  components/
    ui/                     Button, Container, SectionHeading — primitives used everywhere
    layout/                 Header (mega-menu + mobile drawer), Footer
    cart/                   CartDrawer (slide-out, driven by cart-context)
    product/                ProductCard, ProductGallery, ProductProfile, PurchasePanel, ReviewsList
    home/                   one component per homepage section
    coffee/                 CoffeeCollection (filter/sort client component)
    account/, contact/, faqs/, gift-cards/, subscriptions/, wholesale/, icons/
  lib/
    types.ts                Product, Review, SizeOption, Profile types
    data/products.ts        9 products, fully specced (origin, process, flavor notes, sizes, reviews)
    data/content.ts         brewMethods, origins, testimonials, journalPosts, navLinks, locations, faqCategories
    images.ts                single source of truth for every image URL (see below)
    cart-context.tsx        client cart state, persisted to localStorage
    wishlist-context.tsx    same pattern, for wishlist
    utils.ts                cn() (tailwind-merge) and formatPrice()
```

Providers (`CartProvider`, `WishlistProvider`) and the persistent `Header`/`Footer`/`CartDrawer` are wired in `src/app/layout.tsx`. Every page renders inside that shell.

## Page Inventory (27 routes)

| Section | Routes |
|---|---|
| Shop | `/`, `/coffee`, `/coffee/[slug]` (×9 products), `/cart`, `/checkout`, `/gift-cards` |
| Brand | `/about`, `/education`, `/education/brewing-guides`, `/education/brewing-guides/[slug]` (×6 methods), `/journal`, `/journal/[slug]` (×5 posts) |
| Programs | `/subscriptions`, `/wholesale` |
| Support | `/locations`, `/faqs`, `/contact` |
| Account | `/account`, `/account/wishlist`, `/account/orders` |
| Legal | `/policies/shipping`, `/policies/privacy` |

All confirmed dead-link-free by a full-repo href audit.

## What's Mocked vs. Real

**Real / functional:**
- Cart and wishlist — actual client state, persisted in `localStorage`, survives reload
- Product filtering, sorting, grind/size/subscription selection — all live logic against the in-memory product data
- Forms (contact, wholesale inquiry, checkout, account sign-in/register, newsletter) — client-side validation and a success state, but **submit to nowhere**. No emails sent, no data stored.
- Checkout — collects shipping/payment fields for UI completeness only. The submit handler just clears the cart and shows a confirmation screen. **No payment is processed.**

**Not real — needs to be built before launch:**
- Payment processing (Stripe or similar)
- A database for products, orders, accounts, subscriptions (Supabase is already connected to this environment if you want to use it)
- Real authentication (the `/account` sign-in/register form has no backend)
- Email delivery (order confirmations, newsletter signups, contact form submissions)
- Order tracking (currently a static empty state)
- Shipping-rate calculation (checkout shipping cost is a hardcoded flat rate)

## Content

All product, brewing, origin, testimonial, journal, and location content is **fictional placeholder copy** written to be realistic and specific (no lorem ipsum) — but none of it is real. Before launch, replace:
- `src/lib/data/products.ts` — swap in real SKUs, pricing, origin data
- `src/lib/data/content.ts` — real store locations/hours, real journal posts, real testimonials (the current ones are invented)

## Photography

`src/lib/images.ts` is the single place every image URL lives — all Unsplash stock, chosen as placeholders per your explicit direction (see conversation history). **Important:** a chunk of these were originally picked from memory and turned out to point at completely unrelated photos (onions, a sandwich, a guitar, a shoe, a YouTube screenshot) — those were caught during a visual audit and replaced with images verified through live Unsplash search + alt text, not guessed IDs. All current images are confirmed correct content, but they're still generic stock, not real Memberridge photography, and several are a color-palette mismatch (a couple of product shots lean teal/green rather than the brand's warm espresso tones). **Before launch: replace every URL in this file with real photography.** The `images` object's key names describe intended usage, so swapping is a 1:1 mapping exercise.

## Design System Reference

Colors, fonts, and animation tokens are defined once in `src/app/globals.css`:

- Espresso `#2A1B14`, Roast `#3B2A21`, Cream `#F7F3EC`, Ivory `#FAF8F5` (primary)
- Coffee `#6A4E3A`, Copper `#B87333`, Olive `#707A52`, Sage `#A7B39A` (secondary)
- Gold `#C99846` (accent)
- Headings: Fraunces (variable font, `font-display`) · Body: Inter (`font-sans`)

Use the existing `Button`, `LinkButton`, `Container`, and `SectionHeading` components rather than hand-rolling new patterns — they encode the spacing/typography rules consistently across every page.

## Known Quirks

- **`lucide-react` v1.x dropped all brand/social icons** (Instagram, Facebook, etc. no longer exist in the package). Custom minimal SVGs for these live in `src/components/icons/SocialIcons.tsx` — extend that file rather than trying to import a brand icon from lucide-react directly.
- **Fraunces must be loaded with `weight: "variable"`** when combined with the `axes` option (`opsz`/`SOFT`/`WONK`) — passing a discrete weight array alongside `axes` throws a build error in `next/font/google`. See `src/app/layout.tsx`.
- **`Image fill` requires the *immediate* parent to be positioned**, not just an ancestor. Already fixed once in `ProductCard.tsx` (the `<Link>` wrapper needed `relative`, not just its parent `<div>`) — worth remembering if you add more `fill` images inside a `<Link>`.
- `.claude/launch.json` configures the dev preview server for this environment's browser tool — irrelevant to a normal `npm run dev` workflow, safe to ignore or delete.

## Next Steps, Roughly in Order

1. Swap photography for real Memberridge shoots
2. Replace placeholder product/content data with real SKUs and copy
3. Wire a database (Supabase is available) for products, orders, accounts
4. Add Stripe (or similar) for real checkout
5. Add real auth for `/account`
6. Wire form submissions (contact, wholesale, newsletter) to an email/CRM service
7. Add order tracking once orders are real
