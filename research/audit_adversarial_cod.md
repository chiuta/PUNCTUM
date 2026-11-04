# Audit adversarial — cod (v2.0 → v2.1)

## Găsit și corectat
1. **XSS prin `id` de rutină** (localStorage sau import JSON): `id` era inserat în atribute `onclick` fără escapare de apostrof → cod arbitrar la clic. Reparat în trei straturi: `esc()` escapează acum și `'` și `` ` ``; `load()` normalizează tot starea (id-uri doar `[\w-]`, coduri de puncte validate, tipuri verificate, chei `__proto__`/`constructor` ignorate); importul era deja validat (id-uri regenerate).
2. **Stare coruptă în localStorage** (`routines:[null]`, `fav` de alt tip, `theme` invalid, `lang` invalid) bloca aplicația cu excepții. Reparat prin normalizare în `load()`.
3. **Semnal de sarcină fragil**: regex duplicat în două fișiere, care nu recunoștea „Evitat/Prudență în sarcină”. Acum o singură sursă (`PREGRE`/`isPregPt` în `08_helpers.js`), care detectează orice mențiune „sarcin…”.
4. **Tipărirea rutinelor** nu includea avertismentele; acum tipărește ⚠ per punct și lista de puncte de evitat în sarcină.
5. **Avertisment ascuns în fișa punctului** (text mic, fără chenar) → casetă vizibilă (`.pw`), și în sesiunea ghidată.
6. **Contrast WCAG** insuficient: insigne (alb pe culori medii), butoane în tema întunecată (2,4:1), titluri de categorie. Reparat cu `--onacc`, suprapunere pe insigne și `color-mix` pentru titluri; `tests/contrast.js` verifică ambele teme.
7. **Mărime**: dicționarele repetau cheile românești de 7 ori; acum cheile sunt o singură dată și fiecare limbă e un tablou aliniat (6,0 MB → 3,7 MB).
8. Traducerea unor șiruri dinamice („60 / 60 afecțiuni”) și a modificărilor de text (`characterData`) în observatorul DOM.

## Testat fără defecte
Hash-uri deformate și payload-uri în căutare, `localStorage` indisponibil, 8 limbi × monkey test, PWA offline.

## Rămas
- Textul OMS integral nu a putut fi consultat; vezi `audit_points_a*.md`.
- Traducerile nu sunt revizuite de vorbitori nativi (au trecut doar o verificare ostilă pe șirurile critice pentru siguranță).
- Testat doar în Chromium.
