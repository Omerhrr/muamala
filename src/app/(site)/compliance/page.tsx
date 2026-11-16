import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Gavel,
  Landmark,
  Mail,
  Megaphone,
  PhoneCall,
  ShieldCheck,
  Siren,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { getPages, getSettingsGroup, pageMeta } from "@/lib/content";
import { waLink } from "@/lib/wa";
import type { CompliancePageSettings, GeneralSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMeta("compliance");
}

export default async function CompliancePage() {
  const [settings, general, ui, pages] = await Promise.all([
    getSettingsGroup("compliancePage"),
    getSettingsGroup("general"),
    getSettingsGroup("ui"),
    getPages(),
  ]);
  const s = settings as CompliancePageSettings;
  const g = general as GeneralSettings;
  const telHref = `tel:${(g.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;
  const wa = waLink(g.whatsapp);
  const complainHref = `/contact`;

  const CARDS: {
    icon: LucideIcon;
    title: string;
    body: string;
    href?: string;
    cta?: string;
  }[] = [
    {
      icon: Landmark,
      title: s.cbnTitle,
      body: s.cbnBody,
    },
    {
      icon: ShieldCheck,
      title: s.ndicTitle,
      body: s.ndicBody,
    },
    {
      icon: BadgeCheck,
      title: s.protectionTitle,
      body: s.protectionBody,
      href: "/pages/customer-protection",
      cta: ui.cpReadPolicy,
    },
    {
      icon: FileText,
      title: s.amlTitle,
      body: s.amlBody,
      href: "/pages/aml-policy",
      cta: ui.cpReadPolicy,
    },
    {
      icon: Megaphone,
      title: s.complaintsTitle,
      body: s.complaintsBody,
      href: "/pages/complaints-procedure",
      cta: ui.cpFullProc,
    },
    {
      icon: Siren,
      title: s.whistleTitle,
      body: s.whistleBody,
      href: "/pages/whistleblowing",
      cta: ui.cpHowReport,
    },
  ];

  const legal = pages.filter((page) => page.category === "legal");
  const regulatory = pages.filter((page) => page.category !== "legal");

  return (
    <>
      <PageHeader
        eyebrow={s.pageEyebrow || "Regulation & compliance"}
        title={s.title}
        subtitle={s.subtitle}
      >
        <div className="mt-8 flex flex-wrap gap-2.5">
          {(s.headerChips ?? []).map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-bold text-gold-300"
            >
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              {chip}
            </span>
          ))}
        </div>
      </PageHeader>

      {/* Compliance pillars */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {s.pillarsEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.pillarsTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map(({ icon: Icon, title, body, href, cta }, index) => (
              <Reveal key={title} delay={(index % 3) * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-800">
                    <Icon className="size-6 text-gold-300" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-brand-900">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                  {href && cta && (
                    <a
                      href={href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-gold-600"
                    >
                      {cta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Complaints journey */}
      <section className="bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {s.stepsEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.stepsTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {s.stepsIntro}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(s.steps ?? []).map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="relative flex h-full flex-col rounded-2xl border border-border bg-background p-6">
                  <span className="font-serif text-4xl font-bold text-gold-500/50">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-base font-bold text-brand-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10">
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-brand-950 p-8 text-brand-100 sm:p-10 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h3 className="font-serif text-xl font-bold text-white">
                  {s.ctaTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">
                  {s.ctaBody}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={complainHref}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
                >
                  {ui.cpEnquiry}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  <PhoneCall className="size-4" aria-hidden="true" />
                  {ui.cpCall}
                </a>
                {g.whatsapp && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
                  >
                    {ui.cpWhatsapp}
                  </a>
                )}
                <a
                  href={`mailto:${g.emails[0] ?? ""}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {ui.cpEmail}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Policies & disclosures */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {ui.cpDocsEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {ui.cpDocsTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {ui.cpDocsBody}
            </p>
          </Reveal>

          {regulatory.length > 0 && (
            <div className="mt-12">
              <h3 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.22em] text-brand-800">
                <Landmark className="size-4 text-gold-600" aria-hidden="true" />
                {ui.cpRegCat}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {regulatory.map((page, index) => (
                  <Reveal key={page.slug} delay={(index % 3) * 0.06}>
                    <a
                      href={`/pages/${page.slug}`}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-800">
                        <FileText className="size-5 text-gold-300" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold leading-snug text-brand-900 group-hover:text-gold-700">
                          {page.title}
                        </p>
                        <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-brand-700">
                          {ui.cpReadDoc}
                          <ArrowRight
                            className="size-3.5 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {legal.length > 0 && (
            <div className="mt-12">
              <h3 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.22em] text-brand-800">
                <Gavel className="size-4 text-gold-600" aria-hidden="true" />
                {ui.cpLegalCat}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {legal.map((page, index) => (
                  <Reveal key={page.slug} delay={index * 0.06}>
                    <a
                      href={`/pages/${page.slug}`}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-800">
                        <FileText className="size-5 text-gold-300" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold leading-snug text-brand-900 group-hover:text-gold-700">
                          {page.title}
                        </p>
                        <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-brand-700">
                          {ui.cpReadDoc}
                          <ArrowRight
                            className="size-3.5 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </p>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section className="lattice-bg bg-brand-950 py-16 text-brand-100">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              {ui.cpBandTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-200">
              {ui.cpBandBody}
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
          >
            {ui.cpBandBtn}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
