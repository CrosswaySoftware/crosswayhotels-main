import { BrandsSection } from "@/components/home/BrandsSection/BrandsSection";
import { BrandSignatureSection } from "@/components/home/BrandSignatureSection/BrandSignatureSection";
import { PromiseSection } from "@/components/home/PromiseSection/PromiseSection";
import { DiscoverSection } from "@/components/home/DiscoverSection/DiscoverSection";
import { HotelsShowcase } from "@/components/home/HotelsShowcase/HotelsShowcase";
import { HomeFeatureRows } from "@/components/home/HomeFeatureRows/HomeFeatureRows";
import { HeroWithBooking } from "@/components/home/HeroWithBooking/HeroWithBooking";
import { PerfectStayGrid } from "@/components/home/PerfectStayGrid/PerfectStayGrid";

export default function HomePage() {
  return (
    <>
      <HeroWithBooking />
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
