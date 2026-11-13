import Image from "next/image";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { getNews, getSettingsGroup } from "@/lib/content";
import type { NewsSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const general = await getSettingsGroup("general");
  return {
    title: `News & updates | ${general.bankName}`,
    description: `Announcements, product launches, community outreach and financial literacy articles from ${general.shortName}.`,
  };
}

const fmt = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function NewsPage() {
  const [settings, posts] = await Promise.all([getSettingsGroup("news"), getNews()]);
  const n = settings as NewsSettings;

  return (
    <>
      <PageHeader
        eyebrow={n.eyebrow || "News & updates"}
        title={n.title}
        subtitle={n.subtitle}
      />

      <section className="bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <Newspaper className="mx-auto size-10 text-gold-500" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl font-bold text-brand-900">
                No announcements yet
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                News, events and updates will appear here soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={(index % 3) * 0.08}>
                  <a
                    href={`/news/${post.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl"
                  >
                    {post.image ? (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="lattice-bg flex aspect-[16/9] items-center justify-center bg-brand-900">
                        <Newspaper className="size-10 text-gold-400/80" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-brand-800 px-3 py-1 text-[11px] font-bold text-gold-300">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                          <CalendarDays className="size-3.5" aria-hidden="true" />
                          {fmt.format(post.date)}
                        </span>
                      </div>
                      <h2 className="mt-4 font-serif text-lg font-bold leading-snug text-brand-900 group-hover:text-gold-700">
                        {post.title}
                      </h2>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors group-hover:text-gold-600">
                        Read more
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
