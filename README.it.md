# PUNCTUM

_atlante delle terapie a punti: agopuntura, agopressione, moxibustione, coppettazione, auricoloterapia, riflessologia e altro_

**Versione 2.0 · Ultimo aggiornamento: 2026-11-04**

[Română](README.ro.md) · [English](README.en.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

PUNCTUM è un'app **HTML in un unico file** che funziona **offline** — senza account, senza tracciamento, senza server. Apri `punctum.html` in qualsiasi browser.

## Contenuti

- **410 punti** su 14 meridiani più punti extra, con localizzazione, azioni, avvertenze, significato del nome e stato di verifica (testo OMS / ≥ 2 fonti / non verificato)
- **60 varianti** (agopuntura, agopressione, moxibustione, coppettazione, gua sha, laser, TENS, auricoloterapia, riflessologia, shiatsu, tuina, pratiche controverse) con passaggi, durata, sicurezza e livello di evidenza onesto
- **Mappe SVG interattive** (corpo, mano, piede, orecchio) con filtro per meridiano e ricerca per codice
- **Indice di 60 disturbi** con segnali d'allarme, punti e varianti; **routine personali** (creazione, sessione guidata, stampa, esporta/importa)
- **Corso** in 6 livelli / 24 lezioni, **quiz** con oltre 200 domande, **flashcard** a ripetizione dilazionata (Leitner), glossario, guida alle misure (cun)
- **8 lingue**: ro, en, fr, it, es, pt, de, hu · tema chiaro/scuro · tastiera e screen reader · stampa · **PWA** installabile

## Evidenze e sicurezza

L'app è **educativa** e non sostituisce diagnosi o trattamento medico. I livelli di evidenza sono mostrati con onestà (da «moderati» a «nessuna evidenza»); le pratiche controverse sono indicate come tali. Le localizzazioni seguono lo standard OMS WPRO 2008, ma il testo OMS completo non è stato consultabile per tutti i meridiani; lo stato di ogni punto è visibile nell'app e riassunto nella pagina **Riferimenti**. Vedi `research/` per l'audit completo e le affermazioni non confermate.

## Uso

Apri `dist/punctum.html` (oppure servi `dist/pwa/` via HTTPS per installarla come app). I progressi (corso, flashcard, routine) sono salvati localmente nel browser.

## Sviluppo

Sorgente modulare in `src/`; `python3 build.py` assembla il file unico. Test: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versione>`.

## Licenza e sostegno

Licenza MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Per sostenere il progetto: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
