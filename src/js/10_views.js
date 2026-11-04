/* ================= VIEWS ================= */
function vHome(){
  const now=new Date();const h=now.getHours();const idx=Math.floor((((h-3)+24)%24)/2);const cur=CLOCKO[idx];
  const cm=MER.find(x=>x.c===cur);
  const tiles=[['acu','✋','Presopunctură','15 protocoale de auto-îngrijire și sesiuni ghidate cu cronometru.'],
   ['cond','🩺','Afecțiuni & rutine','Rutine de presopunctură pentru 60 de afecțiuni comune, cu semne de alarmă.'],
   ['pts','•','Puncte','Peste 400 de puncte, filtrabile după meridian și regiune, cu favorite.'],
   ['cun','📏','Măsurare (cun)','Cum găsești punctele, cu calculator personalizat.'],
   ['safe','🛡','Siguranță & dovezi','Contraindicații, riscuri și ce spun studiile.'],
   ['theory','☯','Teorie','Qi, Yin-Yang, cinci elemente, Zang-Fu, tipuri de puncte, ipoteze moderne.'],
   ['mer','〰','Meridiane','12 meridiane principale + Ren Mai și Du Mai, cu traseu și puncte-cheie.'],
   ['ear','👂','Ureche & tălpi','Auriculoterapie și reflexologie.'],
   ['tech','⚘','Variante','Presopunctură și metode blânde, plus ace, moxă și ventuze prezentate doar informativ.'],
   ['quiz','?','Quiz','Verifică-ți cunoștințele cu întrebări generate aleatoriu.']];
  return `<div class="hero"><h1>PUNCTUM</h1>
   <p>Atlas educativ offline de presopunctură (acupresură) și terapii prin puncte: puncte, rutine de auto-îngrijire cu presiune blândă, sesiuni ghidate cu cronometru, dovezi și siguranță. Metodele cu ace, moxă, ventuze sau sânge sunt descrise doar informativ, pentru că se fac numai de practicieni calificați.</p><p style="font-size:.9rem;opacity:.9"><b>PUNCTUM</b> (lat. „punct”): numele reunește toate variantele, care au în comun punctul ca unitate de lucru, indiferent dacă îl înțepi, îl apeși, îl încălzești, îl aspiri, îl stimulezi cu lumină sau îl atingi.</p>
   <p style="font-size:.9rem;opacity:.85">Un singur fișier HTML · fără internet · fără urmărire · licență MIT</p></div>
   ${disc()}
   <h2>Ceasul meridianelor (acum)</h2>
   <div class="clock">${CLOCKO.map((c,i)=>{const m=MER.find(x=>x.c===c);return `<span class="${c===cur?'now':''}">${m.t} · ${esc(m.n.split(' ')[0])}</span>`}).join('')}</div>
   <p class="mut">Conform orarului tradițional (ora locală a dispozitivului), perioada maximă este a meridianului <b>${esc(cm.n)}</b> (${cm.t}). Este un cadru tradițional; ritmurile biologice măsurate nu confirmă acest orar.</p>
   <h2>Începe de aici</h2>
   <div class="grid">${tiles.map(t=>`<a class="card" href="#${t[0]}" style="text-decoration:none;color:inherit"><div style="font-size:1.6rem">${t[1]}</div><h3>${t[2]}</h3><span class="mut">${t[3]}</span></a>`).join('')}</div>
   <h2>Ce este presopunctura?</h2>
   <div class="card"><p>Presopunctura (acupresura) stimulează aceleași puncte ca acupunctura, dar prin presiune cu degetul, fără ace și fără a străpunge pielea. Se aplică 30–60 de secunde, cu presiune fermă dar suportabilă, respirând lent. Este cea mai sigură cale de a învăța despre puncte, dar are reguli: unele puncte se evită în sarcină și există situații în care trebuie să mergi la medic.</p>
   <p>Cercetarea modernă arată că stimularea acestor puncte poate modula durerea prin mecanisme nervoase și neurochimice (ex. endorfine, adenozină, poarta de control a durerii), dar nu a demonstrat structuri anatomice ale „meridianelor". Studiile sunt amestecate: unele beneficii sunt reale, altele sunt în mare parte efecte nespecifice (așteptare, atingere, relaxare). Citește secțiunea <a href="#safe">Siguranță & dovezi</a>.</p></div>
   <h2>Despre acupunctură (doar informativ)</h2>
   <div class="card"><p>Acupunctura este un sistem de medicină tradițională chineză (MTC) în care sunt stimulate puncte specifice de pe corp, în mod clasic cu ace fine. Tradiția descrie un flux de <b>Qi</b> prin <b>meridiane</b>, iar tratamentul urmărește restabilirea echilibrului dintre Yin și Yang. Din ea au derivat sau s-au dezvoltat paralel presopunctura (acupresura), moxibustia, ventuzele, gua sha, tuina, shiatsu, auriculoterapia și reflexologia.</p></div>
   <p class="mut" style="margin-top:1rem">${esc(T().note)}</p>`;
}

function vTheory(){
  const el=EL[selEl.i];
  return `<h1>Teorie</h1>${disc()}
  <h2>Concepte fundamentale</h2>
  <details open><summary>Qi, Yin și Yang</summary><p><b>Qi</b> — energie vitală, funcție dinamică. <b>Yin</b> și <b>Yang</b> sunt doi poli complementari, nu opuși absoluți: noapte/zi, rece/cald, repaus/activitate, interior/exterior. Boala este văzută ca dezechilibru: exces, deficit, stagnare sau blocaj.</p></details>
  <details><summary>Cele trei comori: Jing, Qi, Shen</summary><p><b>Jing</b> (esență), <b>Qi</b> (energie) și <b>Shen</b> (spirit) sunt cele trei niveluri ale vitalității: Jing este rezerva profundă, Qi este energia funcțională, Shen este claritatea conștiinței.</p></details>
  <details><summary>Substanțele fundamentale</summary><ul><li><b>Qi</b> — motricitate, căldură, protecție</li><li><b>Xue</b> (sânge) — hrănire, ancorare</li><li><b>Jin Ye</b> — fluidele corporale, umezire</li><li><b>Jing</b> — esență, dezvoltare</li><li><b>Shen</b> — conștiință</li></ul></details>
  <details><summary>Organele Zang-Fu</summary><p>În MTC organele sunt <i>sisteme funcționale</i>, nu doar structuri anatomice. <b>Zang</b> (yin, pline): Inimă, Plămân, Splină, Ficat, Rinichi (+ Pericard). <b>Fu</b> (yang, goale): Intestin subțire, Intestin gros, Stomac, Vezică biliară, Vezică urinară, Triplu încălzitor. Fiecare Zang e cuplat cu un Fu din același element.</p></details>
  <details><summary>Cauzele bolii în MTC</summary><ul><li><b>Externe:</b> vânt, frig, căldură de vară, umezeală, uscăciune, foc</li><li><b>Interne:</b> cele șapte emoții (bucurie, furie, tristețe, grijă, gândire excesivă, frică, șoc)</li><li><b>Alte cauze:</b> alimentație, surmenaj, lipsa mișcării, traumatisme, constituție</li></ul></details>
  <details><summary>Cele patru metode de diagnostic</summary><ul><li><b>Observație</b> — înfățișare, culoare, limbă</li><li><b>Auscultare/olfacție</b> — voce, respirație, mirosuri</li><li><b>Interogare</b> — simptome, somn, digestie, frig/căldură, durere</li><li><b>Palpare</b> — pulsul radial (în mai multe poziții), abdomen, puncte dureroase</li></ul></details>
  <details><summary>Cele opt principii (Ba Gang)</summary><p>Yin/Yang · Exterior/Interior · Rece/Cald · Gol (deficit) / Plin (exces).</p></details>

  <h2>Cele cinci elemente (Wu Xing)</h2>
  <div class="card">
   <p class="mut">Apasă un element. Săgețile continue verzi = generare (Sheng); liniile roșii punctate = control (Ke).</p>
   <svg viewBox="0 0 320 300" width="100%" style="max-width:380px;display:block;margin:auto" role="img" aria-label="Cinci elemente">
    <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#2e8b57"/></marker><marker id="ak" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c0392b"/></marker></defs>
    ${elSvg()}
   </svg>
   <h3 style="color:${el.c}">${el.n} (${el.zh})</h3>
   <p class="mut">${el.txt}</p>
   <div class="tw"><table><tr><th>Organe</th><td>${el.org}</td></tr><tr><th>Anotimp</th><td>${el.sez}</td></tr><tr><th>Climat</th><td>${el.cl}</td></tr><tr><th>Emoție</th><td>${el.em}</td></tr><tr><th>Culoare</th><td>${el.col}</td></tr><tr><th>Gust</th><td>${el.gust}</td></tr><tr><th>Țesut</th><td>${el.tes}</td></tr><tr><th>Organ de simț</th><td>${el.sim}</td></tr>
   <tr><th>Generează</th><td>${EL[(selEl.i+1)%5].n}</td></tr><tr><th>Controlează</th><td>${EL[(selEl.i+2)%5].n}</td></tr><tr><th>Este generat de</th><td>${EL[(selEl.i+4)%5].n}</td></tr><tr><th>Este controlat de</th><td>${EL[(selEl.i+3)%5].n}</td></tr></table></div>
  </div>

  <h2>Tipuri speciale de puncte</h2>
  <div class="tw"><table><tr><th>Tip</th><th>Rol</th><th>Exemple</th></tr>
  <tr><td>Yuan (sursă)</td><td>Reglarea organului (tradițional)</td><td>${ptLink('LI4')}, ${ptLink('LR3')}, ${ptLink('HT7')}, ${ptLink('KI3')}, ${ptLink('LU9')}</td></tr>
  <tr><td>Luo (legătură)</td><td>Leagă meridianele cuplate</td><td>${ptLink('LU7')}, ${ptLink('ST40')}</td></tr>
  <tr><td>Xi (fisură)</td><td>Stări acute, durere</td><td>${ptLink('ST34')}, ${ptLink('SP8')}</td></tr>
  <tr><td>Mu (alarmă)</td><td>Diagnostic și tratament al organului</td><td>${ptLink('CV12')}, ${ptLink('LR14')}, ${ptLink('ST25')}, ${ptLink('LU1')}</td></tr>
  <tr><td>Shu dorsale</td><td>Reglarea organelor pe spate</td><td>${ptLink('BL13')}, ${ptLink('BL18')}, ${ptLink('BL20')}, ${ptLink('BL23')}</td></tr>
  <tr><td>Hui (influență)</td><td>Controlează țesuturi</td><td>${ptLink('LR13')}, ${ptLink('CV12')}, ${ptLink('CV17')}, ${ptLink('BL17')}, ${ptLink('GB34')}, ${ptLink('LU9')}, ${ptLink('GB39')}, ${ptLink('BL11')}</td></tr>
  <tr><td>Chei ale celor 8 vase</td><td>Deschid vasele extraordinare</td><td>LU7–Ren, SP4–Chong, PC6–Yin Wei, GB41–Dai, TE5–Yang Wei, SI3–Du, BL62–Yang Qiao, KI6–Yin Qiao</td></tr>
  <tr><td>Puncte de comandă</td><td>Zone ale corpului (tradițional)</td><td>${ptLink('LI4')} față, ${ptLink('LU7')} cap/ceafă, ${ptLink('BL40')} spate, ${ptLink('ST36')} abdomen; unele surse adaugă ${ptLink('PC6')} torace</td></tr></table></div>

  <h2>Ce spune știința modernă (ipoteze)</h2>
  <ul><li><b>Poarta de control a durerii:</b> stimularea fibrelor mari modulează semnalele dureroase la nivel medular.</li>
  <li><b>Sistemul opioid endogen:</b> eliberare de endorfine și alți neurotransmițători; efect parțial blocat de naloxonă în unele studii.</li>
  <li><b>Adenozină locală:</b> în studii pe animale, eliberarea locală de adenozină după acupunctură are efect analgezic.</li>
  <li><b>Țesut conjunctiv/fascie:</b> înțepatul și rotirea acului pot stimula fibroblaști și mecanoreceptori.</li>
  <li><b>Modulare autonomă (vagală):</b> unele efecte pe digestie și inflamație ar putea trece prin sistemul nervos autonom.</li>
  <li><b>Efecte contextuale:</b> așteptare, atenție, relația terapeutică, ritual: reale, dar nespecifice.</li></ul>`;
}
const selEl={i:0};
function elSvg(){
  const cx=160,cy=150,R=105;
  const pos=EL.map((e,i)=>{const a=(-90+i*72)*Math.PI/180;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]});
  const sh=(a,b,rr)=>{const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d;return[a[0]+ux*rr,a[1]+uy*rr,b[0]-ux*rr,b[1]-uy*rr]};
  let s='';
  for(let i=0;i<5;i++){const l=sh(pos[i],pos[(i+2)%5],27);s+=`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ak)"/>`}
  for(let i=0;i<5;i++){const l=sh(pos[i],pos[(i+1)%5],27);s+=`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="#2e8b57" stroke-width="2.5" marker-end="url(#ah)"/>`}
  for(let i=0;i<5;i++){const sel=i===selEl.i;s+=`<g class="elp" onclick="selectEl(${i})"><circle cx="${pos[i][0]}" cy="${pos[i][1]}" r="${sel?27:23}" fill="${EL[i].c}" stroke="${sel?'#fff':'none'}" stroke-width="3"/><text x="${pos[i][0]}" y="${pos[i][1]+4}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${EL[i].n}</text></g>`}
  return s;
}
function selectEl(i){selEl.i=i;render()}

function vMer(){
  return `<h1>Meridiane</h1>${disc()}
  <p class="mut">Cele 12 meridiane principale (Zheng Jing) sunt pereche yin–yang și au traseu bilateral. Cele două „vase" mediane (Ren și Du) completează sistemul major. Numărul de puncte pe meridian este conform nomenclaturii OMS.</p>
  <div class="tw"><table><tr><th>Meridian</th><th>Element</th><th>Yin/Yang</th><th>Puncte</th><th>Maxim</th><th>Sens</th></tr>
  ${MER.map(m=>`<tr><td><span class="badge" style="background:${MCOL[m.c]}">${m.c}</span>${esc(m.n)}</td><td>${m.el}</td><td>${m.yy}</td><td>${m.pts}</td><td>${m.t}</td><td>${esc(m.dir)}</td></tr>`).join('')}</table></div>
  <h2>Detalii pe meridian</h2>
  ${MER.map(m=>`<details><summary><span class="badge" style="background:${MCOL[m.c]}">${m.c}</span>${esc(m.n)} <span class="mut">(${esc(m.zh)})</span></summary>
    <p><b>Traseu:</b> ${esc(m.path)}</p>
    <p><b>Puncte-cheie:</b> ${linkify(m.key)}</p>
    <p><b>Utilizare tradițională:</b> ${esc(m.use)}</p>
    <p class="mut">Element: ${m.el} · ${m.yy} · ${esc(m.lim)} · ${m.pts} puncte${m.t!=='—'?` · maxim ${m.t}`:''}</p>
    <p><a href="#pts" onclick="PF.m='${m.c}';PF.q='';PF.r='';PF.fav=false;go('pts')">Vezi toate punctele din listă →</a></p></details>`).join('')}
  <h2>Circulația în ciclul de 24 de ore</h2>
  <p>LU → LI → ST → SP → HT → SI → BL → KI → PC → TE → GB → LR → LU. Fiecare meridian este considerat mai activ într-un interval de 2 ore (vezi Acasă).</p>
  <h2>Cuplări yin–yang</h2>
  <ul><li>Plămân ↔ Intestin gros (Metal)</li><li>Splină ↔ Stomac (Pământ)</li><li>Inimă ↔ Intestin subțire (Foc)</li><li>Rinichi ↔ Vezică urinară (Apă)</li><li>Pericard ↔ Triplu încălzitor (Foc ministerial)</li><li>Ficat ↔ Vezică biliară (Lemn)</li></ul>`;
}

function filterPts(){
  const q=PF.q.trim().toLowerCase();
  return PT.filter(p=>(!PF.m||p.m===PF.m)&&(!PF.r||p.r===PF.r)&&(!PF.fav||S.fav.includes(p.c+'|'+p.p))&&(!q||(p.c+' '+p.p+' '+p.l+' '+p.u+' '+p.tg+' '+p.mn+' '+(MER.find(x=>x.c===p.m)||{n:''}).n).toLowerCase().includes(q)));
}
function renderPtsList(){const L=filterPts();$('#plist').innerHTML=L.length?L.map(ptCard).join(''):`<p class="mut">${esc(T().noRes)}</p>`;$('#pcount').textContent=L.length+' / '+PT.length}
function vPts(){
  return `<h1>Puncte</h1>${disc()}
  <div class="card"><p><b>Presopunctură:</b> apasă cu pulpa degetului, ferm dar fără durere ascuțită, 30–60 de secunde, respirând lent. Dacă apar durere intensă, amorțeală sau amețeală, oprește-te. Avertismentele despre „înțepare" privesc doar practicanții de acupunctură.</p></div>
  <div class="bar"><input id="pq" placeholder="Filtrează (cod, nume, simptom)…" value="${esc(PF.q)}" oninput="PF.q=this.value;renderPtsList()">
   <select id="pm" onchange="PF.m=this.value;renderPtsList()"><option value="">Toate meridianele</option>${MER.map(m=>`<option value="${m.c}" ${PF.m===m.c?'selected':''}>${m.c} — ${esc(m.n)}</option>`).join('')}<option value="EX" ${PF.m==='EX'?'selected':''}>EX — Puncte extra</option></select>
   <select id="pr" onchange="PF.r=this.value;renderPtsList()"><option value="">Toate zonele</option>${Object.keys(REG).map(k=>`<option value="${k}" ${PF.r===k?'selected':''}>${REG[k]}</option>`).join('')}</select>
   <button class="b alt" onclick="PF.fav=!PF.fav;this.style.outline=PF.fav?'2px solid var(--gold)':'none';renderPtsList()" style="${PF.fav?'outline:2px solid var(--gold)':''}">★ Favorite</button>
   <span class="mut" id="pcount" style="align-self:center"></span></div>
  <div class="grid" id="plist"></div>
  <p class="mut">Descrierile urmează convențiile standard OMS; locațiile exacte variază individual. Indicațiile sunt cele tradiționale, nu promisiuni terapeutice. Marcajul ⚠ indică precauții.</p>`;
}

/* --- sesiune presopunctură --- */
const SES={on:false,pts:[],i:0,sec:60,left:60,paused:false,timer:null,beep:true,title:''};
let AC=null;
function beep(f){if(!SES.beep)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f||660;g.gain.value=.08;o.connect(g);g.connect(AC.destination);o.start();setTimeout(()=>o.stop(),180)}catch(e){}}
function startSes(i){
  const pr=PROT[i];SES.title=pr.t;SES.pts=pr.p.map(c=>PT.find(x=>x.c===c)).filter(Boolean);SES.i=0;SES.left=SES.sec;SES.on=true;SES.paused=false;
  clearInterval(SES.timer);SES.timer=setInterval(tick,1000);beep(880);drawSes();
}
function tick(){
  if(SES.paused)return;SES.left--;
  if(SES.left<=0){beep(660);if(SES.i<SES.pts.length-1){SES.i++;SES.left=SES.sec}else{endSes(true);return}}
  drawSes();
}
function endSes(done){clearInterval(SES.timer);SES.on=false;if(done){$('#modal').innerHTML=`<div class="modal"><div class="box"><h2>✔ Sesiune încheiată</h2><p>Stai încă 1–2 minute, respiră lent. Bea apă dacă dorești.</p><button class="b" onclick="$('#modal').innerHTML=''">OK</button></div></div>`;beep(990)}else $('#modal').innerHTML=''}
function sesNext(d){SES.i=Math.max(0,Math.min(SES.pts.length-1,SES.i+d));SES.left=SES.sec;drawSes()}
function sesPause(){SES.paused=!SES.paused;drawSes()}
function sesTime(v){SES.sec=+v;SES.left=SES.sec;drawSes()}
function drawSes(){
  if(!SES.on)return;const p=SES.pts[SES.i];
  $('#modal').innerHTML=`<div class="modal"><div class="box">
   <p class="mut">${esc(SES.title)} · ${SES.i+1}/${SES.pts.length}</p>
   <h2 style="margin:.2rem 0"><span class="badge" style="background:${MCOL[p.m]}">${esc(p.c)}</span>${esc(p.p)}</h2>
   <p style="margin:.3rem 0"><b>Localizare:</b> ${esc(p.l)}</p>
   ${p.w?`<p class="w pw" role="note">${esc(p.w)}</p>`:''}
   <div class="breath">${SES.left}</div>
   <p class="mut">Presiune fermă dar confortabilă · inspiră 4 s · expiră 6 s · ambele părți unde e cazul</p>
   <div class="bar" style="justify-content:center">
    <button class="b alt" onclick="sesNext(-1)" ${SES.i===0?'disabled':''}>◀</button>
    <button class="b" onclick="sesPause()">${SES.paused?'▶':'❚❚'}</button>
    <button class="b alt" onclick="sesNext(1)" ${SES.i===SES.pts.length-1?'disabled':''}>▶</button>
    <button class="b alt" onclick="endSes(false)">✕</button></div>
   <div class="bar" style="justify-content:center"><select onchange="sesTime(this.value)">${[30,45,60,90,120].map(s=>`<option value="${s}" ${SES.sec===s?'selected':''}>${s} s / punct</option>`).join('')}</select>
   <label class="mut" style="align-self:center"><input type="checkbox" ${SES.beep?'checked':''} onchange="SES.beep=this.checked"> sunet</label></div>
  </div></div>`;
}

function vAcu(){
  return `<h1>Presopunctură (acupresură)</h1>${disc()}
  <p>Acupresura folosește presiunea manuală pe aceleași puncte ca acupunctura, fără ace. Este cea mai accesibilă formă de auto-îngrijire, cu risc scăzut când se respectă regulile de mai jos.</p>
  <h2>Tehnica de bază</h2>
  <ul><li>Mâinile curate, unghiile scurte; poziție stabilă, relaxată (șezând sau întins).</li>
  <li>Găsește punctul (vezi <a href="#cun">Măsurare</a>); caută o mică sensibilitate sau „adâncitură".</li>
  <li>Folosește pulpa degetului mare sau a arătătorului; crește presiunea treptat, 3–5 s.</li>
  <li>Menține <b>30–90 s</b> cu presiune fixă sau mici cercuri; respirație lentă și adâncă.</li>
  <li>Intensitate: o senzație de presiune fermă, plictisitoare sau caldă, niciodată ascuțită sau care radiază cu furnicături; orientativ 4–6 din 10.</li>
  <li>De 1–3 ori pe zi; punctele pereche (stânga–dreapta) se fac pe ambele părți.</li>
  <li>După sesiune: bea apă, odihnește-te câteva minute.</li></ul>
  <div class="warn"><b>Oprește sesiunea</b> dacă apar: durere ascuțită, amețeală puternică, amorțeală persistentă, palpitații sau stare de leșin. Evită presiunea pe răni, vene varicoase severe, tromboză venoasă, umflături, tumori, zone fracturate sau operate recent, febră mare și imediat după mese copioase. La anticoagulante, osteoporoză severă, epilepsie, cancer sau boli cardiace grave, și la copii mici, cere întâi sfatul medicului. În sarcină evită punctele marcate ⚠ și zonele abdominală și lombo-sacrată, și cere avizul medicului.</div>
  <h2>Protocoale pe situații (auto-îngrijire)</h2>
  <div class="bar"><label class="mut">Durată/punct: <select onchange="SES.sec=+this.value">${[30,45,60,90,120].map(s=>`<option value="${s}" ${SES.sec===s?'selected':''}>${s} s</option>`).join('')}</select></label><label class="mut"><input type="checkbox" ${SES.beep?'checked':''} onchange="SES.beep=this.checked"> sunet</label></div>
  ${PROT.map((p,i)=>{
    const pts=p.p.map(c=>PT.find(x=>x.c===c)).filter(Boolean);const preg=pts.filter(isPregPt).map(x=>x.c);
    return `<details><summary>${esc(p.t)}</summary>
     <p>${pts.map(x=>`<span class="tag" title="${esc(x.l)}">${ptLink(x.c)} ${esc(x.p)}</span>`).join('')}</p>
     <p>${esc(p.n)}</p>
     ${preg.length?`<p class="w" style="color:var(--acc2)">⚠ În sarcină evită: ${preg.join(', ')}.</p>`:''}
     <button class="b" onclick="startSes(${i})">▶ Pornește sesiunea ghidată</button> <p></p></details>`}).join('')}
  <h2>Autostimulare cu obiecte</h2>
  <ul><li><b>Minge de tenis / lacrosse</b> lângă coloană, pe perete sau pe podea — pentru spate și fese (BL, GB30).</li>
  <li><b>Pieptene sau perie</b> pentru stimularea ușoară a scalpului (GV20, EX-HN1).</li>
  <li><b>Brățări de acupresură</b> (PC6) — pentru greață/rău de mișcare; dovezi limitate (calitate scăzută până la moderată, mai ales postoperator).</li>
  <li><b>Rola cu spini</b> doar peste haine sau piele sănătoasă, fără presiune excesivă.</li></ul>
  <h2>Când nu te trata singur</h2>
  <ul><li>Durere toracică, dificultăți de respirație, durere abdominală intensă, febră mare.</li>
  <li>Slăbiciune bruscă a unui membru, tulburări de vorbire sau vedere, durere de cap „cea mai gravă din viață".</li>
  <li>Pierdere neexplicată în greutate, sângerări anormale, simptome care se agravează sau durează săptămâni.</li>
  <li>Sarcină, afecțiuni cronice grave, tratament anticoagulant sau chimioterapie: întreabă medicul înainte.</li></ul>`;
}

const TF={scope:'soft',q:'',cat:'',noNeedle:false,self:false,ev:false,view:'cards',sort:'cat',open:''};
function varFilter(){
  const q=TF.q.trim().toLowerCase();
  let L=VAR.filter(v=>(TF.scope==='all'||v.soft||TF.open===v.id)&&(!TF.cat||v.cat===TF.cat)&&(!TF.noNeedle||v.inv<2)&&(!TF.self||v.auto!=='n')&&(!TF.ev||v.ev==='m')&&(!q||(v.n+' '+v.pr+' '+v.or+' '+v.zon+' '+v.ind+' '+v.id+' '+CATN[v.cat]).toLowerCase().includes(q)));
  const order=Object.keys(CATN);
  if(TF.sort==='cat')L=L.slice().sort((a,b)=>order.indexOf(a.cat)-order.indexOf(b.cat));
  else if(TF.sort==='name')L=L.slice().sort((a,b)=>cmp(a.n,b.n));
  else if(TF.sort==='risk')L=L.slice().sort((a,b)=>a.risc-b.risc||cmp(a.n,b.n));
  else if(TF.sort==='ev'){const o='mlwx';L=L.slice().sort((a,b)=>o.indexOf(a.ev)-o.indexOf(b.ev)||cmp(a.n,b.n))}
  return L;
}
function vBadges(v){
  return `<span class="badge" style="background:${CATC[v.cat]}">${esc(CATN[v.cat].split(' (')[0])}</span>`+
  `<span class="badge" style="background:${v.inv===2?'#b5573a':v.inv===1?'#c99a2e':'#2f7d6d'}">${INVN[v.inv]}</span>`+
  `<span class="badge" style="background:${v.risc===3?'#b5573a':v.risc===2?'#c99a2e':'#2f7d6d'}">${RISKN[v.risc]}</span>`+
  `<span class="badge" style="background:${EVC[v.ev]}">${EVN[v.ev]}</span>`+
  `<span class="badge" style="background:#566">${AUTN[v.auto]}</span>`;
}
function vCard(v,open){
  return `<details id="v-${esc(v.id)}" ${open?'open':''}><summary>${esc(v.n)}</summary>
   ${v.soft?'':(v.inv>=2||v.risc>=3?'<div class="warn" role="note">⛔ Doar informativ. Se face numai de practicant calificat, cu material steril. Nu încerca acasă.</div>':'<div class="warn" role="note">⚠ Informativ. Se practică numai după instruire și cu respectarea contraindicațiilor din fișă.</div>')}
   <p>${vBadges(v)}</p>
   <p><b>Origine:</b> ${esc(v.or)}</p>
   <p><b>Principiu:</b> ${esc(v.pr)}</p>
   <h3>Cum se face, pas cu pas</h3><ol>${v.pas.map(p=>`<li>${esc(p)}</li>`).join('')}</ol>
   <div class="tw"><table>
    <tr><th>Instrumente / materiale</th><td>${esc(v.ins)}</td></tr>
    <tr><th>Durată și frecvență</th><td>${esc(v.dur)}</td></tr>
    <tr><th>Puncte / zone tipice</th><td>${linkify(v.zon)}</td></tr>
    <tr><th>Indicații tradiționale / uz</th><td>${esc(v.ind)}</td></tr>
    <tr><th>Ce spun dovezile</th><td>${esc(v.dov)}</td></tr>
    <tr><th>Siguranță</th><td style="color:var(--acc2)">${esc(v.sig)}</td></tr>
    <tr><th>Cine o practică</th><td>${esc(v.who)}</td></tr></table></div></details>`;
}
function renderVarList(){
  const L=varFilter();
  const box=$('#vlist');if(!box)return;
  $('#vcount').textContent=L.length+' / '+(TF.scope==='all'?VAR.length:VAR.filter(v=>v.soft).length);
  if(!L.length){box.innerHTML=`<p class="mut">${esc(T().noRes)}</p>`;return}
  if(TF.view==='table'){
    box.innerHTML=`<div class="tw"><table><tr><th>Variantă</th><th>Categorie</th><th>Invazivitate</th><th>Risc</th><th>Dovezi</th><th>Autoaplicare</th></tr>${L.map(v=>`<tr><td><a href="#tech" onclick="TF.view='cards';TF.q='${esc(v.n).replace(/'/g,'')}';TF.open='${esc(v.id)}';render();return false">${esc(v.n)}</a></td><td>${esc(CATN[v.cat].split(' (')[0])}</td><td>${INVN[v.inv]}</td><td>${RISKN[v.risc]}</td><td><span class="badge" style="background:${EVC[v.ev]}">${esc(EVN[v.ev].split(' (')[0])}</span></td><td>${AUTN[v.auto]}</td></tr>`).join('')}</table></div>`;
    return;
  }
  const order=Object.keys(CATN);let h='';
  if(TF.sort==='cat'){
    order.forEach(k=>{const g=L.filter(v=>v.cat===k);if(!g.length)return;h+=`<h2 class="cc" style="--cc:${CATC[k]}">${esc(CATN[k])} <span class="mut">(${g.length})</span></h2>`+g.map(v=>vCard(v,TF.open===v.id)).join('')});
  }else h=L.map(v=>vCard(v,TF.open===v.id)).join('');
  box.innerHTML=h;
  if(TF.open){const e=document.getElementById('v-'+TF.open);if(e)e.scrollIntoView({block:'start'});TF.open=''}
}
function vTech(){
  if(TF.open){const ov=VAR.find(x=>x.id===TF.open);if(ov&&!ov.soft)TF.scope='all'}
  const cnt={};VAR.filter(v=>TF.scope==='all'||v.soft).forEach(v=>cnt[v.cat]=(cnt[v.cat]||0)+1);
  return `<h1>Variante</h1>${disc()}
  <p>Implicit vezi presopunctura și metodele blânde, pe care le poți învăța și aplica acasă, cu respectarea regulilor de siguranță. Metodele cu ace, foc, vid sau sânge se văd doar dacă le ceri, sunt prezentate informativ și se fac numai de practicieni calificați.</p>
  <div class="bar"><button class="b ${TF.scope==='soft'?'':'alt'}" onclick="TF.scope='soft';TF.cat='';render()">Presopunctură și metode blânde</button><button class="b ${TF.scope==='all'?'':'alt'}" onclick="TF.scope='all';render()">Toate variantele (ace, foc, sânge — doar informativ)</button></div>
  <div class="bar"><input id="vq" placeholder="Caută o variantă, o zonă, un simptom…" value="${esc(TF.q)}" oninput="TF.q=this.value;renderVarList()">
   <select onchange="TF.sort=this.value;renderVarList()"><option value="cat" ${TF.sort==='cat'?'selected':''}>Grupat pe categorii</option><option value="name" ${TF.sort==='name'?'selected':''}>Alfabetic</option><option value="risk" ${TF.sort==='risk'?'selected':''}>Risc crescător</option><option value="ev" ${TF.sort==='ev'?'selected':''}>Dovezi (cele mai bune întâi)</option></select>
   <button class="b alt" onclick="TF.view=TF.view==='cards'?'table':'cards';render()">${TF.view==='cards'?'▦ Tabel comparativ':'☰ Fișe'}</button>
   <span class="mut" id="vcount" style="align-self:center"></span></div>
  <div class="bar" id="vchips">
   <button class="b ${!TF.cat?'':'alt'}" onclick="TF.cat='';render()">Toate</button>
   ${Object.keys(CATN).filter(k=>cnt[k]).map(k=>`<button class="b ${TF.cat===k?'':'alt'}" onclick="TF.cat='${k}';render()">${esc(CATN[k].split(' (')[0])} (${cnt[k]||0})</button>`).join('')}</div>
  <div class="bar">
   <label class="mut"><input type="checkbox" ${TF.noNeedle?'checked':''} onchange="TF.noNeedle=this.checked;renderVarList()"> Fără ace</label>
   <label class="mut"><input type="checkbox" ${TF.self?'checked':''} onchange="TF.self=this.checked;renderVarList()"> Pot face singur (parțial sau total)</label>
   <label class="mut"><input type="checkbox" ${TF.ev?'checked':''} onchange="TF.ev=this.checked;renderVarList()"> Doar dovezi moderate</label></div>
  <div id="vlist"></div>
  <h2>Cum alegi între variante</h2>
  <div class="tw"><table><tr><th>Dacă vrei…</th><th>Variante potrivite</th></tr>
   <tr><td>Auto-îngrijire acasă, fără ace</td><td>Acupresură, compresie pe puncte trigger, brățări P6, Do-In, minge/rolă, tapping, auto-masaj plantar/palmar</td></tr>
   <tr><td>Durere musculo-scheletică persistentă</td><td>Acupunctură clasică sau medicală, dry needling, electroacupunctură, tuina, shiatsu, laser, TENS</td></tr>
   <tr><td>Teamă de ace sau copii</td><td>Acupresură, laserpunctură, Shonishin, diapazon, tuina pediatrică, semințe auriculare</td></tr>
   <tr><td>Greață sau rău de mișcare</td><td>Acupresură/brățară PC6, acupunctură P6, TEAS</td></tr>
   <tr><td>Relaxare și stres</td><td>Shiatsu, Nuad Thai, reflexologie, acu-yoga, qigong, masaj facial</td></tr>
   <tr><td>Senzație de frig, articulații „reci”</td><td>Moxă (țigară, indirectă), compresă caldă, lampă infraroșu</td></tr>
   <tr><td>Tensiune musculară profundă</td><td>Ventuze, gua sha, tuina, trigger point, shiatsu</td></tr>
   <tr><td>Să ocolești</td><td>EAV/bioresonanță, kinesiologie aplicată, promisiuni de „diagnostic complet” prin aparat</td></tr></table></div>
  <div class="warn">Regula generală: cu cât o variantă este mai invazivă (ace, incizii, injecții, foc), cu atât ai nevoie de practicant calificat, material steril și informare asupra riscurilor. Nicio variantă nu înlocuiește diagnosticul medical.</div>`;
}

const AUR=[
 ['Shenmen','Vârful fosei triunghiulare, în treimea superioară','Calmare, durere, anxietate'],
 ['Punctul Zero','Rădăcina helixului, la intrarea în concha','Homeostazie, echilibrare'],
 ['Simpatic','La joncțiunea ramurii inferioare a antihelixului cu helixul','Durere viscerală, spasm'],
 ['Rinichi','În cymba conchae, sub ramura superioară a antihelixului','Oboseală, urechi, lombar'],
 ['Ficat','Cymba conchae, porțiunea postero-inferioară','Stres, ochi'],
 ['Stomac','În jurul terminației ramurii helixului','Digestie, greață'],
 ['Plămân','În cavum conchae, în jurul punctului Inimă','Tuse, piele, dependențe'],
 ['Inimă','În centrul cavum conchae','Anxietate, palpitații'],
 ['Apexul urechii','Vârful pavilionului, la îndoirea helixului','Febră, alergii, tensiune'],
 ['Zona coloanei','Pe antihelix: cervical aproape de lob, lombo-sacrat spre ramura superioară','Dureri de coloană'],
 ['Membrul inferior (genunchi, șold)','Ramura superioară a antihelixului','Durere articulară'],
 ['Lob (ochi, dinți, față)','Lobul urechii, pe diferite zone','Ochi, dinți, față']
];
const REF=[
 ['Degete de la picior','Cap, sinusuri'],['Baza degetelor','Ochi, urechi'],['Antepicior (pernuța)','Plămâni, torace, inimă'],
 ['Arcul (mijlocul tălpii)','Stomac, ficat (dreapta), splină (stânga), pancreas, rinichi'],['Călcâi','Pelvis, nerv sciatic'],
 ['Marginea internă a piciorului','Coloana vertebrală'],['Marginea externă','Umăr, braț, șold, genunchi']
];
function vEar(){
  return `<h1>Ureche & tălpi</h1>${disc()}
  <h2>Auriculoterapie</h2>
  <div class="card"><p>Urechea este văzută ca un <b>microsistem</b>: forma ei seamănă cu un făt inversat (cap la lob, picioare sus). Stimularea se face cu ace mici, semințe adezive (Vaccaria), magneți sau laser. Există diferențe între școli (Nogier vs. harta chineză); locațiile de mai jos sunt orientative.</p>
  <ul><li><b>Helix</b> — marginea exterioară; <b>Antihelix</b> — creasta paralelă interioară, cu două ramuri superioare.</li>
  <li><b>Concha</b> — cavitatea centrală (<i>cymba</i> sus, <i>cavum</i> jos), <b>Tragus</b> și <b>Antitragus</b> — proeminențe, <b>Lob</b> — partea moale.</li></ul></div>
  <div class="tw"><table><tr><th>Punct / zonă</th><th>Poziție</th><th>Folosit pentru</th></tr>${AUR.map(a=>`<tr><td>${esc(a[0])}</td><td>${esc(a[1])}</td><td>${esc(a[2])}</td></tr>`).join('')}</table></div>
  <div class="warn">Semințele se aplică pe piele curată, 3–5 zile; se apasă ușor 20–30 s de câteva ori pe zi. Se scot la apariția roșeții, durerii sau secreției.</div>
  <h2>Reflexologie plantară</h2>
  <div class="card"><p>Se presupune că talpa reflectă corpul (zone Fitzgerald). Nu există dovezi că presiunea pe talpă influențează organele; poate aduce relaxare și confort.</p></div>
  <div class="tw"><table><tr><th>Zonă</th><th>Corespondență pretinsă</th></tr>${REF.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table></div>
  <h3>Reflexologie palmară</h3><p>Aceeași schemă pe palmă: degetele pentru cap, mijlocul palmei pentru zona digestivă, baza palmei pentru pelvis. Tehnica: presiune moderată, 3–5 s pe zonă.</p>
  <h3>Mâini — puncte utile</h3><ul><li>${ptLink('LI4')} (între police și arătător)</li><li>${ptLink('PC8')} (palmă)</li><li>${ptLink('SI3')} (marginea ulnară)</li><li>${ptLink('LU9')}, ${ptLink('HT7')}, ${ptLink('PC6')} (încheietură)</li></ul>
  <h3>Tălpi — puncte utile</h3><ul><li>${ptLink('KI1')} (talpă)</li><li>${ptLink('LR3')}, ${ptLink('SP4')}, ${ptLink('GB41')}, ${ptLink('ST44')} (dosul piciorului)</li><li>${ptLink('KI3')}, ${ptLink('BL60')} (de o parte și de alta a tendonului lui Ahile)</li></ul>`;
}

function vCun(){
  const th=+(CUN.th)||20;
  const seg=[['Între mameloane',8],['Apendice xifoid – ombilic',8],['Ombilic – simfiza pubiană',5],['Linia anterioară a părului – linia posterioară',12],['Pliul axilar anterior – pliul cotului',9],['Pliul cotului – pliul încheieturii',12],['Trohanter mare – pliul poplitee',19],['Pliul poplitee – vârful maleolei laterale',16],['Marginea inferioară a condilului medial al tibiei – vârful maleolei mediale',13]];
  return `<h1>Măsurare (cun)</h1>${disc()}
  <p><b>Cun</b> este o unitate proporțională, adaptată fiecărei persoane. Ea nu se măsoară în centimetri universali, ci în raport cu propriul corp.</p>
  <h2>Metoda degetelor („cun-ul degetelor")</h2>
  <ul><li><b>1 cun</b> = lățimea policelui la nivelul articulației interfalangiene.</li><li><b>1,5 cun</b> = lățimea degetelor II + III (arătător + mijlociu) unite, la nivelul articulației dintre falange.</li><li><b>2 cun</b> = lățimea a trei degete (II–IV) la nivelul falangei mijlocii a degetului III.</li><li><b>3 cun</b> = lățimea a patru degete (II–V) la nivelul falangei mijlocii a degetului III.</li></ul>
  <div class="card"><h3>Calculator personalizat</h3>
   <label>Lățimea policelui tău (mm): <input id="thm2" type="number" min="10" max="35" step="0.5" value="${th}" style="width:90px;padding:.4rem;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)" oninput="CUN.th=this.value;cunTab()"></label>
   <div id="cuntab">${cunTable(th)}</div></div>
  <h2>Repere proporționale ale corpului</h2>
  <div class="tw"><table><tr><th>Segment</th><th>Cun</th></tr>${seg.map(s=>`<tr><td>${esc(s[0])}</td><td>${s[1]}</td></tr>`).join('')}</table></div>
  <h2>Exemple</h2>
  <ul><li>${ptLink('ST36')}: 3 cun sub ST35 → patru degete sub marginea rotulei, un deget lateral de creasta tibiei.</li><li>${ptLink('SP6')}: 3 cun deasupra vârfului maleolei mediale → patru degete deasupra, pe marginea tibiei.</li><li>${ptLink('PC6')}: 2 cun deasupra pliului încheieturii → trei degete.</li><li>${ptLink('CV12')}: 4 cun deasupra ombilicului (jumătatea distanței apendice xifoid–ombilic).</li></ul>
  <h2>Sfaturi</h2>
  <ul><li>Fiecare persoană își măsoară propriul corp: nu folosi mâna altcuiva.</li><li>Caută și un indiciu palpabil: o mică depresiune, un loc sensibil, o tensiune.</li><li>Memorează repere osoase și tendinoase, nu doar măsurători.</li></ul>`;
}
const CUN={th:20};
function cunTable(th){
  return `<div class="tw"><table><tr><th>Cun</th><th>≈ mm</th><th>≈ cm</th></tr>${[0.5,1,1.5,2,3,4,5,6,8,12].map(c=>`<tr><td>${c}</td><td>${(c*th).toFixed(0)}</td><td>${(c*th/10).toFixed(1)}</td></tr>`).join('')}</table></div><p class="mut">Calcul orientativ (1 cun = lățimea policelui). Pentru segmente mari se folosesc proporțiile corpului.</p>`;
}
function cunTab(){const th=+CUN.th||20;$('#cuntab').innerHTML=cunTable(th)}

function vSafe(){
  return `<h1>Siguranță & dovezi</h1>${disc()}
  <h2>Acupunctura cu ace — riscuri</h2>
  <ul><li><b>Frecvente, ușoare:</b> durere la înțepare, mici echimoze, amețeală, oboseală trecătoare, agravare temporară a simptomelor.</li>
  <li><b>Rare, grave:</b> pneumotorax (ace pe torace/spate/umăr), infecții (ace nesterile), lezarea nervilor, perforarea organelor, leșin.</li>
  <li>Cu ace sterile, de unică folosință, de către personal calificat, riscul de evenimente grave este foarte mic.</li>
  <li>Cere întotdeauna: ace de unică folosință, igienă a mâinilor și a pielii, cabinet curat, informare asupra riscurilor.</li></ul>
  <h2>Contraindicații și precauții</h2>
  <div class="tw"><table><tr><th>Situație</th><th>Ce faci</th></tr>
   <tr><td>Sarcină</td><td>Evită punctele marcate ⚠ (SP6, LI4, BL60, GB21 etc.), punctele abdominale inferioare și zona lombo-sacrată; moxibustia și electrostimularea nu se folosesc; orice utilizare doar cu medic/practician cu experiență în sarcină.</td></tr>
   <tr><td>Anticoagulante / tulburări de coagulare</td><td>Fără ace fără acordul medicului; presopunctură blândă.</td></tr>
   <tr><td>Stimulator cardiac / implant electric</td><td>Fără electroacupunctură sau TENS/TEAS; nu se trece curent prin torace, cap sau gât.</td></tr>
   <tr><td>Imunosupresie, diabet cu complicații</td><td>Precauție cu ace; piele sănătoasă; igienă strictă.</td></tr>
   <tr><td>Infecții cutanate, răni, tumori</td><td>Nu aplica ace/presiune în zonă.</td></tr>
   <tr><td>Epilepsie / convulsii</td><td>Fără electroacupunctură sau electrostimulare; ace doar cu acordul medicului; presiune blândă.</td></tr>
   <tr><td>Cancer / tumori / limfedem</td><td>Nu pe tumoră, ganglioni sau zone iradiate; fără ace pe membrul cu limfedem; nu înlocuiește tratamentul oncologic; risc de infecție în neutropenie (discută cu oncologul).</td></tr>
   <tr><td>Boli cardiace severe, hipotensiune, leșin</td><td>Poziție culcat, sesiuni scurte; întreabă medicul.</td></tr>
   <tr><td>Boli pulmonare severe sau pneumotorax în antecedente</td><td>Fără ace pe torace/spate/umăr; presiune blândă.</td></tr>
   <tr><td>Tromboză venoasă, varice severe, fracturi recente, osteoporoză severă</td><td>Nu masa și nu apăsa zona; întreabă medicul.</td></tr>
   <tr><td>Febră mare, urgențe</td><td>Medic imediat.</td></tr>
   <tr><td>Copii</td><td>Doar pediatri/practicieni cu experiență; adesea laser sau presiune blândă, fără ace.</td></tr>
   <tr><td>Tulburări psihice severe, panică</td><td>Nu ca înlocuitor al tratamentului; conlucrare cu medicul.</td></tr></table></div>
  <h2>Ce spun dovezile</h2>
  <div class="card">
   <p><b>Unde există dovezi ceva mai consistente (de calitate scăzută până la moderată; beneficii în general mici):</b> durere cronică musculoscheletală (inclusiv lombară), cefalee de tensiune și migrenă (profilaxie), greață și vomă postoperatorie (PC6). Pentru osteoartrita de genunchi diferența față de sham este mică și adesea sub pragul de relevanță clinică; pentru greața din chimioterapie dovezile sunt mai slabe și de calitate mixtă.</p>
   <p><b>Unde dovezile sunt slabe sau amestecate:</b> multe alte afecțiuni (depresie, fertilitate, astm, obezitate, tulburări de somn); rezultatele variază cu calitatea studiilor.</p>
   <p><b>Placebo și sham:</b> în multe studii acupunctura reală diferă puțin de acupunctura sham (ace superficiale sau în puncte nespecifice), ceea ce sugerează că o parte din efect este contextual (așteptare, atingere, ritual). Efectul contextual poate fi totuși util, mai ales în durere.</p>
   <p><b>Ghiduri:</b> unele ghiduri clinice includ acupunctura printre opțiunile non-farmacologice pentru lombalgie cronică (de ex. American College of Physicians, 2017), altele nu o recomandă (de ex. NICE, Marea Britanie: NG59 pentru lombalgie, 2016; NG193 pentru durerea cronică primară, 2021). Verifică ghidurile țării tale.</p>
   <p><b>Mecanisme:</b> studiile experimentale descriu efecte neurobiologice (modulare a durerii), dar meridianele ca structuri anatomice nu au fost identificate, iar mecanismele clinice rămân în cercetare.</p>
   <p><b>Recunoaștere:</b> în 2010 UNESCO a înscris „acupunctura și moxibustia MTC" pe lista patrimoniului cultural imaterial al umanității.</p></div>
  <h2>Abordare responsabilă</h2>
  <ul><li>Folosește acupunctura și presopunctura ca <b>adjuvante</b>, nu ca înlocuitor al diagnosticului și tratamentului medical.</li>
  <li>Nu întrerupe medicamentele fără acordul medicului.</li>
  <li>Fii atent la promisiuni de „vindecări" miraculoase, cure scumpe sau diagnostice fără examinare.</li>
  <li>Verifică reglementarea practicii în țara ta (în multe țări acupunctura se practică de medici sau de personal înregistrat).</li></ul>
  <h2>Istorie pe scurt</h2>
  <ul><li><b>Statele Combatante–Han (datare disputată):</b> <i>Huangdi Neijing</i> (Canonul Intern al Împăratului Galben), compilație în straturi, pune bazele teoriei.</li><li><b>Sec. III d.Hr.:</b> Huangfu Mi compilează <i>Zhenjiu Jiayijing</i> (sistematizare a punctelor).</li><li><b>1601:</b> Yang Jizhou, <i>Zhenjiu Dacheng</i>.</li><li><b>1971–1972:</b> Interesul occidental crește după vizita lui Nixon în China și relatările despre acupunctura în chirurgie.</li><li><b>1979–1991:</b> OMS publică liste de afecțiuni și nomenclatura standard a punctelor.</li><li><b>2010:</b> UNESCO — patrimoniu cultural imaterial.</li></ul>`;
}

/* --- QUIZ --- */
const QM=[
 ['Câți cun măsoară distanța dintre mameloane?','8',['6','10','12']],
 ['Care punct este „punctul de comandă" al feței și gurii?','LI4',['ST36','LU7','PC6']],
 ['Care punct este cel mai folosit pentru greață și rău de mișcare?','PC6',['LI4','BL60','GB41']],
 ['În ciclul Sheng, Lemnul generează:','Focul',['Pământul','Metalul','Apa']],
 ['În ciclul Ke, Apa controlează:','Focul',['Lemnul','Pământul','Metalul']],
 ['Elementul asociat toamnei:','Metal',['Lemn','Foc','Apă']],
 ['Tehnica japoneză cu presiune cu degetele:','Shiatsu',['Tuina','Moxa','Gua sha']],
 ['Moxibustia folosește arderea de:','Pelin (Artemisia)',['Salvie','Ghimbir','Cedru']],
 ['Care punct este evitat clasic în sarcină?','SP6',['PC6','HT7','GV20']],
 ['Câte puncte are meridianul vezicii urinare (BL)?','67',['45','54','72']],
 ['GV20 (Baihui) se află:','Pe creștet',['Pe frunte','În ceafă','În palmă']],
 ['Cine a compilat Zhenjiu Jiayijing?','Huangfu Mi',['Yang Jizhou','Sun Simiao','Hua Tuo']],
 ['Harta urechii în auriculoterapie seamănă cu:','Un făt inversat',['O inimă','O tigaie','O floare']],
 ['Gua Sha constă în:','Răzuirea pielii',['Arderea pelinului','Ventuze','Percuție ușoară']],
 ['Punctul-cheie pentru Dai Mai:','GB41',['SP4','TE5','KI6']],
 ['Punctul de influență al vaselor:','LU9',['GB34','BL17','CV17']],
 ['Punctul Yuan (sursă) al Inimii:','HT7',['PC6','LU7','SI3']],
 ['Cum se numește unitatea proporțională de măsurare a corpului?','Cun',['Li','Chi','Sen']],
 ['Care dintre meridiane NU face parte din cele 12 principale?','Ren Mai',['Plămân','Ficat','Rinichi']],
 ['Presopunctura este numită și:','Acupresură',['Acupunctură cu laser','Moxibustie','Auriculoterapie']],
 ['Ce înseamnă Hijama?','Ventuze umede',['Moxibustie','Gua sha','Reflexologie plantară']],
 ['Dien Chan este o formă de reflexologie:','Facială',['Plantară','Palmară','Auriculară']],
 ['Cine a descris hărțile auriculare moderne în Franța?','Paul Nogier',['William Fitzgerald','Tokujiro Namikoshi','Reinhold Voll']],
 ['Masajul tradițional thailandez a intrat pe lista UNESCO în:','2019',['1998','2005','2012']],
 ['Care variantă folosește un ciocănel cu 5–7 ace scurte?','Mei Hua / Qi Xing',['Fire needling','Ryodoraku','Tui Na']],
 ['Care dintre acestea este considerată fără dovezi științifice?','Kinesiologia aplicată (test muscular)',['Acupresura PC6 pentru greață','Acupunctura pentru lombalgie','Gua sha pentru tensiune']],
 ['Zen Shiatsu este asociat cu:','Shizuto Masunaga',['Tokujiro Namikoshi','Paul Nogier','Gary Craig']],
 ['Protocolul NADA folosește:','5 puncte auriculare',['3 puncte pe mână','12 puncte pe spate','1 punct pe creștet']]
];
const QZ={q:[],i:0,sc:0,ans:false};
function sh(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function genQ(){
  const out=[];
  for(const q of sh(QM).slice(0,6))out.push({t:q[0],a:q[1],o:sh([q[1],...q[2]])});
  for(let k=0;k<2;k++){const p=sh(PT.filter(x=>x.p&&x.c!=='EX'))[0];const w=sh(PT.filter(x=>x.p!==p.p)).slice(0,3).map(x=>x.p);out.push({t:`Care este numele pinyin al punctului ${p.c}?`,a:p.p,o:sh([p.p,...w])})}
  for(let k=0;k<1;k++){const m=sh(MER.filter(x=>x.t!=='—'))[0];const w=sh(MER.filter(x=>x.t!=='—'&&x.t!==m.t)).slice(0,3).map(x=>x.t);out.push({t:`În ce interval orar este maximul meridianului ${m.n}?`,a:m.t,o:sh([m.t,...w])})}
  for(let k=0;k<1;k++){const m=sh(MER.filter(x=>x.el!=='Extra'))[0];const w=['Lemn','Foc','Pământ','Metal','Apă'].filter(x=>x!==m.el);out.push({t:`Cărui element aparține meridianul ${m.n}?`,a:m.el,o:sh([m.el,...sh(w).slice(0,3)])})}
  return sh(out);
}
function vQuiz(){
  if(!QZ.q.length){QZ.q=genQ();QZ.i=0;QZ.sc=0;QZ.ans=false}
  if(QZ.i>=QZ.q.length){
    if(QZ.sc>S.best){S.best=QZ.sc;save()}
    return `<h1>Quiz</h1><div class="card"><h2>Rezultat: ${QZ.sc} / ${QZ.q.length}</h2><p>Cel mai bun scor: ${S.best}</p><button class="b" onclick="QZ.q=[];render()">Din nou</button></div>`;
  }
  const q=QZ.q[QZ.i];
  return `<h1>Quiz</h1><p class="mut">Întrebarea ${QZ.i+1} din ${QZ.q.length} · scor ${QZ.sc} · record ${S.best}</p>
  <div class="card"><h3>${esc(q.t)}</h3><div id="opts">${q.o.map((o,i)=>`<button class="opt" onclick="ansQ(${i})">${esc(o)}</button>`).join('')}</div>
  <div id="qres"></div></div>`;
}
function ansQ(i){
  if(QZ.ans)return;QZ.ans=true;const q=QZ.q[QZ.i];const btn=document.querySelectorAll('.opt');
  btn.forEach((b,j)=>{if(q.o[j]===q.a)b.classList.add('ok');else if(j===i)b.classList.add('no')});
  if(q.o[i]===q.a)QZ.sc++;
  $('#qres').innerHTML=`<button class="b" onclick="QZ.i++;QZ.ans=false;render()">${QZ.i<QZ.q.length-1?'Următoarea →':'Rezultat'}</button>`;
}

function vGloss(){
  const g=GLO.slice().sort((a,b)=>cmp(a[0],b[0]));
  return `<h1>Glosar</h1>${disc()}<div class="bar"><input id="gq" placeholder="Caută în glosar…" oninput="gFilter(this.value)"></div><div id="glist">${g.map(x=>`<details class="gl"><summary>${esc(x[0])}</summary><p>${esc(x[1])}</p></details>`).join('')}</div>`;
}
function gFilter(v){v=v.toLowerCase();document.querySelectorAll('.gl').forEach(d=>d.style.display=d.textContent.toLowerCase().includes(v)?'':'none')}

/* --- căutare globală --- */
function doSearch(){
  const v=$('#q').value.trim().toLowerCase();
  if(v.length<2){render();return}
  const pts=PT.filter(p=>(p.c+' '+p.p+' '+p.l+' '+p.u+' '+p.tg+' '+p.mn).toLowerCase().includes(v)).slice(0,30);
  const mer=MER.filter(m=>(m.c+' '+m.n+' '+m.zh+' '+m.path+' '+m.key+' '+m.use).toLowerCase().includes(v));
  const glo=GLO.filter(g=>(g[0]+' '+g[1]).toLowerCase().includes(v));
  const tech=VAR.filter(t=>(t.n+' '+t.pr+' '+t.zon+' '+t.ind).toLowerCase().includes(v));
  const pro=PROT.filter(p=>(p.t+' '+p.n+' '+p.p.join(' ')).toLowerCase().includes(v));
  const any=pts.length+mer.length+glo.length+tech.length+pro.length;
  $('#main').innerHTML=`<h1>${esc(T().ph.replace('…',''))}: “${esc(v)}”</h1>${any?'':`<p class="mut">${esc(T().noRes)}</p>`}
  ${pts.length?`<h2>Puncte (${pts.length})</h2><div class="grid">${pts.map(ptCard).join('')}</div>`:''}
  ${mer.length?`<h2>Meridiane</h2>${mer.map(m=>`<div class="card" style="margin:.4rem 0"><h3><span class="badge" style="background:${MCOL[m.c]}">${m.c}</span>${esc(m.n)}</h3><p>${esc(m.path)}</p></div>`).join('')}`:''}
  ${pro.length?`<h2>Protocoale</h2>${pro.map(p=>`<div class="card" style="margin:.4rem 0"><h3>${esc(p.t)}</h3><p>${p.p.map(c=>`<span class="tag">${c}</span>`).join('')}</p></div>`).join('')}`:''}
  ${tech.length?`<h2>Variante (${tech.length})</h2>${tech.slice(0,25).map(t=>`<div class="card" style="margin:.4rem 0"><h3>${esc(t.n)}</h3><p>${esc(t.pr)}</p><a href="#tech" onclick="TF.q='${esc(t.n).replace(/'/g,'')}';TF.cat='';TF.open='${esc(t.id)}';$('#q').value='';render();return false">Vezi fișa →</a></div>`).join('')}`:''}
  ${glo.length?`<h2>Glosar</h2>${glo.map(g=>`<details open><summary>${esc(g[0])}</summary><p>${esc(g[1])}</p></details>`).join('')}`:''}`;
}

