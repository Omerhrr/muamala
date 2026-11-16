import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Markdown } from "@/components/site/markdown";
import { getNewsPost, getSettingsGroup } from "@/lib/content";
import type { UiSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const [post, general, ui] = await Promise.all([getNewsPost(id), getSettingsGroup("general"), getSettingsGroup("ui")]);
  if (!post) return { title: `${(ui as UiSettings).bankPageSuffix} | ${general.shortName}` };
  return {
    title: `${post.title} | ${general.shortName}`,
    description: post.excerpt,
  };
}

const fmt = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const [post, ui] = await Promise.all([getNewsPost(id), getSettingsGroup("ui")]);
  if (!post) notFound();
  const u = ui as UiSettings;

  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} subtitle={post.excerpt}>
        <p className="mt-6 flex items-center gap-2 text-sm text-brand-200">
          <CalendarDays className="size-4 text-gold-400" aria-hidden="true" />
          {fmt.format(post.date)}
        </p>
      </PageHeader>

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {post.image && (
            <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} className="w-full object-cover" />
            </div>
          )}

          <article className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-10">
            <Markdown>{post.body}</Markdown>
          </article>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <a
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-brand-800 transition-colors hover:border-gold-300 hover:text-gold-600"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {u.backToAllNews}
            </a>
            <a
              href="/#contact"
              className="text-sm font-bold text-brand-700 underline-offset-4 hover:text-gold-600 hover:underline"
            >
              {u.newsQuestions}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
