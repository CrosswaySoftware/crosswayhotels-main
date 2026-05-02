"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";

/**
 * At tablet widths and up, BOOK jumps to the hero banner (`#hero`).
 * Below tablet (phones), the booking block sits under the hero — link targets `#book`.
 * For wide layouts where the bar is docked on the hero (see `HeroWithBooking`),
 * `#hero` still shows the full banner with the form at the bottom edge.
 */
export const BOOK_NAV_HERO_MIN_WIDTH_PX = 768;

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(`(min-width: ${BOOK_NAV_HERO_MIN_WIDTH_PX}px)`);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(`(min-width: ${BOOK_NAV_HERO_MIN_WIDTH_PX}px)`).matches ? "/#hero" : "/#book";
}

export function BookNavLink({ className, children }: { className?: string; children: React.ReactNode }) {
  /* Server / first paint: phones → booking hash; client reconciles at ≥768px */
  const href = useSyncExternalStore(subscribe, getSnapshot, () => "/#book");
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
