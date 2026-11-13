import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  FileText,
  HandCoins,
  HelpCircle,
  MessageSquare,
  Newspaper,
  Palette,
  PiggyBank,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function safeCount(fn: () => Promise<number>): Promise<number | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const [
    messages,
    newMessages,
    accounts,
    newAccounts,
    loanApps,
    newLoanApps,
    products,
    loans,
    faqs,
    news,
    team,
    pages,
  ] = await Promise.all([
    safeCount(() => db.contactMessage.count()),
    safeCount(() => db.contactMessage.count({ where: { status: "new" } })),
    safeCount(() => db.accountRequest.count()),
    safeCount(() => db.accountRequest.count({ where: { status: "new" } })),
    safeCount(() => db.loanApplication.count()),
    safeCount(() => db.loanApplication.count({ where: { status: "new" } })),
    safeCount(() => db.product.count()),
    safeCount(() => db.loanProduct.count()),
    safeCount(() => db.faq.count()),
    safeCount(() => db.newsPost.count()),
    safeCount(() => db.teamMember.count()),
    safeCount(() => db.contentPage.count()),
  ]);

  let recent: {
    id: string;
    kind: string;
    who: string;
    detail: string;
    date: Date;
    href: string;
  }[] = [];
  try {
    const [m, a, l] = await Promise.all([
      db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      db.accountRequest.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      db.loanApplication.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
    ]);
    recent = [
      ...m.map((x) => ({
        id: x.id,
        kind: "Message",
        who: x.name,
        detail: x.subject,
        date: x.createdAt,
        href: "/admin/resources/messages",
      })),
      ...a.map((x) => ({
        id: x.id,
        kind: "Account",
        who: x.name,
        detail: `${x.type} account`,
        date: x.createdAt,
        href: "/admin/resources/accounts",
      })),
      ...l.map((x) => ({
        id: x.id,
        kind: "Loan",
        who: x.name,
        detail: `${x.product}: ₦${x.amount.toLocaleString("en-NG")}`,
        date: x.createdAt,
        href: "/admin/resources/loanapps",
      })),
    ]
      .sort((x, y) => y.date.getTime() - x.date.getTime())
      .slice(0, 8);
  } catch {
    // db unavailable
  }

  const inboxCards = [
    {
      href: "/admin/resources/messages",
      icon: MessageSquare,
      label: "Contact messages",
      total: messages,
      fresh: newMessages,
    },
    {
      href: "/admin/resources/accounts",
      icon: Wallet,
      label: "Account requests",
      total: accounts,
      fresh: newAccounts,
    },
    {
      href: "/admin/resources/loanapps",
      icon: Banknote,
      label: "Loan applications",
      total: loanApps,
      fresh: newLoanApps,
    },
  ];

  const contentCards = [
    { href: "/admin/settings", icon: Settings, label: "Text & settings", count: null as number | null, note: "Every word on the site" },
    { href: "/admin/theme", icon: Palette, label: "Theme & colours", count: null as number | null, note: "Switch the look of the site" },
    { href: "/admin/resources/products", icon: PiggyBank, label: "Products & services", count: products, note: null },
    { href: "/admin/resources/loans", icon: HandCoins, label: "Loan products", count: loans, note: null },
    { href: "/admin/resources/faqs", icon: HelpCircle, label: "FAQs", count: faqs, note: null },
    { href: "/admin/resources/news", icon: Newspaper, label: "News & updates", count: news, note: null },
    { href: "/admin/resources/team", icon: Users, label: "Board & management", count: team, note: null },
    { href: "/admin/resources/pages", icon: FileText, label: "Policy & info pages", count: pages, note: null },
  ];

  const fmtDate = new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-8 py-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-brand-900">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Everything on the Muamala MFB website is editable from here: texts, products, loans,
          FAQs, news, team profiles, policies and the colour theme.
        </p>
      </header>

      {/* Inbox */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-gold-600">
          Customer inbox
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {inboxCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-800">
                    <Icon className="size-5 text-gold-300" aria-hidden="true" />
                  </span>
                  {card.fresh ? (
                    <span className="rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-white">
                      {card.fresh} new
                    </span>
                  ) : (
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-4 text-2xl font-bold text-brand-900">
                  {card.total ?? "-"}
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{card.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Content management */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-gold-600">
          Manage website content
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5 text-brand-800" aria-hidden="true" />
                  </span>
                  {card.count !== null && (
                    <span className="text-xl font-bold text-brand-900">{card.count}</span>
                  )}
                </div>
                <p className="mt-4 text-sm font-bold text-brand-900">{card.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {card.note ?? "Manage entries"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent submissions */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-gold-600">
          Latest customer activity
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          {recent.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-muted-foreground">
              No customer submissions yet. When customers submit the contact form, account requests
              or loan applications, they will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {recent.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="w-16 shrink-0 rounded-full bg-brand-800 px-2 py-1 text-center text-[10px] font-bold uppercase tracking-wide text-gold-300">
                        {item.kind}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-brand-900">{item.who}</p>
                        <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {fmtDate.format(item.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
