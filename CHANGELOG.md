# PUNCTUM — jurnal de versiuni

## 2.3 — 2026-11-04
Reorientare spre presopunctură, pentru reducerea riscurilor medicale.
- Presopunctura este modul principal: apare prima în meniu și pe pagina de start, cu text nou despre ce este și ce reguli are; acupunctura devine secțiune „doar informativ".
- Variante: implicit se văd 18 variante de presopunctură și metode blânde. Cele 60 de variante rămân la un clic, cu avertisment pe fiecare fișă (⛔ doar practicant calificat / ⚠ numai după instruire). Linkurile către o variantă invazivă comută automat pe „toate".
- Afecțiuni: implicit se ascund variantele cu ace, ventuze umede și moxă directă.
- Puncte: notă despre presiunea corectă; avertismentele despre „înțepare" sunt marcate „Pentru acupunctori".
- Avertismentul general și sloganul (8 limbi) subliniază presopunctura. 25 de șiruri noi traduse în 7 limbi.

## 2.2 — 2026-11-04
Verificare și reparare completă (a treia trecere).
- Test nou `tests/i18n_deep.js`: randează toate punctele, variantele, lecțiile, afecțiunile, cardurile și întrebările în fiecare limbă; 0 rămășițe românești în ~13.000 de șiruri/limbă.
- Fragmentele din jurul linkurilor (`linkify`) se traduc întregi, cu ordinea corectă a cuvintelor.
- Cardul de meridian (flashcard) folosește șirul tradus; 4 șiruri noi traduse în 7 limbi.
- Referințe: Cochrane și ACP (Ann Intern Med 2017;166:514–530) trec la DOI; Ho 2025 la DOI. `legislatie.just.ro` rămâne generic (neverificat), iar Springer 2025 nu a putut fi deschis automat.
- Test nou `tests/data.js` (integritate încrucișată a datelor), `a11y.js` extins.

## 2.1 (2026-11-04) — audit adversarial
- **Securitate**: reparat XSS prin id de rutină; stare coruptă din localStorage nu mai blochează aplicația (`research/audit_adversarial_cod.md`)
- **Conținut medical**: audit independent al afecțiunilor (82 corecturi: dovezi coborâte la „limitat” unde ghidurile nu susțin, semnale de alarmă noi), quiz (56), curs/protocoale/siguranță (74), avertismente per punct (46 de puncte), 43 de corecturi de traducere (ex. maghiară „vérvétel”→„vérengedés”)
- **Siguranță în interfață**: sursă unică pentru semnalul de sarcină, avertismente în tipărire, casetă vizibilă pe fișa punctului și în sesiune
- **Accesibilitate**: contrast WCAG în ambele teme, ținte tactile
- **Mărime**: 6,0 MB → 3,7 MB (chei de traducere comune)
- Teste noi: `adversarial.js`, `contrast.js`, `all.sh`

## 2.0 (2026-11-04) — 20 de iterații cu agenți
1. Bază modulară (`src/`, `build.py`), teste automate (`tests/run.js`)
2. Comparație cu aplicații concurente (`research/competitors_*.md`): lacune identificate → hărți interactive, index de afecțiuni, rutine, flashcarduri, curs, verificare onestă a datelor
3–6. 410 puncte complete pe 14 meridiane + extra, cu semnificația numelui și stare de verificare
7. Hărți SVG interactive (corp, mână, picior, ureche)
8. Index de 60 de afecțiuni + rutine personale
9–10. Curs de 6 niveluri / 24 de lecții; quiz de 200+ întrebări; flashcarduri Leitner
11. Audit de acuratețe (4 audituri de puncte, 2 de variante) + pagina Referințe
12. Accesibilitate (link de salt, focus, ARIA, tipărire) + `tests/a11y.js`
13–16. Traducere completă în en, fr, it, es, pt, de, hu (≈5.900 de șiruri) + `tests/i18n_cov.js`
17. PWA (manifest, service worker, pictograme), verificat offline
18–19. Monkey test în toate cele 8 limbi, corectări
20. README în 8 limbi, LICENSE MIT, arhivă

## Limite cunoscute
- Textul OMS integral nu a putut fi consultat pentru BL45–67, KI, PC, TE, GB, LR, CV, GV și punctele extra (surse secundare, marcate `s`); unele puncte sunt `neverificat`.
- Semnificațiile numelor sunt traduceri aproximative.
- Traducerile sunt făcute de modele și nu au fost revizuite de vorbitori nativi.
- Pozițiile de pe hărți sunt schematice.
