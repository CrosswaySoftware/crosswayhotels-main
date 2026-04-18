import { getTranslations } from "next-intl/server";
import { PostGrid } from "@/components/blog/PostGrid/PostGrid";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import type { BlogPost } from "@/lib/posts";

type Crumb = { label: string; href?: string };

export async function ArchivePage({
  title,
  crumbs,
  posts,
}: {
  title: string;
  crumbs: Crumb[];
  posts: BlogPost[];
}) {
  const tc = await getTranslations("Common");

  return (
    <PageShell variant="wide">
      <Breadcrumbs items={crumbs} />
      <h1>{title}</h1>
      {posts.length === 0 ? <p>{tc("noPostsInArchive")}</p> : <PostGrid posts={posts} />}
    </PageShell>
  );
}
