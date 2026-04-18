/**
 * Navbar visual preset — change this one value and save.
 *
 * - `compact` — tighter type & spacing (current default)
 * - `classic` — roomier bar (revert to the pre–compact-tighten look)
 * - `split` — flat dark bar, gold underline nav, stronger bottom rule
 *
 * Say **revert** / use **classic** in chat → set to `"classic"`.
 */
export type SiteHeaderVariant = "compact" | "classic" | "split";

export const SITE_HEADER_VARIANT: SiteHeaderVariant = "compact";
