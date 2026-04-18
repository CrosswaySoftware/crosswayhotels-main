import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PostGrid } from "@/components/blog/PostGrid/PostGrid";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { blogPostMessageKey } from "@/lib/blogPostMessageKey";
import { blogPosts } from "@/lib/posts";
import styles from "./NewsUpdatesPage.module.scss";

const featured = blogPosts[0];

export async function NewsUpdatesPage() {
  const t = await getTranslations("News");
  const tc = await getTranslations("Common");
  const tb = await getTranslations("BlogPosts");
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);
  const fk = blogPostMessageKey(featured.slug);

  return (
    <PageShell variant="wide">
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: t("breadcrumb") }]} />
      <article className={styles.featured}>
        <div className={styles.featuredBg} style={{ backgroundImage: `url(${featured.image})` }} />
        <div className={styles.featuredOverlay} />
        <div className={styles.featuredInner}>
          <h2 className={styles.featuredTitle}>
            <Link href={`/${featured.slug}`}>{tb(`${fk}.title`)}</Link>
          </h2>
          <p className={styles.excerpt}>{tb(`${fk}.excerpt`)}</p>
          <Link className={styles.read} href={`/${featured.slug}`}>
            {tc("readMore")}
          </Link>
        </div>
      </article>
      <h2 className={styles.subhead}>{t("moreStories")}</h2>
      <PostGrid posts={rest} />
    </PageShell>
  );
}
