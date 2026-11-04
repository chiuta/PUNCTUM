# Audit adversarial: curs, protocoale, siguranță, teorie, glosar, meridiane (2026-11-04)
Domeniu: `course_a.json`, `course_b.json` (24 lecții), `PROT` (05), `GLO` (07), `MER` (03), `vTheory`, `vAcu`, `vSafe`, `vCun` (10_views.js). Nu s-au atins `pts_*`, `var_base`, `cond_a`, `quiz_a`, `20_maps`, `21_conditions`.
Rezultat: **74 corecturi** (fapte greșite, afirmații prea tari, contraindicații lipsă, inconsistențe). Build + teste: 0 FAIL, 0 WARN. JSON validat cu `json.load`.
## Verificări fără modificări (au rezultat corecte)
- Toate codurile de puncte din curs, PROT, MER, GLO, vTheory/vAcu/vSafe/vCun există în `pts_*.txt` (script regex, 0 lipsă); toate variantele din lecții există în `var_base.txt`.
- Ceasul meridianelor (LU 3–5 … LR 1–3), perechile yin–yang, numărul de puncte pe meridian (11/20/45/21/9/19/67/27/9/23/44/14/24/28), cicluri Sheng/Ke, Hui (opt), cheile celor opt vase, puncte Yuan/Luo/Xi/Mu/Shu: corecte.
- Cun: 12/8/8/5/12/16 cun, 1 cun = polițe la IP, 3 cun = patru degete: corecte (WHO WPRO 2008 definește doar 1 și 3 cun pe degete; 1,5 și 2 cun din vCun sunt convenții de uz).
- Chei de răspuns: 72 de întrebări, fiecare cu 4 opțiuni distincte, răspunsul corect absent din greșite, 0 duble.
- Cochrane Lee/Chan/Fan 2015 (59 studii, 7667 participanți): PC6 vs sham = certitudine scăzută, PC6 vs antiemetice = moderată (confirmat pe pagina Cochrane/PMC4679372); Xiao 2023 (10 RCT, 975 pacienți) confirmat; Allen/Mak 2022 JAMA Netw Open (4 concluzii cu certitudine înaltă: fertilitate/FIV, fibromialgie, durere de umăr, AVC; migrenă și cefalee tensională moderat) confirmat; ICCJ 11.03.2025 (norme Legea 118/2007) confirmat prin Antena 3.
## Modificări (înainte → după, motiv, sursă)
### 1. `src/data/course_a.json`
- Înainte: Dovezile moderne sunt moderate pentru unele dureri cronice (lombară, de genunchi, cefalee) și pentru greața postoperatorie sau cea din chimioterapie. Pentru multe alte afecțiuni
- După: Dovezile moderne sunt de calitate scăzută până la moderată pentru unele dureri cronice (lombară, cefalee, migrenă) și pentru greața postoperatorie, iar beneficiile sunt în general mici; pentru osteoartrita de genunchi diferența față de sham este mică și adesea sub pragul de relevanță clinică. Pentru multe alte afecțiuni
- Motiv: Formulare prea tare („moderate”, genunchi, chimioterapie).
- Sursă: Cochrane CD003281; JAMA Netw Open 2022 (Allen et al.): genunchi = fără diferență funcțională față de control; NCCIH

### 2. `src/data/course_a.json`
- Înainte: Dovezile sunt moderate pentru unele dureri cronice și greață, slabe sau mixte pentru multe alte afecțiuni.
- După: Dovezile sunt de calitate scăzută până la moderată pentru unele dureri cronice și pentru greața postoperatorie, slabe sau mixte pentru multe alte afecțiuni.
- Motiv: Coerență cu textul lecției.

### 3. `src/data/course_a.json`
- Înainte: o colecție de texte alcătuită în perioada Han, aproximativ între secolele al II-lea și I î.Hr., deși unele părți par mai vechi.
- După: o colecție de texte alcătuită în straturi, între perioada Statelor Combatante și dinastia Han (aproximativ secolele al IV-lea–I î.Hr.; datarea exactă este disputată). Forma actuală a Suwen-ului se bazează pe o ediție comentată din secolul al VIII-lea (Wang Bing).
- Motiv: Datare prea precisă; consistență cu var_base (acu-cl: „datare disputată”).
- Sursă: Enciclopedii/istoria MTC (Unschuld; Wang Bing 762 d.Hr.)

### 4. `src/data/course_a.json`
- Înainte: Huangdi Neijing (Suwen și Lingshu) datează din perioada Han, cam secolele II–I î.Hr., și este o compilație, nu opera unui singur autor.
- După: Huangdi Neijing (Suwen și Lingshu) este o compilație în straturi, din perioada Statelor Combatante–Han (datare disputată), nu opera unui singur autor.
- Motiv: La fel.

### 5. `src/data/course_a.json`
- Înainte: Zhenjiu Jiayijing („Marele compendiu al acupuncturii și moxibustiei”), compilat de Huangfu Mi în jurul anului 282 d.Hr.
- După: Zhenjiu Jiayijing („Canonul sistematic A–B al acupuncturii și moxibustiei”), compilat de Huangfu Mi în a doua jumătate a secolului al III-lea d.Hr. (cca 256–282)
- Motiv: Titlu greșit: „Marele compendiu” este Zhenjiu Dacheng (1601, Yang Jizhou); 282 este anul morții lui Huangfu Mi, nu data compilării.
- Sursă: Istoria acupuncturii (Huangfu Mi 215–282)

### 6. `src/data/course_a.json`
- Înainte: Zhenjiu Jiayijing (Huangfu Mi, cca 282 d.Hr.) a sistematizat
- După: Zhenjiu Jiayijing (Huangfu Mi, sec. III d.Hr.) a sistematizat
- Motiv: La fel.

### 7. `src/data/course_a.json`
- Înainte: Cine a compilat Zhenjiu Jiayijing, în jurul anului 282 d.Hr.?
- După: Cine a compilat Zhenjiu Jiayijing, în secolul al III-lea d.Hr.?
- Motiv: La fel.

### 8. `src/data/course_a.json`
- Înainte: în primele secole d.Hr., iar acolo
- După: în primele secole d.Hr. (în Japonia, mai ales din secolul al VI-lea), iar acolo
- Motiv: Precizare cronologică.

### 9. `src/data/course_a.json`
- Înainte: Pielea lezată, inflamată, cu erupții sau cu infecție nu se masează.
- După: Pielea lezată, inflamată, cu erupții sau cu infecție nu se masează; la fel zonele cu tromboză venoasă, fracturi recente sau tumori. În cancer, epilepsie, boli cardiace severe sau la copii mici, cere mai întâi sfatul medicului.
- Motiv: Contraindicații lipsă (tromboză, fracturi, tumori, cancer, epilepsie, copii).
- Sursă: Practică clinică standard; NHS/NCCIH: acupresura – precauții

### 10. `src/data/course_a.json`
- Înainte: într-un context istoric în care disecția era limitată
- După: într-un context istoric în care cunoașterea anatomiei și fiziologiei era limitată
- Motiv: Afirmație istorică prea tare (disecții au existat în China).

### 11. `src/data/course_a.json`
- Înainte: urcă pe fața internă a brațului
- După: merg pe fața internă a brațului
- Motiv: Meridianele yin ale mâinii circulă dinspre torace spre mână (descendent), nu „urcă”.

### 12. `src/data/course_a.json`
- Înainte: pe care le vei întâlni în lecția 3.
- După: pe care le vei întâlni în lecția „Tipuri speciale de puncte”.
- Motiv: Trimitere ambiguă („lecția 3” = lecția curentă).

### 13. `src/data/course_a.json`
- Înainte: Cercetătorii au arătat și că în multe cazuri efectele măsurate nu depind strict de un punct exact, ci de zona și de stimul. Acest lucru este un motiv de umilință metodologică, nu un motiv de neglijență
- După: Unele studii sugerează și că efectele măsurate depind mai puțin de un punct exact decât de zona stimulată și de tipul de stimul, dar întrebarea rămâne deschisă. Acest lucru cere modestie metodologică, nu neglijență
- Motiv: Afirmație de eficacitate prea tare („au arătat”).
- Sursă: Comparații acupunctură reală vs sham (Vickers 2018)

### 14. `src/data/course_a.json`
- Înainte: Punctele He mare (He-Sea) sunt situate de obicei lângă cot sau genunchi și, în tradiție, influențează organele Fu: ST36 (Stomac), GB34 (Vezică biliară), BL40 (Vezică urinară), LI11 (Intestin gros).
- După: Punctele He mare (He-Sea) sunt situate de obicei lângă cot sau genunchi (de exemplu LI11 și HT3 la cot). Cele de pe picior, numite „He inferioare”, sunt legate în tradiție de organele Fu: ST36 (Stomac), GB34 (Vezică biliară), BL40 (Vezică urinară).
- Motiv: LI11 nu este un punct He inferior (acestea sunt pe membrul inferior: ST36, ST37, ST39, BL39, BL40, GB34).
- Sursă: Lingshu cap. 2/4; manuale MTC (Maciocia)

### 15. `src/data/course_a.json`
- Înainte: Pe o fișă, scrie cele opt perechi de puncte de deschidere (SP4–PC6, SI3–BL62, TE5–GB41, LU7–KI6)
- După: Pe o fișă, scrie cele patru perechi (opt puncte) de deschidere (SP4–PC6, SI3–BL62, TE5–GB41, LU7–KI6)
- Motiv: Sunt 4 perechi, nu 8.

### 16. `src/data/course_a.json`
- Înainte: este cel mai studiat punct pentru greață, cu dovezi moderate pentru greața postoperatorie.
- După: este cel mai studiat punct pentru greață; pentru greața postoperatorie, sinteza Cochrane (2015) a găsit dovezi de calitate scăzută față de sham și moderate față de medicamentele antiemetice.
- Motiv: Dovezi „moderate” pe ansamblu: incorect față de sham.
- Sursă: Cochrane CD003281 (Lee, Chan, Fan 2015): PC6 vs sham = certitudine scăzută; PC6 vs antiemetice = moderată

### 17. `src/data/course_a.json`
- Înainte: Dovezile sunt cele mai consistente pentru PC6 și greață (postoperatorie, în sarcină, în chimioterapie); pentru ST36
- După: Dovezile sunt cele mai consistente pentru PC6 și greața postoperatorie (calitate scăzută până la moderată); pentru greața din chimioterapie sunt mai slabe și de calitate mixtă (Xiao 2023, 10 studii), iar pentru cea din sarcină rezultatele sunt neconcludente. Pentru ST36
- Motiv: Supraestimare: sarcină/chimioterapie prezentate ca la fel de bine susținute.
- Sursă: Xiao 2023, Support Care Cancer 31:510 (10 RCT, 975 pacienți, calitate limitată); Cochrane Matthews 2015 (greață în sarcină)

### 18. `src/data/course_a.json`
- Înainte: (LI4, SP6, uneori și GB21, în tradiție)
- După: (LI4, SP6, uneori și GB21 sau BL60, în tradiție)
- Motiv: Completare (BL60 este marcat contraindicat în sarcină în atlas).

### 19. `src/data/course_a.json`
- Înainte: Cele mai consistente dovezi vizează PC6 și greața; pentru celelalte puncte rezultatele sunt mixte.
- După: Cele mai consistente dovezi vizează PC6 și greața postoperatorie (calitate scăzută până la moderată); pentru celelalte puncte rezultatele sunt mixte.
- Motiv: Coerență.

### 20. `src/data/course_a.json`
- Înainte: Greața (postoperatorie, în sarcină, în chimioterapie), cu PC6
- După: Greața postoperatorie, cu PC6 (dovezi de calitate scăzută până la moderată)
- Motiv: Răspuns corect prea larg/nesusținut.

### 21. `src/data/course_a.json`
- Înainte: Pentru PC6 și greață există dovezi moderate. Pentru celelalte
- După: Pentru PC6 și greața postoperatorie dovezile sunt de calitate scăzută până la moderată. Pentru celelalte
- Motiv: Coerență.

### 22. `src/data/course_b.json`
- Înainte: respirația lentă activează sistemul parasimpatic, iar atenția
- După: respirația lentă poate favoriza activarea sistemului parasimpatic, iar atenția
- Motiv: Prea categoric.

### 23. `src/data/course_b.json`
- Înainte: zonele cu vânătăi recente și zonele operate.
- După: zonele cu vânătăi recente și zonele operate, precum și zonele cu tromboză venoasă, fracturi recente sau tumori. La copii mici și la persoane vârstnice fragile presiunea rămâne foarte blândă.
- Motiv: Contraindicații lipsă.

### 24. `src/data/course_b.json`
- Înainte: Expirația lungă și relaxarea mușchilor fac tehnica mai eficientă și mai sigură.
- După: Expirația lungă și relaxarea mușchilor fac tehnica mai confortabilă și mai ușor de tolerat.
- Motiv: „mai eficientă și mai sigură” – afirmație nesusținută.

### 25. `src/data/course_b.json`
- Înainte: Respirația lentă scade tensiunea și activează răspunsul parasimpatic;
- După: Respirația lentă poate scădea tensiunea și favoriza răspunsul parasimpatic;
- Motiv: Prea categoric.

### 26. `src/data/course_b.json`
- Înainte: În PUNCTUM găsești patru protocoale de bază.
- După: Aici vezi patru dintre protocoalele din PUNCTUM.
- Motiv: Aplicația are 15 protocoale, nu 4.

### 27. `src/data/course_b.json`
- Înainte: Apasă PC6 un minut pe fiecare braț, cu respirație lentă.
- După: Apasă PC6 un minut pe fiecare braț, cu respirație lentă. În sarcină, cere mai întâi sfatul medicului (dovezile pentru greața din sarcină sunt neconcludente, iar CV12 se evită sau se folosește doar cu avizul medicului).
- Motiv: Contraindicație lipsă (sarcină).
- Sursă: Cochrane Matthews 2015; atlas: CV12 „doar sub îndrumare medicală în sarcină”

### 28. `src/data/course_b.json`
- Înainte: igiena somnului rămâne baza.
- După: igiena somnului rămâne baza. Dacă insomnia durează peste 3 săptămâni sau apar sforăit cu pauze de respirație, cere consult.
- Motiv: Semn de alarmă lipsă.
- Sursă: NHS – insomnia

### 29. `src/data/course_b.json`
- Înainte: are suport mai bun.
- După: este o recomandare uzuală, cu dovezi modeste, dar fără riscuri.
- Motiv: Afirmație de eficacitate nesusținută („suport mai bun”).

### 30. `src/data/course_b.json`
- Înainte: Regula 20-20-20 are dovezi mai bune decât acupresura oculară.
- După: Regula 20-20-20 este o recomandare uzuală, cu dovezi modeste, dar fără riscuri.
- Motiv: La fel.

### 31. `src/data/course_b.json`
- Înainte: Aplicarea de căldură pe pleoape timp de o oră
- După: Frecarea energică a ochilor
- Motiv: Distractor discutabil: compresele calde au indicații reale în disfuncția glandelor Meibomius.

### 32. `src/data/course_b.json`
- Înainte: dar calitatea este variabilă și nu înlocuiește îngrijirea obstetricală.
- După: dar calitatea este scăzută sau variabilă, iar practica se face doar sub supraveghere obstetricală, nu acasă.
- Motiv: Moxa în sarcină: contraindicație/precizare lipsă.
- Sursă: Cochrane Coyle 2012 (moxibustion for breech: dovezi de calitate scăzută)

### 33. `src/data/course_b.json`
- Înainte: Marcile circulare nu sunt vânătăi traumatice, dar pot dura zile.
- După: Marcile circulare sunt echimoze (sânge scurs sub piele), nu răni deschise, dar pot dura zile sau săptămâni; ventuzele nu se aplică pe piele lezată, la anticoagulante, în sarcină (abdomen și zona lombară) sau la copii mici.
- Motiv: Afirmație inexactă (marcile SUNT echimoze) + contraindicații lipsă.

### 34. `src/data/course_b.json`
- Înainte: Se evită la persoane cu stimulator cardiac sau epilepsie necontrolată, fără acordul medicului.
- După: Este contraindicată la persoane cu stimulator cardiac sau alt implant electric și în epilepsie sau antecedente de convulsii; nu se trece curent prin torace, cap sau gât, iar în sarcină, aritmii, piele infectată sau alergie la metale se cere acordul medicului.
- Motiv: Contraindicații incomplete și inconsistente cu var_base (ea).
- Sursă: var_base.txt (ea); NHS TENS

### 35. `src/data/course_b.json`
- Înainte: Contraindicații: stimulator cardiac, sarcină (regiuni specifice), piele lezată, zone cu pierdere de sensibilitate.
- După: Contraindicații: stimulator cardiac, epilepsie (mai ales pe cap/gât), sarcină (regiuni specifice), piele lezată, zone cu tumori, regiunea inimii și a gâtului, zone cu pierdere de sensibilitate.
- Motiv: Contraindicații incomplete.
- Sursă: NHS – TENS: nu pe cap/gât/torace; epilepsie; pacemaker; sarcină

### 36. `src/data/course_b.json`
- Înainte: pentru greața postoperatorie, cu dovezi de calitate limitată, iar rezultatele
- După: pentru greața postoperatorie (dovezi de calitate scăzută față de sham, moderate față de antiemetice), iar rezultatele
- Motiv: Imprecis; aliniere cu L4-2 și L6-2.
- Sursă: Cochrane CD003281 (Lee, Chan, Fan 2015): PC6 vs sham = certitudine scăzută; PC6 vs antiemetice = moderată

### 37. `src/data/course_b.json`
- Înainte: Electroacupunctura: ace plus curent; același nivel de dovezi ca acupunctura, cu precauții la stimulator cardiac.
- După: Electroacupunctura: ace plus curent; același nivel de dovezi ca acupunctura; contraindicată la stimulator cardiac și în epilepsie.
- Motiv: Coerență.

### 38. `src/data/course_b.json`
- Înainte: Dovezi de calitate limitată în greața postoperatorie, nu pentru orice brățară sau situație
- După: Dovezi de calitate scăzută până la moderată în greața postoperatorie, nu pentru orice brățară sau situație
- Motiv: Coerență.

### 39. `src/data/course_b.json`
- Înainte: pe baza unor dovezi de calitate scăzută, în timp ce ghidul NICE NG59
- După: pe baza unor dovezi de calitate scăzută până la moderată, în timp ce ghidul NICE NG59
- Motiv: ACP 2017 a evaluat dovezile ca moderate pentru lombalgia cronică și scăzute pentru cea acută/subacută.
- Sursă: Qaseem et al., Ann Intern Med 2017

### 40. `src/data/course_b.json`
- Înainte: profilaxia migrenei și a cefaleei de tip tensional.
- După: profilaxia migrenei și a cefaleei de tip tensional cronice.
- Motiv: NICE CG150 vizează cefaleea tensională cronică.
- Sursă: NICE CG150

### 41. `src/data/course_b.json`
- Înainte: aceste măsurători distinge fiabil
- După: aceste măsurători disting fiabil
- Motiv: Greșeală gramaticală.

### 42. `src/js/03_date-meridiane.js`
- Înainte: „Marea mare a Yin-ului"
- După: „Marea meridianelor Yin"
- Motiv: Formulare greșită („marea mare”); Ren Mai = „Marea meridianelor Yin”.

### 43. `src/js/03_date-meridiane.js`
- Înainte: „Marea mare a Yang-ului"
- După: „Marea meridianelor Yang"
- Motiv: La fel.

### 44. `src/js/07_date-glosar.js`
- Înainte: folosite pentru a tonifia organul/meridianul respectiv
- După: folosite tradițional pentru a regla organul/meridianul respectiv
- Motiv: Prea restrictiv: Yuan nu se folosesc doar pentru tonifiere.

### 45. `src/js/07_date-glosar.js`
- Înainte: Puncte de „mare" la cot și genunchi (ex. LI11, ST36, BL40).
- După: Puncte de „mare" la cot și genunchi (ex. LI11, HT3, ST36, BL40); cele de pe picior se leagă tradițional de organele Fu.
- Motiv: Precizare.

### 46. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'PC6 este punctul cu cele mai bune dovezi clinice. Presează pe ambele încheieturi (poți folosi și brățări de presopunctură).'
- După: n:'PC6 este punctul cel mai studiat pentru greață (dovezi de calitate scăzută până la moderată, mai ales după operație). Presează pe ambele încheieturi; brățările de presopunctură au dovezi la fel de limitate. În sarcină cere sfatul medicului, iar CV12 se evită. Vărsături repetate, febră sau durere abdominală puternică: consult medical.'
- Motiv: Supraafirmație („cele mai bune dovezi clinice”) + lipsă sarcină/semne de alarmă.
- Sursă: Cochrane CD003281 (Lee, Chan, Fan 2015): PC6 vs sham = certitudine scăzută; PC6 vs antiemetice = moderată

### 47. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Masează încet baza craniului (GB20) cu degetele mari, apoi tâmplele.'
- După: n:'Masează încet baza craniului (GB20) cu degetele mari, apoi tâmplele. Omite LI4 în sarcină. Cefalee bruscă și severă, cu febră și redoare de ceafă, slăbiciune sau tulburări de vedere/vorbire, ori apărută după un traumatism: urgență, nu acupresură.'
- Motiv: Semne de alarmă și sarcină lipsă.

### 48. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: p:['HT7','EX-Anmian','EX-HN3','KI1','SP6'],n:'Fă sesiunea cu 30–60 min înainte de somn, într-o cameră liniștită. „EX" = Anmian.'
- După: p:['HT7','EX-HN14','EX-HN3','KI1','SP6'],n:'Fă sesiunea cu 30–60 min înainte de somn, într-o cameră liniștită; igiena somnului contează mai mult decât punctele. Omite SP6 în sarcină. Insomnie peste 3 săptămâni, sforăit cu pauze respiratorii sau stare depresivă: cere consult.'
- Motiv: EX-Anmian este punct nestandard OMS (codificare variabilă), iar nota „EX = Anmian” era confuză; înlocuit cu EX-HN14 Yiming (punct standard OMS 2008, indicat în insomnie în atlas).
- Sursă: WHO Standard Acupuncture Point Locations 2008 (EX-HN14); pts_g4.txt

### 49. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Respirație lentă pe nas: 4 secunde inspir, 6 secunde expir.'
- După: n:'Respirație lentă pe nas: 4 secunde inspir, 6 secunde expir. Efectul probabil este de relaxare; nu înlocuiește tratamentul anxietății persistente. Gânduri de autovătămare: cere ajutor imediat (112).'
- Motiv: Ton: efect probabil de relaxare; semn de alarmă lipsă.

### 50. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Poți combina cu înclinări lente ale capului. Evită presiunea puternică pe lateralul gâtului (arterele).'
- După: n:'Poți combina cu înclinări lente ale capului. Evită presiunea puternică pe lateralul gâtului (arterele). Omite LI4 și GB21 în sarcină. Amorțeală sau durere care coboară în braț, slăbiciune ori amețeli: consult medical.'
- Motiv: Sarcină și semne de alarmă lipsă.

### 51. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Presiune cu degetele mari sau cu o minge de tenis lângă coloană; niciodată direct pe coloana vertebrală.'
- După: n:'Presiune cu degetele mari sau cu o minge de tenis lângă coloană; niciodată direct pe coloana vertebrală. Omite BL60 în sarcină și cere avizul medicului pentru zona lombo-sacrată. Durere care coboară în picior, slăbiciune, amorțeală în șa, pierderea controlului vezicii sau intestinului, febră ori durere după traumatism: urgență.'
- Motiv: Sarcină și semne de alarmă (sindrom de coadă de cal) lipsă.
- Sursă: NHS – back pain

### 52. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'La cel puțin 1 oră după masă; masaj circular ușor, în sensul acelor de ceasornic, pe abdomen.'
- După: n:'La cel puțin 1 oră după masă; masaj circular ușor, în sensul acelor de ceasornic, pe abdomen. Nu pe abdomen în sarcină, după operații abdominale sau la durere abdominală puternică, febră, vărsături sau sânge în scaun.'
- Motiv: Contraindicații abdominale lipsă.

### 53. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Presiune moale pe laterale nasului (LI20), nu insera degetele în nări.'
- După: n:'Presiune moale pe lateralele nasului (LI20); nu introduce degetele în nări. Omite LI4 în sarcină. Febră, durere facială intensă sau simptome peste 10 zile: consult.'
- Motiv: Greșeală de exprimare; sarcină/semne de alarmă lipsă.

### 54. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Presiune foarte blândă în jurul orbitei; nu apăsa globul ocular. Pauze de privit în depărtare (regula 20-20-20).'
- După: n:'Presiune foarte blândă pe osul din jurul orbitei; nu apăsa globul ocular și nu aplica presiune dacă porți lentile de contact, ai glaucom, o operație oculară recentă sau o infecție oculară. Pauze de privit în depărtare (regula 20-20-20).'
- Motiv: Contraindicații oculare lipsă (prezente în lecția L4-3, dar nu în protocol).

### 55. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Fără SP6 dacă ești gravidă sau încerci să afli dacă ești. Dureri severe sau noi: consultă medicul.'
- După: n:'Nu folosi acest protocol în sarcină sau dacă menstruația întârzie și nu ai exclus sarcina (SP6, SP8, CV4 și zona lombo-sacrată se evită în tradiție). Dureri severe, noi, sângerare abundentă sau febră: consultă medicul.'
- Motiv: Nota se referea doar la SP6, deși CV4 (și SP8/BL23 în tradiție) sunt evitate în sarcină.

### 56. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Dimineața, 1–2 minute pe punct. Dacă oboseala persistă săptămâni, cere o evaluare medicală.'
- După: n:'Dimineața, 1–2 minute pe punct. Omite CV6 în sarcină. Dacă oboseala persistă săptămâni sau este însoțită de scădere în greutate, palpitații ori respirație dificilă, cere o evaluare medicală.'
- Motiv: Sarcină și semne de alarmă lipsă.

### 57. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Presiune ușoară-medie; pentru dureri dentare persistente, mergi la stomatolog.'
- După: n:'Presiune ușoară-medie; omite LI4 în sarcină. Pentru dureri dentare persistente, umflătură a feței sau febră, mergi la stomatolog.'
- Motiv: Sarcină și semne de alarmă lipsă.

### 58. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Este un ajutor de confort; tuse peste 2–3 săptămâni sau cu dificultăți de respirație cere consult.'
- După: n:'Este un ajutor de confort; nu înlocuiește medicația prescrisă (astm, BPOC). Tuse peste 2–3 săptămâni, cu sânge, febră sau dificultăți de respirație cere consult.'
- Motiv: Semn de alarmă și atenționare astm lipsă.

### 59. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Seara, cu picioarele ridicate. Umflături unilaterale, dureroase sau bruște: urgență (posibilă tromboză).'
- După: n:'Seara, cu picioarele ridicate. Omite SP6 în sarcină. Umflături unilaterale, dureroase sau bruște: urgență (posibilă tromboză). În sarcină, umflarea bruscă a feței sau a mâinilor, cefaleea ori tulburările de vedere cer consult urgent (preeclampsie). Nu înlocuiește tratamentul în insuficiență cardiacă sau renală.'
- Motiv: Preeclampsie și boli cardio-renale lipsă.

### 60. `src/js/05_date-protocoale-de-presopunc.js`
- Înainte: n:'Sesiune scurtă înaintea unei sarcini mentale; 30–40 s pe punct sunt suficiente.'
- După: n:'Sesiune scurtă înaintea unei sarcini mentale; 30–40 s pe punct sunt suficiente. Efectul probabil este de relaxare și atenție, nu există dovezi că aceste puncte cresc performanța cognitivă. Omite LI4 în sarcină.'
- Motiv: Afirmație implicită de eficacitate cognitivă fără dovezi.

### 61. `src/js/10_views.js`
- Înainte: <li><b>Externe:</b> vânt, frig, căldură, umezeală, uscăciune, foc/vară</li>
- După: <li><b>Externe:</b> vânt, frig, căldură de vară, umezeală, uscăciune, foc</li>
- Motiv: Cele șase „energii perverse” sunt Vânt, Frig, Căldură de vară, Umezeală, Uscăciune, Foc („foc/vară” contopea două).

### 62. `src/js/10_views.js`
- Înainte: <td>Tonifierea organului</td>
- După: <td>Reglarea organului (tradițional)</td>
- Motiv: Prea restrictiv.

### 63. `src/js/10_views.js`
- Înainte: ${ptLink('LR13')}, ${ptLink('CV12')}, ${ptLink('CV17')}, ${ptLink('BL17')}, ${ptLink('GB34')}, ${ptLink('LU9')}, ${ptLink('GB39')}</td></tr>
- După: ${ptLink('LR13')}, ${ptLink('CV12')}, ${ptLink('CV17')}, ${ptLink('BL17')}, ${ptLink('GB34')}, ${ptLink('LU9')}, ${ptLink('GB39')}, ${ptLink('BL11')}</td></tr>
- Motiv: Cele opt puncte Hui: lipsea BL11 (os); erau doar 7.
- Sursă: Nanjing/Neijing; manuale MTC

### 64. `src/js/10_views.js`
- Înainte: <tr><td>Comandă (4 Gates)</td><td>Zone ale corpului</td><td>${ptLink('LI4')} față, ${ptLink('LU7')} cap/ceafă, ${ptLink('BL40')} spate, ${ptLink('ST36')} abdomen, ${ptLink('PC6')} torace</td></tr>
- După: <tr><td>Puncte de comandă</td><td>Zone ale corpului (tradițional)</td><td>${ptLink('LI4')} față, ${ptLink('LU7')} cap/ceafă, ${ptLink('BL40')} spate, ${ptLink('ST36')} abdomen; unele surse adaugă ${ptLink('PC6')} torace</td></tr>
- Motiv: „4 Gates” (Si Guan) = LI4 + LR3, nu punctele de comandă; cele patru puncte de comandă clasice sunt LI4, LU7, BL40, ST36 (PC6 – adăugat de unii autori).
- Sursă: Manuale de acupunctură (Deadman; Maciocia)

### 65. `src/js/10_views.js`
- Înainte: <li>Intensitate: „durere bună", plictisitoare/caldă, niciodată ascuțită sau care radiază cu furnicături.</li>
- După: <li>Intensitate: o senzație de presiune fermă, plictisitoare sau caldă, niciodată ascuțită sau care radiază cu furnicături; orientativ 4–6 din 10.</li>
- Motiv: „Durere bună” poate încuraja apăsarea excesivă; coerență cu lecția L4-1.

### 66. `src/js/10_views.js`
- Înainte: Evită presiunea pe răni, vene varicoase severe, umflături, tumori, zone fracturate sau operate recent, febră mare și imediat după mese copioase. În sarcină evită punctele marcate ⚠.
- După: Evită presiunea pe răni, vene varicoase severe, tromboză venoasă, umflături, tumori, zone fracturate sau operate recent, febră mare și imediat după mese copioase. La anticoagulante, osteoporoză severă, epilepsie, cancer sau boli cardiace grave, și la copii mici, cere întâi sfatul medicului. În sarcină evită punctele marcate ⚠ și zonele abdominală și lombo-sacrată, și cere avizul medicului.
- Motiv: Contraindicații lipsă (tromboză, anticoagulante, osteoporoză, epilepsie, cancer, copii) și sarcină incompletă.

### 67. `src/js/10_views.js`
- Înainte: <b>Brățări de acupresură</b> (PC6) — pentru greață/rău de mișcare, cu dovezi moderate.
- După: <b>Brățări de acupresură</b> (PC6) — pentru greață/rău de mișcare; dovezi limitate (calitate scăzută până la moderată, mai ales postoperator).
- Motiv: „Dovezi moderate” – supraestimare.
- Sursă: Cochrane CD003281 (Lee, Chan, Fan 2015): PC6 vs sham = certitudine scăzută; PC6 vs antiemetice = moderată

### 68. `src/js/10_views.js`
- Înainte: <tr><td>Stimulator cardiac / implant electric</td><td>Fără electroacupunctură.</td></tr>
- După: <tr><td>Stimulator cardiac / implant electric</td><td>Fără electroacupunctură sau TENS/TEAS; nu se trece curent prin torace, cap sau gât.</td></tr>
- Motiv: Precizare.

### 69. `src/js/10_views.js`
- Înainte: <tr><td>Febră mare, urgențe</td><td>Medic imediat.</td></tr>
- După: <tr><td>Epilepsie / convulsii</td><td>Fără electroacupunctură sau electrostimulare; ace doar cu acordul medicului; presiune blândă.</td></tr>    <tr><td>Cancer / tumori / limfedem</td><td>Nu pe tumoră, ganglioni sau zone iradiate; fără ace pe membrul cu limfedem; nu înlocuiește tratamentul oncologic; risc de infecție în neutropenie (discută cu oncologul).</td></tr>    <tr><td>Boli cardiace severe, hipotensiune, leșin</td><td>Poziție culcat, sesiuni scurte; întreabă medicul.</td></tr>    <tr><td>Boli pulmonare severe sau pneumotorax în antecedente</td><td>Fără ace pe torace/spate/umăr; presiune blândă.</td></tr>    <tr><td>Tromboză venoasă, varice severe, fracturi recente, osteoporoză severă</td><td>Nu masa și nu apăsa zona; întreabă medicul.</td></tr>    <tr><td>Febră mare, urgențe</td><td>Medic imediat.</td></tr>
- Motiv: Contraindicații lipsă în pagina de siguranță: epilepsie, cancer, cardiopatii, boli pulmonare, tromboză/fracturi.
- Sursă: NCCIH Acupuncture: What you need to know; NHS TENS; WHO Guidelines on safety in acupuncture

### 70. `src/js/10_views.js`
- Înainte: <tr><td>Sarcină</td><td>Evită punctele marcate ⚠ (SP6, LI4, BL60, GB21 etc.) și punctele abdominale inferioare, doar cu medic/practician cu experiență în sarcină.</td></tr>
- După: <tr><td>Sarcină</td><td>Evită punctele marcate ⚠ (SP6, LI4, BL60, GB21 etc.), punctele abdominale inferioare și zona lombo-sacrată; moxibustia și electrostimularea nu se folosesc; orice utilizare doar cu medic/practician cu experiență în sarcină.</td></tr>
- Motiv: Sarcină: moxa și electrostimularea lipseau.

### 71. `src/js/10_views.js`
- Înainte: <p><b>Unde există dovezi mai bune (beneficii mici-moderate):</b> durere cronică lombară, osteoartrită de genunchi, cefalee de tensiune și migrenă (profilaxie), greață și vomă postoperatorie și după chimioterapie (inclusiv acupresura PC6).</p>
- După: <p><b>Unde există dovezi ceva mai consistente (de calitate scăzută până la moderată; beneficii în general mici):</b> durere cronică musculoscheletală (inclusiv lombară), cefalee de tensiune și migrenă (profilaxie), greață și vomă postoperatorie (PC6). Pentru osteoartrita de genunchi diferența față de sham este mică și adesea sub pragul de relevanță clinică; pentru greața din chimioterapie dovezile sunt mai slabe și de calitate mixtă.</p>
- Motiv: Supraestimare: genunchi și chimioterapie prezentate ca bine susținute.
- Sursă: Cochrane CD003281; JAMA Netw Open 2022 (Allen et al.); Xiao 2023; var_base (acu-cl)

### 72. `src/js/10_views.js`
- Înainte: altele au restrâns recomandarea (de ex. NICE, Marea Britanie, pentru durerea cronică primară). Verifică ghidurile țării tale.
- După: altele nu o recomandă (de ex. NICE, Marea Britanie: NG59 pentru lombalgie, 2016; NG193 pentru durerea cronică primară, 2021). Verifică ghidurile țării tale.
- Motiv: „Au restrâns” era vag și diferit de lecția L6-2 (NG59: „nu oferiți”).
- Sursă: NICE NG59 rec. 1.2.8; NICE NG193 (neverificat direct pe pagină, vezi raport)

### 73. `src/js/10_views.js`
- Înainte: <p><b>Mecanisme:</b> există efecte neurobiologice demonstrate (modulare a durerii), dar meridianele ca structuri anatomice nu au fost identificate.</p>
- După: <p><b>Mecanisme:</b> studiile experimentale descriu efecte neurobiologice (modulare a durerii), dar meridianele ca structuri anatomice nu au fost identificate, iar mecanismele clinice rămân în cercetare.</p>
- Motiv: „demonstrate” – prea tare.

### 74. `src/js/10_views.js`
- Înainte: <li><b>Sec. II–I î.Hr.:</b> <i>Huangdi Neijing</i> (Canonul Intern al Împăratului Galben) pune bazele teoriei.</li>
- După: <li><b>Statele Combatante–Han (datare disputată):</b> <i>Huangdi Neijing</i> (Canonul Intern al Împăratului Galben), compilație în straturi, pune bazele teoriei.</li>
- Motiv: Aliniere cu lecția L1-2.

## Cele mai grave probleme găsite
1. **Protocoale cu contraindicații lipsă**: sarcină (CV4/SP8/BL23 în dismenoree; LI4/GB21/BL60/CV6 în alte protocoale), preeclampsie la „picioare grele”, semne de alarmă pentru cefalee/lombalgie (sindrom de coadă de cal), abdomen, ochi (glaucom, lentile).
2. **Eficacitate exagerată**: „dovezi moderate” pentru PC6 pe ansamblu (Cochrane: scăzută vs sham, moderată vs antiemetice), greață „în sarcină/chimioterapie” prezentată ca bine susținută, osteoartrită de genunchi la „dovezi mai bune”, „cele mai bune dovezi clinice”.
3. **Fapte greșite**: titlul Zhenjiu Jiayijing („Marele compendiu” = Dacheng, 1601) și data 282 (anul morții lui Huangfu Mi); Neijing datat strict în Han; „4 Gates” folosit pentru punctele de comandă (Si Guan = LI4+LR3); lipsea BL11 din cele opt puncte Hui; LI11 ca „He inferior”; meridiane yin ale mâinii care „urcă”; marcile de ventuze „nu sunt vânătăi”.
## Ce rămâne incert / nerezolvat
- **Traduceri**: șirurile românești modificate nu mai au corespondent în `src/i18n/*.json` (cheile sunt textele RO), deci apar în română în celelalte 7 limbi până la rerularea `tools/harvest.js` + `tools/merge_tr.py`. Lipsa traducerii este vizibilă în `tests/i18n_cov.js`.
- **Părtinire în întrebări**: răspunsul corect este cel mai lung în 57 din 72 de întrebări (indiciu de test). Nu s-a rescris în bloc; recomandat un pas editorial de lungire/uniformizare a distractorilor.
- **Ho et al. 2025 (BMC CMT; 17 ghiduri, 35 recomandări)**: pagina PMC a cerut CAPTCHA; cifrele provin din `research/sources_evidence.md` (verificate de alt agent), nu reconfirmate aici.
- **NICE NG193 (2021, durere cronică primară)**: formularea „nu recomandă acupunctura” e din memorie; NG59 rec. 1.2.8 este confirmat în `sources_evidence.md`. Verificați NG193 înainte de lansare.
- **Greața în sarcină (Cochrane Matthews 2015)**: „neconcludent” este din memorie, nu s-a deschis revizia.
- **Legea 118/2007**: cine poate practica acupunctura nu a fost verificat (text oficial ilizibil); formularea „potrivit unor surse” rămâne.
- **Datarea Neijing/Wang Bing (762)** și sec. III pentru Jiayijing: consens academic, dar fără citare primară verificată aici.
- **Scala 4–6 din 10** pentru presiune este o convenție didactică, nu o recomandare din ghiduri.
- **Înlocuirea EX-Anmian cu EX-HN14 (Yiming)** în protocolul de insomnie este o decizie editorială; Anmian rămâne în atlas ca punct nestandard (marcat deja), iar `cond_a.txt` îl mai menționează (domeniu străin, de aliniat).
- **În afara domeniului, observat**: atlasul nu marchează în sarcină SP8, BL23, BL25, KI3 (după unele surse); `MER` BL listează „BL13–BL23” (Shu dorsale merg până la BL28); acestea țin de `pts_*`/`MER` și nu au fost schimbate.
