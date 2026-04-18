"use client";

import { motion } from "framer-motion";
import { home } from "@/lib/media";
import styles from "./HomeHero.module.scss";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  kicker: string;
  title: string;
  lead: string;
};

export function HomeHeroClient({ kicker, title, lead }: Props) {
  return (
    <section className={styles.section} aria-label="Welcome">
      <div className={styles.bgWrap}>
        <div className={styles.bg} style={{ backgroundImage: `url(${home.heroBg})` }} />
        <div className={styles.vignette} />
        <div className={styles.grain} aria-hidden />
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {kicker}
          </motion.p>
          <motion.h1
            className={styles.title}
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
            transition={{ duration: 1.1, delay: 0.45, ease }}
          />
        </div>
      </div>
    </section>
  );
}
