import { ServicePortfolioPage } from "@/components/pages/ServicePortfolioPage/ServicePortfolioPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceExperience" });
  return { title: t("banquets.metaTitle") };
}

export default function Page() {
  return <ServicePortfolioPage variant="banquets" />;
}
