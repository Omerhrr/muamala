import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo } from "@/components/site/logo";

const QUICK_LINKS = [
  { label: "About us", href: "#about" },
  { label: "Our products", href: "#products" },
  { label: "Loans & financing", href: "#loans" },
  { label: "Muamala Mobile app", href: "#app" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact us", href: "#contact" },
];

const PRODUCT_LINKS = [
  "Personal savings",
  "Target & ajo savings",
  "Current & SME accounts",
  "Micro & SME loans",
  "Cards & payments",
  "Agent banking",
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">
              Muamala Micro-Finance Bank Limited is a community-focused microfinance bank in
              Niger State, Nigeria — bringing savings, loans and payments within reach of every
              household and small business.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-brand-200 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">Quick links</p>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Products">
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">Products</p>
            <ul className="mt-5 space-y-3">
              {PRODUCT_LINKS.map((label) => (
                <li key={label}>
                  <a href="#products" className="text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-brand-200">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                Plot 14, Bosso Road, by Tungan Gari Market, Minna, Niger State, Nigeria
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href="tel:+2348031234567" className="hover:text-gold-300">
                  0803 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href="mailto:hello@muamalamfb.com.ng" className="hover:text-gold-300">
                  hello@muamalamfb.com.ng
                </a>
              </li>
            </ul>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <span className="rounded-lg bg-gold-500 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-brand-950">
                *777#
              </span>
              <p className="text-xs text-brand-200">USSD banking on any phone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory smallprint */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-6 sm:px-6">
          <p className="text-xs leading-relaxed text-brand-300">
            Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of
            Nigeria (CBN). Deposits are insured by the Nigeria Deposit Insurance Corporation
            (NDIC) up to the applicable statutory limit. Card, transfer and bill payment services
            are processed through Interswitch infrastructure.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-brand-300">
            <p>© {new Date().getFullYear()} Muamala Micro-Finance Bank Limited. All rights reserved.</p>
            <p>This website is for information purposes only and does not constitute financial advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
