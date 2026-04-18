import { BrandStoryPage } from "@/components/pages/BrandStoryPage/BrandStoryPage";
import { HOTEL_SITE_ORIGIN_LIFOTEL, hotelMicrositeUrl } from "@/config/hotelSiteUrls";
import { brand } from "@/lib/media";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("lifotelSuites") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("BrandLifotelSuites");
  return (
    <BrandStoryPage
      breadcrumbLabel={t("breadcrumb")}
      heroImage={brand.lifotelSuites.hero}
      logoSrc={brand.lifotelSuites.logo}
      logoWidth={500}
      logoHeight={230}
      title={t("title")}
      subtitle={t("subtitle")}
      paragraphs={[t("p1")]}
      cta={{ href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_LIFOTEL, locale), label: t("ctaDiscover"), external: true }}
    />
  );
}
