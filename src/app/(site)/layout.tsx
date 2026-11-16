import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { getSettingsGroup, getPages } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [general, footer, brand, nav, home, ui, pages] = await Promise.all([
    getSettingsGroup("general"),
    getSettingsGroup("footer"),
    getSettingsGroup("brand"),
    getSettingsGroup("nav"),
    getSettingsGroup("home"),
    getSettingsGroup("ui"),
    getPages(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-gold-500 px-4 py-2 text-sm font-bold text-brand-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {ui.skipToContent}
      </a>
      <Navbar general={general} brand={brand} nav={nav} announcement={home.announcement} />
      <main id="main" className="flex-1">{children}</main>
      <Footer general={general} footer={footer} brand={brand} pages={pages} ui={ui} />
      <FloatingWhatsApp whatsapp={general.whatsapp} label={ui.whatsappAria} />
    </div>
  );
}
