import { Cormorant_Garamond } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { IconCare, IconComfort, IconResponsible, IconValue } from "./PromiseIcons";
import styles from "./PromiseSection.module.scss";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

const PILLARS = [
  { Icon: IconComfort, titleKey: "promiseCol1Title" as const, bodyKey: "promiseCol1Body" as const },
  { Icon: IconCare, titleKey: "promiseCol2Title" as const, bodyKey: "promiseCol2Body" as const },
  { Icon: IconValue, titleKey: "promiseCol3Title" as const, bodyKey: "promiseCol3Body" as const },
  { Icon: IconResponsible, titleKey: "promiseCol4Title" as const, bodyKey: "promiseCol4Body" as const },
];

export async function PromiseSection() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="our-promise" aria-labelledby="our-promise-heading">
      <div className={styles.inner}>
        <div className={styles.shell}>
          <div className={styles.film} aria-hidden />
          <div className={styles.leaf} aria-hidden />

          <div className={styles.layout}>
            <Reveal className={styles.lead}>
              <p className={styles.eyebrow}>{t("brandVoiceEyebrow")}</p>
              <h2 id="our-promise-heading" className={`${styles.title} ${serif.className}`}>
                {t("brandVoiceTitle")}
              </h2>
              <p className={styles.sub}>{t("brandVoiceQuote")}</p>
              <Link className={styles.cta} href="/#book">
                {t("heroCtaBook")}
              </Link>
            </Reveal>

            <div className={styles.pillars} role="list">
              {PILLARS.map(({ Icon, titleKey, bodyKey }, i) => (
                <Reveal key={titleKey} className={styles.pillar} delay={0.06 * (i + 1)} role="listitem">
                  <div className={styles.iconRing} aria-hidden>
                    <Icon className={styles.icon} />
                  </div>
                  <h3 className={styles.pillarTitle}>{t(titleKey)}</h3>
                  <p className={styles.pillarBody}>{t(bodyKey)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
