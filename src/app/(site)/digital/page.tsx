import {
  ArrowLeftRight,
  ArrowRight,
  Globe,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { AppPromo } from "@/components/site/app-promo";
import { waLink } from "@/lib/wa";
import { getSettingsGroup } from "@/lib/content";
import type { AppSettings, DigitalPageSettings, GeneralSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const general = await getSettingsGroup("general");
  return {
    title: `Digital banking & mobile app | ${general.bankName}`,
    description: `Muamala Mobile app, USSD banking, secure transfers and payments, and digital support from ${general.shortName}. Bank from your phone, any phone.`,
  };
}

export default async function DigitalPage() {
  const [settings, general, app] = await Promise.all([
    getSettingsGroup("digitalPage"),
    getSettingsGroup("general"),
    getSettingsGroup("app"),
  ]);
  const s = settings as DigitalPageSettings;
  const g = general as GeneralSettings;
  const a = app as AppSettings;
  const wa = waLink(g.whatsapp);
  const telHref = `tel:${(g.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <PageHeader
        eyebrow={s.pageEyebrow || "Digital banking & mobile app"}
        title={s.title}
        subtitle={s.subtitle}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#app"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
          >
            <Smartphone className="size-4" aria-hidden="true" />
            Get the mobile app
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white">
            <Globe className="size-4 text-gold-400" aria-hidden="true" />
            USSD banking: <span className="font-mono tracking-widest text-gold-300">{g.ussd}</span>
          </span>
        </div>
      </PageHeader>

      {/* Internet banking login */}
      <section id="internet-banking" className="scroll-mt-28 bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {s.internetBankingEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.internetBankingTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {a.internetBankingNote}
            </p>
            <ul className="mt-6 space-y-3">
              {(s.internetBankingPoints ?? []).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <LockKeyhole className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-10">
              <span className="absolute -top-3.5 right-8 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-brand-950 shadow">
                {s.loginBadge}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-800">
                  <KeyRound className="size-5 text-gold-300" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-900">
                  {s.loginCardTitle}
                </h3>
              </div>
              <div className="mt-7 space-y-4">
                <div className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-muted-foreground">
                  Account number or phone number
                </div>
                <div className="rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-muted-foreground">
                  Password
                </div>
                <div className="rounded-xl bg-secondary px-4 py-3.5 text-center text-sm font-bold text-brand-900/60">
                  Sign in
                </div>
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  {s.loginNote}
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-800/30 px-5 py-2.5 text-sm font-bold text-brand-900 transition-colors hover:border-gold-500 hover:text-gold-700"
                >
                  <KeyRound className="size-4" aria-hidden="true" />
                  Reset password help
                </a>
                <a
                  href="#support"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-900"
                >
                  <LifeBuoy className="size-4" aria-hidden="true" />
                  Support
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* App promo (dark, from settings) */}
      <AppPromo settings={a} general={g} />

      {/* USSD how-to */}
      <section id="ussd" className="scroll-mt-28 bg-card py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              USSD banking
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.ussdStepsTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {a.ussdNote} Works on MTN, Airtel, Glo and 9mobile, with no smartphone and no data
              bundle required.
            </p>
            <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-border bg-background px-6 py-4">
              <span className="rounded-lg bg-brand-800 px-3.5 py-2 font-mono text-lg font-bold tracking-widest text-gold-300">
                {g.ussd}
              </span>
              <p className="text-xs font-semibold leading-snug text-muted-foreground">
                Dial the code on the line
                <br />
                registered to your account
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ol className="space-y-4">
              {s.ussdSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-800 font-serif text-sm font-bold text-gold-300">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed text-foreground/90">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="scroll-mt-28 bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              Secure transfers & payments
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.securityTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{s.securityBody}</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.securityTips.map((tip, index) => (
              <Reveal key={tip} delay={(index % 3) * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15">
                    <ShieldCheck className="size-5 text-gold-700" aria-hidden="true" />
                  </div>
                  <p className="pt-1 text-sm leading-relaxed text-foreground/90">{tip}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10">
            <div className="flex flex-col items-start gap-4 rounded-2xl bg-brand-950 p-6 text-brand-100 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <ArrowLeftRight className="mt-0.5 size-6 shrink-0 text-gold-400" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-brand-200">
                  Every transfer and payment is processed over Interswitch infrastructure with
                  bank-grade encryption, PIN and device verification, and you get an instant SMS
                  or email alert for every transaction.
                </p>
              </div>
              <a
                href="/pages/customer-protection"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                Read our protection policy
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Password reset & support */}
      <section id="support" className="lattice-bg scroll-mt-28 bg-brand-950 py-16 text-brand-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">Support</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
              {s.supportTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">{s.supportBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              <PhoneCall className="size-4" aria-hidden="true" />
              Call us
            </a>
            {g.whatsapp && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${g.emails[0] ?? ""}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              Email support
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
