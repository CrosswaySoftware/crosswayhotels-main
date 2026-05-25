import { ContactPage } from "@/components/pages/ContactPage/ContactPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

/** Avoid long-lived CDN cache mixing RSC flight data with HTML for this route. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("contactUs") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPage />;
}
