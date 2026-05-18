import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage/LegalDocumentPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("partnerWithUs") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
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
