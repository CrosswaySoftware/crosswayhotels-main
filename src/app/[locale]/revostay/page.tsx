import { BrandStoryPage } from "@/components/pages/BrandStoryPage/BrandStoryPage";
import { HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL, hotelMicrositeUrl } from "@/config/hotelSiteUrls";
import { brand } from "@/lib/media";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("revostay") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("BrandRevostay");
  return (
    <BrandStoryPage
      breadcrumbLabel={t("breadcrumb")}
      heroImage={brand.revostay.hero}
      logoSrc={brand.revostay.logo}
      logoWidth={220}
      logoHeight={220}
      title={t("title")}
      subtitle={t("subtitle")}
      paragraphs={[t("p1"), t("p2")]}
      cta={{ href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL, locale), label: t("ctaDiscover"), external: true }}
    />
  );
}
