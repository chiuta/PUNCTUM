# Audit adversarial independent — cod nou PUNCTUM v2.4 (25_masaj, 26_profil, 27_eu, 28_durere + integrări)

Metodă: citire integrală a 25–28, 10_views (SES/tick/drawSes/doSearch), 01_i18n (load/save), 90_i18n_dom, 21_conditions (rutine, print), 09_router, 99_init, tools/make_pwa.js, template.html; scripturi Playwright scrise în scratchpad (nu în proiect), rulate pe `dist/punctum.html` (build 13:00). Suita existentă `tests/all.sh` trece (0 FAIL), deci defectele de mai jos nu sunt acoperite de teste.
„verificat" = reprodus într-un browser real; „teoretic" = rezultă din cod, neverificat în execuție.
Nimic din src/, tests/, dist/ nu a fost modificat.

## Rezumat pe severități
mare: 2 · mediu: 9 · mic: 9 (20 constatări)

---

## MARE

### 1. [mare · verificat] Buclă infinită MutationObserver → pagina îngheață în EN (tab „Setări" și „Jurnal")
- Fișier: `src/js/90_i18n_dom.js:34-37` (trWatch) + `src/i18n/en.json` (cheile `"Data"` și `"Date"`). Folosite de `27_eu.js` (`<h3>Date</h3>` în euSetari; `<th>Data</th>` în euJurnal).
- Cauză: în en.json `"Data"→"Date"` și `"Date"→"Data"`. Observerul traduce textul, scrierea `n.data=` generează o mutație `characterData`, observerul o retraduce înapoi, la infinit (microtask-uri, thread-ul nu mai respiră).
- Repro: `localStorage.punctum={"lang":"en"}` → `#eu`, `EU.tab='setari'; render()` → `page.evaluate` nu se mai întoarce (>6 s). Idem tab „Jurnal" când există ≥1 intrare (antetul „Data"). Control: jurnal gol în EN → fără blocaj. Efect: în engleză jurnalul nu poate fi folosit deloc, iar import/export/reset sunt inaccesibile.
- Efecte colaterale (lanțuri, fără ciclu), verificate: FR `<th>Data</th>` devine „Données" (corect: „Date"); HU `<h3>Azi</h3>` din tabul Plan devine „K" („Azi"→„Ma"→„K", fiindcă „Ma" e și abrevierea zilei de marți).
- Corectură minimă (rădăcina: observerul își procesează propriile scrieri):
```diff
--- a/src/js/90_i18n_dom.js
+++ b/src/js/90_i18n_dom.js
-  const obs=new MutationObserver(ms=>{if(S.lang==='ro')return;const d=i18nDict(S.lang);ms.forEach(m=>{if(m.type==='characterData'){if(d)trText(m.target,d)}else m.addedNodes.forEach(n=>trNode(n))})});
+  const obs=new MutationObserver(ms=>{if(S.lang==='ro')return;const d=i18nDict(S.lang);ms.forEach(m=>{if(m.type==='characterData'){if(d)trText(m.target,d)}else m.addedNodes.forEach(n=>trNode(n))});obs.takeRecords()});
```
  (`takeRecords()` aruncă mutațiile produse de propriile scrieri.) În plus: în `en.json` ștergeți/rezolvați perechea („Date" → „Data" este greșită; cheia RO „Date" = „Datele"/„Data" trebuie să dea „Data"/„Date" distinct, de ex. „Date"→„Data records") și adăugați în `tests/i18n_deep.js` o verificare „nicio valoare tradusă nu este ea însăși cheie cu altă traducere" (script folosit: pentru fiecare limbă, `d[v]!==undefined && d[v]!==v`).

### 2. [mare · verificat mecanismul; probabilitate teoretică] Fereastra sesiunii se reconstruiește la fiecare secundă → click-uri pierdute și focus pierdut, inclusiv pe STOP-ul partenerului
- Fișier: `src/js/10_views.js:131-136` (tick) și `:140-162` (drawSes face `#modal.innerHTML=` complet la fiecare tick); butoanele din `26_profil.js:partnerBar`.
- Repro (verificat): mousedown pe „❚❚", 1,3 s, mouseup → `click` nu se declanșează (clicks=0, `SES.paused===false`), pentru că elementul a fost înlocuit între down și up. Focus: buton focalizat → după 1,3 s `document.activeElement===BODY` (utilizatorul de tastatură/cititor de ecran revine la începutul documentului, în spatele modalului). Un tap obișnuit (80–150 ms) cade peste un tick în ~10% din cazuri (teoretic), deci „STOP"/„Mai ușor" pot fi ratate; `<select>` „s / punct" se închide singur.
- Corectură: la tick actualizați doar contorul, redesenați complet doar la schimbare de pas/pauză/feedback.
```diff
--- a/src/js/10_views.js
+++ b/src/js/10_views.js
 function tick(){
   if(SES.paused)return;SES.left--;
-  if(SES.left<=0){beep(660);if(SES.i<SES.pts.length-1){SES.i++;SES.left=stepSec(SES.i)}else{endSes(true);return}}
-  drawSes();
+  if(SES.left<=0){beep(660);if(SES.i<SES.pts.length-1){SES.i++;SES.left=stepSec(SES.i)}else{endSes(true);return}drawSes();return}
+  const b=document.querySelector('#modal .breath');if(b)b.textContent=SES.left;else drawSes();
 }
```

---

## MEDIU

### 3. [mediu · verificat] `S.pre` din viitor dezactivează triajul „semne de alarmă" permanent
- Fișier: `src/js/26_profil.js` normExtra (`S.pre=+S.pre>0&&isFinite(+S.pre)?+S.pre:0`) și gateDraw (`fresh=S.pre&&Date.now()-S.pre<2*3600*1000`).
- Repro: `localStorage.punctum={"pre":9e15}` → `startSes(0)` → în modal 0 casete `.gr`, fără întrebările de triaj (verificat). Se poate ajunge și prin import de fișier/cod (pre se exportă în `stState`), sau prin ceas de sistem dat înapoi. Un fișier exportat acum 1 h pe alt dispozitiv/altă persoană moștenește de asemenea „triaj recent".
- Corectură:
```diff
-  S.pre=+S.pre>0&&isFinite(+S.pre)?+S.pre:0;
+  S.pre=+S.pre>0&&+S.pre<=Date.now()&&isFinite(+S.pre)?+S.pre:0;
```
  și în `stState()` excludeți `pre`: `const o=Object.assign({},S);delete o.pre;`.

### 4. [mediu · verificat] „Șterge toate datele" nu șterge cheia veche `acupunctura`; profilul de siguranță „reînvie"
- Fișier: `src/js/27_eu.js` stReset (`localStorage.removeItem('punctum')` doar) + `src/js/01_i18n-interfata-8-limbi-conti.js:14` (`getItem('punctum')||getItem('acupunctura')`).
- Repro: `localStorage.acupunctura={"prof":{"preg":true},"fav":["LI4|Hegu"]}` (utilizator venit din versiune veche), fără `punctum` → deschide app → `stReset()` → `S.prof.preg` este iar `true` după reset și cheia rămâne în storage. Încalcă promisiunea de ștergere (confidențialitate) și readuce date vechi la fiecare pornire.
- Corectură: `try{localStorage.removeItem('punctum');localStorage.removeItem('acupunctura')}catch(e){}` în stReset; în `load()` după citire din cheia veche: `save()` + `removeItem('acupunctura')` (migrare).

### 5. [mediu · verificat] Importul raportează „Importat." chiar dacă nu s-a salvat; înlocuiește tăcut profilul de siguranță; acceptă chei necunoscute nelimitate
- Fișier: `src/js/27_eu.js` stApply (`try{localStorage.setItem(...)}catch(e){}` urmat de `load();save();...EU.msg='Importat.'`).
- (a) Verificat: cu `localStorage` blocat (SecurityError) sau peste cotă (junk 6 MB), `stApply('{"prof":{"preg":true}}')` → `S.prof={}` și mesajul „Importat." (în loc de eroare). `load()` citește apoi starea veche/implicită.
- (b) Verificat: un import cu cheie necunoscută de 4 MB este acceptat și persistat (`S.junk`, `localStorage.punctum` ≈ 4 MB); toate `save()`-urile următoare rescriu 4 MB, iar `stExport` le re-exportă. La următoarea scriere care depășește cota, `save()` eșuează silențios și jurnalul/profilul nu se mai salvează (teoretic pentru acest ultim pas).
- (c) Un fișier fără `prof` (versiune veche, alt utilizator) șterge profilul curent fără nicio avertizare: mesajul de confirmare e generic.
- Corectură: whitelist de chei în `load()`/normExtra (`['lang','theme','fav','best','prof','log','plan','acc','pre','exam','routines','course']`, restul se șterg); `stApply`: `try{localStorage.setItem(...)}catch(e){EU.msg='Nu s-a putut salva (spațiu insuficient sau stocare blocată).';render();return}` înainte de a șterge S; după import `EU.tab='profil'` și mesaj „Verifică profilul de siguranță".

### 6. [mediu · verificat] `S.lang` cu nume din prototip (`constructor`, `__proto__`, `toString`) trece validarea → eroare la pornire și disclaimer lipsă
- Fișier: `src/js/01_i18n-interfata-8-limbi-conti.js:15` (`if(!I18N[S.lang])S.lang='ro'`).
- Repro: `localStorage.punctum={"lang":"constructor"}` (sau import `stApply('{"lang":"constructor"}')`) → `TypeError: Cannot read properties of undefined (reading '0')` din navList; `T()` întoarce funcția `Object`, deci footerul cu disclaimerul devine `undefined`, selectorul de limbă e gol (verificat). Se repară doar dacă utilizatorul alege manual o limbă. Testul existent acoperă doar `lang:'xx'`.
- Corectură:
```diff
-  if(!I18N[S.lang])S.lang='ro';
+  if(typeof S.lang!=='string'||!Object.prototype.hasOwnProperty.call(I18N,S.lang))S.lang='ro';
```
  și același tratament pentru `T()` / `VLANG[S.lang]` dacă S.lang poate veni din altă sursă.

### 7. [mediu · verificat] Poarta de siguranță nu este un dialog: fără focus, fără Esc, fără `inert`; un singur slot `#modal` partajat
- Fișiere: `src/js/26_profil.js` gateDraw/gateCancel; `10_views.js` drawSes/endSes.
- Verificat: după deschiderea porții `role`/`aria-modal` lipsesc, `document.activeElement` rămâne în spatele overlay-ului, Esc nu închide, `header.inert===false` (Tab ajunge în pagina din spate și poate porni altă sesiune).
- Verificat: cu o sesiune A în curs, `masStart('s',0)` desenează poarta B, dar după ≤1 s tick-ul sesiunii A rescrie `#modal` și poarta dispare fără decizie, iar `GATE` rămâne setat („stale"). Același lucru la `endSes(true)` care suprascrie o poartă deschisă cu fereastra „Sesiune încheiată". Nu am găsit un bypass de pornire (vezi „Testat fără defecte"), dar poarta poate fi suprimată fără să fie citită.
- Corectură: în `sesBegin` refuzați/închideți sesiunea în curs (`if(SES.on)endSes(false)`) înainte de `gateDraw`; modalului `role="dialog" aria-modal="true" aria-labelledby`; la deschidere `focus()` pe primul control; `document.querySelector('header,main,footer').inert=true` cât timp `#modal` e plin; handler `keydown` Esc → `gateCancel()`.

### 8. [mediu · verificat prin cod] Detectarea „urgență" din căutare are goluri serioase
- Fișier: `src/js/28_durere.js` (`NLR`/`nlUrgent`), folosit în `doSearch`.
- Verificat (rulat `nlUrgent`): fals pentru „durere de piept", „dureri de inimă", „nu pot să respir", „greu să respir", „îmi este greu să respir", „mă doare pieptul", „mi-a amorțit brațul stâng", „față căzută", „vomit sânge", „vreau să mă omor". Doar formele exacte din regex declanșează avertismentul 112.
- Corectură minimă (extindere, pe textul normalizat fără diacritice):
```diff
-const NLR=/durere (in|la) piept|dureri in piept|nu pot respira|respir.*greu|lesin|.../
+const NLR=/dureri? (in|la|de) (piept|inima)|doare (pieptul|inima)|nu pot (sa )?respira|(greu|dificil).*(sa )?respir|respir.*greu|lesin|paralizi|(amortit|amortel|slabit).*(brat|picior|fata|jumatate)|fata (cazuta|stramba)|vom\w* sange|sange\w* (in|la) scaun|sinucid|sa ma omor|.../
```
  (păstrați restul alternativelor existente; adăugați teste în `tests/adversarial.js`.)

### 9. [mediu · teoretic] Cronometrul numără apeluri `setInterval`, nu timp real
- Fișier: `src/js/26_profil.js` sesGo (`setInterval(tick,1000)`), `10_views.js` tick.
- Tab în fundal / ecran blocat: Chrome limitează timerele ascunse la ~1/min, iOS le îngheață → „60 s per punct" devine ore, fără nicio indicație (nu există Wake Lock sau reconciliere). Nu am putut verifica în Playwright (necesită throttling real al tab-ului).
- Corectură: `SES.end=Date.now()+SES.left*1000`; în tick `SES.left=Math.ceil((SES.end-Date.now())/1000)`; la `visibilitychange` cu `document.hidden` apelați `sesPause()` și anunțați; la `sesPause`/`sesNext`/`sesTime` recalculați `SES.end`.

### 10. [mediu · verificat prin cod] Fereastra „Sesiune încheiată": scorul „după" este presetat la 0
- Fișier: `src/js/26_profil.js` sesDoneHtml (`<select id="jA">` fără opțiune goală; `jrSave` citește `n10(a.value)`).
- Efect: „Salvează în jurnal" fără alegere înregistrează `a=0` („fără disconfort") → îmbunătățire fantomă sistematică în statistica din `jrStats`, deși aplicația avertizează că cifrele nu dovedesc nimic.
- Corectură: `<option value="" selected>Alege…</option>` prima opțiune și în jrSave `if(a&&a.value==='')return;` (sau permiteți `a:null`).

### 11. [mediu · verificat prin cod] Service worker: versiune decuplată de aplicație, cache-first fără revalidare, cache-uiește și răspunsuri de eroare
- Fișier: `tools/make_pwa.js:4` (`ver=process.argv[2]||'2.1'`) și șablonul sw (`caches.match(...)||fetch(...).then(res=>{c.put(e.request,cp)...})`).
- (a) Dacă se rulează `node tools/make_pwa.js` fără argument, V rămâne `punctum-2.1` (aplicația e 2.4); `sw.js` identic octet cu octet → browserul nu declanșează `install`, iar utilizatorii PWA rămân pe un `index.html` vechi (inclusiv cu reguli de siguranță vechi) pe termen nelimitat. În `dist/pwa/sw.js` curent V=2.4, deci a fost rulat corect o dată, dar nimic nu garantează repetarea.
- (b) Fără `res.ok`/`res.type==='basic'` un 404/500 tranzitoriu pentru `manifest`/icon rămâne în cache până la schimbarea V; orice URL cu query (`index.html?x=1`) creează o intrare nouă (creștere nelimitată).
- (c) Cache-first înseamnă că versiunea nouă apare abia la a doua redeschidere (prima încarcă vechiul).
- Corectură: derivați V din hash-ul conținutului:
```diff
-const ver=process.argv[2]||'2.1';
+const ver=process.argv[2]||require('crypto').createHash('sha1').update(fs.readFileSync('dist/punctum.html')).digest('hex').slice(0,10);
```
  și în fetch: `if(res.ok&&res.type==='basic')c.put(...)`, `caches.match(e.request,{ignoreSearch:true})`.

### 12. [mediu→mic · verificat] Fără Content-Security-Policy
- Fișier: `src/template.html` (head). Nu există `<meta http-equiv="Content-Security-Policy">`. Am verificat că `dist/punctum.html` nu încarcă nimic extern (0 `<script src>`, 0 `<link href>` externe, 0 `fetch`/XHR/WebSocket/beacon; singurele URL-uri externe sunt `<a href>` cu `rel="noopener"`). Nu am găsit XSS (fuzz de mai jos), deci e doar hardening, dar aplicația are `onclick=` inline și date importate, deci o plasă de siguranță merită.
- Corectură (compatibilă cu build-ul single-file și cu `blob:` pentru descărcări):
```diff
+<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; media-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'">
```
  Pentru varianta PWA, `make_pwa.js` trebuie să adauge `worker-src 'self'; manifest-src 'self'; img-src 'self' data: blob:; script-src 'self' 'unsafe-inline'` (altfel `sw.js` și manifestul sunt blocate).

### 13. [mediu→mic · verificat] ICS: `days=[]` produce `RRULE:FREQ=WEEKLY;BYDAY=` invalid; UID instabil duplică evenimente la fiecare export
- Fișiere: `src/js/26_profil.js` normExtra (nu cere `days.length>0`); `27_eu.js` icsBuild (`UID:punctum-${i}-${stamp}`).
- Verificat: stare cu `plan:[{k:'p',i:0,time:'08:00',days:[]}]` → `RRULE:FREQ=WEEKLY;BYDAY=` (unele calendare resping întregul fișier) și DTSTART la +7 zile. Verificat: două exporturi la 1 s distanță au UID-uri diferite → reimportul în calendar dublează seria.
- Corectură:
```diff
-...map(x=>({k:x.k,i:x.i,time:String(x.time),days:[...]}));
+...map(x=>({k:x.k,i:x.i,time:String(x.time),days:[...]})).filter(x=>x.days.length);
-`UID:punctum-${i}-${stamp}@punctum.local`
+`UID:punctum-${x.k}${x.i}-${x.time.replace(':','')}-${x.days.join('')}@punctum.local`
```

---

## MIC

### 14. [mic · verificat] Timestamp uriaș în jurnal → „NaN.NaN.NaN NaN:NaN" în tabel și CSV
`26_profil.js` normExtra: `+x.t>0&&isFinite(+x.t)` acceptă `1e300`. Corectură: `+x.t>0&&+x.t<8.64e15`.

### 15. [mic · verificat] ICS: linii > 75 octeți
`27_eu.js` icsFold taie la 73 caractere UTF-16; cu diacritice 28 din 426 de linii au 76 octeți (RFC 5545 cere 75 octeți). Clienții tolerează, dar parserele stricte nu. Corectură: împărțire pe octeți (TextEncoder) fără a tăia un caracter.

### 16. [mic · verificat] Examen: schimbarea modului lasă rezultatul vechi afișat
`28_durere.js` exMode setează doar `EX.code=''`; `EX.res` rămâne. Verificat: după un răspuns, `exMode('all')` → țintă nouă, dar marcajele și mesajul vechi rămân, iar `exTap` ignoră atingerile (`if(EX.res)return`) până la „Următorul". Corectură: `function exMode(m){EX.mode=m;EX.code='';EX.res=null;EX.tip=false;render()}`. Mai mult, examenul se poate rezolva doar cu mouse/touch (`onclick` pe SVG, fără alternativă de tastatură) — teoretic, problemă de accesibilitate.

### 17. [mic · verificat, cod mai vechi] `S.course.ans` / `S.course.done` string → TypeError în strict mode
`22_course.js:8` cst(): `S.course.ans=S.course.ans||{}` lasă un string; `crAnswer` aruncă „Cannot create property … on string". Corectură: în cst() `if(typeof S.course.ans!=='object'||Array.isArray(S.course.ans))S.course.ans={}` (la fel pentru `done`), sau validare în load().

### 18. [mic · verificat prin cod] Profilul: majoritatea indicatorilor nu influențează sesiunile de presopunctură
`26_profil.js` profR: pentru `kind==='pt'`/protocoale/`cond` se folosesc doar `preg`, `tromboza` (strict doar în masaj), `neuropatie`. `anticoag`, `osteo`, `onco`, `hernie`, `pacemaker`, `piele` nu produc nicio avertizare la `startSes`/rutine (doar la variante și secvențe de masaj). Nu e o eroare de cod, dar profilul sugerează mai mult decât face; clarificați textul din `euProfil` sau adăugați `ask` pentru `anticoag/osteo/onco` la sesiunile cu presiune ferma.

### 19. [mic · verificat prin cod] Efect secundar global `SES.sec` din rutine
`26_profil.js` sesGo: `if(o.sec&&CSEC.includes(+o.sec))SES.sec=+o.sec` schimbă permanent durata/punct pentru sesiunile următoare (o rutină „Copii" de 30 s lasă 30 s pe protocoalele adultului, iar `planItem` calculează durata ICS din acest SES.sec). Corectură: păstrați durata pe sesiune (`SES.dur`) fără a modifica `SES.sec`.

### 20. [mic · teoretic] Imprimare și descărcare cu temporizări scurte
`27_eu.js` printHtml/`21_conditions.js` rtnPrint: `setTimeout(done,500)` șterge conținutul de imprimat; pe mobil `window.print()` nu blochează, deci previzualizarea poate fi goală. `dl()` revocă URL-ul blob după 500 ms (descărcări lente pe Safari). Corectură: nu mai folosiți timeout-ul, rămâne `afterprint`; revocare la 10–30 s. Mic: `stImportFile` nu resetează `input.value` (aceeași fișier nu mai poate fi reales) și nu are `onerror`; `jrDel` șterge fără confirmare.

---

## Testat fără defecte (ca să nu fie re-verificat)
- Poarta de siguranță: matricea completă, cu profil `preg+tromboza+anticoag` și triaj proaspăt, 119 puncte de pornire (15 protocoale `startSes`, `masStart('s'/'c')` toate, 60 condiții `cndStart`): 0 sesiuni cu puncte ⚠-sarcină pornite, 26 blocate cu „nu este potrivită", 0 goale. Pornirea sesiunii trece mereu prin `sesBegin` (căutare, plan, durere, favorite/rutine, condiții); nu există parametri de hash care pornesc sesiuni (`#masaj:0`, `#acu:start`, `#durere:...` ignorați). Consimțământul partenerului blochează butonul (nu există cale prin DOM normal). Reîncărcarea în timpul sesiunii: SES nu se persistă, poarta reapare. SES.* nedefinite înainte de prima sesiune nu sunt citite (guard `SES.on`).
- XSS: fuzz cu `"><img onerror>` și `');…('` în `fav`, `prof`, `log.{ti,n,t,b,a}`, `plan`, `acc`, `exam`, `routines`, `course`, `theme`, `pre`, `EU.code`, vizitând 19 vederi + 4 taburi EU: 0 dialoguri, 0 `window.__x`, 0 pollution (`{}.polluted` nedefinit). `esc()` acoperă `& < > " ' \``; valorile din plan sunt doar indici validați; traducerile se scriu cu `n.data`/`setAttribute`.
- Injecție CSV: `csvCell` prefixează `'` pentru `= + - @ \t \r` (verificat cu `=1+1`, `\t=1`, `@SUM`, `-1`, `+1`); spațiul sau `|` în față nu sunt interpretate de Excel/LibreOffice implicit. Injecție ICS: textul vine din date statice (planul stochează doar indici), iar `icsEsc` acoperă `\ ; , \n` (un `\r` singur nu e acoperit, dar nu e exploatabil acum).
- Regex: NLM/NLR liniare; `doSearch` cu 100 000 de caractere = 11 ms. Date: toate codurile din MASS/MASC există în PT, toate ID-urile din TECH_ASK/VAR_ASK există, pool-ul de examen are poziții pentru toate cele 363 de puncte, protocoalele din `DZ.prot` se rezolvă. Stări ostile (`__proto__` imbricat, array în loc de obiect, `plan.k` ostil) normalizate corect.
- Scurgeri: `afterprint` se dezînregistrează; nu s-au găsit listenere acumulate; `SES.timer` e curățat în sesGo/endSes; `speechStop()` la endSes. Residual minor: `SES.fbT` nu e anulat la sesGo/endSes (efect inofensiv, guard `SES.on`).

## Rezumat în 5 rânduri
1. Două defecte mari verificate: bucla MutationObserver (en.json „Data"↔„Date") îngheață pagina în EN pe Setări/Jurnal, iar redesenarea completă a modalului la fiecare secundă pierde click-uri/focus (inclusiv STOP-ul partenerului).
2. Nu am găsit niciun bypass al porții (119 căi de pornire testate, preg/trombоză/consimțământ), nici XSS/CSV/prototype pollution; dar `S.pre` din viitor oprește triajul, iar poarta poate fi suprascrisă de tick-ul unei sesiuni în curs și nu e un dialog accesibil.
3. Import/reset: „Importat." fals la salvare eșuată, profilul înlocuit tăcut, chei necunoscute nelimitate, `S.lang="constructor"` strică pornirea, iar „Șterge tot" nu șterge cheia veche `acupunctura`.
4. Siguranță/conținut: `nlUrgent` ratează „durere de piept"/„nu pot să respir"; cronometrul nu e bazat pe timp real; scorul „după" e presetat la 0 și umflă statisticile jurnalului.
5. Infrastructură: lipsește CSP (nimic extern încărcat — verificat), SW cu versiune implicită „2.1" decuplată de aplicație și fără revalidare, ICS cu `BYDAY=` gol și UID instabil; 20 constatări în total, cu diff-uri în raport.
