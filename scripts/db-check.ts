/**
 * Check whether the CMS tables still hold untouched seed data.
 * Run: bun run scripts/db-check.ts
 */
import { db } from "@/lib/db";
import { DEFAULT_SETTINGS } from "@/lib/site-settings";

async function main() {
  const rows = await db.siteSetting.findMany();
  let modified = 0;
  for (const row of rows) {
    const def = DEFAULT_SETTINGS[row.key as keyof typeof DEFAULT_SETTINGS];
    let matches = false;
    try {
      const parsed = JSON.parse(row.value);
      matches = def !== undefined && JSON.stringify(parsed) === JSON.stringify(def);
    } catch {
      matches = false;
    }
    console.log(`${row.key}: ${matches ? "matches defaults" : "MODIFIED"}`);
    if (!matches) modified++;
  }
  console.log("modified settings groups:", modified);

  const [products, loans, faqs, news, team, pages, themes, admins, msgs, accs, lapps] =
    await Promise.all([
      db.product.count(),
      db.loanProduct.count(),
      db.faq.count(),
      db.newsPost.count(),
      db.teamMember.count(),
      db.contentPage.count(),
      db.themeConfig.count(),
      db.adminUser.count(),
      db.contactMessage.count(),
      db.accountRequest.count(),
      db.loanApplication.count(),
    ]);
  console.log({ products, loans, faqs, news, team, pages, themes, admins, msgs, accs, lapps });
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
