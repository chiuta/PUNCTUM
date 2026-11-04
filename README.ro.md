# PUNCTUM

_atlas al terapiilor prin puncte: acupunctură, presopunctură/acupresură, moxă, ventuze, auriculoterapie, reflexologie și altele_

**Versiune 2.1 · Ultima actualizare: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

PUNCTUM este o aplicație **într-un singur fișier HTML**, care funcționează **offline**, fără cont, fără urmărire și fără servere. Deschide `punctum.html` în orice browser.

## Ce conține

- **410 puncte** pe 14 meridiane și puncte extra, cu localizare, acțiuni, avertismente, semnificația numelui și o stare de verificare (OMS / ≥2 surse / neverificat)
- **60 de variante** (acupunctură, acupresură, moxă, ventuze, gua sha, laser, TENS, auriculoterapie, reflexologie, shiatsu, tuina, practici controversate), cu pași, durată, siguranță și nivel onest al dovezilor
- **Hărți SVG interactive** (corp, mână, picior, ureche) cu filtru pe meridian și căutare după cod
- **Index de afecțiuni** (60) cu semnale de alarmă, puncte și variante; **rutine personale** (creare, sesiune ghidată, tipărire, export/import)
- **Curs** în 6 niveluri / 24 de lecții, **quiz** cu 200+ întrebări, **flashcarduri** cu repetiție eșalonată (Leitner), glosar, ghid de măsurare (cun)
- **8 limbi**: ro, en, fr, it, es, pt, de, hu · temă luminoasă/întunecată · tastatură și cititor de ecran · tipărire · **PWA** instalabilă

## Despre dovezi și siguranță

Aplicația este **educațională** și nu înlocuiește diagnosticul sau tratamentul medical. Nivelul dovezilor este afișat onest (de la „moderate” la „fără dovezi”); controversatele sunt marcate ca atare. Localizările punctelor urmează standardul OMS 2008 (WPRO), dar textul OMS integral nu a putut fi consultat pentru toate meridianele; starea fiecărui punct este vizibilă în aplicație, iar pagina **Referințe** o rezumă. Vezi `research/` pentru auditul complet și afirmațiile rămase neconfirmate.

## Utilizare

Deschide `dist/punctum.html` (sau `dist/pwa/` servit prin HTTPS pentru instalare ca aplicație). Progresul (curs, flashcarduri, rutine) se salvează local în browser.

## Dezvoltare

Sursa este modulară în `src/`; `python3 build.py` asamblează fișierul unic. Teste: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html` (vizualizări, integritate date, limbi, monkey test), `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versiune>`.

## Licență și sprijin

Licență MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Dacă îți place, poți susține proiectul: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
