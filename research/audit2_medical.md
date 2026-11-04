# Audit medical adversarial independent (runda 2) – PUNCTUM v2.4

Data: 2026-11-04. Perspectivă: clinician prudent (medicină internă / fizioterapie / medicina durerii). Nu s-a modificat nimic în `src/`, `tests/`, `dist/`.

Citit integral: `src/data/masaj_simult.json` (31), `masaj_secv.json` (13), `masaj_tehnici.json`, `src/js/26_profil.js`, `28_durere.js`, `25_masaj.js`, `08_helpers.js`, `10_views.js` (vAcu, vSafe, vEar, drawSes), `05_date-protocoale…js` (PROT), fragmente din `21_conditions.js`/`cond_a.txt` și datele punctelor (`pts_*.txt`, cu ordinea reală de încărcare: ultimul fișier câștigă). Starea efectivă a semnalului „sarcină" (`isPregPt`) a fost calculată din date, nu din memorie: 36 de puncte din 410 sunt marcate.

## Sinteză a verificărilor (ce e în regulă, ca să nu se dubleze munca)
- Punctele clasice contraindicate în sarcină (LI4, SP6, BL60, BL67, GB21, BL31–34, CV1–CV7, CV10–12, ST25–30, KI11–15, SP13–14) sunt toate marcate efectiv în date (inclusiv CV4/CV6, suprascrise corect de `pts_g4.txt`). AACP/POGP confirmă „punctele interzise" LI4, SP6, BL60, BL67 și evitarea foramenelor sacrale BL31–34 și a punctelor abdominale, dar spune că „se poate exercita prudență", adică lista e prudențială, nu dovedită.
- Nicio secvență sau combinație nu instruiește presiune pe carotidă, ochi (globul), tiroidă, fosa poplitee sau perineu; avertismentele de bază (lateral gât, spatele genunchiului, ochi) sunt prezente în `masaj_tehnici.json`. Punctele ST9/ST10/LI18/CV22 nu apar în nicio sesiune.
- Formulările despre dovezi din `MAST.dovezi` sunt corect temperate (Cochrane lombalgie 2015: 25 studii, 3.096 participanți, calitate scăzută; „toxinele" marcat fără suport). Nu am găsit promisiuni de vindecare în JSON-uri.

Problemele reale sunt (a) mecanismele de alarmă/triaj, (b) textul de siguranță care nu ajunge la utilizator în momentul sesiunii, (c) profilul de siguranță care nu acoperă ce afirmă textele și (d) sesiunile pentru copii.

Surse folosite (toate deschise efectiv, dacă nu scrie altfel):
- [S1] NICE NG228, cefalee „thunderclap"/HSA, trimitere imediată la urgențe: https://www.nice.org.uk/guidance/NG228/chapter/recommendations
- [S2] Semne de sindrom de coadă de cal, „mergi la urgențe cât mai repede": https://rightdecisions.scot.nhs.uk/media/301h1exb/cauda-equina-syndrome-important-warning-signs-nhsggc.pdf
- [S3] AACP/POGP, puncte în sarcină: https://thepogp.co.uk/_userfiles/pages/files/gps_apr_prlb_pgp_07.pdf
- [S4] Masaj și tromboză: „Do not massage a leg with unexplained pain or swelling until DVT has been ruled out" (blog de clinică, sursă secundară): https://www.centerforvein.com/blog/are-massages-an-effective-treatment-for-dvt-db
- [S5] FAST/BE-FAST (sursă secundară): https://en.wikipedia.org/wiki/FAST_(stroke)
- [S6] Sutton 2014, masajul sinusului carotidian poate da embolie cerebrală și aritmii, se face monitorizat: https://pmc.ncbi.nlm.nih.gov/articles/PMC4220427
- [S7] Cochrane CD002962 (acupunctură/acupresură pentru inducerea travaliului): beneficiu neclar, date de siguranță puține: https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD002962.pub4/pdf/CDSR/CD002962/CD002962_abstract.pdf
- [S8] Arterită cu celule gigante, cefalee nouă la ≥50 ani + claudicație mandibulară/simptome vizuale = urgență (sursă secundară): https://www.mdlinx.com/article/when-should-you-suspect-giant-cell-arteritis-recognizing-the-symptom-combinations-that-matter-most/2bRdR65JbKEFCNeDsUfcGp
- [S9] Precauții pentru brațul cu ganglioni excizați (tensiune, injecții, căldură, apelează echipa la umflare/roșeață; documentul nu tratează masajul): https://patient-education.fredhutch.org/documents/Breast%20Surgery%20Lymphedema%20Precautions.pdf

Abrevieri: „fără sursă verificată" = recomandare de practică clinică prudentă pe care nu am putut-o ancora într-un URL deschis în această rundă.

---

## CRITIC

### 1. Mesajul de alarmă trimite la 112 doar „dacă simptomele sunt severe sau brusc apărute"; altfel „vorbește cu medicul"
- Loc: `26_profil.js` → `gateDraw`, div `#gAlarm`; `28_durere.js` → `vDurere`, variabila `out` (același text); `masaj_tehnici.json` → `siguranta.oprire[3]` („…durere în piept: oprește și cere ajutor, la nevoie sună la 112"); `10_views.js` → `vAcu`, „Când nu te trata singur" (listă fără nicio instrucțiune de apel).
- Problemă: aceleași cinci semne RED (durere în piept, dispnee, gambă unilaterală, deficit brusc, febră) primesc același răspuns. O persoană cu durere toracică „moderată" sau cu palpitații este trimisă la „medic" (ambulatoriu). Pentru durere toracică, semne de AVC și suspiciune de TVP/EP, „severitatea" nu e criteriul de apel.
- Risc: întârziere în infarct/AVC/EP.
- Severitate: critic.
- Corectură (înlocuiește conținutul `#gAlarm` și `out`; cod: afișează textul după indicele bifat):
  - piept/respirație/palpitații: „Sună acum la 112. Nu conduce singur la spital și nu continua masajul sau presopunctura."
  - deficit neurologic/vedere/vorbire/cefalee în „trăsnet"/coadă de cal/idei suicidare: „Sună acum la 112 sau mergi imediat la camera de gardă. Nu aștepta ca simptomele să treacă."
  - gambă/braț umflat, cald, roșu, dureros: „Nu masa și nu apăsa membrul. Mergi la urgențe în aceeași zi; dacă apare și durere în piept sau lipsă de aer, sună la 112."
  - febră/stare alterată/durere neexplicată: „Nu face masaj acum. Vorbește cu medicul în aceeași zi; dacă te agravezi, sună la 112."
  - `masaj_tehnici.json` oprire[3]: „Dificultăți de respirație, durere sau presiune în piept, slăbiciune bruscă pe o parte, vorbire încurcată sau leșin: oprește imediat și sună la 112."
  - `vAcu`, prima linie din „Când nu te trata singur": „Durere în piept, lipsă de aer, slăbiciune bruscă pe o parte a corpului, vorbire încurcată sau durere de cap ca o lovitură: sună imediat la 112."
- Sursă: [S5], [S1], [S2].

### 2. Lista RED (5 semne) omite urgențe majore
- Loc: `26_profil.js` → `const RED` (folosită în `gateDraw` și în `vDurere`).
- Lipsesc: cefalee „în trăsnet"/cea mai puternică din viață, febră + redoare de ceafă, față căzută/slăbiciune pe o parte, pierderea bruscă a vederii, sindrom de coadă de cal (amorțeală în șa, tulburări de vezică/intestin, slăbiciune bilaterală), sângerare/vărsături cu sânge, durere abdominală severă, sarcină cu sângerare sau durere abdominală, cădere/traumatism (parțial acoperit), ideație suicidară. Protocoalele (`PROT[].n`) conțin multe dintre aceste alarme, dar RED, singura listă care blochează efectiv sesiunea, nu.
- Risc: cineva cu HSA, AVC, coadă de cal sau abdomen acut bifează „nimic" și primește sugestii de masaj.
- Severitate: critic.
- Corectură (înlocuiește `RED`, 9 itemi):
```js
const RED=['Durere sau strângere în piept, lipsă de aer, leșin sau palpitații neobișnuite','Slăbiciune ori amorțeală bruscă pe o parte a corpului, față căzută, vorbire încurcată, pierderea bruscă a vederii sau a echilibrului','Durere de cap bruscă, ca o lovitură, „cea mai puternică din viața ta", sau durere de cap cu febră și ceafă înțepenită, vărsături ori confuzie','Febră peste 38 °C sau stare generală alterată','O gambă sau un braț umflat, cald, roșu și dureros, de o singură parte (mai ales după o călătorie lungă, imobilizare, operație sau în sarcină)','Durere de spate sau de picior cu amorțeală în zona dintre picioare, slăbiciune în ambele picioare sau probleme noi cu urinarea ori cu scaunul','Durere abdominală puternică sau care se agravează, vărsături repetate sau cu sânge, sânge în scaun; în sarcină, orice sângerare sau durere abdominală','Durere bruscă, intensă sau neexplicată, ori traumatism sau cădere recentă în zona de masat','Gânduri de a-ți face rău sau de a nu mai trăi'];
```
- Sursă: [S1], [S2], [S5].

### 3. Textul de siguranță al combinațiilor, secvențelor și protocoalelor nu apare în sesiunea ghidată și nici în „Unde te doare?"
- Loc: `25_masaj.js` → `masStart` (nu transmite `nota`/`evita`); `10_views.js` → `startSes` (nu transmite `PROT[i].n`); `26_profil.js` → `gateDraw` (arată doar insigne de profil + RED); `28_durere.js` → `vDurere` (cardurile arată titlu + etichete + insigne, fără `nota`/`evita`/`n`).
- Problemă: tocmai textele cu contraindicațiile concrete (s30: pacemaker, osteoporoză, durere toracică; s25: hernie, anevrism aortic, apendicită; s16/s17: rinichi; r08: 12 contraindicații; r04: tromboză; protocol „Lombalgie": coadă de cal; „Picioare grele": TVP/preeclampsie) se văd doar dacă utilizatorul deschide cardul din pagina Masaj sau Acupresură. Cine intră prin „Unde te doare?" (fluxul destinat novicelui) vede doar „▶ Pornește".
- Risc: contraindicațiile devin opționale.
- Severitate: critic.
- Corectură: transmite textul în `o.warn` și afișează-l în gate; adaugă-l și în cardurile din Durere.
```js
// 25_masaj.js
// sim: o={fixed:true,partner:…,R:…,warn:c.nota}
// seq: o={fixed:true,partner:…,R:…,warn:[r.evita,r.nota].filter(Boolean).join(' ')}
// 10_views.js startSes: sesBegin(pr.t,…,{warn:pr.n})
// 21_conditions.js startCustom: transmite și c.alarma (semnale de alarmă) dacă există
// 26_profil.js gateDraw, înainte de ${body}:
${g.o.warn?`<div class="warn" role="note"><b>Citește înainte:</b> ${esc(g.o.warn)}</div>`:''}
// 28_durere.js: în cardurile sm/sq/pr adaugă ${o.c.nota?`<p class="w">${esc(o.c.nota)}</p>`:''} (respectiv o.r.evita, PROT[i].n)
```
- Sursă: analiză de cod.

### 4. Sesiunile pentru copii/sugari pornesc ca presiune pe puncte, cu același ecran „Presiune fermă dar confortabilă"
- Loc: `21_conditions.js` → `cndStart` (grup „Copii" → `startCustom(c.n,c.pts,30)`); `cond_a.txt` rândurile `colici-sugar` (CV12, ST25, ST36), `constipatie-copil`, `enurezis`, `nas-infundat-copil`, `somn-copil`; `10_views.js` → `drawSes` (linia statică de presiune).
- Problemă: textul cardului spune „fără presiune pe puncte", dar butonul pornește un cronometru de 30 s pe fiecare punct, cu localizarea punctului și linia „Presiune fermă dar confortabilă". Gate-ul pune întrebările adultului (RED despre propria febră etc.), nu despre copil, și nu afișează semnalele de alarmă pediatrice din `cond_a.txt`.
- Risc: presiune pe abdomenul unui sugar, instrucțiune contradictorie, semne de abdomen acut (volvulus, invaginație) neafișate.
- Severitate: critic.
- Corectură: pentru `c.g==='Copii'` nu porni sesiunea cu puncte; în `cndStart` apelează `sesBegin` cu `{child:true,warn:<alarma din rând>}`, ascunde linia de presiune și afișează:
  - gate: „Acest gest îl face doar un adult responsabil. Atingere foarte ușoară, cu vârful degetelor, 10–20 de secunde; nu apăsa pe puncte. Oprește imediat dacă plânge mai tare. Nu face acest gest și mergi urgent la medic sau sună la 112 dacă sugarul are febră, vărsături verzui sau cu sânge, abdomen umflat și dur, sânge în scaun, letargie, refuză alimentarea sau respiră greu."
  - `drawSes`: `SES.child?'Atingere foarte ușoară, fără presiune pe puncte':'…'`.
- Sursă: fără sursă verificată (principiu pediatric de prudență); semnalele de alarmă sunt cele deja scrise în `cond_a.txt`.

---

## MARE

### 5. Linie fixă „Presiune fermă dar confortabilă" în orice sesiune
- Loc: `10_views.js` → `drawSes` (ultimul `<p class="mut">`).
- Problemă: apare și la pașii care spun „presiune foarte ușoară" (r08 abdomen, s25, s31, s30 stern, r07 ochi, s03 tâmple, s26 frunte/creștet, r09 somn „3–5/10") și în sesiuni cu parteneri vârstnici. Contrazice `MAST.siguranta.medic[9]` (vârstnici fragili/copii: maximum 3/10).
- Risc: utilizatorul urmează linia fixă în loc de text, mai ales pe abdomen, ochi, stern, gât.
- Severitate: mare.
- Corectură: în `masStart` marchează pașii `pr:'u'` când `t.presiune==='ușoară'` sau textul conține „ușor/blând/foarte ușoar", iar în `drawSes`:
  `Presiune confortabilă, niciodată dureroasă · ${p.pr==='u'?'ușoară (2–3 din 10)':'medie (4–6 din 10)'} · inspiră 4 s · expiră 6 s`.

### 6. Profilul de siguranță nu e cerut niciodată; profil gol = zero avertismente de profil
- Loc: `26_profil.js` → `gateDraw` / `sesBegin`; `normExtra` (S.prof implicit `{}`).
- Problemă: gate-ul nu întreabă nimic despre sarcină, anticoagulante, pacemaker; nu trimite la profil dacă acesta e necompletat. O gravidă care n-a deschis niciodată „Eu" începe s23 sau r11 fără nicio blocare.
- Severitate: mare.
- Corectură: în `gateDraw`, dacă `!Object.keys(S.prof||{}).length && !S.profSeen`, afișează înaintea RED:
  „Nu ți-ai completat profilul de siguranță. Dacă ești însărcinată, iei anticoagulante, ai pacemaker, osteoporoză, cancer sau probleme de circulație la picioare, completează-l înainte de prima sesiune (durează un minut)." + butoane „Completez profilul" / „Nu am niciuna dintre acestea" (setează `S.profSeen=true`).

### 7. Combinațiile (sim) ignoră aproape toate semnalele din profil, deși notele spun „nu face"
- Loc: `26_profil.js` → `profR('sim')` (apelează doar `rPt`: sarcină, tromboză, neuropatie).
- Exemple: s30 (stern + LU1): nota spune „Dacă ai osteoporoză, pacemaker, anticoagulante… nu face", dar profilul cu aceste bife nu arată nimic. s12 (LU9, artera radială; „nu apăsa puternic… dacă iei anticoagulante"), s16/s17/s18 (osteoporoză, rinichi), s25/s31 (abdomen), s04 (glaucom), s29 (epilepsie).
- Severitate: mare.
- Corectură (după `rPt` din ramura `sim`):
```js
const SIM_ASK={s30:['osteo','pacemaker','anticoag','onco'],s12:['anticoag','limfedem'],s16:['osteo','rinichi'],s17:['osteo','rinichi'],s18:['osteo'],s25:['abdomen'],s31:['abdomen'],s04:['ochi'],s29:['epilepsie'],s09:['limfedem'],s15:['limfedem'],s02:['osteo']};
// în profR, kind==='sim': (SIM_ASK[o.id]||[]).forEach(k=>rAdd(R,'ask',k)); rAdd(R,'ask','anticoag');
```
  și adaugă în `PFLAGS` (sunt folosite și de `normExtra`, deci se salvează automat):
  `['epilepsie','Am epilepsie sau am avut convulsii'],['inima','Am boală de inimă, aritmie sau hipertensiune greu controlată'],['ochi','Am glaucom, retină fragilă sau operație oculară recentă'],['rinichi','Am boli de rinichi sau litiază renală'],['abdomen','Am hernie abdominală sau inghinală, anevrism de aortă, lichid în abdomen, stomă sau operație abdominală recentă'],['limfedem','Am limfedem sau mi s-au scos ganglioni (axilă/inghinal), ori am fistulă de dializă sau cateter la un braț']`.

### 8. Anticoagulante: textele spun „fără presiune fermă", aplicația cere „presiune fermă" și nu avertizează
- Loc: `masaj_tehnici.json` → `siguranta.nu_face[7]` și `medic[4]`; `26_profil.js` → `TECH_ASK.anticoag=['tp','pe','pl','pa','vb']` (nu include `ps`, `bl`, `mn`, `fr`, `cp`); `10_views.js` → `vAcu` (4–6/10, „fermă").
- Problemă: toate sesiunile din aplicație sunt `ps`/`bl`/`mn`; deci profilul „anticoag" nu declanșează aproape nimic. Textul de siguranță din `vSafe` („presopunctură blândă") e al treilea standard.
- Risc: echimoze/hematoame la presiune susținută 60–120 s sau cu minge, mai ales la vârstnici.
- Severitate: mare.
- Corectură: `anticoag:['ps','bl','mn','fr','pe','tp','pl','pa','vb']` și, în insigna de profil pentru `anticoag`, textul: „Iei anticoagulante sau ai tulburare de coagulare: doar presiune ușoară (maximum 3 din 10), fără minge sau antebraț, câte 20–30 s pe punct; oprește dacă apare vânătaie. Întreabă medicul." Armonizează `vSafe` și `vAcu` la aceeași formulare.
- Sursă: fără sursă verificată (consens de practică; notele proprii ale aplicației sunt deja în acest sens).

### 9. Marcajul „sarcină" nu acoperă punctele pe care textele proprii le declară de evitat
- Loc: `08_helpers.js` → `isPregPt` (depinde de câmpul `w`); `masaj_tehnici.json` → `siguranta.sarcina[2]` listează LR3, SP4, KI3, BL25, BL26, GB30 ca de evitat, dar în `pts_*.txt` ele nu au avertisment de sarcină. Calculat din date: nemarcate = BL23, BL25, BL26, BL52, GB30, KI3, LR3, SP4, SP8, SP9, SP10, GB34.
- Consecințe concrete (gravidă cu profil bifat, nicio blocare/avertisment): s16, s17 („nu te întinde pe burtă" doar în text), s18, s23 („SP4 și LR3 se omit în sarcină"), s27 și r09 (KI3 „omite"), r04 („în sarcină nu frământa gambele"), r11 („În sarcină nu face această secvență"; BL25/BL26/GB30 nemarcate, deci niciun stop), protocolul „Dureri menstruale" (SP8 în text, nemarcat).
- Severitate: mare. (Notă: AACP/POGP [S3] numește ca „interzise" doar LI4, SP6, BL60, BL67 și cere evitarea sacrului/abdomenului; extinderea e prudențială, dar atunci textul și codul trebuie să spună același lucru.)
- Corectură (`08_helpers.js`):
```js
const PREGX=new Set(['BL23','BL25','BL26','BL52','GB30','KI3','LR3','SP4','SP8','SP10']);
const isPregPt=p=>!!(p&&(PREGRE.test(p.w||'')||PREGX.has(p.c)));
```
  și în `profR('seq')`: `if(o.regiune==='spate')rAdd(R,'stop','preg'); if(o.regiune==='picioare')rAdd(R,'ask','preg');` (r11 și r03 interzic sarcina; r04/r05 cer aviz). Adaugă în `s17.poz` „(nu în sarcină)" – există deja.
- Sursă: [S3]; [S7] arată că nu există dovadă că acupresura declanșează travaliul, deci formularea corectă este „prudență", nu „risc dovedit".

### 10. Tromboză: „stop" în sim/secvențe, doar „ask" în protocoale și în cardul de punct
- Loc: `26_profil.js` → `sesReasons` (`rPt(R,s,false)`) și `rPt` (`strict?'stop':'ask'`).
- Problemă: aceleași puncte de gambă (SP9, SP6, ST36, KI3, KI1) sunt blocate în s19/s21/r04 pentru profilul „tromboză", dar protocolul „Picioare grele & umflare ușoară" – cel mai probabil ales de cineva cu picior umflat – primește doar „Doar cu acordul medicului".
- Severitate: mare.
- Corectură: în `sesReasons` folosește `rPt(R,…,true)`, sau cel puțin `if(profOn('tromboza')&&steps.some(p=>p.r==='pic'))rAdd(R,'stop','tromboza')`.
- Sursă: [S4].

### 11. r04 „Picioare obosite": frământarea gambei fără triaj pentru TVP
- Loc: `masaj_secv.json` → r04, pasul 2 (`pe`, „Frământă gamba între palme") și pasul 6 (`tp`); `evita` menționează tromboza doar ca „cunoscută".
- Problemă: TVP este adesea nediagnosticată; masajul gambei cu TVP poate mobiliza trombul. Instrucțiunea e în corp, avertismentul (în `masaj_tehnici`) e la tehnică.
- Severitate: mare.
- Corectură (`r04.evita`, înlocuiește): „Înainte de orice, privește și pipăie ambele gambe: dacă una este mai umflată, mai caldă, roșie sau dureroasă la apăsare, mai ales după o călătorie lungă, imobilizare, operație, în sarcină sau după naștere, nu masa și mergi la urgențe în aceeași zi (la lipsă de aer sau durere în piept: 112). De asemenea: varice severe, edem, răni, piele inflamată." Mută același test ca prim pas `ef` cu text „Compară cele două gambe: dacă diferă, oprește secvența."
- Sursă: [S4].

### 12. „Unde te doare?": nicio alarmă specifică zonei și niciun răspuns pentru „începută azi"
- Loc: `28_durere.js` → `vDurere`; `DS` nu conține „slăbiciune/amorțeală".
- Problemă: cap + „durere surdă" + „începută azi sau ieri" → sugestii; abdomen + „începută azi" → r08/s25; picioare + „începută azi" → r04 cu frământare; lombar + radiere → sugestii (singurul filtru e „ascuțită/arsură"). `sharp` ignoră slăbiciunea/amorțeala.
- Severitate: mare.
- Corectură: adaugă în `DS` opțiunea „Slăbiciune sau amorțeală" și tratează-o ca `sharp`; adaugă:
```js
const ZALERT={cap:'Durere de cap nouă, apărută brusc sau după 50 de ani, cu sensibilitate la tâmple sau scalp, durere la mestecat ori tulburări de vedere: cere evaluare medicală în aceeași zi; dacă e „cea mai puternică din viața ta", sună la 112.',abdomen:'Durere abdominală nouă, puternică sau care se agravează, cu febră, vărsături, abdomen dur ori sânge în scaun: nu masa, mergi la urgențe. În sarcină, orice durere abdominală sau sângerare cere evaluare imediată.',picioare:'Durere sau crampă nouă la o gambă, cu umflare, căldură sau roșeață pe o singură parte: nu masa piciorul și mergi la urgențe în aceeași zi.',lombar:'Durere lombară cu amorțeală între picioare, slăbiciune la unul sau ambele picioare ori probleme noi cu urinarea sau scaunul: sună la 112 sau mergi imediat la camera de gardă.',ceafa:'Durere de ceafă cu febră și înțepenire, după traumatism sau cu slăbiciune într-un braț: urgență, nu acupresură.','spate-sup':'Durere între omoplați sau în piept, cu lipsă de aer, transpirații sau iradiere în braț/maxilar: sună la 112.'};
// în out: ${ZALERT[z.id]?`<div class="warn" role="note">${esc(ZALERT[z.id])}</div>`:''} ; dacă DR.d===DD[0] pentru cap/abdomen/picioare/lombar, ascunde sugestiile și afișează doar alerta + „Dacă niciunul dintre aceste semne nu se potrivește și durerea persistă peste 48 de ore, vezi medicul."
```
- Sursă: [S1], [S2], [S4], [S8].

### 13. Detectorul de urgență din căutarea în limbaj natural ratează formulări obișnuite
- Loc: `28_durere.js` → `NLR`.
- Verificat în Node: nu prinde „mă doare pieptul", „strângere/presiune în piept", „dureri de piept", „gamba umflată" (regex-ul `gambe? umflat` nu acceptă „gamba"), „piciorul umflat și cald", „nu pot vorbi", „gura strâmbă", „amorțit brațul stâng", „cea mai puternică durere de cap", „ceafă țeapănă și febră", „sângerez", „vomit sânge", „tuse cu sânge", „nu pot urina", „vreau să mor", „nu văd cu un ochi", „febra 39". În plus `NLM` trimite „gamba umflată" la protocolul „Picioare grele" fără alertă.
- Severitate: mare.
- Corectură (testat în Node pe 24 formulări pozitive și 10 negative; singurul fals pozitiv acceptat: „amorțite la tastatură"):
```js
const NLR=/dur(ere|eri)?\s+(de\s+|in\s+|la\s+)?piept|doare\s+pieptul|(strang|apas|presiun)\w*\s+(in|la|pe)\s+piept|\binima\b|nu\s+pot\s+(respira|vorbi|misca)|respir\w*\s+(greu|dificil)|lesin|paralizi|slabiciune|amortit|amorteal|gura\s+stramba|fata\s+(cazuta|stramba)|vorbire|vorbesc\s+(greu|incurcat)|nu\s+vad|vedere\s+dubla|pierd\w*\s+(brusc\s+)?vederea|cefalee\s+(brusca|violenta)|cea\s+mai\s+(puternica|rea)\s+durere|durere\s+de\s+cap\s+(brusca|cumplita|groaznica)|ceaf\w*\s+(teap|tepen|intepen|rigid)|febra\s+(mare|3[89]|4[01])|sange|sangerar|sangerez|infarct|\bavc\b|accident\s+vascular|gamb\w*\s+(umflat|dureros|cald)|picior\w*\s+(umflat|cald|dureros)|nu\s+pot\s+urina|retentie|sinucid|nu\s+mai\s+vreau\s+sa\s+(traiesc|exist)|vreau\s+sa\s+mor|sa-mi\s+fac\s+rau/;
```
  Textul bannerului (`10_views.js` ~455), înlocuire: „Ce descrii poate fi o urgență. Dacă ai durere sau presiune în piept, lipsă de aer, slăbiciune bruscă pe o parte, vorbire încurcată, durere de cap ca o lovitură, sângerare importantă sau gânduri de a-ți face rău, sună acum la 112. Nu folosi presopunctura în locul ajutorului medical."

### 14. Ideație suicidară: tratată doar într-un text ascuns (PROT „Stres & anxietate") și absentă din fluxurile de somn/stres/ecran
- Loc: `05_…js` PROT „Stres & anxietate" (`n`, ascuns conform #3); `10_views.js` → `vSafe`, rând „Tulburări psihice severe, panică" (doar „conlucrare cu medicul"); r09, s26 („starea depresivă necesită consult").
- Severitate: mare.
- Corectură: rând nou în `vSafe`: „Gânduri de a-ți face rău sau de a nu mai trăi / depresie severă: presopunctura nu este un tratament. Sună la 112 sau mergi la cea mai apropiată cameră de gardă; nu rămâne singur și spune cuiva de încredere." În `r09.nota` și `s26.nota`: „Dacă ai gânduri de a-ți face rău sau de a nu mai trăi, sună la 112; nu rămâne singur." (RED#9 din #2 acoperă gate-ul.) Nu am pus un număr de linie de criză, fiindcă nu l-am putut verifica.
- Sursă: fără sursă verificată (OMS nu a putut fi deschis).

### 15. Brațe: limfedem, ganglioni excizați, fistulă de dializă, cateter, TVP de braț nu sunt în profil; r06 și combinațiile de braț nu le exclud
- Loc: `masaj_secv.json` r06 (`evita`), s09–s15, s12 (LU9 „fără a opri pulsul"); `masaj_tehnici.json` → `nu_face[12]` (limfedem – bine), dar fără „zone iradiate", fistulă AV, cateter central/port; `PFLAGS` nu are limfedem; `rPt` face `tromboza` doar pentru `p.r==='pic'`.
- Risc: presiune/frământare/loțiune pe un braț cu risc de limfedem sau pe fistulă AV (tromboză, infecție, pierderea accesului de dializă).
- Severitate: mare.
- Corectură: `r06.evita` + „; brațul cu limfedem, cu ganglioni axilari excizați sau iradiat, cu fistulă de dializă, cateter sau port: nu masa fără avizul medicului" (aceeași propoziție în nota s09, s12, s14, s15). `s12.cum`: înlocuiește „fără a opri pulsul" cu „cu presiune atât de ușoară încât pulsul să rămână simțit sub deget". Adaugă `limfedem` în `PFLAGS` (vezi #7) și `if(o.regiune==='brate')rAdd(R,'ask','limfedem')`. În `nu_face[12]` adaugă „sau după radioterapie în zonă".
- Sursă: [S9] (precauții pentru brațul cu ganglioni excizați; nu tratează explicit masajul), restul fără sursă verificată.

### 16. Cancer cu metastaze osoase / osteoporoză: presiune fermă pe coaste și coloană în r11, r03, s16–s17, s30
- Loc: `masaj_secv.json` r11 (`evita` spune „osteoporoză severă", dar `TECH_ASK.osteo` produce doar „ask"), r03 (`mn`, nu e în `TECH_ASK`), s16/s17 (BL52 la nivelul coastelor flotante), s30.
- Problemă: nicăieri nu apare metastaza osoasă/mielomul ca motiv să eviți presiunea pe coloană/coaste. Flag-ul `onco` produce „ask" generic.
- Severitate: mare (probabilitate mică, consecință fractură patologică).
- Corectură: `TECH_ASK.osteo` + `'mn','ps','pe','bl'` pentru regiunile `spate`/`umeri`; în `PFLAGS.onco`: „Am sau am avut cancer, inclusiv cu afectare osoasă, ori sunt în tratament oncologic"; în `r11.evita` și `s17.nota`: „cancer cu afectare osoasă sau durere osoasă nocturnă: nu apăsa pe coloană, coaste sau bazin; durerea osoasă nouă cere consult". r11 trebuie să fie `stop` pentru `osteo` (textul zice „evită").
- Sursă: fără sursă verificată.

### 17. BL1 în auto-presiune (protocol „Ochi obosiți", condiția `oboseala-oculara`)
- Loc: `05_…js` PROT „Ochi obosiți" (`BL1`); `cond_a.txt` `oboseala-oculara`; `pts_g2.txt` BL1 („în depresiunea de lângă peretele orbitar medial", „risc de hematom orbitar").
- Problemă: BL1 este în unghiul intern al ochiului, adiacent globului; sesiunea ghidată îl afișează cu localizarea lui, ca țintă de presiune.
- Severitate: mare (leziune oculară, hematom orbitar; cardul punctului cere „personal calificat").
- Corectură: scoate BL1 din ambele liste (păstrează BL2, EX-HN4, ST2) și adaugă în `n`: „Presiunea merge numai pe osul de deasupra și de sub ochi, niciodată în unghiul intern sau pe glob."

### 18. Acupresura „la mijlocul" ochilor/tâmplei fără avertisment pentru arterita temporală
- Loc: s03, r01 (EX-HN5, GB8), PROT „Cefalee de tensiune", s29.
- Problemă: cefaleea nouă la ≥50 ani cu sensibilitate temporală, claudicație mandibulară sau simptome vizuale este o urgență oftalmologică (pierdere permanentă a vederii); nota s03 menționează doar „pulsatilă, tulburări de vedere, traumatism".
- Severitate: mare.
- Corectură (`s03.nota`, adaugă): „Dacă ai peste 50 de ani și durerea de cap este nouă, cu sensibilitate la atingerea tâmplei sau a scalpului, durere la mestecat ori tulburări de vedere, nu face acupresură: cere evaluare medicală în aceeași zi."
- Sursă: [S8].

---

## MEDIU

### 19. „Hernie" din profil înseamnă doar hernie de disc; hernia abdominală/AAA/ascita/stoma nu sunt în profil, deși s25/s31/r08 le citează
- Loc: `PFLAGS.hernie` („hernie de disc…"); `VAR_ASK.hernie`/`TECH_ASK.hernie`; `masaj_simult.json` s25, s31 („hernie"); `masaj_secv.json` r08.
- Problemă: ambiguitate de termen; r08 are 12 contraindicații dar profilul nu poate declanșa „stop" pentru niciuna în afară de sarcină.
- Severitate: mediu.
- Corectură: `PFLAGS` nou `abdomen` (text în #7) și `if(o.regiune==='abdomen')rAdd(R,'stop','abdomen')`. Redenumește eticheta existentă „hernie" în „Am hernie de disc, durere de spate cu iradiere sau operație pe coloană" (deja așa) și în notele s25/s31 scrie „hernie abdominală sau inghinală".

### 20. Neuropatie: sesiuni de talpă cu minge și presiune „4–6/10" doar cu „ask"
- Loc: s22 (KI1 cu minge), s27, r05 (`mn`, `mt`, „Presiune de 4–6 din 10"); `rPt` face `neuropatie` doar „ask".
- Problemă: scala 0–10 nu are sens la sensibilitate redusă; leziuni neresimțite (ulcer diabetic).
- Severitate: mediu.
- Corectură: în `profR`: `if(o.id==='s22'||o.id==='s27'||o.id==='r05')rAdd(R,'stop','neuropatie')`; textul insignei: „Cu sensibilitate redusă la picior nu face acest exercițiu; cere medicului sau podologului o rutină sigură (inspecția zilnică a tălpilor este mai importantă decât masajul)."

### 21. GB30 cu greutatea corpului (s18, r03) și exercițiul în picioare lângă perete
- Loc: s18 (`cum`: „Apasă încet în adâncime"; două mingi de tenis între perete și fese), r03 (în picioare), r10.
- Problemă: presiune greu de dozat, risc pentru sciatic, șold operat/proteză, osteoporoză, echilibru precar la vârstnici.
- Severitate: mediu.
- Corectură: `s18.cum`: „…Lasă greutatea să crească treptat până la 3–5 din 10, nu în adâncime; ține o mână pe scaun sau pe perete." `s18.nota` (adaugă): „Nu face exercițiul dacă ai proteză sau durere de șold, osteoporoză severă ori probleme de echilibru; oprește la furnicături sau durere care coboară în picior." `r03.poz`: adaugă „Dacă ai amețeli sau echilibru precar, fă secvența șezând, cu mingea între spătar și spate."

### 22. Gât: s02/r12/r01/r02 – parteneri la ceafă fără alarma de disecție/ischemie vertebrobazilară
- Loc: s02 (GB20 în „clește" + GV16 „în sus și ușor spre înainte"), r12, r01 pas 5, r02 pas 5.
- Problemă: nota se oprește la „amețeală, furnicături în brațe". Nu cere oprirea la diplopie, tulburări de vorbire/înghițire, durere cervicală nouă intensă; nu interzice hiperextensia capului. GV16 e zonă de pericol la ac.
- Severitate: mediu (risc rar, consecință gravă). Compară [S6] pentru logica pericolului vascular cervical.
- Corectură (`s02.nota` și `r12.nota`, adaugă): „Presiunea merge pe mușchi, nu în adâncime, fără a extinde capul pe spate. Dacă apare amețeală, vedere dublă, vorbire încurcată, dificultăți la înghițit, slăbiciune într-un braț sau durere nouă și intensă în ceafă, oprește și sună la 112."
- Sursă: fără sursă verificată pentru incidența disecției după masaj ușor.

### 23. „Ask" nu necesită confirmare
- Loc: `26_profil.js` → `gateDraw`/`gateChk`.
- Problemă: „Doar cu acordul medicului" apare ca insignă, iar butonul „Pornește" rămâne activ.
- Severitate: mediu.
- Corectură: pentru fiecare `ask` adaugă bifă „Am discutat cu medicul și am acordul lui pentru această sesiune" și condiționează `go.disabled` de ea (similar `#gC`).

### 24. Reflexologie/„Ureche & tălpi": LI4, SP4, LR3, KI3, BL60 fără avertisment de sarcină
- Loc: `10_views.js` → `vEar` (liste „Mâini — puncte utile", „Tălpi — puncte utile", reflexologie palmară/plantară, presiune moderată 3–5 s).
- Severitate: mediu.
- Corectură: după titlul „Reflexologie plantară" adaugă: „În sarcină nu masa tălpile, gleznele și mâna (LI4, SP6, BL60, LR3, SP4, KI3) decât cu avizul medicului sau al moașei. Cu diabet și sensibilitate redusă la picior, doar cu avizul medicului."

### 25. Avertismente de acupunctură afișate crud în sesiunea ghidată
- Loc: `10_views.js` → `drawSes` (afișează `x.w` neprefixat); cardul punctului folosește „Pentru acupunctori:".
- Problemă: utilizatorul vede în timpul sesiunii „Risc de pneumotorax: se înțeapă oblic…", „Pe artera carotidă: înțepare…" etc.; poate fi confuz sau alarmant, iar mesajul util de acupresură se pierde.
- Severitate: mediu.
- Corectură: în `drawSes`, aplică aceeași logică: `${NEEDLEW.test(x.w)&&!isPregPt(x)?'<span class="mut">Pentru acupunctori: </span>':''}${esc(x.w)}`.

### 26. Jurnalul: nu reacționează la agravare
- Loc: `26_profil.js` → `sesDoneHtml`/`jrSave`.
- Problemă: scor „după" mai mare decât „înainte" nu declanșează nimic.
- Severitate: mediu.
- Corectură: în `jrSave`, dacă `a>b+1` sau `a>=7`: modal „Disconfortul a crescut după sesiune. Nu repeta sesiunea. Dacă durerea persistă peste 24–48 de ore sau apar amorțeală, umflătură, vânătaie ori simptomele din lista de alarmă, vorbește cu medicul."

### 27. s28 (greață) și s10/s11 (PC6): alarme incomplete
- Loc: `masaj_simult.json` s28, s10, s11.
- Problemă: greață + durere toracică/transpirații, cefalee severă sau tulburări neurologice (infarct, AVC, HSA), sarcină cu vărsături persistente/deshidratare, chimioterapie nu apar.
- Severitate: mediu.
- Corectură (`s28.nota`): „În sarcină cere sfatul medicului. Greața cu durere sau presiune în piept, transpirații, lipsă de aer, durere de cap severă, amețeală intensă, slăbiciune sau vorbire încurcată: sună la 112. Vărsături repetate, febră, durere abdominală puternică, semne de deshidratare (gură uscată, urină puțină) sau vărsături într-o sarcină: consult medical în aceeași zi. În chimioterapie, discută cu echipa oncologică."
- Sursă: [S1], [S5] pentru semnele neurologice; restul fără sursă verificată.

### 28. s25/r08: alarme abdominale incomplete
- Loc: s25 `nota`, r08 `evita`.
- Problemă: lipsesc oprirea tranzitului cu vărsături/balonare dură (ocluzie), sânge în scaun sau vărsături, pierdere neintenționată în greutate, calcul biliar/renal acut; „menstruație abundentă" apare ca contraindicație, dar nu apare nimic despre dispozitiv intrauterin/sarcină posibilă (menstruație întârziată).
- Severitate: mediu.
- Corectură (adaugă la ambele): „Nu începe dacă ai vărsături repetate, abdomen umflat și dur, nu elimini gaze sau scaun, vezi sânge în scaun sau în vărsătură, ai durere în flanc cu febră sau ai menstruația întârziată și sarcina nu e exclusă."

### 29. Pacemaker/dispozitive: s30 nu poate fi blocat din profil; sesiuni cu cap/stern fără alertă de implant
- Loc: `VAR_ASK.pacemaker` privește doar variante electrice; `masaj_tehnici.json` → `nu_face[14]` OK; s30, s12.
- Severitate: mediu (acoperit parțial de #7).
- Corectură: adaugă `s30:['pacemaker']` în `SIM_ASK` (#7) cu insigna: „Cu pacemaker sau alt dispozitiv implantat, nu apăsa în zona dispozitivului (sub claviculă, stern); întreabă medicul."

---

## MIC

### 30. Locuri greșite/contradictorii: lățimi de deget vs. cun
- Loc: s10 și s28 („PC6 la 2 lățimi de deget" vs r09 „3 lățimi"; vCun spune 2 cun = 3 degete), s19 (ST36 și SP6 „3 lățimi"; 3 cun = 4 degete), r04 (ST36), s25 (ST25 „2 lățimi" față de 2 cun ≈ 3).
- Risc: apăsare pe alt punct (inclusiv pe cele evitate în sarcină, SP6/ST25).
- Severitate: mic.
- Corectură: PC6 „la 3 lățimi de deget (aprox. 2 cun)"; ST36 și SP6 „la 4 lățimi de deget (aprox. 3 cun)"; ST25 „la 3 lățimi de deget lateral de ombilic (2 cun)".

### 31. s17: presiune dublă și text duplicat
- Loc: s17 `cum` („3–5/10" și apoi „ținta: 4–6 din 10"; propoziția cu semnalul de oprire apare de două ori).
- Severitate: mic. Corectură: păstrează „3–5 din 10" (spate, partener) și un singur bloc standard de oprire.

### 32. Terminologie care poate încuraja presiune prelungită: „Presiune statică (ischemică ușoară)" și „până la o senzație de presiune fermă"
- Loc: `masaj_tehnici.json` → `ps` (`n`, `cum`).
- Severitate: mic. Corectură: `n`: „Presiune statică pe punct"; `cum`: „…crește treptat până la o presiune confortabilă (4–6 din 10), niciodată dureroasă…".

### 33. Afirmații ușor peste dovezi
- Loc: `fr` („poate reduce senzația de rigiditate… cicatricilor vechi"), `pl` („poate detensiona pielea și țesutul de dedesubt"), `tp` („stimulare tonifiantă… «trezire»"), s14 („cot de tenisman"), r07 („ușurare în zona nasului").
- Severitate: mic.
- Corectură: înlocuiește cu „senzație de încălzire locală și relaxare, fără efect dovedit asupra cicatricilor" (fr), „senzație de pielea mai puțin «lipită»" (pl), „senzație de energizare pe moment" (tp).

### 34. RED sărit 2 ore după prima bifare, indiferent de sesiune
- Loc: `26_profil.js` → `gateDraw` (`fresh`), `gateGo` (`S.pre`).
- Problemă: după o sesiune pe cap, se poate începe una abdominală fără reverificare; `S.pre` se setează doar dacă lista a fost afișată.
- Severitate: mic.
- Corectură: păstrează `fresh` doar dacă regiunea sesiunii e aceeași (`S.preReg===regiune`) sau reduce la 30 de minute.

### 35. Cădere/amețeală în r10, r03, s18 („în picioare")
- Loc: r10 `poz`, r03 `poz`, s18 `poz`; r10 `evita` menționează amețeala, dar nu vârstnicii.
- Severitate: mic.
- Corectură: adaugă în `poz` „Dacă ești vârstnic sau ai amețeli, fă secvența șezând."

---

## Rezumat în 5 rânduri
1. Datele de punct pentru sarcină sunt corecte (LI4, SP6, BL60, BL67, GB21, CV3–CV7, BL31–34 marcate efectiv), dar 12 puncte pe care textele le declară de evitat (KI3, LR3, SP4, BL25/26/52/23, GB30, SP8, SP10) nu sunt marcate, deci profilul „sarcină" nu blochează r11, s17, s18, s23, s27, r09.
2. Cele mai grave goluri sunt de triaj: lista RED (5 semne) lipsește cefaleea în trăsnet, AVC, coada de cal, sângerarea, abdomenul acut și ideația suicidară, iar răspunsul „112 doar dacă e sever" amână îngrijirea în durere toracică/AVC/TVP.
3. Textele de siguranță (nota/evita/PROT.n) nu apar în sesiunea ghidată și nici în „Unde te doare?"; profilul gol nu produce niciun avertisment, iar combinațiile (sim) ignoră aproape toate bifele de profil (anticoag, osteoporoză, pacemaker, abdomen, limfedem).
4. Sesiunile pentru copii/sugari pornesc ca presiune pe puncte cu linia fixă „Presiune fermă", iar linia aceasta contrazice pașii „foarte ușor" pe abdomen, ochi, stern și tâmple; BL1 apare ca țintă de auto-presiune lângă globul ocular.
5. 35 de constatări (4 critice, 14 mari, 11 medii, 6 mici); corecturile în română și fragmentele de cod sunt gata de lipit, iar regex-ul `NLR` propus a fost testat în Node; sursele verificate efectiv sunt [S1]–[S9], restul marcat „fără sursă verificată".
