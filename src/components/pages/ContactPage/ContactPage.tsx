import { MapEmbed } from "@/components/contact/MapEmbed/MapEmbed";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import staticForm from "@/components/forms/StaticFormNote/StaticFormNote.module.scss";
import { getTranslations } from "next-intl/server";
import styles from "./ContactPage.module.scss";

const MAP_IN = "https://maps.google.com/maps?q=12.803875,80.224867&z=16&output=embed";
const MAPS_OPEN_IN = "https://www.google.com/maps/search/?api=1&query=12.803875,80.224867";

export async function ContactPage() {
  const t = await getTranslations("Contact");
  const tn = await getTranslations("Nav");

  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
          <p className={styles.heroLead}>{t("heroLead")}</p>
        </div>
      </header>

      <PageShell variant="wide">
        <div className={styles.shellTop}>
          <Breadcrumbs items={[{ label: tn("home"), href: "/" }, { label: tn("contact") }]} />
        </div>

        <div className={styles.locations}>
          <article className={styles.location} aria-labelledby="office-in-heading">
            <div className={styles.mapCol}>
              <MapEmbed
                title={t("officeInMapTitle")}
                src={MAP_IN}
                mapsUrl={MAPS_OPEN_IN}
                linkLabel={t("openInMaps")}
              />
            </div>
            <div className={styles.card}>
              <p className={styles.cardEyebrow}>{t("officeInLabel")}</p>
              <h2 id="office-in-heading" className={styles.cardTitle}>
                {t("officeInCompany")}
              </h2>
              <div className={styles.rule} aria-hidden />
              <address className={styles.address}>
                {t("officeInLine1")}
                <br />
                {t("officeInLine2")}
                <br />
                {t("officeInLine3")}
              </address>
              <dl className={styles.contactLines}>
                <div className={styles.contactRow}>
                  <dt>{t("labelPhone")}</dt>
                  <dd>
                    <a href="tel:+919751277770">{t("officeInPhone2")}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </div>

        <section className={styles.formSection} aria-labelledby="contact-form-heading">
          <div className={styles.formPanel}>
            <SectionTitle align="center" eyebrow={t("formSectionEyebrow")} id="contact-form-heading">
              {t("formSectionTitle")}
            </SectionTitle>
            <p className={styles.formLead}>{t("formSectionLead")}</p>
            {/* <p className={staticForm.note}>{t("formStaticNote")}</p> */}
            <form className={staticForm.form} aria-label={t("formAria")}>
              <label>
                {t("formName")}
                <input type="text" name="your-name" required disabled />
              </label>
              <label>
                {t("formEmail")}
                <input type="email" name="your-email" required disabled />
              </label>
              <label>
                {t("formSubject")}
                <input type="text" name="your-subject" required disabled />
              </label>
              <label>
                {t("formMessage")}
                <textarea name="your-message" disabled />
              </label>
              <button type="submit" disabled>
                {t("formSubmit")}
              </button>
            </form>
          </div>
        </section>
      </PageShell>
    </>
  );
}
