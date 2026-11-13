import {
  ArrowLeftRight,
  BellRing,
  Globe,
  MapPin,
  PiggyBank,
  Receipt,
  Send,
  Star,
  Store,
  Wifi,
} from "lucide-react";
import { PhoneFrame } from "@/components/site/phone-frame";
import { Reveal } from "@/components/site/reveal";
import type { AppSettings, GeneralSettings } from "@/lib/site-settings";

const FEATURE_ICONS = [Send, Receipt, PiggyBank, MapPin, Globe, Wifi];

function SavingsScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-3 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-brand-900">My Savings</p>
          <p className="text-[10px] text-muted-foreground">Grow it, one goal at a time</p>
        </div>
        <div className="flex size-8 items-center justify-center rounded-full bg-brand-800">
          <BellRing className="size-4 text-gold-300" aria-hidden="true" />
        </div>
      </div>

      {/* Goal cards */}
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-brand-100">Shop restock goal</p>
            <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-bold text-brand-950">
              78%
            </span>
          </div>
          <p className="mt-1.5 font-serif text-2xl font-bold">₦156,000</p>
          <p className="text-[10px] text-brand-200">of ₦200,000 target · matures 30 Apr</p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[78%] rounded-full bg-gold-400" />
          </div>
        </div>

        {[
          { name: "Rent contribution", saved: "₦85,000", of: "₦300,000", pct: 28 },
          { name: "Children school fees", saved: "₦120,500", of: "₦150,000", pct: 80 },
        ].map(({ name, saved, of, pct }) => (
          <div key={name} className="rounded-2xl bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-brand-900">{name}</p>
              <span className="text-[9px] font-bold text-gold-600">{pct}%</span>
            </div>
            <p className="mt-1 text-[13px] font-bold text-brand-900">
              {saved} <span className="text-[10px] font-medium text-muted-foreground">of {of}</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-dashed border-gold-400 bg-gold-50 p-3.5 text-center">
          <p className="text-[11px] font-bold text-gold-700">+ Create a new goal</p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-around rounded-2xl bg-white px-2 py-2.5 shadow-sm">
        <Wifi className="size-4 text-muted-foreground/50" aria-hidden="true" />
        <PiggyBank className="size-4 text-brand-700" aria-hidden="true" />
        <ArrowLeftRight className="size-4 text-muted-foreground/50" aria-hidden="true" />
        <Store className="size-4 text-muted-foreground/50" aria-hidden="true" />
      </div>
    </div>
  );
}

function StoreBadge({
  top,
  bottom,
  icon,
  soon,
  href,
}: {
  top: string;
  bottom: string;
  icon: React.ReactNode;
  soon: boolean;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm transition-colors hover:border-gold-400/60">
      {icon}
      <div className="leading-tight">
        <p className="text-[9px] font-medium uppercase tracking-wide text-brand-200">{top}</p>
        <p className="text-sm font-bold text-white">{bottom}</p>
      </div>
      {soon && (
        <span className="ml-1 rounded-full bg-gold-500 px-2 py-0.5 text-[9px] font-bold text-brand-950">
          Soon
        </span>
      )}
    </div>
  );
  if (!soon && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={bottom}>
        {inner}
      </a>
    );
  }
  return inner;
}

export function AppPromo({
  settings,
  general,
}: {
  settings: AppSettings;
  general: GeneralSettings;
}) {
  return (
    <section id="app" className="relative overflow-hidden bg-brand-950 py-20 lg:py-28">
      <div className="lattice-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 top-1/3 size-[520px] rounded-full bg-brand-600/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-32 bottom-0 size-[420px] rounded-full bg-gold-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">
              {settings.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.7rem] lg:leading-[1.15]">
              {settings.title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-brand-100/85">{settings.subtitle}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {settings.features.map(({ title, desc }, index) => {
                const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
                return (
                  <li key={title} className="flex items-start gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10">
                      <Icon className="size-5 text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-brand-200">{desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-3">
              <StoreBadge
                top="Get it on"
                bottom="Google Play"
                icon={<Smartphone className="size-6 text-gold-400" aria-hidden="true" />}
                soon={!settings.playStoreUrl}
                href={settings.playStoreUrl || undefined}
              />
              <StoreBadge
                top="Download on the"
                bottom="App Store"
                icon={<Star className="size-6 text-gold-400" aria-hidden="true" />}
                soon={!settings.appStoreUrl}
                href={settings.appStoreUrl || undefined}
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5">
              <span className="rounded-lg bg-gold-500 px-3 py-1.5 font-mono text-sm font-bold tracking-widest text-brand-950">
                {general.ussd}
              </span>
              <p className="text-xs leading-snug text-brand-100">{settings.ussdNote}</p>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-brand-200">
              <Globe className="size-4 text-gold-400" aria-hidden="true" />
              {settings.internetBankingNote}
            </p>
          </Reveal>
        </div>

        {/* Phone */}
        <Reveal delay={0.15} className="hidden lg:block">
          <div className="relative rotate-2 transition-transform duration-500 hover:rotate-0">
            <PhoneFrame>
              <SavingsScreen />
            </PhoneFrame>
            <div className="absolute -left-8 top-10 rounded-2xl border border-border bg-white px-4 py-3 shadow-2xl">
              <p className="text-[11px] font-bold text-brand-900">{general.ussd} works on</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                MTN · Airtel · Glo · 9mobile
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
