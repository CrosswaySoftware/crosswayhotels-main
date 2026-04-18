import { CareersPage } from "@/components/pages/CareersPage/CareersPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("careers") };
}

export default function Page() {
  return <CareersPage />;
}
