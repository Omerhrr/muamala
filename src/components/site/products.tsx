import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  CreditCard,
  HandCoins,
  PiggyBank,
  Store,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const PRODUCTS = [
  {
    icon: PiggyBank,
    title: "Personal Savings",
    desc: "A flexible savings account that rewards consistency.",
    features: [
      "Open with just ₦1,000 and your BVN",
      "Competitive interest, credited quarterly",
      "Free SMS & email alerts on every transaction",
      "Naira debit card on request",
    ],
  },
  {
    icon: Target,
    title: "Target & Ajo Savings",
    desc: "Save towards a goal — alone or with your group.",
    features: [
      "Lock funds until maturity to build discipline",
      "Perfect for ajo, esusu & cooperative groups",
      "Auto-debit standing orders from any account",
      "Bonus rate for goals completed to maturity",
    ],
  },
  {
    icon: Briefcase,
    title: "Current & SME Accounts",
    desc: "Built for the daily cash-flow of small business.",
    features: [
      "Cheque books & corporate collections",
      "Bulk salary payments & POS settlements",
      "Overdraft for customers with good track record",
      "Free monthly e-statements",
    ],
  },
  {
    icon: HandCoins,
    title: "Micro & SME Loans",
    desc: "Responsible credit that meets you where you are.",
    features: [
      "From ₦20,000 for micro businesses",
      "Clear rates from 2.5% – 3.5% per month",
      "Tenors of 3 – 24 months",
      "Decision within 48 hours of complete KYC",
    ],
  },
  {
    icon: CreditCard,
    title: "Cards & Payments",
    desc: "Pay, transfer and get paid — anywhere, anytime.",
    features: [
      "Verve Naira debit card accepted nationwide",
      "Instant transfers to all Nigerian banks",
      "Airtime, data & bill payments (Quickteller)",
      "USSD banking on *777# — no smartphone needed",
    ],
  },
  {
    icon: Store,
    title: "Agent Banking",
    desc: "Full banking services on your street, not across town.",
    features: [
      "Cash-in & cash-out at agent points near you",
      "Open an account on the go with an agent",
      "Bill payments & airtime top-up",
      "Become an agent and earn commissions",
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            Our products
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Everything a growing business and household needs
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From your first ₦1,000 savings to financing that restocks your shop — one bank, one
            account, all the tools.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map(({ icon: Icon, title, desc, features }, index) => (
            <Reveal key={title} delay={(index % 3) * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl">
                <div className="flex size-12 items-center justify-center rounded-xl bg-brand-800 transition-colors group-hover:bg-gold-500">
                  <Icon className="size-6 text-gold-300 transition-colors group-hover:text-brand-950" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-brand-900">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span
                        className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-gold-600"
                >
                  Get started
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
