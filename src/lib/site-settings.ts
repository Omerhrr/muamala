/**
 * Editable site content definitions — the single source of truth shared by
 * the seed script, the public site components and the admin settings editor.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "image"
  | "list" // string[]
  | "items"; // { [key]: string }[] with fixed itemFields

export type ItemFieldDef = { name: string; label: string; type: "text" | "textarea" };

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  itemFields?: ItemFieldDef[];
};

export type GroupDef = { key: string; title: string; description?: string; fields: FieldDef[] };

export type Item = Record<string, string>;

export type GeneralSettings = {
  bankName: string;
  shortName: string;
  rcNumber: string;
  tagline: string;
  address: string; // multiline
  phones: string[];
  whatsapp: string;
  emails: string[];
  hours: string[];
  rcLine: string;
  ussd: string;
  mapEmbedUrl: string;
  mapLink: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
};

export type HomeSettings = {
  announcement: string; // empty = hidden
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  stats: { value: string; label: string }[];
};

export type TrustSettings = {
  items: { title: string; sub: string }[];
};

export type AboutSettings = {
  eyebrow: string;
  title: string;
  body1: string;
  body2: string;
  promises: string[];
  values: { label: string }[];
};

export type AboutPageSettings = {
  historyTitle: string;
  historyBody: string;
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
  valuesBody: string;
  governanceTitle: string;
  governanceBody: string;
  csrTitle: string;
  csrBody: string;
};

export type ProductsSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type LoansSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  requirementsNote: string;
  calcNote: string;
};

export type AppSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: { title: string; desc: string }[];
  ussdNote: string;
  internetBankingNote: string;
  playStoreUrl: string;
  appStoreUrl: string;
};

export type NewsSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type FaqSettings = {
  title: string;
  subtitle: string;
};

export type ContactSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  walkinTitle: string;
  walkinBody: string;
  subjects: string[];
};

export type FooterSettings = {
  blurb: string;
  productLinks: string[];
  smallprint: string;
};

export type ApplySettings = {
  title: string;
  subtitle: string;
  accountNote: string;
  loanNote: string;
};

export type ServicesPageSettings = {
  title: string;
  subtitle: string;
  repaymentTitle: string;
  repaymentBody: string;
  repaymentChannels: string[];
  supportTitle: string;
  supportBody: string;
  whatsappTitle: string;
  whatsappBody: string;
};

export type DigitalPageSettings = {
  title: string;
  subtitle: string;
  ussdStepsTitle: string;
  ussdSteps: string[];
  securityTitle: string;
  securityBody: string;
  securityTips: string[];
  supportTitle: string;
  supportBody: string;
};

export type CompliancePageSettings = {
  title: string;
  subtitle: string;
  cbnTitle: string;
  cbnBody: string;
  ndicTitle: string;
  ndicBody: string;
  protectionTitle: string;
  protectionBody: string;
  complaintsTitle: string;
  complaintsBody: string;
  whistleTitle: string;
  whistleBody: string;
  amlTitle: string;
  amlBody: string;
};

export type SiteSettingsPayload = {
  general: GeneralSettings;
  home: HomeSettings;
  trust: TrustSettings;
  about: AboutSettings;
  aboutPage: AboutPageSettings;
  products: ProductsSettings;
  loans: LoansSettings;
  app: AppSettings;
  news: NewsSettings;
  faq: FaqSettings;
  contact: ContactSettings;
  footer: FooterSettings;
  apply: ApplySettings;
  servicesPage: ServicesPageSettings;
  digitalPage: DigitalPageSettings;
  compliancePage: CompliancePageSettings;
};

export const SETTING_GROUPS: GroupDef[] = [
  {
    key: "general",
    title: "General & Contact",
    description: "Bank identity, address, phone numbers, emails, opening hours and social links.",
    fields: [
      { name: "bankName", label: "Bank legal name", type: "text" },
      { name: "shortName", label: "Short name", type: "text" },
      { name: "rcNumber", label: "RC number", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "address", label: "Head office address", type: "textarea", help: "One line per row — shown on multiple lines across the site." },
      { name: "phones", label: "Phone numbers", type: "list" },
      { name: "whatsapp", label: "WhatsApp number", type: "text", help: "International format, e.g. +234 803 456 7890" },
      { name: "emails", label: "Email addresses", type: "list" },
      { name: "hours", label: "Operating hours", type: "list" },
      { name: "rcLine", label: "Utility bar line", type: "text", help: "Short text shown at the very top on desktop, e.g. RC number + city." },
      { name: "ussd", label: "USSD code", type: "text" },
      { name: "mapEmbedUrl", label: "Google Maps embed URL", type: "url", help: "Use https://www.google.com/maps?q=...&output=embed" },
      { name: "mapLink", label: "Google Maps link", type: "url" },
      { name: "facebook", label: "Facebook URL", type: "url" },
      { name: "instagram", label: "Instagram URL", type: "url" },
      { name: "twitter", label: "X (Twitter) URL", type: "url" },
      { name: "linkedin", label: "LinkedIn URL", type: "url" },
    ],
  },
  {
    key: "home",
    title: "Homepage & Hero",
    description: "Announcement banner, hero section text, call-to-action buttons and statistics.",
    fields: [
      { name: "announcement", label: "Announcement banner", type: "text", help: "Leave empty to hide the banner." },
      { name: "heroBadge", label: "Hero badge", type: "text" },
      { name: "heroTitle", label: "Hero title", type: "textarea" },
      { name: "heroTitleAccent", label: "Accent words", type: "text", help: "This part of the title is shown in italic gold." },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { name: "heroCtaPrimary", label: "Primary button", type: "text" },
      { name: "heroCtaSecondary", label: "Secondary button", type: "text" },
      {
        name: "stats",
        label: "Statistics",
        type: "items",
        itemFields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
    ],
  },
  {
    key: "trust",
    title: "Trust Bar",
    description: "The regulatory assurance strip under the hero.",
    fields: [
      {
        name: "items",
        label: "Trust items",
        type: "items",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "sub", label: "Subtitle", type: "text" },
        ],
      },
    ],
  },
  {
    key: "about",
    title: "About (homepage)",
    description: "The About preview section on the homepage.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "body1", label: "Paragraph 1", type: "textarea" },
      { name: "body2", label: "Paragraph 2", type: "textarea" },
      { name: "promises", label: "Promises", type: "list" },
      {
        name: "values",
        label: "Core values",
        type: "items",
        itemFields: [{ name: "label", label: "Value", type: "text" }],
      },
    ],
  },
  {
    key: "aboutPage",
    title: "About page",
    description: "Full sections used on the /about page: history, vision, mission, governance and CSR.",
    fields: [
      { name: "historyTitle", label: "History title", type: "text" },
      { name: "historyBody", label: "History body", type: "textarea" },
      { name: "visionTitle", label: "Vision title", type: "text" },
      { name: "visionBody", label: "Vision body", type: "textarea" },
      { name: "missionTitle", label: "Mission title", type: "text" },
      { name: "missionBody", label: "Mission body", type: "textarea" },
      { name: "valuesBody", label: "Core values body", type: "textarea" },
      { name: "governanceTitle", label: "Governance title", type: "text" },
      { name: "governanceBody", label: "Governance body", type: "textarea" },
      { name: "csrTitle", label: "CSR title", type: "text" },
      { name: "csrBody", label: "CSR body", type: "textarea" },
    ],
  },
  {
    key: "products",
    title: "Products section",
    description: "Heading texts for the products & services section.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
    ],
  },
  {
    key: "loans",
    title: "Loans section",
    description: "Heading texts and notes for the loans & calculator section.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "requirementsNote", label: "Requirements note", type: "textarea" },
      { name: "calcNote", label: "Calculator disclaimer", type: "textarea" },
    ],
  },
  {
    key: "app",
    title: "Mobile app section",
    description: "Muamala Mobile promo, USSD note and store links.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      {
        name: "features",
        label: "App features",
        type: "items",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "desc", label: "Description", type: "text" },
        ],
      },
      { name: "ussdNote", label: "USSD note", type: "text" },
      { name: "internetBankingNote", label: "Internet banking note", type: "text" },
      { name: "playStoreUrl", label: "Google Play URL", type: "url" },
      { name: "appStoreUrl", label: "App Store URL", type: "url" },
    ],
  },
  {
    key: "news",
    title: "News section",
    description: "Heading texts for the news & announcements section.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
    ],
  },
  {
    key: "faq",
    title: "FAQ section",
    description: "Heading texts for the frequently asked questions.",
    fields: [
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
    ],
  },
  {
    key: "contact",
    title: "Contact section",
    description: "Contact section texts, enquiry subjects and the walk-in card.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "walkinTitle", label: "Walk-in card title", type: "text" },
      { name: "walkinBody", label: "Walk-in card body", type: "textarea" },
      { name: "subjects", label: "Enquiry subjects", type: "list" },
    ],
  },
  {
    key: "footer",
    title: "Footer",
    description: "Footer blurb, product links and regulatory smallprint.",
    fields: [
      { name: "blurb", label: "Footer blurb", type: "textarea" },
      { name: "productLinks", label: "Product links", type: "list" },
      { name: "smallprint", label: "Regulatory smallprint", type: "textarea" },
    ],
  },
  {
    key: "apply",
    title: "Apply page",
    description: "Texts for the online account opening & loan application page.",
    fields: [
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "accountNote", label: "Account form note", type: "textarea" },
      { name: "loanNote", label: "Loan form note", type: "textarea" },
    ],
  },
  {
    key: "servicesPage",
    title: "Customer service page",
    description: "Texts for the /services page: self-service cards, loan repayment information, ATM/POS support and WhatsApp support.",
    fields: [
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "repaymentTitle", label: "Loan repayment title", type: "text" },
      { name: "repaymentBody", label: "Loan repayment body", type: "textarea" },
      { name: "repaymentChannels", label: "Repayment channels", type: "list" },
      { name: "supportTitle", label: "ATM/POS support title", type: "text" },
      { name: "supportBody", label: "ATM/POS support body", type: "textarea" },
      { name: "whatsappTitle", label: "WhatsApp support title", type: "text" },
      { name: "whatsappBody", label: "WhatsApp support body", type: "textarea" },
    ],
  },
  {
    key: "digitalPage",
    title: "Digital banking page",
    description: "Texts for the /digital page: USSD steps, security tips and support.",
    fields: [
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "ussdStepsTitle", label: "USSD steps title", type: "text" },
      { name: "ussdSteps", label: "USSD steps", type: "list", help: "One step per line — shown as a numbered how-to." },
      { name: "securityTitle", label: "Security title", type: "text" },
      { name: "securityBody", label: "Security body", type: "textarea" },
      { name: "securityTips", label: "Security tips", type: "list" },
      { name: "supportTitle", label: "Support title", type: "text" },
      { name: "supportBody", label: "Support body", type: "textarea" },
    ],
  },
  {
    key: "compliancePage",
    title: "Compliance page",
    description: "Texts for the /compliance page: licence, deposit insurance, customer protection, complaints and whistleblowing summaries.",
    fields: [
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "cbnTitle", label: "CBN card title", type: "text" },
      { name: "cbnBody", label: "CBN card body", type: "textarea" },
      { name: "ndicTitle", label: "NDIC card title", type: "text" },
      { name: "ndicBody", label: "NDIC card body", type: "textarea" },
      { name: "protectionTitle", label: "Customer protection card title", type: "text" },
      { name: "protectionBody", label: "Customer protection card body", type: "textarea" },
      { name: "complaintsTitle", label: "Complaints card title", type: "text" },
      { name: "complaintsBody", label: "Complaints card body", type: "textarea" },
      { name: "whistleTitle", label: "Whistleblowing card title", type: "text" },
      { name: "whistleBody", label: "Whistleblowing card body", type: "textarea" },
      { name: "amlTitle", label: "AML card title", type: "text" },
      { name: "amlBody", label: "AML card body", type: "textarea" },
    ],
  },
];

export const DEFAULT_SETTINGS: SiteSettingsPayload = {
  general: {
    bankName: "Muamala Micro-Finance Bank Limited",
    shortName: "Muamala MFB",
    rcNumber: "RC 7179149",
    tagline: "Community banking that grows with you",
    address: "Murada Shopping Complex\nSuleja, Niger State, Nigeria",
    phones: ["+234 803 456 7890", "+234 805 987 6543"],
    whatsapp: "+234 803 456 7890",
    emails: ["hello@muamalamfb.com.ng", "support@muamalamfb.com.ng"],
    hours: [
      "Mon – Fri: 8:00am – 4:00pm",
      "Sat: 9:00am – 1:00pm",
      "Sun & public holidays: Closed",
    ],
    rcLine: "RC 7179149 · Suleja, Niger State",
    ussd: "*777#",
    mapEmbedUrl: "https://www.google.com/maps?q=Murada+Shopping+Complex,+Suleja,+Niger+State&output=embed",
    mapLink: "https://maps.google.com/?q=Murada+Shopping+Complex,+Suleja,+Niger+State",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  home: {
    announcement: "Muamala Mobile app — coming soon to Google Play & the App Store. Bank on any phone today with *777#.",
    heroBadge: "Licensed by the Central Bank of Nigeria",
    heroTitle: "Banking that grows with your hustle, wherever you are in Niger State.",
    heroTitleAccent: "your hustle",
    heroSubtitle:
      "Muamala Micro-Finance Bank gives market women, artisans, farmers and small businesses the savings, loans and payments tools of a modern bank — with the warmth of the community bank next door.",
    heroCtaPrimary: "Open an Account",
    heroCtaSecondary: "Explore Products",
    stats: [
      { value: "12,000+", label: "Customers served" },
      { value: "₦850M+", label: "Loans disbursed" },
      { value: "40+", label: "Agent locations" },
      { value: "98%", label: "Loan repayment rate" },
    ],
  },
  trust: {
    items: [
      {
        title: "Licensed by the Central Bank of Nigeria",
        sub: "A fully licensed microfinance bank",
      },
      {
        title: "Deposits insured by NDIC — up to ₦2,000,000",
        sub: "Your savings enjoy statutory deposit insurance",
      },
      {
        title: "Payments powered by Interswitch",
        sub: "Secure cards, transfers & bill payments",
      },
    ],
  },
  about: {
    eyebrow: "Who we are",
    title: "A community bank built for the everyday hustle of Nigeria",
    body1:
      "Muamala Micro-Finance Bank Limited is a Niger State–based microfinance bank on a mission to bring formal financial services within reach of every trader, farmer, artisan, salary earner and small business. Where big banks see too small, we see the real economy — the market stalls, the workshops, the family shops that keep communities moving.",
    body2:
      "We combine the reach of our branch and agent network with modern digital banking — cards, transfers, USSD and a mobile app on the way — so you can save safely, borrow responsibly and grow your business at your own pace.",
    promises: [
      "Licensed by the Central Bank of Nigeria (CBN)",
      "Deposits insured by the NDIC up to the statutory limit",
      "Branch and agent network across Niger State",
      "Simple, transparent charges — no hidden fees",
    ],
    values: [{ label: "Integrity" }, { label: "Community first" }, { label: "Customer focus" }, { label: "Transparency" }],
  },
  aboutPage: {
    historyTitle: "Our story",
    historyBody:
      "Muamala Micro-Finance Bank Limited (RC 7179149) began as Musharaka Micro-Finance Bank, serving traders and farming families around Suleja. The bank was renamed Muamala MFB to reflect its renewed promise: honest, patient, community-centred banking. From our head office at Murada Shopping Complex, Suleja, we have grown into a branch-and-agent network touching thousands of households and small businesses across Niger State.",
    visionTitle: "Our vision",
    visionBody:
      "To be the most trusted community bank in Nigeria — the first choice for households, traders and small enterprises who want dignified, affordable financial services close to home.",
    missionTitle: "Our mission",
    missionBody:
      "To promote financial inclusion by providing simple, secure and affordable savings, credit and payment services that help our customers grow their businesses, educate their children and plan their futures.",
    valuesBody:
      "Integrity — we keep our word. Community first — your growth is our growth. Customer focus — banking shaped around real lives, not paperwork. Transparency — clear terms, clear charges, no surprises.",
    governanceTitle: "Corporate governance",
    governanceBody:
      "Muamala MFB is governed by a Board of Directors with a balance of executive, non-executive and independent members, supported by Board committees for Audit, Risk Management and Credit. The bank applies the CBN's corporate governance guidelines for microfinance banks, with clear segregation of duties, internal audit oversight and regular regulatory reporting.",
    csrTitle: "Corporate social responsibility",
    csrBody:
      "We invest in the communities that sustain us — financial literacy classes for schools and market associations, support for local cooperatives, and community outreach programmes around Suleja and the wider Niger State.",
  },
  products: {
    eyebrow: "Our products",
    title: "Everything a growing business and household needs",
    subtitle:
      "From your first ₦1,000 savings to financing that restocks your shop — one bank, one account, all the tools.",
  },
  loans: {
    eyebrow: "Loans & financing",
    title: "Responsible credit for real businesses",
    subtitle:
      "No suits required. We lend against your savings pattern, your business cash-flow and your character — not your paperwork. Try the calculator to see what repayment looks like before you apply.",
    requirementsNote:
      "What you need to apply: BVN, valid ID, one passport photograph, utility bill — plus 3 months of savings history with us (or a guarantor with a Muamala account).",
    calcNote:
      "Indicative estimate only. Final rates and fees depend on product terms, credit assessment and applicable charges. Insurance and documentation fees may apply.",
  },
  app: {
    eyebrow: "Muamala Mobile",
    title: "Your branch, in your pocket",
    subtitle:
      "The Muamala Mobile app is in final testing with our partners at Interswitch and will hit the stores soon. Meanwhile, you can already bank on any phone with our USSD service.",
    features: [
      { title: "Instant transfers", desc: "Send money to any Nigerian bank in seconds." },
      { title: "Airtime & bills", desc: "Top-up airtime, data, electricity and more." },
      { title: "Target savings", desc: "Create and track savings goals right on your phone." },
      { title: "Agent locator", desc: "Find the nearest Muamala agent or branch instantly." },
    ],
    ussdNote: "Banking on any phone — no smartphone, no data bundle needed.",
    internetBankingNote:
      "Internet banking login launches together with the mobile app — one secure sign-on for web and mobile.",
    playStoreUrl: "",
    appStoreUrl: "",
  },
  news: {
    eyebrow: "News & updates",
    title: "Latest from the bank",
    subtitle: "Announcements, product launches, community outreach and financial literacy tips.",
  },
  faq: {
    title: "Questions our customers ask",
    subtitle: "Can't find your answer here? Send us a message below or call us — a real person will respond.",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Talk to us today",
    subtitle:
      "Opening an account, applying for a loan, becoming an agent or just asking a question — we usually respond within one business day.",
    walkinTitle: "Prefer to walk into a branch?",
    walkinBody:
      "Walk into our Suleja head office at Murada Shopping Complex or call any of our agents around you — bring your BVN and valid ID and we'll have you banking in minutes.",
    subjects: [
      "General enquiry",
      "Open an account",
      "Loan application",
      "Agent partnership",
      "ATM/POS support",
      "Complaints & feedback",
    ],
  },
  footer: {
    blurb:
      "Muamala Micro-Finance Bank Limited is a community-focused microfinance bank headquartered in Suleja, Niger State — bringing savings, loans and payments within reach of every household and small business.",
    productLinks: [
      "Individual savings",
      "Group & ajo savings",
      "Business savings",
      "Micro & SME loans",
      "Cards & payments",
      "Agency banking",
    ],
    smallprint:
      "Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria (CBN). Deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦2,000,000 per depositor. Card, transfer and bill payment services are processed through Interswitch infrastructure.",
  },
  apply: {
    title: "Open an account or apply for a loan",
    subtitle:
      "Start online in two minutes — our team will call you back to complete the process at any branch or agent point near you.",
    accountNote:
      "Bring your BVN, a valid ID, one passport photograph and a utility bill when you visit the branch or agent to complete your account opening.",
    loanNote:
      "Loan applications are subject to our credit process. An officer will contact you within one business day to discuss your application.",
  },
  servicesPage: {
    title: "Customer service & self-service",
    subtitle:
      "Start an application, check a repayment, report a card issue or find an answer — most things can be done in minutes, online or on any phone.",
    repaymentTitle: "Loan repayment information",
    repaymentBody:
      "Repaying your Muamala loan is simple and flexible. Your schedule is agreed in your offer letter — weekly or monthly — and you can liquidate early without hidden penalties. If you foresee difficulty making an installment, contact your loan officer before the due date and we will work out a plan with you.",
    repaymentChannels: [
      "Direct debit from your Muamala savings account",
      "Standing order from any Nigerian bank",
      "Cash at the Suleja branch or any Muamala agent",
      "Transfer into your loan account",
      "Dial *777# and follow the loan repayment menu",
    ],
    supportTitle: "ATM/POS support & enquiries",
    supportBody:
      "Card stuck, transaction failed or POS terminal down? Report it and we will investigate immediately. Failed transactions are auto-reversed by the payment switch; if a reversal takes longer than 24 hours, contact us with the transaction reference and we will escalate for you.",
    whatsappTitle: "WhatsApp customer service",
    whatsappBody:
      "Chat with our customer service team on WhatsApp during business hours — enquiries, statements requests, card issues and general support.",
  },
  digitalPage: {
    title: "Digital banking & mobile app",
    subtitle:
      "Bank from your phone, any phone. Transfers, payments, savings goals and support — secured with bank-grade encryption and Interswitch infrastructure.",
    ussdStepsTitle: "Banking on any phone with USSD",
    ussdSteps: [
      "Dial *777# on the phone line registered to your account",
      "Choose an option — balance, transfer, airtime or repayment",
      "Enter your amount and select the beneficiary account",
      "Confirm with your USSD PIN and receive an instant SMS receipt",
    ],
    securityTitle: "Security you can bank on",
    securityBody:
      "Every Muamala digital channel is protected with bank-grade encryption, and card and payment processing runs on Interswitch infrastructure. We will never call, SMS or email you asking for your PIN, password or full card number.",
    securityTips: [
      "Never share your PIN, password or OTP with anyone — not even bank staff",
      "Muamala staff will never ask you to move money to “safe-keep” it",
      "Cover your PIN at POS terminals and ATMs",
      "Report lost cards or a stolen phone immediately by phone or WhatsApp",
      "Check your SMS and email alerts after every transaction",
      "Change your password regularly and avoid obvious numbers or names",
    ],
    supportTitle: "Password reset & support",
    supportBody:
      "Locked out or forgotten your password? Our support team can reset your access after verifying your identity — call us, chat on WhatsApp or send a message and we will walk you through it.",
  },
  compliancePage: {
    title: "Regulation & compliance",
    subtitle:
      "We hold ourselves to the highest regulatory standards — licensed by the Central Bank of Nigeria, deposits insured by the NDIC, and policies that put customers first.",
    cbnTitle: "CBN licence status",
    cbnBody:
      "Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria as a microfinance bank and operates under its supervision, examination and reporting framework.",
    ndicTitle: "NDIC deposit insurance",
    ndicBody:
      "Customer deposits are insured by the Nigeria Deposit Insurance Corporation up to ₦2,000,000 per depositor — the statutory maximum microfinance bank coverage.",
    protectionTitle: "Customer protection",
    protectionBody:
      "We follow the CBN's consumer protection framework: clear disclosure of terms, fair treatment, responsible lending, data privacy and transparent, prompt complaint resolution.",
    complaintsTitle: "Complaints handling",
    complaintsBody:
      "Every complaint is logged and tracked. We acknowledge within 24 hours, investigate and give you a written resolution. Unresolved complaints can be escalated to the CBN Consumer Protection Department.",
    whistleTitle: "Whistleblowing channel",
    whistleBody:
      "Suspect fraud, misconduct or a regulatory breach? Report it confidentially by phone, email or in writing — reports can be made anonymously and are handled without retaliation.",
    amlTitle: "Anti-money laundering & KYC",
    amlBody:
      "We run a full AML/CFT programme — customer due diligence, KYC at onboarding, transaction monitoring and statutory reporting to the NFIU, in line with CBN and NDLEA/NFIU requirements.",
  },
};

export type SettingsGroupKey = keyof SiteSettingsPayload;
