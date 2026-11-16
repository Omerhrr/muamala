import { PageHeader } from "@/components/site/page-header";
import { ApplyForms } from "@/components/site/apply-forms";
import { getLoanProducts, getSettingsGroup, pageMeta } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return pageMeta("apply");
}

export default async function ApplyPage() {
  const [general, apply, ui, loans] = await Promise.all([
    getSettingsGroup("general"),
    getSettingsGroup("apply"),
    getSettingsGroup("ui"),
    getLoanProducts(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={apply.eyebrow}
        title={apply.title}
        subtitle={apply.subtitle}
      />
      <ApplyForms settings={apply} general={general} loans={loans} ui={ui} />
    </>
  );
}
