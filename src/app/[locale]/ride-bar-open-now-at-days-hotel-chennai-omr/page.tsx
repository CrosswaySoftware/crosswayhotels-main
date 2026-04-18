import { ArticleView } from "@/components/blog/ArticleView/ArticleView";
import { blogPostMessageKey } from "@/lib/blogPostMessageKey";
import { getTranslations } from "next-intl/server";

const SLUG = "ride-bar-open-now-at-days-hotel-chennai-omr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPosts" });
  return { title: t(`${blogPostMessageKey(SLUG)}.title`) };
}

export default function Page() {
  return <ArticleView slug={SLUG} />;
}
