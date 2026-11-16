/**
 * Editable site content definitions: the single source of truth shared by
 * the seed script, the public site components and the admin settings editor.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "image" // data-URL, site path or absolute URL (uploaded from the admin)
  | "select"
  | "list" // string[]
  | "items"; // { [key]: string }[] with fixed itemFields

export type ItemFieldDef = { name: string; label: string; type: "text" | "textarea" };

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  itemFields?: ItemFieldDef[];
  options?: { value: string; label: string }[];
  /** image fields: longest edge in px the upload is scaled down to */
  maxSize?: number;
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
  navCtaLabel: string;
  navCtaHref: string;
  mapEmbedUrl: string;
  mapLink: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
};

export type BrandSettings = {
  logoMode: "image-text" | "image-only" | "text-only";
  logoMark: string; // image
  logoAlt: string;
  logoHeight: number; // px, desktop
  wordmark: string;
  wordmarkSub: string;
  favicon: string; // image
  ogImage: string; // image
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  adminName: string;
};

export type NavSettings = {
  links: { label: string; href: string }[];
  menuOpenLabel: string;
  menuCloseLabel: string;
  callLabel: string;
  menuAria: string;
};

export type UiSettings = Record<string, string>;
export type SeoSettings = Record<string, string>;
export type MockSettings = {
  heroGreeting: string;
  heroUser: string;
  heroBalanceLabel: string;
  heroBalance: string;
  heroAccount: string;
  heroActions: string[];
  heroTxnTitle: string;
  heroViewAll: string;
  heroTxns: { label: string; sub: string; amount: string; type: string }[];
  savTitle: string;
  savSub: string;
  savGoalName: string;
  savGoalPct: string;
  savGoalAmount: string;
  savGoalNote: string;
  savGoals: { name: string; saved: string; of: string; pct: string }[];
  savNew: string;
};

export type HomeSettings = {
  announcement: string; // empty = hidden
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryHref: string;
  heroImage: string; // optional photo: replaces the phone mock-up
  heroImageAlt: string;
  heroCard1Title: string;
  heroCard1Body: string;
  heroCard2Title: string;
  heroCard2Body: string;
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
  image: string;
  imageAlt: string;
  rcCaption: string;
  learnMoreLabel: string;
  learnMoreHref: string;
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
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  historyEyebrow: string;
  boardEyebrow: string;
  boardTitle: string;
  boardIntro: string;
  boardEmpty: string;
  managementEyebrow: string;
  managementTitle: string;
  managementIntro: string;
  managementEmpty: string;
  regEyebrow: string;
  regTitle: string;
  regBody: string;
};

export type ProductsSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  categories: { label: string; blurb: string }[];
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
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type ContactSettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pageEyebrow: string;
  walkinTitle: string;
  walkinBody: string;
  subjects: string[];
};

export type FooterSettings = {
  blurb: string;
  quickLinksTitle: string;
  productsTitle: string;
  policiesTitle: string;
  contactTitle: string;
  quickLinks: { label: string; href: string }[];
  productLinks: string[]; // legacy plain list, kept for old saved data
  productLinkItems: { label: string; href: string }[];
  policiesAllLabel: string;
  policiesAllHref: string;
  ussdCaption: string;
  smallprint: string;
  legalLine: string;
};

export type ApplySettings = {
  eyebrow: string;
  title: string;
  subtitle: string;
  accountNote: string;
  loanNote: string;
  steps: { title: string; body: string }[];
};

export type ServicesPageSettings = {
  pageEyebrow: string;
  title: string;
  subtitle: string;
  repaymentTitle: string;
  repaymentBody: string;
  repaymentChannels: string[];
  supportTitle: string;
  supportBody: string;
  whatsappTitle: string;
  whatsappBody: string;
  whatsappCta: string;
  selfServiceEyebrow: string;
  selfServiceTitle: string;
  selfService: { title: string; desc: string; href: string }[];
};

export type DigitalPageSettings = {
  pageEyebrow: string;
  title: string;
  subtitle: string;
  ussdStepsTitle: string;
  ussdSteps: string[];
  securityTitle: string;
  securityBody: string;
  securityTips: string[];
  supportTitle: string;
  supportBody: string;
  internetBankingEyebrow: string;
  internetBankingTitle: string;
  internetBankingPoints: string[];
  loginBadge: string;
  loginCardTitle: string;
  loginNote: string;
};

export type CompliancePageSettings = {
  pageEyebrow: string;
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
  headerChips: string[];
  pillarsEyebrow: string;
  pillarsTitle: string;
  stepsEyebrow: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
};

export type SiteSettingsPayload = {
  brand: BrandSettings;
  nav: NavSettings;
  ui: UiSettings;
  seo: SeoSettings;
  mock: MockSettings;
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

/**
 * Small pieces of interface text (buttons, form labels, calculator captions…).
 * Every key is editable under Admin → Labels & buttons.
 */
export const UI_FIELDS: { name: string; label: string; value: string; group: string }[] = [
  // Buttons & links
  { group: "Buttons & links", name: "getStarted", label: "Product card link", value: "Get started" },
  { group: "Buttons & links", name: "applyNow", label: "Loan card link", value: "Apply now" },
  { group: "Buttons & links", name: "applyThisLoan", label: "Calculator apply button", value: "Apply for this loan" },
  { group: "Buttons & links", name: "readMore", label: "News card link", value: "Read more" },
  { group: "Buttons & links", name: "allNews", label: "All news button", value: "All news" },
  { group: "Buttons & links", name: "backToNews", label: "Back to news link", value: "Back to news" },
  { group: "Buttons & links", name: "learnMoreBank", label: "Home About link", value: "Learn more about the bank" },
  // Loan section & calculator
  { group: "Loans & calculator", name: "calcTitle", label: "Calculator title", value: "Loan calculator" },
  { group: "Loans & calculator", name: "calcSub", label: "Calculator subtitle", value: "Estimate repayment in seconds" },
  { group: "Loans & calculator", name: "calcLoanType", label: "Loan type label", value: "Loan type" },
  { group: "Loans & calculator", name: "calcAmount", label: "Loan amount label", value: "Loan amount" },
  { group: "Loans & calculator", name: "calcTenor", label: "Tenor label", value: "Repayment tenor" },
  { group: "Loans & calculator", name: "calcMonthly", label: "Monthly repayment label", value: "Monthly repayment" },
  { group: "Loans & calculator", name: "calcInterest", label: "Total interest label", value: "Total interest" },
  { group: "Loans & calculator", name: "calcTotal", label: "Total repayment label", value: "Total repayment" },
  { group: "Loans & calculator", name: "calcRate", label: "Flat rate label", value: "Flat rate" },
  { group: "Loans & calculator", name: "loanMonthlyFlat", label: "Rate badge suffix (after 3.0%)", value: "monthly flat" },
  { group: "Loans & calculator", name: "loanUpTo", label: "Tenor prefix (Up to N months)", value: "Up to" },
  { group: "Loans & calculator", name: "loanSecurity", label: "Security prefix", value: "Security:" },
  { group: "Loans & calculator", name: "loanNeed", label: "Requirements heading", value: "What you need to apply:" },
  // App promo
  { group: "Mobile app section", name: "storeGoogleTop", label: "Google Play badge (small text)", value: "Get it on" },
  { group: "Mobile app section", name: "storeGoogle", label: "Google Play badge (big text)", value: "Google Play" },
  { group: "Mobile app section", name: "storeAppleTop", label: "App Store badge (small text)", value: "Download on the" },
  { group: "Mobile app section", name: "storeApple", label: "App Store badge (big text)", value: "App Store" },
  { group: "Mobile app section", name: "storeSoon", label: "“Coming soon” pill", value: "Soon" },
  { group: "Mobile app section", name: "ussdWorksOn", label: "USSD networks title suffix", value: "works on" },
  { group: "Mobile app section", name: "ussdNetworks", label: "USSD networks list", value: "MTN · Airtel · Glo · 9mobile" },
  // News / FAQ / contact
  { group: "News, FAQ & contact", name: "newsEmpty", label: "No-news message", value: "Announcements will appear here soon." },
  { group: "News, FAQ & contact", name: "faqStuck", label: "FAQ help line (before phone)", value: "Still stuck? Call" },
  { group: "News, FAQ & contact", name: "faqStuckAfter", label: "FAQ help line (after phone)", value: "and a real person will respond." },
  { group: "News, FAQ & contact", name: "contactHead", label: "Head office card title", value: "Head Office" },
  { group: "News, FAQ & contact", name: "contactCall", label: "Phone card title", value: "Call us" },
  { group: "News, FAQ & contact", name: "contactEmail", label: "Email card title", value: "Email" },
  { group: "News, FAQ & contact", name: "contactHours", label: "Opening hours card title", value: "Opening hours" },
  { group: "News, FAQ & contact", name: "formName", label: "Form: name label", value: "Full name" },
  { group: "News, FAQ & contact", name: "formPhone", label: "Form: phone label", value: "Phone number" },
  { group: "News, FAQ & contact", name: "formEmail", label: "Form: email label", value: "Email (optional)" },
  { group: "News, FAQ & contact", name: "formSubject", label: "Form: subject label", value: "Subject" },
  { group: "News, FAQ & contact", name: "formMessage", label: "Form: message label", value: "Message" },
  { group: "News, FAQ & contact", name: "formSend", label: "Form: send button", value: "Send message" },
  // Products page
  { group: "Products page", name: "prodEyebrow", label: "Page top eyebrow", value: "Products & services" },
  { group: "Products page", name: "prodCtaPrimary", label: "Top button 1", value: "Open an Account" },
  { group: "Products page", name: "prodCtaSecondary", label: "Top button 2", value: "Talk to us" },
  { group: "Products page", name: "prodCreditEyebrow", label: "Loan table eyebrow", value: "Current credit offers" },
  { group: "Products page", name: "prodCreditTitle", label: "Loan table heading", value: "Loan products at a glance" },
  { group: "Products page", name: "prodCalcLink", label: "Calculator link", value: "Try the repayment calculator" },
  { group: "Products page", name: "thProduct", label: "Table: product column", value: "Product" },
  { group: "Products page", name: "thRate", label: "Table: rate column", value: "Flat rate / month" },
  { group: "Products page", name: "thAmount", label: "Table: amount column", value: "Amount range" },
  { group: "Products page", name: "thTenor", label: "Table: tenor column", value: "Max tenor" },
  { group: "Products page", name: "thSecurity", label: "Table: security column", value: "Security" },
  { group: "Products page", name: "thApply", label: "Table: apply column", value: "Apply" },
  { group: "Products page", name: "prodRatesNote", label: "Rates note", value: "Rates are flat monthly rates on the principal and are indicative. Final pricing depends on product terms, credit assessment and applicable charges. See our" },
  { group: "Products page", name: "prodRatesLink", label: "Rates note link 1 text", value: "current lending & deposit rates" },
  { group: "Products page", name: "prodTariffLink", label: "Rates note link 2 text", value: "tariff guide" },
  { group: "Products page", name: "prodBandTitle", label: "Bottom band title", value: "Not sure which product fits you?" },
  { group: "Products page", name: "prodBandBody", label: "Bottom band text", value: "Talk to our team. We will listen to your goals and match you with the savings or credit product that fits your cash-flow. No jargon, no pressure." },
  { group: "Products page", name: "prodBandPrimary", label: "Bottom band button 1", value: "Start online" },
  { group: "Products page", name: "prodBandSecondary", label: "Bottom band button 2", value: "Contact the bank" },
  // About / news / policy pages
  { group: "About, news & policy pages", name: "aboutCoreValues", label: "About: core values heading", value: "Our core values" },
  { group: "About, news & policy pages", name: "newsPageEmptyTitle", label: "News page: empty title", value: "No announcements yet" },
  { group: "About, news & policy pages", name: "newsPageEmptyBody", label: "News page: empty text", value: "News, events and updates will appear here soon." },
  { group: "About, news & policy pages", name: "newsQuestions", label: "News article: questions link", value: "Questions? Contact us" },
  { group: "About, news & policy pages", name: "backToAllNews", label: "News article: back link", value: "Back to all news" },
  { group: "About, news & policy pages", name: "policiesAside", label: "Policy page: sidebar heading", value: "Policies & info" },
  { group: "About, news & policy pages", name: "policiesMore", label: "Policy page: empty sidebar note", value: "More documents will be published here." },
  { group: "About, news & policy pages", name: "backHome", label: "Policy page: back link", value: "Back to home" },
  { group: "About, news & policy pages", name: "bankPageSuffix", label: "Search-title wording for news article pages", value: "News" },
  { group: "Apply forms", name: "apSuccessWa", label: "Success: WhatsApp button", value: "Chat with us on WhatsApp" },
  { group: "Apply forms", name: "apSuccessAgain", label: "Success: submit another button", value: "Submit another request" },
  { group: "Apply forms", name: "apAccSuccessTitle", label: "Account success title", value: "Account request received!" },
  { group: "Apply forms", name: "apAccSuccessMsg", label: "Account success message", value: "Our account officer will call you shortly to complete your account opening." },
  { group: "Apply forms", name: "apLoanSuccessTitle", label: "Loan success title", value: "Loan application received!" },
  { group: "Apply forms", name: "apLoanSuccessMsg", label: "Loan success message", value: "A loan officer will contact you within one business day to discuss your application." },
  { group: "Apply forms", name: "apErrTitle", label: "Error title", value: "Could not submit" },
  { group: "Apply forms", name: "apErrBody", label: "Validation error text", value: "Please check your details and try again." },
  { group: "Apply forms", name: "apNetTitle", label: "Network error title", value: "Network error" },
  { group: "Apply forms", name: "apNetBody", label: "Network error text", value: "Please check your connection and try again." },
  { group: "Apply forms", name: "apAccTitle", label: "Account form title", value: "Open a savings account" },
  { group: "Apply forms", name: "apAccSub", label: "Account form subtitle", value: "Individual, group or business" },
  { group: "Apply forms", name: "apName", label: "Full name label", value: "Full name *" },
  { group: "Apply forms", name: "apNamePh", label: "Account name placeholder", value: "e.g. Amina Yusuf" },
  { group: "Apply forms", name: "apPhone", label: "Phone label", value: "Phone number *" },
  { group: "Apply forms", name: "apPhonePh", label: "Phone placeholder", value: "0803 000 0000" },
  { group: "Apply forms", name: "apEmail", label: "Email label", value: "Email (optional)" },
  { group: "Apply forms", name: "apEmailPh", label: "Email placeholder", value: "you@example.com" },
  { group: "Apply forms", name: "apType", label: "Account type label", value: "Account type *" },
  { group: "Apply forms", name: "apTypePh", label: "Account type placeholder", value: "Choose account type" },
  { group: "Apply forms", name: "apTypeIndividual", label: "Account type: individual", value: "Individual savings" },
  { group: "Apply forms", name: "apTypeGroup", label: "Account type: group", value: "Group / cooperative savings" },
  { group: "Apply forms", name: "apTypeBusiness", label: "Account type: business", value: "Business current account" },
  { group: "Apply forms", name: "apAddress", label: "Address label", value: "Home / shop address (optional)" },
  { group: "Apply forms", name: "apAddressPh", label: "Address placeholder", value: "Street, area, town" },
  { group: "Apply forms", name: "apBvn", label: "BVN label", value: "BVN (optional)" },
  { group: "Apply forms", name: "apBvnPh", label: "BVN placeholder", value: "11 digits" },
  { group: "Apply forms", name: "apNote", label: "Note label", value: "Anything we should know? (optional)" },
  { group: "Apply forms", name: "apNotePh", label: "Note placeholder", value: "e.g. I want to open a joint account with my cooperative…" },
  { group: "Apply forms", name: "apSubmitting", label: "Submitting text", value: "Submitting…" },
  { group: "Apply forms", name: "apAccSubmit", label: "Account submit button", value: "Submit account request" },
  { group: "Apply forms", name: "apLoanTitle", label: "Loan form title", value: "Apply for a loan" },
  { group: "Apply forms", name: "apLoanSub", label: "Loan form subtitle", value: "Personal, business and SME facilities" },
  { group: "Apply forms", name: "apLoanNamePh", label: "Loan name placeholder", value: "e.g. Emeka Obi" },
  { group: "Apply forms", name: "apLoanProduct", label: "Loan product label", value: "Loan product *" },
  { group: "Apply forms", name: "apLoanProductPh", label: "Loan product placeholder", value: "Choose a loan product" },
  { group: "Apply forms", name: "apAmount", label: "Amount label", value: "Amount needed (₦) *" },
  { group: "Apply forms", name: "apTerm", label: "Repayment period label", value: "Repayment period *" },
  { group: "Apply forms", name: "apTermPh", label: "Tenor placeholder", value: "Choose tenor" },
  { group: "Apply forms", name: "apMonths", label: "“months” word", value: "months" },
  { group: "Apply forms", name: "apPurpose", label: "Purpose label", value: "What will you use it for? (optional)" },
  { group: "Apply forms", name: "apPurposePh", label: "Purpose placeholder", value: "e.g. Restocking my provisions shop in Murada market…" },
  { group: "Apply forms", name: "apLoanSubmit", label: "Loan submit button", value: "Submit loan application" },
  { group: "Digital banking page", name: "dgApp", label: "Get the mobile app button", value: "Get the mobile app" },
  { group: "Digital banking page", name: "dgLoginAcct", label: "Sign-in mock: account field", value: "Account number or phone number" },
  { group: "Digital banking page", name: "dgLoginPwd", label: "Sign-in mock: password field", value: "Password" },
  { group: "Digital banking page", name: "dgLoginBtn", label: "Sign-in mock: button", value: "Sign in" },
  { group: "Digital banking page", name: "dgReset", label: "Reset password button", value: "Reset password help" },
  { group: "Digital banking page", name: "dgSupportBtn", label: "Support button", value: "Support" },
  { group: "Digital banking page", name: "dgUssdEyebrow", label: "USSD eyebrow", value: "USSD banking" },
  { group: "Digital banking page", name: "dgUssdWorks", label: "USSD networks sentence", value: "Works on MTN, Airtel, Glo and 9mobile, with no smartphone and no data bundle required." },
  { group: "Digital banking page", name: "dgDial1", label: "USSD caption line 1", value: "Dial the code on the line" },
  { group: "Digital banking page", name: "dgDial2", label: "USSD caption line 2", value: "registered to your account" },
  { group: "Digital banking page", name: "dgSecureTitle", label: "Secure payments heading", value: "Secure transfers & payments" },
  { group: "Digital banking page", name: "dgSecureBody", label: "Secure payments text", value: "Every transfer and payment is processed over Interswitch infrastructure with bank-grade encryption, PIN and device verification, and you get an instant SMS or email alert for every transaction." },
  { group: "Digital banking page", name: "dgProtection", label: "Protection policy link", value: "Read our protection policy" },
  { group: "Digital banking page", name: "dgSupportEyebrow", label: "Support band eyebrow", value: "Support" },
  { group: "Digital banking page", name: "dgCall", label: "Call button", value: "Call us" },
  { group: "Digital banking page", name: "dgWhatsapp", label: "WhatsApp button", value: "WhatsApp" },
  { group: "Digital banking page", name: "dgEmailSupport", label: "Email button", value: "Email support" },
  { group: "Customer service page", name: "svContinue", label: "Card link", value: "Continue" },
  { group: "Customer service page", name: "svRepayEyebrow", label: "Loan repayment eyebrow", value: "Loan repayment" },
  { group: "Customer service page", name: "svTalkLoan", label: "Repayment button 1", value: "Talk to our loan team" },
  { group: "Customer service page", name: "svApplyLoan", label: "Repayment button 2", value: "Apply for a loan" },
  { group: "Customer service page", name: "svFiveWays", label: "Repayment list heading", value: "Five ways to repay" },
  { group: "Customer service page", name: "svReport", label: "Support button 1", value: "Report an issue" },
  { group: "Customer service page", name: "svCallBank", label: "Support button 2", value: "Call the bank" },
  { group: "Compliance page", name: "cpReadPolicy", label: "Card link: read the policy", value: "Read the policy" },
  { group: "Compliance page", name: "cpFullProc", label: "Card link: full procedure", value: "Full procedure" },
  { group: "Compliance page", name: "cpHowReport", label: "Card link: how to report", value: "How to report" },
  { group: "Compliance page", name: "cpEnquiry", label: "Complaint button: enquiry form", value: "Use the enquiry form" },
  { group: "Compliance page", name: "cpCall", label: "Complaint button: call", value: "Call us" },
  { group: "Compliance page", name: "cpWhatsapp", label: "Complaint button: WhatsApp", value: "WhatsApp" },
  { group: "Compliance page", name: "cpEmail", label: "Complaint button: email", value: "Email" },
  { group: "Compliance page", name: "cpDocsEyebrow", label: "Documents eyebrow", value: "Policies & disclosures" },
  { group: "Compliance page", name: "cpDocsTitle", label: "Documents heading", value: "Read our full documents" },
  { group: "Compliance page", name: "cpDocsBody", label: "Documents intro", value: "Everything below is published in plain language and kept up to date. Printed copies are available on request at the branch." },
  { group: "Compliance page", name: "cpRegCat", label: "Regulatory group heading", value: "Regulatory & compliance" },
  { group: "Compliance page", name: "cpLegalCat", label: "Legal group heading", value: "Legal" },
  { group: "Compliance page", name: "cpReadDoc", label: "Document link", value: "Read document" },
  { group: "Compliance page", name: "cpBandTitle", label: "Bottom band title", value: "Questions about your rights as a customer?" },
  { group: "Compliance page", name: "cpBandBody", label: "Bottom band text", value: "Our compliance team is available during business hours to answer questions about your deposits, data, charges and protections." },
  { group: "Compliance page", name: "cpBandBtn", label: "Bottom band button", value: "Contact the bank" },
  { group: "News, FAQ & contact", name: "ctSentTitle", label: "Toast: message sent title", value: "Message sent" },
  { group: "News, FAQ & contact", name: "ctSentBody", label: "Toast: message sent text", value: "Thank you for reaching out. Our team will contact you shortly." },
  { group: "News, FAQ & contact", name: "ctFailTitle", label: "Toast: failed title", value: "Could not send message" },
  { group: "News, FAQ & contact", name: "ctNetTitle", label: "Toast: network error title", value: "Network error" },
  { group: "News, FAQ & contact", name: "ctNetBody", label: "Toast: network error text", value: "Please check your connection and try again." },
  { group: "News, FAQ & contact", name: "ctWa", label: "WhatsApp button", value: "WhatsApp us" },
  { group: "News, FAQ & contact", name: "ctNamePh", label: "Name placeholder", value: "e.g. Aisha Mohammed" },
  { group: "News, FAQ & contact", name: "ctPhonePh", label: "Phone placeholder", value: "e.g. 0803 123 4567" },
  { group: "News, FAQ & contact", name: "ctEmailPh", label: "Email placeholder", value: "you@example.com" },
  { group: "News, FAQ & contact", name: "ctSubjectPh", label: "Subject placeholder", value: "Select a subject" },
  { group: "News, FAQ & contact", name: "ctMessagePh", label: "Message placeholder", value: "Tell us how we can help…" },
  { group: "News, FAQ & contact", name: "ctConsentBefore", label: "Consent text (before bank short name)", value: "By submitting, you consent to" },
  { group: "News, FAQ & contact", name: "ctConsentAfter", label: "Consent text (after bank short name)", value: "contacting you about this enquiry. We never share your details with third parties." },
  { group: "News, FAQ & contact", name: "ctSending", label: "Sending text", value: "Sending…" },
  { group: "News, FAQ & contact", name: "ctMaps", label: "Open in maps link", value: "Open in Google Maps →" },
  { group: "News, FAQ & contact", name: "ctPageWa", label: "Contact page: WhatsApp button", value: "WhatsApp us" },
  { group: "News, FAQ & contact", name: "ctPageOpen", label: "Contact page: open account button", value: "Open an Account" },
  { group: "Accessibility & misc", name: "footerRights", label: "Footer: copyright ending", value: "All rights reserved." },
  { group: "Accessibility & misc", name: "mapTitle", label: "Map frame title (after bank name)", value: "location map" },
  { group: "Accessibility & misc", name: "errorLabel", label: "404 label", value: "Error 404" },
  { group: "Accessibility & misc", name: "footerNavLabel", label: "Footer: quick links accessible name", value: "Quick links" },
  { group: "Accessibility & misc", name: "footerProductsAria", label: "Footer products accessible name", value: "Products and policies" },
  { group: "Accessibility & misc", name: "trustAria", label: "Trust bar accessible name", value: "Regulatory assurance" },
  // Floating / accessibility
  { group: "Accessibility & misc", name: "whatsappAria", label: "WhatsApp bubble label", value: "Chat with us on WhatsApp" },
  { group: "Accessibility & misc", name: "skipToContent", label: "Skip-to-content link", value: "Skip to main content" },
  { group: "Accessibility & misc", name: "notFoundTitle", label: "404 title", value: "Page not found" },
  { group: "Accessibility & misc", name: "notFoundBody", label: "404 message", value: "The page you are looking for may have been moved or no longer exists. Try the homepage, or contact us and we will point you in the right direction." },
  { group: "Accessibility & misc", name: "notFoundHome", label: "404 home button", value: "Back to home" },
  { group: "Accessibility & misc", name: "notFoundContact", label: "404 contact button", value: "Contact us" },
];

export const UI_DEFAULTS: UiSettings = Object.fromEntries(UI_FIELDS.map((f) => [f.name, f.value]));

export const SETTING_GROUPS: GroupDef[] = [
  {
    key: "brand",
    title: "Logo & branding",
    description: "Your logo, wordmark, browser-tab icon and the title / description search engines and link previews show.",
    fields: [
      { name: "logoMode", label: "Logo style", type: "select", options: [
        { value: "image-text", label: "Logo image + name next to it" },
        { value: "image-only", label: "Logo image only (use for wide logos)" },
        { value: "text-only", label: "Name only (no image)" },
      ] },
      { name: "logoMark", label: "Logo image", type: "image", maxSize: 640, help: "PNG, SVG or WebP with a transparent background works best. Upload a wide logo and choose “Logo image only” to show it full width." },
      { name: "logoAlt", label: "Logo description (for screen readers)", type: "text" },
      { name: "logoHeight", label: "Logo height (px)", type: "number", help: "Between 24 and 72. Applies on desktop; mobile is scaled down automatically." },
      { name: "wordmark", label: "Name text (line 1)", type: "text", help: "Big text next to the logo, e.g. Muamala." },
      { name: "wordmarkSub", label: "Name text (line 2)", type: "text", help: "Small capitals under the name, e.g. Micro-Finance Bank." },
      { name: "favicon", label: "Browser tab icon (favicon)", type: "image", maxSize: 128, help: "Square image, at least 64×64." },
      { name: "ogImage", label: "Link-preview image", type: "image", maxSize: 1400, help: "Shown when the site is shared on WhatsApp, Facebook, X. Ideal size 1200×630." },
      { name: "siteTitle", label: "Browser / search title", type: "text" },
      { name: "siteDescription", label: "Search description", type: "textarea" },
      { name: "keywords", label: "Search keywords", type: "list" },
      { name: "adminName", label: "Name shown in the admin sidebar", type: "text" },
    ],
  },
  {
    key: "nav",
    title: "Navigation menu",
    description: "The links in the top menu (desktop and mobile). Order here is the order on the site.",
    fields: [
      {
        name: "links",
        label: "Menu links",
        type: "items",
        help: "Link can be a page (/about), a section (/#loans) or a full web address.",
        itemFields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
      { name: "menuOpenLabel", label: "Mobile “open menu” label", type: "text" },
      { name: "menuCloseLabel", label: "Mobile “close menu” label", type: "text" },
      { name: "callLabel", label: "Mobile call button label", type: "text" },
      { name: "menuAria", label: "Menu accessible name (screen readers)", type: "text" },
    ],
  },
  {
    key: "seo",
    title: "Page titles & search (SEO)",
    description: "The title and description each page shows in browser tabs, Google results and link previews. Use {bank} for the full bank name and {short} for the short name. The homepage is under Logo & branding.",
    fields: [
      { name: "aboutTitle", label: "About page: title", type: "text" },
      { name: "aboutDescription", label: "About page: description", type: "textarea" },
      { name: "productsTitle", label: "Products page: title", type: "text" },
      { name: "productsDescription", label: "Products page: description", type: "textarea" },
      { name: "digitalTitle", label: "Digital banking page: title", type: "text" },
      { name: "digitalDescription", label: "Digital banking page: description", type: "textarea" },
      { name: "servicesTitle", label: "Customer service page: title", type: "text" },
      { name: "servicesDescription", label: "Customer service page: description", type: "textarea" },
      { name: "complianceTitle", label: "Compliance page: title", type: "text" },
      { name: "complianceDescription", label: "Compliance page: description", type: "textarea" },
      { name: "newsTitle", label: "News page: title", type: "text" },
      { name: "newsDescription", label: "News page: description", type: "textarea" },
      { name: "contactTitle", label: "Contact page: title", type: "text" },
      { name: "contactDescription", label: "Contact page: description", type: "textarea" },
      { name: "applyTitle", label: "Apply page: title", type: "text" },
      { name: "applyDescription", label: "Apply page: description", type: "textarea" }
    ],
  },
  {
    key: "mock",
    title: "Phone illustrations",
    description: "The sample text inside the two phone mock-ups (homepage hero and mobile app section). It is illustrative, so use sample names and amounts only.",
    fields: [
      { name: "heroGreeting", label: "Hero phone: greeting", type: "text" },
      { name: "heroUser", label: "Hero phone: user name", type: "text" },
      { name: "heroBalanceLabel", label: "Hero phone: balance label", type: "text" },
      { name: "heroBalance", label: "Hero phone: balance", type: "text" },
      { name: "heroAccount", label: "Hero phone: account line", type: "text" },
      { name: "heroActions", label: "Hero phone: four action labels", type: "list", help: "Four short words, one per line." },
      { name: "heroTxnTitle", label: "Hero phone: transactions title", type: "text" },
      { name: "heroViewAll", label: "Hero phone: “view all” text", type: "text" },
      {
        name: "heroTxns",
        label: "Hero phone: transactions",
        type: "items",
        help: "Type must be credit or debit.",
        itemFields: [
          { name: "label", label: "Description", type: "text" },
          { name: "sub", label: "When", type: "text" },
          { name: "amount", label: "Amount", type: "text" },
          { name: "type", label: "Type (credit or debit)", type: "text" },
        ],
      },
      { name: "savTitle", label: "Savings phone: title", type: "text" },
      { name: "savSub", label: "Savings phone: subtitle", type: "text" },
      { name: "savGoalName", label: "Savings phone: main goal name", type: "text" },
      { name: "savGoalPct", label: "Savings phone: main goal percent (number)", type: "text" },
      { name: "savGoalAmount", label: "Savings phone: main goal saved amount", type: "text" },
      { name: "savGoalNote", label: "Savings phone: main goal note", type: "text" },
      {
        name: "savGoals",
        label: "Savings phone: other goals",
        type: "items",
        itemFields: [
          { name: "name", label: "Goal", type: "text" },
          { name: "saved", label: "Saved", type: "text" },
          { name: "of", label: "Target", type: "text" },
          { name: "pct", label: "Percent (number)", type: "text" },
        ],
      },
      { name: "savNew", label: "Savings phone: new goal button", type: "text" },
    ],
  },
  {
    key: "ui",
    title: "Labels & buttons",
    description: "Every small piece of interface text: buttons, calculator captions, form labels, 404 page and more.",
    fields: UI_FIELDS.map((f) => ({
      name: f.name,
      label: `${f.group}: ${f.label}`,
      type: (f.value.length > 70 ? "textarea" : "text") as FieldType,
    })),
  },
  {
    key: "general",
    title: "General & Contact",
    description: "Bank identity, address, phone numbers, emails, opening hours and social links.",
    fields: [
      { name: "bankName", label: "Bank legal name", type: "text" },
      { name: "shortName", label: "Short name", type: "text" },
      { name: "rcNumber", label: "RC number", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "address", label: "Head office address", type: "textarea", help: "One line per row, shown on multiple lines across the site." },
      { name: "phones", label: "Phone numbers", type: "list" },
      { name: "whatsapp", label: "WhatsApp number", type: "text", help: "International format, e.g. +234 803 456 7890" },
      { name: "emails", label: "Email addresses", type: "list" },
      { name: "hours", label: "Operating hours", type: "list" },
      { name: "rcLine", label: "Utility bar line", type: "text", help: "Short text shown at the very top on desktop, e.g. RC number + city." },
      { name: "ussd", label: "USSD code", type: "text" },
      { name: "navCtaLabel", label: "Navbar button label", type: "text", help: "The gold button in the top navigation." },
      { name: "navCtaHref", label: "Navbar button link", type: "text" },
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
      { name: "heroCtaPrimaryHref", label: "Primary button link", type: "text" },
      { name: "heroCtaSecondaryHref", label: "Secondary button link", type: "text" },
      { name: "heroImage", label: "Hero photo (optional)", type: "image", maxSize: 1600, help: "When set, this photo replaces the phone illustration, on desktop and mobile." },
      { name: "heroImageAlt", label: "Hero photo description", type: "text" },
      { name: "heroCard1Title", label: "Floating card 1 title", type: "text", help: "Small cards over the phone illustration." },
      { name: "heroCard1Body", label: "Floating card 1 text", type: "text" },
      { name: "heroCard2Title", label: "Floating card 2 title", type: "text" },
      { name: "heroCard2Body", label: "Floating card 2 text", type: "text" },
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
      { name: "image", label: "Section photo", type: "image", maxSize: 1400 },
      { name: "imageAlt", label: "Photo description", type: "text" },
      { name: "rcCaption", label: "Badge caption under the RC number", type: "text" },
      { name: "learnMoreLabel", label: "“Learn more” link label", type: "text" },
      { name: "learnMoreHref", label: "“Learn more” link", type: "text" },
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
      { name: "pageEyebrow", label: "Page top eyebrow", type: "text" },
      { name: "pageTitle", label: "Page top title", type: "textarea" },
      { name: "pageSubtitle", label: "Page top subtitle", type: "textarea" },
      { name: "ctaPrimary", label: "Top button 1", type: "text" },
      { name: "ctaSecondary", label: "Top button 2", type: "text" },
      { name: "historyEyebrow", label: "History eyebrow", type: "text" },
      { name: "boardEyebrow", label: "Board section eyebrow", type: "text" },
      { name: "boardTitle", label: "Board section title", type: "text" },
      { name: "boardIntro", label: "Board section intro", type: "textarea" },
      { name: "boardEmpty", label: "Board empty message", type: "textarea", help: "Shown when no board members are published." },
      { name: "managementEyebrow", label: "Management section eyebrow", type: "text" },
      { name: "managementTitle", label: "Management section title", type: "text" },
      { name: "managementIntro", label: "Management section intro", type: "textarea" },
      { name: "managementEmpty", label: "Management empty message", type: "textarea" },
      { name: "regEyebrow", label: "Regulation band eyebrow", type: "text" },
      { name: "regTitle", label: "Regulation band title", type: "text" },
      { name: "regBody", label: "Regulation band body", type: "textarea" },
    ],
  },
  {
    key: "products",
    title: "Products section",
    description: "Heading texts and the four category introductions for the products & services section.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      {
        name: "categories",
        label: "Category introductions",
        type: "items",
        help: "Four rows in order: savings, loans, digital banking and other services. Row order must match those categories.",
        itemFields: [
          { name: "label", label: "Category heading", type: "text" },
          { name: "blurb", label: "Category blurb", type: "textarea" },
        ],
      },
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
      { name: "eyebrow", label: "Eyebrow", type: "text" },
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
      { name: "pageEyebrow", label: "Page top eyebrow", type: "text", help: "Small gold label above the title on the /contact page." },
    ],
  },
  {
    key: "footer",
    title: "Footer",
    description: "Footer blurb, product links and regulatory smallprint.",
    fields: [
      { name: "blurb", label: "Footer blurb", type: "textarea" },
      { name: "quickLinksTitle", label: "Quick links heading", type: "text" },
      {
        name: "quickLinks",
        label: "Quick links",
        type: "items",
        itemFields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
      { name: "productsTitle", label: "Products heading", type: "text" },
      {
        name: "productLinkItems",
        label: "Product links",
        type: "items",
        itemFields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
      { name: "policiesTitle", label: "Policies heading", type: "text", help: "The first four published Policy & info pages are listed under this heading." },
      { name: "policiesAllLabel", label: "“All policies” link label", type: "text" },
      { name: "policiesAllHref", label: "“All policies” link", type: "text" },
      { name: "contactTitle", label: "Contact heading", type: "text" },
      { name: "ussdCaption", label: "USSD caption", type: "text" },
      { name: "smallprint", label: "Regulatory smallprint", type: "textarea" },
      { name: "legalLine", label: "Bottom legal line", type: "text" },
    ],
  },
  {
    key: "apply",
    title: "Apply page",
    description: "Texts for the online account opening & loan application page.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "accountNote", label: "Account form note", type: "textarea" },
      { name: "loanNote", label: "Loan form note", type: "textarea" },
      {
        name: "steps",
        label: "How it works strip",
        type: "items",
        help: "Three steps shown under the application forms. Number them in the titles, e.g. \"1. Come as you are\".",
        itemFields: [
          { name: "title", label: "Step title", type: "text" },
          { name: "body", label: "Step body", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "servicesPage",
    title: "Customer service page",
    description: "Texts for the /services page: self-service cards, loan repayment information, ATM/POS support and WhatsApp support.",
    fields: [
      { name: "pageEyebrow", label: "Page top eyebrow", type: "text", help: "Small gold label above the title on the /services page." },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "repaymentTitle", label: "Loan repayment title", type: "text" },
      { name: "repaymentBody", label: "Loan repayment body", type: "textarea" },
      { name: "repaymentChannels", label: "Repayment channels", type: "list" },
      { name: "supportTitle", label: "ATM/POS support title", type: "text" },
      { name: "supportBody", label: "ATM/POS support body", type: "textarea" },
      { name: "whatsappTitle", label: "WhatsApp support title", type: "text" },
      { name: "whatsappBody", label: "WhatsApp support body", type: "textarea" },
      { name: "whatsappCta", label: "WhatsApp button label", type: "text" },
      { name: "selfServiceEyebrow", label: "Self-service eyebrow", type: "text" },
      { name: "selfServiceTitle", label: "Self-service heading", type: "textarea" },
      {
        name: "selfService",
        label: "Self-service cards",
        type: "items",
        help: "Each card links somewhere on the site, e.g. /apply?tab=account or #repayment.",
        itemFields: [
          { name: "title", label: "Card title", type: "text" },
          { name: "desc", label: "Card description", type: "textarea" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },
  {
    key: "digitalPage",
    title: "Digital banking page",
    description: "Texts for the /digital page: USSD steps, security tips and support.",
    fields: [
      { name: "pageEyebrow", label: "Page top eyebrow", type: "text", help: "Small gold label above the title on the /digital page." },
      { name: "title", label: "Title", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "ussdStepsTitle", label: "USSD steps title", type: "text" },
      { name: "ussdSteps", label: "USSD steps", type: "list", help: "One step per line, shown as a numbered how-to." },
      { name: "securityTitle", label: "Security title", type: "text" },
      { name: "securityBody", label: "Security body", type: "textarea" },
      { name: "securityTips", label: "Security tips", type: "list" },
      { name: "supportTitle", label: "Support title", type: "text" },
      { name: "supportBody", label: "Support body", type: "textarea" },
      { name: "internetBankingEyebrow", label: "Internet banking eyebrow", type: "text" },
      { name: "internetBankingTitle", label: "Internet banking title", type: "textarea" },
      { name: "internetBankingPoints", label: "Internet banking bullet points", type: "list" },
      { name: "loginBadge", label: "Sign-in card badge", type: "text" },
      { name: "loginCardTitle", label: "Sign-in card title", type: "text" },
      { name: "loginNote", label: "Sign-in card note", type: "textarea" },
    ],
  },
  {
    key: "compliancePage",
    title: "Compliance page",
    description: "Texts for the /compliance page: licence, deposit insurance, customer protection, complaints and whistleblowing summaries.",
    fields: [
      { name: "pageEyebrow", label: "Page top eyebrow", type: "text", help: "Small gold label above the title on the /compliance page." },
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
      { name: "headerChips", label: "Header badges", type: "list", help: "Small gold badges under the page heading." },
      { name: "pillarsEyebrow", label: "Pillars eyebrow", type: "text" },
      { name: "pillarsTitle", label: "Pillars heading", type: "textarea" },
      { name: "stepsEyebrow", label: "Complaint steps eyebrow", type: "text" },
      { name: "stepsTitle", label: "Complaint steps heading", type: "textarea" },
      { name: "stepsIntro", label: "Complaint steps intro", type: "textarea" },
      {
        name: "steps",
        label: "Complaint steps",
        type: "items",
        itemFields: [
          { name: "title", label: "Step title", type: "text" },
          { name: "body", label: "Step body", type: "textarea" },
        ],
      },
      { name: "ctaTitle", label: "Bottom band title", type: "text" },
      { name: "ctaBody", label: "Bottom band body", type: "textarea" },
    ],
  },
];

export const DEFAULT_SETTINGS: SiteSettingsPayload = {
  brand: {
    logoMode: "image-text",
    logoMark: "/logo-mark.png",
    logoAlt: "Muamala Micro-Finance Bank emblem",
    logoHeight: 40,
    wordmark: "Muamala",
    wordmarkSub: "Micro-Finance Bank",
    favicon: "",
    ogImage: "",
    siteTitle: "Muamala Micro-Finance Bank Limited | Community Banking in Niger State",
    siteDescription:
      "Muamala Micro-Finance Bank Limited (RC 7179149) is a Central Bank of Nigeria licensed microfinance bank providing savings, loans, payments and agent banking to individuals and small businesses in Suleja, Niger State and beyond.",
    keywords: ["Muamala Micro-Finance Bank", "microfinance bank Nigeria", "Suleja", "Niger State", "savings", "loans", "agent banking", "CBN licensed"],
    adminName: "Muamala MFB",
  },
  nav: {
    links: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Loans", href: "/#loans" },
      { label: "Digital Banking", href: "/digital" },
      { label: "Support", href: "/services" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    callLabel: "Call us",
    menuAria: "Main",
  },
  ui: UI_DEFAULTS,
  seo: {
    aboutTitle: "About us | {bank}",
    aboutDescription: "Learn about {short}: our story, vision, mission, board and management team, corporate governance and community work in Suleja, Niger State.",
    productsTitle: "Products & services | {bank}",
    productsDescription: "Savings accounts, loan facilities, digital banking, POS, bill payments and agency banking from {short} in Suleja, Niger State.",
    digitalTitle: "Digital banking & mobile app | {bank}",
    digitalDescription: "Muamala Mobile app, USSD banking, secure transfers and payments, and digital support from {short}. Bank from your phone, any phone.",
    servicesTitle: "Customer service & self-service | {bank}",
    servicesDescription: "Open an account, apply for a loan, check repayment options, report a card issue or find answers. {short} customer service, online and on any phone.",
    complianceTitle: "Regulation & compliance | {bank}",
    complianceDescription: "{short}'s CBN licence, NDIC deposit insurance, customer protection, tariffs, rates, complaints procedure, whistleblowing and AML/KYC policies.",
    newsTitle: "News & updates | {bank}",
    newsDescription: "Announcements, product launches, community outreach and financial literacy articles from {short}.",
    contactTitle: "Contact us | {bank}",
    contactDescription: "Visit {short} at Murada Shopping Complex, Suleja. Call, email or WhatsApp us, or send an enquiry and we will respond within one business day.",
    applyTitle: "Open an account or apply for a loan | {bank}",
    applyDescription: "Start your {short} account opening or loan application online. Our team will call you back within one business day.",
  },
  mock: {
    heroGreeting: "Good morning",
    heroUser: "Aisha Mohammed",
    heroBalanceLabel: "Total balance",
    heroBalance: "₦486,250.00",
    heroAccount: "Muamala Savings ···· 7149",
    heroActions: ["Send", "Airtime", "Bills", "Save"],
    heroTxnTitle: "Recent transactions",
    heroViewAll: "View all",
    heroTxns: [
      { label: "Transfer to Ola Cosmetics", sub: "Today, 9:24am", amount: "-₦15,000", type: "debit" },
      { label: "POS settlement, Agent 231", sub: "Yesterday, 4:02pm", amount: "+₦62,400", type: "credit" },
      { label: "Ajo target savings", sub: "Yesterday, 8:00am", amount: "+₦25,000", type: "credit" },
    ],
    savTitle: "My Savings",
    savSub: "Grow it, one goal at a time",
    savGoalName: "Shop restock goal",
    savGoalPct: "78",
    savGoalAmount: "₦156,000",
    savGoalNote: "of ₦200,000 target · matures 30 Apr",
    savGoals: [
      { name: "Rent contribution", saved: "₦85,000", of: "₦300,000", pct: "28" },
      { name: "Children school fees", saved: "₦120,500", of: "₦150,000", pct: "80" },
    ],
    savNew: "+ Create a new goal",
  },
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
      "Mon-Fri: 8:00am-4:00pm",
      "Sat: 9:00am-1:00pm",
      "Sun & public holidays: Closed",
    ],
    rcLine: "RC 7179149 · Suleja, Niger State",
    ussd: "*777#",
    navCtaLabel: "Open an Account",
    navCtaHref: "/apply",
    mapEmbedUrl: "https://www.google.com/maps?q=Murada+Shopping+Complex,+Suleja,+Niger+State&output=embed",
    mapLink: "https://maps.google.com/?q=Murada+Shopping+Complex,+Suleja,+Niger+State",
    facebook: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  home: {
    announcement: "Muamala Mobile app: coming soon to Google Play & the App Store. Bank on any phone today with *777#.",
    heroBadge: "Licensed by the Central Bank of Nigeria",
    heroTitle: "Banking that grows with your hustle, wherever you are in Niger State.",
    heroTitleAccent: "your hustle",
    heroSubtitle:
      "Muamala Micro-Finance Bank gives market women, artisans, farmers and small businesses the savings, loans and payments tools of a modern bank, with the warmth of the community bank next door.",
    heroCtaPrimary: "Open an Account",
    heroCtaSecondary: "Explore Products",
    heroCtaPrimaryHref: "/apply",
    heroCtaSecondaryHref: "/#products",
    heroImage: "",
    heroImageAlt: "",
    heroCard1Title: "Loan approved 🎉",
    heroCard1Body: "₦150,000 disbursed to your Muamala wallet",
    heroCard2Title: "Target savings",
    heroCard2Body: "₦25,000 saved this month",
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
        title: "Deposits insured by NDIC up to ₦2,000,000",
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
      "Muamala Micro-Finance Bank Limited is a Niger State-based microfinance bank on a mission to bring formal financial services within reach of every trader, farmer, artisan, salary earner and small business. Where big banks see too small, we see the real economy: the market stalls, the workshops, the family shops that keep communities moving.",
    body2:
      "We combine the reach of our branch and agent network with modern digital banking, from cards and transfers to USSD and a mobile app on the way, so you can save safely, borrow responsibly and grow your business at your own pace.",
    promises: [
      "Licensed by the Central Bank of Nigeria (CBN)",
      "Deposits insured by the NDIC up to the statutory limit",
      "Branch and agent network across Niger State",
      "Simple, transparent charges with no hidden fees",
    ],
    values: [{ label: "Integrity" }, { label: "Community first" }, { label: "Customer focus" }, { label: "Transparency" }],
    image: "/images/about-market.jpg",
    imageAlt: "A Nigerian entrepreneur arranging goods in her market stall",
    rcCaption: "Incorporated in Nigeria",
    learnMoreLabel: "Learn more about the bank",
    learnMoreHref: "/about",
  },
  aboutPage: {
    historyTitle: "Our story",
    historyBody:
      "Muamala Micro-Finance Bank Limited (RC 7179149) began as Musharaka Micro-Finance Bank, serving traders and farming families around Suleja. The bank was renamed Muamala MFB to reflect its renewed promise: honest, patient, community-centred banking. From our head office at Murada Shopping Complex, Suleja, we have grown into a branch-and-agent network touching thousands of households and small businesses across Niger State.",
    visionTitle: "Our vision",
    visionBody:
      "To be the most trusted community bank in Nigeria, the first choice for households, traders and small enterprises who want dignified, affordable financial services close to home.",
    missionTitle: "Our mission",
    missionBody:
      "To promote financial inclusion by providing simple, secure and affordable savings, credit and payment services that help our customers grow their businesses, educate their children and plan their futures.",
    valuesBody:
      "Integrity: we keep our word. Community first: your growth is our growth. Customer focus: banking shaped around real lives, not paperwork. Transparency: clear terms, clear charges, no surprises.",
    governanceTitle: "Corporate governance",
    governanceBody:
      "Muamala MFB is governed by a Board of Directors with a balance of executive, non-executive and independent members, supported by Board committees for Audit, Risk Management and Credit. The bank applies the CBN's corporate governance guidelines for microfinance banks, with clear segregation of duties, internal audit oversight and regular regulatory reporting.",
    csrTitle: "Corporate social responsibility",
    csrBody:
      "We invest in the communities that sustain us: financial literacy classes for schools and market associations, support for local cooperatives, and community outreach programmes around Suleja and the wider Niger State.",
    pageEyebrow: "About us",
    pageTitle: "The community bank behind Muamala MFB",
    pageSubtitle:
      "Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria and headquartered in Suleja, Niger State. Get to know our story, our people and the principles that guide how we serve you.",
    ctaPrimary: "Open an Account",
    ctaSecondary: "Contact our team",
    historyEyebrow: "Our history",
    boardEyebrow: "Leadership",
    boardTitle: "Board of Directors",
    boardIntro:
      "The board provides oversight, sets strategy and safeguards the soundness of the bank on behalf of our customers, regulators and community.",
    boardEmpty:
      "Board profiles will be published here shortly. Please contact the bank for current directorship information.",
    managementEyebrow: "Leadership",
    managementTitle: "Management Team",
    managementIntro:
      "Day-to-day, our management team runs the branch, the agent network and the digital services you rely on.",
    managementEmpty: "Management profiles will be published here shortly.",
    regEyebrow: "Regulation & policies",
    regTitle: "Licensed, supervised and transparent",
    regBody:
      "Muamala Micro-Finance Bank Limited operates under the supervision of the Central Bank of Nigeria. Our deposits are insured by the NDIC, and our customer protection, privacy and terms documents are always available for you to read.",
  },
  products: {
    eyebrow: "Our products",
    title: "Everything a growing business and household needs",
    subtitle:
      "From your first ₦1,000 savings to financing that restocks your shop: one bank, one account, all the tools.",
    categories: [
      {
        label: "Savings Accounts",
        blurb: "Individual, group and business savings that reward consistency.",
      },
      {
        label: "Loan Facilities",
        blurb: "Personal loans, business loans and SME financing with responsible terms.",
      },
      {
        label: "Digital Banking",
        blurb: "Mobile banking, instant transfers and balance enquiries on any phone.",
      },
      {
        label: "Other Services",
        blurb: "POS services, bill payments and agency banking in your neighbourhood.",
      },
    ],
  },
  loans: {
    eyebrow: "Loans & financing",
    title: "Responsible credit for real businesses",
    subtitle:
      "No suits required. We lend against your savings pattern, your business cash-flow and your character, not your paperwork. Try the calculator to see what repayment looks like before you apply.",
    requirementsNote:
      "What you need to apply: BVN, valid ID, one passport photograph, utility bill, plus 3 months of savings history with us (or a guarantor with a Muamala account).",
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
    ussdNote: "Banking on any phone, no smartphone or data bundle needed.",
    internetBankingNote:
      "Internet banking login launches together with the mobile app: one secure sign-on for web and mobile.",
    playStoreUrl: "",
    appStoreUrl: "",
  },
  news: {
    eyebrow: "News & updates",
    title: "Latest from the bank",
    subtitle: "Announcements, product launches, community outreach and financial literacy tips.",
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Questions our customers ask",
    subtitle: "Can't find your answer here? Send us a message below or call us, and a real person will respond.",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Talk to us today",
    subtitle:
      "Opening an account, applying for a loan, becoming an agent or just asking a question, we usually respond within one business day.",
    pageEyebrow: "Contact us",
    walkinTitle: "Prefer to walk into a branch?",
    walkinBody:
      "Walk into our Suleja head office at Murada Shopping Complex or call any of our agents around you. Bring your BVN and valid ID and we'll have you banking in minutes.",
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
      "Muamala Micro-Finance Bank Limited is a community-focused microfinance bank headquartered in Suleja, Niger State, bringing savings, loans and payments within reach of every household and small business.",
    quickLinksTitle: "Quick links",
    productsTitle: "Products",
    policiesTitle: "Policies",
    contactTitle: "Contact",
    quickLinks: [
      { label: "About us", href: "/about" },
      { label: "Products & services", href: "/products" },
      { label: "Loans & financing", href: "/products#loan-rates" },
      { label: "Digital banking", href: "/digital" },
      { label: "Customer service", href: "/services" },
      { label: "Regulation & compliance", href: "/compliance" },
      { label: "News & updates", href: "/news" },
      { label: "Open an account", href: "/apply" },
      { label: "Contact us", href: "/contact" },
    ],
    productLinks: [
      "Individual savings",
      "Group & ajo savings",
      "Business savings",
      "Micro & SME loans",
      "Cards & payments",
      "Agency banking",
    ],
    productLinkItems: [
      { label: "Individual savings", href: "/products" },
      { label: "Group & ajo savings", href: "/products" },
      { label: "Business savings", href: "/products" },
      { label: "Micro & SME loans", href: "/products#loan-rates" },
      { label: "Cards & payments", href: "/products" },
      { label: "Agency banking", href: "/products" },
    ],
    policiesAllLabel: "All policies & disclosures →",
    policiesAllHref: "/compliance",
    smallprint:
      "Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria (CBN). Deposits are insured by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦2,000,000 per depositor. Card, transfer and bill payment services are processed through Interswitch infrastructure.",
    ussdCaption: "USSD banking on any phone",
    legalLine:
      "This website is for information purposes only and does not constitute financial advice.",
  },
  apply: {
    eyebrow: "Get started",
    title: "Open an account or apply for a loan",
    subtitle:
      "Start online in two minutes: our team will call you back to complete the process at any branch or agent point near you.",
    accountNote:
      "Bring your BVN, a valid ID, one passport photograph and a utility bill when you visit the branch or agent to complete your account opening.",
    loanNote:
      "Loan applications are subject to our credit process. An officer will contact you within one business day to discuss your application.",
    steps: [
      {
        title: "1. Come as you are",
        body: "Start online now. You do not need a bank referral to begin.",
      },
      {
        title: "2. We call you back",
        body: "An officer contacts you within one business day to confirm details.",
      },
      {
        title: "3. Complete at the branch",
        body: "Bring BVN, valid ID, one passport photo and a utility bill, done in minutes.",
      },
    ],
  },
  servicesPage: {
    pageEyebrow: "Customer service & self-service",
    title: "Customer service & self-service",
    subtitle:
      "Start an application, check a repayment, report a card issue or find an answer. Most things can be done in minutes, online or on any phone.",
    repaymentTitle: "Loan repayment information",
    repaymentBody:
      "Repaying your Muamala loan is simple and flexible. Your schedule is agreed in your offer letter, weekly or monthly, and you can liquidate early without hidden penalties. If you foresee difficulty making an installment, contact your loan officer before the due date and we will work out a plan with you.",
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
      "Chat with our customer service team on WhatsApp during business hours: enquiries, statement requests, card issues and general support.",
    whatsappCta: "WhatsApp customer service",
    selfServiceEyebrow: "Self-service",
    selfServiceTitle: "What would you like to do today?",
    selfService: [
      {
        title: "Open an account online",
        desc: "Start your savings account application now, then finish at any branch or agent with your BVN and valid ID.",
        href: "/apply?tab=account",
      },
      {
        title: "Apply for a loan",
        desc: "Tell us how much you need and what it is for. An officer calls you back within one business day.",
        href: "/apply?tab=loan",
      },
      {
        title: "Savings enquiry",
        desc: "Ask about account types, interest rates, target savings or your balance by phone, WhatsApp or the enquiry form.",
        href: "/contact",
      },
      {
        title: "Loan repayment",
        desc: "Five easy ways to repay: direct debit, standing order, cash at an agent, transfer or USSD.",
        href: "#repayment",
      },
      {
        title: "Frequently asked questions",
        desc: "Answers on licensing, account opening, rates, USSD banking, deposit safety and more.",
        href: "#faq",
      },
      {
        title: "ATM / POS support",
        desc: "Report a failed transaction, stuck card or terminal issue and we escalate with the switch on your behalf.",
        href: "#support",
      },
    ],
  },
  digitalPage: {
    pageEyebrow: "Digital banking & mobile app",
    title: "Digital banking & mobile app",
    subtitle:
      "Bank from your phone, any phone. Transfers, payments, savings goals and support, all secured with bank-grade encryption and Interswitch infrastructure.",
    ussdStepsTitle: "Banking on any phone with USSD",
    ussdSteps: [
      "Dial *777# on the phone line registered to your account",
      "Choose an option: balance, transfer, airtime or repayment",
      "Enter your amount and select the beneficiary account",
      "Confirm with your USSD PIN and receive an instant SMS receipt",
    ],
    securityTitle: "Security you can bank on",
    securityBody:
      "Every Muamala digital channel is protected with bank-grade encryption, and card and payment processing runs on Interswitch infrastructure. We will never call, SMS or email you asking for your PIN, password or full card number.",
    securityTips: [
      "Never share your PIN, password or OTP with anyone, not even bank staff",
      "Muamala staff will never ask you to move money to “safe-keep” it",
      "Cover your PIN at POS terminals and ATMs",
      "Report lost cards or a stolen phone immediately by phone or WhatsApp",
      "Check your SMS and email alerts after every transaction",
      "Change your password regularly and avoid obvious numbers or names",
    ],
    supportTitle: "Password reset & support",
    supportBody:
      "Locked out or forgotten your password? Our support team can reset your access after verifying your identity: call us, chat on WhatsApp or send a message and we will walk you through it.",
    internetBankingEyebrow: "Internet banking",
    internetBankingTitle: "One secure sign-on for web and mobile",
    internetBankingPoints: [
      "Same login as the Muamala Mobile app",
      "View balances, statements and loan details",
      "Initiate transfers to any Nigerian bank",
      "Protected by encryption and device checks",
    ],
    loginBadge: "Launching soon",
    loginCardTitle: "Internet banking sign-in",
    loginNote:
      "Online sign-in opens together with the Muamala Mobile app. Until then, bank with USSD, at the branch or through any Muamala agent.",
  },
  compliancePage: {
    pageEyebrow: "Regulation & compliance",
    title: "Regulation & compliance",
    subtitle:
      "We hold ourselves to the highest regulatory standards: licensed by the Central Bank of Nigeria, deposits insured by the NDIC, and policies that put customers first.",
    cbnTitle: "CBN licence status",
    cbnBody:
      "Muamala Micro-Finance Bank Limited (RC 7179149) is licensed by the Central Bank of Nigeria as a microfinance bank and operates under its supervision, examination and reporting framework.",
    ndicTitle: "NDIC deposit insurance",
    ndicBody:
      "Customer deposits are insured by the Nigeria Deposit Insurance Corporation up to ₦2,000,000 per depositor, the statutory maximum microfinance bank coverage.",
    protectionTitle: "Customer protection",
    protectionBody:
      "We follow the CBN's consumer protection framework: clear disclosure of terms, fair treatment, responsible lending, data privacy and transparent, prompt complaint resolution.",
    complaintsTitle: "Complaints handling",
    complaintsBody:
      "Every complaint is logged and tracked. We acknowledge within 24 hours, investigate and give you a written resolution. Unresolved complaints can be escalated to the CBN Consumer Protection Department.",
    whistleTitle: "Whistleblowing channel",
    whistleBody:
      "Suspect fraud, misconduct or a regulatory breach? Report it confidentially by phone, email or in writing; reports can be made anonymously and are handled without retaliation.",
    amlTitle: "Anti-money laundering & KYC",
    amlBody:
      "We run a full AML/CFT programme: customer due diligence, KYC at onboarding, transaction monitoring and statutory reporting to the NFIU, in line with CBN and NDLEA/NFIU requirements.",
    headerChips: [
      "Licensed by the Central Bank of Nigeria",
      "Deposits insured by the NDIC",
      "Interswitch-secured payments",
    ],
    pillarsEyebrow: "How we are regulated",
    pillarsTitle: "Supervised, insured and accountable",
    stepsEyebrow: "Complaints handling process",
    stepsTitle: "Four steps from complaint to resolution",
    stepsIntro:
      "We take every complaint seriously, and we measure ourselves on how fast and fairly we close them.",
    steps: [
      {
        title: "Lodge your complaint",
        body: "In person at the branch, by phone, WhatsApp, email or the website enquiry form; every channel reaches the same complaint register.",
      },
      {
        title: "Acknowledgement within 24 hours",
        body: "You receive a reference number and the name of the officer handling your case.",
      },
      {
        title: "Investigation & feedback",
        body: "We investigate fairly and keep you informed; most issues are resolved within 5 business days.",
      },
      {
        title: "Resolution & escalation",
        body: "You receive a written resolution. If you are not satisfied, you may escalate to the CBN Consumer Protection Department and we will give you the details.",
      },
    ],
    ctaTitle: "Ready to file a complaint?",
    ctaBody:
      "Reach us through any channel below: in person at Murada Shopping Complex, Suleja, by phone, WhatsApp or email. Your reference number follows within 24 hours.",
  },
};

export type SettingsGroupKey = keyof SiteSettingsPayload;
