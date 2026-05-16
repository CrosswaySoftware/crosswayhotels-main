import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

/**
 * Vercel microsite origins (no trailing slash, no locale segment).
 * Locale is appended at runtime so links match the corporate site language (en · ar · fr).
 *
 * History — previous production URLs:
 * - Crossway Days OMR Chennai → https://crosswaydayshotel.com/
 * - The Palomar ECR Chennai → https://palomarbycrossway.com/
 * - Lifotel KK Inn Guduvanchery → https://kkinn.lifotel.com/
 * - Revostay Royel Chennai → https://royal.revostay.com/
 * - Petit Palais by Crossway, Puducherry → replace with production microsite when live.
 *
 * History — hardcoded staging examples (all `en`):
 * - https://crosswaysdays-hotels.vercel.app/en
 * - https://palomar-five.vercel.app/en
 * - https://lifotel.vercel.app/en
 * - https://revostay.vercel.app/en
 * - https://petitpalais-next.vercel.app/en
 */

export const HOTEL_SITE_ORIGIN_CROSSWAY_DAYS = "https://crosswaydayshotel.com";
export const HOTEL_SITE_ORIGIN_PALOMAR = "https://palomarbycrossway.com";
export const HOTEL_SITE_ORIGIN_LIFOTEL = "https://kkinn.lifotel.com";
export const HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL = "https://royal.revostay.com";
/** Staging Vercel preview — swap for canonical domain when deployed. */
export const HOTEL_SITE_ORIGIN_PETIT_PALAIS = "https://petitpalaiscrossway.com";

/** Maps the app locale segment onto microsite URLs (`/en`, `/ar`, `/fr`). Unknown values fall back to the default locale. */
export function normalizeHotelMicrositeLocale(locale: string): AppLocale {
  return routing.locales.includes(locale as AppLocale) ? (locale as AppLocale) : routing.defaultLocale;
}

/** Full URL for a hotel microsite in the visitor's language, e.g. `https://….vercel.app/fr`. */
export function hotelMicrositeUrl(origin: string, locale: string): string {
  const loc = normalizeHotelMicrositeLocale(locale);
  const base = origin.replace(/\/$/, "");
  return `${base}/${loc}`;
}
