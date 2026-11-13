import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import type { NewsSettings } from "@/lib/site-settings";
import type { NewsRecord } from "@/lib/content";

const fmt = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function NewsSection({
  settings,
  posts,
}: {
  settings: NewsSettings;
  posts: NewsRecord[];
}) {
  if (posts.length === 0) return null;

  return (
    <section id="news" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
              {settings.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
              {settings.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{settings.subtitle}</p>
          </div>
          <a
            href="/news"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-brand-800 transition-colors hover:border-gold-300 hover:text-gold-600"
          >
            All news
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.08}>
              <a
                href={`/news/${post.id}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-brand-800 px-3 py-1 text-[11px] font-bold text-gold-300">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {fmt.format(post.date)}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-brand-900 group-hover:text-gold-700">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors group-hover:text-gold-600">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsEmpty({ settings }: { settings: NewsSettings }) {
  return (
    <section id="news" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Newspaper className="mx-auto size-10 text-gold-500" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-brand-900">{settings.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Announcements will appear here soon.</p>
      </div>
    </section>
  );
}
