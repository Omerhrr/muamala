import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/reveal";

const FAQS = [
  {
    q: "Is Muamala Micro-Finance Bank licensed?",
    a: "Yes. Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria (CBN) as a microfinance bank, and customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to the applicable statutory limit.",
  },
  {
    q: "How do I open an account?",
    a: "Visit any Muamala branch or agent near you with your Bank Verification Number (BVN), a valid means of identification, one passport photograph and a utility bill. Opening a personal savings account takes less than 15 minutes. You can also start the process by sending us a message through the contact form below.",
  },
  {
    q: "What do I need to qualify for a loan?",
    a: "For most loans you need: a BVN, valid ID, a passport photograph and proof of address, plus either 3 months of savings history with Muamala or a credit-worthy guarantor who banks with us. Micro business loans also consider your daily sales and cash-flow — no land documents required.",
  },
  {
    q: "How much are your loan interest rates?",
    a: "Our flat rates range from 2.5% to 3.5% per month depending on the product: 2.5% for salary advances, 3.0% for micro business loans and 3.5% for asset & equipment finance. Use the loan calculator above to estimate your monthly repayment before applying.",
  },
  {
    q: "Can I bank without a smartphone?",
    a: "Absolutely. Dial *777# on any mobile phone — no smartphone and no data bundle needed — to check your balance, transfer funds and buy airtime. You can also bank at any of our branches or through Muamala agents across Niger State.",
  },
  {
    q: "How safe are my deposits?",
    a: "Your deposits are held with a CBN-licensed institution and insured by the NDIC up to the statutory limit per depositor. We also use bank-grade encryption on all our digital channels, with Interswitch-secured card and payment processing.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            Frequently asked questions
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Questions our customers ask
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Can&rsquo;t find your answer here? Send us a message below or call 0803 123 4567 — a
            real person will respond.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`}>
                <AccordionTrigger className="py-5 text-left text-sm font-bold text-brand-900 hover:text-gold-600 hover:no-underline sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
