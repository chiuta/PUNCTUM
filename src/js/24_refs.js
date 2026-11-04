/* ================= Referințe și stare verificare ================= */
const REFS=[
{g:'Standard și puncte',i:[
 ['WHO WPRO, <i>WHO Standard Acupuncture Point Locations in the Western Pacific Region</i>, 2008 (ISBN 978-92-9061-383-1)','https://medbox.org/document/who-standard-acupuncture-point-locations-in-the-western-pacific-region','Standardul de nomenclatură și localizare. Textul primar a fost consultat doar parțial (copie MEDBOX până la BL44); textul nu e copiat, ci reformulat.'],
 ['Koo S-T et al., Korean J Acupunct 27(2):1–11, 2010 (contextul standardizării)','https://www.koreascience.or.kr/article/JAKO201025665646098.page','']]},
{g:'Dovezi clinice',i:[
 ['Allen J et al., JAMA Netw Open 2022 — hartă a dovezilor, 434 sinteze','https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798899','Certitudine moderată/înaltă pentru unele afecțiuni; dovezi rare de superioritate față de alte terapii active.'],
 ['Ho L et al., BMC Complement Med Ther 2025 — ghiduri pentru durerea musculoscheletală','https://link.springer.com/article/10.1186/s12906-025-05070-y','Ghidurile se contrazic privind utilizarea de rutină.'],
 ['Vickers AJ et al., J Pain 2018 — meta-analiză pe date individuale (PMC5927830)','https://pmc.ncbi.nlm.nih.gov/articles/PMC5927830/','Efect mic față de sham; cifrele de verificat în text.'],
 ['ACP — Qaseem A et al., Ann Intern Med 2017 (lombalgie)','https://www.aafp.org/pubs/afp/issues/2017/0915/p407.html','Include acupunctura; dovezi de calitate scăzută.'],
 ['NICE NG59 — lombalgie și sciatică (recomandarea 1.2.8)','https://www.nice.org.uk/guidance/ng59/chapter/Recommendation','Contrar ACP: exemplu de dezacord între ghiduri.'],
 ['Cochrane — Lee A et al., PC6 pentru greață postoperatorie, CD003281.pub4','https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD003281.pub4/information','Calitate scăzută vs. sham; moderată: fără diferență față de antiemetice.'],
 ['Xiao C et al., Support Care Cancer 2023;31:510 — acupresiune PC6 în chimioterapie','https://link.springer.com/content/pdf/10.1007/s00520-023-07976-0.pdf','']]},
{g:'OMS, reglementare',i:[
 ['OMS, <i>Benchmarks for the training of acupuncture</i>, 2021 (CC BY-NC-SA 3.0 IGO)','https://www.who.int/publications/i/item/9789240017962',''],
 ['OMS, <i>Global traditional medicine strategy 2025–2034</i>','https://www.who.int/publications/i/item/9789240113176','Cadru general; nu o recomandare specifică acupuncturii.'],
 ['Legea nr. 118/2007 (practici de medicină complementară) — România','https://legislatie.just.ro','Statutul juridic: verificați textul în vigoare; normele de aplicare au fost întârziate.']]}
];
const REFUI={ro:{t:'Referințe și verificare',intro:'Sursele pe care se sprijină aplicația și starea verificării datelor. Aplicația este educațională și nu înlocuiește îngrijirea medicală.',ver:'Starea verificării punctelor',v:'Verificat în textul OMS (localizare)',s:'Confirmat de ≥2 surse secundare',n:'Neverificat / surse divergente',total:'Total puncte',note:'„Verificat" se referă la localizare; etichetele, semnificațiile numelor și avertismentele provin din surse secundare. Semnificațiile sunt traduceri aproximative.',lim:'Limite recunoscute',lims:['PDF-ul OMS complet nu a putut fi descărcat; BL45–67, KI, PC, TE, GB, LR, CV, GV și punctele extra au fost verificate pe surse secundare.','Multe afirmații despre dovezi provin din sinteze, nu din citirea integrală a studiilor.','Punctele incerte sunt marcate „neverificat” în fișa fiecărui punct.','Auditul variantelor listează afirmațiile rămase neconfirmate (research/audit_variante_*.md).']},
en:{t:'References & verification',intro:'The sources behind the app and the verification status of its data. Educational only; not a substitute for medical care.',ver:'Point verification status',v:'Verified in WHO text (location)',s:'Confirmed by ≥2 secondary sources',n:'Unverified / sources disagree',total:'Total points',note:'“Verified” refers to location; tags, name meanings and warnings come from secondary sources. Name meanings are approximate translations.',lim:'Known limitations',lims:['The full WHO PDF could not be downloaded; BL45–67, KI, PC, TE, GB, LR, CV, GV and extra points were checked against secondary sources.','Many evidence statements come from syntheses, not full reading of trials.','Uncertain points are marked “unverified” on each point card.','The variants audit lists claims that remain unconfirmed (research/audit_variante_*.md).']}};
const rfu=k=>(REFUI[S.lang]||REFUI.ro)[k]||REFUI.ro[k];
function vRefs(){
  const c={v:0,s:0,n:0};PT.forEach(p=>{if(p.vf==='v')c.v++;else if(p.vf==='s')c.s++;else c.n++});
  return `<h1>${esc(rfu('t'))}</h1>${disc()}<p>${esc(rfu('intro'))}</p>
  <h2>${esc(rfu('ver'))}</h2><div class="tw"><table><tr><td>${esc(rfu('v'))}</td><td><b>${c.v}</b></td></tr><tr><td>${esc(rfu('s'))}</td><td><b>${c.s}</b></td></tr><tr><td>${esc(rfu('n'))}</td><td><b>${c.n}</b></td></tr><tr><td>${esc(rfu('total'))}</td><td><b>${PT.length}</b></td></tr></table></div>
  <p class="mut">${esc(rfu('note'))}</p>
  ${REFS.map(g=>`<h2>${esc(g.g)}</h2><ul>${g.i.map(r=>`<li style="overflow-wrap:anywhere">${r[0]} — <a href="${r[1]}" target="_blank" rel="noopener noreferrer">${esc(r[1].replace(/^https?:\/\//,'').slice(0,60))}</a>${r[2]?`<br><span class="mut">${esc(r[2])}</span>`:''}</li>`).join('')}</ul>`).join('')}
  <h2>${esc(rfu('lim'))}</h2><ul>${rfu('lims').map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
}
regView('refs',vRefs,{ro:'Referințe',en:'References',fr:'Références',it:'Riferimenti',es:'Referencias',pt:'Referências',de:'Quellen',hu:'Források'},{after:'gloss'});
