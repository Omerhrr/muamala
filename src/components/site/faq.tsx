import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";
import type { FaqSettings, GeneralSettings, UiSettings } from "@/lib/site-settings";
import type { FaqRecord } from "@/lib/content";

export function Faq({
  settings,
  faqs,
  general,
  ui,
}: {
  settings: FaqSettings;
  faqs: FaqRecord[];
  general: GeneralSettings;
  ui: UiSettings;
}) {
  return (
    <section id="faq" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            {settings.eyebrow || "Frequently asked questions"}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            {settings.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{settings.subtitle}</p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={`item-${index}`}>
                <AccordionTrigger className="py-5 text-left text-sm font-bold text-brand-900 hover:text-gold-600 hover:no-underline sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {general.phones[0] && (
          <Reveal delay={0.2} className="mt-6 text-center text-sm text-muted-foreground">
            {ui.faqStuck}{" "}
            <a href={`tel:${general.phones[0].replace(/[^0-9+]/g, "")}`} className="font-bold text-brand-800 hover:text-gold-600">
              {general.phones[0]}
            </a>{" "}
            {ui.faqStuckAfter}
          </Reveal>
        )}
      </div>
    </section>
  );
}
