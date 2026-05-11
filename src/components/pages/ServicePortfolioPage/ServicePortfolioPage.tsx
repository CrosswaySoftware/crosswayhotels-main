import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { hotelMicrositeUrl } from "@/config/hotelSiteUrls";
import { BookingBar } from "@/components/layout/BookingBar/BookingBar";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import {
  PROPERTY_ORDER,
  PROPERTY_ORIGINS,
  RESERVATIONS_PHONE_DISPLAY,
  RESERVATIONS_PHONE_HREF,
  type PropertyId,
  type ServiceVariant,
  VARIANT_HERO_BG,
  VARIANT_IMAGES,
} from "@/lib/servicePortfolio";
import styles from "./ServicePortfolioPage.module.scss";

export async function ServicePortfolioPage({ variant }: { variant: ServiceVariant }) {
  const locale = await getLocale();
  const t = await getTranslations("ServiceExperience");
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");

  const heroBg = VARIANT_HERO_BG[variant];
  const crumbLabel = tm(variant);
  const hideBookingUi = variant === "dining";

  return (
    <>
      <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>{t(`${variant}.heroEyebrow`)}</p>
          <h1>{t(`${variant}.heroTitle`)}</h1>
          <p className={styles.heroLead}>{t(`${variant}.heroLead`)}</p>
          <div className={styles.ctaStrip}>
            {!hideBookingUi ? (
              <Link href="/#book" className={styles.ctaBtn} data-variant="primary">
                {t("ctaBook")}
              </Link>
            ) : null}
            <a className={styles.ctaBtn} href={RESERVATIONS_PHONE_HREF}>
              {t("ctaCall")} · {RESERVATIONS_PHONE_DISPLAY}
            </a>
            <Link href="/contact-us" className={styles.ctaBtn}>
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>

      {hideBookingUi ? null : <BookingBar />}

      <PageShell>
        <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: crumbLabel }]} />

        <section className={styles.intro} aria-labelledby={`${variant}-intro`}>
          <p id={`${variant}-intro`} className={styles.introText}>
            {t(`${variant}.intro`)}
          </p>
        </section>

        <div className={styles.properties}>
          {PROPERTY_ORDER.map((id: PropertyId) => {
            const images = VARIANT_IMAGES[variant][id];
            const hotelHref = hotelMicrositeUrl(PROPERTY_ORIGINS[id], locale);
            return (
              <article key={id} id={`property-${id}`} className={styles.propertyBlock}>
                <header className={styles.propertyHead}>
                  <h2 className={styles.propertyName}>{t(`${variant}.props.${id}.name`)}</h2>
                  <p className={styles.propertyLocation}>{t(`${variant}.props.${id}.location`)}</p>
                </header>

                <p className={styles.itemsLabel}>{t(`${variant}.itemsHeading`)}</p>
                <div className={styles.itemGrid}>
                  {[0, 1].map((idx) => (
                    <div key={idx} className={styles.itemCard}>
                      <div
                        className={styles.itemVisual}
                        style={{ backgroundImage: `url(${images[idx]})` }}
                        role="img"
                        aria-hidden
                      />
                      <div className={styles.itemBody}>
                        <h3 className={styles.itemTitle}>{t(`${variant}.props.${id}.items.${idx}.title`)}</h3>
                        <p className={styles.itemDesc}>{t(`${variant}.props.${id}.items.${idx}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.propertyCtas}>
                  {!hideBookingUi ? (
                    <Link href="/#book" data-accent="1">
                      {t("ctaBook")}
                    </Link>
                  ) : null}
                  <a href={RESERVATIONS_PHONE_HREF} data-accent="2">
                    {RESERVATIONS_PHONE_DISPLAY}
                  </a>
                  <Link href="/contact-us">{t("ctaContact")}</Link>
                  <a href={hotelHref} target="_blank" rel="noopener noreferrer">
                    {t("ctaVisitHotel")}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </PageShell>
    </>
  );
}
