import { TeamPage } from "@/components/pages/TeamPage/TeamPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("team") };
}

export default function Page() {
  return <TeamPage />;
}
