import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Markdown } from "@/components/site/markdown";
import { getPage, getPages, getSettingsGroup } from "@/lib/content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  const general = await getSettingsGroup("general");
  if (!page) return { title: `Not found | ${general.bankName}` };
  return {
    title: `${page.title} | ${general.bankName}`,
    description: `${page.title} | ${general.bankName} (${general.rcNumber}), Suleja, Niger State.`,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  legal: "Legal",
  regulatory: "Regulatory & compliance",
  info: "Information",
};

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const [page, allPages, general] = await Promise.all([
    getPage(slug),
    getPages(),
    getSettingsGroup("general"),
  ]);
  if (!page) notFound();

  const others = allPages.filter((p) => p.slug !== slug).slice(0, 8);

  return (
    <>
      <PageHeader
        eyebrow={CATEGORY_LABELS[page.category] ?? "Information"}
        title={page.title}
        subtitle={`${general.bankName} (${general.rcNumber})`}
      />

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_260px]">
          <article className="min-w-0 rounded-3xl border border-border bg-card p-6 sm:p-10">
            <Markdown>{page.body}</Markdown>
          </article>

          <aside className="lg:pt-2">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-600">
                <FileText className="size-4" aria-hidden="true" />
                Policies & info
              </p>
              <ul className="mt-4 space-y-2.5">
                {allPages.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`/pages/${p.slug}`}
                      className={
                        p.slug === slug
                          ? "block rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-brand-900"
                          : "block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-brand-900"
                      }
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
              {others.length === 0 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  More documents will be published here.
                </p>
              )}
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-brand-800 transition-colors hover:border-gold-300 hover:text-gold-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </a>
        </div>
      </section>
    </>
  );
}
