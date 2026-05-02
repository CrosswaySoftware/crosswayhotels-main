"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BookNavLink } from "@/components/layout/BookNavLink/BookNavLink";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import { SITE_HEADER_VARIANT, type SiteHeaderVariant } from "@/config/siteHeaderVariant";
import { layout } from "@/lib/media";
import styles from "./SiteHeader.module.scss";

const HEADER_LOGO: Record<SiteHeaderVariant, { w: number; h: number }> = {
  compact: { w: 150, h: 34 },
  classic: { w: 168, h: 38 },
  split: { w: 158, h: 36 },
};

/** Flat primary rail — Our Hotels anchors homepage showcase; brochure stays in footer. */
const PRIMARY_NAV = [
  { href: "/#our-hotels", key: "ourHotels" as const },
  { href: "/accommodations", key: "accommodations" as const },
  { href: "/dining", key: "dining" as const },
  { href: "/banquets", key: "banquets" as const },
  { href: "/wellness", key: "wellness" as const },
  { href: "/about-us", key: "nav_about" as const },
  { href: "/contact-us", key: "nav_contact" as const },
] as const;

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const t = useTranslations("Nav");
  const tb = useTranslations("Booking");
  const logo = HEADER_LOGO[SITE_HEADER_VARIANT];
  const localeDensity = SITE_HEADER_VARIANT === "classic" ? "comfortable" : "compact";

  const linkActive = (href: string) => {
    const pathOnly = href.split("#")[0] || "/";
    const normalized = pathOnly === "" ? "/" : pathOnly;
    if (normalized === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname === normalized || pathname.startsWith(`${normalized}/`);
  };

  return (
    <header className={styles.headerRoot} data-header-variant={SITE_HEADER_VARIANT}>
      <div className={styles.ribbon}>
        <div className={styles.ribbonInner}>
          <a className={styles.ribbonLink} href="mailto:contact@crosswayhotels.com">
            {t("mailUs")}
          </a>
          <span className={styles.dot} aria-hidden />
          <a className={styles.ribbonLink} href="tel:+919751277770">
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
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${linkActive(item.href) ? styles.navLinkActive : ""}`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <BookNavLink className={styles.bookCta}>{tb("bookHeader")}</BookNavLink>
            <LocaleSwitcher density={localeDensity} variant="dark" />
          </div>

          <details className={styles.mobileDetails}>
            <summary className={styles.menuToggle}>
              <span className={styles.menuIcon} />
              <span className={styles.srOnly}>Menu</span>
            </summary>
            <div className={styles.mobilePanel}>
              <div className={styles.mobileInner}>
                {PRIMARY_NAV.map((item) => (
                  <Link key={item.href} href={item.href} className={styles.mobileNavLink}>
                    {t(item.key)}
                  </Link>
                ))}
                <BookNavLink className={styles.mobileNavLink}>{tb("bookHeader")}</BookNavLink>
                <div className={styles.mobileLocale}>
                  <LocaleSwitcher density={localeDensity} variant="dark" />
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
