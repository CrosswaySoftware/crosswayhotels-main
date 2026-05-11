import { getTranslations } from "next-intl/server";
// import { StaticFormNote } from "@/components/forms/StaticFormNote/StaticFormNote";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import formStyles from "@/components/forms/StaticFormNote/StaticFormNote.module.scss";

const POSITION_KEYS = [
  "position_0",
  "position_1",
  "position_2",
  "position_3",
  "position_4",
  "position_5",
  "position_6",
  "position_7",
  "position_8",
  "position_9",
] as const;

export async function CareersPage() {
  const t = await getTranslations("Careers");
  const tf = await getTranslations("Forms");
  const tc = await getTranslations("Common");

  return (
    <PageShell>
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: t("title") }]} />
      <SectionTitle align="center">{t("title")}</SectionTitle>
      {/* <StaticFormNote email="contact@crosswayhotels.com" /> */}
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
          {tf("fieldAddress")}
          <input type="text" name="address" disabled />
        </label>
        <label>
          {tf("fieldPosition")}
          <select name="position" disabled>
            {POSITION_KEYS.map((key) => {
              const label = t(key);
              return (
                <option key={key} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          {tf("fieldMobile")}
          <input type="tel" name="tel" disabled />
        </label>
        <label>
          {tf("fieldResume")}
          <input type="file" name="resume" disabled />
        </label>
        <button type="submit" disabled>
          {tf("submit")}
        </button>
      </form>
    </PageShell>
  );
}
