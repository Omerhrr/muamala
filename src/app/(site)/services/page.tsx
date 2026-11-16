import {
  ArrowRight,
  CalendarCheck2,
  CreditCard,
  HandCoins,
  HelpCircle,
  MessageCircle,
  PiggyBank,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Faq } from "@/components/site/faq";
import { waLink } from "@/lib/wa";
import { getFaqs, getSettingsGroup, pageMeta } from "@/lib/content";
import type { FaqSettings, GeneralSettings, ServicesPageSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMeta("services");
}

const SELF_SERVICE_ICONS = [UserPlus, HandCoins, PiggyBank, CalendarCheck2, HelpCircle, CreditCard];

export default async function ServicesPage() {
  const [settings, general, faq, ui, faqs] = await Promise.all([
    getSettingsGroup("servicesPage"),
    getSettingsGroup("general"),
    getSettingsGroup("faq"),
    getSettingsGroup("ui"),
    getFaqs(),
  ]);
  const s = settings as ServicesPageSettings;
  const g = general as GeneralSettings;
  const f = faq as FaqSettings;
  const wa = waLink(g.whatsapp);
  const telHref = `tel:${(g.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;

  const SELF_SERVICE = (s.selfService ?? []).map((card, index) => ({
    icon: SELF_SERVICE_ICONS[index % SELF_SERVICE_ICONS.length],
    title: card.title,
    desc: card.desc,
    href: card.href || "/contact",
  }));

  return (
    <>
      <PageHeader
        eyebrow={s.pageEyebrow || "Customer service & self-service"}
        title={s.title}
        subtitle={s.subtitle}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {g.whatsapp && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {s.whatsappCta}
            </a>
          )}
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            Call {g.phones[0]}
          </a>
        </div>
      </PageHeader>

      {/* Self-service cards */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {s.selfServiceEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.selfServiceTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SELF_SERVICE.map(({ icon: Icon, title, desc, href }, index) => (
              <Reveal key={title} delay={(index % 3) * 0.08}>
                <a
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-800 transition-colors group-hover:bg-gold-500">
                    <Icon
                      className="size-6 text-gold-300 transition-colors group-hover:text-brand-950"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-brand-900">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors group-hover:text-gold-600">
                    {ui.svContinue}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Loan repayment info */}
      <section id="repayment" className="scroll-mt-28 bg-card py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {ui.svRepayEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {s.repaymentTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{s.repaymentBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-900"
              >
                {ui.svTalkLoan}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href="/apply?tab=loan"
                className="inline-flex items-center gap-2 rounded-full border border-brand-800/30 px-6 py-3 text-sm font-bold text-brand-900 transition-colors hover:border-gold-500 hover:text-gold-700"
              >
                {ui.svApplyLoan}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-3xl bg-brand-950 p-8 text-brand-100 sm:p-10">
              <ShieldCheck className="size-8 text-gold-400" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-bold text-white">
                {ui.svFiveWays}
              </h3>
              <ol className="mt-5 space-y-3.5">
                {s.repaymentChannels.map((channel, index) => (
                  <li key={channel} className="flex items-start gap-3.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-brand-950">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-brand-100">{channel}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WhatsApp + ATM/POS support */}
      <section id="support" className="scroll-mt-28 bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border-2 border-gold-300/70 bg-gold-50 p-8 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold-500/20">
                <MessageCircle className="size-6 text-gold-700" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-brand-900">
                {s.whatsappTitle}
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-foreground/80">{s.whatsappBody}</p>
              {g.whatsapp && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-900"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Chat with us: {g.whatsapp}
                </a>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl bg-brand-950 p-8 text-brand-100 sm:p-10">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <CreditCard className="size-6 text-gold-300" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-white">{s.supportTitle}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-brand-200">{s.supportBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
                >
                  {ui.svReport}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  {ui.svCallBank}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <Faq settings={f} faqs={faqs} general={g} ui={ui} />
    </>
  );
}
