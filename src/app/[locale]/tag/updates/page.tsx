import { ArchivePage } from "@/components/pages/ArchivePage/ArchivePage";
import { postsByTag } from "@/lib/posts";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("tagUpdates") };
}

export default async function Page() {
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");
  const tn = await getTranslations("News");
  return (
    <ArchivePage
      title={tm("tagUpdates")}
      crumbs={[
        { label: tc("breadcrumbHome"), href: "/" },
        { label: tn("breadcrumb"), href: "/news-and-updates" },
        { label: tm("tagUpdates") },
      ]}
      posts={postsByTag("updates")}
    />
  );
}
