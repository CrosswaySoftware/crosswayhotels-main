import { getTranslations } from "next-intl/server";
import { HomeHeroClient } from "./HomeHeroClient";

export async function HomeHero() {
  const th = await getTranslations("Home");

  return (
    <HomeHeroClient kicker={th("heroKicker")} title={th("heroTitle")} lead={th("heroLead")} />
  );
}
