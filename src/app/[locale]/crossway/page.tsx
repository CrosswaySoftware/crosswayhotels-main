import { BrandStoryPage } from "@/components/pages/BrandStoryPage/BrandStoryPage";
import { brand } from "@/lib/media";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("crossway") };
}

export default async function Page() {
  const t = await getTranslations("BrandCrossway");
  return (
    <BrandStoryPage
      breadcrumbLabel={t("breadcrumb")}
      heroImage={brand.crossway.hero}
      logoSrc={brand.crossway.logo}
      logoWidth={500}
      logoHeight={229}
      title={t("title")}
      subtitle={t("subtitle")}
      paragraphs={[t("p1"), t("p2")]}
    />
  );
}
