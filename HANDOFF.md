# Memberridge Coffee — Handoff

Status: **front-end complete, audited, and polished**. Every page in the brief exists, every internal link resolves, and lint, typecheck, and the production build all pass. This is a front-end-only build: no real backend, payments, or auth — see [What's Mocked](#whats-mocked-vs-real) before treating anything as production-ready.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — theme tokens live in `src/app/globals.css` under `@theme inline` (no `tailwind.config.js`; v4 uses CSS-based config)
- **lucide-react** for icons (this major version dropped brand/social icons — see [Known Quirks](#known-quirks))
- No other runtime dependencies besides `clsx` / `tailwind-merge` (the `cn()` helper in `src/lib/utils.ts`)

## Running It

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — also regenerates typed-route types
npm run lint
```

## Architecture

```
src/
  app/                      routes (App Router), plus sitemap.ts, robots.ts, icon.svg,
                            opengraph-image.tsx, not-found.tsx, template.tsx (page fade-in)
  components/
    ui/                     Button, Container, SectionHeading, Field (labelled inputs),
                            Logo/RidgeMark, Breadcrumbs, CountUp
    layout/                 Header (mega-menu, mobile menu), SearchDialog, AnnouncementBar, Footer
    cart/                   CartDrawer, CartView, PromoCodeForm, OrderTotals
    checkout/               CheckoutView
    product/                ProductCard, ProductGallery, ProductProfile, PurchasePanel,
                            ReviewsList, RecentlyViewed
    home/                   one component per homepage section (+ CoffeeBeltMap, Stats)
    coffee/                 CoffeeCollection (filters, sort, compare)
    seo/                    JsonLd
    account/, contact/, faqs/, gift-cards/, subscriptions/, wholesale/, icons/
  lib/
    types.ts                Product, Review, SizeOption, Profile types
    data/products.ts        9 products, fully specced, with per-category reviews
    data/content.ts         brewMethods, origins (with lat/lon), testimonials, journalPosts,
                            navLinks, locations, faqCategories
    data/land-dots.ts       generated dot grid for the origins map (see below)
    images.ts               single source of truth for every image URL
    cart-context.tsx        cart, promo codes, shipping rules — persisted to localStorage
    wishlist-context.tsx    wishlist, persisted to localStorage
    recently-viewed.ts      recently viewed products, persisted to localStorage
    search.ts               client-side search index over products, guides, journal, pages
    use-modal.ts            shared overlay behaviour: Esc, focus trap, scroll lock, focus return
    map-projection.ts       lat/lon → map coordinates
    site.ts                 site name, URL, contact details used in metadata and schema
```

## Page Inventory

| Section | Routes |
|---|---|
| Shop | `/`, `/coffee`, `/coffee/[slug]` (×9), `/cart`, `/checkout`, `/gift-cards` |
| Brand | `/about`, `/education`, `/education/brewing-guides`, `/education/brewing-guides/[slug]` (×6), `/journal`, `/journal/[slug]` (×5) |
| Programs | `/subscriptions`, `/wholesale` |
| Support | `/locations`, `/faqs`, `/contact` |
| Account | `/account`, `/account/wishlist`, `/account/orders` |
| Legal | `/policies/shipping`, `/policies/privacy` |
| Generated | `/sitemap.xml`, `/robots.txt`, `/icon.svg`, `/opengraph-image`, branded 404 |

## Features

**Shopping**
- Instant search (header icon, `Ctrl/⌘+K`, or `/`) across coffees, flavors, origins, guides, and journal, with keyboard navigation and popular-search suggestions
- Collection filters by category, roast, flavor family, and price, with removable filter chips and live counts
- Compare up to three coffees side by side
- Product pages: gallery with hover zoom and arrow-key thumbnails, flavor profile, grind/size/subscription selection, price per 100g, sticky add-to-bag bar, breadcrumbs, origin story, brew recommendations linked to guides, reviews, related coffees, recently viewed
- Quick add on product cards (hover on desktop, always-visible button on touch devices)
- Cart drawer with free-shipping progress; cart page with recommendations
- Discount codes — try these:
  - `WELCOME10` — 10% off (the newsletter signup also hands this out)
  - `RIDGE15` — 15% off coffee orders over $60
  - `SHIPFREE` — free standard shipping
- Checkout with labelled, autofill-friendly fields and an order confirmation screen

**Brand & motion**
- Interactive coffee-belt map on the homepage and About page
- Animated counters, scroll-linked reveals (pure CSS), slow hero zoom, quiet page fade-in
- All motion respects `prefers-reduced-motion`

**Accessibility**
- Skip-to-content link, visible focus rings, labelled form fields throughout
- Every overlay (search, cart, menus, filters, compare) closes on Esc, traps focus, and restores it
- Screen-reader announcements when items are added to the bag
- Contrast-checked palette (see Design System)

**SEO**
- Per-page titles, descriptions, canonical URLs, and Open Graph tags
- Structured data: Organization, WebSite, Product (with offers and reviews), BreadcrumbList, Article, FAQPage, and CafeOrCoffeeShop
- Sitemap and robots; cart, checkout, and account pages are `noindex`

## What's Mocked vs. Real

**Real / functional (in the browser):**
- Cart, wishlist, recently viewed, promo codes — real client state in `localStorage`
- Filtering, sorting, comparison, search — live logic over the in-memory catalog

**Not real — needs a backend before launch:**
- Payment processing (checkout shows a clear "no payment is processed" note)
- Accounts and sign-in (the form explains accounts aren't live yet)
- Order tracking (the lookup form explains it isn't connected)
- Form delivery — contact, wholesale, newsletter, and gift-card recipients go nowhere
- Promo codes are hard-coded in `cart-context.tsx`; real codes belong server-side

## Content & Photography

All product, origin, testimonial, journal, location, and stats content is **fictional placeholder copy** — realistic and specific, but invented. Replace before launch:
- `src/lib/data/products.ts` and `src/lib/data/content.ts`
- The stats band in `src/components/home/Stats.tsx`

`src/lib/images.ts` holds every image URL. All are Unsplash stock, each verified visually against live search results — never guessed IDs (an early pass of guessed IDs produced onions, a sandwich, and a guitar). Every coffee now has its own warm-toned lead image. **Replace with real Memberridge photography before launch**; the key names describe each image's role.

## Design System

Defined once in `src/app/globals.css`:

- Espresso `#2A1B14`, Roast `#3B2A21`, Cream `#F7F3EC`, Ivory `#FAF8F5`
- Coffee `#6A4E3A`, Copper `#B87333`, Olive `#707A52`, Sage `#A7B39A`, Gold `#C99846`
- **Text-safe variants**: copper and olive fail WCAG AA (4.5:1) as small text on ivory, so text uses `copper-ink` `#8A5323` (5.9:1) and `olive-ink` `#57603D` (6.3:1). Keep plain `copper`/`olive` for icons, fills, and rules. On dark backgrounds, use `gold` for small text.
- Headings: **Cormorant Garamond** (`font-display`, weight 500 by default, old-style figures). Body: **Inter** (`font-sans`).
- Add `tabular` to any price or number; it switches to lining, tabular figures so prices align and don't bob.

Use `Button`/`LinkButton`, `Container`, `SectionHeading`, and `Field` rather than hand-rolling — they carry the spacing, type, and accessibility rules.

## Known Quirks

- **lucide-react v1 has no brand icons.** Social glyphs live in `src/components/icons/SocialIcons.tsx`.
- **Next 16 renamed `priority` to `preload`** on `next/image`.
- **`Image fill` needs a positioned *immediate* parent**, not just an ancestor.
- **Sticky columns inside grids need `self-start` or `h-fit`**, or the grid stretches them and they never stick.
- **No `<ViewTransition>`, on purpose.** React's view transitions were tried for page crossfades, but a stalled transition blocks every later state update (seen in testing), so a page you're sharing could stop responding to clicks. `template.tsx` gives a plain CSS fade instead. It's opacity-only and uses `backwards` fill, so it never leaves a stacking context or transform that would trap the fixed-position dialogs.
- **The origins map dots** (`src/lib/data/land-dots.ts`) were generated once from Natural Earth 110m land data on a 2.5° grid; the generator isn't part of the repo. The map is a server component, so the ~1,100 dots ship as markup, not JavaScript. If you change the latitude band, also update the bounds in `src/lib/map-projection.ts`.
- `.claude/launch.json` only configures this environment's preview tool; it's safe to ignore.

## Next Steps

1. Real photography and real product/content data
2. A backend — a database for products, orders, and accounts (Supabase is available), Stripe for checkout, and real auth
3. Wire forms to email/CRM; move promo codes server-side
4. Optional: dark mode (the brief lists it as optional; not implemented)
