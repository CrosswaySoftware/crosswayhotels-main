"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import { SITE_HEADER_VARIANT, type SiteHeaderVariant } from "@/config/siteHeaderVariant";
import { layout } from "@/lib/media";
import styles from "./SiteHeader.module.scss";

const HEADER_LOGO: Record<SiteHeaderVariant, { w: number; h: number }> = {
  compact: { w: 150, h: 42 },
  classic: { w: 168, h: 46 },
  split: { w: 158, h: 44 },
};

/** `logowhite.png` intrinsic 376×84 — derive width from variant logo height */
const LOGO_PNG_RATIO = 376 / 84;

/** Primary rail — Our Brands first; then Company dropdown + Contact (see {@link COMPANY_MENU}). */
const PRIMARY_NAV = [
  { href: "/#our-brands", key: "ourBrands" as const },
  { href: "/#our-hotels", key: "ourHotels" as const },
  { href: "/accommodations", key: "accommodations" as const },
  { href: "/dining", key: "dining" as const },
  { href: "/banquets", key: "banquets" as const },
  { href: "/wellness", key: "wellness" as const },
  { href: "/about-us", key: "nav_about" as const },
] as const;

const CONTACT_NAV = { href: "/contact-us", key: "contact" as const };

const COMPANY_MENU = [
  { href: "/partner-with-us", key: "partner" as const },
  { href: "/news-and-updates", key: "news" as const },
  { href: "/careers", key: "nav_careers" as const },
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
  const isHome = pathname === "/" || pathname === "";
  const t = useTranslations("Nav");
  const headerRef = useRef<HTMLElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  /** Homepage: false over hero; true once `#home-hero-end` intersects. Other pages: always true. */
  const [pastHero, setPastHero] = useState(() => !isHome);
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const localeDensity = SITE_HEADER_VARIANT === "classic" ? "comfortable" : "compact";

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      return;
    }
    setPastHero(false);
    const el = document.getElementById("home-hero-end");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const r = entry.boundingClientRect;
        /* Sentinel sits right after the hero. While it intersects the viewport we're past the hero top.
           Once it scrolls fully above the viewport, IntersectionObserver stops reporting intersecting —
           without `r.bottom <= 0` the bar would flip back to transparent. */
        setPastHero(entry.isIntersecting || r.bottom <= 0);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setCompanyDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!companyDropdownOpen) return;
    const onDoc = (e: MouseEvent) => {
      const root = companyDropdownRef.current;
      if (root && !root.contains(e.target as Node)) setCompanyDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [companyDropdownOpen]);

  useEffect(() => {
    if (!companyDropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCompanyDropdownOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [companyDropdownOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const syncShellPadding = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--crossway-site-header-h", `${h}px`);
    };

    syncShellPadding();
    const ro = new ResizeObserver(syncShellPadding);
    ro.observe(el);
    window.addEventListener("resize", syncShellPadding);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncShellPadding);
    };
  }, [open, pastHero, pathname]);

  const barSolid = !isHome || pastHero;
  const headerSolid = barSolid || open;

  const logoBase = HEADER_LOGO[SITE_HEADER_VARIANT];
  const logo = { w: Math.round(logoBase.h * LOGO_PNG_RATIO), h: logoBase.h };

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

  const companyMenuActive = COMPANY_MENU.some((item) => linkActive(item.href));

  return (
    <header
      ref={headerRef}
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
        </div>
      </div>

      <div className={styles.mainBar}>
        <div className={styles.mainBarInner}>
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
            <Image
              src={layout.logoHeaderSolid}
              alt="Crossway Hotels and Resorts"
              width={logo.w}
              height={logo.h}
              priority
              sizes="(max-width: 1100px) 48vw, 320px"
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${linkActive(item.href) ? styles.navLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.navLabel}>{t(item.key)}</span>
              </Link>
            ))}
            <div
              ref={companyDropdownRef}
              className={`${styles.navDropdown} ${companyDropdownOpen ? styles.navDropdownOpen : ""}`}
            >
              <button
                type="button"
                className={`${styles.navLink} ${styles.navDropdownTrigger} ${companyMenuActive ? styles.navLinkActive : ""}`}
                aria-haspopup="menu"
                aria-expanded={companyDropdownOpen}
                id="site-header-company-trigger"
                onClick={() => setCompanyDropdownOpen((v) => !v)}
              >
                <span className={styles.navLabel}>{t("company")}</span>
                <span className={styles.navDropdownCaret} aria-hidden />
              </button>
              <div className={styles.navDropdownPanel} role="presentation">
                <div
                  className={styles.navDropdownPanelInner}
                  role="menu"
                  aria-label={t("company")}
                  aria-labelledby="site-header-company-trigger"
                >
                  {COMPANY_MENU.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      role="menuitem"
                      className={`${styles.navDropdownLink} ${linkActive(sub.href) ? styles.navDropdownLinkActive : ""}`}
                      onClick={() => {
                        setOpen(false);
                        setCompanyDropdownOpen(false);
                      }}
                    >
                      {t(sub.key)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href={CONTACT_NAV.href}
              className={`${styles.navLink} ${linkActive(CONTACT_NAV.href) ? styles.navLinkActive : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className={styles.navLabel}>{t(CONTACT_NAV.key)}</span>
            </Link>
          </nav>

          <div className={styles.actions}>
            <div className={styles.locale}>
              <LocaleSwitcher density={localeDensity} variant="dark" tone="onDark" bare={headerSolid} />
            </div>
            <button
              type="button"
              className={styles.menuBtn}
              aria-expanded={open}
              aria-label={t("menuToggle")}
              onClick={() => {
                setOpen((v) => !v);
                setCompanyDropdownOpen(false);
              }}
            >
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
              <div className={styles.mobileGroup}>
                <div className={styles.mobileGroupLabel}>{t("company")}</div>
                {COMPANY_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.mobileLink} ${styles.mobileLinkSub} ${linkActive(item.href) ? styles.mobileLinkActive : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
              <Link
                href={CONTACT_NAV.href}
                className={`${styles.mobileLink} ${linkActive(CONTACT_NAV.href) ? styles.mobileLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                {t(CONTACT_NAV.key)}
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
