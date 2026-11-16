import { ArrowRight, HelpCircle, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { getIcon } from "@/lib/icons";
import { getLoanProducts, getProducts, getSettingsGroup, pageMeta } from "@/lib/content";
import type { ProductsSettings, UiSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMeta("products");
}

const CATEGORIES: {
  key: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  anchor: string;
}[] = [
  {
    key: "savings",
    label: "Savings Accounts",
    blurb: "Personal, group and business savings that reward consistency.",
    icon: getIcon("PiggyBank"),
    anchor: "savings",
  },
  {
    key: "loans",
    label: "Loan Facilities",
    blurb: "Personal loans, business loans and SME financing with responsible terms.",
    icon: getIcon("HandCoins"),
    anchor: "loans",
  },
  {
    key: "digital",
    label: "Digital Banking",
    blurb: "Mobile banking, instant transfers and balance enquiries on any phone.",
    icon: getIcon("Smartphone"),
    anchor: "digital",
  },
  {
    key: "other",
    label: "Other Services",
    blurb: "POS services, bill payments and agency banking in your neighbourhood.",
    icon: getIcon("Store"),
    anchor: "other",
  },
];

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export default async function ProductsPage() {
  const [settings, ui, products, loans] = await Promise.all([
    getSettingsGroup("products"),
    getSettingsGroup("ui"),
    getProducts(),
    getLoanProducts(),
  ]);
  const p = settings as ProductsSettings;
  const u = ui as UiSettings;

  return (
    <>
      <PageHeader
        eyebrow={u.prodEyebrow}
        title={p.title}
        subtitle={p.subtitle}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
          >
            {u.prodCtaPrimary}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            {u.prodCtaSecondary}
          </a>
        </div>
        {/* Category quick-nav */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.key}
              href={`#${cat.anchor}`}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-brand-100 transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              {p.categories?.[CATEGORIES.indexOf(cat)]?.label?.trim() || cat.label}
            </a>
          ))}
        </div>
      </PageHeader>

      {/* Product categories */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {CATEGORIES.map((base, catIndex) => {
            const meta = {
              ...base,
              label: p.categories?.[catIndex]?.label?.trim() || base.label,
              blurb: p.categories?.[catIndex]?.blurb?.trim() || base.blurb,
            };
            const items = products.filter((prod) => prod.category === meta.key);
            if (items.length === 0) return null;
            const Icon = meta.icon;
            return (
              <div key={meta.key} id={meta.anchor} className="scroll-mt-28">
                <div className={catIndex === 0 ? "" : "mt-20"}>
                  <Reveal delay={catIndex * 0.05}>
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-brand-800">
                        <Icon className="size-5 text-gold-300" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold text-brand-900 sm:text-2xl">
                          {meta.label}
                        </h2>
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
                            <h3 className="mt-5 font-serif text-lg font-bold text-brand-900">
                              {title}
                            </h3>
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
                              {u.getStarted}
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
              </div>
            );
          })}

          {/* Loan product rates & terms */}
          {loans.length > 0 && (
            <div id="loan-rates" className="mt-20 scroll-mt-28">
              <Reveal>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
                      {u.prodCreditEyebrow}
                    </p>
                    <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
                      {u.prodCreditTitle}
                    </h2>
                  </div>
                  <a
                    href="/#loans"
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-brand-900 transition-colors hover:bg-secondary/70"
                  >
                    <HelpCircle className="size-4 text-gold-600" aria-hidden="true" />
                    {u.prodCalcLink}
                  </a>
                </div>
              </Reveal>
              <div className="mt-8 overflow-hidden rounded-3xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-950 text-brand-100">
                    <tr>
                      <th className="px-5 py-4 font-bold">{u.thProduct}</th>
                      <th className="px-5 py-4 font-bold">{u.thRate}</th>
                      <th className="hidden px-5 py-4 font-bold sm:table-cell">{u.thAmount}</th>
                      <th className="hidden px-5 py-4 font-bold sm:table-cell">{u.thTenor}</th>
                      <th className="hidden px-5 py-4 font-bold md:table-cell">{u.thSecurity}</th>
                      <th className="px-5 py-4 font-bold">{u.thApply}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {loans.map((loan) => (
                      <tr key={loan.id} className="transition-colors hover:bg-secondary/50">
                        <td className="px-5 py-4">
                          <p className="font-bold text-brand-900">{loan.name}</p>
                          <p className="mt-0.5 max-w-xs text-xs text-muted-foreground">
                            {loan.desc}
                          </p>
                          <p className="mt-2 text-xs font-semibold text-brand-800 sm:hidden">
                            {naira(loan.minAmount)} - {naira(loan.maxAmount)} · {loan.maxTerm} mo
                          </p>
                        </td>
                        <td className="px-5 py-4 font-bold text-gold-700">{loan.ratePct}%</td>
                        <td className="hidden px-5 py-4 sm:table-cell">
                          {naira(loan.minAmount)} - {naira(loan.maxAmount)}
                        </td>
                        <td className="hidden px-5 py-4 sm:table-cell">{loan.maxTerm} months</td>
                        <td className="hidden max-w-[220px] px-5 py-4 text-muted-foreground md:table-cell">
                          {loan.security}
                        </td>
                        <td className="px-5 py-4">
                          <a
                            href="/apply?tab=loan"
                            className="inline-flex items-center gap-1 font-bold text-brand-700 hover:text-gold-600"
                          >
                            Apply
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {u.prodRatesNote}{" "}
                <a href="/pages/deposit-lending-rates" className="font-semibold text-brand-700 hover:text-gold-600">
                  {u.prodRatesLink}
                </a>{" "}
                and{" "}
                <a href="/pages/tariff-guide" className="font-semibold text-brand-700 hover:text-gold-600">
                  {u.prodTariffLink}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section className="lattice-bg bg-brand-950 py-16 text-brand-100">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              {u.prodBandTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-200">
              {u.prodBandBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              {u.prodBandPrimary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              {u.prodBandSecondary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
