import { BrandsSection } from "@/components/home/BrandsSection/BrandsSection";
import { BrandSignatureSection } from "@/components/home/BrandSignatureSection/BrandSignatureSection";
import { PromiseSection } from "@/components/home/PromiseSection/PromiseSection";
import { DiscoverSection } from "@/components/home/DiscoverSection/DiscoverSection";
import { HotelsShowcase } from "@/components/home/HotelsShowcase/HotelsShowcase";
import { HomeFeatureRows } from "@/components/home/HomeFeatureRows/HomeFeatureRows";
import { HeroWithBooking } from "@/components/home/HeroWithBooking/HeroWithBooking";
import { PerfectStayGrid } from "@/components/home/PerfectStayGrid/PerfectStayGrid";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroWithBooking />
      {/* Sentinel for SiteHeader: switch frosted bar + brand logo once user scrolls past hero */}
      <div id="home-hero-end" aria-hidden style={{ height: 1, width: "100%", pointerEvents: "none" }} />
      <DiscoverSection />
      <HotelsShowcase />
      <PerfectStayGrid />
      <HomeFeatureRows />
      <BrandSignatureSection />
      <PromiseSection />
      <BrandsSection />
    </>
  );
}
