import { Cormorant_Garamond } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { HotelsShowcaseCarousel } from "./HotelsShowcaseCarousel";
import { HOTELS_SHOWCASE_SLIDES } from "./hotelsShowcaseSlides";
import styles from "./HotelsShowcase.module.scss";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

export async function HotelsShowcase() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="our-hotels" aria-labelledby="hotels-showcase-heading">
      <div className={styles.texture} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <Reveal>
            <p className={styles.eyebrow}>{t("hotelsShowcaseEyebrow")}</p>
            <h2 id="hotels-showcase-heading" className={`${styles.title} ${display.className}`}>
              {t("hotelsShowcaseTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className={styles.lead}>{t("hotelsShowcaseLead")}</p>
          </Reveal>
        </header>

        <HotelsShowcaseCarousel slides={HOTELS_SHOWCASE_SLIDES} />
      </div>
    </section>
  );
}
