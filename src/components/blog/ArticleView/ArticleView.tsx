import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MarkdownDoc } from "@/components/content/MarkdownDoc/MarkdownDoc";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { blogPostMessageKey } from "@/lib/blogPostMessageKey";
import { loadMarkdown } from "@/lib/loadMarkdown";
import { blogPosts } from "@/lib/posts";
import styles from "./ArticleView.module.scss";

export async function ArticleView({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const locale = await getLocale();
  const tb = await getTranslations("BlogPosts");
  const tn = await getTranslations("News");
  const tc = await getTranslations("Common");
  const key = blogPostMessageKey(slug);

  let md = tc("contentMissing");
  try {
    md = loadMarkdown(`articles/${slug}.md`, locale);
  } catch {
    /* use fallback */
  }

  const title = tb(`${key}.title`);
  const dateRaw = tb(`${key}.date`);

  return (
    <PageShell>
      <Breadcrumbs
        items={[
          { label: tc("breadcrumbHome"), href: "/" },
          { label: tn("breadcrumb"), href: "/news-and-updates" },
          { label: title },
        ]}
      />
      <article className={styles.article}>
        <Image
          src={post.image}
          alt=""
          width={920}
          height={560}
          className={styles.heroImg}
          sizes="(max-width: 900px) 100vw, 920px"
        />
        <h1 className={styles.title}>{title}</h1>
        {dateRaw ? <p className={styles.meta}>{dateRaw}</p> : null}
        <MarkdownDoc source={md} />
      </article>
    </PageShell>
  );
}
