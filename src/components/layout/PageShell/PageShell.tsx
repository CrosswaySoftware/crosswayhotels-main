import type { ReactNode } from "react";
import styles from "./PageShell.module.scss";

export function PageShell({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "narrow" | "wide";
}) {
  const cls =
    variant === "narrow"
      ? `${styles.wrap} ${styles.narrow}`
      : variant === "wide"
        ? `${styles.wrap} ${styles.wide}`
        : styles.wrap;

  return <div className={cls}>{children}</div>;
}
