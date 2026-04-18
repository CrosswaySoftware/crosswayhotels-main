"use client";

import { useLocale } from "next-intl";
import { addDays, format, startOfDay } from "date-fns";
import { arSA, enUS, fr } from "date-fns/locale";
import { useEffect, useId, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import calStyles from "./BookingDatePicker.module.scss";
import styles from "./BookingPanel.module.scss";

export type BookingPanelLabels = {
  title: string;
  selectHotel: string;
  selectHotelPlaceholder: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  adults: string;
  children: string;
  submit: string;
  placeholderDate: string;
  childNone: string;
  hotels: { value: string; label: string }[];
};

type SelectOption = { value: string; label: string };

const DEFAULT_HOTELS: SelectOption[] = [
  { value: "VXXX1116", label: "The Palomar by Crossway, Chennai" },
  { value: "ZGVR1115", label: "Crossway Days Hotel, OMR, Chennai" },
  { value: "VGZT0227", label: "Revostay Royel by Crossway, Chennai" },
  { value: "ZZGC0307", label: "Lifotel KK Inn Suites, Chennai" },
];

function CustomSelect({
  name,
  label,
  options,
  value,
  onChange,
  wide,
  placeholder,
}: {
  name: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
  /** Shown in the trigger when `value` does not match any option (e.g. empty = no hotel yet). */
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? placeholder ?? "";
  const showAsPlaceholder = !selected && Boolean(placeholder);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      className={`${styles.field} ${styles.fieldCustomSelect} ${wide ? styles.fieldWide : ""}`}
      ref={wrapRef}
    >
      <span id={`${listId}-label`}>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={`${styles.dropdownTrigger} ${wide ? styles.dropdownTriggerWide : styles.dropdownTriggerCompact}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${listId}-label`}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`${styles.dropdownValue} ${showAsPlaceholder ? styles.selectPlaceholder : ""}`}>
          {displayLabel}
        </span>
        <span className={styles.chevron} aria-hidden />
      </button>
      {open ? (
        <ul className={styles.dropdownList} id={listId} role="listbox" aria-labelledby={`${listId}-label`}>
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                className={`${styles.dropdownOption} ${o.value === value ? styles.dropdownOptionActive : ""}`}
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ThemedDatePicker({
  label,
  value,
  onChange,
  minDate,
  placeholder,
  dateLocale,
  dir,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  minDate: Date;
  placeholder: string;
  dateLocale: typeof enUS | typeof fr;
  dir: "ltr" | "rtl";
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const display = value ? format(value, "dd/MM/yyyy", { locale: dateLocale }) : null;

  return (
    <div className={`${styles.field} ${styles.fieldDate}`} ref={wrapRef}>
      <span>{label}</span>
      <button
        type="button"
        className={styles.dateTrigger}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={display ? undefined : styles.datePlaceholder}>{display ?? placeholder}</span>
        <span className={calStyles.calendarIcon} aria-hidden />
      </button>
      {open ? (
        <div className={calStyles.popover} dir={dir} role="dialog" aria-label={label}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            disabled={{ before: minDate }}
            locale={dateLocale}
            dir={dir}
            className={calStyles.themedPicker}
            defaultMonth={value ?? minDate}
          />
        </div>
      ) : null}
    </div>
  );
}

export function BookingPanel({ labels, prominent = false }: { labels: BookingPanelLabels; prominent?: boolean }) {
  const intlLocale = useLocale();
  const dir: "ltr" | "rtl" = intlLocale === "ar" ? "rtl" : "ltr";
  const dateLocale = intlLocale === "ar" ? arSA : intlLocale === "fr" ? fr : enUS;

  const today = startOfDay(new Date());
  const [checkIn, setCheckIn] = useState<Date | undefined>(() => today);
  const [checkOut, setCheckOut] = useState<Date | undefined>(() => addDays(today, 1));

  const hotels = labels.hotels?.length ? labels.hotels : DEFAULT_HOTELS;
  const [hotel, setHotel] = useState("");
  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const checkOutMin = checkIn ? addDays(startOfDay(checkIn), 1) : addDays(today, 1);

  useEffect(() => {
    if (!checkIn) return;
    setCheckOut((prev) => {
      const min = addDays(startOfDay(checkIn), 1);
      if (!prev || startOfDay(prev).getTime() <= startOfDay(checkIn).getTime()) {
        return min;
      }
      return prev;
    });
  }, [checkIn]);

  const roomOptions: SelectOption[] = [1, 2, 3, 4, 5].map((n) => ({
    value: String(n),
    label: String(n),
  }));
  const adultOptions: SelectOption[] = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  const childOptions: SelectOption[] = [
    { value: "0", label: labels.childNone },
    ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) })),
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!hotel || !checkIn || !checkOut) {
      e.preventDefault();
    }
  };

  return (
    <form
      className={`${styles.barRoot} ${prominent ? styles.barRootProminent : ""}`}
      action="https://bookings.resavenue.com/resBooking4/searchRooms"
      method="get"
      target="_blank"
      aria-label={labels.title}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="curr" value="INR" />
      <input type="hidden" name="arr_date" value={checkIn ? format(checkIn, "dd-MM-yyyy") : ""} />
      <input type="hidden" name="dep_date" value={checkOut ? format(checkOut, "dd-MM-yyyy") : ""} />

      <div className={styles.barInner}>
        <div className={styles.barFields}>
          <CustomSelect
            name="regCode"
            label={labels.selectHotel}
            options={hotels}
            value={hotel}
            onChange={setHotel}
            placeholder={labels.selectHotelPlaceholder}
            wide
          />

          <ThemedDatePicker
            label={labels.checkIn}
            value={checkIn}
            onChange={setCheckIn}
            minDate={today}
            placeholder={labels.placeholderDate}
            dateLocale={dateLocale}
            dir={dir}
          />
          <ThemedDatePicker
            label={labels.checkOut}
            value={checkOut}
            onChange={setCheckOut}
            minDate={checkOutMin}
            placeholder={labels.placeholderDate}
            dateLocale={dateLocale}
            dir={dir}
          />

          <CustomSelect name="roomNo" label={labels.rooms} options={roomOptions} value={rooms} onChange={setRooms} />
          <CustomSelect
            name="adult_1"
            label={labels.adults}
            options={adultOptions}
            value={adults}
            onChange={setAdults}
          />
          <CustomSelect
            name="child_1"
            label={labels.children}
            options={childOptions}
            value={children}
            onChange={setChildren}
          />

          <div className={styles.submitWrap}>
            <button type="submit" className={styles.submit} disabled={!hotel}>
              {labels.submit}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
