/** Maps post slug to BlogPosts message key segment (hyphens → underscores). */
export function blogPostMessageKey(slug: string): string {
  return slug.replace(/-/g, "_");
}
