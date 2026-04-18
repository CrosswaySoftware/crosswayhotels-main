import { FeedbackPage } from "@/components/pages/FeedbackPage/FeedbackPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("feedback") };
}

export default function Page() {
  return <FeedbackPage />;
}
