"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import {
  HOTEL_SITE_ORIGIN_CROSSWAY_DAYS,
  HOTEL_SITE_ORIGIN_LIFOTEL,
  HOTEL_SITE_ORIGIN_PALOMAR,
  HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL,
  hotelMicrositeUrl,
} from "@/config/hotelSiteUrls";
import { SITE_HEADER_VARIANT, type SiteHeaderVariant } from "@/config/siteHeaderVariant";
import { layout } from "@/lib/media";
import styles from "./SiteHeader.module.scss";

const HEADER_LOGO: Record<SiteHeaderVariant, { w: number; h: number }> = {
  compact: { w: 150, h: 34 },
  classic: { w: 168, h: 38 },
  split: { w: 158, h: 36 },
};

const HOTEL_ORIGINS = [
  { origin: HOTEL_SITE_ORIGIN_CROSSWAY_DAYS, key: "hotel_days" as const },
  { origin: HOTEL_SITE_ORIGIN_PALOMAR, key: "hotel_palomar" as const },
  { origin: HOTEL_SITE_ORIGIN_LIFOTEL, key: "hotel_lifotel" as const },
  { origin: HOTEL_SITE_ORIGIN_REVOSTAY_ROYEL, key: "hotel_royel" as const },
] as const;

const BRANDS = [
  { href: "/crossway", key: "brand_crossway" as const, external: false },
  { href: "/lifotel", key: "brand_lifotel" as const, external: false },
  { href: "https://revostay.com/", key: "brand_revostay" as const, external: true },
];

const COMPANY = [
  { href: "/partner-with-us", key: "partner" as const, external: false },
  { href: "/news-and-updates", key: "news" as const, external: false },
  { href: "/contact-us", key: "contact" as const, external: false },
];

type PrimaryNavItem =
  | { type: "link"; href: string; key: "home" | "about" }
  | {
      type: "menu";
      menuKey: "ourHotels" | "ourBrands" | "company";
      items: { href: string; key: string; external: boolean }[];
    };

function buildPrimary(hotelItems: { href: string; key: string; external: true }[]): PrimaryNavItem[] {
  return [
    { type: "link", href: "/", key: "home" },
    { type: "link", href: "/about-us", key: "about" },
    { type: "menu", menuKey: "ourHotels", items: hotelItems },
    { type: "menu", menuKey: "ourBrands", items: [...BRANDS] },
    { type: "menu", menuKey: "company", items: [...COMPANY] },
  ];
}

function menuTriggerActive(menuKey: string, pathname: string): boolean {
  if (menuKey === "company") {
    return (
      pathname === "/partner-with-us" ||
      pathname.startsWith("/partner-with-us/") ||
      pathname === "/news-and-updates" ||
      pathname.startsWith("/news-and-updates/") ||
      pathname === "/contact-us" ||
      pathname.startsWith("/contact-us/")
    );
  }
  return false;
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = useTranslations("Nav");
  const logo = HEADER_LOGO[SITE_HEADER_VARIANT];
  const localeDensity = SITE_HEADER_VARIANT === "classic" ? "comfortable" : "compact";

  const primary = useMemo(() => {
    const hotelItems = HOTEL_ORIGINS.map(({ origin, key }) => ({
      href: hotelMicrositeUrl(origin, locale),
      key,
      external: true as const,
    }));
    return buildPrimary(hotelItems);
  }, [locale]);

  return (
    <header className={styles.headerRoot} data-header-variant={SITE_HEADER_VARIANT}>
      <div className={styles.ribbon}>
        <div className={styles.ribbonInner}>
          <a className={styles.ribbonLink} href="mailto:contact@crosswayhotels.com">
            {t("mailUs")}
          </a>
          <span className={styles.dot} aria-hidden />
          <a className={styles.ribbonLink} href="tel:+916383752850">
            {t("indiaPhone")}
          </a>
          <span className={styles.dot} aria-hidden />
          <a className={styles.ribbonLink} href="tel:+971503858270">
            {t("uaePhone")}
          </a>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <Link href="/" className={styles.logo}>
            <Image
              src={layout.logoHeader}
              alt="Crossway Hotels and Resorts"
              width={logo.w}
              height={logo.h}
              priority
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {primary.map((item) => {
              if (item.type === "link") {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                  >
                    {t(item.key)}
                  </Link>
                );
              }
              const triggerActive = menuTriggerActive(item.menuKey, pathname);
              return (
                <div key={item.menuKey} className={styles.navItem}>
                  <span
                    className={`${styles.navLink} ${styles.navLinkMenu} ${triggerActive ? styles.navLinkActive : ""}`}
                    tabIndex={0}
                    role="button"
                  >
                    {t(item.menuKey)}
                  </span>
                  <div className={styles.dropdown}>
                    {item.items.map((row) =>
                      row.external ? (
                        <a key={row.href} className={styles.dropdownLink} href={row.href} target="_blank" rel="noopener noreferrer">
                          {t(row.key)}
                        </a>
                      ) : (
                        <Link key={row.href} className={styles.dropdownLink} href={row.href}>
                          {t(row.key)}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <LocaleSwitcher density={localeDensity} />
          </div>

          <details className={styles.mobileDetails}>
            <summary className={styles.menuToggle}>
              <span className={styles.menuIcon} />
              <span className={styles.srOnly}>Menu</span>
            </summary>
            <div className={styles.mobilePanel}>
              <div className={styles.mobileInner}>
                {primary.map((item) => {
                  if (item.type === "link") {
                    return (
                      <Link key={item.key} href={item.href} className={styles.mobileNavLink}>
                        {t(item.key)}
                      </Link>
                    );
                  }
                  return (
                    <div key={item.menuKey} className={styles.mobileGroup}>
                      <div className={styles.mobileGroupLabel}>{t(item.menuKey)}</div>
                      <div className={styles.mobileSub}>
                        {item.items.map((row) =>
                          row.external ? (
                            <a key={row.href} href={row.href} target="_blank" rel="noopener noreferrer">
                              {t(row.key)}
                            </a>
                          ) : (
                            <Link key={row.href} href={row.href}>
                              {t(row.key)}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className={styles.mobileLocale}>
                  <LocaleSwitcher density={localeDensity} />
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
