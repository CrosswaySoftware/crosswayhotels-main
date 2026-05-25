import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { contactUsPath } from "@/lib/contactPath";
import { layout } from "@/lib/media";
import styles from "./SiteFooter.module.scss";

const social = [
  { label: "Twitter", href: "https://twitter.com/crosswayhotels", icon: "𝕏" },
  { label: "Facebook", href: "https://www.facebook.com/crosswayhotels", icon: "f" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/crossway-hotels-and-resorts-b49137170/", icon: "in" },
  { label: "Instagram", href: "https://www.instagram.com/crossway_hotels/", icon: "◎" },
];

const useful: { href: string; key: "link_news" | "link_about" | "link_partner" | "link_careers" | "link_feedback" | "link_privacy" | "link_terms" | "link_contact" }[] = [
  { href: "/news-and-updates", key: "link_news" },
  { href: "/about-us", key: "link_about" },
  { href: "/partner-with-us", key: "link_partner" },
  { href: "/careers", key: "link_careers" },
  { href: "/feedback", key: "link_feedback" },
  { href: "/privacy-policy", key: "link_privacy" },
  { href: "/terms-of-use", key: "link_terms" },
  { href: "/contact-us", key: "link_contact" },
];

export async function SiteFooter() {
  const locale = await getLocale();
  const contactHref = contactUsPath(locale);
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.colBrand}>
            <div className={styles.colBrandLead}>
              <Image
                src={layout.logoFooter}
                alt=""
                width={376}
                height={84}
                className={styles.logo}
                sizes="(max-width: 480px) 72vw, 260px"
              />
            </div>
            <Link className={styles.cta} href="/brochure">
              {t("downloadBrochure")}
            </Link>
          </div>
          <div>
            <h4 className={styles.colTitle} id="contact-details">
              {t("contactDetails")}
            </h4>
            <p className={styles.address}>{t("address_in")}</p>
            <ul className={styles.list}>
              <li>+91 97512 77770</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <a href="mailto:contact@crosswayhotels.com">contact@crosswayhotels.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.colTitle}>{t("ourBrands")}</h4>
            <ul className={styles.list}>
              <li>
                <Link href="/crossway">{t("brand_crossway")}</Link>
              </li>
              <li>
                <Link href="/lifotel">{t("brand_lifotel")}</Link>
              </li>
              <li>
                <Link href="/revostay">{t("brand_revostay")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.colTitle}>{t("usefulLinks")}</h4>
            <ul className={styles.list}>
              {useful.map((l) => (
                <li key={l.href}>
                  {l.href === "/contact-us" ? (
                    <a href={contactHref}>{t(l.key)}</a>
                  ) : (
                    <Link href={l.href}>{t(l.key)}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>{t("copyright", { year })}</p>
          <ul className={styles.social}>
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
