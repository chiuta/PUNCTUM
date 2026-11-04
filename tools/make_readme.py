#!/usr/bin/env python3
# Generează LICENSE și README.<lang>.md (+ README.md = en). Rulează: python3 tools/make_readme.py <versiune> <data>
import sys
ver=sys.argv[1] if len(sys.argv)>1 else '2.0'; date=sys.argv[2] if len(sys.argv)>2 else '2026-11-04'
open('LICENSE','w').write('''MIT License

Copyright (c) 2026 Alexandru-Ionuț Chiuță (Alexio)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
''')
L={
'ro':dict(name='Română',tag='atlas al terapiilor prin puncte: acupunctură, presopunctură/acupresură, moxă, ventuze, auriculoterapie, reflexologie și altele',
 ver='Versiune',upd='Ultima actualizare',
 what='PUNCTUM este o aplicație **într-un singur fișier HTML**, care funcționează **offline**, fără cont, fără urmărire și fără servere. Deschide `punctum.html` în orice browser.',
 feat_h='Ce conține',
 feat=['**410 puncte** pe 14 meridiane și puncte extra, cu localizare, acțiuni, avertismente, semnificația numelui și o stare de verificare (OMS / ≥2 surse / neverificat)','**60 de variante** (acupunctură, acupresură, moxă, ventuze, gua sha, laser, TENS, auriculoterapie, reflexologie, shiatsu, tuina, practici controversate), cu pași, durată, siguranță și nivel onest al dovezilor','**Hărți SVG interactive** (corp, mână, picior, ureche) cu filtru pe meridian și căutare după cod','**Index de afecțiuni** (60) cu semnale de alarmă, puncte și variante; **rutine personale** (creare, sesiune ghidată, tipărire, export/import)','**Curs** în 6 niveluri / 24 de lecții, **quiz** cu 200+ întrebări, **flashcarduri** cu repetiție eșalonată (Leitner), glosar, ghid de măsurare (cun)','**8 limbi**: ro, en, fr, it, es, pt, de, hu · temă luminoasă/întunecată · tastatură și cititor de ecran · tipărire · **PWA** instalabilă'],
 ev_h='Despre dovezi și siguranță',
 ev='Aplicația este **educațională** și nu înlocuiește diagnosticul sau tratamentul medical. Nivelul dovezilor este afișat onest (de la „moderate” la „fără dovezi”); controversatele sunt marcate ca atare. Localizările punctelor urmează standardul OMS 2008 (WPRO), dar textul OMS integral nu a putut fi consultat pentru toate meridianele; starea fiecărui punct este vizibilă în aplicație, iar pagina **Referințe** o rezumă. Vezi `research/` pentru auditul complet și afirmațiile rămase neconfirmate.',
 use_h='Utilizare',use='Deschide `dist/punctum.html` (sau `dist/pwa/` servit prin HTTPS pentru instalare ca aplicație). Progresul (curs, flashcarduri, rutine) se salvează local în browser.',
 dev_h='Dezvoltare',dev='Sursa este modulară în `src/`; `python3 build.py` asamblează fișierul unic. Teste: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html` (vizualizări, integritate date, limbi, monkey test), `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versiune>`.',
 lic_h='Licență și sprijin',lic='Licență MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Dacă îți place, poți susține proiectul: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).'),
'en':dict(name='English',tag='atlas of point-based therapies: acupuncture, acupressure, moxibustion, cupping, auricular therapy, reflexology and more',
 ver='Version',upd='Last updated',
 what='PUNCTUM is a **single-file HTML app** that works **offline** — no account, no tracking, no servers. Open `punctum.html` in any browser.',
 feat_h='What it contains',
 feat=['**410 points** on 14 meridians plus extra points, with location, actions, cautions, name meaning and a verification status (WHO text / ≥2 sources / unverified)','**60 variants** (acupuncture, acupressure, moxibustion, cupping, gua sha, laser, TENS, auricular, reflexology, shiatsu, tuina, controversial practices) with steps, duration, safety and an honest evidence level','**Interactive SVG maps** (body, hand, foot, ear) with meridian filter and code search','**Conditions index** (60) with red flags, points and variants; **personal routines** (build, guided session, print, export/import)','**Course** with 6 levels / 24 lessons, **quiz** with 200+ questions, **spaced-repetition flashcards** (Leitner), glossary, measuring guide (cun)','**8 languages**: ro, en, fr, it, es, pt, de, hu · light/dark theme · keyboard and screen-reader support · print · installable **PWA**'],
 ev_h='Evidence and safety',
 ev='This app is **educational** and does not replace medical diagnosis or treatment. Evidence levels are shown honestly (from “moderate” to “no evidence”); controversial practices are labelled as such. Point locations follow the 2008 WHO WPRO standard, but the full WHO text could not be consulted for every meridian; each point’s status is shown in the app and summarised on the **References** page. See `research/` for the full audit and the claims that remain unconfirmed.',
 use_h='Usage',use='Open `dist/punctum.html` (or serve `dist/pwa/` over HTTPS to install it as an app). Progress (course, flashcards, routines) is saved locally in your browser.',
 dev_h='Development',dev='Modular source in `src/`; `python3 build.py` assembles the single file. Tests: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html` (views, data integrity, languages, monkey test), `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <version>`.',
 lic_h='License and support',lic='MIT License · © 2026 Alexandru-Ionuț Chiuță (Alexio). If you like it, you can support the project: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).'),
'fr':dict(name='Français',tag="atlas des thérapies par points : acupuncture, acupression, moxibustion, ventouses, auriculothérapie, réflexologie et plus",
 ver='Version',upd='Dernière mise à jour',
 what="PUNCTUM est une application **HTML en un seul fichier**, qui fonctionne **hors ligne** — sans compte, sans suivi, sans serveur. Ouvrez `punctum.html` dans n'importe quel navigateur.",
 feat_h='Contenu',
 feat=["**410 points** sur 14 méridiens et points extra, avec localisation, actions, précautions, sens du nom et statut de vérification (texte OMS / ≥ 2 sources / non vérifié)","**60 variantes** (acupuncture, acupression, moxibustion, ventouses, gua sha, laser, TENS, auriculothérapie, réflexologie, shiatsu, tuina, pratiques controversées) avec étapes, durée, sécurité et niveau de preuve honnête","**Cartes SVG interactives** (corps, main, pied, oreille) avec filtre par méridien et recherche par code","**Index de 60 affections** avec signaux d'alerte, points et variantes ; **routines personnelles** (création, séance guidée, impression, export/import)","**Cours** en 6 niveaux / 24 leçons, **quiz** de plus de 200 questions, **cartes mémoire** à répétition espacée (Leitner), glossaire, guide de mesure (cun)","**8 langues** : ro, en, fr, it, es, pt, de, hu · thème clair/sombre · clavier et lecteur d'écran · impression · **PWA** installable"],
 ev_h='Preuves et sécurité',
 ev="L'application est **éducative** et ne remplace ni diagnostic ni traitement médical. Les niveaux de preuve sont affichés honnêtement (de « modérés » à « aucune preuve ») ; les pratiques controversées sont signalées comme telles. Les localisations suivent la norme OMS WPRO 2008, mais le texte complet de l'OMS n'a pas pu être consulté pour tous les méridiens ; le statut de chaque point est visible dans l'application et résumé dans la page **Références**. Voir `research/` pour l'audit complet et les affirmations non confirmées.",
 use_h='Utilisation',use="Ouvrez `dist/punctum.html` (ou servez `dist/pwa/` en HTTPS pour l'installer comme application). La progression (cours, cartes, routines) est enregistrée localement dans le navigateur.",
 dev_h='Développement',dev="Source modulaire dans `src/` ; `python3 build.py` assemble le fichier unique. Tests : `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA : `node tools/make_pwa.js <version>`.",
 lic_h='Licence et soutien',lic="Licence MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Pour soutenir le projet : [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings)."),
'it':dict(name='Italiano',tag="atlante delle terapie a punti: agopuntura, agopressione, moxibustione, coppettazione, auricoloterapia, riflessologia e altro",
 ver='Versione',upd='Ultimo aggiornamento',
 what="PUNCTUM è un'app **HTML in un unico file** che funziona **offline** — senza account, senza tracciamento, senza server. Apri `punctum.html` in qualsiasi browser.",
 feat_h='Contenuti',
 feat=["**410 punti** su 14 meridiani più punti extra, con localizzazione, azioni, avvertenze, significato del nome e stato di verifica (testo OMS / ≥ 2 fonti / non verificato)","**60 varianti** (agopuntura, agopressione, moxibustione, coppettazione, gua sha, laser, TENS, auricoloterapia, riflessologia, shiatsu, tuina, pratiche controverse) con passaggi, durata, sicurezza e livello di evidenza onesto","**Mappe SVG interattive** (corpo, mano, piede, orecchio) con filtro per meridiano e ricerca per codice","**Indice di 60 disturbi** con segnali d'allarme, punti e varianti; **routine personali** (creazione, sessione guidata, stampa, esporta/importa)","**Corso** in 6 livelli / 24 lezioni, **quiz** con oltre 200 domande, **flashcard** a ripetizione dilazionata (Leitner), glossario, guida alle misure (cun)","**8 lingue**: ro, en, fr, it, es, pt, de, hu · tema chiaro/scuro · tastiera e screen reader · stampa · **PWA** installabile"],
 ev_h='Evidenze e sicurezza',
 ev="L'app è **educativa** e non sostituisce diagnosi o trattamento medico. I livelli di evidenza sono mostrati con onestà (da «moderati» a «nessuna evidenza»); le pratiche controverse sono indicate come tali. Le localizzazioni seguono lo standard OMS WPRO 2008, ma il testo OMS completo non è stato consultabile per tutti i meridiani; lo stato di ogni punto è visibile nell'app e riassunto nella pagina **Riferimenti**. Vedi `research/` per l'audit completo e le affermazioni non confermate.",
 use_h='Uso',use="Apri `dist/punctum.html` (oppure servi `dist/pwa/` via HTTPS per installarla come app). I progressi (corso, flashcard, routine) sono salvati localmente nel browser.",
 dev_h='Sviluppo',dev="Sorgente modulare in `src/`; `python3 build.py` assembla il file unico. Test: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versione>`.",
 lic_h='Licenza e sostegno',lic="Licenza MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Per sostenere il progetto: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings)."),
'es':dict(name='Español',tag="atlas de terapias por puntos: acupuntura, acupresión, moxibustión, ventosas, auriculoterapia, reflexología y más",
 ver='Versión',upd='Última actualización',
 what="PUNCTUM es una aplicación **HTML de un solo archivo** que funciona **sin conexión** — sin cuenta, sin rastreo, sin servidores. Abre `punctum.html` en cualquier navegador.",
 feat_h='Qué contiene',
 feat=["**410 puntos** en 14 meridianos más puntos extra, con localización, acciones, precauciones, significado del nombre y estado de verificación (texto OMS / ≥ 2 fuentes / sin verificar)","**60 variantes** (acupuntura, acupresión, moxibustión, ventosas, gua sha, láser, TENS, auriculoterapia, reflexología, shiatsu, tuina, prácticas controvertidas) con pasos, duración, seguridad y un nivel de evidencia honesto","**Mapas SVG interactivos** (cuerpo, mano, pie, oreja) con filtro por meridiano y búsqueda por código","**Índice de 60 afecciones** con señales de alarma, puntos y variantes; **rutinas personales** (crear, sesión guiada, imprimir, exportar/importar)","**Curso** de 6 niveles / 24 lecciones, **quiz** de más de 200 preguntas, **tarjetas** con repetición espaciada (Leitner), glosario, guía de medidas (cun)","**8 idiomas**: ro, en, fr, it, es, pt, de, hu · tema claro/oscuro · teclado y lector de pantalla · impresión · **PWA** instalable"],
 ev_h='Evidencia y seguridad',
 ev="La aplicación es **educativa** y no sustituye el diagnóstico ni el tratamiento médico. Los niveles de evidencia se muestran con honestidad (de «moderada» a «sin evidencia»); las prácticas controvertidas se señalan como tales. Las localizaciones siguen el estándar OMS WPRO 2008, pero no se pudo consultar el texto completo de la OMS para todos los meridianos; el estado de cada punto es visible en la app y se resume en la página **Referencias**. Consulta `research/` para la auditoría completa y las afirmaciones no confirmadas.",
 use_h='Uso',use="Abre `dist/punctum.html` (o sirve `dist/pwa/` por HTTPS para instalarla como app). El progreso (curso, tarjetas, rutinas) se guarda localmente en el navegador.",
 dev_h='Desarrollo',dev="Código modular en `src/`; `python3 build.py` ensambla el archivo único. Pruebas: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versión>`.",
 lic_h='Licencia y apoyo',lic="Licencia MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Para apoyar el proyecto: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings)."),
'pt':dict(name='Português',tag="atlas das terapias por pontos: acupuntura, acupressão, moxabustão, ventosas, auriculoterapia, reflexologia e mais",
 ver='Versão',upd='Última atualização',
 what="O PUNCTUM é uma aplicação **HTML de ficheiro único** que funciona **offline** — sem conta, sem rastreio, sem servidores. Abra `punctum.html` em qualquer navegador.",
 feat_h='O que contém',
 feat=["**410 pontos** em 14 meridianos mais pontos extra, com localização, ações, precauções, significado do nome e estado de verificação (texto OMS / ≥ 2 fontes / por verificar)","**60 variantes** (acupuntura, acupressão, moxabustão, ventosas, gua sha, laser, TENS, auriculoterapia, reflexologia, shiatsu, tuina, práticas controversas) com passos, duração, segurança e um nível de evidência honesto","**Mapas SVG interativos** (corpo, mão, pé, orelha) com filtro por meridiano e pesquisa por código","**Índice de 60 afeções** com sinais de alarme, pontos e variantes; **rotinas pessoais** (criar, sessão guiada, imprimir, exportar/importar)","**Curso** de 6 níveis / 24 lições, **quiz** com mais de 200 perguntas, **flashcards** com repetição espaçada (Leitner), glossário, guia de medidas (cun)","**8 idiomas**: ro, en, fr, it, es, pt, de, hu · tema claro/escuro · teclado e leitor de ecrã · impressão · **PWA** instalável"],
 ev_h='Evidência e segurança',
 ev="A aplicação é **educativa** e não substitui o diagnóstico nem o tratamento médico. Os níveis de evidência são apresentados com honestidade (de «moderada» a «sem evidência»); as práticas controversas são assinaladas como tal. As localizações seguem a norma OMS WPRO 2008, mas o texto completo da OMS não pôde ser consultado para todos os meridianos; o estado de cada ponto é visível na app e resumido na página **Referências**. Consulte `research/` para a auditoria completa e as afirmações por confirmar.",
 use_h='Utilização',use="Abra `dist/punctum.html` (ou sirva `dist/pwa/` por HTTPS para a instalar como app). O progresso (curso, flashcards, rotinas) é guardado localmente no navegador.",
 dev_h='Desenvolvimento',dev="Código modular em `src/`; `python3 build.py` monta o ficheiro único. Testes: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <versão>`.",
 lic_h='Licença e apoio',lic="Licença MIT · © 2026 Alexandru-Ionuț Chiuță (Alexio). Para apoiar o projeto: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings)."),
'de':dict(name='Deutsch',tag="Atlas punktbasierter Therapien: Akupunktur, Akupressur, Moxibustion, Schröpfen, Ohrakupunktur, Reflexzonentherapie und mehr",
 ver='Version',upd='Zuletzt aktualisiert',
 what="PUNCTUM ist eine **Ein-Datei-HTML-App**, die **offline** funktioniert — ohne Konto, ohne Tracking, ohne Server. Öffnen Sie `punctum.html` in einem beliebigen Browser.",
 feat_h='Inhalt',
 feat=["**410 Punkte** auf 14 Meridianen plus Extrapunkte, mit Lokalisation, Wirkungen, Vorsichtshinweisen, Namensbedeutung und Prüfstatus (WHO-Text / ≥ 2 Quellen / ungeprüft)","**60 Varianten** (Akupunktur, Akupressur, Moxibustion, Schröpfen, Gua Sha, Laser, TENS, Ohrakupunktur, Reflexzonen, Shiatsu, Tuina, umstrittene Verfahren) mit Schritten, Dauer, Sicherheit und ehrlicher Evidenzstufe","**Interaktive SVG-Karten** (Körper, Hand, Fuß, Ohr) mit Meridianfilter und Codesuche","**Beschwerdenindex** (60) mit Warnzeichen, Punkten und Varianten; **persönliche Routinen** (erstellen, geführte Sitzung, drucken, Export/Import)","**Kurs** mit 6 Stufen / 24 Lektionen, **Quiz** mit über 200 Fragen, **Karteikarten** mit verteilter Wiederholung (Leitner), Glossar, Maßanleitung (Cun)","**8 Sprachen**: ro, en, fr, it, es, pt, de, hu · helles/dunkles Design · Tastatur und Screenreader · Druck · installierbare **PWA**"],
 ev_h='Evidenz und Sicherheit',
 ev="Die App ist **lehrend** und ersetzt keine ärztliche Diagnose oder Behandlung. Evidenzstufen werden ehrlich angezeigt (von „moderat“ bis „keine Evidenz“); umstrittene Verfahren sind als solche gekennzeichnet. Die Lokalisationen folgen dem WHO-WPRO-Standard von 2008, der vollständige WHO-Text war jedoch nicht für alle Meridiane einsehbar; der Status jedes Punktes ist in der App sichtbar und auf der Seite **Quellen** zusammengefasst. Details zum Audit und zu unbestätigten Aussagen in `research/`.",
 use_h='Nutzung',use="Öffnen Sie `dist/punctum.html` (oder stellen Sie `dist/pwa/` per HTTPS bereit, um sie als App zu installieren). Fortschritte (Kurs, Karteikarten, Routinen) werden lokal im Browser gespeichert.",
 dev_h='Entwicklung',dev="Modularer Quellcode in `src/`; `python3 build.py` erzeugt die Einzeldatei. Tests: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <Version>`.",
 lic_h='Lizenz und Unterstützung',lic="MIT-Lizenz · © 2026 Alexandru-Ionuț Chiuță (Alexio). Zur Unterstützung des Projekts: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings)."),
'hu':dict(name='Magyar',tag="pontalapú terápiák atlasza: akupunktúra, akupresszúra, moxa, köpölyözés, fülakupunktúra, reflexológia és más",
 ver='Verzió',upd='Utolsó frissítés',
 what="A PUNCTUM egy **egyetlen HTML-fájlból álló alkalmazás**, amely **offline** működik — fiók, nyomkövetés és szerver nélkül. Nyisd meg a `punctum.html` fájlt bármely böngészőben.",
 feat_h='Tartalom',
 feat=["**410 pont** 14 meridiánon és extra pontok, elhelyezkedéssel, hatásokkal, figyelmeztetésekkel, a név jelentésével és ellenőrzési állapottal (WHO-szöveg / ≥ 2 forrás / ellenőrizetlen)","**60 változat** (akupunktúra, akupresszúra, moxa, köpölyözés, gua sha, lézer, TENS, fülakupunktúra, reflexológia, shiatsu, tuina, vitatott gyakorlatok) lépésekkel, időtartammal, biztonsággal és őszinte bizonyítékszinttel","**Interaktív SVG-térképek** (test, kéz, láb, fül) meridiánszűrővel és kódkereséssel","**60 panaszt tartalmazó index** vészjelekkel, pontokkal és változatokkal; **személyes rutinok** (készítés, vezetett gyakorlás, nyomtatás, export/import)","**Tanfolyam** 6 szinten / 24 leckével, **kvíz** 200+ kérdéssel, **szókártyák** elosztott ismétléssel (Leitner), szószedet, mérési útmutató (cun)","**8 nyelv**: ro, en, fr, it, es, pt, de, hu · világos/sötét téma · billentyűzet és képernyőolvasó · nyomtatás · telepíthető **PWA**"],
 ev_h='Bizonyítékok és biztonság',
 ev="Az alkalmazás **oktatási célú**, nem helyettesíti az orvosi diagnózist vagy kezelést. A bizonyítékszintek őszintén jelennek meg („mérsékelt”-től a „nincs bizonyíték”-ig); a vitatott gyakorlatok megjelölve szerepelnek. A pontok helye a 2008-as WHO WPRO szabványt követi, de a teljes WHO-szöveg nem minden meridiánnál volt elérhető; minden pont állapota látható az appban, és a **Források** oldal összegzi. A teljes auditot és a meg nem erősített állításokat lásd a `research/` mappában.",
 use_h='Használat',use="Nyisd meg a `dist/punctum.html` fájlt (vagy szolgáltasd a `dist/pwa/` mappát HTTPS-en az alkalmazásként való telepítéshez). A haladás (tanfolyam, szókártyák, rutinok) helyben, a böngészőben mentődik.",
 dev_h='Fejlesztés',dev="Moduláris forrás a `src/` mappában; a `python3 build.py` állítja össze az egyetlen fájlt. Tesztek: `NODE_PATH=/opt/npm-tools/node_modules node tests/run.js dist/punctum.html`, `tests/a11y.js`, `tests/i18n_cov.js`. PWA: `node tools/make_pwa.js <verzió>`.",
 lic_h='Licenc és támogatás',lic="MIT licenc · © 2026 Alexandru-Ionuț Chiuță (Alexio). A projekt támogatásához: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings)."),
}
order=['ro','en','fr','it','es','pt','de','hu']
nav=' · '.join(f'[{L[k]["name"]}](README.{k}.md)' for k in order)
for k in order:
    d=L[k]
    t=f"# PUNCTUM\n\n_{d['tag']}_\n\n**{d['ver']} {ver} · {d['upd']}: {date}**\n\n{nav}\n\n{d['what']}\n\n## {d['feat_h']}\n\n"+'\n'.join('- '+x for x in d['feat'])+f"\n\n## {d['ev_h']}\n\n{d['ev']}\n\n## {d['use_h']}\n\n{d['use']}\n\n## {d['dev_h']}\n\n{d['dev']}\n\n## {d['lic_h']}\n\n{d['lic']}\n"
    open(f'README.{k}.md','w').write(t)
    if k=='en':open('README.md','w').write(t)
print('README x8 + LICENSE')
