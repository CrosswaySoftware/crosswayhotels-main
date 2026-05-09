"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
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

/** Primary rail — same destinations as before; layout matches Palomar V2 header. */
const PRIMARY_NAV = [
  { href: "/#our-hotels", key: "ourHotels" as const },
  { href: "/accommodations", key: "accommodations" as const },
  { href: "/dining", key: "dining" as const },
  { href: "/banquets", key: "banquets" as const },
  { href: "/wellness", key: "wellness" as const },
  { href: "/about-us", key: "nav_about" as const },
  { href: "/contact-us", key: "nav_contact" as const },
] as const;

function readHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

function subscribeHash(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

function parseHref(href: string) {
  const i = href.indexOf("#");
  if (i === -1) return { path: href || "/", hash: "" };
  return { path: href.slice(0, i) || "/", hash: href.slice(i + 1) };
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const t = useTranslations("Nav");
  const tb = useTranslations("Booking");
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const logo = HEADER_LOGO[SITE_HEADER_VARIANT];
  const localeDensity = SITE_HEADER_VARIANT === "classic" ? "comfortable" : "compact";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHome = pathname === "/" || pathname === "";
  const barSolid = solid || !isHome;
  const headerSolid = barSolid || open;

  const linkActive = (href: string) => {
    const { path, hash: hrefHash } = parseHref(href);
    const pathNorm = path === "" ? "/" : path;

    if (pathNorm !== "/" && pathNorm !== "") {
      return pathname === pathNorm || pathname.startsWith(`${pathNorm}/`);
    }

    if (!isHome) return false;
    if (!hrefHash) return !hash || hash === "#" || hash === "";
    return hash === `#${hrefHash}`;
  };

  return (
    <header
      className={`${styles.headerRoot} ${barSolid ? styles.barSolid : ""} ${open ? styles.menuOpen : ""}`}
      data-header-variant={SITE_HEADER_VARIANT}
    >
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

      <div className={styles.mainBar}>
        <div className={styles.mainBarInner}>
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
            <Image src={layout.logoHeader} alt="Crossway Hotels and Resorts" width={logo.w} height={logo.h} priority />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${linkActive(item.href) ? styles.navLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                <span>{t(item.key)}</span>
                <span className={styles.navDot} aria-hidden />
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <a className={styles.phone} href="tel:+919751277770">
              +91 97512 77770
            </a>
            <BookNavLink className={styles.book} onClick={() => setOpen(false)}>
              {tb("bookHeader")}
            </BookNavLink>
            <div className={styles.locale}>
              <LocaleSwitcher density={localeDensity} variant="dark" tone={headerSolid ? "onLight" : "onDark"} />
            </div>
            <button type="button" className={styles.menuBtn} aria-expanded={open} aria-label={t("menuToggle")} onClick={() => setOpen((v) => !v)}>
              <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <>
          <button type="button" className={styles.mobileBackdrop} aria-label={t("menuClose")} onClick={() => setOpen(false)} />
          <div className={styles.mobileSheet} role="dialog" aria-modal="true" aria-label={t("menuTitle")}>
            <nav className={styles.mobileNav}>
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLink} ${linkActive(item.href) ? styles.mobileLinkActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <BookNavLink className={styles.mobileBook} onClick={() => setOpen(false)}>
              {tb("bookHeader")}
            </BookNavLink>
          </div>
        </>
      ) : null}
    </header>
  );
}
