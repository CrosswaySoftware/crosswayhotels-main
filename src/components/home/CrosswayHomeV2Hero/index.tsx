"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { home } from "@/lib/media";
import styles from "./CrosswayHomeV2Hero.module.scss";

const SLIDE_SRC = [...home.heroSlides];

/** Match Palomar V2 hero dwell time */
const AUTOPLAY_MS = 15000;

type SlideMeta = { area: string; caption: string };

export function CrosswayHomeV2Hero({ bookingSlot }: { bookingSlot: ReactNode }) {
  const t = useTranslations("Home.heroV2");
  const slidesMeta = t.raw("slides") as SlideMeta[];
  const locale = useLocale();
  const dir = (locale === "ar" ? "rtl" : "ltr") as "rtl" | "ltr";
  const reduceMotion = useReducedMotion();

  const options = useMemo(
    () => ({
      loop: true,
      align: "start" as const,
      axis: "x" as const,
      direction: dir,
      duration: reduceMotion ? 0 : 32,
    }),
    [dir, reduceMotion],
  );

  const plugins = useMemo(() => {
    if (reduceMotion) return [];
    return [
      Autoplay({
        delay: AUTOPLAY_MS,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
        stopOnLastSnap: false,
      }),
    ];
  }, [reduceMotion]);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const meta = slidesMeta[selected] ?? slidesMeta[0];

  return (
    <section className={styles.wrap} id="hero" aria-label={t("ariaLabel")}>
      <div className={styles.stage}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {(reduceMotion ? [SLIDE_SRC[0]] : SLIDE_SRC).map((src, index) => (
              <div key={`hero-slide-${src}`} className={styles.emblaSlide}>
                <Image
                  src={src}
                  alt=""
                  fill
                  className={styles.slideImage}
                  sizes="100vw"
                  quality={88}
                  priority={index < 4}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.veil} aria-hidden />
      </div>

      <div className={styles.grid}>
        <div className={styles.heroBody}>
          <p className={styles.kicker}>{t("kicker")}</p>
          <h1 className={styles.titleBlock}>
            <span className={styles.row}>{t("line1")}</span>
            <span className={styles.row}>{t("line2")}</span>
          </h1>
        </div>

        <div className={styles.foot}>
          <div className={styles.footCaption}>
            <div className={styles.capArea}>{meta?.area}</div>
            <div className={styles.capText}>{meta?.caption}</div>
          </div>
          {!reduceMotion && SLIDE_SRC.length > 1 ? (
            <div className={styles.dotsOuter}>
              <div className={styles.dots}>
                {SLIDE_SRC.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.dot} ${i === selected ? styles.dotOn : ""}`}
                    aria-label={t("dotAria", { n: i + 1, total: SLIDE_SRC.length })}
                    aria-current={i === selected ? "true" : undefined}
                    onClick={() => scrollTo(i)}
                  >
                    <span className={styles.dotNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.dotBar}>
                      <span className={styles.dotBarFill} key={`${selected}-${i}`} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.bookSlot}>{bookingSlot}</div>
    </section>
  );
}
