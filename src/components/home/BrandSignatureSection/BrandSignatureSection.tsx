import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { Reveal } from "@/components/motion/Reveal";
import { getTranslations } from "next-intl/server";
import styles from "./BrandSignatureSection.module.scss";

export async function BrandSignatureSection() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="brand-promise" aria-labelledby="brand-promise-heading">
      <div className={styles.inner}>
        <Reveal>
          <SectionTitle align="center" variant="onDark" eyebrow={t("brandVoiceEyebrow")}>
            <span id="brand-promise-heading">{t("brandVoiceTitle")}</span>
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.08}>
          <span className={styles.quoteMark} aria-hidden>
            “
          </span>
          <blockquote className={styles.blockquote}>
            <p className={styles.quote}>{t("brandVoiceQuote")}</p>
            <div className={styles.rule} aria-hidden />
            <footer className={styles.line}>{t("brandVoiceLine")}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
