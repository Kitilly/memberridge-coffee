"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { navLinks } from "@/lib/data/content";
import { products } from "@/lib/data/products";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useModal } from "@/lib/use-modal";
import { cn, formatPrice } from "@/lib/utils";

const menuFeature = products.find((p) => p.slug === "kirinyaga-peak") ?? products[0];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { itemCount, openCart } = useCart();
  const { slugs } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd/Ctrl+K or "/" opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, select");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI when the route changes
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // The homepage hero runs under the header, so the header starts light.
  const overHero = pathname === "/" && !scrolled && !openMenu;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,border-color,color] duration-500",
          overHero
            ? "bg-transparent border-b border-transparent text-ivory"
            : "bg-ivory/95 backdrop-blur-sm border-b border-espresso/10 text-espresso"
        )}
      >
        <Container className="relative flex h-20 items-center justify-between">
          <button
            className="xl:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link href="/" aria-label="Memberridge Coffee — home" className="xl:mr-auto shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden xl:flex items-center gap-8 h-full">
            {navLinks.map((item) => {
              const isOpen = openMenu === item.label;
              const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <div
                  key={item.label}
                  className="h-full flex items-center"
                  onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenMenu(null);
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "eyebrow whitespace-nowrap transition-opacity",
                      isCurrent ? "opacity-100" : "opacity-75 hover:opacity-100"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.columns && (
                    <button
                      onClick={() => setOpenMenu(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      aria-label={`${item.label} menu`}
                      className="ml-1 p-1 opacity-60 hover:opacity-100"
                    >
                      <ChevronDown
                        size={13}
                        className={cn("transition-transform duration-300", isOpen && "rotate-180")}
                      />
                    </button>
                  )}

                  {item.columns && isOpen && (
                    <div className="absolute inset-x-0 top-full text-espresso">
                      <div className="mx-6 sm:mx-10 lg:mx-16 bg-ivory border border-espresso/10 shadow-xl shadow-espresso/5 animate-overlay">
                        <div className="grid grid-cols-[1fr_1fr_1.3fr] gap-12 p-10">
                          {item.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="eyebrow text-copper-ink mb-5">{col.heading}</p>
                              <ul className="space-y-3.5">
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="font-display text-xl hover:text-copper-ink transition-colors"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link href={`/coffee/${menuFeature.slug}`} className="group grid grid-cols-[120px_1fr] gap-5 items-center">
                            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                              <Image
                                src={menuFeature.images[0]}
                                alt=""
                                fill
                                sizes="120px"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <div>
                              <p className="eyebrow text-copper-ink mb-2">Limited Release</p>
                              <p className="font-display text-2xl leading-tight">{menuFeature.name}</p>
                              <p className="text-sm text-coffee mt-2">
                                {menuFeature.flavorNotes.slice(0, 3).join(" · ")}
                              </p>
                              <p className="text-sm mt-3 tabular">
                                from {formatPrice(menuFeature.sizes[0].priceCents)}
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3 xl:ml-10">
            <button
              aria-label="Search (Ctrl+K)"
              onClick={() => setSearchOpen(true)}
              className="p-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <Link
              href="/account/wishlist"
              aria-label={`Wishlist${slugs.length ? `, ${slugs.length} saved` : ""}`}
              className="hidden sm:inline-flex relative p-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Heart size={19} strokeWidth={1.5} />
              {slugs.length > 0 && <Badge count={slugs.length} />}
            </Link>
            <button
              aria-label={`Open bag${itemCount ? `, ${itemCount} items` : ""}`}
              onClick={openCart}
              className="relative p-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {itemCount > 0 && <Badge count={itemCount} />}
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-copper text-[10px] font-medium leading-4 text-ivory text-center tabular">
      {count}
    </span>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useModal<HTMLDivElement>(open, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-espresso/40 animate-overlay" onClick={onClose} />
      <div
        ref={ref}
        className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-ivory text-espresso flex flex-col animate-overlay"
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-espresso/10">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="p-2 -mr-2">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8 space-y-7">
          {navLinks.map((item) => (
            <div key={item.label}>
              <Link href={item.href} onClick={onClose} className="font-display text-3xl">
                {item.label}
              </Link>
              {item.columns && (
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {item.columns.flatMap((c) => c.links).map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={onClose} className="text-sm text-coffee">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-espresso/10 px-6 py-5 flex items-center justify-between text-sm">
          <Link href="/account" onClick={onClose} className="link-underline">Sign in</Link>
          <Link href="/account/wishlist" onClick={onClose} className="link-underline">Wishlist</Link>
          <Link href="/contact" onClick={onClose} className="link-underline">Contact</Link>
        </div>
      </div>
    </div>
  );
}
