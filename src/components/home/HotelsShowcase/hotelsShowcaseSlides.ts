import {
  HOTEL_SITE_ORIGIN_CROSSWAY_DAYS,
  HOTEL_SITE_ORIGIN_LIFOTEL,
  HOTEL_SITE_ORIGIN_PALOMAR,
  HOTEL_SITE_ORIGIN_PETIT_PALAIS,
  HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL,
} from "@/config/hotelSiteUrls";
import { home } from "@/lib/media";

export const HOTELS_SHOWCASE_SLIDES = [
  {
    id: "days",
    origin: HOTEL_SITE_ORIGIN_CROSSWAY_DAYS,
    image: home.hotelsShowcase.days,
    nameKey: "hotel_days" as const,
    essenceKey: "hotelShowcaseEssence_days" as const,
  },
  {
    id: "palomar",
    origin: HOTEL_SITE_ORIGIN_PALOMAR,
    image: home.hotelsShowcase.palomar,
    nameKey: "hotel_palomar" as const,
    essenceKey: "hotelShowcaseEssence_palomar" as const,
  },
  {
    id: "lifotel",
    origin: HOTEL_SITE_ORIGIN_LIFOTEL,
    image: home.hotelsShowcase.lifotel,
    nameKey: "hotel_lifotel" as const,
    essenceKey: "hotelShowcaseEssence_lifotel" as const,
  },
  {
    id: "royel",
    origin: HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL,
    image: home.hotelsShowcase.royel,
    nameKey: "hotel_royel" as const,
    essenceKey: "hotelShowcaseEssence_royel" as const,
  },
  {
    id: "petitpalais",
    origin: HOTEL_SITE_ORIGIN_PETIT_PALAIS,
    image: home.hotelsShowcase.petitpalais,
    nameKey: "hotel_petitpalais" as const,
    essenceKey: "hotelShowcaseEssence_petitpalais" as const,
  },
] as const;

export type HotelShowcaseSlide = (typeof HOTELS_SHOWCASE_SLIDES)[number];
