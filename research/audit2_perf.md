# PUNCTUM v2.4 — audit independent: performanță, accesibilitate, UX mobil

Data: 2026-11-04. Fișier auditat: `dist/punctum.html` (4 794 607 B) și `dist/pwa/` (neatins; nimic modificat în `src/`, `tests/`, `dist/`).
Metodă: Playwright + `/usr/bin/google-chrome`. Profil „telefon" = 360×740, DPR 3, touch, CPU încetinit 4× (CDP), mediană din 5 rulări; „desktop" = 1280×800, fără throttling. Prototipurile de remediere au fost aplicate doar pe copii din scratchpad.
Scripturile de măsurare sunt în `/tmp/claude-0/-home-claude/1bcd1944-c999-533e-a4ea-bb6ea4485045/scratchpad/` (m1–m11.js, a1–a9.js, sw1.js, net.js).

## 0. Cifre de bază

### Încărcare (fișier local, ro)
| Metrică | telefon 4× | desktop |
|---|---|---|
| FCP (doar antet, `main` încă gol) | 244 ms | 112 ms |
| Primul conținut real (LCP, hero Acasă) | 936 ms | 272 ms |
| DOMContentLoaded / load | 851 / 919 ms | 248 / 253 ms |
| Interactiv (sfârșitul ultimului long task) | ≈ 850 ms (2 long tasks: 173 + 194 ms) | ≈ 190 ms (1 × 65 ms) |
| CPU script / layout / style | 93 / 82 / 18 ms | 27 / 25 / 5 ms |
| Același, limba `de` | LCP 1000 ms, script 153 ms | LCP 284 ms |

Aceeași pagină **fără blocurile i18n** (copie de test): LCP telefon 528 ms (-44 %), un singur long task de 152 ms.

### Rețea (servit cu gzip nivel 6, throttling + CPU 4×)
| Rețea | fișier actual | doar mutat i18n după script | fără i18n (lazy) |
|---|---|---|---|
| Slow 4G (1,6 Mbps, 150 ms) | LCP **8,0 s**, load 8,3 s | LCP **1,57 s**, load 8,0 s | LCP 1,60 s, load 1,63 s |
| Fast 4G (9 Mbps, 60 ms) | LCP 1,71 s | LCP 0,58 s | LCP 0,58 s |

### Memorie (după GC)
- Heap JS: 3,0 MB la încărcare (ro); 3,5 MB după vizitarea a 8 vizualizări; +0,8–1,1 MB per limbă încărcată, nimic nu se eliberează → 10,1 MB după trecerea prin toate cele 8 limbi.
- RSS proces randare: 368 MB față de 350 MB pentru aceeași pagină fără blocurile i18n → **≈ 18 MB** doar din textul JSON rămas în DOM.
- DOM: 141 noduri pe Acasă; 5 487 pe `pts`; 2 176 pe `cond`.

### Compoziția fișierului (octeți / gzip)
| Parte | Octeți | % | gzip |
|---|---|---|---|
| Dicționare i18n, 7 limbi (en 475 515, de 522 254, es 521 221, fr 544 907, hu 520 774, it 507 685, pt 501 762) | 3 594 118 | 74,9 % | 152–168 KB fiecare, ≈ 1 127 KB total |
| `i18n-keys` (textul românesc al celor 6 034 de chei) | 492 217 | 10,3 % | 156 KB |
| Date în JS (pts 115 KB, cond 67, curs 116, var 62, quiz 50, masaj 85) | ≈ 495 000 | 10,3 % | — |
| Cod JS + date mici | ≈ 212 000 | 4,4 % | — |
| CSS | 7 982 | 0,2 % | 2,6 KB |
| Imagini / SVG inline | ≈ 0,4 KB (doar favicon data-URI) | ~0 | — |
| **Total** | 4 794 607 | 100 % | **1 511 334** |

85 % din fișier sunt dicționare. Cheile românești sunt duplicate: 5 681 din 6 034 apar și literal în JS (448 KB). Un utilizator român (limba implicită) descarcă, parsează și ține în memorie 4,1 MB de care nu se folosește niciodată. Minificarea JSON-urilor de date nu aduce nimic (-3,7 KB, -179 B gzip: sunt deja compacte).

---

## Constatări, ordonate după câștig / efort

### 1. Dicționarele i18n blochează primul randare (script-ul vine după 4 MB de JSON)
- **Măsurat:** `template.html` pune `{{I18N}}` înaintea `<script>`. Parserul trebuie să tokenizeze 4 MB de text înainte ca aplicația să pornească. Telefon 4×: LCP 1000 → 548 ms (-45 %) doar prin mutarea blocurilor după script; Slow 4G: **8,0 s → 1,57 s**; Fast 4G: 1,71 → 0,58 s.
- **Cauză:** ordinea din `src/template.html`.
- **Propunere (≈ 5 minute):** în `template.html` mută linia `{{I18N}}` de după `<div id="modal"></div>` la finalul `<body>`, după `<script>{{JS}}</script>`. Pentru limbile ≠ ro, `99_init.js` trebuie să reia traducerea după ce dicționarul există: în `90_i18n_dom.js`, `i18nDict` nu trebuie să cache-uiască `null` când elementul lipsește; adaugă la sfârșit `document.addEventListener('DOMContentLoaded',()=>{if(S.lang!=='ro'){render();trAll()}})`. Build-ul și testele rămân neschimbate.
- **Câștig:** −45 % LCP pe telefon, −80 % pe rețea lentă; zero pierdere funcțională.
- **Risc:** mic; singurul caz de verificat este pornirea directă într-o limbă ≠ ro (flash scurt de text românesc, o singură dată).

### 2. Atingerea unei stele (favorit) re-randează toată lista de 410 carduri
- **Măsurat:** `click` pe `.star` = 536–624 ms pe telefon 4× (desktop ≈ 150 ms). Peste pragul INP „slab" (500 ms). Cu `content-visibility` (nr. 3) coboară la 120–190 ms.
- **Cauză:** `toggleFav` (`08_helpers.js`) apelează `renderPtsList()` — reconstruiește 285 KB HTML și face un layout complet (386 ms din 585 ms).
- **Propunere:**
```js
function toggleFav(c,p,btn){const k=c+'|'+p;const i=S.fav.indexOf(k);if(i<0)S.fav.push(k);else S.fav.splice(i,1);save();
  if(view()==='pts'&&!PF.fav&&btn){btn.textContent=i<0?'★':'☆';btn.setAttribute('aria-pressed',i<0)}
  else if(view()==='pts')renderPtsList();else render();}
```
și în `ptCard`: `onclick="toggleFav('…','…',this)"`.
- **Câștig:** 540–620 ms → < 30 ms per atingere. **Risc:** foarte mic.

### 3. Lista de puncte: layout de 386 ms pentru 410 carduri (136 000 px înălțime)
- **Măsurat (telefon 4×):** generarea șirului HTML = 6 ms, `innerHTML` = 74 ms, **layout forțat = 386 ms**, deci problema este layout-ul, nu JS. Deschiderea `#pts`: 585 ms. Tastare în filtru: 520 / 366 / 370 / 416 ms.
- **Propunere (o regulă CSS):**
```css
.card.pt{content-visibility:auto;contain-intrinsic-size:auto 250px}
#plist{contain:layout style}
```
(250 px ≈ media reală: 101 753 px / 410 carduri; cu 330 px bara de defilare sare cu 13 %.)
- **Măsurat cu regula injectată:** deschidere 585 → **147 ms** (-75 %); tastare 520 → 118 ms și 366–416 → 83–99 ms; desktop 144 → 44 ms. Căutarea în pagină (Ctrl+F) și navigarea cu Tab rămân funcționale.
- **Risc:** mic; ancorele `#pt-LU1` și `scrollIntoView` funcționează, dar verifică pe iOS ≥ 18 (suport `content-visibility`); pe browsere vechi regula este ignorată.

### 4. Filtrarea punctelor și căutarea din antet: fără debounce, cu recalculări
- **Măsurat (durata evenimentului `input`, telefon 4×):** filtru `#pq`: primul caracter 712–2224 ms, apoi 328–472 ms per tastă; antet `#q` 56–144 ms per tastă („durere de cap", 13 taste); cu 1 caracter pe `#pts`, `doSearch` apelează `render()` (440 ms) la fiecare ștergere sub 2 caractere.
- **Cauză:** `renderPtsList` rulează sincron la fiecare tastă; `filterPts` face `MER.find` + concatenare + `toLowerCase` pentru fiecare punct la fiecare tastă; `doSearch` reconstruiește `MASS/MASC.map(...hay...)` la fiecare tastă și re-randează vizualizarea la `v.length<2`.
- **Propunere:**
  1. Debounce 120 ms: `oninput="PF.q=this.value;clearTimeout(window.__pt);window.__pt=setTimeout(renderPtsList,120)"` (la fel pentru `#q`).
  2. Precalculează o dată: `PT.forEach(p=>p._h=(p.c+' '+p.p+' '+p.l+' '+p.u+' '+p.tg+' '+p.mn+' '+(MERN[p.m]||'')).toLowerCase())` cu `MERN` ca obiect cod→nume; la fel pentru `hay` la masaj.
  3. În `doSearch`, la `v.length<2` apelează `render()` doar dacă interfața afișează rezultate de căutare (flag), nu mereu.
- **Câștig:** latență per tastă pe telefon 330–470 → ≈ 100 ms (împreună cu nr. 3, ≈ 60 ms); fără lucru în plus pe taste intermediare. **Risc:** mic.

### 5. Poarta de siguranță și sesiunea: fără dialog accesibil (focus, trap, Escape, roluri)
- **Măsurat (tastatură, Playwright):** după Enter pe „Pornește sesiunea ghidată", focusul **rămâne pe butonul din fundal** (nu intră în fereastră); 14 Tab-uri consecutive parcurg doar elementele din pagina din spate (`SUMMARY` ×14), niciodată cele din modal; Escape nu închide (modalul rămâne deschis); `role`/`aria-modal`/`aria-labelledby` lipsesc; fundalul nu e `inert`. Același tipar la „Sesiune încheiată" și „Sesiune oprită".
- **Impact:** utilizatorii de cititor de ecran și tastatură nu pot parcurge lista „Nu începe dacă ai oricare dintre…" (poarta de siguranță a aplicației) și o pot ocoli fără să o vadă. Este cea mai gravă problemă de accesibilitate.
- **Propunere (≈ 20 linii, testată pe copie):** în `99_init.js` (sau un `91_modal.js`) adaugă observatorul de mai jos. Rezultat verificat: focusul intră pe primul control, Tab/Shift+Tab ciclează în modal, Escape închide (gate → `gateCancel()`, sesiune → `endSes(false)`) și focusul revine la butonul declanșator; fundalul e `inert`.
```js
(function(){const M=document.getElementById('modal');let last=null;
 const sel='button:not([disabled]),input:not([disabled]),select,[href],[tabindex]:not([tabindex="-1"])';
 function sync(){const box=M.querySelector('.box');const bg=[...document.body.children].filter(e=>e!==M&&e.tagName!=='SCRIPT');
  if(!box){bg.forEach(e=>e.inert=false);if(last){try{last.focus()}catch(e){}last=null}return}
  if(!M.dataset.open){M.dataset.open=1;last=document.activeElement}
  bg.forEach(e=>e.inert=true);const m=M.firstElementChild;m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');
  const h=box.querySelector('h2');if(h){h.id='mdl-t';m.setAttribute('aria-labelledby','mdl-t')}
  if(!M.contains(document.activeElement)){const f=box.querySelector(sel);if(f)f.focus()}}
 new MutationObserver(()=>{if(!M.firstElementChild)delete M.dataset.open;sync()}).observe(M,{childList:true});
 M.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();if(GATE)gateCancel();else if(SES.on)endSes(false);else M.innerHTML=''}
  if(e.key==='Tab'){const f=[...M.querySelectorAll(sel)];if(!f.length)return;const a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});})();
```
- **Câștig:** conformitate WCAG 2.1.2/2.4.3/4.1.2 pentru ecranul de siguranță. **Risc:** mic; `inert` este suportat în toate browserele actuale (Safari ≥ 15.5).

### 6. Sesiunea ghidată reconstruiește tot modalul în fiecare secundă (focus pierdut, animație stricată)
- **Măsurat:** butonul Pauză focusat, apoi 2,6 s: `document.activeElement` = `BODY`; butonul nu mai e în DOM după 1,2 s. Un utilizator de tastatură nu poate apăsa Pauză/Următorul (după fiecare secundă Tab reîncepe de la începutul paginii). Cerc de respirație (`.breath`, ciclu CSS 8 s, scară 0,7 → 1,05): eșantionat la 500 ms oscilează doar **0,70–0,74**, pentru că animația repornește de la 0 la fiecare `innerHTML`. Ghidajul „inspiră 4 s / expiră 6 s" este deci vizual nefuncțional. Cost: 35–51 ms per tick (telefon 4×), nesemnificativ ca performanță, dar re-traducerea MutationObserver rulează inutil în fiecare secundă pentru limbile ≠ ro.
- **Propunere (1 linie, testată):** în `tick()` din `10_views.js`, actualizează doar numărătoarea când pasul nu se schimbă:
```js
function tick(){
  if(SES.paused)return;SES.left--;
  if(SES.left<=0){beep(660);if(SES.i<SES.pts.length-1){SES.i++;SES.left=stepSec(SES.i)}else{endSes(true);return}drawSes();return}
  const b=document.querySelector('#modal .breath');if(b)b.textContent=SES.left;else drawSes();
}
```
- **Verificat pe copie:** focusul pe Pauză se păstrează după 2,6 s; scara cercului parcurge 0,70 → 1,05 → 0,90 conform CSS. La schimbarea pasului `drawSes()` tot reconstruiește, dar acolo e acceptabil (ar fi bine ca modalul din nr. 5 să readucă focusul pe același buton: păstrează `id` pe butoane și re-focusează `#'+id`).
- **Câștig:** sesiune utilizabilă cu tastatura; animație de respirație corectă; −35 ms CPU/secundă. **Risc:** foarte mic.

### 7. Cronometrul nu e anunțat; butoanele de control nu au etichete
- **Măsurat:** în modal nu există `aria-live`, `role=status` sau `role=timer`; `.breath` e un `<div>` simplu. Butoanele `◀`, `❚❚`, `▶`, `✕` nu au `aria-label` (nume accesibile: simbolurile Unicode), 39 px înălțime. `<main aria-live="polite">` este singurul aria-live din pagină.
- **Propunere:** în `drawSes()` adaugă `aria-label`: „Punctul anterior", „Pauză"/„Reia", „Punctul următor", „Oprește sesiunea" (prin `T()`/dicționar, pentru 8 limbi). Un element stabil în afara zonei reconstruite: `<div id="sesLive" role="status" aria-live="polite" class="vh"></div>` (clasa `.vh` = „visually hidden"), actualizat doar la schimbarea pasului („Pasul 3 din 8: ST36 …, 60 de secunde") și la ultimele 5 s o singură dată („Încă 5 secunde"). Cronometrul vizual rămâne `aria-hidden` (anunțarea în fiecare secundă ar fi zgomot).
- **Câștig:** sesiune folosibilă cu cititor de ecran. **Risc:** mic.

### 8. Dicționarele i18n se încarcă integral, chiar pentru utilizatorii români (−85 % la PWA, −50 % la fișier)
- **Măsurat:** vezi „Compoziția fișierului". Fără blocurile i18n, pagina are 675 756 B (≈ 0,23 MB gzip); utilizatorul ro nu folosește niciodată `i18n-keys` (492 KB) sau dicționarele (3,59 MB).
- **Propuneri (nu se exclud):**
  1. **PWA (cel mai mare câștig):** `tools/make_pwa.js` scoate blocurile din `index.html` și le scrie ca `i18n/<lang>.json` (+ `keys.json`). `i18nDict` face `fetch('i18n/'+l+'.json')` la `setLang` (cu spinner scurt) și `sw.js` le precache-uiește în fundal la `activate` (nu blochează instalarea). Prima încărcare ro: 4,79 MB (1,51 MB gzip) → 0,71 MB (≈ 0,23 MB gzip): **-85 %**. Offline rămâne complet funcțional.
  2. **Fișier unic:** `build.py --langs ro,de` produce variante „ușoare" (ro + o limbă ≈ 1,2 MB); sau comprimă blocurile: deflate-raw + base64 în `<script type="text/plain">`, decomprimare cu `DecompressionStream('deflate-raw')` (Chrome 80+, Safari 16.4+, Firefox 113+) la primul `setLang` (necesită ca `setLang` să devină asincron). Fișier unic: **4,79 → ≈ 2,42 MB (-50 %)** (calculat: restul 707 838 B + 1 710 304 B base64). Pe HTTP gzip nu mai câștigă nimic față de acum, deci sensul e dimensiunea fișierului partajat.
- **Câștig:** vezi nr. 1 (LCP) + descărcare/instalare PWA −85 %, −18 MB RSS (nr. 19). **Efort:** mediu. **Risc:** mediu (cale asincronă în `setLang`/`trAll`; testele `i18n_*` trebuie adaptate).

### 9. Cheile românești sunt stocate de două ori (în JS și în `i18n-keys`)
- **Măsurat:** 6 034 chei, 473 800 B text; 5 681 chei (447 813 B) apar literal și în JS.
- **Propunere:** înlocuiește tabloul de chei cu hash-uri FNV-1a pe 32 de biți ale șirului normalizat (`trNorm`). Calculat pe datele reale: **0 coliziuni** din 6 034; lista de hash-uri în hex = 53 876 B (gzip 31 768 B) față de 498 250 B (gzip 156 168 B). Dicționarele devin obiecte `{hash:traducere}` sau rămân tablouri aliniate. La rulare `trText` calculează hash-ul textului (un ciclu pe caractere, ≈ microsecunde) în loc de lookup pe șir. `build.py` verifică lipsa coliziunilor și oprește build-ul dacă apar.
- **Câștig:** -444 KB din fișier (-9 %), ≈ -125 KB gzip; JSON.parse al cheilor la prima schimbare de limbă: mai rapid. **Efort:** mic–mediu (`build.py` + `90_i18n_dom.js` + `trWhole`). **Risc:** mic (verificare automată la build).

### 10. Traducătorul rulează degeaba pe conținut care nu se traduce (și de două ori la `setLang`)
- **Măsurat (telefon 4×, `de`):** `#pts`: 3 685 noduri text sub `#plist`, **toate** fără traducere (conținutul educațional e în română, conform notei din aplicație) → `trNode` totalizează 132 ms din 769 ms pe deschiderea vizualizării și ≈ 130 ms din fiecare tastă în filtru. `setLang('de')` pe `pts`: **920 ms** (653 ms înapoi la `ro`); pe `cond` 213 ms; pe `masaj` 175 ms. `setLang` face `render()` (observatorul traduce nodurile adăugate) și apoi `trAll()` (traversează încă o dată tot corpul: 60 ms pe `pts`).
- **Cauză:** `trNode` nu poate exclude subarbori; `setLang` dublează munca.
- **Propunere:** (a) marchează zonele doar-ro cu `data-notr` (de exemplu `<div class="grid" id="plist" data-notr lang="ro">`) și în `trNode` refuză subarborii `closest('[data-notr]')` (la `acceptNode` și în `MutationObserver`); (b) în `setLang` apelează `trAll()` doar pe `header,footer,nav` (restul îl traduce observatorul); (c) recomandat: atributul `lang="ro"` pe zonele neglijate rezolvă și pronunția greșită a cititoarelor de ecran (altfel textul românesc e citit cu vocea germană, WCAG 3.1.2).
- **Câștig:** −130 ms per randare/tastă pe `pts` în limbi ≠ ro; `setLang` pe `pts` 920 → ≈ 650 ms (și mai puțin cu nr. 3). **Risc:** mic.

### 11. Navigarea: focus pierdut, fără `aria-current`, `aria-live` pe tot `<main>`
- **Măsurat:** Enter pe un link din `#nav` → `document.activeElement` = `BODY` (renderNav înlocuiește `#nav.innerHTML`); la fel după butoanele de filtru din Masaj (`render()`); `aria-current` lipsește pe elementul activ; `<main aria-live="polite">` înseamnă că, la fiecare schimbare de vizualizare, un cititor de ecran poate încerca să citească întregul conținut nou (pe `#pts`: 285 KB de HTML, 3 685 noduri text); schimbarea de rută nu mută focusul.
- **Propunere:** (1) `renderNav`: emite `aria-current="page"` pe linkul activ și păstrează elementul focusat (actualizează clasele în loc de `innerHTML`, sau refocusează după redesenare); (2) elimină `aria-live` din `<main>` (`template.html`) și, după `render()` provocat de `hashchange`, `main.focus({preventScroll:true})` (are deja `tabindex=-1`) plus un `<div role="status" class="vh" id="rt">` cu titlul `h1` al paginii; (3) la butoanele de filtru din Masaj/Durere actualizează în loc (sau re-focusează după `render()`).
- **Câștig:** orientare corectă pentru tastatură/cititor de ecran, fără anunțuri de zeci de KB. **Risc:** mic–mediu (verifică testele `tests/run.js`).

### 12. Ținte tactile sub 44 px
Măsurat la 360 px (`getBoundingClientRect`), controale vizibile, excluzând linkurile din text:
| Element | Dimensiune | Apariții |
|---|---|---|
| Buton temă `#thm` | **28×32** | pe toate paginile |
| Căutare `#q` / selector limbă | 35 / 34 px înălțime | toate |
| Linkuri din `#nav` | 34–37 px | 18 |
| `button.b` | 35–39 px | 47 pe Masaj, 136 pe Afecțiuni |
| `a.tag` (cod punct) | **23 px înălțime**, 48 px lățime | 227 pe Afecțiuni |
| Puncte pe hărți (`g.p`) | **16×16** | 235 |
| Casete de bifat | 13–20 px (label-ul le acoperă în poartă) | 5 pe Durere, 9 pe Profil |
| Butoanele sesiunii ◀ ❚❚ ▶ ✕ | 45–56 × **39** | 4 |
| `.pt .star` | 44 min (corect) | 410 |
- **Propunere (CSS):**
```css
header .ib,header select,header input[type=search],nav a,button.b,select,.opt,summary{min-height:44px}
button.ib{min-width:44px}
nav a{display:inline-flex;align-items:center}
.tag a{display:inline-block;padding:.55rem .5rem;margin:-.4rem -.1rem}  /* zonă de atingere, aspect neschimbat */
input[type=checkbox]{width:24px;height:24px}
.p,.zn{/* pe SVG: adaugă un cerc transparent r≥22 în unități de ecran pentru punctele de pe hărți */}
```
- **Câștig:** erori de atingere mai puține pe telefon; conformitate WCAG 2.5.5. **Risc:** mic; antetul crește cu ≈ 10 px (vezi nr. 14).

### 13. Câmpuri sub 16 px provoacă zoom automat pe iOS Safari
- **Măsurat (font-size calculat):** `#q` 15,2 px; toate `select` 14,4 px (19 apariții); `#pq`, `#vq`, `#gq`, nume rutină, `#rtn-q`, `#cnd-q` 13,33 px; `textarea#rtn-io` 13 px; `input[type=number]` 13,33 px.
- **Propunere:** `input,select,textarea{font-size:max(16px,1rem)}` (adaugă la `style.css`).
- **Câștig:** fără salturi de zoom la focus pe iPhone. **Risc:** foarte mic (câmpurile devin puțin mai înalte).

### 14. Antetul „sticky" ocupă 21 % din ecran (41 % la 150 % text / telefon cu ecranul pe orizontală)
- **Măsurat:** 154 px din 740 px la 360×740 (rânduri: logo 54 + căutare 44 + nav 45 = 21 %); 196 px din 640 px la 320×640 (31 %); la text mărit 150 %: 293–294 px din 723–743 px (**39–41 %**); în peisaj (740×360) ar fi ≈ 43 %. Nav are 18 elemente cu defilare orizontală fără indiciu vizual.
- **Propunere:** pe ecrane mici păstrează `position:sticky` doar pentru rândul căutare; `nav` nu lipit: `@media(max-width:720px){header{position:static}.top{position:sticky;top:0;background:var(--card)}}` sau ascunde `nav` la defilare în jos. Opțional `mask-image` pe margini ca indiciu de defilare.
- **Câștig:** +100–140 px de conținut vizibil pe telefon; mult mai utilizabil cu text mărit. **Risc:** mic–mediu (decizie de design).

### 15. Text mărit la 150 %: depășire orizontală
- **Măsurat (`ACC_FZ[3]=1.5`):** la 320 px *fără* mărire nu există defilare orizontală (toate cele 18 vizualizări OK). Cu text 150 % apare pe **toate**: `.logo`/`#sub` (`white-space:nowrap`) ajung la 361 px; `scrollWidth` 382 px pe `pts` (`select#pm`), 400 px pe `refs` (rând fără wrap), 367 px pe `maps` (formular `#mpForm`), 362 px pe `quiz` (`label.mut`+`select`).
- **Propunere (CSS):**
```css
.logo,.logo small{white-space:normal;overflow-wrap:anywhere}
.top select,.bar select,.bar input,.top input{max-width:100%;min-width:0}
main{overflow-wrap:anywhere}  /* referințe cu URL lungi */
#mpForm,.mpc{flex-wrap:wrap}
```
- **Câștig:** fără defilare pe două axe (WCAG 1.4.10 reflow) la text mărit. **Risc:** mic.

### 16. Etichete accesibile englezești în limba română și în celelalte limbi; stea fără nume
- **Măsurat:** în `ro`: „Skip to content", `aria-label` „Search", „Language", „Theme", „Main" (engleză) — nu există traducere pentru `ro`, iar în `de` rămân tot englezești. `.star` are `aria-label="fav"` pe toate cele 410 butoane (în `de` → „Fav"), fără `aria-pressed`; nu spune care punct e marcat.
- **Propunere:** în `applyI18n()` setează din `T()` (adaugă cheile `skip`, `search`, `lang`, `theme`, `navMain`, `fav`): `$('.skip').textContent`, `$('#q').setAttribute('aria-label',…)` etc.; în `ptCard`: `aria-label="${esc(T().fav)}: ${esc(p.c)} ${esc(p.p)}" aria-pressed="${fav}"`. Adaugă `aria-pressed` pe `#thm` și `aria-label` dinamic cu tema curentă.
- **Câștig:** utilizare corectă cu cititor de ecran în limba aplicației. **Risc:** foarte mic.

### 17. Contrast: 2 probleme reale (temă întunecată și contrast ridicat)
- **Măsurat** (toate cele 18 vizualizări × 4 teme; text normal ≥ 4,5, mare ≥ 3; gradientul hero exclus): **tema deschisă: 0 probleme.** Probleme:
  - Tema întunecată (și hc+dark): `h3` „Foc (Huo)" pe Teorie — `#c0392b` pe `#1c2623` = **2,86 : 1** (culoare inline din `ELC`/elemente).
  - Contrast ridicat pe temă deschisă (`html.hc` fără `data-theme=dark`): `h2.cc` din Variante folosește `color-mix(…,#000)` pe fundal negru → 1,71 / 2,53 / 2,90 : 1 („Stimulare tehnologică", „Presiune și masaj manual", „Auto-practici").
- **Propunere:** (a) h3 elemente: `color:color-mix(in srgb,var(--ec) 45%,#fff)` în tema întunecată (la fel ca `h2.cc`); (b) `html.hc h2.cc{color:var(--acc)}` și `html.hc h3{color:inherit}`. Combinația „temă light + hc" nu ar trebui să folosească deloc culorile semantice închise.
- **Câștig:** conformitate WCAG 1.4.3 în toate temele. **Risc:** foarte mic.

### 18. Service worker: offline funcționează, dar actualizările nu ajung la utilizatori
- **Offline — verificat OK (servit de pe `localhost`):** SW activ și controlând pagina după prima încărcare; cache `punctum-2.4` conține `/`, `index.html`, manifest, `icon.svg`, `icon-192.png`, `icon-512.png`. Cu rețeaua oprită: `index.html`, `/`, `#masaj`, `?utm=1#pts` se încarcă în 580–800 ms cu conținut corect; schimbarea limbii în `de` funcționează offline; 0 cereri eșuate; 0 erori JS.
- **Problemă (reprodusă):** strategia este cache-first fără revalidare, iar singurul declanșator de actualizare este modificarea octeților lui `sw.js`. După ce am schimbat `index.html` pe server (`sw.js` neschimbat), un utilizator cu pagina în cache a rămas la „Versiune 2.4" după încărcare + reîncărcare. Dacă la un build viitor se uită parametrul `<versiune>` din `make_pwa.js` (implicit `2.1`), toți utilizatorii existenți rămân blocați la vechea versiune permanent. În plus, `icon-maskable-512.png` (din manifest) nu e precache-uit.
- **Propunere:** (1) în `make_pwa.js` derivă `V` dintr-un hash al conținutului (`'punctum-'+sha1(html).slice(0,8)`); (2) pentru navigări folosește stale-while-revalidate cu notificare discretă „Versiune nouă — reîncarcă"; (3) adaugă `icon-maskable-512.png` în `FILES`; (4) cu nr. 8, precache-uiește dicționarele în fundal.
- **Câștig:** utilizatorii primesc corecturile (relevant pentru conținut medical). **Risc:** mic.

### 19. Memorie: textul JSON rămâne în DOM și dicționarele nu se eliberează
- **Măsurat:** RSS +18 MB (368 vs 350 MB) din blocurile `<script type=application/json>`; după ce ai trecut prin 8 limbi, `I18N_CACHE` ține 7 dicționare (heap 10,1 MB față de 3,5 MB).
- **Propunere:** în `i18nDict`, după `JSON.parse`, înlocuiește `el.textContent` cu `''` (sau `el.remove()` și păstrează doar obiectul parsat, ținând o singură limbă: `I18N_CACHE={[l]:d}`). Cu nr. 8 problema dispare de la sine.
- **Câștig:** ≈ −18 MB RSS și −6 MB heap în cazul tipic. **Risc:** mic (limba revine la `parse` la întoarcere: 15–31 ms).

### 20. Timer bazat pe numărare de `setInterval`, fără Wake Lock
- **Observat în cod (nemăsurat):** `tick()` scade `SES.left` o dată pe `setInterval(…,1000)`; nu există `visibilitychange`, `Date.now()` sau `navigator.wakeLock`. Pe telefon ecranul se stinge în timpul unei sesiuni de 60 s × N puncte, iar Chrome/Safari throttle-uiesc temporizatoarele în fundal, deci durata reală și cea afișată diferă.
- **Propunere:** stochează `SES.end=Date.now()+left*1000` și recalculează `left=Math.ceil((SES.end-Date.now())/1000)` la fiecare tick și la `visibilitychange`; `navigator.wakeLock?.request('screen')` la `gateGo`, eliberat în `endSes`.
- **Câștig:** sesiune corectă și ecran aprins în timpul presopuncturii (mâinile ocupate). **Risc:** mic.

### 21. `<main aria-live>` și `render()` completă la filtre/Durere
- (Parte din nr. 11.) Funcții precum `drSet`/`drRed` (`28_durere.js`) și butoanele de filtru din Masaj re-randează toată pagina și restaurează doar `scrollY`; focusul și starea `<details>` deschise se pierd. Propunere: re-focus pe elementul cu `data-k` echivalent după `render()`.

### 22. Pagina Masaj și Afecțiuni: acceptabile
- **Măsurat (telefon 4×):** Masaj (44 `<details>`, 1 416 noduri, 103 KB) = 136 ms (build 17 + set 28 + layout 70); Afecțiuni (61 `<details>`, 2 176 noduri, 195 KB) = 106–195 ms; Variante (878 noduri) 49–111 ms; Hărți 68–98 ms. Deschiderea unui `<details>` costă 2 ms; deschiderea tuturor celor 44: 145 ms (înălțime 68 805 px). `content-visibility` pe `details` aduce doar -30 % pe Afecțiuni (106 → 74 ms), nu merită. **Nu e nevoie de acțiune.** Singura vizualizare problematică ca timp de randare este `pts` (nr. 3).

### 23. Nu s-au găsit reflow-uri repetate (layout thrashing)
- Singurele citiri de geometrie sunt `scrollIntoView` (ocazional) și `getBoundingClientRect` în `20_maps.js` (nu în bucle). La `pts` există un singur layout mare (386 ms), nu mai multe. JS-ul de randare e neglijabil (6 ms telefon pentru 410 carduri). Fără constatări suplimentare.

### 24. Duplicarea valorilor între limbi / chei aproape identice
- 60 de grupuri de chei diferă doar prin punctuație finală sau majuscule; în fiecare dicționar 15–20 de valori sunt duplicate. Câștig < 1 %: **nu merită efortul.**

### 25. Verificări trecute (fără acțiune)
- `tests/a11y.js`-tip: fără `id` duplicat, fără `img` fără alt, controale etichetate; poarta de siguranță folosește `<label>` pentru casete; `role="alert"` pentru alarma roșie; `prefers-reduced-motion` și clasa `.rm` respectate; focus vizibil `:focus-visible` 3 px; contrast tema deschisă fără probleme; offline complet; fără defilare orizontală la 320 px fără text mărit.

---

## Rezumat de acțiune (ordine recomandată)
1. Nr. 1 (mută `{{I18N}}` după script) — 5 minute, LCP −45 % / −80 % pe rețea lentă.
2. Nr. 6 (tick în loc) — 1 linie, repară focusul și animația de respirație.
3. Nr. 3 (`content-visibility`) + nr. 2 (stea O(1)) + nr. 4 (debounce) — 3 modificări mici, `pts` 585 → ~150 ms, tastă 520 → ~100 ms, atingere stea 600 → < 30 ms.
4. Nr. 5 + 7 (dialog accesibil, etichete, anunțuri) — cel mai important pentru accesibilitate.
5. Nr. 12–17 (CSS/etichete/contrast) — o jumătate de zi.
6. Nr. 8–10, 18–20 (arhitectură dicționare, SW, timer) — efort mediu, impact mare pe PWA.
