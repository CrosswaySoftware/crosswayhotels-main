import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const messagesDir = path.join(root, "src/messages");

function flatten(obj, prefix = "") {
  /** @type {Record<string, string>} */
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v === undefined || v === null ? "" : String(v);
    }
  }
  return out;
}

const en = JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf8"));
const ar = JSON.parse(fs.readFileSync(path.join(messagesDir, "ar.json"), "utf8"));
const fr = JSON.parse(fs.readFileSync(path.join(messagesDir, "fr.json"), "utf8"));

const flatEn = flatten(en);
const flatAr = flatten(ar);
const flatFr = flatten(fr);

const allKeys = [...new Set([...Object.keys(flatEn), ...Object.keys(flatAr), ...Object.keys(flatFr)])].sort();

const rows = allKeys.map((key) => ({
  key,
  en: flatEn[key] ?? "",
  ar: flatAr[key] ?? "",
  fr: flatFr[key] ?? "",
}));

const sheet = XLSX.utils.json_to_sheet(rows);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, sheet, "translations");
const xlsxPath = path.join(root, "translations.xlsx");
XLSX.writeFile(wb, xlsxPath);
console.log("Wrote", xlsxPath, "rows:", rows.length);

function csvEscape(cell) {
  const s = String(cell);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const header = ["key", "en", "ar", "fr"].map(csvEscape).join(",");
const csvBody = rows.map((r) => [r.key, r.en, r.ar, r.fr].map(csvEscape).join(",")).join("\n");
const csvPath = path.join(root, "translations.csv");
// UTF-8 BOM so Excel recognizes encoding for Arabic/French
const bom = "\uFEFF";
fs.writeFileSync(csvPath, bom + header + "\n" + csvBody, "utf8");
console.log("Wrote", csvPath, "rows:", rows.length);
