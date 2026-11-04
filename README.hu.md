# PUNCTUM

_pontalapú terápiák atlasza: akupunktúra, akupresszúra, moxa, köpölyözés, fülakupunktúra, reflexológia és más_

**Verzió 2.2 · Utolsó frissítés: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

A PUNCTUM egy **egyetlen HTML-fájlból álló alkalmazás**, amely **offline** működik — fiók, nyomkövetés és szerver nélkül. Nyisd meg a `punctum.html` fájlt bármely böngészőben.

## Tartalom

- **410 pont** 14 meridiánon és extra pontok, elhelyezkedéssel, hatásokkal, figyelmeztetésekkel, a név jelentésével és ellenőrzési állapottal (WHO-szöveg / ≥ 2 forrás / ellenőrizetlen)
- **60 változat** (akupunktúra, akupresszúra, moxa, köpölyözés, gua sha, lézer, TENS, fülakupunktúra, reflexológia, shiatsu, tuina, vitatott gyakorlatok) lépésekkel, időtartammal, biztonsággal és őszinte bizonyítékszinttel
- **Interaktív SVG-térképek** (test, kéz, láb, fül) meridiánszűrővel és kódkereséssel
- **60 panaszt tartalmazó index** vészjelekkel, pontokkal és változatokkal; **személyes rutinok** (készítés, vezetett gyakorlás, nyomtatás, export/import)
- **Tanfolyam** 6 szinten / 24 leckével, **kvíz** 200+ kérdéssel, **szókártyák** elosztott ismétléssel (Leitner), szószedet, mérési útmutató (cun)
- **8 nyelv**: ro, en, fr, it, es, pt, de, hu · világos/sötét téma · billentyűzet és képernyőolvasó · nyomtatás · telepíthető **PWA**

## Bizonyítékok és biztonság

Az alkalmazás **oktatási célú**, nem helyettesíti az orvosi diagnózist vagy kezelést. A bizonyítékszintek őszintén jelennek meg („mérsékelt”-től a „nincs bizonyíték”-ig); a vitatott gyakorlatok megjelölve szerepelnek. A pontok helye a 2008-as WHO WPRO szabványt követi, de a teljes WHO-szöveg nem minden meridiánnál volt elérhető; minden pont állapota látható az appban, és a **Források** oldal összegzi. A teljes auditot és a meg nem erősített állításokat lásd a `research/` mappában.

## Használat

Nyisd meg a `dist/punctum.html` fájlt (vagy szolgáltasd a `dist/pwa/` mappát HTTPS-en az alkalmazásként való telepítéshez). A haladás (tanfolyam, szókártyák, rutinok) helyben, a böngészőben mentődik.

## Fejlesztés

Moduláris forrás a `src/` mappában; a `python3 build.py` állítja össze az egyetlen fájlt. Tesztek: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <verzió>`.

## Licenc és támogatás

MIT licenc · © 2026 Alexandru-Ionuț Chiuță (Alexio). A projekt támogatásához: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
