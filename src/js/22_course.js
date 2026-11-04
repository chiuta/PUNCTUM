/* ================= CURS structurat (niveluri → lecții → întrebări) ================= */
const COURSE=/*@@COURSE@@*/;
const CRSUI={
ro:{title:'Curs',intro:'Parcurs în 6 niveluri, de la fundamente la practică responsabilă. Progresul se salvează pe acest dispozitiv.',lessons:'lecții',done:'terminat',min:'min',key:'Idei-cheie',practice:'Exercițiu practic',points:'Puncte menționate',vars:'Variante menționate',check:'Verifică-ți înțelegerea',markDone:'Marchează lecția ca terminată',undo:'Anulează „terminat”',back:'← Înapoi la niveluri',backLvl:'← Înapoi la nivel',next:'Lecția următoare →',prev:'← Lecția anterioară',prog:'Progres',reset:'Resetează progresul',confirmReset:'Sigur ștergi progresul cursului?',correct:'Corect',wrong:'Greșit',empty:'Conținutul cursului nu este disponibil în acest build.',start:'Începe',cont:'Continuă',review:'Recitește',overall:'Progres total'},
en:{title:'Course',intro:'A 6-level path from fundamentals to responsible practice. Progress is saved on this device.',lessons:'lessons',done:'done',min:'min',key:'Key ideas',practice:'Practical exercise',points:'Points mentioned',vars:'Variants mentioned',check:'Check your understanding',markDone:'Mark lesson as done',undo:'Undo “done”',back:'← Back to levels',backLvl:'← Back to level',next:'Next lesson →',prev:'← Previous lesson',prog:'Progress',reset:'Reset progress',confirmReset:'Delete course progress?',correct:'Correct',wrong:'Wrong',empty:'Course content is not available in this build.',start:'Start',cont:'Continue',review:'Review',overall:'Overall progress'}
};
const cu=k=>(CRSUI[S.lang]||CRSUI.ro)[k]||CRSUI.ro[k]||k;
function cst(){if(!S.course||typeof S.course!=='object')S.course={done:{},ans:{}};S.course.done=S.course.done||{};S.course.ans=S.course.ans||{};return S.course}
const CR={lvl:null,les:null};
function allLessons(){const o=[];COURSE.forEach(l=>(l.lectii||[]).forEach(x=>o.push({lv:l,le:x})));return o}
function lvlProg(l){const n=(l.lectii||[]).length;const d=(l.lectii||[]).filter(x=>cst().done[x.id]).length;return{n,d,p:n?Math.round(100*d/n):0}}
function crBar(p){return `<div style="height:8px;border-radius:6px;background:var(--soft);overflow:hidden"><div style="height:100%;width:${p}%;background:var(--acc)"></div></div>`}
function goVar(id){TF.q='';TF.cat='';TF.noNeedle=false;TF.self=false;TF.ev=false;TF.open=id;go('tech')}
function crShuffle(arr,seed){const a=arr.slice();let s=seed||1;for(let i=a.length-1;i>0;i--){s=(s*9301+49297)%233280;const j=Math.floor(s/233280*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function vCourse(){
  if(!COURSE.length)return `<h1>${esc(cu('title'))}</h1>${disc()}<p class="mut">${esc(cu('empty'))}</p>`;
  if(CR.lvl&&CR.les){const lv=COURSE.find(x=>x.id===CR.lvl);const le=lv&&(lv.lectii||[]).find(x=>x.id===CR.les);if(le)return crLesson(lv,le)}
  if(CR.lvl){const lv=COURSE.find(x=>x.id===CR.lvl);if(lv)return crLevel(lv)}
  const all=allLessons();const dn=all.filter(x=>cst().done[x.le.id]).length;const pct=all.length?Math.round(100*dn/all.length):0;
  return `<h1>${esc(cu('title'))}</h1>${disc()}<p>${esc(cu('intro'))}</p>
  <div class="card"><b>${esc(cu('overall'))}:</b> ${dn} / ${all.length} (${pct}%)${crBar(pct)}</div>
  <div class="grid" style="margin-top:.8rem">${COURSE.map((l,i)=>{const p=lvlProg(l);return `<div class="card"><h3>${i+1}. ${esc(l.titlu)}</h3><p class="mut">${esc(l.descriere||'')}</p><p class="mut">${p.n} ${esc(cu('lessons'))} · ${p.d} ${esc(cu('done'))}</p>${crBar(p.p)}<p><button class="b" onclick="CR.lvl='${esc(l.id)}';CR.les=null;render();window.scrollTo(0,0)">${p.d?(p.d>=p.n?esc(cu('review')):esc(cu('cont'))):esc(cu('start'))}</button></p></div>`}).join('')}</div>
  <p><button class="b alt" onclick="if(confirm(cu('confirmReset'))){S.course={done:{},ans:{}};save();render()}">${esc(cu('reset'))}</button></p>`;
}
function crLevel(lv){
  const p=lvlProg(lv);
  return `<h1>${esc(lv.titlu)}</h1><p><button class="b alt" onclick="CR.lvl=null;CR.les=null;render()">${esc(cu('back'))}</button></p>
  <p class="mut">${esc(lv.descriere||'')}</p><div class="card">${esc(cu('prog'))}: ${p.d} / ${p.n}${crBar(p.p)}</div>
  ${(lv.lectii||[]).map((x,i)=>`<div class="card" style="margin:.5rem 0"><h3>${i+1}. ${esc(x.titlu)} ${cst().done[x.id]?'<span class="badge" style="background:#2f7d6d">✓</span>':''}</h3><p class="mut">${x.minute||5} ${esc(cu('min'))}</p><button class="b" onclick="CR.les='${esc(x.id)}';render();window.scrollTo(0,0)">${cst().done[x.id]?esc(cu('review')):esc(cu('start'))}</button></div>`).join('')}`;
}
function crLesson(lv,le){
  const list=lv.lectii||[];const i=list.findIndex(x=>x.id===le.id);const done=!!cst().done[le.id];
  const pts=(le.puncte||[]).filter(c=>PT.some(p=>p.c===c));const vs=(le.variante||[]).map(id=>VAR.find(v=>v.id===id)).filter(Boolean);
  return `<h1>${esc(le.titlu)}</h1>
  <p><button class="b alt" onclick="CR.les=null;render()">${esc(cu('backLvl'))}</button> <span class="mut">${esc(lv.titlu)} · ${i+1}/${list.length} · ${le.minute||5} ${esc(cu('min'))}</span></p>
  <div class="card">${(le.text||[]).map(t=>`<p>${esc(t)}</p>`).join('')}</div>
  ${(le.cheie||[]).length?`<h2>${esc(cu('key'))}</h2><ul>${le.cheie.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:''}
  ${le.practica?`<div class="warn" style="background:var(--soft);border-color:var(--acc)"><b>${esc(cu('practice'))}:</b> ${esc(le.practica)}</div>`:''}
  ${pts.length?`<p><b>${esc(cu('points'))}:</b> ${pts.map(c=>`<span class="tag">${ptLink(c)}</span>`).join('')}</p>`:''}
  ${vs.length?`<p><b>${esc(cu('vars'))}:</b> ${vs.map(v=>`<span class="tag"><a href="#tech" onclick="goVar('${esc(v.id)}');return false">${esc(v.n)}</a></span>`).join('')}</p>`:''}
  ${(le.intrebari||[]).length?`<h2>${esc(cu('check'))}</h2>${le.intrebari.map((q,qi)=>crQuestion(le,q,qi)).join('')}`:''}
  <p>${done?`<button class="b alt" onclick="cst().done['${esc(le.id)}']=false;save();render()">${esc(cu('undo'))}</button>`:`<button class="b" onclick="cst().done['${esc(le.id)}']=true;save();render()">${esc(cu('markDone'))}</button>`}</p>
  <div class="bar">${i>0?`<button class="b alt" onclick="CR.les='${esc(list[i-1].id)}';render();window.scrollTo(0,0)">${esc(cu('prev'))}</button>`:''}${i<list.length-1?`<button class="b" onclick="CR.les='${esc(list[i+1].id)}';render();window.scrollTo(0,0)">${esc(cu('next'))}</button>`:''}</div>`;
}
function crQuestion(le,q,qi){
  const key=le.id+':'+qi;const a=cst().ans[key];
  const opts=crShuffle([q.corect,...(q.gresite||[])],qi*7+le.id.length*13+3);
  return `<div class="card" style="margin:.5rem 0"><p><b>${esc(q.q)}</b></p>${opts.map(o=>{let c='';if(a!==undefined){if(o===q.corect)c=' ok';else if(a===o)c=' no'}return `<button class="opt${c}" ${a!==undefined?'disabled':''} onclick="crAnswer('${esc(key)}',${JSON.stringify(o).replace(/"/g,'&quot;')})">${esc(o)}</button>`}).join('')}
  ${a!==undefined?`<p class="mut"><b>${a===q.corect?esc(cu('correct')):esc(cu('wrong'))}.</b> ${esc(q.explicatie||'')}</p>`:''}</div>`;
}
function crAnswer(key,o){cst().ans[key]=o;save();render()}
regView('course',vCourse,{ro:'Curs',en:'Course',fr:'Cours',it:'Corso',es:'Curso',pt:'Curso',de:'Kurs',hu:'Tanfolyam'},{after:'safe'});
