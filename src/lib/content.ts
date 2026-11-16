import "server-only";
import { db } from "@/lib/db";
import {
  DEFAULT_SETTINGS,
  SiteSettingsPayload,
  SettingsGroupKey,
} from "@/lib/site-settings";
import { DEFAULT_THEME } from "@/lib/theme";

/* ---------------- settings ---------------- */

export async function getSiteSettings(): Promise<SiteSettingsPayload> {
  const result = structuredClone(DEFAULT_SETTINGS) as SiteSettingsPayload;
  try {
    const rows = await db.siteSetting.findMany();
    for (const row of rows) {
      if (row.key in result) {
        try {
          const parsed = JSON.parse(row.value);
          result[row.key as SettingsGroupKey] = {
            ...result[row.key as SettingsGroupKey],
            ...parsed,
          };
        } catch {
          // ignore malformed group
        }
      }
    }
  } catch {
    // database unavailable → fall back to defaults
  }
  return result;
}

export async function getSettingsGroup<K extends SettingsGroupKey>(
  key: K
): Promise<SiteSettingsPayload[K]> {
  const all = await getSiteSettings();
  return all[key];
}

/** Per-page <title>/<description>, editable under Page titles & search. */
export async function pageMeta(key: string) {
  const all = await getSiteSettings();
  const fill = (t: string) =>
    (t ?? "").replaceAll("{bank}", all.general.bankName).replaceAll("{short}", all.general.shortName);
  const title = fill(all.seo[`${key}Title`] ?? "");
  return { title: title ? { absolute: title } : undefined, description: fill(all.seo[`${key}Description`] ?? "") };
}

/* ---------------- theme ---------------- */

export async function getActiveTheme(): Promise<{
  name: string;
  brand: string;
  gold: string;
  bg: string;
}> {
  try {
    const theme = await db.themeConfig.findFirst({ where: { isActive: true } });
    if (theme) {
      return { name: theme.name, brand: theme.brand, gold: theme.gold, bg: theme.bg };
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME;
}

/* ---------------- collections ---------------- */

function parseJsonArray<T>(raw: string | null | undefined): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export type ProductRecord = {
  id: string;
  category: string;
  title: string;
  desc: string;
  features: string[];
  icon: string;
};

export async function getProducts(): Promise<ProductRecord[]> {
  try {
    const rows = await db.product.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { title: "asc" }],
    });
    return rows.map((r) => ({ ...r, features: parseJsonArray<string>(r.features) }));
  } catch {
    return [];
  }
}

export type LoanProductRecord = {
  id: string;
  name: string;
  desc: string;
  ratePct: number;
  minAmount: number;
  maxAmount: number;
  maxTerm: number;
  security: string;
  icon: string;
};

export async function getLoanProducts(): Promise<LoanProductRecord[]> {
  try {
    const rows = await db.loanProduct.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    return rows;
  } catch {
    return [];
  }
}

export type FaqRecord = { id: string; question: string; answer: string };

export async function getFaqs(): Promise<FaqRecord[]> {
  try {
    const rows = await db.faq.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { question: "asc" }],
    });
    return rows.map((r) => ({ id: r.id, question: r.question, answer: r.answer }));
  } catch {
    return [];
  }
}

export type NewsRecord = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  image: string | null;
  date: Date;
};

export async function getNews(limit?: number): Promise<NewsRecord[]> {
  try {
    const rows = await db.newsPost.findMany({
      where: { visible: true },
      orderBy: { date: "desc" },
      ...(limit ? { take: limit } : {}),
    });
    return rows;
  } catch {
    return [];
  }
}

export async function getNewsPost(id: string): Promise<NewsRecord | null> {
  try {
    const row = await db.newsPost.findFirst({ where: { id, visible: true } });
    return row;
  } catch {
    return null;
  }
}

export type TeamRecord = {
  id: string;
  name: string;
  role: string;
  type: string;
  bio: string | null;
  photo: string | null;
};

export async function getTeam(): Promise<{ board: TeamRecord[]; management: TeamRecord[] }> {
  try {
    const rows = await db.teamMember.findMany({
      where: { visible: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    return {
      board: rows.filter((r) => r.type === "board"),
      management: rows.filter((r) => r.type === "management"),
    };
  } catch {
    return { board: [], management: [] };
  }
}

export type PageRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  body: string;
};

export async function getPages(): Promise<PageRecord[]> {
  try {
    const rows = await db.contentPage.findMany({
      where: { visible: true },
      orderBy: { title: "asc" },
    });
    return rows;
  } catch {
    return [];
  }
}

export async function getPage(slug: string): Promise<PageRecord | null> {
  try {
    const row = await db.contentPage.findFirst({ where: { slug, visible: true } });
    return row;
  } catch {
    return null;
  }
}

/* ---------------- helpers ---------------- */

export { waLink } from "@/lib/wa";
