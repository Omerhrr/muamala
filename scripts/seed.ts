/**
 * Seed the CMS database with the bank's content.
 * Run: bun run scripts/seed.ts
 */
import { db } from "@/lib/db";
import { DEFAULT_SETTINGS, SETTING_GROUPS } from "@/lib/site-settings";
import { THEME_PRESETS } from "@/lib/theme";
import { hashPassword } from "@/lib/auth";
import { SEED_PAGES } from "./seed-pages";

async function main() {
  console.log("Seeding Muamala MFB CMS …");

  /* ---------- settings ---------- */
  for (const group of SETTING_GROUPS) {
    const value = JSON.stringify(
      DEFAULT_SETTINGS[group.key as keyof typeof DEFAULT_SETTINGS]
    );
    await db.siteSetting.upsert({
      where: { key: group.key },
      update: {},
      create: { key: group.key, value },
    });
  }
  console.log("settings: ok");

  /* ---------- themes ---------- */
  const existingThemes = await db.themeConfig.count();
  if (existingThemes === 0) {
    for (const preset of THEME_PRESETS) {
      await db.themeConfig.create({
        data: {
          name: preset.name,
          brand: preset.brand,
          gold: preset.gold,
          bg: preset.bg,
          isPreset: true,
          isActive: preset.name === "Teal & Gold",
        },
      });
    }
    console.log("themes: seeded 5 presets");
  } else {
    console.log("themes: already present, skipped");
  }

  /* ---------- products ---------- */
  const productCount = await db.product.count();
  if (productCount === 0) {
    const products = [
      // savings
      {
        category: "savings", icon: "PiggyBank",
        title: "Individual Savings Account",
        desc: "A flexible savings account that rewards consistency.",
        features: JSON.stringify([
          "Open with just ₦1,000 and your BVN",
          "Competitive interest, credited quarterly",
          "Free SMS & email alerts on every transaction",
          "Naira debit card on request",
        ]),
        order: 1,
      },
      {
        category: "savings", icon: "Users",
        title: "Group & Ajo Savings",
        desc: "Save towards a goal, alone or with your group.",
        features: JSON.stringify([
          "Perfect for ajo, esusu & cooperative groups",
          "Lock funds until maturity to build discipline",
          "Auto-debit standing orders from any account",
          "Bonus rate for goals completed to maturity",
        ]),
        order: 2,
      },
      {
        category: "savings", icon: "ShoppingBag",
        title: "Business Savings",
        desc: "Built for the daily cash-flow of small business.",
        features: JSON.stringify([
          "Cheque books & corporate collections",
          "Bulk salary payments & POS settlements",
          "Overdraft for customers with a good track record",
          "Free monthly e-statements",
        ]),
        order: 3,
      },
      // loans
      {
        category: "loans", icon: "HandCoins",
        title: "Personal Loans",
        desc: "Bridge school fees, medical bills or family projects responsibly.",
        features: JSON.stringify([
          "Salary advances for civil servants & employees",
          "Clear rates from 2.5% per month",
          "Tenors of 3-12 months",
          "Decision within 48 hours of complete KYC",
        ]),
        order: 1,
      },
      {
        category: "loans", icon: "Store",
        title: "Business Loans",
        desc: "Working capital designed for market traders and artisans.",
        features: JSON.stringify([
          "From ₦20,000 for micro businesses",
          "Lend against savings pattern & daily sales",
          "No land documents required",
          "Flexible weekly or monthly repayment",
        ]),
        order: 2,
      },
      {
        category: "loans", icon: "Tractor",
        title: "SME Financing",
        desc: "Bigger facilities to acquire assets and scale up.",
        features: JSON.stringify([
          "Asset & equipment finance up to ₦2,000,000",
          "The financed asset backs the facility",
          "Tenors up to 24 months",
          "Dedicated SME relationship officer",
        ]),
        order: 3,
      },
      // digital
      {
        category: "digital", icon: "Smartphone",
        title: "Mobile Banking",
        desc: "The Muamala Mobile app: your branch in your pocket.",
        features: JSON.stringify([
          "Transfers, airtime & bill payments",
          "Target savings goals on the go",
          "Agent & branch locator",
          "Coming soon to Google Play & App Store",
        ]),
        order: 1,
      },
      {
        category: "digital", icon: "Send",
        title: "Transfers & Payments",
        desc: "Pay, transfer and get paid, anywhere, anytime.",
        features: JSON.stringify([
          "Instant transfers to all Nigerian banks",
          "Interswitch-secured processing",
          "Bill payments via Quickteller",
          "Naira debit card accepted nationwide",
        ]),
        order: 2,
      },
      {
        category: "digital", icon: "Wifi",
        title: "Balance & USSD Banking",
        desc: "Check balances and bank without a smartphone.",
        features: JSON.stringify([
          "Dial *777# on any phone, no data needed",
          "Balance enquiry, transfers & airtime",
          "Works on MTN, Airtel, Glo & 9mobile",
          "Mini statements on request",
        ]),
        order: 3,
      },
      // other
      {
        category: "other", icon: "CreditCard",
        title: "POS Services",
        desc: "Accept card payments in your shop or business.",
        features: JSON.stringify([
          "POS terminals for merchants",
          "Next-day settlement to your account",
          "Card & cashless transaction support",
          "ATM/POS support & enquiries",
        ]),
        order: 1,
      },
      {
        category: "other", icon: "Receipt",
        title: "Bill Payments",
        desc: "Everyday bills, settled in one place.",
        features: JSON.stringify([
          "Electricity, water & cable TV",
          "Exams, school & government fees",
          "Airtime & data top-up",
          "Receipts for every payment",
        ]),
        order: 2,
      },
      {
        category: "other", icon: "Landmark",
        title: "Agency Banking",
        desc: "Full banking services on your street, not across town.",
        features: JSON.stringify([
          "Cash-in & cash-out at agent points near you",
          "Open an account on the go with an agent",
          "Bill payments & airtime at the agent",
          "Become an agent and earn commissions",
        ]),
        order: 3,
      },
    ];
    for (const p of products) await db.product.create({ data: p });
    console.log("products: seeded", products.length);
  } else {
    console.log("products: already present, skipped");
  }

  /* ---------- loan products ---------- */
  const loanCount = await db.loanProduct.count();
  if (loanCount === 0) {
    const loans = [
      {
        name: "Micro Business Loan",
        desc: "Restock your shop, add equipment or expand your stall. Designed for market traders and artisans.",
        ratePct: 3.0, minAmount: 20000, maxAmount: 500000, maxTerm: 12,
        security: "Savings pattern + one guarantor",
        icon: "Store", order: 1,
      },
      {
        name: "Asset & Equipment Finance",
        desc: "Acquire tricycles, generators, POS terminals or machinery, with the asset itself backing the facility.",
        ratePct: 3.5, minAmount: 100000, maxAmount: 2000000, maxTerm: 24,
        security: "Asset + equity contribution",
        icon: "Bike", order: 2,
      },
      {
        name: "Salary Advance",
        desc: "Bridge the gap before payday with a clean advance for salaried workers and civil servants.",
        ratePct: 2.5, minAmount: 50000, maxAmount: 1000000, maxTerm: 12,
        security: "Domiciled salary + employer mandate",
        icon: "GraduationCap", order: 3,
      },
    ];
    for (const l of loans) await db.loanProduct.create({ data: l });
    console.log("loan products: seeded", loans.length);
  } else {
    console.log("loan products: already present, skipped");
  }

  /* ---------- FAQs ---------- */
  const faqCount = await db.faq.count();
  if (faqCount === 0) {
    const faqs = [
      {
        question: "Is Muamala Micro-Finance Bank licensed?",
        answer:
          "Yes. Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria (CBN) as a microfinance bank, and customer deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦2,000,000 per depositor.",
        order: 1,
      },
      {
        question: "How do I open an account?",
        answer:
          "Visit our head office at Murada Shopping Complex, Suleja, or any Muamala agent near you with your Bank Verification Number (BVN), a valid means of identification, one passport photograph and a utility bill. Opening a personal savings account takes less than 15 minutes. You can also start online through the 'Open an Account' page and we will call you back.",
        order: 2,
      },
      {
        question: "What do I need to qualify for a loan?",
        answer:
          "For most loans you need: a BVN, valid ID, a passport photograph and proof of address, plus either 3 months of savings history with Muamala or a credit-worthy guarantor who banks with us. Micro business loans also consider your daily sales and cash-flow. No land documents required.",
        order: 3,
      },
      {
        question: "How much are your loan interest rates?",
        answer:
          "Our flat rates range from 2.5% to 3.5% per month depending on the product: 2.5% for salary advances, 3.0% for micro business loans and 3.5% for asset & equipment finance. Use the loan calculator on our website to estimate your monthly repayment before applying.",
        order: 4,
      },
      {
        question: "Can I bank without a smartphone?",
        answer:
          "Absolutely. Dial *777# on any mobile phone (no smartphone and no data bundle needed) to check your balance, transfer funds and buy airtime. You can also bank at our branch or through Muamala agents across Niger State.",
        order: 5,
      },
      {
        question: "How safe are my deposits?",
        answer:
          "Your deposits are held with a CBN-licensed institution and insured by the NDIC up to ₦2,000,000 per depositor. We also use bank-grade encryption on our digital channels, with Interswitch-secured card and payment processing.",
        order: 6,
      },
      {
        question: "How do I repay a loan?",
        answer:
          "Repayment is flexible: direct debit from your savings account, standing orders, cash at the branch or any agent, or transfer into your loan account. Weekly or monthly schedules are agreed in your offer letter, and you can liquidate early without hidden penalties.",
        order: 7,
      },
      {
        question: "How do I become a Muamala agent?",
        answer:
          "Send an 'Agent partnership' enquiry through the contact form or call us. Basic requirements are a registered business or shop, a valid ID, BVN and a mobile money-ready smartphone. Approved agents earn commissions on cash-in/cash-out, account opening and bill payments.",
        order: 8,
      },
    ];
    for (const f of faqs) await db.faq.create({ data: f });
    console.log("faqs: seeded", faqs.length);
  } else {
    console.log("faqs: already present, skipped");
  }

  /* ---------- news ---------- */
  const newsCount = await db.newsPost.count();
  if (newsCount === 0) {
    const posts = [
      {
        title: "Muamala MFB launches new corporate website",
        category: "Announcement",
        excerpt:
          "Our new website makes it easier to learn about our products, start an account opening or loan application online, and reach the bank instantly.",
        body: `Muamala Micro-Finance Bank Limited is proud to launch its new corporate website: a modern, secure and customer-friendly home for everything Muamala.

The website introduces:

- **Online account opening requests**: start your application from your phone and finish at any branch or agent point;
- **A loan application form and repayment calculator**: see what repayment looks like before you apply;
- **Product information** across savings, loans, digital banking, POS, bill payments and agency banking;
- **Full regulatory and compliance information**: our CBN licence, NDIC deposit insurance, tariff guide, rates, complaints procedure and policies.

"This platform reflects who we are: a community bank with modern standards," said the Managing Director. "Customers should be able to reach us, understand our products and start their banking journey with confidence, wherever they are."

Visit us at Murada Shopping Complex, Suleja, or explore the site to get started. Banking on any phone is also available today via *777#, with the Muamala Mobile app launching soon on Google Play and the App Store.`,
        date: new Date("2026-11-02T09:00:00Z"),
      },
      {
        title: "Financial literacy outreach reaches students in Suleja",
        category: "Community",
        excerpt:
          "As part of our financial inclusion drive, Muamala MFB took savings and budgeting basics to secondary school students across Suleja.",
        body: `Muamala MFB's financial literacy team spent the week with students from secondary schools around Suleja, teaching the fundamentals of saving, budgeting and safe money habits.

The sessions covered:

1. why saving early matters and how compound growth works;
2. separating needs from wants when budgeting;
3. how a bank account works, and how to keep money safe from fraud;
4. simple record-keeping for young traders and artisans.

"Financial inclusion starts with financial knowledge," the team lead noted. "When a student opens their first savings account, a lifelong banking relationship begins."

The outreach forms part of the bank's corporate social responsibility programme and will continue through the year with market associations, artisans' guilds and cooperative groups across Niger State.`,
        date: new Date("2026-10-18T10:00:00Z"),
      },
      {
        title: "Muamala agent network expands across Suleja and beyond",
        category: "Announcement",
        excerpt:
          "Ten new agents have joined the Muamala network, bringing cash-in/cash-out, account opening and bill payments closer to more communities.",
        body: `Muamala MFB has onboarded ten new agents across Suleja and neighbouring communities, extending the reach of everyday banking services.

Agents provide cash deposits and withdrawals, account opening support, airtime and data top-up, bill payments and balance enquiries, so customers no longer need to travel to the branch for routine transactions.

"Becoming a Muamala agent changed my shop," one newly appointed agent said. "Customers come for banking and stay to buy; it grows my business while it serves the community."

Interested in becoming an agent? Requirements are simple: a registered shop or business, valid identification, BVN and commitment to service. Send us an 'Agent partnership' enquiry through the contact form or call the bank directly.`,
        date: new Date("2026-09-25T08:30:00Z"),
      },
    ];
    for (const p of posts) await db.newsPost.create({ data: p });
    console.log("news: seeded", posts.length);
  } else {
    console.log("news: already present, skipped");
  }

  /* ---------- team ---------- */
  const teamCount = await db.teamMember.count();
  if (teamCount === 0) {
    const team = [
      { name: "Alhaji Ibrahim Yusuf Suleiman", role: "Chairman, Board of Directors", type: "board", order: 1, bio: null },
      { name: "Hajiya Amina Bello", role: "Non-Executive Director", type: "board", order: 2, bio: null },
      { name: "Dr. Musa Ibrahim Kolo", role: "Independent Director", type: "board", order: 3, bio: null },
      { name: "Barr. Zainab Ahmed", role: "Non-Executive Director", type: "board", order: 4, bio: null },
      { name: "Muhammad Sani Garba", role: "Managing Director / CEO", type: "management", order: 1, bio: null },
      { name: "Fatima Abdullahi", role: "Head, Retail & Agent Banking", type: "management", order: 2, bio: null },
      { name: "Abdulrahman Sadiq", role: "Head, Operations & Technology", type: "management", order: 3, bio: null },
      { name: "Maryam Lawal", role: "Head, Finance & Compliance", type: "management", order: 4, bio: null },
    ];
    for (const t of team) await db.teamMember.create({ data: t });
    console.log("team: seeded", team.length, "(placeholder names, replace them in admin)");
  } else {
    console.log("team: already present, skipped");
  }

  /* ---------- regulatory / legal pages ---------- */
  const pageCount = await db.contentPage.count();
  if (pageCount === 0) {
    for (const p of SEED_PAGES) await db.contentPage.create({ data: p });
    console.log("pages: seeded", SEED_PAGES.length);
  } else {
    console.log("pages: already present, skipped");
  }

  /* ---------- admin user ---------- */
  const adminCount = await db.adminUser.count();
  if (adminCount === 0) {
    await db.adminUser.create({
      data: { username: "admin", passwordHash: hashPassword("muamala2026") },
    });
    console.log("admin: seeded (username: admin / password: muamala2026)");
  } else {
    console.log("admin: already present, skipped");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
