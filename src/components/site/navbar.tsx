"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Mail, Megaphone, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import type { BrandSettings, GeneralSettings, NavSettings } from "@/lib/site-settings";

type NavbarProps = {
  general: GeneralSettings;
  brand: BrandSettings;
  nav: NavSettings;
  announcement?: string;
};

export function Navbar({ general, brand, nav, announcement }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock page scroll + close on Escape / when resized to desktop while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;
  const telHref = `tel:${(general.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;
  const links = (nav.links ?? []).filter((l) => l.label && l.href);
  const ctaHref = general.navCtaHref || "/apply";
  const ctaLabel = general.navCtaLabel || "Open an Account";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement (site-wide, collapses on scroll) */}
      {announcement && (
        <div
          className={cn(
            "bg-gold-500 text-brand-950 transition-all duration-300",
            scrolled || open ? "h-0 overflow-hidden opacity-0" : "opacity-100"
          )}
        >
          <p className="mx-auto flex max-w-7xl items-start justify-center gap-2 px-4 py-2 text-center text-[11px] font-semibold leading-snug sm:items-center sm:text-xs">
            <Megaphone className="mt-0.5 size-3.5 shrink-0 sm:mt-0" aria-hidden="true" />
            <span className="line-clamp-2 sm:line-clamp-none">{announcement}</span>
          </p>
        </div>
      )}

      {/* Utility bar */}
      <div
        className={cn(
          "hidden bg-brand-950 text-brand-100 transition-all duration-300 md:block",
          scrolled ? "h-0 overflow-hidden opacity-0" : "h-9 opacity-100"
        )}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
          <div className="flex items-center gap-5">
            <a href={telHref} className="flex items-center gap-1.5 hover:text-gold-300">
              <Phone className="size-3 text-gold-400" aria-hidden="true" />
              {general.phones[0] ?? ""}
            </a>
            <a href={`mailto:${general.emails[0] ?? ""}`} className="flex items-center gap-1.5 hover:text-gold-300">
              <Mail className="size-3 text-gold-400" aria-hidden="true" />
              {general.emails[0] ?? ""}
            </a>
          </div>
          <div className="flex items-center gap-5">
            {general.hours[0] && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-3 text-gold-400" aria-hidden="true" />
                {general.hours[0]}
              </span>
            )}
            <span className="text-brand-200/70">{general.rcLine}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        aria-label={nav.menuAria || "Main"}
        className={cn(
          "transition-all duration-300",
          solid ? "bg-background/95 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[88px] max-w-7xl lg:h-[112px] items-center justify-between gap-3 px-4 sm:px-6">
          <Logo brand={brand} variant={solid ? "dark" : "light"} />

          <div className="hidden items-center gap-6 lg:flex xl:gap-7">
            {links.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                className={cn(
                  "rounded-md text-sm font-semibold transition-colors hover:text-gold-500",
                  solid ? "text-brand-900" : "text-white/90 hover:text-gold-300"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              {ctaLabel}
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {general.phones[0] && (
              <a
                href={telHref}
                aria-label={nav.callLabel || "Call us"}
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border",
                  solid ? "border-border text-brand-900" : "border-white/30 text-white"
                )}
              >
                <Phone className="size-[18px]" aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.menuCloseLabel || "Close menu" : nav.menuOpenLabel || "Open menu"}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border",
                solid ? "border-border text-brand-900" : "border-white/30 text-white"
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="max-h-[calc(100dvh-88px)] overflow-y-auto overscroll-contain border-t border-border bg-background lg:hidden"
            >
              <div className="space-y-1 px-4 pb-6 pt-3">
                {links.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-brand-900 active:bg-secondary hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={ctaHref}
                  onClick={() => setOpen(false)}
                  className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-gold-500 px-5 text-center text-base font-bold text-brand-950"
                >
                  {ctaLabel}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
