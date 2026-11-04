/* ================= AFECȚIUNI & RUTINE: index de afecțiuni + constructor de rutine ================= */
const CONDX=`/*@@COND@@*/`;
const COND=CONDX.split('\n').map(l=>l.trim()).filter(l=>l&&l[0]!=='#').map(l=>{
  const a=l.split('¦');
  return {id:a[0],n:a[1]||'',g:a[2]||'',d:a[3]||'',pts:(a[4]||'').split(',').map(s=>s.trim()).filter(Boolean),pr:a[5]||'',
    vr:(a[6]||'').split(',').map(s=>s.trim()).filter(Boolean),sc:a[7]||'',al:a[8]||'',ev:((a[9]||'x')[0]||'x'),evt:(a[9]||'').replace(/^[mlwx]:\s*/,'')};
}).filter(c=>c.id&&c.n&&c.pts.length);

const CONDUI={
ro:{title:'Afecțiuni & rutine',intro:'Caută o afecțiune sau un simptom frecvent și vezi punctele de acupresură tradiționale asociate, un protocol blând, auto-îngrijirea, semnalele de alarmă și ce spun dovezile. Apoi compune-ți propriile rutine ordonate de puncte.',
 contentNote:'Fișele afecțiunilor sunt în limba română.',search:'Caută după simptom sau afecțiune…',all:'Toate',noNeedle:'Fără ace (ascunde variantele invazive)',count:'afecțiuni',noRes:'Nicio afecțiune găsită.',
 desc:'Descriere',points:'Puncte',protocol:'Protocol de acupresură',variants:'Variante potrivite',selfcare:'Auto-îngrijire',alarm:'Semnale de alarmă — mergi la medic/urgență',evid:'Ce spun dovezile',
 evL:{m:'Dovezi moderate',l:'Dovezi limitate',w:'Dovezi slabe',x:'Fără dovezi'},
 pregN:'În sarcină evită: ',kidsN:'Pentru copii: doar atingere și masaj foarte blânde, fără presiune; durate scurte, sub supraveghere, cu acordul pediatrului. Acupresura nu înlocuiește consultul.',
 startS:'▶ Sesiune ghidată',addR:'+ Adaugă în rutină',added:'Puncte adăugate în rutina de mai jos',
 sec:'Rutinele mele',rName:'Numele rutinei',rNamePh:'ex. Seara înainte de somn',rAddPh:'Adaugă punct: cod sau nume (ex. LI4, Hegu)…',rSec:'Durată/punct',rSecU:'s',perPt:'punct',
 rSave:'Salvează rutina',rNew:'Rutină nouă',rEmpty:'Rutina nu are încă puncte. Caută un punct mai sus sau folosește „Adaugă în rutină” din fișa unei afecțiuni.',rUp:'Mută sus',rDown:'Mută jos',rDel:'Șterge',
 rStart:'▶ Pornește',rEdit:'Editează',rPrint:'Tipărește',rFav:'Favorită',rDup:'Duplică',rSaved:'Rutina a fost salvată.',rNoPts:'Adaugă cel puțin un punct.',rNone:'Nu ai încă rutine salvate.',
 rStartDraft:'▶ Pornește sesiunea',rFavStart:'▶ Rutina favorită',rConfirm:'Ștergi această rutină?',rDefault:'Rutina mea',rClear:'Golește',
 ioT:'Export / import',rExport:'Exportă (JSON)',rImport:'Importă din text',ioPh:'Lipește aici JSON-ul unei rutine sau al unei liste de rutine…',ioOk:'Rutine importate: ',ioBad:'Text invalid: nu am găsit rutine valide.',ioExp:'Fișier descărcat; textul JSON e și în câmpul de mai sus.',
 pTitle:'Rutină de acupresură',pStep:'Pas',pLoc:'Localizare',pDur:'Durată',pFoot:'Material educativ; nu înlocuiește sfatul medical. Oprește la durere ascuțită, amețeală sau disconfort. Evită punctele contraindicate în sarcină.',
 g:{'Durere':'Durere','Digestiv':'Digestiv','Respirator':'Respirator','Somn și minte':'Somn și minte','Ginecologic':'Ginecologic','Cap și senzoriale':'Cap și senzoriale','Oboseală și imunitate':'Oboseală și imunitate','Piele':'Piele','Urinar':'Urinar','Copii':'Copii'}},
en:{title:'Conditions & routines',intro:'Search a common condition or symptom to see the traditional acupressure points, a gentle protocol, self-care, red flags and what the evidence says. Then build your own ordered routines of points.',
 contentNote:'Condition sheets are in Romanian.',search:'Search by symptom or condition…',all:'All',noNeedle:'No needles (hide invasive variants)',count:'conditions',noRes:'No condition found.',
 desc:'Description',points:'Points',protocol:'Acupressure protocol',variants:'Suitable variants',selfcare:'Self-care',alarm:'Red flags — see a doctor / emergency',evid:'What the evidence says',
 evL:{m:'Moderate evidence',l:'Limited evidence',w:'Weak evidence',x:'No evidence'},
 pregN:'In pregnancy avoid: ',kidsN:'For children: only very gentle touch and massage, no pressure; short durations, supervised, with the paediatrician\'s consent. Acupressure does not replace a consultation.',
 startS:'▶ Guided session',addR:'+ Add to routine',added:'Points added to the routine below',
 sec:'My routines',rName:'Routine name',rNamePh:'e.g. Evening before sleep',rAddPh:'Add point: code or name (e.g. LI4, Hegu)…',rSec:'Time/point',rSecU:'s',perPt:'point',
 rSave:'Save routine',rNew:'New routine',rEmpty:'This routine has no points yet. Search a point above or use "Add to routine" on a condition card.',rUp:'Move up',rDown:'Move down',rDel:'Delete',
 rStart:'▶ Start',rEdit:'Edit',rPrint:'Print',rFav:'Favourite',rDup:'Duplicate',rSaved:'Routine saved.',rNoPts:'Add at least one point.',rNone:'You have no saved routines yet.',
 rStartDraft:'▶ Start session',rFavStart:'▶ Favourite routine',rConfirm:'Delete this routine?',rDefault:'My routine',rClear:'Clear',
 ioT:'Export / import',rExport:'Export (JSON)',rImport:'Import from text',ioPh:'Paste the JSON of a routine or a list of routines here…',ioOk:'Routines imported: ',ioBad:'Invalid text: no valid routines found.',ioExp:'File downloaded; the JSON text is also in the field above.',
 pTitle:'Acupressure routine',pStep:'Step',pLoc:'Location',pDur:'Duration',pFoot:'Educational material; it does not replace medical advice. Stop on sharp pain, dizziness or discomfort. Avoid points contraindicated in pregnancy.',
 g:{'Durere':'Pain','Digestiv':'Digestive','Respirator':'Respiratory','Somn și minte':'Sleep & mind','Ginecologic':'Gynaecological','Cap și senzoriale':'Head & senses','Oboseală și imunitate':'Fatigue & immunity','Piele':'Skin','Urinar':'Urinary','Copii':'Children'}}
};
function CNU(k){const a=CONDUI[S.lang],e=CONDUI.en,r=CONDUI.ro;return (a&&a[k]!==undefined)?a[k]:(e[k]!==undefined?e[k]:r[k])}
function CNUg(g){const o=CNU('g');return (o&&o[g])||(CONDUI.en.g[g])||g}
const cnN=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const CNF={q:'',g:'',noN:false,open:''};
const CRT={id:null,name:'',pts:[],sec:60,msg:'',io:''};
const CSEC=[30,45,60,90,120];
const CPREG=/Contraindicat în sarcină|Evită în sarcină|Doar sub îndrumare/;
function cRoutines(){if(!Array.isArray(S.routines))S.routines=[];return S.routines}
function cSave(){try{save()}catch(e){}}
function cPt(c){return PT.find(x=>x.c===c)}
function cPtTag(c){const p=cPt(c);return p?`<span class="tag" title="${esc(p.l)}">${ptLink(c)} ${esc(p.p)}</span>`:''}

/* ---- sesiune ghidată pe puncte proprii ---- */
function startCustom(title,codes,sec){
  const pts=(codes||[]).map(c=>PT.find(x=>x.c===c)).filter(Boolean);
  if(!pts.length)return;
  if(sec&&CSEC.includes(+sec))SES.sec=+sec;
  SES.title=title;SES.pts=pts;SES.i=0;SES.left=SES.sec;SES.on=true;SES.paused=false;
  clearInterval(SES.timer);SES.timer=setInterval(tick,1000);beep(880);drawSes();
}
function cndStart(id){const c=COND.find(x=>x.id===id);if(c)startCustom(c.n,c.pts,c.g==='Copii'?30:0)}

/* ---- index ---- */
function cndFilter(){
  const q=cnN(CNF.q.trim());
  return COND.filter(c=>(!CNF.g||c.g===CNF.g)&&(!q||cnN([c.n,c.d,c.g,CNUg(c.g),c.id,c.pts.join(' '),c.pr,c.sc].join(' ')).includes(q)));
}
function cndVarLink(id){
  const v=VAR.find(x=>x.id===id);if(!v)return '';
  if(CNF.noN&&v.inv>=2)return '';
  return `<a class="tag" href="#tech" onclick="TF.q='${esc(v.n).replace(/'/g,'')}';TF.cat='';TF.open='${esc(v.id)}';$('#q').value='';render();return false">${esc(v.n.split(' (')[0])}</a>`;
}
function cndCard(c){
  const pts=c.pts.map(cPt).filter(Boolean);
  const preg=pts.filter(p=>CPREG.test(p.w||'')).map(p=>p.c);
  const vl=c.vr.map(cndVarLink).filter(Boolean).join(' ');
  return `<details id="c-${esc(c.id)}" ${CNF.open===c.id?'open':''}><summary>${esc(c.n)} <span class="badge" style="background:${EVC[c.ev]||EVC.x}">${esc(CNU('evL')[c.ev]||'')}</span><span class="tag">${esc(CNUg(c.g))}</span></summary>
   <p>${esc(c.d)}</p>
   <div class="warn cnd-alarm" style="border-width:2px"><b>⚠ ${esc(CNU('alarm'))}</b><br>${esc(c.al)}</div>
   ${preg.length?`<p class="w" style="color:var(--acc2)">⚠ ${esc(CNU('pregN'))}${preg.join(', ')}.</p>`:''}
   ${c.g==='Copii'?`<div class="warn">👶 ${esc(CNU('kidsN'))}</div>`:''}
   <h3>${esc(CNU('points'))}</h3><p>${pts.map(p=>`<span class="tag" title="${esc(p.l)}">${ptLink(p.c)} ${esc(p.p)}</span>`).join('')}</p>
   <h3>${esc(CNU('protocol'))}</h3><p>${esc(c.pr)}</p>
   <div class="bar"><button class="b" onclick="cndStart('${esc(c.id)}')">${esc(CNU('startS'))}</button><button class="b alt" onclick="cndAddAll('${esc(c.id)}')">${esc(CNU('addR'))}</button></div>
   ${vl?`<h3>${esc(CNU('variants'))}</h3><p>${vl}</p>`:''}
   <h3>${esc(CNU('selfcare'))}</h3><p>${esc(c.sc)}</p>
   <h3>${esc(CNU('evid'))}</h3><p><span class="badge" style="background:${EVC[c.ev]||EVC.x}">${esc(CNU('evL')[c.ev]||'')}</span> ${esc(c.evt)}</p>
  </details>`;
}
function cndRenderList(){
  const L=cndFilter(),box=$('#cnd-list');if(!box)return;
  const cn=$('#cnd-count');if(cn)cn.textContent=L.length+' / '+COND.length+' '+CNU('count');
  box.innerHTML=L.length?L.map(cndCard).join(''):`<p class="mut">${esc(CNU('noRes'))}</p>`;
  if(CNF.open){const e=document.getElementById('c-'+CNF.open);if(e)e.scrollIntoView({block:'start'});CNF.open=''}
}
function cndChips(){
  const gs=[...new Set(COND.map(c=>c.g))];
  return `<button class="b ${CNF.g?'alt':''}" onclick="CNF.g='';cndChipsDraw();cndRenderList()">${esc(CNU('all'))} (${COND.length})</button>`+
   gs.map(g=>`<button class="b ${CNF.g===g?'':'alt'}" data-g="${esc(g)}" onclick="CNF.g=this.dataset.g;cndChipsDraw();cndRenderList()">${esc(CNUg(g))} (${COND.filter(c=>c.g===g).length})</button>`).join('');
}
function cndChipsDraw(){const b=$('#cnd-chips');if(b)b.innerHTML=cndChips()}

/* ---- rutine proprii ---- */
function rtnDefaultName(){return CNU('rDefault')+' '+(cRoutines().length+1)}
function rtnAdd(code){
  if(!cPt(code)||CRT.pts.length>=60)return;CRT.pts.push(code);CRT.msg='';rtnDraw();const i=$('#rtn-q');if(i)i.focus();
}
function cndAddAll(id){
  const c=COND.find(x=>x.id===id);if(!c)return;
  c.pts.forEach(p=>{if(cPt(p)&&!CRT.pts.includes(p)&&CRT.pts.length<60)CRT.pts.push(p)});
  if(!CRT.name)CRT.name=c.n.slice(0,80);
  CRT.msg=CNU('added');rtnDraw();
  const e=$('#rtn-sec');if(e)e.scrollIntoView({block:'start'});
}
function rtnSug(v){
  const box=$('#rtn-sug');if(!box)return;const q=cnN(v.trim());
  if(!q){box.innerHTML='';return}
  const sc=p=>{const c=cnN(p.c),n=cnN(p.p);return c===q?0:c.startsWith(q)?1:n.startsWith(q)?2:c.includes(q)?3:n.includes(q)?4:cnN(p.u||'').includes(q)?5:9};
  const L=PT.map(p=>({p,s:sc(p)})).filter(x=>x.s<9).sort((a,b)=>a.s-b.s).slice(0,8);
  box.innerHTML=L.map(x=>`<button class="b alt" style="margin:.15rem .2rem .15rem 0;padding:.3rem .6rem;font-size:.85rem" onclick="rtnAdd('${esc(x.p.c)}');$('#rtn-q').value='';$('#rtn-sug').innerHTML=''">+ ${esc(x.p.c)} ${esc(x.p.p)}</button>`).join('')||`<span class="mut">${esc(CNU('noRes'))}</span>`;
}
function rtnKey(e){if(e.key==='Enter'){const b=document.querySelector('#rtn-sug button');if(b){e.preventDefault();b.click()}}}
function rtnMove(i,d){const j=i+d;if(j<0||j>=CRT.pts.length)return;const t=CRT.pts[i];CRT.pts[i]=CRT.pts[j];CRT.pts[j]=t;rtnDraw()}
function rtnDel(i){CRT.pts.splice(i,1);rtnDraw()}
function rtnClear(){CRT.pts=[];CRT.name='';CRT.id=null;CRT.msg='';rtnDraw()}
function rtnSave(){
  if(!CRT.pts.length){CRT.msg=CNU('rNoPts');rtnDraw();return}
  const R=cRoutines(),name=(CRT.name.trim()||rtnDefaultName()).slice(0,80);
  let r=CRT.id&&R.find(x=>x.id===CRT.id);
  if(r){r.name=name;r.pts=CRT.pts.slice();r.sec=CRT.sec}
  else{r={id:'r'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name,pts:CRT.pts.slice(),sec:CRT.sec,fav:false};R.push(r)}
  cSave();CRT.id=r.id;CRT.name=name;CRT.msg=CNU('rSaved');rtnDraw();
}
function rtnStartDraft(){startCustom(CRT.name.trim()||rtnDefaultName(),CRT.pts,CRT.sec)}
function rtnById(id){return cRoutines().find(x=>x.id===id)}
function rtnStart(id){const r=rtnById(id);if(r)startCustom(r.name,r.pts,r.sec)}
function rtnEdit(id){const r=rtnById(id);if(!r)return;CRT.id=r.id;CRT.name=r.name;CRT.pts=r.pts.slice();CRT.sec=r.sec||60;CRT.msg='';rtnDraw();const e=$('#rtn-ed');if(e)e.scrollIntoView({block:'start'})}
function rtnFav(id){const R=cRoutines();const r=rtnById(id);if(!r)return;const v=!r.fav;R.forEach(x=>x.fav=false);r.fav=v;cSave();rtnDraw()}
function rtnDup(id){const r=rtnById(id);if(!r)return;cRoutines().push({id:'r'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:(r.name+' (2)').slice(0,80),pts:r.pts.slice(),sec:r.sec,fav:false});cSave();rtnDraw()}
function rtnRemove(id){
  let ok=true;try{ok=confirm(CNU('rConfirm'))}catch(e){}
  if(!ok)return;
  S.routines=cRoutines().filter(x=>x.id!==id);if(CRT.id===id)CRT.id=null;cSave();rtnDraw();
}
function rtnPrint(id){
  const r=rtnById(id);if(!r)return;
  const rows=r.pts.map(cPt).filter(Boolean).map((p,i)=>`<tr><td>${i+1}</td><td><b>${esc(p.c)}</b> ${esc(p.p)}</td><td>${esc(p.l)}</td><td>${r.sec||60} ${esc(CNU('rSecU'))}</td></tr>`).join('');
  let d=document.getElementById('cprint');if(d)d.remove();
  d=document.createElement('div');d.id='cprint';
  d.innerHTML=`<h1>${esc(r.name)}</h1><p>${esc(CNU('pTitle'))} · PUNCTUM</p><table><tr><th>${esc(CNU('pStep'))}</th><th>${esc(CNU('points'))}</th><th>${esc(CNU('pLoc'))}</th><th>${esc(CNU('pDur'))}</th></tr>${rows}</table><p><i>${esc(CNU('pFoot'))}</i></p>`;
  document.body.appendChild(d);document.body.classList.add('cprinting');
  const done=()=>{document.body.classList.remove('cprinting');const x=document.getElementById('cprint');if(x)x.remove();window.removeEventListener('afterprint',done)};
  window.addEventListener('afterprint',done);
  try{window.print()}catch(e){}
  setTimeout(done,500);
}
function rtnExport(){
  const data=JSON.stringify({punctum:'routines',v:1,routines:cRoutines().map(r=>({name:r.name,pts:r.pts,sec:r.sec,fav:!!r.fav}))},null,1);
  CRT.io=data;
  try{const b=new Blob([data],{type:'application/json'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='punctum-routines.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}catch(e){}
  CRT.msg=CNU('ioExp');rtnDraw();
}
function rtnImport(){
  const ta=$('#rtn-io');let list=[];
  try{const j=JSON.parse((ta?ta.value:CRT.io)||'');list=Array.isArray(j)?j:(j&&Array.isArray(j.routines)?j.routines:(j&&j.pts?[j]:[]))}catch(e){list=[]}
  const R=cRoutines();let n=0;
  list.slice(0,100).forEach(x=>{
    if(!x||typeof x!=='object'||!Array.isArray(x.pts))return;
    const pts=x.pts.filter(c=>typeof c==='string'&&cPt(c)).slice(0,60);if(!pts.length)return;
    const sec=CSEC.includes(+x.sec)?+x.sec:60;
    R.push({id:'r'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:String(x.name||CNU('rDefault')).slice(0,80),pts,sec,fav:false});n++;
  });
  if(n)cSave();
  CRT.io=ta?ta.value:CRT.io;CRT.msg=n?CNU('ioOk')+n:CNU('ioBad');rtnDraw();
}
function rtnDraw(){
  const box=$('#rtn-box');if(!box)return;
  const R=cRoutines().slice().sort((a,b)=>(b.fav?1:0)-(a.fav?1:0));
  const rows=CRT.pts.map((c,i)=>{const p=cPt(c);return `<tr><td>${i+1}</td><td><span class="badge" style="background:${p&&typeof MCOL!=='undefined'&&MCOL[p.m]||'var(--acc)'}">${esc(c)}</span>${p?esc(p.p):''}</td>
    <td style="white-space:nowrap"><button class="b alt" style="padding:.25rem .55rem" title="${esc(CNU('rUp'))}" aria-label="${esc(CNU('rUp'))}" onclick="rtnMove(${i},-1)" ${i===0?'disabled':''}>▲</button>
    <button class="b alt" style="padding:.25rem .55rem" title="${esc(CNU('rDown'))}" aria-label="${esc(CNU('rDown'))}" onclick="rtnMove(${i},1)" ${i===CRT.pts.length-1?'disabled':''}>▼</button>
    <button class="b alt" style="padding:.25rem .55rem" title="${esc(CNU('rDel'))}" aria-label="${esc(CNU('rDel'))}" onclick="rtnDel(${i})">✕</button></td></tr>`}).join('');
  const pregWarn=CRT.pts.map(cPt).filter(p=>p&&CPREG.test(p.w||'')).map(p=>p.c);
  box.innerHTML=`<div class="card" id="rtn-ed">
   <div class="bar"><input id="rtn-name" maxlength="80" placeholder="${esc(CNU('rNamePh'))}" aria-label="${esc(CNU('rName'))}" value="${esc(CRT.name)}" oninput="CRT.name=this.value">
    <select aria-label="${esc(CNU('rSec'))}" onchange="CRT.sec=+this.value">${CSEC.map(s=>`<option value="${s}" ${CRT.sec===s?'selected':''}>${s} ${esc(CNU('rSecU'))} / ${esc(CNU('perPt'))}</option>`).join('')}</select></div>
   <div class="bar"><input id="rtn-q" type="search" placeholder="${esc(CNU('rAddPh'))}" autocomplete="off" oninput="rtnSug(this.value)" onkeydown="rtnKey(event)"></div>
   <div id="rtn-sug"></div>
   ${CRT.pts.length?`<div class="tw"><table>${rows}</table></div>`:`<p class="mut">${esc(CNU('rEmpty'))}</p>`}
   ${pregWarn.length?`<p class="w" style="color:var(--acc2)">⚠ ${esc(CNU('pregN'))}${pregWarn.join(', ')}.</p>`:''}
   <div class="bar"><button class="b" onclick="rtnSave()">${esc(CNU('rSave'))}</button><button class="b alt" onclick="rtnStartDraft()" ${CRT.pts.length?'':'disabled'}>${esc(CNU('rStartDraft'))}</button><button class="b alt" onclick="rtnClear()">${esc(CNU('rNew'))}</button></div>
   ${CRT.msg?`<p class="mut" role="status">${esc(CRT.msg)}</p>`:''}
  </div>
  ${R.length?R.map(r=>`<details ${r.fav?'open':''}><summary>${r.fav?'★ ':''}${esc(r.name)} <span class="tag">${r.pts.length} · ${r.sec||60} ${esc(CNU('rSecU'))}</span></summary>
    <p>${r.pts.map(cPtTag).join('')}</p>
    <div class="bar"><button class="b" onclick="rtnStart('${esc(r.id)}')">${esc(CNU('rStart'))}</button><button class="b alt" onclick="rtnEdit('${esc(r.id)}')">${esc(CNU('rEdit'))}</button>
     <button class="b alt" onclick="rtnFav('${esc(r.id)}')">${r.fav?'★':'☆'} ${esc(CNU('rFav'))}</button><button class="b alt" onclick="rtnPrint('${esc(r.id)}')">🖨 ${esc(CNU('rPrint'))}</button>
     <button class="b alt" onclick="rtnDup('${esc(r.id)}')">${esc(CNU('rDup'))}</button><button class="b alt" onclick="rtnRemove('${esc(r.id)}')">${esc(CNU('rDel'))}</button></div></details>`).join(''):`<p class="mut">${esc(CNU('rNone'))}</p>`}
  <details><summary>${esc(CNU('ioT'))}</summary>
   <textarea id="rtn-io" rows="6" style="width:100%;background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:.5rem;font:13px monospace" placeholder="${esc(CNU('ioPh'))}" aria-label="JSON" oninput="CRT.io=this.value">${esc(CRT.io)}</textarea>
   <div class="bar"><button class="b alt" onclick="rtnExport()">${esc(CNU('rExport'))}</button><button class="b" onclick="rtnImport()">${esc(CNU('rImport'))}</button></div></details>`;
}

/* ---- vizualizarea ---- */
function vCond(){
  const fav=cRoutines().find(r=>r.fav);
  return `<h1>${esc(CNU('title'))}</h1>${disc()}
  <p>${esc(CNU('intro'))}</p><p class="mut">${esc(CNU('contentNote'))}</p>
  ${fav?`<div class="bar"><button class="b" onclick="rtnStart('${esc(fav.id)}')">${esc(CNU('rFavStart'))}: ${esc(fav.name)}</button></div>`:''}
  <div class="bar"><input id="cnd-q" type="search" placeholder="${esc(CNU('search'))}" aria-label="${esc(CNU('search'))}" value="${esc(CNF.q)}" oninput="CNF.q=this.value;cndRenderList()">
   <span class="mut" id="cnd-count" style="align-self:center"></span></div>
  <div class="bar" id="cnd-chips"></div>
  <div class="bar"><label class="mut"><input type="checkbox" ${CNF.noN?'checked':''} onchange="CNF.noN=this.checked;cndRenderList()"> ${esc(CNU('noNeedle'))}</label></div>
  <div id="cnd-list"></div>
  <h2 id="rtn-sec">${esc(CNU('sec'))}</h2>
  <div id="rtn-box"></div>`;
}
function condInit(){
  const h=(location.hash||'').split(':')[1];if(h&&COND.some(c=>c.id===h)){CNF.open=h;CNF.g='';CNF.q=''}
  cndChipsDraw();cndRenderList();rtnDraw();
}
(function(){
  const st=document.createElement('style');
  st.textContent='#cprint{display:none}@media print{body.cprinting>*:not(#cprint){display:none!important}body.cprinting #cprint{display:block!important;color:#000;background:#fff;padding:1cm;font:14px/1.5 system-ui,sans-serif}body.cprinting #cprint table{width:100%;border-collapse:collapse}body.cprinting #cprint th,body.cprinting #cprint td{border:1px solid #888;padding:.4rem;text-align:left}body{background:#fff}header,nav,footer,#modal,.noprint{display:none!important}}';
  document.head.appendChild(st);
})();
regView('cond',vCond,{ro:'Afecțiuni & rutine',en:'Conditions & routines',fr:'Affections & routines',it:'Disturbi e routine',es:'Afecciones y rutinas',pt:'Condições e rotinas',de:'Beschwerden & Routinen',hu:'Panaszok és rutinok'},{after:'acu',post:condInit});
