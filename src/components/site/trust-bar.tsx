import { Landmark, ShieldCheck, Zap } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Landmark,
    title: "Licensed by the Central Bank of Nigeria",
    sub: "A fully licensed microfinance bank",
  },
  {
    icon: ShieldCheck,
    title: "Deposits insured by NDIC",
    sub: "Your savings enjoy statutory deposit insurance",
  },
  {
    icon: Zap,
    title: "Payments powered by Interswitch",
    sub: "Secure cards, transfers & bill payments",
  },
];

export function TrustBar() {
  return (
    <section aria-label="Regulatory assurance" className="border-b border-gold-200 bg-gold-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:grid-cols-3">
        {TRUST_ITEMS.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-white">
              <Icon className="size-5 text-gold-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-900">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
