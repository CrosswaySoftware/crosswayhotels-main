import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPostMessageKey } from "@/lib/blogPostMessageKey";
import type { BlogPost } from "@/lib/posts";
import styles from "./PostGrid.module.scss";

export async function PostGrid({ posts }: { posts: BlogPost[] }) {
  const t = await getTranslations("BlogPosts");
  const tc = await getTranslations("Common");

  return (
    <div className={styles.grid}>
      {posts.map((p) => {
        const key = blogPostMessageKey(p.slug);
        const title = t(`${key}.title`);
        const excerpt = t(`${key}.excerpt`);
        const meta = p.categories.map((c) => t(`categoryLabel_${c}`)).join(" · ");

        return (
          <article key={p.slug} className={styles.card}>
            <Link href={`/${p.slug}`} className={styles.imageLink}>
              <Image src={p.image} alt="" fill sizes="(max-width:700px) 100vw, 50vw" className={styles.cover} />
            </Link>
            <div className={styles.body}>
              <p className={styles.meta}>{meta}</p>
              <h2 className={styles.title}>
                <Link href={`/${p.slug}`}>{title}</Link>
              </h2>
              <p className={styles.excerpt}>{excerpt}</p>
              <Link href={`/${p.slug}`} className={styles.read}>
                {tc("readMoreArrow")}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
