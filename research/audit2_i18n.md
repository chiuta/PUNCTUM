# Audit i18n 2 - PUNCTUM v2.4 (en, fr, it, es, pt, de, hu)

Data audit: 2026-11-04. Nu s-a modificat nimic în `src/`, `tests/`, `dist/`. Corecturile sunt în `research/tr/fix2_<lang>.tsv` (coloane: `romanian_exact<TAB>corrected_translation`, 120 de rânduri în total).

## 1. Statistici

| Element | Valoare |
|---|---|
| Șiruri românești „vii" (`strings_live.json`) | 6 726 |
| Chei distincte în `src/i18n/*.json` (reuniune) | 6 034 |
| Șiruri care conțin cuvintele-cheie cerute (nu, evită, niciodată, interzis, doar, numai, sarcin, anticoag, tromboz, 112, medic, oprește, ⛔, ⚠, contraindic, urgen, alarm, stop) | 1 172 |
| Perechi (cheie, limbă) verificate automat | ~47 000 (6 726 x 7) |
| Verificări automate | cifre/scale, coduri de puncte (LI4, BL23...), negație/restricție pierdută sau adăugată față de RO, „doar/numai", cuvinte de siguranță (sarcină, anticoagulante, tromboză, 112, urgență, medic), HTML/JSON/ghilimele/paranteze, trunchieri și rapoarte de lungime, duplicate de traduceri, blocuri JSON de protocol (15 chei x 7 limbi), tu/vous/du/Sie/você/usted/ön, terminologie |
| Citite integral, în toate cele 7 limbi | profil/triaj (26_profil.js, 65 șiruri), durere (28_durere.js, 75), primele 31 din cele 78 de șiruri de siguranță din masaj, toate șirurile semnalate automat |
| Eșantion aleatoriu non-medical | 200 de șiruri (seed 42, câte o limbă pe șir, rotativ) |
| Constatări | 1 critică (bloc corupt), 1 inversare de sens, 1 nealiniere, 3 garbled, 4 grupuri de registru, 3 de terminologie, câteva minore |
| Corecturi propuse | 120 (en 24, it 24, es 26, pt 31, hu 13, fr 1, de 1) |

Rezultatul pe eșantionul de 200: 0 erori de sens, 0 negații pierdute. Doar observații de stil (secțiunea 6). Traducerile din fr/de/hu pentru blocul 13_7 sunt corecte.

Nu am găsit tonuri care promit vindecare (căutare „cure/heal/guarantee/guérir/curar/heilen/gyógyít..." fără sursă RO corespondentă: 0). Negațiile din avertismentele medicale citite sunt păstrate în toate limbile (sarcină, anticoagulante, tromboză, 112, epilepsie, pacemaker, secunde, /10, nume de puncte), cu excepțiile de mai jos.

## 2. Constatări (cele mai grave primele)

### C1. CRITIC - 74 de șiruri afișează text greșit cu prefix numeric în en, it, es, pt

- **Limbi:** en, it, es, pt (câte 74 de chei în fiecare; fr, de, hu sunt corecte).
- **Chei:** ID-urile 6870-6943 din `strings_ro.json` (chunk_13_7), de la „Spate lombar cu minge (≈7 min" până la „Unde te doare?".
- **Simptom (exemple actuale):**
  - `Toate punctele acestei sesiuni se evită în profilul tău.` -> en: `6745|Do not start if you have any of the following:`
  - `Stabiliți un semnal de oprire ... În sarcină nu face această secvență ...` -> en: `6724|Slow stroking (effleurage)`
  - `Uleiurile esențiale se folosesc doar diluate ... evită-le în sarcină ...` -> en: `6788|Broken, burned, irritated or infected skin; ...`
  - `Sunt însărcinată sau încerc să rămân însărcinată` -> en: `6734|Never press on the eyeball and do not press if pain appears. During pregnancy ask your doctor for approval; ...` (checkbox de profil înlocuit cu un alt avertisment)
  - `Un review Cochrane din 2015 ...` -> en: `6793|Position:`
- **Cauză:** fișierele `out_{en,it,es,pt}_13_7.tsv` conțin linii de forma `6893<TAB>6745|text`. Traducătorul a tradus alt segment (ID-uri 6722-6795, deplasare -148) și a pus în față ID-ul sursei greșite. Verificat: pentru 71 din 74 de chei prefixul indică ID-ul i-148, iar textul coincide exact cu traducerea corectă a acelui alt ID. Rezultatul: utilizatorul vede „NNNN|" și, mai grav, un avertisment de sarcină/anticoagulante înlocuit cu un text care nu are legătură (de ex. avertismentul „în sarcină nu face această secvență" devine „Mângâiere lentă").
- **Severitate:** critică (siguranță: lipsesc avertismente de sarcină, de ulei esențial, de sciatică/palpitații; apar și texte false sub etichete de evidență Cochrane).
- **Corectură:** 24 de chei x 4 limbi = 96 de rânduri, în `fix2_en.tsv`, `fix2_it.tsv`, `fix2_es.tsv`, `fix2_pt.tsv`, ordonate după gravitate: 6872, 6873 (semnal de oprire + sarcină), 6893 (puncte de evitat), 6882 (însărcinată), 6936 (uleiuri esențiale), 6902 (sciatică), 6905 (palpitații), 6906, 6926, 6877, 6878 (scale /10, secunde), 6940-6942 (Cochrane), 6943, 6904, 6886, 6897, apoi etichete și durate (6874, 6875, 6870, 6871, 6933, 6934).
- **NU sunt acoperite (limită de 120):** 50 de chei x 4 limbi. ID-uri: 6876, 6879-6881, 6883-6885, 6887-6892, 6894-6896, 6898-6901, 6903, 6907-6925, 6927-6932, 6935, 6937-6939 (descrieri „Tradițional se folosește pentru...", „Surse", „Toate punctele", „Text mai mare/mic", „Umeri" etc.). **Recomandare:** refaceți direct cele 4 fișiere `out_{en,it,es,pt}_13_7.tsv` (74 de linii fiecare, din `chunk_13_7.tsv`) și rulați `merge_tr.py en it es pt`; asta rezolvă toate cele 296 de traduceri și face redundante rândurile mele pentru aceste chei. Adăugați în `merge_tr.py` o verificare care respinge valori de forma `^\d+\|`.

### C2. CRITIC - sens inversat în hu (quiz)

- **Cheie:** `Durerea intensă este scopul presiunii.` (variantă de răspuns greșită în quiz)
- **hu actual:** `Az erős fájdalom nem célja a nyomásnak.` (= „Durerea intensă NU este scopul presiunii" - devine afirmația corectă)
- **Problemă:** negație adăugată; răspunsul greșit devine adevărat și contrazice mesajul de siguranță (durerea nu e ținta).
- **Corectură:** `Az erős fájdalom a nyomás célja.` (în `fix2_hu.tsv`). Celelalte 6 limbi sunt corecte.

### C3. MEDIE - traducere nealiniată în fr

- **Cheie:** `O parte din beneficiu poate proveni din context și așteptare, nu doar din punctul ales.`
- **fr actual:** `Un récit personnel` (traducerea altui șir; pierde mesajul de evidență/placebo).
- **Corectură:** `Une partie du bénéfice peut provenir du contexte et de l'attente, et pas seulement du point choisi.` (în `fix2_fr.tsv`). Din duplicate/rapoarte de lungime a rezultat doar acest caz în afara blocului C1.

### C4. MEDIE - frecvență/durată garbled în pt

| Cheie | pt actual | Problemă | Corectură |
|---|---|---|---|
| `Câteva ședințe, la 1–2 săptămâni` | `Algumas sessões, de 1 em 1–2 semanas` | „de 1 em 1-2" fără sens (frecvență de dozare) | `Algumas sessões, a cada 1–2 semanas` |
| `Câteva ședințe, la 3–7 zile` | `Algumas sessões, de 3 em 3–7 dias` | idem | `Algumas sessões, a cada 3–7 dias` |
| `Spate: partea inferioară a spatelui ...` | `... levante-se de 45 em 45 a 60 em 60 minutos ...` + amestec tu/você | interval deformat | text complet corectat în `fix2_pt.tsv` |

### C5. MEDIE - registru inconsecvent (siguranță: instrucțiuni contradictorii în același ecran)

Heuristic (markeri neechivoci de imperativ/pronume pe șirurile vii); numerele sunt șiruri, nu apariții:

| Limbă | Situația | Registru majoritar ales | Ce am corectat | Ce rămâne |
|---|---|---|---|---|
| hu | 12 șiruri de masaj (secvențe) în „ön" (Fogja, Helyezze, ne végezze, kérje) față de „te" în rest (~300) | te | toate cele 12 (în `fix2_hu.tsv`), inclusiv pacemaker/anticoagulante/epilepsie/sarcină | - |
| de | 1 „Tippen Sie auf einen Punkt" | du | 1 | - |
| es | 2 „⚠ Evite la punción profunda" | tú | 2 | - |
| it | consecvent „tu" (singurul candidat, „Usi una lampada", e corect) | tu | - | - |
| pt | tu ~217 șiruri față de você ~104 (masaj: „Pressione/Coloque/Fique"; chiar în același șir: „Pressiona ... enquanto você respira"); în plus „câncer" (2), „abdômen" (5), „aplicativo", „baixar" amestecate cu pt-PT (cancro, abdómen, ecrã, ficheiro) | tu, pt-PT | „cancro" (profil), 3 șiruri cu „o seu perfil" -> „o teu perfil" | ~100 de șiruri de masaj/condiții cu „você", 5 „abdômen", 1 „como se sente agora?" (profil, opțional), „se você tiver edema" (BL60), „feito por você mesmo" |
| fr | tu ~199 față de vous ~216 (cond_a 59, course_b 28, quiz 15, masaj_simult 20, masaj_tehnici 7...); chiar etichete de siguranță în vous („Pendant la grossesse, évitez :") și citate în tu („En cas de grossesse, évite") | tu (sursa RO este „tu") | - (depășește limita; ~200 de șiruri) | toate cele ~216 șiruri în „vous" |

**Recomandare fr/pt:** conversie sistematică (ideal re-traducere pe chunk cu instrucțiune explicită de registru) în loc de rânduri individuale.

### C6. MEDIE - etichetele de sarcină citate nu coincid cu eticheta afișată

Șirul `În sarcină evită:` (eticheta de pe card) se traduce diferit față de citatele din textele de masaj („nu conține puncte marcate «În sarcină evită»"):

| Limbă | Etichetă pe card | Citat în text (variante) |
|---|---|---|
| en | `In pregnancy avoid:` | `Avoid in pregnancy` |
| fr | `Pendant la grossesse, évitez :` | `En cas de grossesse, évite`, `À éviter pendant la grossesse` |
| it | `In gravidanza evita:` | `In gravidanza evita`, `In gravidanza evitare` |
| es | `En el embarazo evita:` | `En el embarazo evitar`, `Evitar en el embarazo` |
| pt | `Na gravidez evite:` | `Na gravidez evita`, `Evitar na gravidez` |
| de | `In der Schwangerschaft meiden:` | (consecvent) |
| hu | `Terhesség alatt kerüld:` | `Terhességben kerüld`, `Terhesség alatt kerülendő` |

Utilizatorul caută o etichetă ce nu apare literal. În hu am aliniat în cele 2 șiruri corectate la `Terhesség alatt kerüld`; restul de ~10 șiruri/limbă rămân (aliniați eticheta cu o singură formulă pe limbă). Severitate: medie-joasă.

### C7. JOASĂ - terminologie

- **it:** `agopressione` 135 de apariții, `digitopressione` 26 (inclusiv UI: „Digitopressione", „Non fare massaggio o digitopressione"), `acupressione` 1. Alegeți una (recomand `digitopressione`, termenul standard pentru UI; `agopressione` e folosit în corpul textelor).
- **fr:** `acupression` 153 față de `acupressure` 7 (englezism); `auto-massage` 10 față de `automassage` 6.
- **es:** `acupresión` 153 față de `acupresura` 1, `presopuntura` 3; `pareja` 36 față de `compañero` 3; `receptores` 2 față de `persona que recibe` 11 (pentru „primitor").
- **pt:** `recetores` (2, pt-PT) față de `pessoa que recebe` (11); `acupressão` consecvent (160).
- **„Primitor" (RO):** en `recipient`, fr `personne massée`, it/es/pt `persona/pessoa que recebe/riceve`, de `Empfänger:in`, hu `masszírozott személy`: consecvent pe limbă, cu cele 2 excepții es/pt de mai sus.
- **hu:** `A LI4` / `Az LI4` (articol: corect `az LI4`), `cunnal` / `cun-nal`.
- **de:** `Akupressur` consecvent.

### C8. JOASĂ - ghilimele/format

- de (4 șiruri) și hu (5): ghilimele deschise „..." închise cu `"` drept, de exemplu `„Terhesség alatt kerülendő"`, `„nem ellenőrzött"`. Nu afectează sensul.
- Blocuri JSON de protocol (15 chei x 7 limbi): toate sunt JSON valid și păstrează lista `p` (puncte) identic.
- Chei-fragment cu paranteză neînchisă (de ex. `Spate lombar cu minge (≈7 min`): sunt artefacte ale extracției, traduse fragment pentru fragment; păstrați structura.
- `STOP` / `OK` / `Element` / `Extra`: fără traducere în 6 limbi (de are `STOPP`), acceptabil.
- hu: etichete cu majusculă lipsă (`tompa fájdalom` pentru „Durere surdă"), `&` față de `és` amestecate.

## 3. Verificări fără probleme (pentru încredere)

- **Numere, scale, secunde:** 30-45 s, 60 s, 3-5/10, 4-6 din 10, 20-40 s, 0-10, 38 °C, 3 săptămâni, 24-72 ore, 4 s/6 s: păstrate în toate limbile (diferențe doar de separator zecimal/mie și cifre romane -> ordinale în en/de/fr/hu).
- **Nume de puncte:** coduri LI4, SP6, GB21, BL60, ST25, CV4/6/12, PC6, KI3, LR3 etc.: păstrate în toate cele 7 limbi (singura diferență: o cheie-fragment `LI5–LI` completată cu `LI11` de traducători).
- **Negații de siguranță:** „nu apăsa pe globul ocular niciodată", „nu masa zona", „nu trage și nu răsuci", „nu scutura niciodată sugarul", „nu frământa gambele în sarcină", „nu introduce nimic în canalul auditiv": păstrate în toate limbile verificate. „doar/numai" pierdute sau transformate în „ne ... que" sunt echivalente.
- **112 și urgențe:** prezent în toate traducerile unde apare în RO.
- **Anticoagulante/tromboză:** prezent peste tot (hu avea „vérrögképződést gátló gyógyszer"; am pus `véralvadásgátló`, ca în restul textelor hu).

## 4. Cum aplicați

1. Aplicați `research/tr/fix2_*.tsv` (cheie românească exactă -> traducere). Cheile au fost verificate: toate există în `strings_live.json` și în fiecare `<lang>.json`; fiecare are exact o coloană de traducere, fără tab/newline.
2. Mai ales: re-generați `out_{en,it,es,pt}_13_7.tsv` (C1) pentru cele 50 de chei rămase.
3. Decideți registrul final pentru fr și pt (C5) și formula pentru eticheta de sarcină (C6).

## 5. Metodă și limite

- Citit integral în toate limbile: 171 de șiruri din zonele prioritare (65 profil, 75 durere, 31 masaj - siguranță), plus toate semnalările automate. Restul de 47 de șiruri de siguranță din masaj (a doua jumătate din cele 78) au fost verificate doar automat (cifre, coduri, negație, cuvinte de siguranță), nu citite integral.
- Heuristicile de registru și de antonime (sus/jos, stânga/dreapta) sunt aproximative: nu garantează absența oricărei inversări subtile fără negație explicită. Cele 4 cazuri reale găsite (C1, C2, C3, C4) au fost confirmate manual.
- Eșantionul de 200 nu include șirurile medicale; calitatea generală a fost bună.
