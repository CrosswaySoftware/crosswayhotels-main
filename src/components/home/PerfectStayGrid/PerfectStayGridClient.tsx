"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { home } from "@/lib/media";
import {
  type StayCategoryId,
  PERFECT_STAY_INSIGHTS,
  insightTranslationId,
} from "@/lib/perfectStayInsights";
import { PROPERTY_ORDER, VARIANT_IMAGES } from "@/lib/servicePortfolio";
import modalStyles from "./PerfectStayInsightsModal.module.scss";
import styles from "./PerfectStayGrid.module.scss";

/** Display order: Accommodations, Dining, Banquets, Wellness (maps to insight categories). */
const CARDS: { rowKey: string; category: StayCategoryId; image: string }[] = [
  { rowKey: "stay_accommodations", category: "accommodations", image: home.perfectStay.family },
  { rowKey: "stay_food", category: "food", image: home.perfectStay.food },
  { rowKey: "stay_business", category: "business", image: home.perfectStay.business },
  { rowKey: "stay_wellness", category: "wellness", image: home.perfectStay.wellness },
];

export function PerfectStayGridClient() {
  const t = useTranslations("Home");
  const ti = useTranslations("PerfectStayInsights");
  const ts = useTranslations("ServiceExperience");
  const [open, setOpen] = useState<StayCategoryId | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tmr = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(tmr);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <div className={styles.track}>
        <div className={styles.scroller}>
          {CARDS.map(({ rowKey, category, image }, i) => (
            <Reveal key={rowKey} delay={i * 0.06} className={styles.cardWrap}>
              <button
                type="button"
                className={styles.cardButton}
                aria-haspopup="dialog"
                aria-expanded={open === category}
                aria-controls={open === category ? titleId : undefined}
                onClick={() => setOpen(category)}
              >
                <span className={styles.cardButtonVisual} style={{ backgroundImage: `url(${image})` }}>
                  <span className={styles.shade} />
                  <span className={styles.meta}>
                    <span className={styles.index} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.cardTitle}>{t(`${rowKey}_title`)}</span>
                    <span style={{ marginLeft: '8px' }} className={styles.desc} >{t(`${rowKey}_desc`)}</span>
                  </span>
                </span>
                <span className={styles.visuallyHidden}>
                  {ti("openPicker", { category: t(`${rowKey}_title`) })}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="stay-modal"
            className={modalStyles.backdrop}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className={modalStyles.panel}
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className={modalStyles.panelGlow} aria-hidden />
              <div className={modalStyles.panelGrain} aria-hidden />
              <header className={modalStyles.header}>
                <div className={modalStyles.headerText}>
                  <p className={modalStyles.eyebrow}>{ti("modalEyebrow")}</p>
                  <h2 id={titleId} className={modalStyles.modalTitle}>
                    {t(`stay_${open}_title`)}
                  </h2>
                  <p id={descId} className={modalStyles.modalLead}>
                    {open === "accommodations" ? ti("accommodationsModalLead") : ti("modalLead")}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className={modalStyles.close}
                  aria-label={ti("close")}
                  onClick={close}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </header>
              <div className={modalStyles.body}>
                {open === "accommodations" ? (
                  <>
                    <p className={modalStyles.rowLabel}>{ti("accommodationsPropertiesLabel")}</p>
                    <div className={modalStyles.scroller}>
                      {PROPERTY_ORDER.map((propertyId, idx) => {
                        const previewSrc = VARIANT_IMAGES.accommodations[propertyId][0];
                        const name = ts(`accommodations.props.${propertyId}.name`);
                        const location = ts(`accommodations.props.${propertyId}.location`);
                        return (
                          <motion.div
                            key={propertyId}
                            className={modalStyles.insightSlide}
                            initial={{ opacity: 0, x: 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.08 + idx * 0.06,
                              duration: 0.45,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Link
                              href={`/accommodations#property-${propertyId}`}
                              className={modalStyles.insightLink}
                              onClick={close}
                            >
                              <div className={modalStyles.insightCard}>
                                <div className={modalStyles.insightImage}>
                                  <Image
                                    src={previewSrc}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 72vw, 248px"
                                    className={modalStyles.insightImg}
                                  />
                                </div>
                                <div className={modalStyles.insightShade} aria-hidden />
                                <span className={modalStyles.insightIndex} aria-hidden>
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <div className={modalStyles.insightMeta}>
                                  <h3 className={modalStyles.insightTitle}>{name}</h3>
                                  <p className={modalStyles.insightTagline}>{location}</p>
                                  <span className={modalStyles.insightCta}>
                                    {ti("accommodationsCardCta")}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                      <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <p className={modalStyles.rowLabel}>{ti("insightsRowLabel")}</p>
                    <div className={modalStyles.scroller}>
                      {PERFECT_STAY_INSIGHTS[open].map((item, idx) => {
                        const tid = insightTranslationId(open, item.slug);
                        const title = ti(`${tid}_title`);
                        return (
                          <motion.div
                            key={item.slug}
                            className={modalStyles.insightSlide}
                            initial={{ opacity: 0, x: 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.08 + idx * 0.06,
                              duration: 0.45,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Link
                              href={`/experiences/${open}/${item.slug}`}
                              className={modalStyles.insightLink}
                              onClick={close}
                            >
                              <div className={modalStyles.insightCard}>
                                <div className={modalStyles.insightImage}>
                                  <Image
                                    src={item.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 72vw, 248px"
                                    className={modalStyles.insightImg}
                                  />
                                </div>
                                <div className={modalStyles.insightShade} aria-hidden />
                                <span className={modalStyles.insightIndex} aria-hidden>
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <div className={modalStyles.insightMeta}>
                                  <h3 className={modalStyles.insightTitle}>{title}</h3>
                                  <p className={modalStyles.insightTagline}>{ti(`${tid}_tagline`)}</p>
                                  <span className={modalStyles.insightCta}>
                                    {ti("explore")}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                                      <path
                                        d="M5 12h14M13 6l6 6-6 6"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
