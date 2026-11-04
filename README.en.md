# PUNCTUM

_atlas of point-based therapies: acupuncture, acupressure, moxibustion, cupping, auricular therapy, reflexology and more_

**Version 2.5 · Last updated: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

PUNCTUM is a **single-file HTML app** that works **offline** — no account, no tracking, no servers. Open `punctum.html` in any browser.

## What it contains

- **410 points** on 14 meridians plus extra points, with location, actions, cautions, name meaning and a verification status (WHO text / ≥2 sources / unverified)
- **60 variants** (acupuncture, acupressure, moxibustion, cupping, gua sha, laser, TENS, auricular, reflexology, shiatsu, tuina, controversial practices) with steps, duration, safety and an honest evidence level
- **Interactive SVG maps** (body, hand, foot, ear) with meridian filter and code search
- **Conditions index** (60) with red flags, points and variants; **personal routines** (build, guided session, print, export/import)
- **Course** with 6 levels / 24 lessons, **quiz** with 200+ questions, **spaced-repetition flashcards** (Leitner), glossary, measuring guide (cun)
- **8 languages**: ro, en, fr, it, es, pt, de, hu · light/dark theme · keyboard and screen-reader support · print · installable **PWA**
- **Acupressure is the focus**: gentle methods are shown by default; needles, moxa, cupping and bloodletting are information-only, with warnings
- **Massage**: 31 combinations of points pressed at the same time, 13 regional sequences and 14 techniques, with timed guided sessions and a partner mode (feedback and STOP)
- **Personal safety, stored locally**: safety profile, pre-session check, “Where does it hurt?”, before/after score journal, plan with calendar (.ics) export, printable cards, map-location exam, voice, high contrast and data transfer

## Evidence and safety

This app is **educational** and does not replace medical diagnosis or treatment. Evidence levels are shown honestly (from “moderate” to “no evidence”); controversial practices are labelled as such. Point locations follow the 2008 WHO WPRO standard, but the full WHO text could not be consulted for every meridian; each point’s status is shown in the app and summarised on the **References** page. See `research/` for the full audit and the claims that remain unconfirmed.

## Usage

Open `dist/punctum.html` (or serve `dist/pwa/` over HTTPS to install it as an app). Progress (course, flashcards, routines) is saved locally in your browser.

## Development

Modular source in `src/`; `python3 build.py` assembles the single file. Tests: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html` (views, data integrity, languages, monkey test), `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <version>`.

## License and support

MIT License · © 2026 Alexandru-Ionuț Chiuță (Alexio). If you like it, you can support the project: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
