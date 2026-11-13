import { Reveal } from "@/components/site/reveal";

/** Dark hero band used at the top of every sub-page (navbar sits on it). */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="lattice-bg relative overflow-hidden bg-brand-950 pb-16 pt-32 text-brand-100 sm:pb-20 sm:pt-40">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-700/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl leading-relaxed text-brand-200">{subtitle}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
