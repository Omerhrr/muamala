import { ArrowRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { getIcon } from "@/lib/icons";
import type { ProductsSettings, UiSettings } from "@/lib/site-settings";
import type { ProductRecord } from "@/lib/content";

const CATEGORY_KEYS = ["savings", "loans", "digital", "other"] as const;

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  savings: getIcon("PiggyBank"),
  loans: getIcon("HandCoins"),
  digital: getIcon("Smartphone"),
  other: getIcon("Store"),
};

const CATEGORY_FALLBACK: Record<string, { label: string; blurb: string }> = {
  savings: {
    label: "Savings Accounts",
    blurb: "Individual, group and business savings that reward consistency.",
  },
  loans: {
    label: "Loan Facilities",
    blurb: "Personal loans, business loans and SME financing with responsible terms.",
  },
  digital: {
    label: "Digital Banking",
    blurb: "Mobile banking, instant transfers and balance enquiries on any phone.",
  },
  other: {
    label: "Other Services",
    blurb: "POS services, bill payments and agency banking in your neighbourhood.",
  },
};

export function Products({
  settings,
  products,
  ui,
}: {
  settings: ProductsSettings;
  products: ProductRecord[];
  ui: UiSettings;
}) {
  const categories = CATEGORY_KEYS.map((key, index) => {
    const saved = settings.categories?.[index];
    const fallback = CATEGORY_FALLBACK[key];
    return {
      key,
      label: saved?.label?.trim() || fallback.label,
      blurb: saved?.blurb?.trim() || fallback.blurb,
      icon: CATEGORY_ICONS[key],
    };
  });

  return (
    <section id="products" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            {settings.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            {settings.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{settings.subtitle}</p>
        </Reveal>

        {categories.map((meta, catIndex) => {
          const items = products.filter((p) => p.category === meta.key);
          if (items.length === 0) return null;
          const Icon = meta.icon;
          return (
            <div key={meta.key} className="mt-16">
              <Reveal delay={catIndex * 0.05}>
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-800">
                    <Icon className="size-5 text-gold-300" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-900">{meta.label}</h3>
                    <p className="text-sm text-muted-foreground">{meta.blurb}</p>
                  </div>
                </div>
              </Reveal>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(({ icon, title, desc, features }, index) => {
                  const ItemIcon = getIcon(icon);
                  return (
                    <Reveal key={title} delay={(index % 3) * 0.08}>
                      <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-brand-800 transition-colors group-hover:bg-gold-500">
                          <ItemIcon
                            className="size-6 text-gold-300 transition-colors group-hover:text-brand-950"
                            aria-hidden="true"
                          />
                        </div>
                        <h4 className="mt-5 font-serif text-lg font-bold text-brand-900">{title}</h4>
                        <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                        <ul className="mt-4 flex-1 space-y-2.5">
                          {features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2.5 text-sm text-foreground/85"
                            >
                              <span
                                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gold-500"
                                aria-hidden="true"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={meta.key === "loans" ? "/apply?tab=loan" : "/apply?tab=account"}
                          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-gold-600"
                        >
                          {ui.getStarted}
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </a>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
