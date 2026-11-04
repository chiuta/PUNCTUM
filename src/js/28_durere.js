/* ================= UNDE TE DOARE? · CĂUTARE NATURALĂ · EXAMEN PE HARTĂ ================= */
const DZ=[
 {id:'cap',n:'Cap și tâmple',e:'🧠',prot:['Cefalee de tensiune','Stres & anxietate','Concentrare & studiu'],reg:['cap','fata'],pr:['cap']},
 {id:'ochi',n:'Ochi, nas, față, maxilar',e:'👁',prot:['Ochi obosiți','Nas înfundat','Dureri de dinți'],reg:['fata'],pr:['cap']},
 {id:'ceafa',n:'Ceafă și umeri',e:'🙆',prot:['Ceafă & umeri încordați'],reg:['ceafa','umeri'],pr:['gat']},
 {id:'gat',n:'Gât și tuse',e:'🗣',prot:['Tuse iritativă'],reg:[],pr:['gat']},
 {id:'spate-sup',n:'Spate superior',e:'🧍',prot:['Ceafă & umeri încordați'],reg:['spate','umeri'],pr:['spa']},
 {id:'lombar',n:'Spate lombar',e:'🪑',prot:['Lombalgie ușoară'],reg:['spate'],pr:['spa']},
 {id:'abdomen',n:'Abdomen și digestie',e:'🫃',prot:['Digestie lentă','Greață & rău de mișcare','Dureri menstruale'],reg:['abdomen'],pr:['tor']},
 {id:'brate',n:'Brațe, mâini, încheieturi',e:'✋',prot:[],reg:['brate'],pr:['bra']},
 {id:'picioare',n:'Picioare și tălpi',e:'🦶',prot:['Picioare grele'],reg:['picioare'],pr:['pic']},
 {id:'general',n:'General: oboseală, somn, stres',e:'😴',prot:['Oboseală & energie','Insomnie & agitație','Stres & anxietate'],reg:['intreg'],pr:[]}];
const DS=['Încordare musculară','Înțepenire','Durere surdă','Durere ascuțită sau înjunghiere','Arsură sau furnicături','Oboseală sau greutate'];
const DD=['Începută azi sau ieri','De câteva zile','De peste 3 săptămâni','Revine des'];
const DR={z:'',s:'',d:'',red:[false,false,false,false,false]};
function drSet(k,v){DR[k]=v;const y=window.scrollY;render();window.scrollTo(0,y)}
function drRed(i,v){DR.red[i]=v;const y=window.scrollY;render();window.scrollTo(0,y)}
function protIdx(pref){return PROT.findIndex(p=>p.t.startsWith(pref))}
function vDurere(){
  const z=DZ.find(x=>x.id===DR.z);const red=DR.red.some(Boolean);
  const sharp=DR.s===DS[3]||DR.s===DS[4];
  const chip=(arr,k,cur)=>arr.map(t=>`<button class="b ${cur===t?'':'alt'}" onclick="drSet('${k}',this.dataset.v)" data-v="${esc(t)}" aria-pressed="${cur===t}">${esc(t)}</button>`).join('');
  let out='';
  if(red)out=`<div class="warn" role="alert"><b>Nu face masaj sau presopunctură acum.</b> Dacă simptomele sunt severe sau au apărut brusc, sună la 112; altfel vorbește cu medicul.</div>`;
  else if(z){
    const notes=[];
    if(sharp)notes.push('Durerea ascuțită, arsura sau furnicăturile pot indica o problemă a nervilor sau a articulațiilor. Evită presiunea pe zonă și cere un consult.');
    if(DR.d===DD[2]||DR.d===DD[3])notes.push('Durerea persistentă sau care revine merită evaluată de medic. Rutinele de mai jos sunt doar pentru confort.');
    const pr=z.prot.map(protIdx).filter(i=>i>=0);
    const sq=MASC.map((r,i)=>({r,i})).filter(o=>z.reg.includes(o.r.regiune)).slice(0,4);
    const sm=MASS.map((c,i)=>({c,i})).filter(o=>masPts(o.c.pts).some(p=>z.pr.includes(p.r))).slice(0,4);
    out=`${notes.map(t=>`<div class="warn" role="note">${esc(t)}</div>`).join('')}
    ${sharp?'':`<h2>Sugestii pentru această zonă</h2>
    ${pr.length?`<h3>Presopunctură</h3>${pr.map(i=>`<div class="card" style="margin:.4rem 0"><h3>${esc(PROT[i].t)}</h3><p>${PROT[i].p.map(c=>cPtTag(c)).join('')}</p><button class="b" onclick="startSes(${i})">▶ Pornește sesiunea ghidată</button></div>`).join('')}`:''}
    ${sm.length?`<h3>Puncte apăsate simultan</h3>${sm.map(o=>`<div class="card" style="margin:.4rem 0"><h3>${esc(o.c.n)}</h3><p>${masTags(o.c.pts)}</p>${profBadges(profR('sim',o.c))}<button class="b" onclick="masStart('s',${o.i})">▶ Pornește sesiunea ghidată</button></div>`).join('')}`:''}
    ${sq.length?`<h3>Secvențe de masaj</h3>${sq.map(o=>`<div class="card" style="margin:.4rem 0"><h3>${esc(o.r.n)}</h3><p class="mut">${esc(o.r.scop)}</p>${profBadges(profR('seq',o.r))}<button class="b" onclick="masStart('c',${o.i})">▶ Pornește sesiunea ghidată</button></div>`).join('')}`:''}
    ${!pr.length&&!sm.length&&!sq.length?`<p class="mut">${esc(T().noRes)}</p>`:''}`}`;
  }
  return `<h1>Unde te doare?</h1>${disc()}
  <p>Alege zona, apoi cum se simte. Primești rutine blânde potrivite și semnele de alarmă. Nu este un diagnostic.</p>
  <h2>1. Zona</h2><div class="bar">${DZ.map(x=>`<button class="b ${DR.z===x.id?'':'alt'}" onclick="drSet('z','${x.id}')" aria-pressed="${DR.z===x.id}">${x.e} ${esc(x.n)}</button>`).join('')}</div>
  <h2>2. Cum se simte</h2><div class="bar">${chip(DS,'s',DR.s)}</div>
  <h2>3. De cât timp</h2><div class="bar">${chip(DD,'d',DR.d)}</div>
  <h2>4. Semne de alarmă</h2><p class="mut">Bifează dacă ai oricare dintre ele.</p>
  ${RED.map((t,i)=>`<label class="mut" style="display:flex;gap:.5rem;align-items:flex-start;margin:.3rem 0"><input type="checkbox" style="flex:none;min-width:0;width:auto;margin-top:.25rem" ${DR.red[i]?'checked':''} onchange="drRed(${i},this.checked)"> <span>${esc(t)}</span></label>`).join('')}
  ${out}`;
}
regView('durere',vDurere,{ro:'Unde te doare?',en:'Where does it hurt?',fr:'Où avez-vous mal ?',it:'Dove senti dolore?',es:'¿Dónde te duele?',pt:'Onde dói?',de:'Wo tut es weh?',hu:'Hol fáj?'},{after:'acu'});

/* ---------- căutare în limbaj natural ---------- */
const NLM=[[/gat|ceaf|cervical|umar|umeri/,'ceaf'],[/cap|cefal|migren|tample/,'cefalee'],[/somn|dorm|insomn|noapte/,'insomnie'],[/burt|stomac|digest|balon|constipa|abdomen/,'digestie'],[/spate|lomb|sale|coloan/,'lombalgie'],[/ochi|ecran|vedere|calculator/,'ochi'],[/\bnas\b|sinus|raceal|infundat/,'nas'],[/stres|anxie|nelinist|agita|panica|nervos/,'stres'],[/obosea|energie|epuiz|extenuat/,'oboseal'],[/tuse|gat iritat|raguseal/,'tuse'],[/menstru|ciclu|crampe/,'menstruale'],[/picio|gamb|umfl|tali|talp/,'picioare'],[/dint|maxilar|atm|masea/,'dinți'],[/great|voma|rau de miscare|rau de masina|navet/,'greață'],[/\bman|incheiet|tastatur|tunel|degete/,'mâini'],[/concentr|studiu|memor|examen/,'concentrare']];
const NLR=/durere (in|la) piept|dureri in piept|nu pot respira|respir.*greu|lesin|paralizi|slabiciune brusc|vorbire|febra mare|sangerare|infarct|avc|gambe? umflat/;
function nlNorm(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function nlExpand(v){const n=nlNorm(v);const o=[];NLM.forEach(m=>{if(m[0].test(n))o.push(m[1])});return o}
function nlUrgent(v){return NLR.test(nlNorm(v))}

/* ---------- examen: localizează punctul pe hartă ---------- */
const EX={mode:'key',code:'',view:'',res:null,tip:false};
function exPool(){
  const pool=[];PT.forEach(p=>{if(EX.mode==='key'&&!KEYPTS.has(p.c))return;const v=mpViewOf(p.c);if(v)pool.push({c:p.c,v})});return pool;
}
function exNext(){
  const pool=exPool();if(!pool.length)return;
  const q=pool[Math.floor(Math.random()*pool.length)];EX.code=q.c;EX.view=q.v;EX.res=null;EX.tip=false;render();
}
function exMode(m){EX.mode=m;EX.code='';render()}
function exTip(){EX.tip=true;render()}
function exTap(e){
  if(EX.res)return;
  const svg=$('#exSvg');if(!svg)return;
  const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const m=svg.getScreenCTM();if(!m)return;
  const q=pt.matrixTransform(m.inverse());
  const pos=compPos(EX.view).pos[EX.code]||[];if(!pos.length)return;
  let best=null,d=1e9;pos.forEach(a=>{const x=Math.hypot(a[0]-q.x,a[1]-q.y);if(x<d){d=x;best=a}});
  const lvl=d<=14?'exact':d<=30?'close':'miss';
  EX.res={lvl,x:q.x,y:q.y,cx:best[0],cy:best[1],d:Math.round(d)};
  S.exam.n++;if(lvl!=='miss')S.exam.ok++;
  EX.run=lvl==='miss'?0:(EX.run||0)+1;if(EX.run>S.exam.best)S.exam.best=EX.run;
  save();render();
}
function vExam(){
  if(!EX.code){const pool=exPool();if(pool.length){const q=pool[Math.floor(Math.random()*pool.length)];EX.code=q.c;EX.view=q.v}}
  const p=ptBy(EX.code);const v=VW[EX.view];
  if(!p||!v)return `<h1>Examen pe hartă</h1>${disc()}<p class="mut">${esc(T().noRes)}</p>`;
  const r=EX.res;
  const marks=r?`<circle cx="${r.cx}" cy="${r.cy}" r="7" fill="none" stroke="#2e8b57" stroke-width="3"/><circle cx="${r.x}" cy="${r.y}" r="4" fill="${r.lvl==='miss'?'#c0392b':'#2e8b57'}"/>`:'';
  const msg=r?(r.lvl==='exact'?'Exact!':r.lvl==='close'?'Aproape. Ești în vecinătatea punctului.':'Departe de punct. Cercul verde arată poziția corectă.'):'';
  const acc=S.exam.n?Math.round(100*S.exam.ok/S.exam.n):0;
  return `${MPCSS}<h1>Examen pe hartă</h1>${disc()}
  <p>Apasă pe hartă locul unde se află punctul cerut. Hărțile sunt schematice: servesc la exersare, nu înlocuiesc măsurarea pe corp.</p>
  <div class="bar"><button class="b ${EX.mode==='key'?'':'alt'}" onclick="exMode('key')">Puncte-cheie</button><button class="b ${EX.mode==='all'?'':'alt'}" onclick="exMode('all')">Toate punctele</button></div>
  <div class="card"><h2 style="margin:.2rem 0"><span class="badge" style="background:${MCOL[p.m]}">${esc(p.c)}</span>${esc(p.p)}</h2>
  ${EX.tip?`<p class="mut">${esc(p.l)}</p>`:`<button class="b alt" onclick="exTip()">Arată indiciul (localizarea)</button>`}
  <svg id="exSvg" viewBox="0 0 ${v.vb[0]} ${v.vb[1]}" style="width:100%;max-width:360px;display:block;margin:.6rem auto;touch-action:manipulation" role="img" aria-label="Hartă pentru examen" onclick="exTap(event)">${v.svg()}${marks}</svg>
  ${r?`<p role="status"><b>${esc(msg)}</b></p><button class="b" onclick="exNext()">Următorul punct ▶</button>`:''}</div>
  <p class="mut">Încercări: <b>${S.exam.n}</b> · reușite: <b>${S.exam.ok}</b> (${acc}%) · cea mai lungă serie: <b>${S.exam.best}</b></p>`;
}
regView('exam',vExam,{},{nonav:true});
