import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { home } from "@/lib/media";
import styles from "./HomeFeatureRows.module.scss";

export async function HomeFeatureRows() {
  const t = await getTranslations("Features");
  const te = await getTranslations("Home");

  const rows = [
    {
      title: t("roomsTitle"),
      body: t("roomsBody"),
      image: home.featureRows.rooms,
      imageSide: "right" as const,
    },
    {
      title: t("diningTitle"),
      body: t("diningBody"),
      image: home.featureRows.dining,
      imageSide: "left" as const,
    },
    {
      title: t("banquetTitle"),
      body: t("banquetBody"),
      image: home.featureRows.banquet,
      imageSide: "right" as const,
    },
    {
      title: t("spaTitle"),
      body: t("spaBody"),
      image: home.featureRows.spa,
      imageSide: "left" as const,
    },
  ];

  return (
    <section className={styles.wrap} aria-labelledby="home-features-heading">
      <header className={styles.header}>
        <p className={styles.eyebrow}>{te("featuresEyebrow")}</p>
        <h2 id="home-features-heading" className={styles.headline}>
          {t("stickySectionTitleBefore")}{" "}
          <span className={styles.accent}>{t("stickySectionTitleAccent")}</span>
        </h2>
      </header>
      <div className={styles.assembly}>
        {rows.map((r, i) => {
          const imageFirst = r.imageSide === "left";
          const content = (
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardDesc}>{r.body}</p>
            </div>
          );
          const visual = (
            <div className={styles.imageBlock}>
              <Image
                src={r.image}
                alt={r.title}
                fill
                className={styles.img}
                sizes="(max-width: 879px) 100vw, 50vw"
              />
            </div>
          );

          return (
            <article
              key={r.title}
              className={styles.stickyCard}
              style={{ zIndex: i + 1 }}
              aria-label={r.title}
            >
              <div className={styles.cardInner}>
                {imageFirst ? (
                  <>
                    {visual}
                    {content}
                  </>
                ) : (
                  <>
                    {content}
                    {visual}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
