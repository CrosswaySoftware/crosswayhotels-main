import { getTranslations } from "next-intl/server";
import { StaticFormNote } from "@/components/forms/StaticFormNote/StaticFormNote";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import formStyles from "@/components/forms/StaticFormNote/StaticFormNote.module.scss";

export async function FeedbackPage() {
  const t = await getTranslations("Feedback");
  const tf = await getTranslations("Forms");
  const tc = await getTranslations("Common");

  return (
    <PageShell>
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: t("title") }]} />
      <SectionTitle align="center">{t("title")}</SectionTitle>
      <StaticFormNote />
      <form className={formStyles.form} aria-label={t("formAria")}>
        <label>
          {tf("fieldName")}
          <input type="text" name="your-name" disabled />
        </label>
        <label>
          {tf("fieldEmail")}
          <input type="email" name="your-email" disabled />
        </label>
        <label>
          {tf("fieldSubject")}
          <input type="text" name="subject" disabled />
        </label>
        <label>
          {tf("fieldComment")}
          <textarea name="comment" disabled />
        </label>
        <button type="submit" disabled>
          {tf("submit")}
        </button>
      </form>
    </PageShell>
  );
}
