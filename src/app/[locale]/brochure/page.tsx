import { BrochurePage } from "@/components/pages/BrochurePage/BrochurePage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("brochure") };
}

export default function Page() {
  return <BrochurePage />;
}
