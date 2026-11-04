# Audit adversarial – afecțiuni (src/data/cond_a.txt)

Data: 2026-11-04. Fișier: 60 afecțiuni, 10 câmpuri, format păstrat. Verificare automată: toate codurile de puncte există în pts_*.txt, toate id-urile de variante în var_base.txt (după corecturi).

## Corecturi (id: înainte -> după, motiv)

- **lombalgie** [protocol]: „durere bună” -> „disconfort tolerabil” — „durere bună” poate încuraja apăsarea excesivă
- **lombalgie** [dovezi]: „m: Pentru lombalgia cronică acupunctura (cu ace) are dovezi de nivel moderat pentru reducerea durerii pe termen scurt, o parte din…” -> „l: Pentru lombalgia cronică, o sinteză Cochrane (Mu et al., 2020) arată că acupunctura (cu ace) reduce durerea față de lipsa trata…” — ev m->l: Cochrane 2020 (certitudine scăzută vs sham, sub prag clinic); NICE NG59 împotrivă
- **lombalgie** [semnale alarmă]: „În sarcină nu folosi GB30 și BL60 și întreabă medicul.” -> „Urgență: durere lombară intensă și bruscă cu durere abdominală, leșin sau transpirații (posibil anevrism aortic sau alt eveniment …” — semnale lipsă (aortă, pielonefrită, osteoporoză, anticoagulante); avertisment sarcină corectat (BL60 nu era în listă)
- **cervicalgie** [semnale alarmă]: „Urgență: durere cervicală după traumatism” -> „Urgență 112: durere cervicală bruscă și severă, mai ales după mișcări bruște ale gâtului sau manipulări (posibilă disecție de arte…” — AVC / disecție arterială lipsă
- **umar** [semnale alarmă]: „pierderea bruscă a forței brațului.” -> „pierderea bruscă a forței brațului, față căzută sau vorbire neclară (posibil AVC: 112). Durerea de umăr stâng sau cu senzație de a…” — AVC, durere cardiacă iradiată
- **gonalgie** [dovezi]: „m: Pentru artroza de genunchi, acupunctura (cu ace) are dovezi moderate de ameliorare a durerii pe termen scurt, o parte din efect…” -> „l: Pentru artroza de genunchi, o sinteză Cochrane (Manheimer et al., 2010) a găsit ameliorări mici ale durerii, sub pragul relevan…” — ev m->l: Cochrane 2010 (efect mic, nerelevant clinic), NICE NG226 nu recomandă
- **gonalgie** [semnale alarmă]: „Durerea de gambă cu umflătură poate indica tromboză: urgență.” -> „Durerea de gambă cu umflătură, căldură sau roșeață (mai ales după călătorii lungi, imobilizare, operație sau în sarcină/după naște…” — TVP: masaj contraindicat, factori de risc
- **sciatalgie** [dovezi]: „l: Studiile despre acupunctură în sciatalgie sunt de calitate variabilă, cu dovezi limitate privind ameliorarea durerii; acupresur…” -> „l: Studiile despre acupunctură în sciatalgie sunt de calitate variabilă, cu dovezi limitate; ghidul NICE NG59 nu o recomandă pentr…” — NICE NG59
- **fibromialgie** [dovezi]: „m: Pentru fibromialgie acupunctura și mișcarea blândă (tai-chi, qigong) au dovezi de nivel redus până la moderat privind durerea ș…” -> „l: Pentru fibromialgie, o sinteză Cochrane (Deare et al., 2013) a găsit dovezi de certitudine scăzută până la moderată că electroa…” — ev m->l: Cochrane 2013 (certitudine scăzută-moderată, doar electroacupunctură)
- **greata** [dovezi]: „m: PC6 este punctul cu cele mai bune dovezi: revizuirile Cochrane arată un efect modest asupra greței postoperatorii și a celei in…” -> „m: PC6 este punctul cu cele mai multe studii: revizuirea Cochrane din 2015 (Lee et al.) arată un efect modest asupra greței și văr…” — Cochrane 2015 PC6: efect modest, fără adaos peste antiemetice; „cele mai bune dovezi” era exagerat
- **greata** [semnale alarmă]: „sarcină cu vărsături repetate.” -> „sarcină cu vărsături repetate. Nu folosi acupresura ca să amâni consultul dacă ai dureri abdominale intense, mai ales în dreapta j…” — apendicită
- **dispepsie** [semnale alarmă]: „durere toracică.” -> „durere toracică. Durerea în partea superioară a abdomenului cu transpirații, lipsă de aer, greață bruscă sau durere în braț/maxila…” — infarct atipic, apendicită
- **constipatie** [auto-îngrijire]: „În sarcină omite LI4 și SP6.” -> „În sarcină omite LI4, SP6 și masajul abdominal profund (ST25).” — ST25/abdomen în sarcină
- **constipatie** [semnale alarmă]: „constipație nouă și persistentă.” -> „constipație nouă și persistentă. Urgență: durere abdominală intensă și bruscă, abdomen dur, vărsături sau febră (apendicită, ocluz…” — abdomen acut: masajul abdominal poate agrava
- **diaree** [semnale alarmă]: „revenire dintr-o călătorie în zone tropicale.” -> „revenire dintr-o călătorie în zone tropicale. Mergi mai devreme la medic dacă ești gravidă, vârstnic, imunodeprimat, ai luat recen…” — grupuri de risc
- **colon-iritabil** [semnale alarmă]: „Mergi la medic dacă ai:” -> „Diagnosticul de colon iritabil se pune doar după excluderea altor cauze de medic. Urgență: durere abdominală intensă sau bruscă, a…” — excludere abdomen acut; diagnostic prin excludere
- **balonare** [semnale alarmă]: „Mergi la medic dacă balonarea” -> „Balonarea persistentă la femei peste 40–50 de ani, cu sațietate rapidă sau durere pelvină, cere evaluare (inclusiv ginecologică). …” — ovar — simptom de alarmă frecvent ignorat
- **sughit** [puncte]: „PC6,CV22,BL17,GV26” -> „PC6,BL17,GV26” — CV22 (incizura sternală, aproape de trahee) scos; GV26 menționat în protocol
- **sughit** [protocol]: „apoi apasă ușor CV22 (la baza gâtului, fără presiune pe gât) și masează BL17 30–60 s.” -> „apoi masează BL17 și apasă ușor GV26 (sub nas) 30–60 s.” — CV22 presiune lângă trahee: risc/disconfort fără beneficiu; GV26 era în listă dar absent din protocol
- **sughit** [semnale alarmă]: „după un accident vascular.” -> „după un accident vascular. Sughițul persistent cu durere toracică sau abdominală poate semnala o afecțiune gravă.”
- **raceala** [semnale alarmă]: „la sugari sub 3 luni orice febră.” -> „la sugari sub 3 luni orice febră (38 °C sau mai mult) cere consult medical urgent. Alte semne de alarmă: gât țeapăn, erupție care …” — febră sugar, meningită
- **rinita-alergica** [dovezi]: „m: Pentru rinita alergică, acupunctura (cu ace) are dovezi moderate de ameliorare a simptomelor în studii mici; pentru acupresură …” -> „l: Pentru rinita alergică, sinteza Cochrane (Feng et al., 2015) sugerează un beneficiu al acupuncturii, dar cu dovezi de certitudi…” — ev m->l (certitudine mică, risc de bias)
- **tuse** [semnale alarmă]: „tuse la sugar sau copil mic cu respirație rapidă, pierdere în greutate.” -> „tuse la sugar sau copil mic cu respirație rapidă, sufocare/tuse „lătrătoare” cu stridor, pierdere în greutate. Durerea toracică in…” — crup/dispnee copil
- **astm** [semnale alarmă]: „Nu folosi acupresura în timpul unei crize.” -> „Nu folosi acupresura în timpul unei crize. Mergi la medic dacă ai nevoie de inhalator de salvare mai des decât de obicei sau te tr…” — control insuficient
- **insomnie** [puncte]: „EX,” -> „EX-Anmian,” — cod inexistent „EX” -> EX-Anmian (există în pts_existing.txt)
- **insomnie** [protocol]: „EX-HN3 și EX,” -> „EX-HN3 și EX-Anmian (în spatele urechii),” — cod invalid
- **insomnie** [dovezi]: „m: Pentru insomnie, acupunctura are dovezi de nivel redus până la moderat privind calitatea somnului; pentru acupresură studii mic…” -> „l: Pentru insomnie, sintezele existente arată dovezi de certitudine scăzută privind calitatea somnului după acupunctură, cu risc m…” — ev m->l
- **somn-intrerupt** [puncte]: „HT7,PC6,EX,KI1” -> „HT7,PC6,EX-Anmian,KI1” — cod inexistent
- **stres-anxietate** [semnale alarmă]: „gânduri de a-ți face rău (apelează 112 sau o linie de criză).” -> „gânduri de a-ți face rău sau de suicid (sună imediat 112; nu rămâne singur/ă și vorbește cu cineva de încredere). Oprește tehnica …” — ideație suicidară: formulare mai fermă
- **dispozitie-scazuta** [semnale alarmă]: „Caută ajutor urgent (112 sau linie de criză) dacă ai gânduri de suicid sau de a-ți face rău.” -> „Dacă ai gânduri de suicid, de a-ți face rău sau un plan, sună imediat 112 și nu rămâne singur/ă; spune unei persoane de încredere.…” — ideație suicidară, postpartum, bipolar
- **dispozitie-scazuta** [dovezi]: „w: Acupunctura are dovezi limitate pentru depresie; acupresura singură nu are dovezi solide.” -> „w: Pentru depresie, dovezile pentru acupunctură sunt de calitate scăzută și inconsistente; pentru acupresura singură nu există dov…”
- **dismenoree** [dovezi]: „m: Pentru dismenoreea primară, acupresura la SP6 și acupunctura au dovezi de nivel moderat din meta-analize (calitate variabilă) p…” -> „l: Pentru dismenoreea primară, sintezele Cochrane (Smith et al., 2011 și 2016) arată dovezi de certitudine scăzută că acupunctura …” — ev m->l (Cochrane: calitate scăzută)
- **dismenoree** [semnale alarmă]: „amețeală sau leșin.” -> „amețeală sau leșin. Durerea care se agravează progresiv, durerea la contact sexual sau dificultatea de a rămâne însărcinată pot se…” — endometrioză, ectopică
- **menopauza** [dovezi]: „l: Pentru bufeuri,” -> „l: Pentru bufeuri (certitudine scăzută),”
- **greata-sarcina** [dovezi]: „m: Pentru greața din sarcină, revizuirile Cochrane arată dovezi de nivel redus până la moderat că stimularea PC6 poate ajuta unele…” -> „l: Pentru greața din sarcină, revizuirea Cochrane (Matthews et al., 2015) arată dovezi de calitate scăzută și inconsistente pentru…” — ev m->l; Cochrane 2015 Matthews
- **greata-sarcina** [semnale alarmă]: „Mergi la medic dacă: vărsături repetate” -> „Urgență: durere abdominală intensă sau unilaterală, sângerare vaginală, leșin (posibilă sarcină ectopică), cefalee severă cu tulbu…” — ectopică/semne alarmă sarcină
- **cefalee-tensiune** [semnale alarmă]: „Mergi la medic dacă cefaleea este nouă după 50 de ani,” -> „Urgență și în cazul cefaleei declanșate de tuse/efort/act sexual, cu erupție cutanată cu pete care nu dispar la apăsare, cu ochi r…” — semnale cefalee secundară
- **migrena** [semnale alarmă]: „Mergi la medic dacă tiparul migrenei se schimbă sau apare după 50 de ani.” -> „Mergi la medic dacă tiparul migrenei se schimbă sau apare după 50 de ani. Aura cu contraceptive hormonale, sarcina sau durerea de …” — aură+contraceptive, arterită
- **migrena** [dovezi]: „comparabile în unele studii cu medicația preventivă; pentru acupresură” -> „cel puțin similare în unele studii cu medicația preventivă, dar cu dovezi de calitate mică; pentru acupresură” — nuanțare Cochrane Linde 2016
- **ameteala** [semnale alarmă]: „dificultăți de mers brusc instalate.” -> „dificultăți de mers brusc instalate, vertij intens cu vărsături și imposibilitate de a sta în picioare, vedere dublă. Amețeala cu …” — vertij central; hemoragie
- **oboseala-oculara** [protocol]: „nu masa dacă porți lentile sau ai o infecție oculară.” -> „nu masa dacă porți lentile, ai o infecție oculară, glaucom, o operație oculară recentă sau miopie forte cu risc de dezlipire de re…” — presiune pe orbită: glaucom/retină
- **tinitus** [semnale alarmă]: „tinitus unilateral nou.” -> „tinitus unilateral nou. Gânduri de a-ți face rău din cauza țiuitului: sună 112.” — tinitus sever și suicid
- **imunitate** [dovezi]: „unele studii despre moxibustie sau tai-chi sunt promițătoare dar insuficiente.” -> „nu există dovezi concludente pentru moxibustie sau alte metode similare.” — afirmație „promițătoare” fără temei
- **cistita-recurenta** [semnale alarmă]: „Infecția urinară netratată se poate extinde la rinichi.” -> „Infecția urinară netratată se poate extinde la rinichi; la diabetici, imunodeprimați și vârstnici consultul nu se amână.”
- **vezica-hiperactiva** [dovezi]: „m: Pentru vezica hiperactivă, stimularea tibială (TENS/acupunctură) are dovezi de nivel moderat pentru reducerea urgențelor; pentr…” -> „l: Stimularea percutană a nervului tibial posterior (PTNS), o procedură medicală cu dispozitiv, are dovezi de nivel moderat pentru…” — ev m->l: PTNS ≠ acupresură; badge „moderat” inducea în eroare
- **colici-sugar** [auto-îngrijire]: „înfășat,” -> „înfășat lejer doar pe spate și doar până când sugarul începe să se întoarcă (nu la somn după aceea),” — siguranța somnului
- **colici-sugar** [semnale alarmă]: „Mergi urgent la medic/112 dacă sugarul are: febră (peste 38 °C sub 3 luni),” -> „Nu scutura niciodată sugarul, nici în momentele de epuizare: pune-l în siguranță în pătuț și respiră. Mergi urgent la medic/112 da…” — scuturare/sindromul sugarului scuturat; prag febră
- **colici-sugar** [dovezi]: „Masajul blând poate liniști, dar nu este un tratament dovedit.” -> „O sinteză a studiilor cu acupunctură pentru colici arată rezultate inconsistente. Masajul blând poate liniști, dar nu este un trat…”
- **dentitie** [auto-îngrijire]: „evitarea gelurilor cu benzocaină,” -> „evitarea gelurilor cu benzocaină și a colierelor/brățărilor de dentiție din chihlimbar sau silicon purtate pe corp (risc de sufoca…” — avertisment FDA 2018 (din memorie, neverificat în sesiune)
- **dentitie** [semnale alarmă]: „febră peste 38 °C,” -> „febră de 38 °C sau mai mult,”
- **dureri-crestere** [auto-îngrijire]: „paracetamol/ibuprofen doar la recomandarea medicului.” -> „paracetamol/ibuprofen doar la recomandarea medicului; nu da aspirină copiilor.” — sindrom Reye
- **enurezis** [semnale alarmă]: „sau persistă peste 7 ani.” -> „sau persistă peste 7 ani, ori afectează copilul emoțional (rușine, izolare).”
- **menstruatie-neregulata** [variante]: „acupresura,moxa-s,tdp” -> „acupresura” — variantă nepotrivită (căldură/moxa cu febră, infecție sau posibilă sarcină; răzuire pe piele inflamată)
- **cistita-recurenta** [variante]: „acupresura,moxa-s,tdp,compresa” -> „acupresura,tdp,compresa” — variantă nepotrivită (căldură/moxa cu febră, infecție sau posibilă sarcină; răzuire pe piele inflamată)
- **raceala** [variante]: „acupresura,moxa-s,gua,compresa,tdp” -> „acupresura,gua,compresa,tdp” — variantă nepotrivită (căldură/moxa cu febră, infecție sau posibilă sarcină; răzuire pe piele inflamată)
- **sinuzita** [variante]: „acupresura,compresa,gua,tdp,moxa-s” -> „acupresura,compresa,gua,tdp” — variantă nepotrivită (căldură/moxa cu febră, infecție sau posibilă sarcină; răzuire pe piele inflamată)
- **acnee** [variante]: „acupresura,aur,gua,acufacial” -> „acupresura,aur,acufacial” — variantă nepotrivită (căldură/moxa cu febră, infecție sau posibilă sarcină; răzuire pe piele inflamată)
- **diaree** [variante]: „acupresura,moxa-s,compresa,tdp” -> „acupresura,compresa,tdp” — variantă nepotrivită (căldură/moxa cu febră, infecție sau posibilă sarcină; răzuire pe piele inflamată)
- **cervicalgie** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **fibromialgie** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **atm** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **greata** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **diaree** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV6 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **sughit** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **raceala** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **stres-anxietate** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **trac-examen** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **burnout** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **dismenoree** [auto-îngrijire]: „(adaos)” -> „În sarcină omite SP6, CV4 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **spm** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV6 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **menopauza** [auto-îngrijire]: „(adaos)” -> „În sarcină omite SP6.” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **menopauza** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **ameteala** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **rau-de-miscare** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **oboseala-zilnica** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV6 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **imunitate** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV6 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **convalescenta** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV6 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **convalescenta** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **hiperhidroza** [semnale alarmă]: „(adaos)” -> „Durerea toracică intensă sau cu transpirații, lipsă de aer ori iradiere în braț/maxilar este urgență: sună 112.” — durere toracică menționată slab („mergi la medic”)
- **cistita-recurenta** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV4 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **vezica-hiperactiva** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV4 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)
- **nicturie** [auto-îngrijire]: „(adaos)” -> „În sarcină omite CV4 (abdomen inferior).” — avertisment sarcină lipsă (regex-ul aplicației prinde doar „Contraindicat/Evită în sarcină”, nu „Evitat”)

## Surse (verificate în sesiune)

- Cochrane, Mu et al. 2020, acupunctura în lombalgia cronică nespecifică (rezumat IWH, https://iwh.on.ca/node/3526): față de simulare, durere imediat – certitudine scăzută, sub pragul clinic; față de lipsa tratamentului – certitudine moderată.
- NICE NG59 (lombalgie/sciatică) și NICE NG226 (artroză, 2022): acupunctura nu este recomandată (confirmat doar prin titluri/comentarii din rezultatele căutării, nu prin textul ghidului).

## Din cunoștințe proprii, NEverificate în sesiune (de confirmat)

- Cochrane Lee et al. 2015 (PC6, greață postoperatorie): efect modest vs simulare, fără adaos peste antiemetice. Pagina PubMed nu s-a putut citi.
- Cochrane Matthews 2015 (greața în sarcină), Deare 2013 (fibromialgie), Smith 2011/2016 (dismenoree), Feng 2015 (rinită alergică), Linde 2016 (migrenă/cefalee de tensiune), Manheimer 2010 (artroză de genunchi): formulările de „calitate scăzută/moderată” sunt din memorie.
- Allen et al., JAMA Netw Open 2022: nu am putut identifica articolul cu căutarea; nu este citat în fișier. Neverificat.
- Avertisment FDA 2018 privind colierele de dentiție; ACP 2016/AASM (CBT-I primă linie); ACP 2017 (lombalgie).

## Probleme structurale rămase (în afara fișierului permis)

- 21_conditions.js: regex-ul `CPREG` prinde doar „Contraindicat în sarcină|Evită în sarcină|Doar sub îndrumare”; nu prinde „Evitat în sarcină” (CV3–CV7, EX-CA1, EX-B5), „Evitați în sarcină” (BL31–34) sau „Prudență în sarcină” (KI11–15). Am compensat în textul auto-îngrijirii, dar regex-ul ar trebui extins (`Evita|Prudență` ).
- Fișa nu avertizează la nivel de punct pentru anticoagulante/tulburări de coagulare, osteoporoză sau presiune orbitală; am adăugat doar în texte unde era relevant.
- Variantele cu ace (acu-cl, dry) apar fără avertisment de personal calificat în carduri; filtrul „Fără ace” există.
- Punctele traditional contraindicate în sarcină (BL67, SP6, LI4, GB21, BL60) nu apar în nicio fișă în afara celor tratate; CV12/PC6/EX-HN3 considerate acceptabile pentru greața din sarcină (de confirmat clinic).
- Pragurile numerice (febră ≥38 °C la sub 3 luni, miere >1 an, diaree >2 zile) sunt cele uzuale, neverificate cu sursă în sesiune.
- Neverificate: traducerile semnificațiilor, localizările punctelor (auditate separat în audit_points_*).
