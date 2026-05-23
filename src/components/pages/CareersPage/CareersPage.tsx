import { getTranslations } from "next-intl/server";
import { CrosswayCareersForm } from "@/components/forms/CrosswayCareersForm/CrosswayCareersForm";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";

export async function CareersPage() {
  const t = await getTranslations("Careers");
  const tc = await getTranslations("Common");

  return (
    <PageShell>
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: t("title") }]} />
      <SectionTitle align="center">{t("title")}</SectionTitle>
      <CrosswayCareersForm />
    </PageShell>
  );
}
