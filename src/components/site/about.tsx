import Image from "next/image";
import { CheckCircle2, Eye, HandHeart, Target, Users } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const PROMISES = [
  "Licensed by the Central Bank of Nigeria (CBN)",
  "Deposits insured by the NDIC up to the statutory limit",
  "Branch and agent network across Niger State",
  "Simple, transparent charges — no hidden fees",
];

const VALUES = [
  { icon: HandHeart, label: "Integrity" },
  { icon: Users, label: "Community first" },
  { icon: Target, label: "Customer focus" },
  { icon: Eye, label: "Transparency" },
];

export function About() {
  return (
    <section id="about" className="bg-card py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}
        <Reveal className="relative">
          <div
            className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold-300/60"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/about-market.jpg"
              alt="A Nigerian entrepreneur arranging goods in her market stall"
              width={1152}
              height={864}
              priority
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="absolute -bottom-7 -right-4 rounded-2xl border border-gold-200 bg-white px-6 py-4 shadow-xl sm:-right-7">
            <p className="font-serif text-2xl font-bold text-brand-800">RC 7179149</p>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              Incorporated in Nigeria
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              Who we are
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              A community bank built for the everyday hustle of Nigeria
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Muamala Micro-Finance Bank Limited is a Niger State–based microfinance bank on a
              mission to bring formal financial services within reach of every trader, farmer,
              artisan, salary earner and small business. Where big banks see too small, we see
              the real economy — the market stalls, the workshops, the family shops that keep
              communities moving.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We combine the reach of our branch and agent network with modern digital banking —
              cards, transfers, USSD and a mobile app on the way — so you can save safely, borrow
              responsibly and grow your business at your own pace.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-brand-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-foreground">{promise}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {VALUES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-3"
                >
                  <Icon className="size-4 text-gold-600" aria-hidden="true" />
                  <span className="text-xs font-bold text-brand-900">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
