import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { pages } from "@/lib/media";
import styles from "./BrochurePage.module.scss";

export async function BrochurePage() {
  const t = await getTranslations("Brochure");
  const tc = await getTranslations("Common");

  return (
    <PageShell variant="wide">
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: t("breadcrumb") }]} />
      <header className={styles.head}>
        <h1 className={styles.title}>{t("pageTitle")}</h1>
      </header>
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.cardA}`}>
          <div className={styles.cardInner}>
            <p className={styles.lead}>{t("cardHotelsLead")}</p>
            <a
              className={styles.download}
              href={pages.brochure.hotelsPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("downloadCta")}
            </a>
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardB}`} style={{ backgroundImage: `url(${pages.brochure.promoBg})` }}>
          <div className={`${styles.cardInner} ${styles.cardInnerCenter}`}>
            <p className={styles.lead}>{t("cardBrandLead")}</p>
            <a
              className={`${styles.download} ${styles.downloadLight}`}
              href={pages.brochure.brandsPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("downloadCta")}
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
