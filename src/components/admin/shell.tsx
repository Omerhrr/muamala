"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Banknote,
  FileText,
  HandCoins,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Palette,
  PiggyBank,
  Settings,
  Users,
  Wallet,
  X,
  ExternalLink,
  KeyRound,
  Image as ImageIcon,
  ListTree,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrandSettings } from "@/lib/site-settings";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Site content",
    items: [
      { href: "/admin/settings", label: "Text & settings", icon: Settings },
      { href: "/admin/settings?group=brand", label: "Logo & branding", icon: ImageIcon },
      { href: "/admin/settings?group=nav", label: "Menu & navigation", icon: ListTree },
      { href: "/admin/theme", label: "Theme & colours", icon: Palette },
      { href: "/admin/resources/products", label: "Products & services", icon: PiggyBank },
      { href: "/admin/resources/loans", label: "Loan products", icon: HandCoins },
      { href: "/admin/resources/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/resources/news", label: "News & updates", icon: Newspaper },
      { href: "/admin/resources/team", label: "Board & management", icon: Users },
      { href: "/admin/resources/pages", label: "Policy & info pages", icon: FileText },
    ],
  },
  {
    title: "Customer inbox",
    items: [
      { href: "/admin/resources/messages", label: "Messages", icon: MessageSquare },
      { href: "/admin/resources/accounts", label: "Account requests", icon: Wallet },
      { href: "/admin/resources/loanapps", label: "Loan applications", icon: Banknote },
    ],
  },
  {
    title: "Admin",
    items: [{ href: "/admin/account", label: "Account & password", icon: KeyRound }],
  },
];

export function AdminShell({
  user,
  brand,
  children,
}: {
  user: string;
  brand: BrandSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    if (href.includes("?")) return pathname + search === href;
    if (href === "/admin/settings") return pathname === href && !search.includes("group=brand") && !search.includes("group=nav");
    return pathname.startsWith(href);
  };

  const nav = (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
      {NAV.map((group) => (
        <div key={group.title}>
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-300/80">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                      active
                        ? "bg-gold-500/15 text-gold-300"
                        : "text-brand-100/80 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const brandBlock = (
    <Link href="/admin" className="flex items-center gap-3 px-5 py-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.logoMark} alt="" className="max-h-full max-w-full object-contain" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-bold text-white">{brand.adminName}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">
          Content manager
        </span>
      </span>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-brand-950 lg:flex">
        {brandBlock}
        {nav}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-2.5 px-1">
            <span className="flex size-8 items-center justify-center rounded-full bg-brand-800 text-xs font-bold text-gold-300">
              {user.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{user}</p>
              <p className="text-[10px] text-brand-300">Administrator</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-brand-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <ExternalLink className="size-3.5" />
              View site
            </a>
            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-brand-100 transition-colors hover:border-destructive hover:text-red-300"
            >
              <LogOut className="size-3.5" />
              {loggingOut ? "…" : "Log out"}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-brand-950 px-4 lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white p-0.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logoMark} alt="" className="max-h-full max-w-full object-contain" />
          </span>
          <span className="truncate text-sm font-bold text-white">{brand.adminName} Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-white/10 bg-brand-950 pt-14">
            {nav}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-brand-100"
                >
                  <ExternalLink className="size-3.5" />
                  View site
                </a>
                <button
                  type="button"
                  onClick={logout}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-brand-100"
                >
                  <LogOut className="size-3.5" />
                  Log out
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="min-w-0 flex-1 px-4 pb-16 pt-16 sm:px-6 lg:pt-8 lg:pl-72">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
