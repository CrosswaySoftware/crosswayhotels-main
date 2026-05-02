import { Cormorant_Garamond } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { HomeHeroClient } from "./HomeHeroClient";

const heroDisplay = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

export async function HomeHero() {
  const th = await getTranslations("Home");

  return (
    <HomeHeroClient
      kicker={th("heroKicker")}
      title={th("heroTitle")}
      lead={th("heroLead")}
      ctaExplore={th("heroCtaExplore")}
      ctaBook={th("heroCtaBook")}
      titleFontClassName={heroDisplay.className}
    />
  );
}
