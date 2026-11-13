/**
 * Clear all CMS content tables (keeps submissions and the admin user).
 * Run: bun run scripts/reset-cms.ts && bun run scripts/seed.ts
 */
import { db } from "@/lib/db";

async function main() {
  console.log("Resetting CMS content tables …");
  const result = await Promise.all([
    db.siteSetting.deleteMany(),
    db.product.deleteMany(),
    db.loanProduct.deleteMany(),
    db.faq.deleteMany(),
    db.newsPost.deleteMany(),
    db.teamMember.deleteMany(),
    db.contentPage.deleteMany(),
    db.themeConfig.deleteMany(),
  ]);
  console.log(
    "deleted:",
    result.map((r) => r.count).join(", ")
  );
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
