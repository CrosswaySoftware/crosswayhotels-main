import { Cormorant_Garamond } from "next/font/google";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { home } from "@/lib/media";
import { getTranslations } from "next-intl/server";
import styles from "./DiscoverSection.module.scss";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

export async function DiscoverSection() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        <div className={styles.prose}>
          <Reveal>
            <p className={styles.eyebrow}>{t("discoverEyebrow")}</p>
            <h2 className={`${styles.title} ${displaySerif.className}`}>{t("discoverTitle")}</h2>
            <div className={styles.rule} aria-hidden />
          </Reveal>
          <Reveal delay={0.08}>
            <p>{t("discoverP1")}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p>{t("discoverP2")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.last}>{t("discoverP3")}</p>
          </Reveal>
          <Reveal delay={0.26}>
            <Link className={styles.cta} href="/about-us">
              {t("discoverCta")}
            </Link>
          </Reveal>
        </div>
        <Reveal className={styles.visualWrap} delay={0.06}>
          <div className={styles.visual} style={{ backgroundImage: `url(${home.discover})` }} />
        </Reveal>
      </div>
    </section>
  );
}
