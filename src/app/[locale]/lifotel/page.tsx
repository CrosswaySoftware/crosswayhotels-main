import { BrandStoryPage } from "@/components/pages/BrandStoryPage/BrandStoryPage";
import { HOTEL_SITE_ORIGIN_LIFOTEL, hotelMicrositeUrl } from "@/config/hotelSiteUrls";
import { brand } from "@/lib/media";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("lifotel") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("BrandLifotel");
  return (
    <BrandStoryPage
      breadcrumbLabel={t("breadcrumb")}
      heroImage={brand.lifotel.hero}
      logoSrc={brand.lifotel.logo}
      logoWidth={500}
      logoHeight={229}
      title={t("title")}
      subtitle={t("subtitle")}
      paragraphs={[t("p1"), t("p2"), t("p3")]}
      cta={{ href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_LIFOTEL, locale), label: t("ctaDiscover"), external: true }}
    />
  );
}
