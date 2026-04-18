import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { pages } from "@/lib/media";
import styles from "./AboutUsPage.module.scss";

export async function AboutUsPage() {
  const t = await getTranslations("AboutUs");
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");

  const passionWhereItems = [t("passion_where_0"), t("passion_where_1"), t("passion_where_2"), t("passion_where_3")];
  const passionHostItems = [t("passion_host_0"), t("passion_host_1"), t("passion_host_2"), t("passion_host_3")];
  const passionGroups = [
    { label: t("passionWhereLabel"), items: passionWhereItems },
    { label: t("passionHostLabel"), items: passionHostItems },
  ];

  return (
    <>
      <section className={styles.hero} style={{ backgroundImage: `url(${pages.about.hero})` }}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1>{t("heroTitle")}</h1>
          <p className={styles.heroLead}>{t("heroLead")}</p>
        </div>
      </section>
      <PageShell>
        <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: tm("aboutUs") }]} />
        <section className={styles.sectionIntro}>
          <div className={styles.introGrid}>
            <div className={styles.introVisualWrap}>
              <div className={styles.introVisual} style={{ backgroundImage: `url(${pages.about.family})` }} />
              <div className={styles.introFrame} aria-hidden />
            </div>
            <div className={styles.introProse}>
              <SectionTitle align="left" eyebrow={t("storyEyebrow")}>
                {t("storyTitle")}
              </SectionTitle>
              <p className={styles.introLead}>{t("introLead")}</p>
              <p className={styles.introBody}>{t("introBody")}</p>
            </div>
          </div>
        </section>

        <section className={styles.sectionPassion} aria-labelledby="passion-heading">
          <div className={styles.passionGrid}>
            <div className={styles.passionCopy}>
              <SectionTitle align="left" eyebrow={t("passionEyebrow")} id="passion-heading">
                {t("passionTitle")}
              </SectionTitle>
              <p className={styles.passionLead}>{t("passionLead")}</p>
              <div className={styles.passionGroups}>
                {passionGroups.map((group, gi) => {
                  const indexBase = passionGroups.slice(0, gi).reduce((sum, g) => sum + g.items.length, 0);
                  return (
                    <div key={group.label} className={styles.passionGroup}>
                      <p className={styles.groupLabel}>{group.label}</p>
                      <ul className={styles.statementList} role="list">
                        {group.items.map((text, ii) => (
                          <li key={text} className={styles.statement}>
                            <span className={styles.statementIndex} aria-hidden>
                              {String(indexBase + ii + 1).padStart(2, "0")}
                            </span>
                            <span className={styles.statementText}>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <figure className={styles.passionFigure}>
              <div className={styles.passionPhoto} style={{ backgroundImage: `url(${pages.about.service})` }} />
              <figcaption className={styles.passionCaption}>{t("passionCaption")}</figcaption>
            </figure>
          </div>
        </section>
      </PageShell>
    </>
  );
}
