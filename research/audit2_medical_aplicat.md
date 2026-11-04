# Audit medical runda 2 – aplicare (PUNCTUM v2.4)

Data: 2026-11-04. Toate cele 35 de constatări din `audit2_medical.md` au fost aplicate (unele cu adaptări la structura reală a codului). Nicio corectură nu a fost respinsă ca greșită medical. Nu s-a făcut commit; `src/i18n/*.json` nu a fost atins (șirurile românești noi sunt netraduse, așteptat).

Fișiere modificate: `src/js/05_…`, `08_helpers.js`, `10_views.js`, `21_conditions.js`, `25_masaj.js`, `26_profil.js`, `28_durere.js`, `src/data/masaj_simult.json`, `masaj_secv.json`, `masaj_tehnici.json`, `cond_a.txt`, `tests/features.js`.

## CRITIC
1. **Aplicat.** `RED_LV`/`RED_TX`/`redAlarm()` în `26_profil.js`: mesajul depinde de semnul bifat (112 imediat pentru piept/respirație; 112 sau gardă pentru deficit neurologic, cefalee „în trăsnet”, coadă de cal; „nu masa, urgențe în aceeași zi” pentru membru; medic în aceeași zi pentru febră/durere neexplicată; text separat pentru idei suicidare și abdomen). Același text în poartă (`#gAlarm`, actualizat în `gateChk`) și în „Unde te doare?”. Actualizate `masaj_tehnici.siguranta.oprire[3]` și prima linie din „Când nu te trata singur” (vAcu), plus bannerul căutării.
2. **Aplicat.** `RED` are 9 semne (textul din raport).
3. **Aplicat.** `o.warn` în `masStart` (nota pentru combinații; evita + nota pentru secvențe), `startSes` (PROT.n), `cndStart`/`startCustom` (semnalele de alarmă `al`); afișat în poartă ca „Citește înainte” (și când sesiunea e blocată). Cardurile din „Unde te doare?” arată acum PROT.n, `nota`, `evita`+`nota`.
4. **Aplicat.** Grupul „Copii” pornește `sesBegin(..., {child:true, fixed:true, warn:al, guide:pr})`: poartă pediatrică (textul din raport + semnale de alarmă din rând + bifă obligatorie „adult responsabil”), fără lista RED a adultului, fără scor, pași fixi de 20 s, fără selector de durată, linia „Atingere foarte ușoară, fără presiune pe puncte”, avertismentele de acupunctură ascunse. Fără filtrul de sarcină/profil adult.

## MARE
5. **Aplicat.** Linia de presiune depinde de pas (`pr:'u'|'m'`): ușoară (2–3 din 10) dacă tehnica e „ușoară”, textul conține ușor/blând, sau sesiunea e pe zonă sensibilă (s03, s04, s25, s26, s30, s31, r07, r08, r09); altfel medie (4–6). Cu profil anticoagulante: „ușoară (maximum 3 din 10)”. Text nou: „Presiune confortabilă, niciodată dureroasă”. Adaptat: r09.nota a fost aliniată la „2–3 din 10”; propoziția „presiune fermă dar suportabilă” din pagina Acasă a devenit „confortabilă, niciodată dureroasă”.
6. **Aplicat.** Profil gol și `!S.profSeen` → poarta arată doar avertismentul cu „Completez profilul” (merge la `#eu`) / „Nu am niciuna dintre acestea” (setează `S.profSeen`, sanitizat în `normExtra`); pornirea e imposibilă până la alegere. Nu se aplică la sesiunile pentru copii.
7. **Aplicat.** `SIM_ASK` + `SIM_STOP` în `profR('sim')` (unde nota spune „nu face/omite” → blocare: s30, s25, s31, s16, s17, s04, s22, s27; restul → acord medical); bife noi în `PFLAGS`: epilepsie, inimă, ochi, rinichi, abdomen, limfedem. Adăugat și `inima` pe s30/s10/s11 (fără acesta bifa ar fi rămas nefolosită).
8. **Aplicat.** `TECH_ASK.anticoag` extins (ps, bl, mn, fr, cp, mt + cele vechi); sesiunile pe protocoale/rutine proprii și combinațiile (sim) declanșează acum „ask” pentru anticoagulante; insignă cu textul din raport (`PB_ASK`); armonizat în `vSafe`, `vAcu`, `masaj_tehnici.medic[4]`.
9. **Aplicat.** `PREGX` + `isPregPt` în `08_helpers.js`; secvențe pe `spate` → stop sarcină, `picioare` → acord medical sarcină. Adăugat în `ptCard` un avertisment „În sarcină: prudență” pentru punctele PREGX fără `w`, iar prefixul „Pentru acupunctori” se decide acum după `PREGRE` (nu după `isPregPt`). Cardurile de afecțiuni/rutine folosesc `isPregPt` în loc de regex local. Formularea rămâne „prudență”, nu risc dovedit.
10. **Aplicat.** `sesReasons` folosește `strict=true` (tromboză → stop și pentru protocoale/rutine proprii; consecință: orice protocol cu puncte de picior, de ex. Insomnie cu KI1/SP6, e blocat pentru profilul „tromboză”, varianta mai restrictivă).
11. **Aplicat.** `r04.evita` înlocuit, pas nou 1 „Compară cele două gambe…” (ef, 30 s), frământarea condiționată de gambe simetrice, ST36 la 4 lățimi.
12. **Aplicat.** `ZALERT` pe zone, opțiune nouă „Slăbiciune sau amorțeală” (tratată ca „ascuțită”), sugestiile ascunse pentru cap/abdomen/picioare/lombar cu „începută azi sau ieri” + textul „peste 48 de ore, vezi medicul”.
13. **Aplicat.** `NLR` din raport (cu `\bavc\b`) + banner nou; testat pe 18 formulări pozitive (incl. „mă doare pieptul”, „gamba umflată”, „vreau să mor”) și 6 negative.
14. **Aplicat.** Rând nou în `vSafe`; r09/s26.nota și PROT „Stres & anxietate” (112, nu rămâne singur); mesajul RED #9 separat. Fără număr de criză.
15. **Aplicat.** r06.evita, s09/s12/s14/s15 nota, s12.cum (puls simțit sub deget), `nu_face[12]` (+ radioterapie), bifa `limfedem`, `ask limfedem` pentru puncte de braț și secvențe `brate`.
16. **Aplicat.** Etichetă `onco` extinsă; secvențe `spate`/`umeri` cu tehnici de presiune → acord medical osteoporoză; r11 → stop osteoporoză; r11.evita și s17.nota cu propoziția despre afectare osoasă.
17. **Aplicat.** BL1 scos din PROT „Ochi obosiți” și din `oboseala-oculara`; adăugată propoziția în `n`.
18. **Aplicat** (extins prudențial): propoziția despre arterita temporală în s03.nota, plus s29.nota, r01.nota și PROT „Cefalee de tensiune”.

## MEDIU
19. **Aplicat.** Bifa `abdomen`; secvența pe abdomen → stop; „hernie” → „hernie abdominală sau inghinală” în s25/s31/r08.
20. **Aplicat.** s22, s27, r05 → stop pentru neuropatie, cu textul din raport în insignă.
21. **Aplicat.** s18.cum/nota/poz, r03.poz.
22. **Aplicat.** s02.nota și r12.nota.
23. **Aplicat.** Bifă „Am discutat cu medicul și am acordul lui…” pentru fiecare motiv „ask”; pornirea rămâne blocată până la bifare.
24. **Aplicat.** Avertisment sub titlul „Reflexologie plantară” în `vEar`.
25. **Aplicat.** Prefix „Pentru acupunctori:” în `drawSes` (grup și punct).
26. **Aplicat.** `jrSave`: mesaj dacă scorul „după” > „înainte”+1 sau ≥ 7.
27. **Aplicat.** s28.nota înlocuită; s10/s11: durere în piept/palpitații/leșin → oprește și sună la 112.
28. **Aplicat.** Propoziția pentru ocluzie/sânge/sarcină posibilă în s25.nota și r08.evita.
29. **Aplicat.** s30 în `SIM_STOP`/`SIM_ASK` pentru pacemaker, cu insignă (`PB_STOP.pacemaker`).

## MIC
30. **Aplicat.** PC6 „3 lățimi (aprox. 2 cun)” în s10, s28, r09; ST36/SP6 „4 lățimi (aprox. 3 cun)” în s19 și r04; ST25 „3 lățimi (2 cun)” în s25.
31. **Aplicat.** s17.cum fără duplicate; ținta unică 3–5 din 10.
32. **Aplicat.** Tehnica `ps`: nume și `cum`.
33. **Aplicat.** `fr`, `pl`, `tp`, s14.ef, r07.scop.
34. **Aplicat.** Triajul reținut doar pentru aceeași regiune (`S.preReg`) și 30 de minute (ambele restricții, varianta mai strictă decât „sau” din raport).
35. **Aplicat.** Fraza „Dacă ești vârstnic sau ai amețeli…” în r10.poz, r03.poz, s18.poz.

## Teste
`tests/features.js` actualizat (9 semne; triaj reținut pe regiune; durere cu `DD[1]`) și extins cu teste noi: NLR (pozitive/negative), profil gol, sarcină (r11/s17/s18/s23/s27/r09), punctele PREGX, textul `nota`/`evita`/`n` în poartă și în Durere, alerta de zonă, bifa de acord medical, blocări profil (pacemaker, osteoporoză, neuropatie, abdomen, rinichi, ochi, tromboză), copii fără presiune pe puncte, linia de presiune ușoară, mesajul de agravare din jurnal, BL1.
