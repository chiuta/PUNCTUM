# Note cercetare – grupa 1 (LU, LI, ST, SP)

Rezultat: src/data/pts_g1.txt – LU 11, LI 20, ST 45, SP 21 = 97 puncte.

## Surse
1. OMS WPRO, WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008, retipărit 2009), text integral citit prin https://medbox.org/dl/627a4de115110145a1723f64 (WebFetch, cu rezumare automată; PDF-ul nu a putut fi descărcat direct – proxy 403). Sursa pentru coduri, pinyin și localizări. Rezumatul automat a parafrazat, deci formulările exacte nu au fost comparate cuvânt cu cuvânt; localizările în română sunt reformulări proprii.
2. https://en.wikipedia.org/wiki/List_of_acupuncture_points – coduri, pinyin, nume englezești (confirmare a 97 de nume pinyin).
3. https://musculoskeletalkey.com/acupuncture-points-of-14-channels/ – coduri și pinyin (confirmare a 97 de nume).
4. https://cdn.shopify.com/s/files/1/0570/5724/7299/files/The_five_shu_points.pdf – punctele celor cinci shu (Jing-puț ... He-mare) pentru LU, LI, ST, SP.
5. https://chiro.org/acupuncture/ABSTRACTS/Acupuncture_Points.pdf – Luo, Xi, Yuan și punctele de element pentru cele patru meridiane.
6. https://www.meandqi.com/knowledge-base/concepts/yuan-source-points – Yuan (LU9, LI4, ST42, SP3) și LI6 Luo.
7. https://www.elotus.org/print/45975 și https://tcmguide.pages.dev/basics/tcm-acupoint-categories/ – confirmări parțiale (LU1 Mu, LU6/ST34 Xi, LU7/ST40 Luo, LU9 Hui, ST36 și ST37 He inferior, SP3 Yuan etc.).
   Atenție: tcmguide are o eroare evidentă (ST34 numit „Wenliu”; Wenliu este LI7) – ignorată; Xi-ul real al LI este LI7 (chiro.org).

## Concordanțe verificate pe două surse
- Toate cele 97 de coduri și nume pinyin.
- Cele cinci shu (tabelul din sursa 4 coincide cu sursa 5): LU11/10/9/8/5, LI1/2/3/5/11, ST45/44/43/41/36, SP1/2/3/5/9.
- Yuan: LU9, LI4, ST42, SP3. Luo: LU7, LI6, ST40, SP4. Xi: LU6, LI7, ST34, SP8.
- Mu: LU1 (Plămân), ST25 (intestin gros).
- Hui al vaselor: LU9.

## Etichete incluse fără verificare completă pe web (cunoștințe de manual standard)
- Fereastra-cerului: LU3, LI18, ST9 (lista clasică din Lingshu; nu a fost găsită confirmare web explicită în această sesiune).
- He-inferior: ST39 (intestin subțire); ST36 și ST37 confirmate parțial (sursa 7).
- Cheie-vas: LU7 (Ren Mai), SP4 (Chong Mai) – confirmate doar pentru SP4/LU7 în fișierul existent al aplicației, nu în sursele web citite.
- Comandă: LU7, LI4, ST36 (cele patru puncte de comandă clasice, împreună cu BL40).
- SP21 Luo: „marele Luo al Splinei” (manuale; nu e în sursele citite). Dacă se dorește doar Luo „standard” (15 legături), eticheta se poate scoate de pe SP21.
- Mu pentru Stomac (CV12) și Splină (LR13) nu sunt pe aceste meridiane; Back-Shu sunt pe BL (nu au etichetă în schema aplicației).

## Puncte unde sursele diferă / incertitudini
- Nume (semnificații): sursele englezești diferă (ex. SP2 „Great Pool” vs „Great Metropolis”, SP8 „Earth Cure” vs „Earth Pivot”, ST10 „Liquid Passage”, ST45 „Running Point”). Am lăsat goale semnificațiile nesigure: LU4, LI19, ST15, ST19, ST45, SP2, SP20. Celelalte sunt traduceri uzuale, aproximative; recomand o trecere de verificare de către un vorbitor de chineză înainte de publicare.
- LI19 și LI20: OMS le marchează ca puncte controversate (cu loc alternativ în „Remarks”); am dat locul principal OMS. LI20 diferă de varianta din rândul existent doar prin formulare.
- Reperele de referință OMS: LI5, LI11, LI15 (nu sunt etichete în aplicație).
- Rânduri existente modificate: LI15 – reg schimbat din „gat” în „bra” (umăr); localizarea LI15 aliniată la OMS (depresiunea dintre acromion și tuberozitatea mare). LU1: adăugat „cam 1 cun sub LU2” (relație OMS). ST2: OMS spune „în gaura infraorbitală”; eliminat „1 cun sub marginea orbitei”. ST36: eticheta Comandă adăugată.
- ST31 (nivelul față de simfiza pubiană), SP11 (raportul 1/3–2/3) și SP12 – formulări din rezumatul automat; merită o a doua verificare pe PDF-ul original.
- Pentru ST17 OMS nu are localizare disputată, dar avertismentul „nu se înțeapă / fără moxa” provine din tradiția clasică, nu din textul OMS.

## Avertismente (Atenție)
- Incluse doar cele bazate pe anatomie (pneumotorax: LU1, LU2, LI16, ST12–ST16, ST18, SP17–SP21; artere: LU8, LU9, ST5, ST9, ST30, ST42, SP11, SP12; vase gât: LI17, LI18, ST10, ST11) și cele clasice de sarcină (LI4, SP6).
- NU am inclus avertismente generale pentru sarcină la abdomenul inferior (ST26–ST30, SP13, SP14) și la alte puncte – regula este frecventă în manuale, dar nu a fost verificată în sursele citite. Se poate adăuga ulterior.
- Avertismentele sunt orientative pentru material educațional; aplicația ar trebui să precizeze că nu înlocuiește instruirea clinică.
