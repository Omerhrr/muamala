/**
 * Registry of admin-managed collections, shared by the generic CRUD API
 * and the admin resource manager UI.
 */

export type ResourceFieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "list"
  | "icon"
  | "date"
  | "image";

export type ResourceField = {
  name: string;
  label: string;
  type: ResourceFieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
  maxLength?: number;
  placeholder?: string;
};

export type ResourceDef = {
  key: string;
  title: string;
  singular: string;
  model: string; // prisma delegate name
  fields: ResourceField[];
  listColumns: string[];
  canCreate: boolean;
  orderBy: { field: string; dir: "asc" | "desc" };
};

const PRODUCT_CATEGORIES = [
  { value: "savings", label: "Savings Accounts" },
  { value: "loans", label: "Loan Facilities" },
  { value: "digital", label: "Digital Banking" },
  { value: "other", label: "Other Services" },
];

const TEAM_TYPES = [
  { value: "board", label: "Board of Directors" },
  { value: "management", label: "Management Team" },
];

export const RESOURCES: Record<string, ResourceDef> = {
  products: {
    key: "products",
    title: "Products & Services",
    singular: "Product",
    model: "product",
    listColumns: ["category", "title", "order", "visible"],
    canCreate: true,
    orderBy: { field: "order", dir: "asc" },
    fields: [
      { name: "category", label: "Category", type: "select", required: true, options: PRODUCT_CATEGORIES },
      { name: "title", label: "Title", type: "text", required: true, maxLength: 120 },
      { name: "desc", label: "Short description", type: "textarea", required: true, maxLength: 400 },
      { name: "features", label: "Features", type: "list", help: "One feature per line." },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "visible", label: "Visible on site", type: "boolean" },
    ],
  },
  loans: {
    key: "loans",
    title: "Loan Products",
    singular: "Loan product",
    model: "loanProduct",
    listColumns: ["name", "ratePct", "minAmount", "maxAmount", "order", "visible"],
    canCreate: true,
    orderBy: { field: "order", dir: "asc" },
    fields: [
      { name: "name", label: "Name", type: "text", required: true, maxLength: 120 },
      { name: "desc", label: "Description", type: "textarea", required: true, maxLength: 500 },
      { name: "ratePct", label: "Monthly flat rate (%)", type: "number", required: true, help: "e.g. 3.0 for 3% per month" },
      { name: "minAmount", label: "Minimum amount (₦)", type: "number" },
      { name: "maxAmount", label: "Maximum amount (₦)", type: "number" },
      { name: "maxTerm", label: "Maximum tenor (months)", type: "number" },
      { name: "security", label: "Security / collateral", type: "text", maxLength: 160 },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "visible", label: "Visible on site", type: "boolean" },
    ],
  },
  faqs: {
    key: "faqs",
    title: "FAQs",
    singular: "FAQ",
    model: "faq",
    listColumns: ["question", "order", "visible"],
    canCreate: true,
    orderBy: { field: "order", dir: "asc" },
    fields: [
      { name: "question", label: "Question", type: "text", required: true, maxLength: 200 },
      { name: "answer", label: "Answer", type: "textarea", required: true, maxLength: 1500 },
      { name: "order", label: "Sort order", type: "number" },
      { name: "visible", label: "Visible on site", type: "boolean" },
    ],
  },
  news: {
    key: "news",
    title: "News & Updates",
    singular: "News post",
    model: "newsPost",
    listColumns: ["date", "category", "title", "visible"],
    canCreate: true,
    orderBy: { field: "date", dir: "desc" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 200 },
      {
        name: "category", label: "Category", type: "select", required: true,
        options: [
          { value: "Announcement", label: "Announcement" },
          { value: "Community", label: "Community" },
          { value: "Product", label: "Product launch" },
          { value: "Literacy", label: "Financial literacy" },
          { value: "Press", label: "Press release" },
        ],
      },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true, maxLength: 400 },
      { name: "body", label: "Body (markdown)", type: "textarea", required: true, help: "Supports ## headings, **bold**, - lists and 1. numbered lists." },
      { name: "image", label: "Cover image", type: "image", help: "Optional. Upload a photo (landscape works best) or paste an image address." },
      { name: "visible", label: "Visible on site", type: "boolean" },
    ],
  },
  team: {
    key: "team",
    title: "Board & Management",
    singular: "Team member",
    model: "teamMember",
    listColumns: ["type", "name", "role", "order", "visible"],
    canCreate: true,
    orderBy: { field: "order", dir: "asc" },
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, maxLength: 120 },
      { name: "role", label: "Role / title", type: "text", required: true, maxLength: 120 },
      { name: "type", label: "Group", type: "select", required: true, options: TEAM_TYPES },
      { name: "bio", label: "Short bio (optional)", type: "textarea", maxLength: 500 },
      { name: "photo", label: "Photo (optional)", type: "image", help: "Square or portrait headshot. Shown instead of initials." },
      { name: "order", label: "Sort order", type: "number" },
      { name: "visible", label: "Visible on site", type: "boolean" },
    ],
  },
  pages: {
    key: "pages",
    title: "Policy & Info Pages",
    singular: "Page",
    model: "contentPage",
    listColumns: ["category", "title", "slug", "visible"],
    canCreate: true,
    orderBy: { field: "title", dir: "asc" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 160 },
      { name: "slug", label: "URL slug", type: "text", required: true, help: "Lowercase with dashes, e.g. privacy-policy. Page lives at /pages/<slug>.", maxLength: 80 },
      {
        name: "category", label: "Category", type: "select", required: true,
        options: [
          { value: "legal", label: "Legal" },
          { value: "regulatory", label: "Regulatory & compliance" },
          { value: "info", label: "Information" },
        ],
      },
      { name: "body", label: "Body (markdown)", type: "textarea", required: true, help: "Supports ## headings, **bold**, - lists, 1. numbered lists and | tables |." },
      { name: "visible", label: "Visible on site", type: "boolean" },
    ],
  },
  messages: {
    key: "messages",
    title: "Contact Messages",
    singular: "Message",
    model: "contactMessage",
    listColumns: ["createdAt", "name", "phone", "subject", "status"],
    canCreate: false,
    orderBy: { field: "createdAt", dir: "desc" },
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "subject", label: "Subject", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      {
        name: "status", label: "Status", type: "select",
        options: [
          { value: "new", label: "New" },
          { value: "read", label: "Read" },
          { value: "resolved", label: "Resolved" },
        ],
      },
    ],
  },
  accounts: {
    key: "accounts",
    title: "Account Requests",
    singular: "Account request",
    model: "accountRequest",
    listColumns: ["createdAt", "name", "phone", "type", "status"],
    canCreate: false,
    orderBy: { field: "createdAt", dir: "desc" },
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
      {
        name: "type", label: "Account type", type: "select",
        options: [
          { value: "individual", label: "Individual" },
          { value: "group", label: "Group / cooperative" },
          { value: "business", label: "Business" },
        ],
      },
      { name: "bvn", label: "BVN", type: "text" },
      { name: "note", label: "Note", type: "textarea" },
      {
        name: "status", label: "Status", type: "select",
        options: [
          { value: "new", label: "New" },
          { value: "in-review", label: "In review" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ],
      },
    ],
  },
  loanapps: {
    key: "loanapps",
    title: "Loan Applications",
    singular: "Loan application",
    model: "loanApplication",
    listColumns: ["createdAt", "name", "phone", "product", "amount", "status"],
    canCreate: false,
    orderBy: { field: "createdAt", dir: "desc" },
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "product", label: "Product", type: "text" },
      { name: "amount", label: "Amount (₦)", type: "number" },
      { name: "term", label: "Tenor (months)", type: "number" },
      { name: "purpose", label: "Purpose", type: "textarea" },
      {
        name: "status", label: "Status", type: "select",
        options: [
          { value: "new", label: "New" },
          { value: "in-review", label: "In review" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ],
      },
    ],
  },
};

export function getResource(key: string): ResourceDef | null {
  return RESOURCES[key] ?? null;
}

/** Coerce and whitelist incoming values against the resource field defs. */
export function coerceResourceValues(
  def: ResourceDef,
  input: Record<string, unknown>,
  partial = false
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of def.fields) {
    if (!(field.name in input)) {
      if (partial) continue;
      // defaults for create
      if (field.type === "boolean") out[field.name] = true;
      if (field.type === "number") out[field.name] = 0;
      continue;
    }
    const raw = input[field.name];
    switch (field.type) {
      case "number": {
        const n = Number(raw);
        out[field.name] = Number.isFinite(n) ? n : 0;
        break;
      }
      case "boolean":
        out[field.name] = Boolean(raw);
        break;
      case "list": {
        const arr = Array.isArray(raw)
          ? raw.map((v) => String(v)).filter((v) => v.trim().length > 0)
          : typeof raw === "string"
            ? raw.split("\n").map((v) => v.trim()).filter(Boolean)
            : [];
        // list columns are stored as JSON strings in SQLite
        out[field.name] = JSON.stringify(arr);
        break;
      }
      case "date": {
        const d = new Date(String(raw));
        out[field.name] = Number.isNaN(d.getTime()) ? new Date() : d;
        break;
      }
      case "image": {
        const v = String(raw ?? "").trim();
        // data-URL uploads (capped), site paths or http(s) addresses only
        const ok = /^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,/i.test(v) || v.startsWith("/") || /^https?:\/\//i.test(v);
        out[field.name] = ok && v.length <= 2_500_000 ? v : "";
        break;
      }
      case "icon": {
        const s = String(raw ?? "").trim();
        out[field.name] = s.length > 0 ? s : "PiggyBank";
        break;
      }
      default: {
        let s = String(raw ?? "").trim();
        if (field.maxLength && s.length > field.maxLength) s = s.slice(0, field.maxLength);
        out[field.name] = s;
        if (field.name === "slug") {
          out[field.name] = s
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        }
        break;
      }
    }
    if (partial && out[field.name] === undefined) delete out[field.name];
  }
  return out;
}
