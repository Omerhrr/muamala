import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-24">
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-brand-800">
          <Compass className="size-8 text-gold-300" aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
          Error 404
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-brand-900">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you are looking for may have been moved or no longer exists. Try the homepage,
          or contact us and we will point you in the right direction.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700"
          >
            Back to home
          </a>
          <a
            href="/#contact"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-brand-800 transition-colors hover:border-gold-300 hover:text-gold-600"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
