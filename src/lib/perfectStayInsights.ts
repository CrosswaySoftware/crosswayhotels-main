import { brand, home, news, pages } from "@/lib/media";

export const STAY_CATEGORIES = ["accommodations", "business", "food", "wellness"] as const;
export type StayCategoryId = (typeof STAY_CATEGORIES)[number];

export type PerfectStayInsight = {
  slug: string;
  image: string;
};

/** One distinct image per insight so modal + detail pages never look empty or repetitive. */
export const PERFECT_STAY_INSIGHTS: Record<StayCategoryId, PerfectStayInsight[]> = {
  wellness: [
    { slug: "palomar-spa", image: home.featureRows.spa },
    { slug: "days-thermal-suite", image: news.promisingChain },
    { slug: "lifotel-calm-studio", image: pages.about.family },
    { slug: "ayurveda-ritual", image: home.perfectStay.wellness },
  ],
  accommodations: [
    { slug: "connecting-suites", image: home.perfectStay.family },
    { slug: "kids-weekend-club", image: pages.about.service },
    { slug: "pool-lawn-days", image: news.beachResort },
    { slug: "family-dining-table", image: home.featureRows.dining },
  ],
  business: [
    { slug: "executive-lounge", image: home.perfectStay.business },
    { slug: "meeting-floors-omr", image: pages.brochure.promoBg },
    { slug: "airport-rhythm", image: brand.lifotel.hero },
    { slug: "quiet-desk-suites", image: home.featureRows.rooms },
  ],
  food: [
    { slug: "ecr-seafood-room", image: home.perfectStay.food },
    { slug: "omr-coffee-house", image: news.rideBar },
    { slug: "roof-grill-nights", image: pages.about.hero },
    { slug: "chef-table-palomar", image: brand.crossway.hero },
  ],
};

export function insightTranslationId(category: StayCategoryId, slug: string): string {
  return `${category}_${slug.replace(/-/g, "_")}`;
}

export function getInsight(category: StayCategoryId, slug: string): PerfectStayInsight | undefined {
  return PERFECT_STAY_INSIGHTS[category]?.find((i) => i.slug === slug);
}

export function getAllInsightStaticParams(): { category: StayCategoryId; slug: string }[] {
  return STAY_CATEGORIES.flatMap((category) =>
    PERFECT_STAY_INSIGHTS[category].map((i) => ({ category, slug: i.slug })),
  );
}
