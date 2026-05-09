import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell/SiteShell";
import { routing } from "@/i18n/routing";
import "@/styles/globals.scss";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Crossway Hotels and Resorts",
    ar: "كروسواي للفنادق والمنتجعات",
    fr: "Crossway Hôtels et Villégiatures",
  };
  const descriptions: Record<string, string> = {
    en: "Thoughtfully designed stays for modern travellers seeking comfort, clarity, and prime locations—from business hubs to coastal escapes.",
    ar: "إقامات مدروسة للمسافرين المعاصرين الذين يبحثون عن الراحة والوضوح ومواقع مميزة—من مراكز الأعمال إلى الاستجمام الساحلي.",
    fr: "Des séjours pensés pour les voyageurs modernes qui recherchent confort, clarté et emplacements privilégiés—des pôles d’affaires aux escapades côtières.",
  };
  return {
    title: {
      default: titles[locale] ?? titles.en,
      template: `%s | ${titles[locale] ?? titles.en}`,
    },
    description: descriptions[locale] ?? descriptions.en,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${dmSans.variable} ${arabic.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
