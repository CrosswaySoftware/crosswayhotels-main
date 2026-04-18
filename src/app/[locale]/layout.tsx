import type { Metadata } from "next";
import { Noto_Sans_Arabic, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell/SiteShell";
import { routing } from "@/i18n/routing";
import "@/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
    en: "Best value hotels — comfortable stays, great locations, warm service.",
    ar: "فنادق بقيمة متميزة — إقامات مريحة، مواقع ممتازة، وخدمة دافئة.",
    fr: "Hôtels au meilleur rapport qualité-prix — séjours confortables, emplacements idéaux, accueil chaleureux.",
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
    <html lang={locale} dir={dir} className={`${poppins.variable} ${arabic.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
