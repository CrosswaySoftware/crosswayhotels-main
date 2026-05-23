"use client";

import { sendContactEmail } from "@/lib/sendEmail";
import { SITE_BRAND_NAME } from "@/lib/siteBrand";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "../StaticFormNote/StaticFormNote.module.scss";

export function CrosswayContactForm() {
  const t = useTranslations("Contact");
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
    const subject = String(fd.get("your-subject") ?? "").trim();
    const message = String(fd.get("your-message") ?? "").trim();

    setPending(true);
    setStatus("idle");
    try {
      const ok = await sendContactEmail({
        brandName: SITE_BRAND_NAME,
        name,
        email,
        message,
        subject,
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
      <form className={styles.form} aria-label={t("formAria")} onSubmit={onSubmit}>
        <label>
          {t("formName")}
          <input type="text" name="your-name" required autoComplete="name" />
        </label>
        <label>
          {t("formEmail")}
          <input type="email" name="your-email" required autoComplete="email" />
        </label>
        <label>
          {t("formSubject")}
          <input type="text" name="your-subject" required />
        </label>
        <label>
          {t("formMessage")}
          <textarea name="your-message" />
        </label>
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className={styles.honeypot} />
        <button type="submit" disabled={pending}>
          {pending ? tf("sending") : t("formSubmit")}
        </button>
      </form>
    </>
  );
}
