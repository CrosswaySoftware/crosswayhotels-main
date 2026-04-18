import { Link } from "@/i18n/navigation";
import styles from "./Breadcrumbs.module.scss";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className={styles.wrap} aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={c.label + String(i)}>
          {i > 0 && <span className={styles.sep}>»</span>}
          {c.href ? (
            <Link href={c.href}>{c.label}</Link>
          ) : (
            <span className={styles.current} aria-current="page">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
