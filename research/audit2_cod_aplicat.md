# Audit runda 2 (cod + accesibilitate/robustețe/SW din audit2_perf) – aplicare

Data: 2026-11-04. Fără commit. `src/i18n/*.json` neatins; `tools/merge_tr.py` nerulat. Optimizările de dimensiune/încărcare (mutare I18N, lazy dictionaries, content-visibility, debounce, toggleFav O(1)) NU au fost făcute.
Rezultat final: `sh tests/all.sh` → 0 FAIL în run, adversarial, a11y, contrast, data, features, pwa (nou); i18n_cov/i18n_deep nu au prag (informative).
Fișier nou: `src/js/91_modal.js` (fereastră modală accesibilă), `tests/pwa.js`.

## A. audit2_cod.md (20 constatări)

1. **Aplicat.** `obs.takeRecords()` în observer + garda `TR_DONE` (WeakMap nod → {limbă, text scris}) în `trText`: un nod deja tradus nu se retraduce (rezolvă și lanțurile FR „Data→Date→Données”, HU „Azi→Ma→K”). `en.json` neatins (cerință): perechea `Data↔Date` rămâne de reparat acolo; `tests/i18n_deep.js` afișează acum „ATENȚIE” pentru valori-cheie cu altă traducere (en: 2, fr: 1). Test: adversarial „MutationObserver: setări/jurnal în en fără blocaj”.
2. **Aplicat** (mai mult decât diff-ul): `tick()` actualizează doar `#sesT`; fereastra se redesenează doar la schimbarea pasului/pauză/durată. Feedback-ul partenerului (`sesFb`) nu mai redesenează (element stabil `#sesFb`, `hidden`). Redesenările restaurează focusul pe același `data-f`. Teste: features (același buton Pauză după 2,6 s, mousedown 1,3 s peste tick, STOP partener peste tick).
3. **Aplicat.** `normExtra`: `pre<=Date.now()`; `gateDraw`: `fresh` cere `S.pre<=now`; `stState()` și importul exclud `pre`/`preReg`. Test: adversarial (pre=9e15 și pre în viitor → 9 casete; export fără pre).
4. **Aplicat.** `stReset` șterge `punctum` și `acupunctura`; `load()` migrează cheia veche (salvează, apoi șterge `acupunctura` doar dacă `punctum` există). Test: adversarial.
5. **Aplicat** (a, b, c): `stApply` salvează întâi lista albă de chei (`SKEYS`) în try/catch; la eșec mesaj „Nu s-a putut salva…” și starea curentă rămâne neatinsă; „Importat.” doar la succes; după import `EU.tab='profil'` cu mesaj explicit (profil înlocuit / fișier fără profil → șters, completează-l). `load()` ignoră cheile necunoscute (lista albă) și elimină `course/study/routines` > 300 KB. Mesajul se afișează acum și în tabul Profil.
6. **Aplicat.** `hasOwnProperty` în `load()` și gardă în `setLang()`. Test: constructor/__proto__/toString/hasOwnProperty din stare + import.
7. **Aplicat.** `role=dialog aria-modal aria-labelledby`, focus la intrare, capcană Tab/Shift+Tab, Escape (poartă → `gateCancel`, sesiune → `endSes(false)`, altfel închide), fundal `inert` + `aria-hidden`, restaurarea focusului pe elementul declanșator; `sesBegin` oprește sesiunea în curs înainte de poartă. Test: features (focus, inert, trap, Escape, restaurare, poarta B nu mai e suprascrisă).
8. **Aplicat.** Regex-ul `NLR` fusese deja extins de agentul medical; am adăugat doar golurile rămase („nu pot să respir”, „greu să respir”, „dificultăți de respirație”, „mă sufoc”, „să mă omor”). Test cu 12 formulări + 8 căutări obișnuite fără fals pozitive.
9. **Aplicat.** `SES.end` + `Math.round((end-now)/1000)`; după o întârziere mare avansează un singur pas; `visibilitychange` cu document ascuns → pauză + anunț; `sesPause()` recalculează `end`; în plus Wake Lock (cerut la start/reluare, eliberat la sfârșit, cu try/catch).
10. **Aplicat.** Prima opțiune „Nu notez” (valoare goală, implicit) → `a:null`; 0 ales explicit se păstrează. Șir existent (deja tradus).
11. **Aplicat** (+ perf 18). `tools/make_pwa.js`: versiunea = sha1 al aplicației (+ etichetă opțională), `PWA_SRC`/`PWA_OUT` pentru teste; SW stale-while-revalidate, doar `res.ok && type==='basic'`, `ignoreSearch` + cheie fără query, `cache:'no-cache'` la revalidare, `cache:'reload'` la precache, ștergere cache-uri `punctum-*` vechi, `icon-maskable-512.png` precache-uit, `register(..., {updateViaCache:'none'})`. `dist/pwa` regenerat (V=punctum-8aeec95fc6); după build-ul următor trebuie rerulat `node tools/make_pwa.js`. Nu am adăugat notificarea „Versiune nouă — reîncarcă” (text vizibil nou + decizie de UX). Test nou `tests/pwa.js` (hash, reproductibilitate, SW real pe localhost: install, offline, query, actualizare cu ștergerea cache-ului vechi, 0 încălcări CSP).
12. **Aplicat.** Meta CSP în `template.html`: `default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; base-uri 'none'; form-action 'none'`. `make_pwa.js` o rescrie pentru PWA (+`'self'`, `manifest-src`, `worker-src`). Verificat: 0 încălcări în 19 vizualizări + sesiune + descărcare blob; `fetch` extern blocat. Test: adversarial.
13. **Aplicat.** Plan fără zile eliminat în `normExtra` (și sărit în `icsBuild`); UID stabil `punctum-{k}{i}-{HHMM}-{zile}@punctum.local` (sufix doar pentru dubluri exacte). Test.
14. **Aplicat.** `+x.t<8.64e15`. Test (jurnal fără NaN).
15. **Aplicat.** `icsFold` pe octeți UTF-8 (≤75). Test.
16. **Parțial.** `exMode` resetează `EX.res/EX.tip` (aplicat, testat). Alternativa de tastatură pentru examen pe SVG NU a fost făcută (necesită design nou: cursor pe hartă).
17. **Aplicat.** `cst()` normalizează `done/ans` (obiect simplu, nu tablou). Test pe 3 forme greșite.
18. **Parțial.** Fără comportament nou (nu am extins cererile `ask` la sesiuni simple, ar bloca/obloga excesiv presopunctura ușoară): am clarificat în tabul Profil ce filtrează efectiv poarta la sesiunile simple (sarcină, anticoagulante, cancer, circulația și sensibilitatea picioarelor, limfedem). Decizie medicală pentru dumneavoastră dacă osteo/pacemaker/hernie trebuie să apară și acolo.
19. **Aplicat.** `SES.dur` pe sesiune (rutina nu mai modifică `SES.sec`); selectorul din sesiune setează ambele (alegere explicită a utilizatorului). Test.
20. **Aplicat.** Fără `setTimeout(done,500)` la imprimare (`afterprint` + plasă de siguranță 120 s), revocare blob 30 s (`dl` și `rtnExport`), `stImportFile` resetează input-ul și are `onerror`, `jrDel` cere confirmare (șir nou în `HX`).

## B. audit2_perf.md (doar accesibilitate/robustețe/SW)

- **#5 dialog** – aplicat (vezi A7). **#6 tick** – aplicat (A2). **#7** – aplicat: regiune stabilă `#sesLive` (`role=status`, în afara modalului) anunță „Pasul i din n: punct, s secunde” la schimbarea pasului, „Încă 5 secunde” o dată, pauză/reluare; cronometrul vizual `aria-hidden`; test: 0 mutații în `#sesLive` și în modal pe 2,6 s.
- **#11** – parțial: `nav` nu se mai reconstruiește (focusul rămâne pe link), `aria-current="page"`; NU am scos `aria-live` din `<main>` și nu mut focusul la schimbarea rutei (risc pentru testele de rutare, nesolicitat).
- **#12 ținte tactile** – aplicat: `#thm` 44×44, `header select/input`, `nav a`, `button.b`, `select`, `.opt` ≥44 px; `.tag a`/`a.tag` cu zonă de atingere extinsă prin `::after` (aspect neschimbat); casete 24 px + rânduri de 44 px; butoanele hărților (`chip`, zoom, `ezl`) 44 px; punctele de pe hărți: raza zonei de atingere crește până la ≈22 px pe ecran, limitat la jumătate din distanța până la cel mai apropiat vecin (fără suprapuneri noi; pe harta densă „front” rămâne ≈18 px, pe celelalte 36–41 px).
- **#13** font ≥16 px pentru input/select/textarea (inclusiv `#rtn-io`). **#15** reflow la text 150 % pe 320 px: 0 depășiri în toate vizualizările (grila Hărți `minmax(0,1fr)`, `label` cu `select` în `.bar`, logo, `overflow-wrap`).
- **#16** etichete în limba curentă: `skip`, `search`, `lang`, `theme` (cu modul curent), `navMain`, `fav` (stea: „Favorit: LI4 Hegu”, `aria-pressed`), `sPrev/sPause/sResume/sNext/sStop/sDur`, șabloanele de anunț — adăugate în `I18N` pentru toate cele 8 limbi (le-am scris eu; verificați formularea). În `template.html` valorile implicite sunt acum românești.
- **#17 contrast** – aplicat: `h3.ec` (elemente) cu `color-mix` în dark (min 6,9:1), `html.hc.hc h2.cc/h3.ec` în contrast ridicat. Test în a11y.js (dark, hc+lumină, hc+dark).
- **#18 SW** – aplicat (A11). **#20** – aplicat (A9).

## Șiruri românești noi (de tradus)
„Importat. Verifică acum profilul de siguranță: a fost înlocuit cu cel din fișier.”; „Importat. Fișierul nu conținea profil de siguranță, deci profilul tău a fost șters. Completează-l din nou.”; „Nu s-a putut salva (spațiu insuficient sau stocare blocată). Datele curente au rămas neschimbate.”; „Ștergi această intrare din jurnal?”; paragraful nou din tabul Profil („Profilul marchează puncte, variante, …”). `Nu notez` și celelalte există deja.

## De reținut pentru agentul următor
- Dacă mutați blocurile i18n sau schimbați `template.html`, păstrați meta CSP în `<head>` și `#sesLive` după `#modal`; `91_modal.js` presupune `#modal` și `#sesLive` ca frați direcți ai lui `body`.
- Regulă pentru viitor: scrierile în `#modal` pot rămâne `innerHTML=` (observatorul sincronizează dialogul), dar redesenările periodice trebuie să actualizeze nodurile pe loc.
- După orice build nou: `node tools/make_pwa.js` (versiunea SW se schimbă automat).
- `en.json`: `Data→Date` și `Date→Data` trebuie rezolvate (corect: antetul de tabel „Data”→„Date”, titlul „Date” → de ex. „Data records”); fr.json: `Data`→`Données` devine corect doar dacă antetul trebuie să fie „Date”.
