import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { Reveal } from "@/components/motion/Reveal";
import { home } from "@/lib/media";
import styles from "./BrandsSection.module.scss";

const BRANDS = [
  {
    titleKey: "brand_crossway" as const,
    front: home.brands.crossway.front,
    back: home.brands.crossway.back,
    href: "/crossway",
    external: false,
  },
  {
    titleKey: "brand_lifotel" as const,
    front: home.brands.lifotel.front,
    back: home.brands.lifotel.back,
    href: "/lifotel",
    external: false,
  },
  {
    titleKey: "brand_revostay" as const,
    front: home.brands.revostay.front,
    back: home.brands.revostay.back,
    href: "https://revostay.com/",
    external: true,
  },
];

export async function BrandsSection() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="core-features">
      <div className={styles.inner}>
        <SectionTitle align="center" variant="onDark" eyebrow={t("brandsEyebrow")}>
          {t("brandsTitle")}
        </SectionTitle>
        <div className={styles.grid}>
          {BRANDS.map((b, i) => (
            <Reveal key={b.titleKey} delay={i * 0.1} className={styles.reveal}>
              <div className={styles.tilt} tabIndex={0}>
                <div className={styles.card}>
                  <div className={styles.face} style={{ backgroundImage: `url(${b.front})` }} />
                  <div className={styles.faceBack} style={{ backgroundImage: `url(${b.back})` }}>
                    <div className={styles.backInner}>
                      <h3>{t(b.titleKey)}</h3>
                      <p>
                        {b.external ? (
                          <a className={styles.cta} href={b.href} target="_blank" rel="noopener noreferrer">
                            {t("viewMore")}
                          </a>
                        ) : (
                          <Link className={styles.cta} href={b.href}>
                            {t("viewMore")}
                          </Link>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
