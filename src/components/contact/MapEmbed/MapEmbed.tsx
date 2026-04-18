import styles from "./MapEmbed.module.scss";

export function MapEmbed({
  title,
  src,
  mapsUrl,
  linkLabel,
}: {
  title: string;
  src: string;
  mapsUrl?: string;
  linkLabel?: string;
}) {
  return (
    <div className={styles.root}>
      <div className={styles.viewport}>
        <iframe
          className={styles.frame}
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      {mapsUrl && linkLabel ? (
        <a className={styles.mapsLink} href={mapsUrl} target="_blank" rel="noopener noreferrer">
          {linkLabel}
        </a>
      ) : null}
    </div>
  );
}
