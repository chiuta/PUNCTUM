# Note de cercetare g4 (CV, GV, puncte extra OMS)

Fișier produs: src/data/pts_g4.txt (24 CV + 28 GV + 48 EX = 100 rânduri).

## Limitare principală
Textul integral OMS WPRO 2008 nu a putut fi citit pentru capitolele GV, CV și puncte extra: curl către iris.who.int și medbox.org a fost respins de proxy (403), iar copia accesibilă prin WebFetch (medbox.org/dl/627a4de115110145a1723f64) se oprește la mijlocul capitolului Vezică (BL44). Deci OMS 2008 NU a fost consultat direct pentru aceste puncte. Verificarea s-a făcut prin surse secundare care reproduc standardul, plus cunoștințe proprii; formulările sunt reformulate în română.

## Surse folosite (URL)
- https://newsite.healthcmi.com/wp-content/uploads/2024/07/CVacupoints_HealthCMi.pdf (CV1-CV24: nume, localizări, categorii Mu/Hui/Luo, precauții)
- https://en.wikipedia.org/wiki/List_of_acupuncture_points (listele CV 24 și GV 28, pinyin)
- https://yinyanghouse.com/theory/acupuncturepoints/governingvessel_meridian_study_acupuncture_points_flash_cards (GV: localizări, Fereastra-cerului GV16, precauție GV21)
- https://brainscape.com/flashcards/governing-vessel-du-mai-1-14-2510368/packs/4306349 (GV1-GV14: niveluri vertebrale, GV1 Luo)
- https://brainscape.com/flashcards/governing-vessel-gv-also-du-location-10396825/packs/18620829 (GV1, 3, 4, 14, 16, 20, 26, 28: formulări apropiate de OMS)
- https://brainscape.com/flashcards/du-mai-meridian-governing-vessel-10810217/packs/19287124 (GV15-GV28: distanțe în cun, GV22 fontanelă)
- https://brainscape.com/flashcards/du-channel-15359837/packs/21844111 (GV16 Fereastra-cerului, GV niveluri)
- https://brainscape.com/flashcards/extra-points-and-needling-directions-5846973/packs/8189512 (puncte extra: localizări, note)
- https://acupuncture-holistic.blogspot.com/2009/07/extraordinary-acupoints.html (lista de 48 puncte extra cu coduri; sursă de calitate slabă, folosită doar ca a doua confirmare)
- https://en.wikibooks.org/wiki/Traditional_Chinese_Medicine/Head_And_Neck_Acupuncture_Points (EX-HN1 la EX-HN15: coduri și pinyin)
- https://www.meandqi.com/knowledge-base/acupuncture/anmian-ex-hn , https://pulsetcm.sg/bites/an-mian-ex-hn20/ , https://www.attiliodalberto.com/acupuncture/points/an-mian.php (Anmian)

## Structura listei extra OMS 2008 (48)
EX-HN 1-15 (15), EX-CA 1 (1), EX-B 1-9 (9), EX-UE 1-11 (11), EX-LE 1-12 (12) = 48. Confirmat de Wikibooks (HN1-HN15) și de blogul de mai sus (celelalte grupe); suma 48 corespunde numărului cunoscut pentru OMS 2008.

## ANMIAN: problemă pentru decizie
- Anmian NU face parte din cele 48 de puncte extra OMS 2008 (HN se oprește la EX-HN15). Deci nu există cod OMS corect pentru el.
- Sursele secundare dau coduri contradictorii: EX-HN16 / EX-HN18 (meandqi), EX-HN20 (pulsetcm), iar standardul chinez GB/T 12346-2006 îl numerotează după memoria mea EX-HN22 (neverificat). Brainscape: „Ex-HN (fără număr)”, „not on the list”.
- Decizie luată: Anmian NU a fost inclus în pts_g4.txt (nu inventez cod). Rândul vechi „EX|Anmian” nu ar trebui șters decât dacă se decide să se renunțe la punct; alternativ, se poate păstra ca punct non-OMS cu o notă (localizare: la jumătatea liniei dintre TE17 și GB20, în spatele mastoidei; toate sursele concordă asupra localizării).
- Notă: dacă rândul „EX” vechi se șterge, aplicația pierde Anmian. Recomand păstrarea lui cu o marcare explicită „non-OMS”.

## Rânduri existente verificate
EX-HN3 Yintang, EX-HN5 Taiyang, EX-HN1 Sishencong, EX-B1 Dingchuan, EX-B2 Huatuojiaji (OMS: Jiaji / Huatuojiaji, 17 perechi T1-L5), EX-UE11 Shixuan, EX-UE9 Baxie, EX-LE10 Bafeng: toate codurile sunt corecte; rescrise în formatul nou. Rândurile existente pentru CV4, CV6, CV8, CV12, CV17, CV22, CV24, GV4, GV14, GV16, GV20, GV26 sunt înlocuite de cele noi (același cod): trebuie șterse din fișierul vechi ca să nu apară duplicate. GV16 era „cap”, acum „gat” (ceafă). Un alt aspect: Shixuan și Bafeng aveau localizări vagi; acum sunt precizate.

## Puncte unde sursele diferă
- GV6 Jizhong: T11 (OMS, 2 surse) vs T12 (o sursă, Maciocia-style); aleasă T11.
- GV7: grafie Zhongshu (OMS) vs Zongshu (o sursă); aleasă Zhongshu.
- GV17/GV18/GV19: distanțe de 1,5 cun între GV16-GV17-GV18-GV19-GV20 (OMS, 1 sursă explicită + coerența cu 7 cun părul posterior-GV20); alte surse spun „la jumătatea distanței”, rezultatul numeric e același.
- GV15: „sub C1” vs „între C1 și C2”; formulare combinată. Neverificat în textul OMS.
- GV26: Wikipedia/OMS dau „treimea superioară”; o sursă spune „juncțiunea treimii superioare cu două treimi inferioare”, același lucru. Etichetat doar localizarea, nu „Comandă” (sursa yinyanghouse numește GV26 „command point” într-un sens neclasic; eticheta Comandă din aplicație nu a fost aplicată niciunui punct din acest lot).
- CV16: „la nivelul spațiului intercostal V” (HealthCMI) vs „la nivelul articulației xifosternale” (OMS, din memorie); formulare combinată.
- CV20/CV21: HealthCMI amestecă „unghiul sternal” cu spațiul I; folosit „spațiul intercostal I” (CV20) și „1 cun sub CV22” (CV21). Verificare recomandată.
- EX-B7 Yaoyan: 3,5 cun (brainscape) vs 4 cun (blog, probabil versiune veche); aleasă 3,5 cun.
- EX-B6 Yaoyi: 3 cun (concordă).
- EX-B3 Weiwanxiashu: 1,5 cun lateral de T8 (concordă); o sursă adaugă un al treilea punct, ignorat.
- EX-B5 Xiajishu: pe linia mediană sub L3 (ambele surse); brainscape menționează și o variantă cu două puncte la 3 cun.
- EX-UE7 Yaotongdian: două descrieri diferite (1 cun deasupra pliului încheieturii, de o parte și alta a tendonului extensor, vs între metacarpienele II-III și IV-V la mijlocul distanței). Aleasă a doua (OMS din memorie); incert.
- EX-UE8 Wailaogong: „între metacarpienele II-III, proximal de articulațiile MCF”; distanța exactă (0,5 cun) nu a fost confirmată, omisă din text.
- EX-LE6 Dannang: 1-2 cun sub GB34 (surse) vs 2 cun (OMS din memorie); scris „cca 2 cun”. EX-LE7 Lanwei: 1,5-2 vs 2 cun; scris „cca 2 cun”.
- EX-LE12: blogul scrie „Qidian”, forma corectă OMS este Qiduan (confirmată de brainscape). Folosit Qiduan.
- EX-HN8: Shangyingxiang, cu sinonimul Bitong (brainscape îl codează „Ex-HN-8”, concordă).

## Etichete (doar ce s-a putut verifica)
- Mu: CV3 (vezică), CV4 (intestin subțire), CV5 (Triplu Încălzitor), CV12 (stomac), CV14 (inimă), CV17 (pericard), toate confirmate de HealthCMI.
- Hui: CV12 (organe Fu), CV17 (Qi), HealthCMI.
- Luo: CV15 (HealthCMI), GV1 (brainscape, 2 surse). Marele Luo și alte Luo nu fac parte din acest lot.
- Fereastra-cerului: GV16 (2 surse: yinyanghouse, brainscape) și CV22 (doar HealthCMI); CV22 e mai puțin consensual, de verificat dacă aplicația vrea doar lista clasică.
- Nu s-au aplicat: Yuan (CV15 și CV6 sunt „izvorul” gao/huang în Lingshu, dar nu sunt în categoria Yuan clasică; omis), Xi, Cheie-vas (punctele cheie ale celor 8 vase sunt LU7, SI3 etc., în alte grupe), Comandă.
- Alte categorii nemenționate în lista permisă (Sea of Qi, Sea of Marrow, puncte-fantomă Sun Si-miao) nu au fost incluse.

## Incertitudini generale
- Semnificațiile numelor sunt traduceri uzuale din engleză către română; lăsate goale unde nu eram sigur (EX-HN2 Dangyang, EX-B6 Yaoyi, EX-UE4 Zhongkui). Unele sunt aproximative (de ex. CV22 Tiantu, CV23 Lianquan, GV13 Taodao, EX-UE11 Shixuan, EX-B5 Xiajishu).
- Avertismentele de sarcină pentru CV1-CV7: sursele variază (HealthCMI nu notează sarcina pentru CV3 și CV6); am aplicat abordarea conservatoare cerută, cu „după unele surse” la CV6.
- Avertismentul „canal rahidian” pentru GV6-GV14 este generic, bazat pe note tehnice din surse (de ex. canal la 1,25-1,75 cun adâncime la GV13), nu pe un text OMS.
- Acțiunile sunt formulate din indicații tradiționale frecvente din mai multe surse, fără promisiuni de vindecare; pentru punctele extra mai rare (EX-UE1-8, EX-LE1-9, EX-B4/B9) indicațiile sunt scurte și mai puțin verificate.
