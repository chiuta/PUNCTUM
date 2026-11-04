# Audit adversarial: `src/data/quiz_a.txt` și `QM` (src/js/10_views.js)

Data: 2026-11-04. Total întrebări după audit: **200** (nicio eliminare; toate cele 9 `# REVERIFICA` rezolvate prin corectare/reformulare). Format validat cu script: 8 câmpuri, fără `¦` în text, răspunsuri distincte și ≤ 60 caractere, 8 categorii x 25, niveluri 1-3. Marcajele `# REVERIFICA` au fost înlocuite cu comentarii `# VERIFICAT: ...`.

Metode: (a) citire integrală a celor 200 de întrebări; (b) script de validare a formatului și a lungimilor; (c) comparație cu `src/data/pts_*.txt` (361 de coduri = 361 puncte OMS 2008: numărul de puncte per meridian din quiz coincide cu aplicația; localizările, punctele Yuan/Luo/Xi/Hui/Mu, GV26, KI3, PC8, ST44, BL67 etc. verificate cu script/inspecție); (d) căutări web pentru cele 9 întrebări.

Efect lateral măsurat: răspunsul corect era strict cel mai lung în 94/200 întrebări (47%, față de ~25% la întâmplare); după rescrierea distractorilor: 69/200 (34,5%).

## A. Cele 9 întrebări `# REVERIFICA`

**[CONTINUT]** Ce medic din dinastia Tang este asociat cu punctele ashi (sensibile la palpare)?
- Explicație: `Sun Simiao a descris în „Qianjin Yaofang” punctele „ashi”, alese după locul dureros.` → `Sun Simiao este creditat cu termenul „ashi” în Qianjin Yaofang (sec. VII, dinastia Tang); punctele se aleg după locul dureros, la palpare.`
- Motiv: REVERIFICA 1: atribuirea e larg acceptată în sursele de MTC, dar „a descris” era prea tare; acum „este creditat cu termenul”.
- Sursă: https://www.meandqi.com/knowledge-base/concepts/ashi-points ; https://en.wikipedia.org/wiki/Beiji_qianjin_yaofang

**[CONTINUT]** Ce împărat Qing a scos acupunctura din programul Academiei Imperiale de Medicină în 1822?
- Întrebare: `Ce împărat Qing a scos acupunctura din programul Academiei Imperiale de Medicină în 1822?` → `Sub ce împărat Qing a fost scoasă acupunctura din Academia Imperială de Medicină, în 1822?`
- Explicație: `În 1822 acupunctura a fost eliminată din învățământul medical imperial; ea a rămas totuși în practica populară.` → `În 1822 (al doilea an al domniei Daoguang) acupunctura și moxibustia au fost scoase din Academia Imperială de Medicină; ele au rămas în practica populară. Motivele exacte sunt discutate de istorici.`
- Motiv: REVERIFICA 2: anul 1822 (anul 2 Daoguang) și excluderea din Taiyiyuan sunt confirmate; întrebarea reformulată fără a atribui personal decretul („sub ce împărat”), iar explicația notează că motivele sunt discutate.
- Sursă: https://en.wikipedia.org/wiki/1822_in_China (acupunctura și moxibustia interzise la Imperial Medical Academy, anul 2 Daoguang)

**[CONTINUT]** Ce medic olandez a descris acupunctura pentru cititorii europeni în 1683?
- Explicație: `Ten Rhijne, medic la Dejima (Japonia), a publicat prima descriere europeană amplă a acupuncturii.` → `Willem ten Rhijne, medic la Dejima (Japonia), a publicat la Londra, în 1683, „Dissertatio de Arthritide: Mantissa Schematica: De Acupunctura”, un studiu occidental detaliat în care apare termenul „acupunctura”.`
- Motiv: REVERIFICA 3: data/autorul confirmate; „prima descriere europeană amplă” nu e susținută explicit de sursă (au existat texte anterioare, ex. Busschof/Boym) -> „studiu occidental detaliat” + titlul lucrării; nota despre termen e coerentă cu întrebarea „acupunctură”.
- Sursă: https://en.wikipedia.org/wiki/Willem_ten_Rhijne ; https://historyofmedicine.com/author/d/willem-ten-rhijne

**[CONTINUT]** În ce an a fost înscrisă „acupunctura și moxibustia MTC” în patrimoniul cultural imaterial UNESCO?
- Explicație: `Inscripția UNESCO din 2010 recunoaște acupunctura și moxibustia ca patrimoniu cultural, nu ca dovadă a eficacității.` → `Elementul a fost înscris în 2010 pe Lista reprezentativă a patrimoniului cultural imaterial al umanității; înscrierea recunoaște valoarea culturală, nu eficacitatea clinică.`
- Motiv: REVERIFICA 4: 2010 confirmat (Lista reprezentativă a patrimoniului cultural imaterial, sesiunea 5.COM); doar precizat tipul listei.
- Sursă: https://ich.unesco.org/en/RL/acupuncture-and-moxibustion-of-traditional-chinese-medicine-00425

**[CONTINUT]** Câte vase (meridiane) descriu textele din mormântul de la Mawangdui (168 î.Hr.)?
- Explicație: `Manuscrisele de la Mawangdui descriu 11 vase, un stadiu mai vechi decât sistemul de 12 meridiane din Neijing.` → `Manuscrisele de mătase din mormântul Mawangdui (închis în 168 î.Hr.) descriu 11 vase și vorbesc despre moxibustie, nu despre ace; sistemul de 12 meridiane apare mai târziu, în Neijing.`
- Motiv: REVERIFICA 5: 11 vase și 168 î.Hr. confirmate; adăugat că sunt texte de moxibustie (nu de ace) și că mormântul a fost „închis” în 168 î.Hr. (textele sunt mai vechi).
- Sursă: https://en.wikipedia.org/wiki/Zubi_Shiyi_Mai_Jiujing

**[CONTINUT]** Ce arată meta-analizele de date individuale (Vickers) pentru durerea cronică?
- Întrebare: `Ce arată meta-analizele de date individuale (Vickers) pentru durerea cronică?` → `Ce arată meta-analiza de date individuale Vickers (2018) pentru durerea cronică (musculo-scheletică, artroză, cefalee, umăr)?`
- Corect: `Un efect mic, superior sham-ului` → `Acupunctura a depășit sham-ul, dar cu diferență mică`
- Greșite: `Niciun efect / Un efect uriaș / Un efect doar la fumători` → `Acupunctura nu a diferit deloc de sham / Efect mare față de sham, fără componentă contextuală / Efect doar în studiile fără grup de control`
- Explicație: `Efectul acupuncturii asupra durerii cronice depășește sham-ul, dar diferența este mică.` → `39 de studii, 20.827 de pacienți: aprox. 0,5 DS față de lipsa acupuncturii și aprox. 0,2 DS față de sham. Autorii notează că efectul nu se explică doar prin placebo; relevanța clinică a unei diferențe mici rămâne discutată.`
- Motiv: REVERIFICA 6: formularea veche („date individuale (Vickers)”, „efect uriaș”, „doar la fumători”) era vagă; acum precizează anul, afecțiunile incluse și mărimea efectului, cu nuanța „diferență mică vs sham”. Distractorii nu mai sunt absurzi.
- Sursă: https://synapse.mskcc.org/synapse/works/125102 (Vickers et al., J Pain 2018)

**[CONTINUT]** Ce spun sintezele despre acupunctura pentru renunțarea la fumat?
- Întrebare: `Ce spun sintezele despre acupunctura pentru renunțarea la fumat?` → `Ce concluzie au tras sintezele Cochrane (2014) despre acupunctura pentru renunțarea la fumat?`
- Corect: `Dovezi insuficiente sau inconsistente` → `Fără dovezi consistente de beneficiu susținut (6 luni+)`
- Greșite: `Succes dovedit de 100% / Efect mai mare decât medicația / Efecte periculoase certe` → `Succes dovedit la majoritatea fumătorilor / Efect mai mare decât medicația de renunțare / Dovezi certe că acupunctura este dăunătoare`
- Explicație: `Sintezele Cochrane nu au găsit dovezi consistente că acupunctura ajută la renunțarea la fumat.` → `Cochrane 2014: față de sham, un avantaj mic la scurt timp (sub 6 săptămâni), dar fără beneficiu susținut la 6–12 luni; studiile au risc de bias, deci concluziile ferme nu sunt posibile.`
- Motiv: REVERIFICA 7: răspunsul vechi „insuficiente sau inconsistente” era corect în esență, dar omitea rezultatul pe termen scurt (RR 1,22); acum redă exact concluzia (fără beneficiu susținut ≥6 luni). Explicația nu mai spune că Cochrane „nu a găsit” nimic.
- Sursă: https://pubmed.ncbi.nlm.nih.gov/24459016/ ; Cochrane CD000009.pub4 (abstract)

**[CONTINUT]** Pentru ce tip de durere există dovezi moderate pentru acupunctură în profilaxie?
- Întrebare: `Pentru ce tip de durere există dovezi moderate pentru acupunctură în profilaxie?` → `Pentru ce tip de durere există dovezi de calitate moderată că acupunctura reduce frecvența crizelor (profilaxie)?`
- Corect: `Migrena` → `Migrena episodică`
- Explicație: `Sintezele Cochrane indică un efect mic, peste sham, în reducerea frecvenței migrenelor.` → `Cochrane (Linde, 2016): peste sham efectul este mic (reducere de cel puțin 50% a frecvenței la 50% vs 41% dintre pacienți), iar calitatea dovezilor este moderată.`
- Motiv: REVERIFICA 8: confirmat că Cochrane 2016 arată efect mic peste sham, calitate moderată; întrebarea precizează „migrena episodică” și „reduce frecvența crizelor” (nu „durere” în general); explicația cuantifică efectul.
- Sursă: https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001218.pub3 (abstract)

**[CONTINUT]** Ce spun ghidurile despre durerea lombară cronică și acupunctură?
- Întrebare: `Ce spun ghidurile despre durerea lombară cronică și acupunctură?` → `Cum diferă ghidurile ACP (2017) și NICE (NG59, 2016) privind acupunctura în lombalgia cronică?`
- Corect: `Dovezi moderate pentru ameliorarea durerii` → `ACP o include ca opțiune, NICE nu o recomandă`
- Greșite: `Vindecă hernia de disc / Nu e utilă deloc / Elimină nevoia de mișcare` → `Ambele o recomandă ca unic tratament de primă linie / NICE o recomandă, iar ACP o respinge / Ambele ghiduri o resping complet`
- Explicație: `Beneficiul este modest și mai ales pe termen scurt; combinația cu exerciții e importantă.` → `ACP (2017) listează acupunctura printre opțiunile nemedicamentoase inițiale; NICE (2016) recomandă să nu fie oferită pentru lombalgie. Beneficiul, când apare, este modest și mai ales pe termen scurt; exercițiul rămâne important.`
- Nivel: 2 → 3
- Motiv: REVERIFICA 9: „ghidurile spun dovezi moderate” era înșelător — ghidurile se contrazic (ACP 2017 da, NICE NG59 2016 nu). Întrebare reformulată ca diferență între ghiduri; nivel 2->3.
- Sursă: https://www.patientcareonline.com/view/acp-update-low-back-pain-treatment-guidelines ; NICE NG59 (2016) rec. 1.2.8 „Do not offer acupuncture for managing low back pain with or without sciatica” https://www.nice.org.uk/guidance/ng59/chapter/Recommendation

## B. Alte corecturi de conținut (fapt, ambiguitate, distractor valid, afirmații prea tari)

**[AMBIGUITATE]** Ce este Huangdi Neijing?
- Explicație: `Este considerat textul fundamental al medicinei tradiționale chineze, datat în jurul sec. II–I î.Hr.` → `Este considerat textul fundamental al medicinei tradiționale chineze; a fost compilat treptat, în epoca Han (cca sec. II–I î.Hr.), din straturi mai vechi și mai noi.`
- Motiv: Datare prea fermă; corpusul s-a format treptat.
- Sursă: consens istoriografic (epoca Han)

**[AMBIGUITATE]** Cine a introdus în SUA, în 1913, „zone-terapia”, precursoare a reflexologiei?
- Întrebare: `Cine a introdus în SUA, în 1913, „zone-terapia”, precursoare a reflexologiei?` → `Cine a introdus în SUA, în anii 1910, „zone-terapia”, precursoare a reflexologiei?`
- Motiv: Anul exact depinde de sursă (prima prezentare 1913, publicare 1915–1917).
- Sursă: surse secundare de reflexologie

**[AMBIGUITATE]** În ce oraș francez a lucrat Paul Nogier, creatorul hărții auriculare moderne?
- Explicație: `Nogier a prezentat hărțile auriculare la Lyon, în anii 1950.` → `Paul Nogier a lucrat la Lyon; hărțile auriculare moderne, formulate la mijlocul anilor 1950, îi sunt atribuite lui.`
- Motiv: Explicația „a prezentat hărțile la Lyon, în anii 1950” era imprecisă (publicațiile din 1956–57 au apărut și în alte locuri).
- Sursă: prudență

**[DISTRACTOR VALID]** Din ce țară a ajuns masajul anma în Japonia în secolele VI–VII?
- Greșite: `India / Coreea de Nord / Vietnam` → `India / Persia / Vietnam`
- Explicație: `Anma s-a dezvoltat în Japonia pornind de la masajul chinez adus în perioada contactelor cu China.` → `Anma s-a dezvoltat în Japonia pornind în principal de la masajul chinez, adus în perioada contactelor cu China (cu rol de mediere al Coreei).`
- Motiv: Distractorul „Coreea de Nord” este anacronic și Coreea a mediat realmente transmiterea -> posibil al doilea răspuns valid; înlocuit cu „Persia”; explicația spune „în principal din China”.
- Sursă: surse generale despre anma

**[GRESIT]** Cum se numește senzația de greutate, amorțeală ușoară sau căldură la stimulare?
- Întrebare: `Cum se numește senzația de greutate, amorțeală ușoară sau căldură la stimulare?` → `Cum se numește senzația de greutate, amorțeală sau distensie la locul stimulării?`
- Explicație: `De Qi este senzația resimțită la stimulare; tradiția o consideră semn de eficacitate.` → `De Qi este senzația resimțită la stimulare (greutate, amorțeală, distensie, durere surdă); tradiția o consideră semn de eficacitate, dar studiile moderne nu au stabilit că ea prezice rezultatul.`
- Motiv: „Căldura” nu face parte din descrierea clasică a de qi (durere surdă, amorțeală, distensie, greutate); întrebarea induce în eroare.
- Sursă: descrieri clinice standard ale de qi

**[INCONSISTENTA CU APLICATIA]** Unde se află GV26 (Renzhong)?
- Corect: `În treimea superioară a șanțului subnazal` → `În filtrum, la limita treimii superioare cu cea mijlocie`
- Greșite: `Pe creștet / Sub buza inferioară / În spatele urechii` → `În filtrum, la limita treimii mijlocii cu cea inferioară / Pe vârful nasului, în centrul lui / Sub buza inferioară, în șanțul mentolabial`
- Explicație: `GV26 este în filtrum, aproape de nas; este folosit tradițional în situații de urgență.` → `GV26 este pe linia mediană, în filtrum, la joncțiunea dintre treimea superioară și cea mijlocie; este folosit tradițional în situații de urgență.`
- Motiv: Răspunsul „treimea superioară” diferă ca formulare de datele auditate din pts (joncțiunea treimii superioare cu cea mijlocie, OMS 2008); aliniat la aplicație; distractorul „al treilea” (limita mijloc-jos) este greșit.
- Sursă: src/data/pts_*.txt (GV26, OMS WPRO 2008)

**[AFIRMATIE PREA TARE]** Ce presupune aquapunctura?
- Greșite: `Băi cu ape termale / Înțepare cu ace încălzite / Masaj sub apă` → `Înțepare cu ace încălzite la roșu în puncte sensibile / Băi în ape termale pentru relaxarea meridianelor / Masaj cu jet de apă pe punctele de pe spate`
- Explicație: `În aquapunctură se injectează o cantitate mică de lichid într-un punct; este practicată doar de medici.` → `În aquapunctură se injectează o cantitate mică de lichid într-un punct; este o procedură invazivă, care ține de personal medical autorizat.`
- Motiv: „Practicată doar de medici” e o afirmație legală care variază de la țară la țară.
- Sursă: prudență juridică

**[AFIRMATIE PREA TARE]** Ce implant contraindică electroacupunctura?
- Explicație: `Electroacupunctura este contraindicată la persoane cu stimulator cardiac sau alt implant electric.` → `Electroacupunctura este în general contraindicată (sau permisă doar cu avizul cardiologului) la persoane cu stimulator cardiac sau alt implant electric activ.`
- Motiv: „Contraindică” prea absolut — în practică contraindicație clasică sau permisă doar cu avizul cardiologului.
- Sursă: prudență

**[AFIRMATIE PREA TARE]** Ce protecție este obligatorie la laserpunctură?
- Întrebare: `Ce protecție este obligatorie la laserpunctură?` → `Ce protecție se recomandă la laserpunctură?`
- Explicație: `Laserul poate leza retina; atât pacientul, cât și practicantul poartă ochelari.` → `Laserul poate leza retina; se recomandă ochelari de protecție adecvați clasei laserului, atât pentru pacient, cât și pentru practicant.`
- Motiv: „Obligatorie” depinde de clasa laserului (3B/4); la lasere de clasă 3R/2 nu e impusă universal.
- Sursă: standarde de siguranță laser (IEC 60825)

**[DISTRACTOR VALID]** Ce zonă se evită în sarcină la stimulare puternică?
- Greșite: `Urechea / Degetul mare / Fruntea` → `Cotul / Degetul mare / Fruntea`
- Motiv: Distractorul „Urechea” e ambiguu: punctele auriculare (ex. uter, ovar) sunt tradițional evitate în sarcină -> potențial al doilea răspuns valid; înlocuit cu „Cotul”.
- Sursă: manuale de acupunctură (contraindicații în sarcină)

**[EXPLICATIE]** Pe ce nu aplici presiune puternică?
- Explicație: `Presiunea puternică pe un cheag poate detașa un cheag; zona dureroasă, caldă și umflată necesită medic.` → `Presiunea puternică pe o zonă cu posibil tromb poate desprinde cheagul; o zonă dureroasă, caldă și umflată necesită evaluare medicală.`
- Motiv: Explicația era circulară („cheag poate detașa un cheag”).

**[AFIRMATIE PREA TARE]** Ce afirmație este corectă despre acupunctură și cancer?
- Explicație: `Dovezile pentru simptome (de ex. greață) sunt moderate; nu există dovezi că vindecă cancerul.` → `Pentru unele simptome (ex. greață, durere) dovezile sunt limitate până la moderate; nu există dovezi că acupunctura vindecă sau previne cancerul.`
- Motiv: „Dovezi moderate pentru simptome (greață)” prea tare pentru cancer în ansamblu; diminuat la „limitate până la moderate”.
- Sursă: prudență; sinteze eterogene

**[AFIRMATIE PREA TARE]** Pentru ce simptom are PC6 dovezi moderate în sinteze?
- Explicație: `Sintezele Cochrane arată un efect modest al stimulării PC6 asupra greții postoperatorii.` → `Sintezele Cochrane arată un efect modest al stimulării PC6 asupra greții postoperatorii față de sham; beneficiul adăugat peste profilaxia cu antiemetice nu este clar.`
- Motiv: Cochrane 2015 arată calitate moderată vs sham, dar fără beneficiu adăugat când se dă profilaxie antiemetică; explicația nu spunea asta.
- Sursă: Lee A. et al., Cochrane 2015 (P6 și PONV)

**[AFIRMATIE PREA TARE]** Pentru ce afecțiune dovezile acupuncturii sunt moderate (durere)?
- Întrebare: `Pentru ce afecțiune dovezile acupuncturii sunt moderate (durere)?` → `Pentru care dintre aceste afecțiuni există dovezi de nivel moderat că acupunctura ameliorează durerea?`
- Explicație: `Sintezele indică dovezi moderate pentru reducerea durerii la genunchi, cu efect adesea mic.` → `Pentru durerea din artroza de genunchi, efectul față de lipsa tratamentului este moderat, dar față de sham este mic și adesea sub pragul clinic.`
- Motiv: Pentru artroza de genunchi, față de sham efectul e mic, sub pragul clinic; moderat doar față de lista de așteptare.
- Sursă: Manheimer et al., Cochrane 2010; Vickers 2018

**[AMBIGUITATE]** De ce poate un grup pe lista de așteptare să exagereze efectul?
- Întrebare: `De ce poate un grup pe lista de așteptare să exagereze efectul?` → `De ce poate compararea cu o listă de așteptare să umfle efectul acupuncturii?`
- Corect: `Nu primește nicio intervenție, deci nici efect contextual` → `Grupul de așteptare nu primește nici atenție, nici ritual`
- Greșite: `Primește un tratament mai puternic / Este selectat după vârstă / Nu necesită analiză statistică` → `Grupul de așteptare primește un tratament mai puternic / Grupul de așteptare este selectat după vârstă / Pentru că analiza statistică devine inutilă`
- Explicație: `Comparația cu „nimic” nu separă efectul specific de cel contextual; de aceea se folosesc grupuri sham.` → `Comparația cu „nimic” nu separă efectul specific de cel contextual (atenție, ritual, așteptări); de aceea se folosesc grupuri sham.`
- Motiv: Întrebarea era confuză („grupul exagerează efectul”); reformulată corect: compararea cu așteptarea umflă efectul tratamentului.
- Sursă: metodologie RCT

## C. Distractori aliniați ca lungime (răspunsul corect trădat de formulare)

Motiv comun: răspunsul corect era mult mai lung/specific decât distractorii (ex. 60 vs 18 caractere la TEAS). Distractorii au fost lungiți cu conținut plauzibil dar fals; verificat că niciunul nu devine al doilea răspuns valid (ex. la cun: nu s-a folosit „lățimea degetului mijlociu”, care e tot 1 cun în metoda degetului mijlociu).

- Ce instituție americană a publicat în 1997 o declarație de consens despre acupunctură?  
  greșite: `FBI / NASA / Departamentul Educației` → `FDA (Agenția pentru Alimente și Medicamente) / CDC (Centrele pentru Controlul Bolilor) / Departamentul Educației al SUA`
- Ce erau pietrele „bian shi” din China antică?  
  greșite: `Pietre încălzite pentru masaj / Greutăți pentru măsurare / Amulete funerare` → `Pietre încălzite și folosite pentru masaj / Greutăți de piatră folosite la măsurare / Amulete funerare din jad`
- Cu ce puncte extra de pe spate este legat numele medicului antic Hua Tuo?  
  greșite: `Punctul Yintang / Punctul Taiyang / Punctele Baxie` → `Punctul Yintang (între sprâncene) / Punctul Taiyang (la tâmplă) / Punctele Baxie (între degetele mâinii)`
- Unde se termină meridianul Pericardului (PC)?  
  greșite: `La degetul mic / La arătător / La police` → `La vârful degetului mic, pe partea ulnară / La colțul radial al unghiei arătătorului / La colțul radial al unghiei policelui`
- Unde începe meridianul vezicii urinare (BL)?  
  greșite: `La creștet / La ceafă / La tâmplă` → `La creștet, pe linia mediană a capului / La baza craniului, lateral de ceafă / La tâmplă, lângă unghiul extern al ochiului`
- Unde se află LI20 (Yingxiang)?  
  greșite: `Sub pupilă / În fața tragusului / La unghiul mandibulei` → `Sub pupilă, la marginea inferioară a orbitei / În fața tragusului, în depresiunea cu gura deschisă / La unghiul mandibulei, pe marginea maseterului`
- Unde se află KI3 (Taixi)?  
  greșite: `Pe dosul piciorului / Sub maleola laterală / Pe talpă` → `Pe dosul piciorului, între metatarsienele I și II / Sub maleola laterală, în depresiune / Pe talpă, în depresiunea de la flexia degetelor`
- Unde se află PC8 (Laogong)?  
  greșite: `Pe dosul mâinii / La pliul încheieturii / În pliul cotului` → `Pe dosul mâinii, între metacarpienele II și III / La pliul încheieturii, între cele două tendoane / În pliul cotului, medial de tendonul bicepsului`
- Unde se află BL67 (Zhiyin)?  
  greșite: `La colțul unghiei policelui / La călcâi / În spatele maleolei mediale` → `La colțul medial al unghiei halucelui / La colțul lateral al unghiei degetului IV / În depresiunea de sub maleola laterală`
- Cât este 1 cun?  
  greșite: `Un centimetru / Un deget plus un deget / Lungimea mâinii` → `Un centimetru exact, la toate persoanele / Lățimea a patru degete unite, la falanga medie / Lungimea mâinii de la încheietură la vârf`
- Cum se folosește bagheta de moxă în metoda „țigară de moxă”?  
  greșite: `Introdusă sub piele / Fiartă în apă / Aplicată rece pe piele` → `Aprinsă și apăsată direct pe piele până se stinge / Aplicată rece pe piele, ca baston de masaj / Încălzită în apă și așezată pe punct, fără foc`
- Ce este TEAS?  
  corect: `Stimulare electrică transcutanată a punctelor de acupunctură` → `Stimulare electrică transcutanată a punctelor`  
  greșite: `Un tip de moxă / Un ceai terapeutic / Un masaj cu ulei` → `Un tip de moxă din pelin presat, pe piele / Un ceai terapeutic pe bază de plante chinezești / Un masaj cu ulei esențial pe puncte`
- Ce sunt compresele Luk Pra Kob?  
  greșite: `Comprese reci cu argilă / Pachete cu ace / Baloane de aspirație` → `Comprese reci cu argilă, aplicate pe frunte / Pachete cu ace, folosite pentru înțepare / Baloane de aspirație folosite în hijama`
- Ce apasă brățările anti-greață de tip Sea-Band?  
  greșite: `Zona LI4 din dosul mâinii / Zona ST36 de sub genunchi / Zona GV20 de pe creștet` → `Zona LI4 de pe dosul mâinii, la baza policelui / Zona ST36 din jurul genunchiului, sub rotulă / Zona GV20 de pe creștet, pe linia mediană`
- Ce măsoară sistemul Ryodoraku?  
  greșite: `Temperatura corpului / Tensiunea arterială / Frecvența respirației` → `Temperatura pielii, cu termometru infraroșu / Tensiunea arterială în artera radială / Frecvența respirației în timpul tratamentului`
- Când oprești presopunctura?  
  greșite: `Doar când a trecut o oră / Niciodată / Când simți ușoară căldură` → `Doar când a trecut o oră de la început / Niciodată; durerea face parte din tratament / Când simți o ușoară căldură sub deget`
- Poate acupunctura înlocui tratamentul unei boli grave (de ex. cancer)?  
  greșite: `Da, dacă folosești ace sterile / Da, pentru orice boală / Da, dacă o aplică un maestru` → `Da, dacă folosești numai ace sterile de unică folosință / Da, pentru orice boală, dacă ședințele sunt regulate / Da, dacă o aplică un practician cu experiență îndelungată`
- Care situație contraindică ventuzele?  
  greșite: `Piele sănătoasă / Pielea de pe spate / Tensiune normală` → `Piele sănătoasă, intactă, pe mușchii spatelui / Mușchi tensionați în zona umerilor / Tensiune arterială normală și stare bună`
- Pe ce nu aplici presiune puternică?  
  greșite: `Pe un picior sănătos / Pe talpă / Pe palmă` → `Pe un picior sănătos, fără umflătură sau durere / Pe talpa unui picior fără semne de inflamație / Pe palma unei mâini cu piele intactă`
- Ce cefalee impune urgență?  
  greșite: `Cea ușoară de tensiune / Cea de după o zi grea / Cea de dimineață cu cafea` → `Cea ușoară, de tensiune, apărută după o zi grea / Cea instalată treptat, după mult timp la ecran / Cea care se ameliorează după cafea și odihnă`
- De ce necesită hijama instrumente sterile, de unică folosință?  
  greșite: `Risc de alergie la polen / Risc de răcire / Risc de zgomot` → `Risc de alergie la polen din cabinet / Risc de răcire a pielii după ședință / Risc de uscare a pielii din cauza vidului`
- Ce atenție necesită moxa la diabetici cu neuropatie?  
  greșite: `Risc de hipoglicemie / Risc de insomnie / Risc de greață` → `Risc de hipoglicemie în timpul ședinței / Risc de insomnie după tratament / Risc de greață din cauza mirosului de fum`
- Pe ce zonă este contraindicat TENS/TEAS?  
  greșite: `Mușchii spatelui / Genunchiul / Brațul` → `Mușchii spatelui, de o parte și de alta a coloanei / Genunchiul și zona din jurul rotulei / Antebrațul, pe fața dorsală`
- Ce se poate spune despre dispozitivele de „bioresonanță”?  
  greșite: `Au diagnostic exact / Sunt standard în spitale / Vindecă alergii` → `Au o precizie de diagnostic de aproape 100% / Sunt folosite ca standard în spitalele publice / Pot vindeca alergiile prin frecvențe`
- Ce este un studiu randomizat controlat (RCT)?  
  greșite: `Un caz clinic / O părere de expert / O mărturie` → `Descrierea unui singur caz, fără grup de comparație / Părerea unui expert recunoscut în domeniu / Mărturia unor pacienți mulțumiți de tratament`
- Ce valoare au mărturiile (testimonialele) ca dovadă?  
  greșite: `Maximă / Sunt echivalente cu RCT-urile / Sunt obligatorii în studii` → `Maximă, mai mare decât a studiilor controlate / Echivalentă cu cea a studiilor randomizate controlate / Obligatorie în orice studiu clinic serios`
- Ce se poate spune despre meridiane în anatomia modernă?  
  greșite: `Sunt vase de sânge vizibile / Sunt nervi cu traseu fix / Sunt tendoane` → `Sunt vase de sânge vizibile la disecție / Sunt nervi cu traseu fix, identic la toți oamenii / Sunt tendoane lungi care leagă mâna de picior`
- Ce este efectul placebo?  
  greșite: `Efect secundar grav / Efect al unui medicament scump / Efect doar la copii` → `Efect secundar grav, produs de substanța inactivă / Efect al unui medicament foarte scump / Efect care apare doar la copiii mici`
- Ce afirmație este corectă despre acupunctură și cancer?  
  greșite: `Vindecă unele tipuri de cancer / Previne cancerul / Înlocuiește chimioterapia` → `Vindecă unele tipuri de cancer, dacă începe devreme / Previne apariția cancerului la persoanele sănătoase / Poate înlocui chimioterapia în stadiile inițiale`
- Ce este acupunctura sham?  
  greșite: `O acupunctură mai profundă / Un tip de moxă / Un masaj profund` → `O acupunctură mai profundă, cu mai multe ace / Un tip de moxibustie cu pelin presat / Un masaj profund al țesuturilor moi`
- De ce se compară acupunctura reală cu sham?  
  greșite: `Pentru a economisi ace / Pentru a scurta studiul / Pentru a scădea costul` → `Pentru a economisi ace și materiale de studiu / Pentru a scurta durata totală a studiului / Pentru a scădea costul tratamentului`
- Ce spun sintezele despre reflexologia plantară?  
  greșite: `Vindecă diabetul / Înlocuiește insulina / Diagnostichează boli de inimă` → `Vindecă diabetul prin stimularea zonei pancreasului / Poate înlocui insulina la persoanele cu diabet / Diagnostichează de la distanță bolile de inimă`

## D. Verificat și lăsat neschimbat (selecție)

- Numărul de puncte per meridian (LU 11, LI 20, ST 45, GB 44, KI 27, TE 23, LR 14, GV 28, BL 67, CV 24) = datele aplicației (pts_*.txt, total 361). Notă: Q „Câte puncte are Du Mai: 28” folosește numărarea OMS 2008 (GV1-GV28); unele surse numără 29 (cu GV29 Yintang), dar răspunsurile greșite (24/20/36) nu intră în conflict.
- Ciclurile Sheng/Ke, organe Zang/Fu, corespondențe element-organ, ceasul organelor, direcția meridianelor: corecte.
- Valorile cun (xifoid-ombilic 8, ombilic-pubis 5, ST36 3, SP6 3, PC6 2, CV12 4, CV4 3, CV6 1,5, ST25 2, LI10 2, GB39 3, BL 1,5 etc.) coincid cu pts_*.txt.
- Yuan KI3, Luo ST40, Xi ST34, Hui GB34/GB39, Mu CV12/LR14, Shu BL13: coincid cu etichetele din pts_*.txt.
- Istorie: Zhenjiu Dacheng 1601, Huangfu Mi (sec. III), NIH 1997, OMS 2008, Namikoshi 1940/1955, Reston 1971, Nixon 1972, Soulié de Morant, Ingham, Fitzgerald, Sasang, Ryodoraku etc.: concordă cu cunoștințele standard; câteva anuri secundare (ex. Dien Chan 1980, Koryo Sooji Chim 1971, BFA 2001, Acu-Yoga 1981, Jiro Murai 1886-1960) NU au fost reconfirmate pe web în acest audit (vezi raportul final).

## E. QM (vechiul quiz din src/js/10_views.js, ~linia 360; 28 întrebări) - doar raport, fișierul NU a fost editat

Nu am găsit erori factuale. Observații minore (de decis de autor):
1. „Care punct este cel mai folosit pentru greață și rău de mișcare? PC6” - „cel mai folosit” e greu de verificat; pentru rău de mișcare dovezile sunt slabe. Propunere: „Care punct este asociat cel mai des cu greața?”.
2. „Punctul-cheie pentru Dai Mai: GB41” - corect (punct de deschidere), dar distractorul TE5 este punctul cuplat (Yang Wei Mai); întrebarea e de nivel avansat, fără explicație. OK.
3. „Care punct este evitat clasic în sarcină? SP6” - corect, dar nu unic (LI4, BL67, GB21 sunt și ele evitate); distractorii (PC6, HT7, GV20) nu sunt însă în lista clasică, deci nu apare dublu răspuns valid. Propunere: „Care dintre aceste puncte este evitat clasic”.
4. „Câți cun între mameloane: 8”, ciclurile Sheng/Ke, BL 67 puncte, Huangfu Mi, Nogier, thai massage UNESCO 2019, NADA 5 puncte, Masunaga/Zen Shiatsu, Mei Hua/Qi Xing: corecte.
5. Aceleași întrebări (Huangfu Mi, Nogier) se repetă conceptual cu quiz_a: dacă ambele bănci se amestecă, apar dubluri tematice.

## F. Rămâne neverificat

- Nu s-a putut deschide direct textul integral Cochrane pentru fumat/migrenă în afara rezumatelor (cifrele citate vin din rezumat); recomandare ACP 2017 confirmată doar din rezumate secundare (acupunctura figurează între opțiunile nemedicamentoase inițiale; gradul „moderat” NU a fost reconfirmat în sursa primară).
- Interdicția din 1822: anul și instituția sunt confirmate (Wikipedia), dar nu și atribuirea personală a decretului lui Daoguang sau motivul; întrebarea a fost reformulată prudent.
- Ani/nume secundare: Dien Chan 1980, Koryo Sooji Chim 1971 (Yoo Tae-woo), BFA 2001, Acu-Yoga 1981, Jin Shin Jyutsu (Murai 1886-1960), Ryodoraku 1950, EFT/TFT 1980, Nogier la Lyon; Fitzgerald „anii 1910” - nereconfirmate pe web.
- Afirmațiile clinice generale (anafilaxie, pneumotorax, moxă în febră, contraindicații pacemaker/ventuze) sunt standard, dar nu au fost verificate individual cu surse web.
- Ceasul organelor, „bian shi” ca precursor al acelor și datarea Neijing (sec. II-I î.Hr.) sunt convenții istoriografice; au fost formulate prudent, nu reconfirmate.
