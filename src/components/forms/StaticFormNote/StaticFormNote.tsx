import { getTranslations } from "next-intl/server";
import styles from "./StaticFormNote.module.scss";

export async function StaticFormNote({ email = "contact@crosswayhotels.com" }: { email?: string }) {
  const t = await getTranslations("Forms");
  return (
    <p className={styles.note}>
      {t.rich("staticSiteNote", {
        mail: () => (
          <a key="mail" href={`mailto:${email}`}>
            {email}
          </a>
        ),
      })}
    </p>
  );
}
