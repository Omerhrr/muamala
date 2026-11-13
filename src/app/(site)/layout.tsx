import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { getSettingsGroup, getPages } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const general = await getSettingsGroup("general");
  const footer = await getSettingsGroup("footer");
  const pages = await getPages();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar general={general} />
      <main className="flex-1">{children}</main>
      <Footer general={general} footer={footer} pages={pages} />
      <FloatingWhatsApp whatsapp={general.whatsapp} />
    </div>
  );
}
