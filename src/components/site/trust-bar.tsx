import { Landmark, ShieldCheck, Zap } from "lucide-react";
import type { TrustSettings } from "@/lib/site-settings";

const ICONS = [Landmark, ShieldCheck, Zap];

export function TrustBar({ settings }: { settings: TrustSettings }) {
  return (
    <section aria-label="Regulatory assurance" className="border-b border-gold-200 bg-gold-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:grid-cols-3">
        {settings.items.map(({ title, sub }, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div key={title} className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-300 bg-white">
                <Icon className="size-5 text-gold-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-900">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
