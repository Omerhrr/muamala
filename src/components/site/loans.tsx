"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Briefcase,
  Calculator,
  FileCheck2,
  GraduationCap,
  Store,
  Wallet,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/site/reveal";

const LOAN_PRODUCTS = [
  {
    icon: Store,
    name: "Micro Business Loan",
    rate: "3.0% monthly flat",
    range: "₦20,000 – ₦500,000",
    tenor: "Up to 12 months",
    desc: "Restock your shop, add equipment or expand your stall. Designed for market traders and artisans.",
    security: "Savings pattern + one guarantor",
  },
  {
    icon: Bike,
    name: "Asset & Equipment Finance",
    rate: "3.5% monthly flat",
    range: "₦100,000 – ₦2,000,000",
    tenor: "Up to 24 months",
    desc: "Acquire tricycles, generators, POS terminals or machinery — the asset itself backs the facility.",
    security: "Asset + equity contribution",
  },
  {
    icon: GraduationCap,
    name: "Salary Advance",
    rate: "2.5% monthly flat",
    range: "₦50,000 – ₦1,000,000",
    tenor: "3 – 12 months",
    desc: "Bridge the gap before payday with a clean advance for salaried workers and civil servants.",
    security: "Domiciled salary + employer mandate",
  },
];

const CALC_PRODUCTS = [
  { id: "micro", label: "Micro Business — 3.0% / month", rate: 0.03 },
  { id: "asset", label: "Asset Finance — 3.5% / month", rate: 0.035 },
  { id: "salary", label: "Salary Advance — 2.5% / month", rate: 0.025 },
];

const naira = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

function LoanCalculator() {
  const [productId, setProductId] = useState("micro");
  const [amount, setAmount] = useState(200_000);
  const [months, setMonths] = useState(12);

  const { monthlyPayment, totalInterest, totalRepayment, rateLabel } = useMemo(() => {
    const product = CALC_PRODUCTS.find((p) => p.id === productId) ?? CALC_PRODUCTS[0];
    const interest = Math.round(amount * product.rate * months);
    const total = amount + interest;
    return {
      monthlyPayment: Math.round(total / months),
      totalInterest: interest,
      totalRepayment: total,
      rateLabel: `${(product.rate * 100).toFixed(1)}%`,
    };
  }, [productId, amount, months]);

  return (
    <div className="rounded-3xl bg-brand-950 p-6 shadow-2xl sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-gold-500">
          <Calculator className="size-5 text-brand-950" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-white">Loan calculator</h3>
          <p className="text-xs text-brand-200">Estimate repayment in seconds</p>
        </div>
      </div>

      <div className="mt-6 space-y-7">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-200">
            Loan type
          </label>
          <Select value={productId} onValueChange={setProductId}>
            <SelectTrigger className="h-11 w-full border-white/20 bg-white/10 text-sm font-semibold text-white [&>span]:line-clamp-1 [&>span]:text-white [&_svg]:text-gold-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CALC_PRODUCTS.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-200">
              Loan amount
            </label>
            <span className="rounded-lg bg-gold-500/15 px-3 py-1 text-sm font-bold text-gold-300">
              {naira(amount)}
            </span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={([v]) => setAmount(v)}
            min={20_000}
            max={2_000_000}
            step={10_000}
            aria-label="Loan amount in naira"
            className="[&_[data-slot=slider-range]]:bg-gold-500 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-gold-400 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-track]]:bg-white/15"
          />
          <div className="mt-1.5 flex justify-between text-[10px] font-medium text-brand-300">
            <span>₦20k</span>
            <span>₦2M</span>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-200">
              Repayment tenor
            </label>
            <span className="rounded-lg bg-gold-500/15 px-3 py-1 text-sm font-bold text-gold-300">
              {months} month{months > 1 ? "s" : ""}
            </span>
          </div>
          <Slider
            value={[months]}
            onValueChange={([v]) => setMonths(v)}
            min={3}
            max={24}
            step={1}
            aria-label="Repayment tenor in months"
            className="[&_[data-slot=slider-range]]:bg-gold-500 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-gold-400 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-track]]:bg-white/15"
          />
          <div className="mt-1.5 flex justify-between text-[10px] font-medium text-brand-300">
            <span>3 months</span>
            <span>24 months</span>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
          <div className="rounded-xl bg-gold-500 p-3.5 text-center text-brand-950 sm:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-wider">Monthly repayment</p>
            <p className="mt-1 font-serif text-3xl font-bold">{naira(monthlyPayment)}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-200">
              Total interest
            </p>
            <p className="mt-1 text-sm font-bold text-white">{naira(totalInterest)}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-200">
              Total repayment
            </p>
            <p className="mt-1 text-sm font-bold text-white">{naira(totalRepayment)}</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-200">
              Flat rate
            </p>
            <p className="mt-1 text-sm font-bold text-white">{rateLabel} / month</p>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-brand-300">
          Indicative estimate only. Final rates and fees depend on product terms, credit
          assessment and applicable charges. Insurance and documentation fees may apply.
        </p>

        <a
          href="#contact"
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-sm font-bold text-brand-950 transition-colors hover:bg-gold-400"
        >
          Apply for this loan
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function Loans() {
  return (
    <section id="loans" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            Loans & financing
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Responsible credit for real businesses
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            No suits required. We lend against your savings pattern, your business cash-flow and
            your character — not your paperwork. Try the calculator to see what repayment looks
            like before you apply.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Loan products */}
          <div className="space-y-5">
            {LOAN_PRODUCTS.map(({ icon: Icon, name, rate, range, tenor, desc, security }, index) => (
              <Reveal key={name} delay={index * 0.08}>
                <article className="rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-gold-300 hover:shadow-lg">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-brand-800">
                        <Icon className="size-5 text-gold-300" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-brand-900">{name}</h3>
                        <span className="mt-0.5 inline-block rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold text-gold-700">
                          {rate}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-xs font-semibold text-muted-foreground">
                      <p className="flex items-center gap-1.5 justify-end">
                        <Wallet className="size-3.5 text-brand-600" aria-hidden="true" />
                        {range}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 justify-end">
                        <BadgeCheck className="size-3.5 text-brand-600" aria-hidden="true" />
                        {tenor}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-brand-800">
                      <FileCheck2 className="size-3.5 text-gold-600" aria-hidden="true" />
                      Security: {security}
                    </span>
                    <a
                      href="#contact"
                      className="group ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-gold-600"
                    >
                      Apply now
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gold-300/70 bg-gold-50 p-5">
                <Briefcase className="size-8 shrink-0 text-gold-600" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-brand-900">
                  <span className="font-bold">What you need to apply:</span> BVN, valid ID, one
                  passport photograph, utility bill — plus 3 months of savings history with us (or
                  a guarantor with a Muamala account).
                </p>
              </div>
            </Reveal>
          </div>

          {/* Calculator */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <LoanCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
