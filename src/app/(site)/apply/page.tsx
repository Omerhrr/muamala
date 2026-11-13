import { PageHeader } from "@/components/site/page-header";
import { ApplyForms } from "@/components/site/apply-forms";
import { getLoanProducts, getSettingsGroup } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const general = await getSettingsGroup("general");
  return {
    title: `Open an account or apply for a loan | ${general.bankName}`,
    description: `Start your ${general.shortName} account opening or loan application online — our team will call you back within one business day.`,
  };
}

export default async function ApplyPage() {
  const [general, apply, loans] = await Promise.all([
    getSettingsGroup("general"),
    getSettingsGroup("apply"),
    getLoanProducts(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title={apply.title}
        subtitle={apply.subtitle}
      />
      <ApplyForms settings={apply} general={general} loans={loans} />
    </>
  );
}
