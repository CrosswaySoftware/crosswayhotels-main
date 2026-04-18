import { ContactPage } from "@/components/pages/ContactPage/ContactPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("contactUs") };
}

export default async function Page() {
  return <ContactPage />;
}
