import { ArrowRight, Banknote, Eye, Landmark, ShieldCheck, Target } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { getSettingsGroup, getPages, getTeam, pageMeta } from "@/lib/content";
import type { AboutPageSettings, AboutSettings, TrustSettings, UiSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMeta("about");
}

const fmtInitials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

function TeamCard({
  name,
  role,
  bio,
  photo,
}: {
  name: string;
  role: string;
  bio: string | null;
  photo?: string | null;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-4">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} loading="lazy" className="size-14 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-800 font-serif text-lg font-bold text-gold-300">
            {fmtInitials(name)}
          </span>
        )}
        <div>
          <p className="font-serif text-lg font-bold leading-snug text-brand-900">{name}</p>
          <p className="mt-0.5 text-sm font-semibold text-gold-700">{role}</p>
        </div>
      </div>
      {bio && <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{bio}</p>}
    </div>
  );
}

export default async function AboutPage() {
  const [general, aboutPage, aboutHome, trust, ui, team, pages] = await Promise.all([
    getSettingsGroup("general"),
    getSettingsGroup("aboutPage"),
    getSettingsGroup("about"),
    getSettingsGroup("trust"),
    getSettingsGroup("ui"),
    getTeam(),
    getPages(),
  ]);
  const a = aboutPage as AboutPageSettings;
  const home = aboutHome as AboutSettings;
  const trustItems = (trust as TrustSettings).items ?? [];
  const u = ui as UiSettings;
  const TRUST_ICONS = [Landmark, ShieldCheck, Banknote];
  const valueChips = ((aboutHome as { values?: { label: string }[] }).values ?? [])
    .map((v) => v.label)
    .filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow={a.pageEyebrow}
        title={a.pageTitle}
        subtitle={a.pageSubtitle}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
          >
            {a.ctaPrimary}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            {a.ctaSecondary}
          </a>
        </div>
      </PageHeader>

      {/* History / story */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div
              className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold-300/60"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={home.image}
                alt={home.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {a.historyEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {a.historyTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{a.historyBody}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {trustItems.map(({ title, sub }, index) => {
                const Icon = TRUST_ICONS[index % TRUST_ICONS.length];
                return (
                  <div key={`${title}-${index}`} className="rounded-2xl border border-border bg-card p-5">
                    <Icon className="size-6 text-gold-600" aria-hidden="true" />
                    <p className="mt-3 text-sm font-bold text-brand-900">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{sub}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl bg-brand-950 p-8 text-brand-100 sm:p-10">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10">
                  <Eye className="size-6 text-gold-300" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-serif text-2xl font-bold text-white">{a.visionTitle}</h2>
                <p className="mt-4 leading-relaxed text-brand-200">{a.visionBody}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border-2 border-gold-300/70 bg-gold-50 p-8 sm:p-10">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold-500/20">
                  <Target className="size-6 text-gold-700" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-serif text-2xl font-bold text-brand-900">
                  {a.missionTitle}
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/80">{a.missionBody}</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
              <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-gold-600">
                {u.aboutCoreValues}
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {valueChips.map((value) => (
                  <span
                    key={value}
                    className="rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-brand-900"
                  >
                    {value}
                  </span>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-muted-foreground">{a.valuesBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Board */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {a.boardEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {a.boardTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {a.boardIntro}
            </p>
          </Reveal>
          {team.board.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.board.map((member, index) => (
                <Reveal key={member.id} delay={index * 0.06}>
                  <TeamCard name={member.name} role={member.role} bio={member.bio} photo={member.photo} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              {a.boardEmpty}
            </Reveal>
          )}
        </div>
      </section>

      {/* Management */}
      <section className="bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {a.managementEyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {a.managementTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {a.managementIntro}
            </p>
          </Reveal>
          {team.management.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.management.map((member, index) => (
                <Reveal key={member.id} delay={index * 0.06}>
                  <TeamCard name={member.name} role={member.role} bio={member.bio} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              {a.managementEmpty}
            </Reveal>
          )}
        </div>
      </section>

      {/* Governance + CSR */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-8 sm:p-10">
              <h2 className="font-serif text-2xl font-bold text-brand-900">{a.governanceTitle}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{a.governanceBody}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border bg-card p-8 sm:p-10">
              <h2 className="font-serif text-2xl font-bold text-brand-900">{a.csrTitle}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{a.csrBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Regulation + policy links */}
      <section className="lattice-bg bg-brand-950 py-16 text-brand-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">
                {a.regEyebrow}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
                {a.regTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-200">
                {a.regBody}
              </p>
            </div>
            {pages.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {pages.slice(0, 6).map((page) => (
                  <a
                    key={page.slug}
                    href={`/pages/${page.slug}`}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-brand-100 transition-colors hover:border-gold-300 hover:text-gold-300"
                  >
                    {page.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
