import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  PERFECT_STAY_INSIGHTS,
  type StayCategoryId,
  insightTranslationId,
} from "@/lib/perfectStayInsights";
import styles from "./ExperienceInsightPage.module.scss";

type Props = {
  category: StayCategoryId;
  slug: string;
  image: string;
};

export async function ExperienceInsightPage({ category, slug, image }: Props) {
  const t = await getTranslations("Home");
  const ti = await getTranslations("PerfectStayInsights");
  const tid = insightTranslationId(category, slug);
  const title = ti(`${tid}_title`);
  const galleryItems = PERFECT_STAY_INSIGHTS[category]
    .filter((i) => i.slug !== slug)
    .slice(0, 4);

  return (
    <article className={styles.wrap}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {ti("pageBack")}
        </Link>

        <div className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 720px) 100vw, 720px"
              className={styles.heroImg}
            />
          </div>
          <div className={styles.heroGradient} aria-hidden />
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>
              {t(`stay_${category}_title`)} · {ti("pageEyebrow")}
            </p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.tagline}>{ti(`${tid}_tagline`)}</p>
          </div>
        </div>

        {galleryItems.length > 0 ? (
          <div className={styles.gallery} aria-label={ti("galleryLabel")}>
            {galleryItems.map((item) => {
              const gid = insightTranslationId(category, item.slug);
              return (
                <Link
                  key={item.slug}
                  href={`/experiences/${category}/${item.slug}`}
                  className={styles.galleryCard}
                >
                  <Image
                    src={item.image}
                    alt={ti(`${gid}_title`)}
                    fill
                    sizes="200px"
                    className={styles.galleryImg}
                  />
                </Link>
              );
            })}
          </div>
        ) : null}

        <div className={styles.body}>
          <p>{ti(`${tid}_body`)}</p>
          <p>{ti(`${tid}_body2`)}</p>
        </div>
        <hr className={styles.rule} />
      </div>
    </article>
  );
}
