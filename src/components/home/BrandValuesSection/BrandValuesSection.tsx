import { Reveal } from "@/components/motion/Reveal";
import { getTranslations } from "next-intl/server";
import styles from "./BrandValuesSection.module.scss";

const PILLARS = [1, 2, 3, 4] as const;

export async function BrandValuesSection() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="brand-essence" aria-labelledby="brand-essence-heading">
      <div className={styles.inner}>
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>{t("brandEssenceEyebrow")}</p>
            <h2 id="brand-essence-heading" className={styles.title}>
              {t("brandEssenceTitle")}
            </h2>
            <div className={styles.rule} aria-hidden />
          </Reveal>
          <Reveal delay={0.08}>
            <p className={styles.lead}>{t("brandEssenceLead")}</p>
          </Reveal>
        </header>
        <div className={styles.grid}>
          {PILLARS.map((n, i) => (
            <Reveal key={n} delay={0.06 + i * 0.07}>
              <article className={styles.card}>
                <span className={styles.index} aria-hidden>
                  {String(n).padStart(2, "0")}
                </span>
                <h3 className={styles.cardTitle}>{t(`brandPillar${n}Title`)}</h3>
                <p className={styles.body}>{t(`brandPillar${n}Body`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
