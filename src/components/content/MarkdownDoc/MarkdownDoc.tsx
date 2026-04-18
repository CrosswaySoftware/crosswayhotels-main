import ReactMarkdown from "react-markdown";
import styles from "./MarkdownDoc.module.scss";

export function MarkdownDoc({ source }: { source: string }) {
  return (
    <div className={styles.root}>
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}
