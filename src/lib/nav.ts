import {
  HOTEL_SITE_ORIGIN_CROSSWAY_DAYS,
  HOTEL_SITE_ORIGIN_LIFOTEL,
  HOTEL_SITE_ORIGIN_PALOMAR,
  HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL,
  hotelMicrositeUrl,
} from "@/config/hotelSiteUrls";
import { routing } from "@/i18n/routing";

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const secondaryLinks: NavItem[] = [
  { label: "Mail Us: contact@crosswayhotels.com", href: "mailto:contact@crosswayhotels.com" },
  { label: "India: +91 6383752850", href: "tel:+916383752850" },
  { label: "UAE: +97 1503858270", href: "tel:+971503858270" },
];

/** Hotel links follow the active locale — use {@link hotelsSubmenuForLocale} when you have the visitor locale. */
export function hotelsSubmenuForLocale(locale: string): NavItem[] {
  return [
    {
      label: "Crossway Days Hotel OMR Chennai",
      href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_CROSSWAY_DAYS, locale),
      external: true,
    },
    {
      label: "The Palomar by Crossway, ECR, Chennai",
      href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_PALOMAR, locale),
      external: true,
    },
    {
      label: "Lifotel KK INN by Crossway, Chennai",
      href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_LIFOTEL, locale),
      external: true,
    },
    {
      label: "Revostay Royel by Crossway, Chennai",
      href: hotelMicrositeUrl(HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL, locale),
      external: true,
    },
  ];
}

/** Default-locale snapshot — prefer {@link hotelsSubmenuForLocale} for i18n-aware menus. */
export const hotelsSubmenu = hotelsSubmenuForLocale(routing.defaultLocale);

export const brandsSubmenu: NavItem[] = [
  { label: "Crossway", href: "/crossway" },
  { label: "Lifotel by Crossway", href: "/lifotel" },
  { label: "Revostay by Crossway", href: "https://revostay.com/", external: true },
];

export const primaryNav: { label: string; href?: string; children?: NavItem[] }[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Hotels", children: hotelsSubmenu },
  { label: "Our Brands", children: brandsSubmenu },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "News and Updates", href: "/news-and-updates" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerUseful: NavItem[] = [
  { label: "News and Updates", href: "/news-and-updates" },
  { label: "About Us", href: "/about-us" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Careers", href: "/careers" },
  { label: "Feedback", href: "/feedback" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "Contact Us", href: "/contact-us" },
];
