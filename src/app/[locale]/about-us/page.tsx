import { AboutUsPage } from "@/components/pages/AboutUsPage/AboutUsPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("aboutUsDocumentTitle") };
}

export default function Page() {
  return <AboutUsPage />;
}
