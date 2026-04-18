import { BrandsSection } from "@/components/home/BrandsSection/BrandsSection";
import { BrandSignatureSection } from "@/components/home/BrandSignatureSection/BrandSignatureSection";
import { BrandValuesSection } from "@/components/home/BrandValuesSection/BrandValuesSection";
import { DiscoverSection } from "@/components/home/DiscoverSection/DiscoverSection";
import { HotelsShowcase } from "@/components/home/HotelsShowcase/HotelsShowcase";
import { HomeFeatureRows } from "@/components/home/HomeFeatureRows/HomeFeatureRows";
import { HomeHero } from "@/components/home/HomeHero/HomeHero";
import { PerfectStayGrid } from "@/components/home/PerfectStayGrid/PerfectStayGrid";
import { BookingBar } from "@/components/layout/BookingBar/BookingBar";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BookingBar />
      <DiscoverSection />
      <HotelsShowcase />
      <BrandValuesSection />
      <PerfectStayGrid />
      <HomeFeatureRows />
      <BrandSignatureSection />
      <BrandsSection />
    </>
  );
}
