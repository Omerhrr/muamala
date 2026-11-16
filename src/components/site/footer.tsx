import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo, LogoMarkChip } from "@/components/site/logo";
import { waLink } from "@/lib/content";
import type { BrandSettings, FooterSettings, GeneralSettings, UiSettings } from "@/lib/site-settings";
import type { PageRecord } from "@/lib/content";

type FooterProps = {
  ui: UiSettings;
  general: GeneralSettings;
  footer: FooterSettings;
  brand: BrandSettings;
  pages: PageRecord[];
};

const SOCIALS = [
  { icon: Facebook, label: "Facebook", key: "facebook" as const },
  { icon: Instagram, label: "Instagram", key: "instagram" as const },
  { icon: Twitter, label: "X (Twitter)", key: "twitter" as const },
  { icon: Linkedin, label: "LinkedIn", key: "linkedin" as const },
];

export function Footer({ general, footer, brand, pages, ui }: FooterProps) {
  const telHref = `tel:${(general.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;
  const addressLines = general.address.split("\n").filter(Boolean);
  const quickLinks = (footer.quickLinks ?? []).filter((l) => l.label && l.href);
  const productLinks = (
    footer.productLinkItems?.length
      ? footer.productLinkItems
      : (footer.productLinks ?? []).map((label) => ({ label, href: "/products" }))
  ).filter((l) => l.label);

  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <LogoMarkChip brand={brand} />
              <Logo brand={brand} variant="light" hideMark />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">{footer.blurb}</p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.filter(({ key }) => general[key] && general[key] !== "#").map(({ icon: Icon, label, key }) => (
                <a
                  key={label}
                  href={general[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-white/15 text-brand-200 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={ui.footerNavLabel}>
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">{footer.quickLinksTitle}</p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={`${label}-${href}`}>
                  <a href={href} className="inline-flex min-h-8 items-center text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products + legal */}
          <nav aria-label={ui.footerProductsAria}>
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">{footer.productsTitle}</p>
            <ul className="mt-5 space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={`${label}-${href}`}>
                  <a href={href || "/products"} className="text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm font-bold uppercase tracking-wider text-gold-400">{footer.policiesTitle}</p>
            <ul className="mt-5 space-y-3">
              {pages.slice(0, 4).map((page) => (
                <li key={page.slug}>
                  <a href={`/pages/${page.slug}`} className="text-sm text-brand-200 transition-colors hover:text-gold-300">
                    {page.title}
                  </a>
                </li>
              ))}
              <li>
                <a href={footer.policiesAllHref || "/compliance"} className="text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200">
                  {footer.policiesAllLabel || "All policies & disclosures →"}
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-gold-400">{footer.contactTitle}</p>
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
                  {general.phones[0] ?? ""}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href={`mailto:${general.emails[0] ?? ""}`} className="hover:text-gold-300">
                  {general.emails[0] ?? ""}
                </a>
              </li>
            </ul>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <span className="rounded-lg bg-gold-500 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-brand-950">
                {general.ussd}
              </span>
              <p className="text-xs text-brand-200">{footer.ussdCaption}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory smallprint */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-6 sm:px-6">
          <p className="text-xs leading-relaxed text-brand-300">{footer.smallprint}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-brand-300">
            <p>© {new Date().getFullYear()} {general.bankName}. {ui.footerRights}</p>
            <p>{footer.legalLine}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
