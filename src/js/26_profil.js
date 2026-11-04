/* ================= PROFIL DE SIGURANȚĂ, TRIAJ, JURNAL, PARTENER, VOCE, ACCESIBILITATE ================= */
const PFLAGS=[['preg','Sunt însărcinată sau încerc să rămân însărcinată'],['anticoag','Iau anticoagulante sau am o tulburare de coagulare'],['tromboza','Am varice severe, tromboză sau umflături dureroase la picioare'],['osteo','Am osteoporoză severă sau oase fragile'],['onco','Am sau am avut cancer, ori sunt în tratament oncologic'],['pacemaker','Am pacemaker sau alt dispozitiv medical implantat'],['neuropatie','Am neuropatie (de exemplu diabetică) sau sensibilitate redusă la atingere'],['hernie','Am hernie de disc, durere de spate cu iradiere sau operație pe coloană'],['piele','Am o afecțiune de piele activă (eczemă, psoriazis, infecție, răni)']];
const RED=['Febră peste 38 °C sau stare generală alterată','Durere în piept, dificultăți de respirație sau palpitații neobișnuite','O gambă sau un braț umflat, cald, roșu și dureros, de o singură parte','Durere bruscă, intensă sau neexplicată, ori traumatism recent în zona de masat','Amețeală puternică, slăbiciune bruscă, tulburări de vedere sau vorbire'];
const VLANG={ro:'ro-RO',en:'en-US',fr:'fr-FR',it:'it-IT',es:'es-ES',pt:'pt-PT',de:'de-DE',hu:'hu-HU'};
const ACC_FZ=[1,1.15,1.3,1.5];

/* ---------- normalizare stare (apelată din load) ---------- */
function n10(x){if(x===null||x===undefined||x==='')return null;const n=Math.round(+x);return isFinite(n)&&n>=0&&n<=10?n:null}
function normExtra(){
  const P={};if(S.prof&&typeof S.prof==='object'&&!Array.isArray(S.prof))PFLAGS.forEach(f=>{if(S.prof[f[0]]===true)P[f[0]]=true});S.prof=P;
  S.log=(Array.isArray(S.log)?S.log:[]).filter(x=>x&&typeof x==='object'&&!Array.isArray(x)).slice(-500).map(x=>({t:+x.t>0&&isFinite(+x.t)?+x.t:Date.now(),ti:String(x.ti==null?'':x.ti).slice(0,120),b:n10(x.b),a:n10(x.a),n:String(x.n==null?'':x.n).slice(0,300),f:Math.max(0,Math.min(99,Math.round(+x.f)||0))}));
  const lim={p:typeof PROT!=='undefined'?PROT.length:0,s:typeof MASS!=='undefined'?MASS.length:0,c:typeof MASC!=='undefined'?MASC.length:0};
  S.plan=(Array.isArray(S.plan)?S.plan:[]).filter(x=>x&&typeof x==='object'&&['p','s','c'].includes(x.k)&&Number.isInteger(x.i)&&x.i>=0&&x.i<lim[x.k]&&/^([01]\d|2[0-3]):[0-5]\d$/.test(String(x.time))).slice(0,60).map(x=>({k:x.k,i:x.i,time:String(x.time),days:[...new Set((Array.isArray(x.days)?x.days:[]).map(Number).filter(d=>Number.isInteger(d)&&d>=1&&d<=7))].sort()}));
  const a=S.acc&&typeof S.acc==='object'&&!Array.isArray(S.acc)?S.acc:{};
  S.acc={size:[0,1,2,3].includes(a.size)?a.size:0,hc:a.hc===true,rm:a.rm===true,voice:a.voice===true,ring:a.ring!==false};
  S.pre=+S.pre>0&&isFinite(+S.pre)?+S.pre:0;
  const e=S.exam&&typeof S.exam==='object'?S.exam:{};S.exam={n:Math.max(0,Math.min(1e6,Math.round(+e.n)||0)),ok:Math.max(0,Math.min(1e6,Math.round(+e.ok)||0)),best:Math.max(0,Math.min(1e6,Math.round(+e.best)||0))};
}
function applyAcc(){
  const r=document.documentElement,a=S.acc||{};
  r.classList.toggle('hc',!!a.hc);r.classList.toggle('rm',!!a.rm);
  r.style.setProperty('--fz',String(ACC_FZ[a.size||0]||1));
}

/* ---------- reguli profil ---------- */
function profOn(k){return !!(S.prof&&S.prof[k])}
function profLabel(k){const f=PFLAGS.find(x=>x[0]===k);return f?f[1]:k}
const TECH_ASK={anticoag:['tp','pe','pl','pa','vb'],osteo:['tp','vb','in','pa'],hernie:['vb','in','tp','pa'],piele:['fr','pe','pl','tp']};
const VAR_ASK={
  anticoag:v=>v.inv>=1||['vent-u','gua','plum'].includes(v.id),
  preg:v=>!v.soft&&(v.inv>=1||v.risc>=2),
  pacemaker:v=>['teas','magnet','shock','eav','ryo','laser','tdp'].includes(v.id),
  onco:v=>!v.soft,
  neuropatie:v=>['compresa','moxa-d','moxa-i','moxa-s','tdp'].includes(v.id),
  piele:v=>['vent-u','hijama','gua','plum','moxa-d','fire'].includes(v.id),
  tromboza:v=>['vent-u','hijama','gua','plum'].includes(v.id),
  osteo:v=>['tuina','shock','vent-u'].includes(v.id),
  hernie:v=>['tuina','thai'].includes(v.id)};
function rAdd(R,lv,k){if(!profOn(k))return;const e=R.find(x=>x.k===k);if(!e)R.push({lv,k});else if(lv==='stop')e.lv='stop'}
function rPt(R,p,strict){if(!p)return;if(isPregPt(p))rAdd(R,'stop','preg');if(p.r==='pic'){rAdd(R,strict?'stop':'ask','tromboza');rAdd(R,'ask','neuropatie')}}
function rTech(R,id){Object.keys(TECH_ASK).forEach(k=>{if(TECH_ASK[k].includes(id))rAdd(R,'ask',k)})}
function profR(kind,o){
  const R=[];
  if(kind==='pt')rPt(R,o,false);
  else if(kind==='var'){Object.keys(VAR_ASK).forEach(k=>{if(VAR_ASK[k](o))rAdd(R,k==='preg'?'ask':'ask',k)})}
  else if(kind==='sim'){masPts(o.pts).forEach(p=>rPt(R,p,true))}
  else if(kind==='seq'){
    const all=[...new Set(o.pasi.flatMap(p=>p.pts||[]))];masPts(all).forEach(p=>rPt(R,p,true));
    if(o.regiune==='abdomen')rAdd(R,'stop','preg');
    if(o.regiune==='picioare'){rAdd(R,'stop','tromboza');rAdd(R,'ask','neuropatie')}
    if(o.regiune==='brate')rAdd(R,'ask','neuropatie');
    o.pasi.forEach(p=>rTech(R,p.teh));
    rAdd(R,'ask','onco');
  }
  return R;
}
function profBadge(x){return `<p class="w pw" role="note">${x.lv==='stop'?'⛔ <b>Evită</b> — profilul tău:':'⚠ Doar cu acordul medicului — profilul tău:'} <span>${esc(profLabel(x.k))}</span></p>`}
function profBadges(R){return (R||[]).map(profBadge).join('')}

/* ---------- începutul sesiunii: profil, triaj, scor înainte ---------- */
let GATE=null;
function sesReasons(steps,o){
  if(o&&o.R)return o.R.slice();
  const R=[];steps.forEach(s=>{if(s.grp)s.grp.forEach(p=>rPt(R,p,false));else rPt(R,s,false)});rAdd(R,'ask','onco');return R;
}
function sesBegin(title,steps,o){
  o=o||{};let note=false;
  if(profOn('preg')&&steps.length&&!steps[0].grp){const k=steps.filter(p=>!isPregPt(p));if(k.length<steps.length){note=true;steps=k}}
  GATE={title,steps,o,R:sesReasons(steps,o),note};
  gateDraw();
}
function gateDraw(){
  const g=GATE;if(!g)return;
  const fresh=S.pre&&Date.now()-S.pre<2*3600*1000;
  const stop=g.R.filter(x=>x.lv==='stop');
  const body=!g.steps.length?`<p><b>Toate punctele acestei sesiuni se evită în profilul tău.</b> Alege altă sesiune sau întreabă medicul.</p><div class="bar"><button class="b" onclick="gateCancel()">Închide</button></div>`
  :stop.length?`<p><b>Această sesiune nu este potrivită pentru profilul tău.</b> Alege altă variantă sau întreabă medicul.</p><div class="bar"><button class="b" onclick="gateCancel()">Închide</button></div>`
  :`${fresh?'':`<p><b>Nu începe dacă ai oricare dintre:</b></p>${RED.map(t=>`<label class="mut" style="display:flex;gap:.5rem;align-items:flex-start;margin:.3rem 0"><input type="checkbox" class="gr" style="flex:none;min-width:0;width:auto;margin-top:.25rem" onchange="gateChk()"> <span>${esc(t)}</span></label>`).join('')}<div id="gAlarm" class="warn" role="alert" style="display:none"><b>Nu face masaj sau presopunctură acum.</b> Dacă simptomele sunt severe sau au apărut brusc, sună la 112; altfel vorbește cu medicul.</div>`}
   ${g.o.partner?`<label class="mut" style="display:flex;gap:.5rem;align-items:flex-start;margin:.5rem 0"><input type="checkbox" id="gC" style="flex:none;min-width:0;width:auto;margin-top:.25rem" onchange="gateChk()"> <span>Am întrebat persoana dacă este de acord și dacă are contraindicații, iar ea poate cere oricând oprirea.</span></label>`:''}
   <p class="mut">Opțional: cum te simți acum? (0 = fără disconfort, 10 = disconfort foarte mare)</p>
   <select id="gB" aria-label="Scor înainte"><option value="">Nu notez</option>${[0,1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}">${n}</option>`).join('')}</select>
   <div class="bar" style="justify-content:center"><button class="b" id="gGo" onclick="gateGo()">▶ Pornește sesiunea</button><button class="b alt" onclick="gateCancel()">Anulează</button></div>`;
  $('#modal').innerHTML=`<div class="modal"><div class="box" style="text-align:left"><h2>Înainte de sesiune</h2><p class="mut">${esc(g.title)}</p>
   ${g.note?'<p class="w pw" role="note">Am sărit peste punctele de evitat în sarcină, conform profilului tău.</p>':''}
   ${profBadges(g.R)}${body}</div></div>`;
  gateChk();
}
function gateChk(){
  const go=$('#gGo');if(!go)return;
  const red=[...document.querySelectorAll('#modal .gr')].some(x=>x.checked);
  const al=$('#gAlarm');if(al)al.style.display=red?'':'none';
  const c=$('#gC');const need=GATE&&GATE.o.partner&&c&&!c.checked;
  go.disabled=red||!!need;
}
function gateCancel(){GATE=null;$('#modal').innerHTML=''}
function gateGo(){
  const g=GATE;if(!g)return;
  if(document.querySelector('#modal .gr'))S.pre=Date.now();
  const b=$('#gB');const jb=b?n10(b.value):null;
  save();GATE=null;sesGo(g.title,g.steps,Object.assign({},g.o,{jb}));
}
function sesGo(title,steps,o){
  o=o||{};SES.fixed=!!o.fixed;if(o.sec&&CSEC.includes(+o.sec))SES.sec=+o.sec;
  SES.title=title;SES.pts=steps;SES.i=0;SES.left=stepSec(0);SES.on=true;SES.paused=false;SES.partner=!!o.partner;SES.jb=o.jb==null?null:o.jb;SES.fb='';SES.fbn=0;SES.spoken=-1;
  clearInterval(SES.timer);SES.timer=setInterval(tick,1000);beep(880);drawSes();
}

/* ---------- mod partener ---------- */
const FBT={less:'Primitorul cere: mai ușor',ok:'Primitorul spune: bine așa',more:'Primitorul cere: mai tare'};
function sesFb(k){
  if(k==='stop'){endSes(false);$('#modal').innerHTML=`<div class="modal"><div class="box"><h2>⏹ Sesiune oprită</h2><p>Oprită la cererea primitorului. Întreabă dacă are nevoie de apă sau odihnă.</p><button class="b" onclick="$('#modal').innerHTML=''">OK</button></div></div>`;return}
  SES.fb=FBT[k]||'';SES.fbn++;drawSes();clearTimeout(SES.fbT);SES.fbT=setTimeout(()=>{SES.fb='';if(SES.on)drawSes()},6000);
}
function partnerBar(){
  return `<div class="bar" style="justify-content:center"><button class="b alt" onclick="sesFb('less')">Mai ușor</button><button class="b alt" onclick="sesFb('ok')">Bine</button><button class="b alt" onclick="sesFb('more')">Mai tare</button><button class="b" style="background:var(--acc2);color:#fff" onclick="sesFb('stop')">STOP</button></div>${SES.fb?`<p class="w pw" role="status" style="font-size:1.1rem"><b>${esc(SES.fb)}</b></p>`:''}`;
}

/* ---------- voce ---------- */
function speak(t){
  if(!(S.acc&&S.acc.voice)||!('speechSynthesis' in window))return;
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(t).slice(0,400));u.lang=VLANG[S.lang]||'en-US';speechSynthesis.speak(u)}catch(e){}
}
function speechStop(){try{if(window.speechSynthesis)speechSynthesis.cancel()}catch(e){}}
function sesSpeak(p){
  if(SES.spoken===SES.i)return;SES.spoken=SES.i;
  if(p.grp)speak((p.th?trWhole(p.th)+'. ':'')+trWhole(p.t));
  else speak(p.c+' '+p.p+'. '+trWhole(p.l));
}
function ringHtml(){return (S.acc&&S.acc.ring)?'<div class="brg" aria-hidden="true"></div>':''}

/* ---------- jurnal ---------- */
function sesDoneHtml(){
  const j=SES.jb!=null;
  return `<div class="modal"><div class="box"><h2>✔ Sesiune încheiată</h2><p>Stai încă 1–2 minute, respiră lent. Bea apă dacă dorești.</p>
   ${j?`<p class="mut">Cum te simți acum? (0 = fără disconfort, 10 = disconfort foarte mare)</p><select id="jA" aria-label="Scor după">${[0,1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}">${n}</option>`).join('')}</select><input id="jN" maxlength="200" placeholder="Notă (opțional)" style="width:100%;margin:.5rem 0;padding:.5rem;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)"><div class="bar" style="justify-content:center"><button class="b" onclick="jrSave()">Salvează în jurnal</button><button class="b alt" onclick="$('#modal').innerHTML=''">Nu salva</button></div>`
   :`<button class="b" onclick="$('#modal').innerHTML=''">OK</button>`}</div></div>`;
}
function jrSave(){
  const a=$('#jA'),n=$('#jN');
  S.log.push({t:Date.now(),ti:String(SES.title).slice(0,120),b:SES.jb,a:a?n10(a.value):null,n:n?String(n.value).slice(0,300):'',f:SES.fbn||0});
  if(S.log.length>500)S.log=S.log.slice(-500);
  save();$('#modal').innerHTML='';if(view()==='eu')render();
}
