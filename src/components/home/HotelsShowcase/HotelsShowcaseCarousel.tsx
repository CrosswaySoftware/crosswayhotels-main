"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { hotelMicrositeUrl } from "@/config/hotelSiteUrls";
import type { HotelShowcaseSlide } from "./hotelsShowcaseSlides";
import styles from "./HotelsShowcase.module.scss";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

export function HotelsShowcaseCarousel({
  slides,
}: {
  slides: readonly HotelShowcaseSlide[];
}) {
  const t = useTranslations("Home");
  const tn = useTranslations("Nav");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const options = useMemo(
    () => ({
      loop: true,
      align: "start" as const,
      direction: (locale === "ar" ? "rtl" : "ltr") as "rtl" | "ltr",
      duration: reduceMotion ? 0 : 26,
      dragFree: false,
      skipSnaps: false,
    }),
    [locale, reduceMotion],
  );

  const plugins = useMemo(
    () => [
      Autoplay({
        delay: reduceMotion ? 8000 : 4500,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
        stopOnLastSnap: false,
      }),
    ],
    [reduceMotion],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const navDisabled = slides.length <= 1;

  return (
    <div
      className={styles.carouselRoot}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("hotelsShowcaseEyebrow")}
    >
      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
        onClick={scrollPrev}
        disabled={navDisabled}
        aria-label={t("hotelCarouselPrev")}
      >
        <span className={styles.carouselArrowIcon} aria-hidden>
          ‹
        </span>
      </button>
      <button
        type="button"
        className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
        onClick={scrollNext}
        disabled={navDisabled}
        aria-label={t("hotelCarouselNext")}
      >
        <span className={styles.carouselArrowIcon} aria-hidden>
          ›
        </span>
      </button>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((hotel, i) => (
            <div key={hotel.id} className={styles.emblaSlide}>
              <article className={styles.card}>
                <a
                  href={hotelMicrositeUrl(hotel.origin, locale)}
                  className={styles.cardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.visual}>
                    <Image
                      src={hotel.image}
                      alt=""
                      fill
                      className={styles.img}
                      sizes="(max-width: 639px) 92vw, (max-width: 899px) 56vw, (max-width: 1319px) 38vw, 30vw"
                    />
                    <div className={styles.visualShade} aria-hidden />
                    <span className={styles.watermark} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.meta}>
                    <h3 className={`${styles.hotelName} ${display.className}`}>
                      {tn(hotel.nameKey)}
                    </h3>
                    <p className={styles.essence}>{t(hotel.essenceKey)}</p>
                    <span className={styles.cta}>
                      {t("hotelShowcaseCta")}
                      <span className={styles.ctaArrow} aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
