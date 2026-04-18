import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage/LegalDocumentPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("termsOfUse") };
}

export default async function Page() {
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");
  return (
    <LegalDocumentPage
      homeLabel={tc("breadcrumbHome")}
      title={tm("termsOfUse")}
      breadcrumb={tm("termsOfUse")}
      file="legal/terms-of-use.md"
    />
  );
}
