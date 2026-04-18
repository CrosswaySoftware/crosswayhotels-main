import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { Reveal } from "@/components/motion/Reveal";
import { home } from "@/lib/media";
import { getTranslations } from "next-intl/server";
import styles from "./DiscoverSection.module.scss";

export async function DiscoverSection() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        <Reveal className={styles.visualWrap}>
          <div className={styles.visual} style={{ backgroundImage: `url(${home.discover})` }} />
          <div className={styles.frame} aria-hidden />
        </Reveal>
        <div className={styles.prose}>
          <Reveal delay={0.08}>
            <SectionTitle align="left" eyebrow={t("discoverEyebrow")}>
              {t("discoverTitle")}
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.14}>
            <p>{t("discoverP1")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>{t("discoverP2")}</p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className={styles.last}>{t("discoverP3")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
