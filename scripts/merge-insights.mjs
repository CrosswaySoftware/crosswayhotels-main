import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function deepMerge(a, b) {
  const out = { ...a };
  for (const k of Object.keys(b)) {
    const bv = b[k];
    const av = a[k];
    if (
      bv &&
      typeof bv === "object" &&
      !Array.isArray(bv) &&
      av &&
      typeof av === "object" &&
      !Array.isArray(av)
    ) {
      out[k] = deepMerge(av, bv);
    } else {
      out[k] = bv;
    }
  }
  return out;
}

for (const locale of ["ar", "fr"]) {
  const basePath = path.join(root, "src/messages", `${locale}.json`);
  const chunkPath = path.join(root, "scripts/chunks", `insights-${locale}.json`);
  if (!fs.existsSync(chunkPath)) continue;
  const base = JSON.parse(fs.readFileSync(basePath, "utf8"));
  const chunk = JSON.parse(fs.readFileSync(chunkPath, "utf8"));
  const merged = deepMerge(base, chunk);
  fs.writeFileSync(basePath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log("Merged insights into", basePath);
}
