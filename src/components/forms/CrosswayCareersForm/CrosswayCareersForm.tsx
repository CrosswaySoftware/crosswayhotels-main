"use client";

import { sendCareersEmail } from "@/lib/sendEmail";
import { SITE_BRAND_NAME } from "@/lib/siteBrand";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "../StaticFormNote/StaticFormNote.module.scss";

const POSITION_KEYS = [
  "position_0",
  "position_1",
  "position_2",
  "position_3",
  "position_4",
  "position_5",
  "position_6",
  "position_7",
  "position_8",
  "position_9",
] as const;

export function CrosswayCareersForm() {
  const t = useTranslations("Careers");
  const tf = useTranslations("Forms");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const botcheck = String(fd.get("botcheck") ?? "");
    if (botcheck) return;

    const name = String(fd.get("your-name") ?? "").trim();
    const email = String(fd.get("your-email") ?? "").trim();
    const position = String(fd.get("position") ?? "").trim();
    if (!name || !email || !position) return;

    const resume = fd.get("resume");
    const resumeFile = resume instanceof File && resume.size > 0 ? resume : null;

    setPending(true);
    setStatus("idle");
    try {
      const ok = await sendCareersEmail({
        brandName: SITE_BRAND_NAME,
        name,
        email,
        address: String(fd.get("address") ?? "").trim(),
        position,
        mobile: String(fd.get("tel") ?? "").trim(),
        resume: resumeFile,
      });
      setStatus(ok ? "ok" : "err");
      if (ok) form.reset();
    } catch {
      setStatus("err");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {status === "ok" ? <p className={styles.note}>{tf("success")}</p> : null}
      {status === "err" ? <p className={styles.note}>{tf("error")}</p> : null}
      <form className={styles.form} aria-label={t("formAria")} onSubmit={onSubmit} encType="multipart/form-data">
        <label>
          {tf("fieldName")}
          <input type="text" name="your-name" required autoComplete="name" />
        </label>
        <label>
          {tf("fieldEmail")}
          <input type="email" name="your-email" required autoComplete="email" />
        </label>
        <label>
          {tf("fieldAddress")}
          <input type="text" name="address" />
        </label>
        <label>
          {tf("fieldPosition")}
          <select name="position" required defaultValue="">
            <option value="" disabled>
              —
            </option>
            {POSITION_KEYS.map((key) => {
              const label = t(key);
              return (
                <option key={key} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          {tf("fieldMobile")}
          <input type="tel" name="tel" autoComplete="tel" />
        </label>
        <label>
          {tf("fieldResume")}
          <input type="file" name="resume" accept=".pdf,application/pdf" />
        </label>
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className={styles.honeypot} />
        <button type="submit" disabled={pending}>
          {pending ? tf("sending") : tf("submit")}
        </button>
      </form>
    </>
  );
}
