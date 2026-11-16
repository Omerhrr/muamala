import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Contact } from "@/components/site/contact";
import { waLink } from "@/lib/wa";
import { getSettingsGroup, pageMeta } from "@/lib/content";
import type { ContactSettings, GeneralSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMeta("contact");
}

export default async function ContactPage() {
  const [contact, general, ui] = await Promise.all([
    getSettingsGroup("contact"),
    getSettingsGroup("general"),
    getSettingsGroup("ui"),
  ]);
  const c = contact as ContactSettings;
  const g = general as GeneralSettings;
  const telHref = `tel:${(g.phones[0] ?? "").replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <PageHeader
        eyebrow={c.pageEyebrow || "Contact us"}
        title={c.title}
        subtitle={c.subtitle}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {g.whatsapp && (
            <a
              href={waLink(g.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {ui.ctPageWa}
            </a>
          )}
          <a
            href={telHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            Call {g.phones[0]}
          </a>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold-300 hover:text-gold-300"
          >
            {ui.ctPageOpen}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </PageHeader>

      {/* Info cards, enquiry form and Google map */}
      <Contact contact={c} general={g} ui={ui} />
    </>
  );
}
