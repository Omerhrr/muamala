import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { About } from "@/components/site/about";
import { Products } from "@/components/site/products";
import { Loans } from "@/components/site/loans";
import { NewsSection, NewsEmpty } from "@/components/site/news-section";
import { AppPromo } from "@/components/site/app-promo";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { getSiteSettings, getProducts, getLoanProducts, getFaqs, getNews } from "@/lib/content";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSiteSettings();
  const [products, loans, faqs, news] = await Promise.all([
    getProducts(),
    getLoanProducts(),
    getFaqs(),
    getNews(3),
  ]);

  return (
    <>
      <Hero settings={settings.home} />
      {settings.home.announcement && (
        <div className="bg-gold-500 px-4 py-2.5 text-center">
          <p className="text-xs font-semibold text-brand-950 sm:text-sm">
            <MessageCircle className="mr-1.5 inline size-4 -translate-y-px" aria-hidden="true" />
            {settings.home.announcement}
          </p>
        </div>
      )}
      <TrustBar settings={settings.trust} />
      <About settings={settings.about} general={settings.general} />
      <Products settings={settings.products} products={products} />
      <Loans settings={settings.loans} loans={loans} />
      <AppPromo settings={settings.app} general={settings.general} />
      {news.length > 0 ? (
        <NewsSection settings={settings.news} posts={news} />
      ) : (
        <NewsEmpty settings={settings.news} />
      )}
      <Faq settings={settings.faq} faqs={faqs} general={settings.general} />
      <Contact contact={settings.contact} general={settings.general} />
    </>
  );
}
