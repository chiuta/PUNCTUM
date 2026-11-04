# Audit adversarial de siguranță – câmpul 6 „Atenție" (PUNCTUM)

Data: 2026-11-04. Metodă: WebSearch/WebFetch; fiecare afirmație cu ≥2 surse. Surse neverificabile direct (reCAPTCHA: PMC4680134, PMC6918516) sunt citate doar prin rezumatul din jurnalul original (JAMS/Korean J Acupuncture). Fișierele modificate: `src/data/pts_existing.txt`, `pts_g1..g4.txt` (doar câmpul 6; același număr de rânduri și de câmpuri). Backup: scratchpad.

## Surse (abrevieri)
- **JCM** – „The safe use of difficult and dangerous acupuncture points", J Chin Med: https://www.jcm.co.uk/the-journal/sample-articles/the-safe-use-of-difficult-and-dangerous-acupuncture-points.html
- **AACP/POGP** – ghid fizioterapeuți (AACP) în sarcină: https://thepogp.co.uk/_userfiles/pages/files/gps_apr_prlb_pgp_07.pdf
- **Physiopedia** – https://physio-pedia.com/Acupuncture_contraindications (citează AACP; independent de JCM)
- **OCOM** – material curs: https://odc.ocom.edu/files/original/2d5c1b004080df8fb96ce678a7918ac166234624.pdf
- **JAMS 2011** – revizuire 28 de texte clasice despre sarcină: https://iam.biomedcentral.com/articles/10.1016/j.jams.2011.10.006 (= Korean J Acupunct 28(2): https://koreascience.kr/journal/HHRRB4/v28n2.pub?lang=ko)
- **Huachiew** – https://www.huachiewtcm.com/en/content/10439
- **Deadman-SH** – fișe după „Safety Handbook" (Deadman): https://brainscape.com/flashcards/safety-handbook-deadman-5868659/packs/8189512 (sursă secundară, slabă)
- **Jiayijing** – Kor J Acupunct 2010: https://koreascience.or.kr/article/JAKO201025665646180.page
- **Tongren-2012** – puncte interzise (Illustrated Manual): https://koreascience.kr/article/JAKO201215053139932.pdf
- **Kwon&Kim-2018** – Taiping Shenghui Fang / Tongren: https://koreascience.kr/article/JAKO201810852361430.pdf
- **ZJDC** – Zhen Jiu Da Cheng, 45 puncte fără moxă: https://www.qihuanghealthcare.cn/bbs/detail/1433
- **Kim 2009** – revizuire puncte interzise la moxă (fața = proporția cea mai mare): https://www.koreascience.or.kr/article/JAKO200916955021331.page
- **GV17 modern**: https://www.meandqi.com/knowledge-base/acupuncture/governing-vessel/naohu-du-17
- **PC6 nerv median**: https://boris.unibe.ch/24550 ; https://www.pubmed.gov/19098694/

## Modificări în câmpul 6 (46 de coduri; 5 fișiere, inclusiv duplicatele din pts_existing)

| Cod | Avertisment adăugat / corectat | Surse |
|---|---|---|
| CV1–CV7, EX-CA1, EX-B5 | „Evitat în sarcină" → „Evită în sarcină" (corectat pentru a fi recunoscut de regex-ul din cod; conținut neschimbat). CV2: „Precauție" → „Evită" | JCM (CV2–CV4), OCOM (toate punctele abdomenului inferior), AACP/POGP (puncte abdominale), JAMS 2011 (CV4 interzis constant, CV3) |
| BL31–BL34 | „Evitați în sarcină" → „Evită în sarcină (foramene sacrale, aproape de uter)" | JCM, AACP/POGP, Physiopedia, OCOM |
| KI11–KI15 | „Prudență în sarcină" → „Evită în sarcină (abdomen inferior)"; KI11–13: + vezica se golește înainte | JCM (abdomen inferior; KI11–13 vezică), OCOM, AACP/POGP, Deadman-SH |
| ST25 | NOU: evită în sarcină (abdomen, după luna 3) | JCM, OCOM (abdomen după luna 3), AACP/POGP |
| ST26, ST27, SP13, SP14, GB27, GB28 | NOU: evită în sarcină (abdomen inferior) | OCOM („toate punctele abdomenului inferior"), AACP/POGP, JCM (generic) |
| ST28, ST29 | NOU: evită în sarcină + vezica se golește, fără presiune profundă | JCM, Deadman-SH (vezică/peritoneu); sarcină: OCOM, AACP/POGP |
| ST30 | NOU: evită în sarcină (+ avertismentul vascular existent) | OCOM, AACP/POGP; JAMS 2011 (ST30 în lista punctelor din travaliu dificil) |
| CV10–CV12 | NOU: „Doar sub îndrumare medicală în sarcină" (abdomen superior, se evită după luna 3–5) | JCM (CV10–12 după luna 5), OCOM (precauție la orice punct abdominal după luna 3) |
| ST9 | + moxă contraindicată tradițional | Jiayijing (înțepare și moxă), Tongren-2012, ZJDC |
| ST1 | + moxă contraindicată | Jiayijing, Kwon&Kim-2018, Tongren-2012 |
| BL1, BL2, BL6 | + moxă contraindicată | ZJDC, Kwon&Kim-2018, Tongren-2012 (BL6 și Jiayijing) |
| ST7, ST8, LI20, TE23, GV25 | + moxă contraindicată | ZJDC, Tongren-2012, Jiayijing (ST7/ST8/TE23/GV25), Kwon&Kim-2018 (ST1/LI20) |
| GV6 | + moxă contraindicată | Jiayijing, ZJDC, Kwon&Kim-2018, Tongren-2012 |
| GV16 | + moxă contraindicată | Jiayijing, ZJDC, Kwon&Kim-2018, Tongren-2012 |
| GV17 | NOU: nu se înțeapă profund; moxă contraindicată (risc pentru vorbire) | Tongren-2012, Kwon&Kim-2018, meandqi |
| PC6, PC7 | NOU: nerv median superficial; presiune blândă, oprește la furnicături/amorțeală/șoc | Deadman-SH (slabă), studii US (boris.unibe.ch, PubMed 19098694) |

Notă: „Doar sub îndrumare medicală" la CV10–12 este formularea recunoscută de regex-ul `CPREG`, deci apare și în avertismentul din rutine.

## Verificate și lăsate neschimbate (corecte)
LI4, SP6, BL60 (contraindicate; JCM, AACP/POGP, Physiopedia, OCOM, Huachiew), BL67 (JCM, AACP, OCOM: ok doar pentru poziție pelvină la 32–34+ săpt.), GB21 (JCM, OCOM, Huachiew, Deadman-SH), LU1/LU2/ST11–ST18/SP17–21/BL11–BL21/BL41–50/KI22–27/SI14–15/GB22–24/LR13–14 (pneumotorax; JCM + cchp), LU8/LU9/ST42/HT1/PC3 (vase; JCM), ST9/ST10/SI17/LI18 (carotidă), CV17 (foramen sternal; JCM), CV22 (JCM), CV8 (înțepare interzisă; Jiayijing, Tongren-2012), ST17 (fără ace/moxă; Jiayijing, ZJDC), GV15/GV16 (bulb; JCM), BL1/ST1 (JCM), GV21/GV22 (fontanelă; JCM).

## Candidate cu o singură sursă (NU editate)
- ST12 și sarcină (doar Huachiew; ST12 are deja avertisment de pneumotorax).
- SP12, KI6, LR3, LR4, PC6, CV14 în sarcină (JAMS 2011 le listează ca puncte folosite în travaliu dificil, nu ca interzise ferm).
- SI11 (foramen scapular, risc de lezare la înțepare profundă): doar JCM.
- BL27–BL30, GV2 (regiune sacrală): doar mențiune generică OCOM/JCM „sacral/lombar".
- Enlargement hepatic/splenic CV14/15, GB25, LR14, ST19–21: doar JCM. GV20: moxă „interzisă" în texte clasice (Kwon&Kim, Tongren-2012), dar uz modern comun; nemarcat.
- Anticoagulante, stimulator cardiac: tratate în textul static (10_views.js), nu pe puncte.

## Lipsuri în logica din cod (nu s-au modificat fișiere .js)

Mecanismul de sarcină NU folosește o listă, ci o expresie regulată peste câmpul 6, deci depinde 100% de formularea textului.

1. **`src/js/21_conditions.js:43`** `const CPREG=/Contraindicat în sarcină|Evită în sarcină|Doar sub îndrumare/` (copie identică, hardcodată, la **`src/js/10_views.js:171`**). Înainte de editarea datelor nu recunoștea „Evitat în sarcină" (CV1–7, EX-CA1, EX-B5), „Evitați în sarcină" (BL31–34), „Prudență/Precauție în sarcină" (KI11–15, CV2). Efect real: CV4, CV6 și ST25 apar în `src/data/cond_a.txt` (liniile 14–16, 18, 32–36, 44–46, 52–58) și în protocoalele din `src/js/05_date-protocoale-de-presopunc.js:9,12,13`, dar avertismentul „În sarcină evită:" (21_conditions.js:81, 21_conditions.js:191, 10_views.js:175) nu le includea. Datele sunt acum aliniate la regex, dar fragilitatea rămâne: recomand o etichetă structurată (ex. „Sarcină" în câmpul 7 Etichete) sau un singur `const` partajat cu `/sarcin/i`.
2. **Tipărirea rutinei** (`src/js/21_conditions.js:146–152`, `rtnPrint`): tabelul nu conține nicio avertizare pe punct și nu listează punctele contraindicate în sarcină; doar `pFoot` generic (21_conditions.js:21). O rutină tipărită pierde complet ⚠.
3. **Sesiunea ghidată** (`src/js/10_views.js:143`, `drawSes`) afișează `p.w` doar ca text mic colorat; nu există o poartă „ești însărcinată?" înainte de pornirea unui protocol sau a unei rutine (`startCustom`, `cndStart`, 21_conditions.js ~63–66). Avertismentul de sarcină din protocoale (10_views.js:175) e un `<p class="w">` mic, nu `.warn`.
4. **Vizibilitate în fișa punctului** (`src/js/08_helpers.js:16` + `src/style.css:29`): `.pt .w` = 0.88rem, fără chenar/fundal/bold, plasat ultimul în card, mai mic decât textul de corp (0.93rem). Pentru avertismente de tip contraindicație (sarcină, pneumotorax, vas mare) ar trebui folosit `warnBox`/`.warn` (style.css:24), plasat sub titlu.
5. **Avertismente non-sarcină** (pneumotorax, vase, moxă) nu sunt agregate în rutine/afecțiuni/protocoale (doar sarcina e filtrată prin regex; nu există agregare pentru ⚠ de tip „presiune puternică", anticoagulante etc.).
6. **Date duplicate**: `build.py` concatenează `pts_*.txt` alfabetic, iar `PT` (04_date-puncte-cod-pinyin-regiu.js, `Map`) păstrează ultima apariție; 95 de coduri din `pts_existing.txt` sunt suprascrise de `pts_g*.txt`. Un avertisment doar în `pts_existing.txt` e mort pentru codurile duplicate (editările au fost făcute în ambele locuri). `EX-Anmian` (pts_existing.txt) are 8 câmpuri (nu 9), iar `pts_g3.txt` are un rând gol.
7. Textul static `src/js/10_views.js:334` dă „SP6, LI4, BL60, GB21 etc." și „puncte abdominale inferioare", dar nu menționează BL31–34 sau BL67 explicit.
