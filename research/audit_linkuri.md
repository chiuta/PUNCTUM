# Audit linkuri externe: REFS (src/js/24_refs.js)

Data: 2026-11-04. Metoda: WebFetch pe fiecare URL, cu prompt despre titlul paginii și potrivirea cu intrarea. Niciun fișier al proiectului nu a fost modificat.

Rezumat: 8 OK, 2 PARȚIAL, 2 BLOCATE/NEVERIFICATE (din 12).

| URL | Status | Titlu real | Potrivire | Observații |
|---|---|---|---|---|
| https://medbox.org/document/who-standard-acupuncture-point-locations-in-the-western-pacific-region | se deschide (copie terță, nu site-ul OMS) | "WHO standard acupuncture point locations in the Western Pacific region" | PARȚIAL | Titlul și ISBN-ul (din URL: 9789290613831) corespund. Pagina indică anul 2009, iar REFS scrie 2008. Este o copie MEDBOX, nu sursa OMS. De verificat anul în documentul original. |
| https://www.koreascience.or.kr/article/JAKO201025665646098.page | se deschide | "Understanding of the WHO Standard Acupuncture Point Locations in the Western Pacific Region : General Guidelines" | DA | Koo, Sung-Tae et al., Korean J Acupunct 27(2):1–11, 2010. Corespunde. |
| https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798899 | se deschide | "Use of Acupuncture for Adult Health Conditions, 2013 to 2021: A Systematic Review" | DA | Allen J et al., JNO 2022 (5(11):e2243665). Pagina spune că 434 de sinteze au fost identificate, 82 incluse în hartă. Afirmația din notă nu a fost verificată în text. |
| https://link.springer.com/article/10.1186/s12906-025-05070-y | BLOCAT (eroare client la fetch, pagina nu s-a deschis) | necunoscut | NEVERIFICAT | O căutare a indicat un articol similar, pe PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC12403485 ("Systematic review of clinical practice guidelines on acupuncture for chronic musculoskeletal pain"). Fetch-ul PMC a fost oprit de reCAPTCHA. Nu se poate confirma că este același articol (Ho L et al., BMC CMT 2025). De verificat manual DOI-ul 10.1186/s12906-025-05070-y și afirmația "ghidurile se contrazic". |
| https://pmc.ncbi.nlm.nih.gov/articles/PMC5927830/ | se deschide | "Acupuncture for chronic pain: update of an individual patient data meta-analysis" | DA | Vickers AJ, J Pain. Anul 2018 este al numărului; publicarea online a fost pe 2 dec. 2017. Cifrele "efect mic față de sham" nu au fost verificate în text. |
| https://www.aafp.org/pubs/afp/issues/2017/0915/p407.html | se deschide (rezumat AFP, nu articolul original) | "Low Back Pain: American College of Physicians Practice Guideline on Noninvasive Treatments" | PARȚIAL | Ghidul ACP este în Ann Intern Med 2017;166(7):514–530. Pagina este un rezumat AFP (Lisa Hauk, 15 sept. 2017) și nu menționează autorul Qaseem A. Sugestie: înlocuiți cu DOI-ul articolului original (10.7326/M16-2367, de verificat), iar AFP poate rămâne ca sursă secundară. |
| https://www.nice.org.uk/guidance/ng59/chapter/Recommendation | se deschide | (fără titlu explicit; secțiunea "Recommendations" din NG59) | DA | Recomandarea 1.2.8: "Do not offer acupuncture for managing low back pain with or without sciatica." Corespunde cu nota "contrar ACP". |
| https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003281.pub4/information | se deschide (pagina este în portugheză) | "Estimulação do ponto de acupuntura PC6 no punho para a prevenção de náusea e vômitos pós-operatórios" (versiunea portugheză a Cochrane) | DA | Lee A, Chan SKC, Fan LTY; DOI corect. Pentru versiunea în engleză, folosiți https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003281.pub4/full sau https://doi.org/10.1002/14651858.CD003281.pub4. Concluziile din notă (calitate scăzută vs. sham; fără diferență față de antiemetice) nu au fost verificate. |
| https://link.springer.com/content/pdf/10.1007/s00520-023-07976-0.pdf | se deschide | "Effects of PC6 acupressure on acute and delayed nausea and vomiting induced by chemotherapy in patients with malignant neoplasm: a meta-analysis" | DA | Xiao C et al., Support Care Cancer 2023, vol. 31, art. 510. Este o meta-analiză (10 RCT, 975 de pacienți). Intrarea nu are notă; ar putea fi precizat "meta-analiză". |
| https://www.who.int/publications/i/item/9789240017962 | se deschide | "WHO benchmarks for the training of acupuncture" | DA | Publicat la 11 iunie 2021, CC BY-NC-SA 3.0 IGO. |
| https://www.who.int/publications/i/item/9789240113176 | se deschide | "Global traditional medicine strategy 2025-2034" | DA | Publicat la 30 oct. 2025, adoptat la a 78-a Adunare Mondială a Sănătății. |
| https://legislatie.just.ro | BLOCAT (domeniul nu este pe allowlist-ul sesiunii, nu s-a deschis) | necunoscut | NEVERIFICAT | Nu s-a putut confirma textul Legii 118/2007. O căutare a dat o copie a legii pe hosptm.ro (.doc, "LEGE nr. 118 din 2 mai 2007"), care este terță parte. Sugestie: înlocuiți URL-ul generic cu pagina oficială a actului (legislatie.just.ro, căutare "118/2007"), din care se copiază ID-ul actului, sau cu Monitorul Oficial. Verificați versiunea în vigoare. |

## Modificări recomandate în REFS (nu au fost aplicate)

1. Medbox: de confirmat anul (2008 sau 2009) în documentul original.
2. Springer (Ho L et al. 2025): de verificat DOI-ul manual; altfel de înlocuit cu articolul corect.
3. AAFP: de adăugat DOI-ul original al ghidului ACP (Ann Intern Med 2017), de verificat înainte de înlocuire.
4. Cochrane: de folosit versiunea în engleză a paginii sau DOI-ul.
5. legislatie.just.ro: de înlocuit cu pagina oficială a Legii 118/2007.
