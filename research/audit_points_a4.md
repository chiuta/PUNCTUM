# Audit de acuratețe, lot g4 (CV 24, GV 28, puncte extra OMS 48)

Data: 2026-11-04. Fișier auditat: src/data/pts_g4.txt (100 rânduri, acum 9 câmpuri).

## 1. Text primar OMS WPRO 2008: NU a putut fi accesat
Niciun rând nu are `v`. Încercări eșuate:
- curl către iris.who.int, apps.who.int/iris, archive.org: proxy 403 (politică de rețea; nu am ocolit-o).
- WebFetch iris.who.int / apps.who.int (PDF 9789290613831): URL_NOT_ON_ALLOWLIST.
- medbox.org/document/...: doar rezumat; medbox.org/pdf/627a4de115110145a1723f64: robots_disallowed; copia /dl/ se oprește la BL44 (conform notelor anterioare).
- scribd nep006.pdf, ebook-archive.firebaseapp.com: doar metadate, fără text.
- Căutări web (WHO + coduri/capitole) nu au scos la iveală nicio copie integrală citibilă.
Lista celor 48 de puncte extra (HN 15, CA 1, B 9, UE 11, LE 12) a fost reconfirmată din Wikibooks (HN1-15) și din blogul acupuncture-holistic (toate grupele) + deck Brainscape; totalul 48 și codurile (inclusiv LE8 Neihuaijian, LE9 Waihuaijian, LE10 Bafeng, LE12 Qiduan) concordă. Anmian nu face parte din cele 48 (HN se oprește la HN15); rândul EX-Anmian din pts_existing.txt nu a fost atins și nu a fost dublat.

## 2. Surse secundare folosite (URL)
- https://newsite.healthcmi.com/wp-content/uploads/2024/07/CVacupoints_HealthCMi.pdf (CV1-24)
- https://yinyanghouse.com/theory/acupuncturepoints/conceptionvessel_meridian_study_acupuncture_points_flash_cards (CV1-24)
- https://yinyanghouse.com/theory/acupuncturepoints/governingvessel_meridian_study_acupuncture_points_flash_cards (GV)
- https://yinyanghouse.com/theory/acupuncturepoints/cv15 ; /cv21 ; /acupuncturepoints/gv15 ; /theory/acupuncturepoints/theory_skywindow
- https://brainscape.com/flashcards/rn-meridian-points-4849967/packs/7193392 (CV1-24, adâncimi, categorii)
- https://brainscape.com/flashcards/conception-vessel-ren-mai-1-24-2545297/packs/4306349 (CV1-24)
- https://brainscape.com/flashcards/ren-mai-3592342/packs/4374331 (CV15, 16, 20, 21, 22, categorii)
- https://brainscape.com/flashcards/exam-3-cv-gv-sp-extra-1501159/packs/2346126 (CV21)
- https://brainscape.com/flashcards/governing-vessel-du-mai-1-14-2510368/packs/4306349 (GV1-14, niveluri vertebrale, Luo GV1)
- https://brainscape.com/flashcards/du-channel-15359837/packs/21844111 (GV3-14 niveluri, GV1 Luo, GV16)
- https://brainscape.com/flashcards/du-mai-meridian-governing-vessel-10810217/packs/19287124 (GV16, 20, 21, 25)
- https://brainscape.com/flashcards/quiz-3-cv-gv-4822561/packs/7045282 (GV20, 26, 28)
- https://www.meandqi.com/knowledge-base/acupuncture/directing-vessel/zhongting-ren-16 ; /huagai-ren-20 ; meandqi.com/tcm-education-center/acupuncture/directing-vessel/xuanji-ren-21 ; /governing-vessel/yamen-du-15 ; /concepts/window-of-heaven-points ; /yaotongdian-ex-ue-7 ; /wailaogong-ex-ue-8
- https://www.acupuncture-points.org/?p=3493 (CV16) ; https://www.acupuncture-points.org/conception-vessel-20.html
- https://www.attiliodalberto.com/acupuncture/points/cv-15.php ; gv-15.php ; cv-9.php
- https://americandragon.com/Points/DU-15.html
- https://brainscape.com/flashcards/extra-points-and-needling-directions-5846973/packs/8189512 (extra, aproape toate)
- https://brainscape.com/flashcards/week-3-hand-extra-points-13753824/packs/21481956 (UE7, UE8)
- https://acupuncture-holistic.blogspot.com/2009/07/extraordinary-acupoints.html (extra; calitate slabă, text cu greșeli)
- https://en.wikibooks.org/wiki/Traditional_Chinese_Medicine/Head_And_Neck_Acupuncture_Points (HN1-15)
Nota: multe surse sunt deck-uri de studiu; `s` este deci o verificare secundară, nu o garanție OMS.

## 3. Corecturi (cod: înainte -> după, motiv)
- Toate: adăugat câmpul 9 (Verificat).
- CV14 localizare: „sub apendicele xifoid” -> „2 cun sub articulația xifosternală, 1 cun sub CV15”. Vârful xifoidului e la nivelul CV15, nu CV14 (HealthCMI, deck RN: CV14 la 2 cun sub unghiul sternocostal).
- CV15 localizare/avertisment: adăugat „procesul xifoid imediat deasupra”; avertisment extins (nu perpendicular adânc; atilio, HealthCMI, yinyanghouse).
- CV16 avertisment nou: stern, doar transversal superficial (meandqi, acupuncture-points.org, deck RN). Localizarea (articulația xifosternală / spațiul V) confirmată.
- CV20, CV21 avertisment nou: stern, doar transversal superficial, foramen sternal (meandqi, deck RN).
- CV21 localizare: „1 cun sub CV22” -> „la jumătatea distanței CV22-CV20 (cca 1 cun sub CV22)”. HealthCMI dă 1 cun sub CV22; yinyanghouse, deck exam-3, deck RN dau „între CV20 și CV22”; ambele păstrate.
- CV2, CV3 avertisment sarcină: „Evitat” -> „Precauție/Evitat (după unele surse)”. Nicio sursă citită nu notează sarcina pentru CV2/CV3 (HealthCMI nu); ⚠ păstrat, dar nuanțat.
- GV15 avertisment: adăugat „moxibustie contraindicată tradițional” (yinyanghouse + americandragon). Sarcina NU adăugată (o singură sursă: meandqi).
- EX-HN9: localizare rescrisă la „osul nazal / cartilajul nazal, partea superioară a nării” (deck: nasal bone-cartilage; blog: upper end of nostril); „cornet” nu e confirmat.
- EX-UE9, EX-LE10: precizat „4 puncte pe mână/picior, 8 în total”.
- EX-LE6: „cca 2 cun” -> „cca 1–2 cun sub GB34” (deck + blog: 1-2 cun). EX-LE7: „cca 2 cun” -> „cca 1,5–2 cun sub ST36” (deck 2, blog 1,5-2).
- Semnificații: CV3 „Polul central”; CV11 „Consolidarea interioară”; CV15 „Coada turturelei” (turtledove tail); CV21 „Pivotul de jad”; CV22 „Hornul cerului” (Celestial Chimney, meandqi); CV23 „Izvorul de la margine”; GV13 „Calea olarului” (kiln); EX-HN11 „Izvorul mării”; EX-B8 „A șaptesprezecea vertebră”. Sunt traduceri, nu citate OMS.
- Neschimbate după verificare: toate nivelurile vertebrale GV3-GV14 (L4, L2, L1, T11, T10, T9, T7, T6, T5, T3, T1, C7; două deck-uri), GV16 (1 cun, sub protuberanță), GV20 (5 cun), GV21 (1,5 cun în fața GV20), Mu (CV3, 4, 5, 12, 14, 17), Hui (CV12, CV17), Luo (CV15, GV1), Fereastra-cerului (CV22 și GV16: meandqi, yinyanghouse theory_skywindow, HealthCMI, deck RN), CV8 „înțepare contraindicată” (HealthCMI + deck RN).

## 4. Etichete: decizii
- Luo CV15/GV1, Mu CV3/4/5/12/14/17, Hui CV12/17: deja prezente și confirmate (>=2 surse).
- Yuan NU adăugat la CV6/CV15: sursele (un deck RN) le numesc „sursa lui huang/gao” (Ling Shu), nu Yuan clasic al canalelor; ar induce în eroare. Xi, Comandă, Cheie-vas: niciun punct din acest lot (Ren=LU7, Du=SI3 sunt în alte loturi). Mu la CV7/CV15 apar în americandragon, dar nu sunt standard: neadăugat.
- „Sea of Qi”/„Sea of Marrow” (GV14, GV15, GV16, GV20, CV6, CV17) nu sunt în lista de etichete permise: omise.

## 5. Statistici câmp 9
- v (text primar OMS): 0
- s (>=2 surse secundare): 90 (CV 24/24, GV 20/28, extra 46/48)
- gol (incert): 10
Avertismentele de sarcină la CV1, CV4, CV5, CV7 provin practic doar din HealthCMI (alte surse citite nu le contrazic, dar nici nu le confirmă); sunt păstrate (nu am șters niciun ⚠).

## 6. Puncte incerte (câmp 9 gol)
- GV17, GV18, GV19: distanțe de 1,5 cun deduse (yinyanghouse „la mijloc”; un deck dă GV19 la „6 cun” de linia anterioară, în dezacord cu 6,5 cun); o singură sursă solidă.
- GV22, GV23, GV24: doar yinyanghouse (marcat de ei înșiși „uncertain”); GV26, GV27: doar yinyanghouse în această rundă (formularea „treimea superioară/mijlocie” cunoscută, dar nereverificată).
- EX-B7 Yaoyan: 3,5 cun (decks Brainscape) vs 4 cun (blog); păstrat 3,5.
- EX-UE7 Yaotongdian: „1 cun proximal de pliu” (blog) vs „la jumătatea distanței pliu-MCF” (deck) vs „nivelul joncțiunii bază-corp metacarpian” (meandqi). Păstrat „aprox. la jumătatea distanței”.
- Fără distanță de 0,5 cun la EX-UE8 (o singură sursă); EX-LE6/LE7 sunt intervale, nu valoarea OMS exactă.
- Semnificații îndoielnice lăsate goale: EX-HN2, EX-B6, EX-UE4.
- Pentru `v` e necesar textul OMS: de verificat manual CV14-CV16, CV20-CV21, GV15, EX-UE7, EX-UE8, EX-LE6/LE7, EX-B7 când PDF-ul devine accesibil.
