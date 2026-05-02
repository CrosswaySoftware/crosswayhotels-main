"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { home } from "@/lib/media";
import styles from "./HomeHero.module.scss";

const ease = [0.16, 1, 0.3, 1] as const;

const SLIDES = [...home.heroSlides];

type Props = {
  kicker?: string;
  title: string;
  lead: string;
  ctaExplore: string;
  ctaBook: string;
  titleFontClassName: string;
};

export function HomeHeroClient({ kicker = "", title, lead, ctaExplore, ctaBook, titleFontClassName }: Props) {
  const locale = useLocale();
  const dir = (locale === "ar" ? "rtl" : "ltr") as "rtl" | "ltr";
  const reduceMotionPref = useReducedMotion();
  const staticHero = reduceMotionPref === true;

  const options = useMemo(
    () => ({
      loop: true,
      align: "start" as const,
      axis: "x" as const,
      direction: dir,
      duration: staticHero ? 0 : 32,
      skipSnaps: false,
    }),
    [dir, staticHero],
  );

  const plugins = useMemo(() => {
    if (staticHero) return [];
    return [
      Autoplay({
        delay: 5500,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
        stopOnLastSnap: false,
      }),
    ];
  }, [staticHero]);

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

  return (
    <section id="hero" className={styles.section} aria-label="Welcome">
      <div className={styles.bgWrap}>
        {staticHero ? (
          <div className={styles.slideBg} style={{ backgroundImage: `url(${SLIDES[0]})` }} />
        ) : (
          <div className={styles.emblaViewport} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {SLIDES.map((src, index) => (
                <div key={`${src}-${index}`} className={styles.emblaSlide}>
                  <div className={styles.slideBg} style={{ backgroundImage: `url(${src})` }} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.vignette} />
        <div className={styles.grain} aria-hidden />
      </div>

      {!staticHero && SLIDES.length > 1 ? (
        <nav className={styles.slideDots} aria-label="Hero images">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
              aria-current={selected === i ? "true" : undefined}
              className={`${styles.slideDot} ${selected === i ? styles.slideDotActive : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </nav>
      ) : null}

      <div className={styles.inner}>
        <div className={styles.copy}>
          {kicker.trim() ? (
            <motion.p
              className={styles.kicker}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              {kicker}
            </motion.p>
          ) : null}
          <motion.h1
            className={`${styles.title} ${titleFontClassName}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08, ease }}
          >
            {title}
          </motion.h1>
          <motion.p
            className={styles.lead}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
          >
            {lead}
          </motion.p>
          <motion.div
            className={styles.rule}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.32, ease }}
          />
          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease }}
          >
            <Link className={styles.ctaPrimary} href="#our-hotels">
              {ctaExplore}
            </Link>
            <Link className={styles.ctaGhost} href="#book">
              {ctaBook}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
