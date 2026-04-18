import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell/PageShell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { pages } from "@/lib/media";
import styles from "./TeamPage.module.scss";

const PRAKASH_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/prakash.chandran.716/" },
  { label: "Instagram", href: "https://www.instagram.com/cyprakash/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yangya-prakash-chandran-325ab321/" },
] as const;

export async function TeamPage() {
  const t = await getTranslations("Team");
  const tc = await getTranslations("Common");
  const tm = await getTranslations("Metadata");

  const members = [
    {
      key: "prakash" as const,
      image: pages.team.prakash,
      bioKeys: ["prakash_bio_0", "prakash_bio_1", "prakash_bio_2", "prakash_bio_3"] as const,
      links: [...PRAKASH_LINKS],
    },
    {
      key: "sulekha" as const,
      image: pages.team.sulekha,
      bioKeys: ["sulekha_bio_0", "sulekha_bio_1", "sulekha_bio_2"] as const,
      links: [] as { label: string; href: string }[],
    },
  ];

  return (
    <PageShell>
      <Breadcrumbs items={[{ label: tc("breadcrumbHome"), href: "/" }, { label: tm("team") }]} />
      <header className={styles.head}>
        <h1>{t("pageTitle")}</h1>
      </header>
      <div className={styles.grid}>
        {members.map((m) => {
          const name = t(`${m.key}_name`);
          const role = t(`${m.key}_role`);
          return (
            <article key={m.key} className={styles.card}>
              <div className={styles.photo}>
                <Image src={m.image} alt="" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
              <div className={styles.body}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.role}>{role}</p>
                <details className={styles.bio}>
                  <summary>{t("readBio")}</summary>
                  {m.bioKeys.map((bk) => (
                    <p key={bk}>{t(bk)}</p>
                  ))}
                </details>
                {m.links.length > 0 ? (
                  <div className={styles.social}>
                    {m.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
