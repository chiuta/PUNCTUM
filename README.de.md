# PUNCTUM

_Atlas punktbasierter Therapien: Akupunktur, Akupressur, Moxibustion, Schröpfen, Ohrakupunktur, Reflexzonentherapie und mehr_

**Version 2.3 · Zuletzt aktualisiert: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

PUNCTUM ist eine **Ein-Datei-HTML-App**, die **offline** funktioniert — ohne Konto, ohne Tracking, ohne Server. Öffnen Sie `punctum.html` in einem beliebigen Browser.

## Inhalt

- **410 Punkte** auf 14 Meridianen plus Extrapunkte, mit Lokalisation, Wirkungen, Vorsichtshinweisen, Namensbedeutung und Prüfstatus (WHO-Text / ≥ 2 Quellen / ungeprüft)
- **60 Varianten** (Akupunktur, Akupressur, Moxibustion, Schröpfen, Gua Sha, Laser, TENS, Ohrakupunktur, Reflexzonen, Shiatsu, Tuina, umstrittene Verfahren) mit Schritten, Dauer, Sicherheit und ehrlicher Evidenzstufe
- **Interaktive SVG-Karten** (Körper, Hand, Fuß, Ohr) mit Meridianfilter und Codesuche
- **Beschwerdenindex** (60) mit Warnzeichen, Punkten und Varianten; **persönliche Routinen** (erstellen, geführte Sitzung, drucken, Export/Import)
- **Kurs** mit 6 Stufen / 24 Lektionen, **Quiz** mit über 200 Fragen, **Karteikarten** mit verteilter Wiederholung (Leitner), Glossar, Maßanleitung (Cun)
- **8 Sprachen**: ro, en, fr, it, es, pt, de, hu · helles/dunkles Design · Tastatur und Screenreader · Druck · installierbare **PWA**

## Evidenz und Sicherheit

Die App ist **lehrend** und ersetzt keine ärztliche Diagnose oder Behandlung. Evidenzstufen werden ehrlich angezeigt (von „moderat“ bis „keine Evidenz“); umstrittene Verfahren sind als solche gekennzeichnet. Die Lokalisationen folgen dem WHO-WPRO-Standard von 2008, der vollständige WHO-Text war jedoch nicht für alle Meridiane einsehbar; der Status jedes Punktes ist in der App sichtbar und auf der Seite **Quellen** zusammengefasst. Details zum Audit und zu unbestätigten Aussagen in `research/`.

## Nutzung

Öffnen Sie `dist/punctum.html` (oder stellen Sie `dist/pwa/` per HTTPS bereit, um sie als App zu installieren). Fortschritte (Kurs, Karteikarten, Routinen) werden lokal im Browser gespeichert.

## Entwicklung

Modularer Quellcode in `src/`; `python3 build.py` erzeugt die Einzeldatei. Tests: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <Version>`.

## Lizenz und Unterstützung

MIT-Lizenz · © 2026 Alexandru-Ionuț Chiuță (Alexio). Zur Unterstützung des Projekts: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
