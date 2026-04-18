import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage/LegalDocumentPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("partnerWithUs") };
}

export default async function Page() {
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");
  return (
    <LegalDocumentPage
      homeLabel={tc("breadcrumbHome")}
      title={tm("partnerWithUs")}
      breadcrumb={tm("partnerWithUs")}
      file="legal/partner-with-us.md"
    />
  );
}
