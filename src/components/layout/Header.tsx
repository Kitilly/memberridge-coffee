"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/lib/data/content";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { itemCount, openCart } = useCart();
  const { slugs } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-ivory/95 backdrop-blur border-b border-espresso/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <button
          className="lg:hidden p-2 -ml-2 text-espresso"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-espresso"
        >
          Memberridge
        </Link>

        <nav className="hidden lg:flex items-center gap-10" onMouseLeave={() => setOpenMenu(null)}>
          {navLinks.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
            >
              <Link
                href={item.href}
                className="eyebrow text-espresso/80 hover:text-espresso transition-colors"
              >
                {item.label}
              </Link>
              {item.columns && openMenu === item.label && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-6">
                  <div className="flex gap-12 bg-ivory border border-espresso/10 shadow-xl shadow-espresso/5 px-10 py-8 min-w-[380px]">
                    {item.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="eyebrow text-copper mb-4">{col.heading}</p>
                        <ul className="space-y-3">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-[0.95rem] text-espresso/80 hover:text-espresso link-underline"
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
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            className="hidden sm:inline-flex p-2 text-espresso/80 hover:text-espresso transition-colors"
          >
            <Search size={19} strokeWidth={1.5} />
          </button>
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="hidden sm:inline-flex relative p-2 text-espresso/80 hover:text-espresso transition-colors"
          >
            <Heart size={19} strokeWidth={1.5} />
            {slugs.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-copper text-[10px] leading-4 text-ivory text-center">
                {slugs.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Open cart"
            onClick={openCart}
            className="relative p-2 text-espresso/80 hover:text-espresso transition-colors"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-copper text-[10px] leading-4 text-ivory text-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-espresso/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-ivory p-8 flex flex-col animate-fade-up">
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-xl">Memberridge</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl text-espresso"
                  >
                    {item.label}
                  </Link>
                  {item.columns && (
                    <ul className="mt-3 ml-1 space-y-2">
                      {item.columns.flatMap((c) => c.links).map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm text-coffee"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
