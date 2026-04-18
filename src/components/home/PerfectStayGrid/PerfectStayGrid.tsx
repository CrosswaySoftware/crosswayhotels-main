import { SectionTitle } from "@/components/ui/SectionTitle/SectionTitle";
import { getTranslations } from "next-intl/server";
import { PerfectStayGridClient } from "./PerfectStayGridClient";
import styles from "./PerfectStayGrid.module.scss";

export async function PerfectStayGrid() {
  const t = await getTranslations("Home");

  return (
    <section className={styles.section} id="services">
      <div className={styles.head}>
        <SectionTitle align="center" eyebrow={t("perfectEyebrow")}>
          {t("perfectTitle")}
        </SectionTitle>
      </div>
      <PerfectStayGridClient />
    </section>
  );
}
