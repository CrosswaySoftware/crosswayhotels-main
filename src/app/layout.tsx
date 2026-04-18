import type { ReactNode } from "react";

/** Root pass-through; `<html>` / `<body>` live in `[locale]/layout` (supported with next-intl + Next 14). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
