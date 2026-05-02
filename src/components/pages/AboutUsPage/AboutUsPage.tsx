import { Cormorant_Garamond } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { home, pages } from "@/lib/media";
import styles from "./AboutUsPage.module.scss";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

const PILLAR_ICONS = ["concierge", "shield", "pin", "heart"] as const;
const PILLAR_KEYS = ["pillar_0", "pillar_1", "pillar_2", "pillar_3"] as const;

function PillarGlyph({ name }: { name: (typeof PILLAR_ICONS)[number] }) {
  const stroke = "currentColor";
  const common = { width: 26, height: 26, fill: "none" as const, stroke, strokeWidth: 1.35, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (name) {
    case "concierge":
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...common}>
          <path d="M12 3v3M9 6h6M8 9h8l-1 12H9L8 9z" />
          <path d="M10 14h4" opacity={0.65} />
        </svg>
      );
    case "shield":
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...common}>
          <path d="M12 21s8-4.2 8-11V5l-8-3-8 3v5c0 6.8 8 11 8 11z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );
    case "pin":
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...common}>
          <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z" />
          <circle cx={12} cy={11} r={2.25} />
        </svg>
      );
    case "heart":
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...common}>
          <path d="M20.84 6.61a5.5 5.5 0 0 0-7.78 0L12 7.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
  }
}

export async function AboutUsPage() {
  const locale = await getLocale();
  const t = await getTranslations("AboutUs");
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");
  const serifHeading = locale === "ar" ? "" : displaySerif.className;

  const whereItems = [t("passion_where_0"), t("passion_where_1"), t("passion_where_2"), t("passion_where_3")];
  const hostItems = [t("passion_host_0"), t("passion_host_1"), t("passion_host_2"), t("passion_host_3")];

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

        {/* 1 — Who we are */}
        <section className={styles.who} aria-labelledby="who-heading">
          <div className={styles.whoGrid}>
            <div className={styles.whoCopy}>
              <p className={styles.kicker}>{t("whoEyebrow")}</p>
              <h2 id="who-heading" className={`${styles.displayHeading} ${serifHeading}`.trim()}>
                {t("whoTitle")}
              </h2>
              <div className={styles.proseStack}>
                <p>{t("whoP1")}</p>
                <p>{t("whoP2")}</p>
                <p>{t("whoP3")}</p>
              </div>
            </div>
            <div className={styles.whoFigure}>
              <div className={styles.whoPhoto} style={{ backgroundImage: `url(${home.discover})` }} role="img" aria-hidden />
              <div className={styles.whoPhotoAccent} aria-hidden />
            </div>
          </div>
        </section>

        {/* 2 — The Crossway standard */}
        <section className={styles.standard} aria-labelledby="standard-heading">
          <header className={styles.standardHead}>
            <p className={styles.kicker}>{t("passionEyebrow")}</p>
            <h2 id="standard-heading" className={`${styles.standardTitle} ${serifHeading}`.trim()}>
              {t("passionTitle")}
            </h2>
            <p className={styles.standardLead}>{t("passionLead")}</p>
          </header>
          <div className={styles.pillarBoard}>
            {PILLAR_ICONS.map((icon, i) => (
              <article key={icon} className={styles.pillarCard}>
                <span className={styles.pillarWatermark} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.pillarIcon}>
                  <PillarGlyph name={icon} />
                </div>
                <p className={styles.pillarText}>{t(PILLAR_KEYS[i])}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 3 — Experience & hosting */}
        <section className={styles.hosting} aria-labelledby="hosting-section-label">
          <p id="hosting-section-label" className={styles.hostingRibbon}>
            {t("experienceHostingEyebrow")}
          </p>
          <div className={styles.hostingSplit}>
            <div className={styles.hostingPanel}>
              <header className={styles.panelHead}>
                <p className={styles.panelEyebrow}>{t("whereEyebrow")}</p>
                <h2 className={`${styles.panelTitle} ${serifHeading}`.trim()}>{t("whereTitle")}</h2>
              </header>
              <ul className={styles.stepList}>
                {whereItems.map((text, i) => (
                  <li key={text} className={styles.stepRow}>
                    <span className={styles.stepBadge} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.stepText}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.hostingDivider} aria-hidden>
              <span className={styles.hostingDividerCap} />
              <span className={styles.hostingDividerLine} />
              <span className={styles.hostingDividerCap} />
            </div>

            <div className={`${styles.hostingPanel} ${styles.hostingPanelAlt}`}>
              <header className={styles.panelHead}>
                <p className={styles.panelEyebrow}>{t("hostEyebrow")}</p>
                <h2 className={`${styles.panelTitle} ${serifHeading}`.trim()}>{t("hostTitle")}</h2>
              </header>
              <ul className={styles.stepList}>
                {hostItems.map((text, i) => (
                  <li key={text} className={styles.stepRow}>
                    <span className={styles.stepBadge} aria-hidden>
                      {String(i + 5).padStart(2, "0")}
                    </span>
                    <span className={styles.stepText}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
