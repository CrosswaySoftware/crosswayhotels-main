import { getLocale } from "next-intl/server";
import { MarkdownDoc } from "@/components/content/MarkdownDoc/MarkdownDoc";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { loadMarkdown } from "@/lib/loadMarkdown";
import styles from "./LegalDocumentPage.module.scss";

export async function LegalDocumentPage({
  title,
  breadcrumb,
  homeLabel,
  file,
}: {
  title: string;
  breadcrumb: string;
  homeLabel: string;
  file: string;
}) {
  const locale = await getLocale();
  const md = loadMarkdown(file, locale);
  return (
    <PageShell>
      <Breadcrumbs items={[{ label: homeLabel, href: "/" }, { label: breadcrumb }]} />
      <header className={styles.header}>
        <SectionTitle align="center">{title}</SectionTitle>
      </header>
      <MarkdownDoc source={md} />
    </PageShell>
  );
}
