import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ExperienceInsightPage } from "@/components/pages/ExperienceInsightPage/ExperienceInsightPage";
import {
  STAY_CATEGORIES,
  type StayCategoryId,
  getAllInsightStaticParams,
  getInsight,
  insightTranslationId,
} from "@/lib/perfectStayInsights";

type Props = { params: { locale: string; category: string; slug: string } };

export function generateStaticParams() {
  return getAllInsightStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { locale, category, slug } = params;
  if (!STAY_CATEGORIES.includes(category as StayCategoryId) || !getInsight(category as StayCategoryId, slug)) {
    return { title: "Experience" };
  }
  const ti = await getTranslations({ locale, namespace: "PerfectStayInsights" });
  const tid = insightTranslationId(category as StayCategoryId, slug);
  return { title: `${ti(`${tid}_title`)} · Crossway` };
}

export default async function Page({ params }: Props) {
  const { category, slug } = params;
  if (!STAY_CATEGORIES.includes(category as StayCategoryId)) notFound();
  const insight = getInsight(category as StayCategoryId, slug);
  if (!insight) notFound();

  return (
    <ExperienceInsightPage category={category as StayCategoryId} slug={slug} image={insight.image} />
  );
}
