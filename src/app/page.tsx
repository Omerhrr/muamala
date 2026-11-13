import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { About } from "@/components/site/about";
import { Products } from "@/components/site/products";
import { Loans } from "@/components/site/loans";
import { AppPromo } from "@/components/site/app-promo";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <About />
        <Products />
        <Loans />
        <AppPromo />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
