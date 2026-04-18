import type { ReactNode } from "react";
import styles from "./SectionTitle.module.scss";

export function SectionTitle({
  children,
  eyebrow,
  align = "left",
  variant = "default",
  id,
}: {
  children: ReactNode;
  eyebrow?: ReactNode;
  align?: "left" | "center";
  variant?: "default" | "onDark";
  id?: string;
}) {
  const root =
    align === "center"
      ? `${styles.center} ${variant === "onDark" ? styles.onDark : ""}`
      : `${styles.left} ${variant === "onDark" ? styles.onDark : ""}`;

  return (
    <div className={root}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      <div className={styles.rule} aria-hidden />
    </div>
  );
}
