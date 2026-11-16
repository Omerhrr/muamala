"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  CreditCard,
  Home,
  Phone,
  PiggyBank,
  Send,
  Smartphone,
  Wifi,
} from "lucide-react";
import { FloatingCard, PhoneFrame } from "@/components/site/phone-frame";
import type { HomeSettings, MockSettings } from "@/lib/site-settings";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ACTION_ICONS = [Send, Smartphone, CreditCard, PiggyBank];

function AppScreen({ m }: { m: MockSettings }) {
  return (
    <div className="flex h-full flex-col px-4 pb-3 pt-10">
      {/* App header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full bg-brand-800 font-serif text-sm font-bold text-gold-300">
            {(m.heroUser || "A").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">{m.heroGreeting}</p>
            <p className="text-sm font-bold text-brand-900">{m.heroUser}</p>
          </div>
        </div>
        <div className="relative flex size-8 items-center justify-center rounded-full bg-white shadow-sm">
          <Bell className="size-4 text-brand-800" aria-hidden="true" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-gold-500" />
        </div>
      </div>

      {/* Balance card */}
      <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-4 text-white shadow-lg">
        <div className="lattice-bg absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-widest text-brand-200">
              {m.heroBalanceLabel}
            </p>
            <Wifi className="size-3.5 text-gold-400" aria-hidden="true" />
          </div>
          <p className="mt-1.5 font-serif text-[26px] font-bold tracking-tight">{m.heroBalance}</p>
          <p className="mt-0.5 text-[10px] text-brand-200">{m.heroAccount}</p>
          <div className="mt-3.5 grid grid-cols-4 gap-1.5">
            {ACTION_ICONS.map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="flex size-8 w-full items-center justify-center rounded-xl bg-gold-500/90">
                  <Icon className="size-3.5 text-brand-950" aria-hidden="true" />
                </div>
                <span className="text-[8px] font-semibold text-brand-100">{m.heroActions[i] ?? ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-4 rounded-2xl bg-white p-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-brand-900">{m.heroTxnTitle}</p>
          <p className="text-[10px] font-semibold text-gold-600">{m.heroViewAll}</p>
        </div>
        <div className="mt-2.5 space-y-2.5">
          {m.heroTxns.map(({ label, sub, amount, type }, index) => {
            const credit = type === "credit";
            const Icon = credit ? (index % 2 ? PiggyBank : ArrowDownLeft) : ArrowUpRight;
            return (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-7 items-center justify-center rounded-full ${
                    credit ? "bg-brand-100 text-brand-700" : "bg-gold-100 text-gold-700"
                  }`}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="max-w-[150px] truncate text-[11px] font-semibold text-brand-900">
                    {label}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{sub}</p>
                </div>
              </div>
              <p className={`text-[11px] font-bold ${credit ? "text-brand-600" : "text-brand-900"}`}>
                {amount}
              </p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-auto flex items-center justify-around rounded-2xl bg-white px-2 py-2.5 shadow-sm">
        <Home className="size-4 text-brand-700" aria-hidden="true" />
        <PiggyBank className="size-4 text-muted-foreground/50" aria-hidden="true" />
        <CreditCard className="size-4 text-muted-foreground/50" aria-hidden="true" />
        <Phone className="size-4 text-muted-foreground/50" aria-hidden="true" />
      </div>
    </div>
  );
}

export function Hero({ settings, mock }: { settings: HomeSettings; mock: MockSettings }) {
  const reduce = useReducedMotion();

  const { heroTitle, heroTitleAccent } = settings;
  const accentIndex = heroTitleAccent
    ? heroTitle.toLowerCase().indexOf(heroTitleAccent.toLowerCase())
    : -1;
  const before = accentIndex > -1 ? heroTitle.slice(0, accentIndex) : heroTitle;
  const accent = accentIndex > -1 ? heroTitle.slice(accentIndex, accentIndex + heroTitleAccent.length) : "";
  const after = accentIndex > -1 ? heroTitle.slice(accentIndex + heroTitleAccent.length) : "";

  return (
    <section id="home" className="relative overflow-hidden bg-brand-950">
      {/* Layered background */}
      <div className="lattice-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -left-40 top-24 size-[480px] rounded-full bg-brand-600/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-0 size-[520px] rounded-full bg-gold-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-950 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-28 pt-36 sm:px-6 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-44"
      >
        {/* Copy */}
        <div>
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              {settings.heroBadge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            {before}
            {accent && <span className="italic text-gold-400">{accent}</span>}
            {after}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={settings.heroCtaPrimaryHref || "/apply"}
              className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-brand-950 shadow-xl shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              {settings.heroCtaPrimary}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href={settings.heroCtaSecondaryHref || "/#products"}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              {settings.heroCtaSecondary}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={item}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {settings.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl font-bold text-gold-300">{stat.value}</dd>
                <dd className="mt-1 text-[11px] font-medium uppercase tracking-wide text-brand-200">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Hero photo (optional, replaces the phone illustration, shown on all screens) */}
        {settings.heroImage ? (
          <motion.div variants={item} className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold-500/30" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={settings.heroImage}
              alt={settings.heroImageAlt}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl lg:aspect-[4/5]"
            />
          </motion.div>
        ) : (
        /* Phone mockup */
        <motion.div variants={item} className="relative hidden lg:block">
          <div className="relative">
            <PhoneFrame>
              <AppScreen m={mock} />
            </PhoneFrame>

            <FloatingCard
              delay={0.5}
              className="absolute -right-6 top-16 w-56 rounded-2xl border border-border bg-white p-3.5 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100">
                  <CheckCircle2 className="size-5 text-brand-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-900">{settings.heroCard1Title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{settings.heroCard1Body}</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              delay={1.1}
              className="absolute -left-10 bottom-24 w-52 rounded-2xl border border-border bg-white p-3.5 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100">
                  <PiggyBank className="size-5 text-gold-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-900">{settings.heroCard2Title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{settings.heroCard2Body}</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </motion.div>
        )}
      </motion.div>
    </section>
  );
}
