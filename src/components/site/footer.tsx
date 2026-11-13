import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo, LogoMarkChip } from "@/components/site/logo";
import { waLink } from "@/lib/content";
import type { FooterSettings, GeneralSettings } from "@/lib/site-settings";
import type { PageRecord } from "@/lib/content";

type FooterProps = {
  general: GeneralSettings;
  footer: FooterSettings;
  pages: PageRecord[];
};

const QUICK_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Our products", href: "/#products" },
  { label: "Loans & financing", href: "/#loans" },
  { label: "Muamala Mobile app", href: "/#app" },
  { label: "News & updates", href: "/news" },
  { label: "Open an account", href: "/apply" },
  { label: "Contact us", href: "/#contact" },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", key: "facebook" as const },
  { icon: Instagram, label: "Instagram", key: "instagram" as const },
  { icon: Twitter, label: "X (Twitter)", key: "twitter" as const },
  { icon: Linkedin, label: "LinkedIn", key: "linkedin" as const },
];

export function Footer({ general, footer, pages }: FooterProps) {
  const telHref = `tel:${(general.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;
  const addressLines = general.address.split("\n").filter(Boolean);

  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <LogoMarkChip />
              <Logo variant="light" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">{footer.blurb}</p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, key }) => (
                <a
                  key={label}
                  href={general[key] || "#"}
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

          {/* Products + legal */}
          <nav aria-label="Products and policies">
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">Products</p>
            <ul className="mt-5 space-y-3">
              {footer.productLinks.map((label) => (
                <li key={label}>
                  <a href="/#products" className="text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-bold uppercase tracking-wider text-gold-400">Policies</p>
            <ul className="mt-5 space-y-3">
              {pages.slice(0, 4).map((page) => (
                <li key={page.slug}>
                  <a href={`/pages/${page.slug}`} className="text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {page.title}
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
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href={telHref} className="hover:text-gold-300">
                  {general.phones[0]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href={`mailto:${general.emails[0] ?? ""}`} className="hover:text-gold-300">
                  {general.emails[0]}
                </a>
              </li>
            </ul>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <span className="rounded-lg bg-gold-500 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-brand-950">
                {general.ussd}
              </span>
              <p className="text-xs text-brand-200">USSD banking on any phone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory smallprint */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-6 sm:px-6">
          <p className="text-xs leading-relaxed text-brand-300">{footer.smallprint}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-brand-300">
            <p>© {new Date().getFullYear()} {general.bankName}. All rights reserved.</p>
            <p>This website is for information purposes only and does not constitute financial advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
