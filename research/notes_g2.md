# Note de cercetare G2: HT, SI, BL, KI

Fișier produs: src/data/pts_g2.txt (HT 9, SI 19, BL 67, KI 27 = 122 puncte, toate cu 8 câmpuri, validate automat: câmpuri, regiuni, etichete, ghilimele).

## Surse folosite
- WHO WPRO, Standard Acupuncture Point Locations in the Western Pacific Region (2008, reeditat 2009), copie accesibilă la https://medbox.org/dl/627a4de115110145a1723f64 (citită prin WebFetch). ATENȚIE: textul extras are doar ~87.000 caractere și se termină în mijlocul intrării BL44. Din această copie sunt verificate direct: HT1-HT9, SI1-SI19, BL1-BL44, plus trimiterile încrucișate la KI3, KI8, KI14-KI18, KI22-KI27 (spațiile intercostale 5-1 și linia claviculei).
- Pagina de descărcare https://ebook-archive.firebaseapp.com/3/Who.html (doar confirmă conținutul: 361 puncte, 2008; nu conține textul).
- Sursa secundară, nume pinyin KI și BL45-BL67: https://en.wikipedia.org/wiki/List_of_acupuncture_points (coduri și pinyin; toate numele au coincis cu cele din fișier).
- Sursa secundară, localizări KI1-KI27: https://acupuncture-holistic.blogspot.com/2009/07/kidney-meridian.html și https://brainscape.com/flashcards/foot-shaoyin-11-27-6933272/packs/7540760 (KI11-KI27: 0,5 cun lateral pentru KI11-KI21, 2 cun lateral pentru KI22-KI27; niveluri ombilicale).
- Sursa secundară, localizări BL41-BL67: https://brainscape.com/flashcards/bl-the-bladder-channel-of-foot-tai-yang-15932046/packs/21945662 (a confirmat repere T2-T12, L1-L2, S2, hiatus sacral pentru BL41-BL54 și distanțele pentru BL55-BL59, BL61) și https://meandqi.com/tcm-education-center/acupuncture/bladder-channel/yixi-bl-45 (BL45 la T6, 3 cun).
- Accesul direct la PDF-ul OMS (iris.wpro.who.int, apps.who.int) a fost blocat de proxy/allowlist.

## Nivel de verificare
- Verificate în textul OMS: HT1-9, SI1-19, BL1-44, KI3 (+ trimiteri KI8, KI14-18, KI22-27).
- Verificate doar în surse secundare (+ cunoștințe standard, reformulate): KI1, KI2, KI4-KI13, KI19-KI21 (localizare), BL45-BL67 (localizare). Locurile din textul OMS pentru aceste puncte NU au fost citite direct; cer o a doua verificare vizuală în PDF-ul OMS.
- Etichetele (Yuan, Luo, Xi, Shu etc.) nu sunt în segmentul OMS accesat (OMS le tratează separat); provin din clasificarea tradițională standard și nu au fost confruntate punct cu punct cu o a doua sursă online în această sesiune.

## Puncte unde sursele diferă sau există variații
- BL2: OMS 2008 scrie Cuanzhu; mulți autori (și rândul vechi din aplicație) scriu Zanzhu. Am folosit grafia OMS. Codul BL2 e neschimbat.
- BL43: OMS scrie Gaohuang (alte surse: Gaohuangshu).
- KI2 Rangu: grafia OMS; alte surse scriu Rangu/Rangu sau Ran Gu; acceptabil.
- BL62 Shenmai: OMS dă „în depresiunea de sub vârful maleolei laterale”; rândul vechi avea „0,5 cun sub vârful maleolei” (convenția mai veche). Am urmat OMS.
- KI6 Zhaohai: 1 cun sub vârful maleolei mediale (OMS și rândul vechi).
- BL10: OMS indică nivelul marginii superioare a procesului spinos C2, în depresiunea laterală de trapez; rândul vechi folosea „1,3 cun lateral de GV15”. Am folosit varianta OMS.
- SI11: OMS indică o treime din linia dintre mijlocul spinei scapulei și unghiul inferior; rândul vechi: „în centrul fosei infraspinoase”. Am urmat OMS (regiune schimbată din gat în spa).
- BL17 Geshu: în fișier etichetat Hui (sânge), nu Shu-dorsal (nu e Shu al unui organ zang-fu). BL16 Dushu, BL24, BL26, BL29, BL30: fără etichetă Shu-dorsal (nu sunt Shu de organ). BL11 Dazhu (Hui-oase) a primit doar mențiune în Acțiuni, fiindcă lista de etichete are o singură etichetă Hui și ea e atribuită; am pus „Hui” doar pe BL17. Dacă aplicația suportă mai multe tipuri de Hui, de adăugat pe BL11.
- BL59 Fuyang și KI8/KI9: sunt Xi ale vaselor extraordinare (Yang Qiao, Yin Qiao, Yin Wei), nu Xi de meridian; menționate în Acțiuni, NU puse ca etichetă Xi. Xi de meridian: HT6, SI6, BL63, KI5.
- BL63 Jinmen: Xi de meridian; în unele surse și punct de „deschidere”; neverificat suplimentar.
- BL39 Weiyang: He inferior al Triplului Încălzitor (clasic). BL40: He-mare și Comandă (spate).
- BL64 Jinggu: Yuan (verificat doar din cunoștințe standard).
- Pneumotorax: pus la punctele dorsale T1-T10 (BL11-BL19, BL41-BL47) și SI14-SI15, KI22-KI27 (intercostale). BL20-21, BL48-50: doar „înțepare oblică și superficială”.
- Sarcină: BL31-BL34 (foramene sacrale), BL60 și KI11-KI15 (abdomen inferior, „prudență”) sunt avertismente conservatoare tradiționale, nu din textul OMS.

## Incertitudini / goluri
- Semnificațiile numelor sunt traduceri uzuale din literatura engleză, reformulate în română; lăsate goale unde nu sunt sigur: BL4 Qucha, BL8 Luoque, KI8 Jiaoxin, KI24 Lingxu, KI26 Yuzhong.
- Unele traduceri sunt aproximative (de ex. BL45 Yixi, onomatopee; BL53 Baohuang; SI2, SI7, SI13; KI9, KI12).
- BL58 Feiyang: „7 cun deasupra BL60, pe marginea posterioară a fibulei, lateral și cu cca 1 cun sub BL57”: verificat parțial (7 cun și relația cu BL57 din brainscape); detaliul „marginea posterioară a fibulei” e din memorie.
- BL61, BL63-BL66: repere osoase din cunoștințe standard; nu confirmate în textul OMS direct.
- KI4, KI5, KI9: reperele fine (calcaneu, linia KI3-KI10) din memorie + surse secundare.
- Cheie-vas atribuit la SI3 (Du Mai), BL62 (Yang Qiao Mai), KI6 (Yin Qiao Mai).
- Nu am inclus etichetele Mu (niciun punct Mu pe aceste meridiane) și Hui suplimentare.
