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
import type { HomeSettings } from "@/lib/site-settings";

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

function AppScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-3 pt-10">
      {/* App header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full bg-brand-800 font-serif text-sm font-bold text-gold-300">
            A
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground">Good morning</p>
            <p className="text-sm font-bold text-brand-900">Aisha Mohammed</p>
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
              Total balance
            </p>
            <Wifi className="size-3.5 text-gold-400" aria-hidden="true" />
          </div>
          <p className="mt-1.5 font-serif text-[26px] font-bold tracking-tight">₦486,250.00</p>
          <p className="mt-0.5 text-[10px] text-brand-200">Muamala Savings ···· 7149</p>
          <div className="mt-3.5 grid grid-cols-4 gap-1.5">
            {[
              { icon: Send, label: "Send" },
              { icon: Smartphone, label: "Airtime" },
              { icon: CreditCard, label: "Bills" },
              { icon: PiggyBank, label: "Save" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex size-8 w-full items-center justify-center rounded-xl bg-gold-500/90">
                  <Icon className="size-3.5 text-brand-950" aria-hidden="true" />
                </div>
                <span className="text-[8px] font-semibold text-brand-100">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-4 rounded-2xl bg-white p-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-brand-900">Recent transactions</p>
          <p className="text-[10px] font-semibold text-gold-600">View all</p>
        </div>
        <div className="mt-2.5 space-y-2.5">
          {[
            { icon: ArrowUpRight, label: "Transfer to Ola Cosmetics", sub: "Today, 9:24am", amount: "-₦15,000", credit: false },
            { icon: ArrowDownLeft, label: "POS settlement, Agent 231", sub: "Yesterday, 4:02pm", amount: "+₦62,400", credit: true },
            { icon: PiggyBank, label: "Ajo target savings", sub: "Yesterday, 8:00am", amount: "+₦25,000", credit: true },
          ].map(({ icon: Icon, label, sub, amount, credit }) => (
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
          ))}
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

export function Hero({ settings }: { settings: HomeSettings }) {
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
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-44"
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
              href="/apply"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-brand-950 shadow-xl shadow-gold-500/25 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              {settings.heroCtaPrimary}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="/#products"
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

        {/* Phone mockup */}
        <motion.div variants={item} className="relative hidden lg:block">
          <div className="relative">
            <PhoneFrame>
              <AppScreen />
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
                  <p className="text-xs font-bold text-brand-900">Loan approved 🎉</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    ₦150,000 disbursed to your Muamala wallet
                  </p>
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
                  <p className="text-xs font-bold text-brand-900">Target savings</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    ₦25,000 saved this month
                  </p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
