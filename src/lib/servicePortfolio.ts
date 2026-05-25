import {
  HOTEL_SITE_ORIGIN_CROSSWAY_DAYS,
  HOTEL_SITE_ORIGIN_LIFOTEL,
  HOTEL_SITE_ORIGIN_PALOMAR,
  HOTEL_SITE_ORIGIN_PETIT_PALAIS,
  HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL,
} from "@/config/hotelSiteUrls";
import { brand, daysHotel, home, news, pages, palomar, petitPalais, revostay } from "@/lib/media";

export const RESERVATIONS_PHONE_DISPLAY = "+91 97512 77770";
export const RESERVATIONS_PHONE_HREF = "tel:+919751277770";

export type ServiceVariant = "accommodations" | "dining" | "banquets" | "wellness";

export const PROPERTY_ORDER = ["days", "palomar", "lifotel", "royel"] as const;
export const DINING_PROPERTY_ORDER = ["palomar", "lifotel", "royel", "petitpalais", "days"] as const;
export type PropertyId = (typeof PROPERTY_ORDER)[number];
export type DiningPropertyId = (typeof DINING_PROPERTY_ORDER)[number];
export const BANQUETS_PROPERTY_ORDER = ["palomar", "days"] as const satisfies readonly PropertyId[];
export const WELLNESS_PROPERTY_ORDER = ["days"] as const satisfies readonly PropertyId[];

export function propertyOrderForVariant(variant: ServiceVariant): readonly DiningPropertyId[] {
  if (variant === "banquets") return BANQUETS_PROPERTY_ORDER;
  if (variant === "wellness") return WELLNESS_PROPERTY_ORDER;
  if (variant === "dining") return DINING_PROPERTY_ORDER;
  return PROPERTY_ORDER;
}

export const PROPERTY_ORIGINS = {
  days: HOTEL_SITE_ORIGIN_CROSSWAY_DAYS,
  palomar: HOTEL_SITE_ORIGIN_PALOMAR,
  lifotel: HOTEL_SITE_ORIGIN_LIFOTEL,
  royel: HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL,
  petitpalais: HOTEL_SITE_ORIGIN_PETIT_PALAIS,
} as const satisfies Record<DiningPropertyId, string>;

/** Two imagery slots per property for each experience page. */
export const VARIANT_IMAGES: Record<ServiceVariant, Record<DiningPropertyId, readonly [string, string]>> = {
  accommodations: {
    days: [home.featureRows.rooms, home.hotelsShowcase.days],
    palomar: [home.discover, pages.about.family],
    lifotel: [home.perfectStay.family, brand.lifotel.hero],
    royel: [home.hotelsShowcase.royel, home.featureRows.rooms],
    petitpalais: [home.hotelsShowcase.petitpalais, pages.about.family],
  },
  dining: {
    days: [daysHotel.nutcracker, daysHotel.svanna],
    palomar: [palomar.capella, palomar.spottedDeer],
    lifotel: [home.perfectStay.food, home.featureRows.dining],
    royel: [home.perfectStay.food, revostay.royelRestaurant],
    petitpalais: [petitPalais.feastHouse, petitPalais.gardenCafe],
  },
  banquets: {
    days: [home.featureRows.banquet, home.hotelsShowcase.days],
    palomar: [home.featureRows.banquet, home.discover],
    lifotel: [home.featureRows.banquet, brand.lifotel.hero],
    royel: [home.featureRows.banquet, home.featureRows.rooms],
    petitpalais: [home.hotelsShowcase.petitpalais, petitPalais.feastHouse],
  },
  wellness: {
    days: [home.featureRows.spa, home.perfectStay.wellness],
    palomar: [home.featureRows.spa, pages.about.family],
    lifotel: [home.featureRows.spa, brand.lifotel.hero],
    royel: [home.featureRows.spa, home.perfectStay.wellness],
    petitpalais: [petitPalais.gardenCafe, home.hotelsShowcase.petitpalais],
  },
};

export const VARIANT_HERO_BG: Record<ServiceVariant, string> = {
  accommodations: home.heroBg,
  dining: home.featureRows.dining,
  banquets: home.featureRows.banquet,
  wellness: home.featureRows.spa,
};
