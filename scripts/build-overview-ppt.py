"""One-off generator: Crossway-New overview deck. Run: ../.venv-ppt/bin/python build-overview-ppt.py"""
from pathlib import Path

from pptx import Presentation
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "Crossway-New-Overview.pptx"


def add_title_slide(prs, title: str, subtitle: str):
    layout = prs.slide_layouts[0]
    s = prs.slides.add_slide(layout)
    s.shapes.title.text = title
    if len(s.placeholders) > 1:
        s.placeholders[1].text = subtitle


def add_bullets(prs, title: str, lines: list[str]):
    layout = prs.slide_layouts[1]
    s = prs.slides.add_slide(layout)
    s.shapes.title.text = title
    body = s.placeholders[1].text_frame
    body.clear()
    for i, line in enumerate(lines):
        p = body.paragraphs[0] if i == 0 else body.add_paragraph()
        p.text = line
        p.level = 0
        p.font.size = Pt(18)


def add_two_column(prs, title: str, left_title: str, left_lines: list[str], right_title: str, right_lines: list[str]):
    layout = prs.slide_layouts[5]  # blank
    s = prs.slides.add_slide(layout)
    tx = s.shapes.add_textbox(Inches(0.5), Inches(0.35), Inches(9), Inches(0.8))
    tx.text_frame.text = title
    tx.text_frame.paragraphs[0].font.size = Pt(32)
    tx.text_frame.paragraphs[0].font.bold = True

    def box(x, y, w, h, heading, lines):
        sh = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
        tf = sh.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = heading
        p.font.bold = True
        p.font.size = Pt(20)
        for line in lines:
            p = tf.add_paragraph()
            p.text = line
            p.font.size = Pt(14)
            p.level = 0

    box(0.5, 1.2, 4.4, 5.2, left_title, left_lines)
    box(5.1, 1.2, 4.4, 5.2, right_title, right_lines)


def main():
    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)

    add_title_slide(
        prs,
        "Crossway New",
        "Next.js 14 marketing site — deliverables & request flow",
    )

    add_bullets(
        prs,
        "What has been built",
        [
            "Bilingual public site (English + Arabic) with RTL for ar",
            "Corporate home: hero, booking bar, discover, stay grid, features, brands",
            "Full navigation: About, hotels (external property sites), brands, partner, news, contact",
            "Content pages: team, careers, feedback, brochure, legal (privacy, terms), Lifotel pages",
            "News hub: categories, tags, article views driven from structured post data + markdown where used",
            "Booking UI: property picker, date range (react-day-picker), guests — submits to external booking URLs",
            "Polished shell: header with locale switcher, footer with links & contact blocks",
        ],
    )

    add_bullets(
        prs,
        "Technology stack",
        [
            "Next.js 14 (App Router), React 18, TypeScript",
            "next-intl — locale routing, messages, middleware",
            "Sass modules + global tokens; Framer Motion for motion; react-markdown for docs",
            "date-fns + react-day-picker for booking dates",
            "Images: Next/Image with unoptimized flag in config (static-friendly deploy)",
        ],
    )

    add_two_column(
        prs,
        "Request & render flow (high level)",
        "Edge / routing",
        [
            "Browser requests a path",
            "next-intl middleware matches routes",
            "Locale prefix always: /en/... and /ar/...",
            "Invalid locale → not found",
        ],
        "App tree",
        [
            "app/[locale]/layout.tsx loads messages, sets dir (ltr/rtl), fonts",
            "NextIntlClientProvider wraps the tree",
            "SiteShell: SiteHeader → main → SiteFooter",
            "Page segment renders route-specific content",
        ],
    )

    add_bullets(
        prs,
        "Home page composition (order)",
        [
            "HomeHero — primary message & imagery",
            "BookingBar — sticky booking entry → BookingPanel",
            "DiscoverSection — brand story copy",
            "PerfectStayGrid — audience pillars (family, business, dining, wellness)",
            "HomeFeatureRows — rooms, dining, banquet, spa",
            "BrandsSection — Crossway / Lifotel / Revostay",
        ],
    )

    add_bullets(
        prs,
        "Information architecture (examples)",
        [
            "Static/marketing: /about-us, /team, /careers, /contact-us, /partner-with-us, /brochure, /feedback",
            "Brands: /crossway, /lifotel, /lifotel-suites, /excellent-hospitality-services",
            "News: /news-and-updates, /category/{events|press-releases|food-for-thought}",
            "Tags: /tag/{event|awards|updates}",
            "Articles: slug routes under [locale] (e.g. press posts)",
            "Legal: /privacy-policy, /terms-of-use",
            "Redirect: /author/crossway → / (next.config)",
        ],
    )

    add_bullets(
        prs,
        "Content & news flow",
        [
            "lib/posts.ts — curated BlogPost list (slug, title, excerpt, image ref, categories, tags)",
            "postsByCategory / postsByTag filter grids and archive pages",
            "ArticleView + MarkdownDoc for long-form where markdown is loaded",
            "lib/media.ts — central image paths for news cards",
        ],
    )

    add_bullets(
        prs,
        "Booking user flow",
        [
            "User opens BookingBar (home) or equivalent entry",
            "Selects property (hotel channel IDs mapped to labels)",
            "Picks check-in / check-out with locale-aware date-fns formatting",
            "Sets rooms, adults, children",
            "Submit builds external reservation URL and opens in new tab (no server booking API in-repo)",
        ],
    )

    add_bullets(
        prs,
        "Internationalization details",
        [
            "Locales: en (default), ar — localePrefix: always",
            "Copy in src/messages/en.json and ar.json (Nav, Footer, Home, Booking, Features, LocaleSwitcher)",
            "Navigation uses i18n-aware Link helpers from i18n/navigation.ts",
            "Arabic: Noto Sans Arabic + dir=\"rtl\" on <html>",
        ],
    )

    add_title_slide(prs, "Summary", "Bilingual Next.js site • clear IA • booking hand-off to external engines • content-driven news")

    prs.save(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
