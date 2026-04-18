import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./BrandStoryPage.module.scss";

type Props = {
  breadcrumbLabel: string;
  heroImage: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  lightProse?: boolean;
  cta?: { href: string; label: string; external?: boolean };
};

export async function BrandStoryPage({
  breadcrumbLabel,
  heroImage,
  logoSrc,
  logoWidth,
  logoHeight,
  title,
  subtitle,
  paragraphs,
  lightProse,
  cta,
}: Props) {
  const tc = await getTranslations("Common");

  return (
    <div className={styles.innerPage}>
      <PageShell>
        <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: breadcrumbLabel }]} />
      </PageShell>
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${heroImage})` }}>
          <div className={styles.overlay} />
        </div>
        <div className={styles.heroContent}>
          <Image className={styles.logo} src={logoSrc} alt="" width={logoWidth} height={logoHeight} priority />
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <div className={`${styles.prose} ${lightProse ? styles.proseLight : ""}`}>
            {paragraphs.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          {cta ? (
            <p className={styles.ctaWrap}>
              {cta.external ? (
                <a className={styles.cta} href={cta.href} target="_blank" rel="noopener noreferrer">
                  {cta.label}
                </a>
              ) : (
                <Link className={styles.cta} href={cta.href}>
                  {cta.label}
                </Link>
              )}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
