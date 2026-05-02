#!/usr/bin/env python3
"""Merge ServiceExperience partial JSON into en.json / fr.json / ar.json."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MESSAGES = ROOT / "src" / "messages"
PARTIALS = ROOT / "scripts" / "service-experience"


def merge(locale: str) -> None:
    path = MESSAGES / f"{locale}.json"
    partial_path = PARTIALS / f"{locale}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    partial = json.loads(partial_path.read_text(encoding="utf-8"))
    data["ServiceExperience"] = partial
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Merged ServiceExperience → {path.relative_to(ROOT)}")


def main() -> None:
    for locale in ("en", "fr", "ar"):
        merge(locale)


if __name__ == "__main__":
    main()
