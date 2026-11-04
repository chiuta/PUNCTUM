# PUNCTUM — optimizări de performanță aplicate (audit2_perf.md)

Măsurat cu Playwright + Chrome: telefon emulat 360x740, DPR 3, touch, CPU 4x mai lent, mediană din 3 rulări (încărcare: 5). „Înainte" = build-ul de dinaintea modificărilor; „după" = `dist/punctum.html` curent. Teste: `sh tests/all.sh` = 0 FAIL (i18n_deep: aceleași rămășițe ca înainte, en 77 / celelalte 99 — identice, deci nicio traducere pierdută).

| Metrică (telefon 4x) | înainte | după |
|---|---|---|
| FCP (doar antet) | 256 ms | 312 ms (zgomot; antetul apare în ambele cazuri) |
| LCP / primul conținut în `main` (ro) | 1004 / 994 ms | **532 / 546 ms (-47 %)** |
| Deschidere view `pts` | 655 ms | **196-216 ms (-70 %)** |
| Atingere stea | 598 ms | **23-26 ms** |
| Comutare limbă ro→de pe `pts` | 1351 ms | **336-361 ms (-75 %)** |
| Revenire de→ro pe `pts` | 519 ms | **141-178 ms** |
| Comutare ro→fiecare din 7 limbi (pe `pts`) | 736-1020 ms | 243-377 ms |
| Filtru `pts`, tasta „x" (până la randare, include 130 ms debounce) | 251 ms | 216-239 ms (lucrul efectiv ≈ 100 ms) |
| Filtru `pts`, „st36" (include 130 ms debounce) | 44 ms | 166-174 ms (debounce; fără lucru pe taste intermediare) |
| Text JSON i18n rămas în DOM după vizitarea limbilor | 3 927 896 caractere | 0 (heap JS neschimbat: 10,1 → 10,2 MB după 8 limbi) |

## Constatări

1. **Dicționare i18n după script — APLICAT.** `src/template.html`: `{{I18N}}` mutat după `<script>`. `90_i18n_dom.js`: `i18nDict` returnează `null` (fără a memora absența) cât `document.readyState==='loading'`, ca să nu parseze un bloc incomplet. `99_init.js`: în `ro` randarea e imediată; în altă limbă prima randare se amână la `DOMContentLoaded` (decizie proprie: antet vizibil, `main` gol scurt, în loc de clipire de text românesc într-un atlas medical; pentru acești utilizatori timpul rămâne ca înainte). Single-file și PWA neschimbate (`make_pwa.js` injectează SW tot înaintea ultimului `</body>`). Verificat: ro→en,fr,it,es,pt,de,hu→ro (titlu și navigare tradusă corect), pornire directă în `hu` după reîncărcare. Lazy real (fetch per limbă) și compresia blocurilor (nr. 8) NEAPLICATE: schimbă `setLang` în asincron, cer adaptarea testelor i18n și, pentru PWA, modificări în `make_pwa.js`/`sw.js` (risc mediu, în afara cerinței). Utilizatorul `ro` tot descarcă și ține în DOM ≈ 3,9 M caractere de JSON până la prima schimbare de limbă (inevitabil în fișier unic).
2. **`content-visibility:auto` — APLICAT parțial.** `.pt{content-visibility:auto;contain-intrinsic-size:auto 250px}` + `@media print{.pt{content-visibility:visible}}` (tipărirea nu sare carduri). Testele (ancore, a11y, căutare, adversarial) trec. NEAPLICAT pe Masaj/Afecțiuni: auditul măsoară 106→74 ms pe Afecțiuni (-30 %) și 136 ms pe Masaj (deja acceptabile); `<details>` + `content-visibility` ar complica ancorele și deschiderea cu `open`, fără câștig.
3. **Stea fără re-randare — APLICAT.** `toggleFav(c,p,btn)` (`08_helpers.js`) actualizează doar butonul (`★/☆`, `aria-pressed`); lista se redesenează doar dacă `PF.fav` e activ. În celelalte vizualizări (căutare, hărți) nu mai face `render()` (selecția/căutarea rămân). 598 → 23-26 ms.
4. **Debounce — APLICAT.** `dbRun(cheie,fn,130)` pentru `#pq` și `#q`; `renderPtsList` iese dacă `#plist` nu mai există (navigare în timpul debounce-ului). Text de căutare precalculat o dată per obiect (`hayOf`/WeakMap) pentru puncte (cu numele meridianului din `MERN`) și masaj. `doSearch` cu <2 caractere re-randează doar dacă `#main` arată rezultate de căutare (flag `SRCH`, resetat în `render()`). NEAPLICAT debounce pe `#vq` (variante), `#cnd-q` (afecțiuni), `gq` (glosar): liste mici/medii, în afara cerinței.
5. **Traducător mai ieftin — APLICAT parțial.** `trNode`: TreeWalker fără callback JS per nod; `trText` și atributele sar peste șiruri fără nicio literă (`/\p{L}/u`) — fără pierderi (cheile conțin toate litere; verificat pe `de.json`). `setLang` apelează `trShell()` (tot corpul mai puțin `main`, a cărui reconstrucție e tradusă de observator) în loc de `trAll()`, evitând a doua traversare. NEAPLICAT `data-notr`/`lang="ro"` pe `#plist`: ptCard conține etichete traduse („Localizare:", regiuni, „Puncte extra"), deci excluderea subarborelui ar pierde traduceri; i18n_deep ar fi putut ridica rămășițe noi. Posibilă îmbunătățire ulterioară: memo pe șir.
6. **JSON brut din DOM — APLICAT.** După `JSON.parse`, `textContent` al blocului limbii (și al `i18n-keys`) se golește; dicționarul parsat rămâne în `I18N_CACHE` (nu se poate re-parsa un bloc golit, deci nu se evacuează dicționare). Câștig: ≈ 3,9 M caractere (≈ 7-8 MB UTF-16, RSS estimat de audit ≈ 18 MB) eliberate după ce toate limbile au fost folosite; fără schimbare pe heap JS.
7. **Altele.** Nr. 9 (hash-uirea cheilor) NEAPLICAT, conform instrucțiunii (risc de coliziuni, depanare mai grea). Nr. 4 din audit (puncte 2-3) acoperite mai sus. Nr. 5-7, 11-20 din audit (accesibilitate, CSS tactil, contrast, SW, timer) nu țin de această sarcină (aplicate de alți agenți, `audit2_cod_aplicat.md`) — `tick()` și `91_modal.js` erau deja în starea corectată.

Fișiere modificate: `src/template.html`, `src/style.css`, `src/js/08_helpers.js`, `src/js/09_router.js`, `src/js/10_views.js`, `src/js/11_render.js`, `src/js/90_i18n_dom.js`, `src/js/99_init.js`. `dist/punctum.html` reconstruit; `dist/pwa/` nu a fost regenerat (testul PWA își generează propria ieșire). Fără commit.
