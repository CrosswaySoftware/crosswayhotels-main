import { NewsUpdatesPage } from "@/components/pages/NewsUpdatesPage/NewsUpdatesPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("newsAndUpdates") };
}

export default function Page() {
  return <NewsUpdatesPage />;
}
