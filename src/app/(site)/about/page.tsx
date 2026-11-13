import Image from "next/image";
import { ArrowRight, Banknote, Eye, Landmark, ShieldCheck, Target } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { getSettingsGroup, getPages, getTeam } from "@/lib/content";
import type { AboutPageSettings, GeneralSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const general = await getSettingsGroup("general");
  return {
    title: `About us | ${general.bankName}`,
    description: `Learn about ${general.shortName} — our story, vision, mission, board and management team, corporate governance and community work in Suleja, Niger State.`,
  };
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
}: {
  name: string;
  role: string;
  bio: string | null;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-800 font-serif text-lg font-bold text-gold-300">
          {fmtInitials(name)}
        </span>
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
  const [general, aboutPage, team, pages] = await Promise.all([
    getSettingsGroup("general"),
    getSettingsGroup("aboutPage"),
    getTeam(),
    getPages(),
  ]);
  const a = aboutPage as AboutPageSettings;
  const g = general as GeneralSettings;

  const VALUE_CHIPS = ["Integrity", "Community first", "Customer focus", "Transparency"];

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`The community bank behind ${g.shortName}`}
        subtitle={`${g.bankName} (${g.rcNumber}) — licensed by the Central Bank of Nigeria and headquartered in Suleja, Niger State. Get to know our story, our people and the principles that guide how we serve you.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
          >
            Open an Account
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            Contact our team
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
              <Image
                src="/images/about-market.jpg"
                alt="Traders and customers at a market in Suleja, Niger State"
                width={1152}
                height={864}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              Our history
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {a.historyTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{a.historyBody}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5">
                <Landmark className="size-6 text-gold-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-brand-900">CBN licensed</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  A fully licensed microfinance bank
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <ShieldCheck className="size-6 text-gold-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-brand-900">NDIC insured</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Deposits insured up to the statutory limit
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <Banknote className="size-6 text-gold-600" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold text-brand-900">Interswitch powered</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Secure cards, transfers & bills
                </p>
              </div>
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
                Our core values
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {VALUE_CHIPS.map((value) => (
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
              Leadership
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Board of Directors
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The board provides oversight, sets strategy and safeguards the soundness of the bank
              on behalf of our customers, regulators and community.
            </p>
          </Reveal>
          {team.board.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.board.map((member, index) => (
                <Reveal key={member.id} delay={index * 0.06}>
                  <TeamCard name={member.name} role={member.role} bio={member.bio} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Board profiles will be published here shortly. Please contact the bank for current
              directorship information.
            </Reveal>
          )}
        </div>
      </section>

      {/* Management */}
      <section className="bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              Leadership
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              Management Team
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Day-to-day, our management team runs the branch, the agent network and the digital
              services you rely on.
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
              Management profiles will be published here shortly.
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
                Regulation & policies
              </p>
              <h2 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
                Licensed, supervised and transparent
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-200">
                {g.bankName} operates under the supervision of the Central Bank of Nigeria. Our
                deposits are insured by the NDIC, and our customer protection, privacy and terms
                documents are always available for you to read.
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
