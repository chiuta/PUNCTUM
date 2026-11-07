/* ================= PROFIL DE SIGURANȚĂ, TRIAJ, JURNAL, PARTENER, VOCE, ACCESIBILITATE ================= */
const PFLAGS=[['preg','Sunt însărcinată sau încerc să rămân însărcinată'],['anticoag','Iau anticoagulante sau am o tulburare de coagulare'],['tromboza','Am varice severe, tromboză sau umflături dureroase la picioare'],['osteo','Am osteoporoză severă sau oase fragile'],['onco','Am sau am avut cancer, inclusiv cu afectare osoasă, ori sunt în tratament oncologic'],['pacemaker','Am pacemaker sau alt dispozitiv medical implantat'],['neuropatie','Am neuropatie (de exemplu diabetică) sau sensibilitate redusă la atingere'],['hernie','Am hernie de disc, durere de spate cu iradiere sau operație pe coloană'],['piele','Am o afecțiune de piele activă (eczemă, psoriazis, infecție, răni)'],['epilepsie','Am epilepsie sau am avut convulsii'],['inima','Am boală de inimă, aritmie sau hipertensiune greu controlată'],['ochi','Am glaucom, retină fragilă sau operație oculară recentă'],['rinichi','Am boli de rinichi sau litiază renală'],['abdomen','Am hernie abdominală sau inghinală, anevrism de aortă, lichid în abdomen, stomă sau operație abdominală recentă'],['limfedem','Am limfedem sau mi s-au scos ganglioni (axilă/inghinal), ori am fistulă de dializă sau cateter la un braț']];
const RED=['Durere sau strângere în piept, lipsă de aer, leșin sau palpitații neobișnuite','Slăbiciune ori amorțeală bruscă pe o parte a corpului, față căzută, vorbire încurcată, pierderea bruscă a vederii sau a echilibrului','Durere de cap bruscă, ca o lovitură, „cea mai puternică din viața ta”, sau durere de cap cu febră și ceafă înțepenită, vărsături ori confuzie','Febră peste 38 °C sau stare generală alterată','O gambă sau un braț umflat, cald, roșu și dureros, de o singură parte (mai ales după o călătorie lungă, imobilizare, operație sau în sarcină)','Durere de spate sau de picior cu amorțeală în zona dintre picioare, slăbiciune în ambele picioare sau probleme noi cu urinarea ori cu scaunul','Durere abdominală puternică sau care se agravează, vărsături repetate sau cu sânge, sânge în scaun; în sarcină, orice sângerare sau durere abdominală','Durere bruscă, intensă sau neexplicată, ori traumatism sau cădere recentă în zona de masat','Gânduri de a-ți face rău sau de a nu mai trăi'];
/* nivelul de urgență al fiecărui semn RED: a=112 imediat, b=112 sau camera de gardă, ab=abdomen, g=membru (TVP), f=medic în aceeași zi, s=idei suicidare */
const RED_LV=['a','b','b','f','g','b','ab','f','s'];
const RED_ORD=['a','b','s','ab','g','f'];
const RED_TX={a:'Sună acum la 112. Nu conduce singur la spital și nu continua masajul sau presopunctura.',b:'Sună acum la 112 sau mergi imediat la camera de gardă. Nu aștepta ca simptomele să treacă.',s:'Sună acum la 112 sau mergi la cea mai apropiată cameră de gardă. Nu rămâne singur și spune cuiva de încredere. Presopunctura nu este un tratament pentru acest lucru.',ab:'Nu face masaj acum. Mergi la urgențe; la durere puternică, vărsături cu sânge, sânge în scaun sau sângerare în sarcină, sună la 112.',g:'Nu masa și nu apăsa membrul. Mergi la urgențe în aceeași zi; dacă apare și durere în piept sau lipsă de aer, sună la 112.',f:'Nu face masaj acum. Vorbește cu medicul în aceeași zi; dacă te agravezi, sună la 112.'};
function redAlarm(idx){const lv=[...new Set((idx||[]).map(i=>RED_LV[i]).filter(Boolean))].sort((x,y)=>RED_ORD.indexOf(x)-RED_ORD.indexOf(y));return `<p><b>Nu face masaj sau presopunctură acum.</b></p>`+lv.map(k=>`<p><b>${esc(RED_TX[k])}</b></p>`).join('')}
const VLANG={ro:'ro-RO',en:'en-US',fr:'fr-FR',it:'it-IT',es:'es-ES',pt:'pt-PT',de:'de-DE',hu:'hu-HU'};
const ACC_FZ=[1,1.15,1.3,1.5];

/* ---------- normalizare stare (apelată din load) ---------- */
function n10(x){if(x===null||x===undefined||x==='')return null;const n=Math.round(+x);return isFinite(n)&&n>=0&&n<=10?n:null}
function normExtra(){
  const P={};if(S.prof&&typeof S.prof==='object'&&!Array.isArray(S.prof))PFLAGS.forEach(f=>{if(S.prof[f[0]]===true)P[f[0]]=true});S.prof=P;
  S.log=(Array.isArray(S.log)?S.log:[]).filter(x=>x&&typeof x==='object'&&!Array.isArray(x)).slice(-500).map(x=>({t:+x.t>0&&+x.t<8.64e15?+x.t:Date.now(),ti:String(x.ti==null?'':x.ti).slice(0,120),b:n10(x.b),a:n10(x.a),n:String(x.n==null?'':x.n).slice(0,300),f:Math.max(0,Math.min(99,Math.round(+x.f)||0))}));
  const lim={p:typeof PROT!=='undefined'?PROT.length:0,s:typeof MASS!=='undefined'?MASS.length:0,c:typeof MASC!=='undefined'?MASC.length:0};
  S.plan=(Array.isArray(S.plan)?S.plan:[]).filter(x=>x&&typeof x==='object'&&['p','s','c'].includes(x.k)&&Number.isInteger(x.i)&&x.i>=0&&x.i<lim[x.k]&&/^([01]\d|2[0-3]):[0-5]\d$/.test(String(x.time))).slice(0,60).map(x=>({k:x.k,i:x.i,time:String(x.time),days:[...new Set((Array.isArray(x.days)?x.days:[]).map(Number).filter(d=>Number.isInteger(d)&&d>=1&&d<=7))].sort()})).filter(x=>x.days.length); // un plan fără zile nu are sens (ICS invalid)
  const a=S.acc&&typeof S.acc==='object'&&!Array.isArray(S.acc)?S.acc:{};
  S.acc={size:[0,1,2,3].includes(a.size)?a.size:0,hc:a.hc===true,rm:a.rm===true,voice:a.voice===true,ring:a.ring!==false};
  S.pre=+S.pre>0&&+S.pre<=Date.now()&&isFinite(+S.pre)?+S.pre:0; // un triaj „din viitor” nu contează niciodată ca recent
  S.preReg=typeof S.preReg==='string'?S.preReg.slice(0,20):'';S.profSeen=S.profSeen===true;
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
const TECH_ASK={anticoag:['ps','bl','mn','fr','cp','mt','pe','tp','pl','pa','vb'],osteo:['tp','vb','in','pa'],hernie:['vb','in','tp','pa'],piele:['fr','pe','pl','tp']};
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
function rAdd(R,lv,k,t){if(!profOn(k))return;const e=R.find(x=>x.k===k);if(!e)R.push({lv,k,t});else if(lv==='stop'){e.lv='stop';if(t)e.t=t}}
function rPt(R,p,strict){if(!p)return;if(isPregPt(p))rAdd(R,'stop','preg');if(p.r==='pic'){rAdd(R,strict?'stop':'ask','tromboza');rAdd(R,'ask','neuropatie')}if(p.r==='bra')rAdd(R,'ask','limfedem')}
function rTech(R,id){Object.keys(TECH_ASK).forEach(k=>{if(TECH_ASK[k].includes(id))rAdd(R,'ask',k)})}
/* combinații (sim): ce spun notele („nu face”, „omite”) devine blocare sau cerere de aviz medical */
const SIM_ASK={s30:['osteo','pacemaker','anticoag','onco','inima'],s12:['anticoag','limfedem'],s16:['osteo','rinichi'],s17:['osteo','rinichi'],s18:['osteo'],s25:['abdomen'],s31:['abdomen'],s04:['ochi'],s29:['epilepsie'],s09:['limfedem'],s14:['limfedem'],s15:['limfedem'],s02:['osteo'],s10:['inima'],s11:['inima']};
const SIM_STOP={s30:['osteo','pacemaker','anticoag'],s25:['abdomen'],s31:['abdomen'],s16:['rinichi'],s17:['rinichi'],s04:['ochi'],s22:['neuropatie'],s27:['neuropatie']};
const PB_ASK={anticoag:'Iei anticoagulante sau ai tulburare de coagulare: doar presiune ușoară (maximum 3 din 10), fără minge sau antebraț, câte 20–30 s pe punct; oprește dacă apare vânătaie. Întreabă medicul.'};
const PB_STOP={neuropatie:'Cu sensibilitate redusă la picior nu face acest exercițiu; cere medicului sau podologului o rutină sigură (inspecția zilnică a tălpilor este mai importantă decât masajul).',pacemaker:'Cu pacemaker sau alt dispozitiv implantat, nu apăsa în zona dispozitivului (sub claviculă, stern); întreabă medicul.'};
function profR(kind,o){
  const R=[];
  if(kind==='pt')rPt(R,o,false);
  else if(kind==='var'){Object.keys(VAR_ASK).forEach(k=>{if(VAR_ASK[k](o))rAdd(R,'ask',k)})}
  else if(kind==='sim'){
    masPts(o.pts).forEach(p=>rPt(R,p,true));
    (SIM_ASK[o.id]||[]).forEach(k=>rAdd(R,'ask',k));
    (SIM_STOP[o.id]||[]).forEach(k=>rAdd(R,'stop',k,PB_STOP[k]));
    rTech(R,'bl');
  }
  else if(kind==='seq'){
    const all=[...new Set(o.pasi.flatMap(p=>p.pts||[]))];masPts(all).forEach(p=>rPt(R,p,true));
    if(o.regiune==='abdomen'){rAdd(R,'stop','preg');rAdd(R,'stop','abdomen')}
    if(o.regiune==='spate')rAdd(R,'stop','preg');
    if(o.regiune==='picioare'){rAdd(R,'stop','tromboza');rAdd(R,'ask','neuropatie');rAdd(R,'ask','preg')}
    if(o.regiune==='brate'){rAdd(R,'ask','neuropatie');rAdd(R,'ask','limfedem')}
    if(o.id==='r05')rAdd(R,'stop','neuropatie',PB_STOP.neuropatie);
    if(['spate','umeri'].includes(o.regiune)&&o.pasi.some(p=>['mn','ps','pe','bl','pa','tp'].includes(p.teh)))rAdd(R,'ask','osteo');
    if(o.id==='r11')rAdd(R,'stop','osteo');
    o.pasi.forEach(p=>rTech(R,p.teh));
    rAdd(R,'ask','onco');
  }
  return R;
}
function profBadge(x){const t=x.t||(x.lv==='ask'?PB_ASK[x.k]:'');return `<p class="w pw" role="note">${x.lv==='stop'?'⛔ <b>Evită</b> — profilul tău:':'⚠ Doar cu acordul medicului — profilul tău:'} <span>${esc(profLabel(x.k))}</span>${t?`<br>${esc(t)}`:''}</p>`}
function profBadges(R){return (R||[]).map(profBadge).join('')}

/* ---------- începutul sesiunii: profil, triaj, scor înainte ---------- */
let GATE=null;
function sesReasons(steps,o){
  if(o&&o.R)return o.R.slice();
  const R=[];steps.forEach(s=>{if(s.grp)s.grp.forEach(p=>rPt(R,p,true));else rPt(R,s,true)});rTech(R,'ps');rAdd(R,'ask','onco');return R;
}
function gateReg(steps,o){if(o&&o.reg)return String(o.reg).slice(0,20);const f=steps&&steps[0];const p=f&&(f.grp?f.grp[0]:f);return p?String(p.r||''):''}
function sesBegin(title,steps,o){
  o=o||{};if(SES.on)endSes(false); // o singură fereastră modală: o sesiune în curs nu poate suprascrie poarta
  let note=false;const reg=gateReg(steps,o);
  if(!o.child&&profOn('preg')&&steps.length&&!steps[0].grp){const k=steps.filter(p=>!isPregPt(p));if(k.length<steps.length){note=true;steps=k}}
  GATE={title,steps,o,R:o.child?[]:sesReasons(steps,o),note,reg};
  gateDraw();
}
const GCHK=(cls,t)=>`<label class="mut" style="display:flex;gap:.5rem;align-items:flex-start;margin:.4rem 0"><input type="checkbox" class="${cls}" style="flex:none;min-width:0;width:auto;margin-top:.25rem" data-h-change="95"> <span>${t}</span></label>`;
function gateDraw(){
  const g=GATE;if(!g)return;
  const child=!!g.o.child;
  const fresh=!child&&S.pre&&S.pre<=Date.now()&&Date.now()-S.pre<30*60*1000&&S.preReg===g.reg;
  const noProf=!child&&!Object.keys(S.prof||{}).length&&!S.profSeen;
  const stop=g.R.filter(x=>x.lv==='stop');
  const asks=g.R.filter(x=>x.lv==='ask');
  const body=noProf?`<div id="gProf" class="warn" role="alert"><p><b>Nu ți-ai completat profilul de siguranță.</b> Dacă ești însărcinată, iei anticoagulante, ai pacemaker, osteoporoză, cancer sau probleme de circulație la picioare, completează-l înainte de prima sesiune (durează un minut).</p><div class="bar"><button class="b" data-h-click="96">Completez profilul</button><button class="b alt" data-h-click="97">Nu am niciuna dintre acestea</button></div></div><div class="bar"><button class="b alt" data-h-click="98">Anulează</button></div>`
  :!g.steps.length?`<p><b>Toate punctele acestei sesiuni se evită în profilul tău.</b> Alege altă sesiune sau întreabă medicul.</p><div class="bar"><button class="b" data-h-click="98">Închide</button></div>`
  :stop.length?`<p><b>Această sesiune nu este potrivită pentru profilul tău.</b> Alege altă variantă sau întreabă medicul.</p><div class="bar"><button class="b" data-h-click="98">Închide</button></div>`
  :child?`<p><b>Acest gest îl face doar un adult responsabil.</b> Atingere foarte ușoară, cu vârful degetelor, 10–20 de secunde; nu apăsa pe puncte. Oprește imediat dacă plânge mai tare. Nu face acest gest și mergi urgent la medic sau sună la 112 dacă sugarul sau copilul are febră, vărsături verzui sau cu sânge, abdomen umflat și dur, sânge în scaun, letargie, refuză alimentarea sau respiră greu.</p>
   ${g.o.guide?`<p class="mut">${esc(g.o.guide)}</p>`:''}
   ${GCHK('gk','Sunt adultul responsabil și nu observ niciunul dintre aceste semne.')}
   <div class="bar" style="justify-content:center"><button class="b" id="gGo" data-h-click="99">▶ Pornește sesiunea</button><button class="b alt" data-h-click="98">Anulează</button></div>`
  :`${fresh?'':`<p><b>Nu începe dacă ai oricare dintre:</b></p>${RED.map(t=>GCHK('gr',esc(t))).join('')}<div id="gAlarm" class="warn" role="alert" style="display:none"></div>`}
   ${asks.map(x=>GCHK('ga','Am discutat cu medicul și am acordul lui pentru această sesiune ('+esc(profLabel(x.k))+').')).join('')}
   ${g.o.partner?GCHK('gc','Am întrebat persoana dacă este de acord și dacă are contraindicații, iar ea poate cere oricând oprirea.').replace('class="gc"','class="gc" id="gC"'):''}
   <p class="mut">Opțional: cum te simți acum? (0 = fără disconfort, 10 = disconfort foarte mare)</p>
   <select id="gB" aria-label="Scor înainte"><option value="">Nu notez</option>${[0,1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}">${n}</option>`).join('')}</select>
   <div class="bar" style="justify-content:center"><button class="b" id="gGo" data-h-click="99">▶ Pornește sesiunea</button><button class="b alt" data-h-click="98">Anulează</button></div>`;
  $('#modal').innerHTML=`<div class="modal"><div class="box" style="text-align:left"><h2>Înainte de sesiune</h2><p class="mut">${esc(g.title)}</p>
   ${g.note?'<p class="w pw" role="note">Am sărit peste punctele de evitat în sarcină, conform profilului tău.</p>':''}
   ${profBadges(g.R)}${g.o.warn?`<div class="warn" role="note"><b>Citește înainte:</b> ${esc(g.o.warn)}</div>`:''}${body}</div></div>`;
  gateChk();
}
function gateProfil(){GATE=null;$('#modal').innerHTML='';EU.tab='profil';go('eu')}
function gateProfSeen(){S.profSeen=true;save();gateDraw()}
function gateChk(){
  const go=$('#gGo');if(!go)return;
  const idx=[...document.querySelectorAll('#modal .gr')].map((x,i)=>x.checked?i:-1).filter(i=>i>=0);
  const red=idx.length>0;
  const al=$('#gAlarm');if(al){al.style.display=red?'':'none';al.innerHTML=red?redAlarm(idx):''}
  const need=[...document.querySelectorAll('#modal .ga,#modal .gc,#modal .gk')].some(x=>!x.checked);
  go.disabled=red||need;
}
function gateCancel(){GATE=null;$('#modal').innerHTML=''}
function gateGo(){
  const g=GATE;if(!g)return;
  if(document.querySelector('#modal .gr')){S.pre=Date.now();S.preReg=g.reg}
  const b=$('#gB');const jb=b?n10(b.value):null;
  save();GATE=null;sesGo(g.title,g.steps,Object.assign({},g.o,{jb}));
}
function sesGo(title,steps,o){
  o=o||{};SES.fixed=!!o.fixed;SES.child=!!o.child;SES.dur=(o.sec&&CSEC.includes(+o.sec))?+o.sec:SES.sec; // durata rutinei rămâne a sesiunii, nu schimbă alegerea utilizatorului
  SES.title=title;SES.pts=steps;SES.i=0;SES.left=stepSec(0);SES.on=true;SES.paused=false;SES.partner=!!o.partner;SES.jb=o.jb==null?null:o.jb;SES.fb='';SES.fbn=0;SES.spoken=-1;SES.ann=-1;SES.a5=-1;
  clearInterval(SES.timer);clearTimeout(SES.fbT);sesArm();SES.timer=setInterval(tick,1000);wakeOn();beep(880);drawSes();
}

/* ---------- mod partener ---------- */
const FBT={less:'Primitorul cere: mai ușor',ok:'Primitorul spune: bine așa',more:'Primitorul cere: mai tare'};
function sesFb(k){
  if(k==='stop'){endSes(false);$('#modal').innerHTML=`<div class="modal"><div class="box"><h2>⏹ Sesiune oprită</h2><p>Oprită la cererea primitorului. Întreabă dacă are nevoie de apă sau odihnă.</p><button class="b" data-af data-h-click="100">OK</button></div></div>`;return}
  SES.fb=FBT[k]||'';SES.fbn++;sesFbShow(); // fără redesenarea ferestrei: butoanele și focusul rămân intacte
  clearTimeout(SES.fbT);SES.fbT=setTimeout(()=>{SES.fb='';if(SES.on)sesFbShow()},6000);
}
function sesFbShow(){const e=document.getElementById('sesFb');if(!e)return;e.hidden=!SES.fb;e.innerHTML=SES.fb?`<b>${esc(SES.fb)}</b>`:''}
function partnerBar(){
  return `<div class="bar" style="justify-content:center"><button class="b alt" data-f="less" data-h-click="101">Mai ușor</button><button class="b alt" data-f="ok" data-h-click="102">Bine</button><button class="b alt" data-f="more" data-h-click="103">Mai tare</button><button class="b" data-f="stop" style="background:var(--acc2);color:#fff" data-h-click="104">STOP</button></div><p class="w pw" id="sesFb" role="status" style="font-size:1.1rem" ${SES.fb?'':'hidden'}>${SES.fb?`<b>${esc(SES.fb)}</b>`:''}</p>`;
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
   ${j?`<p class="mut">Cum te simți acum? (0 = fără disconfort, 10 = disconfort foarte mare)</p><select id="jA" aria-label="Scor după"><option value="" selected>Nu notez</option>${[0,1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}">${n}</option>`).join('')}</select><input id="jN" maxlength="200" placeholder="Notă (opțional)" style="width:100%;margin:.5rem 0;padding:.5rem;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)"><div class="bar" style="justify-content:center"><button class="b" data-h-click="105">Salvează în jurnal</button><button class="b alt" data-h-click="100">Nu salva</button></div>`
   :`<button class="b" data-h-click="100">OK</button>`}</div></div>`;
}
function jrSave(){
  const a=$('#jA'),n=$('#jN');
  S.log.push({t:Date.now(),ti:String(SES.title).slice(0,120),b:SES.jb,a:a?n10(a.value):null,n:n?String(n.value).slice(0,300):'',f:SES.fbn||0});
  if(S.log.length>500)S.log=S.log.slice(-500);
  save();$('#modal').innerHTML='';if(view()==='eu')render();
  const A=a?n10(a.value):null;
  if(A!=null&&((SES.jb!=null&&A>SES.jb+1)||A>=7))$('#modal').innerHTML=`<div class="modal"><div class="box"><h2>Disconfortul a crescut</h2><p>Disconfortul a crescut după sesiune. Nu repeta sesiunea. Dacă durerea persistă peste 24–48 de ore sau apar amorțeală, umflătură, vânătaie ori simptomele din lista de alarmă, vorbește cu medicul.</p><button class="b" data-h-click="100">OK</button></div></div>`;
}
