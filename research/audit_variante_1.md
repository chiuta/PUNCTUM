# Audit de acuratețe – variante 1–30 (acu-cl … teas)

Data: 4 noiembrie 2026. Fișier auditat: `src/data/var_base.txt`, liniile 1–30. Metodă: WebSearch/WebFetch. Liniile 31–60 nu au fost atinse; formatul (17 câmpuri, separator `¦`, 60 de linii) a fost validat după editare.
Sursele marcate „(titlu/rezumat)” au fost găsite în căutare, dar pagina nu s-a putut deschide (reCAPTCHA); ele nu sunt folosite pentru cifre. Detaliile fără sursă sunt în lista finală.

Rezumat: 75 de câmpuri modificate în 26 de variante; 4 variante fără modificări (ac-cald, fire, moxa-i, plum, deci sunt neconfirmate, vezi final). Coduri `ev` schimbate: aqua l→w, shiatsu l→w, anma l→w, acupresura m→l, trigger m→l, teas m→l.

---

## 1. acu-cl – Acupunctură corporală clasică
- Verificat: datarea Huangdi Neijing, afirmațiile de dovezi, contraindicații.
- Surse: https://en.wikipedia.org/wiki/Huangdi_Neijing ; https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD001977.pub2/pdf/CDSR/CD001977/CD001977_abstract.pdf ; https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798899 ; https://www.nice.org.uk/guidance/ng59/chapter/Recommendation ; https://www.acampbell.org.uk/acupuncture/articles/contraindications.html (din `research/sources_evidence.md` pentru JAMA/NICE/ACP).
- Corecturi: (a) „sec. II–I î.Hr.” prezentat ca fapt → datare disputată (Mawangdui 168 î.Hr. e anterior; propuneri între Statele Combatante și Han; Unschuld: 400 î.Hr.–260 d.Hr.). (b) Osteoartrita de genunchi nu mai apare ca indicație cu dovezi „moderate”: Cochrane (acupunctură vs sham, artroză periferică) – efect mic, sub pragul de relevanță clinică. (c) Dovezile reformulate; adăugat dezacordul NICE (nu recomandă pentru lombalgie) vs ACP 2017. (d) „tub-ghid de obicei” → „uneori” (neconfirmat că e uzual).

## 2. ea – Electroacupunctură
- Surse: https://www.encyclopedia.com/medicine/encyclopedias-almanacs-transcripts-and-maps/electroacupuncture ; https://www.medicalnewstoday.com/articles/electroacupuncture ; https://www.acampbell.org.uk/acupuncture/articles/contraindications.html ; https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2026.1730188/full (parametri 2/100 Hz) ; https://pubmed.ncbi.nlm.nih.gov/15135942/ (titlu/rezumat, frecvențe–opioide: nedeschis).
- Corecturi: origine „anii 1950–60” → aprox. 1958 (encyclopedia.com). Mecanismul frecvență–peptide opioide prezentat acum ca sugerat de studii experimentale. Contraindicații extinse: pacemaker, epilepsie/convulsii (nu doar „neîngrijită”), nu peste inimă/cap/gât/linia mediană, cardiopatii, alergie la metale. Dovezi: eliminat „limitate–moderate”; adăugat că rezultatele față de sham sunt neuniforme (studiu 2020 lombalgie: fără diferență a durerii).

## 3. ac-cald – Ac cald (Wen Zhen)
- Căutări fără sursă utilizabilă. Neschimbat; vezi lista de neconfirmate.

## 4. fire – Fire needling
- Căutare făcută (există sinteze, ex. neurodermită), dar paginile nu s-au putut deschide (PMC12676968, titlu/rezumat). Neschimbat; nivelul `w` e prudent.

## 5. dry – Dry needling
- Surse: https://en.wikipedia.org/wiki/Dry_needling ; https://www.jabfm.org/content/23/5/640.full.txt
- Corecturi: (a) Originea era greșit atribuită: Travell a publicat injecții în puncte trigger din 1942 și a folosit termenul „dry needling” în 1983; **Karel Lewit (1979)** a arătat că efectul vine din ac. Chan Gunn: IMS pe model radiculopatic (anul „anii 1970” neconfirmat → eliminat). (b) „tehnica Hong” → „fast-in, fast-out”, nedatat (atribuirea către Hong neconfirmată). (c) „Moderate pentru durere miofascială” contrazicea codul `l`: sinteza Cochrane (Furlan) – ameliorare pe termen scurt, calitate scăzută; alte sinteze fără avantaj față de placebo. (d) Siguranță: sângerare/hematom, leșin, pneumotorax rar, infecții.

## 6. intrad – Ace intradermice / ureche
- Surse: https://en.wikipedia.org/wiki/Auriculotherapy
- Corecturi: adăugat Paul Nogier, 1957 (auriculoterapia modernă); punctele auriculare apar și în texte chineze clasice. Dovezi: „mai bune pentru durere acută în unele studii” → hărțile auriculare nu au suport solid; efect probabil parțial contextual.

## 7. bee – Apitoxină
- Surse (titlu/rezumat): https://pmc.ncbi.nlm.nih.gov/articles/PMC9028116 (incidența anafilaxiei în BVA) ; https://pmc.ncbi.nlm.nih.gov/articles/PMC4440710 (risc în terapia cu venin).
- Corecturi: „sec. XX” prezentat ca dată sigură → dezvoltare modernă, dată neconfirmată; adăugată anafilaxia ca risc documentat în sinteze sistematice. Cifrele din sinteze nu au fost folosite.

## 8. aqua – Aquapunctură
- Surse: https://scholars.hkbu.edu.hk/en/publications/an-update-on-acupuncture-point-injection/
- Corecturi: „anii 1950” neconfirmat → „a doua jumătate a sec. XX”. Dovezi `l`→`w`: revizuirea 2016 vorbește de „poor clinical evidence” și efecte adverse raportate, cu nevoie de standardizare.

## 9. acuto – Acupotomie
- Surse: https://pmc.ncbi.nlm.nih.gov/articles/PMC6701683 (protocol; Zhu Hanzhang, 1976, derivat din „cele nouă ace” clasice).
- Corecturi: anul 1976 și persoana confirmate; adăugată filiația din textele clasice. Dovezile nu pot fi evaluate din acea sursă (protocol fără rezultate).

## 10. sang – Sângerare terapeutică
- Surse: https://abstracts.cochrane.org/2024-prague-global-evidence-summit/bloodletting-therapy-primary-headache-systematic-review-and-meta ; https://link.springer.com/article/10.1007/s11655-020-3093-8
- Corecturi: „Neijing” prezentat ca fapt → „atribuită textelor clasice”. Dovezi: sinteză cefalee primară, 17 studii, certitudine foarte scăzută, toate cu risc mare de bias. Greșeală de scriere corectată („material sterile”).

## 11. tung – Acupunctura Master Tung
- Surse: https://en.wikipedia.org/wiki/Tung_Ching_Chang
- Confirmat: 1916–1975, Taiwan. Adăugat: născut în Shandong, transmitere familială, elevi (Miriam Lee, Wei-Chieh Young) care l-au adus în SUA. Nu am găsit studii independente.

## 12. acupresura
- Surse: Cochrane CD003281.pub4 (https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003281.pub4/information) ; Xiao 2023 (https://link.springer.com/content/pdf/10.1007/s00520-023-07976-0.pdf), ambele din `sources_evidence.md`.
- Corecturi: „Moderate pentru greață (P6)” era supraafirmare: dovezi de calitate scăzută față de sham, moderată doar pentru echivalență cu antiemeticele. `m`→`l`.

## 13. shiatsu
- Surse: https://en.wikipedia.org/wiki/Shiatsu
- Corecturi: Namikoshi (1905–2000), școală în anii 1940 – confirmat. „Recunoscut oficial în 1955” nu a putut fi confirmat → eliminat anul. Masunaga: „anii 1970” neconfirmat → „a doua jumătate a sec. XX”. Dovezi `l`→`w`: o sinteză nu a găsit eficacitate pentru vreo afecțiune; sursa consemnează cazuri grave rare (tromboză, embolie).

## 14. tuina
- Surse: https://www.healthline.com/health/tuina (listele de manevre diferă)
- Corecturi: „cele opt manevre de bază” prezentate cu o listă fixă → listă „de bază”, variabilă după școală. Contraindicații extinse (fracturi, tromboză/inflamație venoasă, răni, spondilită anchilozantă). Dovezi „limitate–moderate” → „limitate”, studii mici.

## 15. anma
- Surse: https://en.wikipedia.org/wiki/Anma ; https://en.wikipedia.org/wiki/Sugiyama_Waichi
- Corecturi: „sec. VI–VII” nu corespunde sursei: tehnici chineze în Japonia în perioada Nara (710–793); sistem distinct fondat în 1320 (Akashi Kan’ichi); legătura cu nevăzătorii vine din perioada Edo (Sugiyama Waichi, 1614–1694). `l`→`w` pentru consecvență cu „foarte limitate”.

## 16. jsj
- Surse: https://jinshindo.org/development
- **Eroare**: Jin Shin Do folosește presiune fermă, directă, menținută (două mâini: punct local + distal), nu „presiune sacadată”. Corectat în principiu și în pași. Confirmat: Teeguarden, anii 1970, carte din 1978, influența lui Reich; derivată din Jin Shin Jyutsu, dar divergentă.

## 17. thai
- Surse: https://ich.unesco.org/en/RL/nuad-thai-traditional-thai-massage-01384 ; https://en.wikipedia.org/wiki/Traditional_Thai_massage
- Confirmat: înscris în 2019 (14.COM) pe Lista reprezentativă UNESCO (formulare precizată). Dovezi „limitate–moderate pentru durere lombară” nesusținut: sursa spune că afirmațiile practicienilor depășesc ce e demonstrat → „limitate”. Numărul de linii (zece, „Sen Sib”) neconfirmat explicit.

## 18. marma
- Surse: https://www.carakasamhitaonline.com/index.php/Marma
- Confirmat: 107 marma la Sushruta; Kshipra (între haluce și al doilea deget, respectiv între police și index) și Talahridaya (talpă/palmă) corecte. Datarea „sec. VI î.Hr.–III d.Hr.” nu a putut fi confirmată → „datare disputată”. Adăugat că în texte marma sunt zone vulnerabile (chirurgie/traumă), nu puncte de masaj.

## 19. trigger
- Surse: https://pubmed.ncbi.nlm.nih.gov/36050701/ ; https://www.jabfm.org/content/23/5/640.full.txt
- Corecturi: dovezi „moderate” → meta-analiza 2022 arată doar creșterea pragului de durere la presiune (SMD 0,67), nu scăderea durerii raportate (SMD −0,22, nesemnificativ). `m`→`l`. Mecanismul („oprește spasmul”) nu e stabilit. Travell: din 1942; manualul din 1983.

## 20. acufacial
- Fără sursă pentru Kobido. Dovezi reformulate: „relaxarea este reală” → plauzibilă, nedemonstrată.

## 21. moxa-d / 22. moxa-i / 23. moxa-s
- Surse: https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003928.pub4/information
- moxa-s: Cochrane (moxibustie + îngrijire uzuală) reduce prezentația non-cefalică la naștere (RR 0,87; certitudine moderată), fără diferență clară la cezariană; reformulat în loc de „dovezi mixte”. Arsură raportată în trialul cu sham.
- moxa-d: „okyu, sec. VI–VII” neconfirmat → „datare orientativă”.
- moxa-i: neschimbat.

## 24. compresa
- Sursa UNESCO confirmă compresele herbale calde ca parte din Nuad Thai; Wikipedia menționează o sinteză a compreselor herbale thailandeze (neconsultată). Dovezi reformulate neutru.

## 25. vent-u
- Surse: https://iam.biomedcentral.com/articles/10.1016/j.jams.2018.02.001 ; https://hekint.org/2020/01/14/the-history-and-mystery-of-cupping/
- Corecturi: „Europa (sec. XIX)” incorect: popularitate în sec. XIV–XVII, scădere din sec. XVII (dar persistență până în sec. XX). Papirusul Ebers (aprox. 1550 î.Hr.), Hipocrate, Ge Hong (aprox. 300 d.Hr.). Riscuri: arsuri, cicatrice, vezicule, infecții cutanate.

## 26. hijama
- Surse: https://www.rivm.nl/weblog/inventarisatie-van-infectierisicos-bij-wet-cupping-ib-01-2023 ; https://hekint.org/2020/01/14/the-history-and-mystery-of-cupping/
- Corecturi: „1–3 ședințe/an uzual” nesusținut → fără protocol standardizat. Siguranță: hepatita B/C numite explicit; eficacitatea nedemonstrată (RIVM).

## 27. gua
- Surse: https://qa1.scielo.br/j/brjp/a/GRBBvwVsq3VQbdCKsYDK7xH/abstract/?lang=en ; https://pro.dermnetnz.org/topics/coining
- Confirmat: Cao Gio (Vietnam); coining. Peteșii „2–7 zile” neconfirmat → „câteva zile”. Dovezi: 6 studii, urmărire 7–21 zile. Adăugat riscul teoretic de patogeni din sânge.

## 28. plum – Ciocănel floare de prun
- Nicio sursă utilizabilă; neschimbat.

## 29. laser
- Surse: https://www.bu.edu/naeser/acupuncture/HANDOUTNaeserLaser11-07SCI.pdf ; https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2025.1672380/full
- Corecturi: „650–1064 nm, 5–100 mW” prea îngust: în practică 600–1000 nm (cu valori până la 1064 nm), 5–500 mW (clasa IIIb/3B); doza se exprimă în J/cm², nu în secunde fixe → pasul „10–60 s” reformulat. Risc de leziune retiniană adăugat. Dovezi: certitudine scăzută–moderată, I² ≈ 90 %, bias de publicare.

## 30. teas – TENS/TEAS
- Surse: https://www.cochrane.org/evidence/CD011890/transcutaneous-electrical-nerve-stimulation-tens-chronic-pain-overview-cochrane-reviews ; https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2026.1730188/full
- Corecturi: Cochrane overview: TENS în durerea cronică – certitudine foarte scăzută → `m`→`l`. TEAS: majoritatea trialurilor folosesc 2/100 Hz alternant, nu „2–4 sau 80–100 Hz”. Origine rescrisă prudent.

---

## Afirmații rămase neconfirmate (păstrate sau reformulate prudent)
- ac-cald: „origine tradițională”, doza de moxă (1–2 cm), arderea 5–15 min, nivelul `w`.
- fire: textul clasic de origine („cui ci”), indicații (verucă, plăci cutanate), nivelul `w` și absența sintezelor de calitate.
- ea: separarea 2 Hz / 100 Hz pe peptide opioide specifice (sursă nedeschisă); „se evită în sarcină” (sursă care o menționează fără detalii).
- dry: asocierea „fast-in, fast-out” cu Hong; anul modelului IMS al lui Gunn.
- intrad: dimensiunile 0,3–1,5 mm, perioada de 2–7 zile, mărcile Pyonex/Seirin; contraindicația în diabet.
- bee: practici de testare cutanată; frecvența (1–2/săptămână); cifrele anafilaxiei (doar titluri).
- aqua: doza 0,2–1 ml/punct; originea exactă.
- acuto: gradul de evidență (doar protocol găsit).
- sang: etimologia „Dian Ci”; codul EX-UE11 pentru vârfurile degetelor (neverificat pe nomenclatura OMS).
- tung: puncte „Ling Gu/Da Bai” pe mână, logica „imaginii în oglindă”.
- shiatsu: recunoașterea oficială în Japonia (an), datele lui Masunaga.
- tuina: lista exactă a celor opt manevre.
- jsj: datele lui Jiro Murai (1886–1960), numărul de 26 „safety energy locks”, anul sosirii lui Burmeister în SUA.
- thai: „zece” linii; 60–120 min.
- marma: datarea Sushruta Samhita; masajul cu ulei ca practică.
- trigger/compresa/acufacial: parametri de durată; Kobido (origine).
- moxa-d: dată introducere în Japonia; moxa-i: ghimbir 2–3 mm; moxa-s: distanță 2–3 cm și cele trei tehnici.
- vent-u: durata 5–15 min; contraindicații în sarcină.
- gua: „Kerokan (Indonezia)”; unghi 45°.
- plum: toată intrarea (5–7 ace, 70–100 lovituri/min, origine).
- laser: „anii 1970”; contraindicația tiroidiană; „popular în Europa și Asia”.
- teas: „anii 1960–70”, indicația pentru dismenoree/sarcină/zona pacemakerului (consecvente cu practica generală, nu cu o sursă deschisă).
- Generic: sursele PubMed/PMC deseori blocate (reCAPTCHA), deci multe sinteze citate doar după titlu.
