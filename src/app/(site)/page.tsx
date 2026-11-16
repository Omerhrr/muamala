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
      <Hero settings={settings.home} mock={settings.mock} />
      <TrustBar settings={settings.trust} ui={settings.ui} />
      <About settings={settings.about} general={settings.general} />
      <Products settings={settings.products} products={products} ui={settings.ui} />
      <Loans settings={settings.loans} loans={loans} ui={settings.ui} />
      <AppPromo settings={settings.app} general={settings.general} ui={settings.ui} mock={settings.mock} />
      {news.length > 0 ? (
        <NewsSection settings={settings.news} posts={news} ui={settings.ui} />
      ) : (
        <NewsEmpty settings={settings.news} ui={settings.ui} />
      )}
      <Faq settings={settings.faq} faqs={faqs} general={settings.general} ui={settings.ui} />
      <Contact contact={settings.contact} general={settings.general} ui={settings.ui} />
    </>
  );
}
