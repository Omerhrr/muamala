import { ArrowRight, CheckCircle2, Eye, HandHeart, Target, Users } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import type { AboutSettings } from "@/lib/site-settings";
import type { GeneralSettings } from "@/lib/site-settings";

const VALUE_ICONS = [HandHeart, Users, Target, Eye];

export function About({
  settings,
  general,
}: {
  settings: AboutSettings;
  general: GeneralSettings;
}) {
  return (
    <section id="about" className="bg-card py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}
        <Reveal className="relative">
          <div
            className="absolute left-0 top-0 -translate-x-2 -translate-y-2 sm:-translate-x-4 sm:-translate-y-4 h-full w-full rounded-3xl border-2 border-gold-300/60"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {settings.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.image}
                alt={settings.imageAlt}
                loading="lazy"
                className="h-[300px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px]"
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="absolute -bottom-6 right-2 rounded-2xl border border-gold-200 bg-white px-5 py-3 shadow-xl sm:-right-7 sm:px-6 sm:py-4">
            <p className="font-serif text-2xl font-bold text-brand-800">{general.rcNumber}</p>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              {settings.rcCaption}
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {settings.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              {settings.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-muted-foreground">{settings.body1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{settings.body2}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3">
              {settings.promises.map((promise) => (
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
              {settings.values.map(({ label }, index) => {
                const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
                return (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-3"
                  >
                    <Icon className="size-4 text-gold-600" aria-hidden="true" />
                    <span className="text-xs font-bold text-brand-900">{label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <a
              href={settings.learnMoreHref || "/about"}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors hover:text-gold-600"
            >
              {settings.learnMoreLabel}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
