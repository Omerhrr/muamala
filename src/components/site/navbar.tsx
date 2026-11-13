"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import type { GeneralSettings } from "@/lib/site-settings";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Loans", href: "/#loans" },
  { label: "Digital Banking", href: "/digital" },
  { label: "Support", href: "/services" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ general }: { general: GeneralSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const telHref = `tel:${(general.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
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
        className={cn(
          "transition-all duration-300",
          solid
            ? "bg-background/90 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo variant={solid ? "dark" : "light"} />

          <div className="hidden items-center gap-6 lg:flex xl:gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
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
              href={general.navCtaHref || "/apply"}
              className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              {general.navCtaLabel || "Open an Account"}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border lg:hidden",
              solid
                ? "border-border text-brand-900"
                : "border-white/30 text-white"
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-brand-900 hover:bg-secondary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={general.navCtaHref || "/apply"}
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-bold text-brand-950"
                >
                  {general.navCtaLabel || "Open an Account"}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
