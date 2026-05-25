/** Full path for a hard navigation to Contact (avoids client RSC router issues). */
export function contactUsPath(locale: string) {
  return `/${locale}/contact-us`;
}

export function isContactUsPath(pathname: string) {
  return pathname === "/contact-us" || pathname.endsWith("/contact-us");
}
