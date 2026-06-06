import type { MetadataRoute } from "next";
import { buildLocalizedSitemap } from "@/lib/buildLocalizedSitemap";
import { getAllInsightStaticParams } from "@/lib/perfectStayInsights";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crosswayhotels.com";

const STATIC_PATHS = [
  "/",
  "/about-us",
  "/accommodations",
  "/dining",
  "/banquets",
  "/wellness",
  "/lifotel-suites",
  "/lifotel",
  "/revostay",
  "/crossway",
  "/partner-with-us",
  "/news-and-updates",
  "/contact-us",
  "/careers",
  "/feedback",
  "/privacy-policy",
  "/terms-of-use",
  "/brochure",
  "/team",
  "/excellent-hospitality-services",
  "/6314-2",
  "/ride-bar-open-now-at-days-hotel-chennai-omr",
  "/crossway-hotels-and-resorts-bags-the-most-promising-hotel-chain-at-the-india-travel-awards-south-2019",
  "/category/events",
  "/category/press-releases",
  "/category/food-for-thought",
  "/tag/event",
  "/tag/awards",
  "/tag/updates",
  ...getAllInsightStaticParams().map(({ category, slug }) => `/experiences/${category}/${slug}`),
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return buildLocalizedSitemap({
    baseUrl: SITE_URL,
    locales: routing.locales,
    paths: STATIC_PATHS,
  });
}
