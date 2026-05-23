import { getTranslations } from "next-intl/server";
import { CrosswayFeedbackForm } from "@/components/forms/CrosswayFeedbackForm/CrosswayFeedbackForm";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";

export async function FeedbackPage() {
  const t = await getTranslations("Feedback");
  const tc = await getTranslations("Common");

  return (
    <PageShell>
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: t("title") }]} />
      <SectionTitle align="center">{t("title")}</SectionTitle>
      <CrosswayFeedbackForm />
    </PageShell>
  );
}
