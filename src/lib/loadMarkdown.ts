import fs from "fs";
import path from "path";

/**
 * Loads markdown from src/content. For non-default locales, tries
 * `basename.{locale}.ext` next to the default file, then falls back to the default.
 */
export function loadMarkdown(relativeToContent: string, locale = "en"): string {
  const contentRoot = path.join(process.cwd(), "src/content");
  const dir = path.dirname(relativeToContent);
  const ext = path.extname(relativeToContent);
  const base = path.basename(relativeToContent, ext);

  if (locale && locale !== "en") {
    const localized = path.join(contentRoot, dir, `${base}.${locale}${ext}`);
    if (fs.existsSync(localized)) {
      return fs.readFileSync(localized, "utf8");
    }
  }

  const defaultPath = path.join(contentRoot, relativeToContent);
  return fs.readFileSync(defaultPath, "utf8");
}
