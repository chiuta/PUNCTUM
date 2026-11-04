/* ================= STUDIU: quiz extins (bancă de întrebări) + flashcarduri cu repetiție spațiată ================= */
const QZX=`/*@@QUIZ@@*/`;
const QBANK=QZX.split('\n').filter(l=>l.trim()&&!l.trim().startsWith('#')).map(l=>{const a=l.split('¦');return a.length>=8?{q:a[0],ok:a[1],w:[a[2],a[3],a[4]],e:a[5],cat:a[6],lvl:+a[7]||1}:null}).filter(Boolean);
const STUI={
ro:{title:'Studiu',tabQuiz:'Quiz',tabCards:'Flashcarduri',tabProg:'Progres',cat:'Categorie',all:'Toate',lvl:'Nivel',anyLvl:'Orice nivel',n:'Număr de întrebări',mode:'Mod',practice:'Exercițiu (feedback imediat)',exam:'Examen (rezultat la final)',start:'Începe',q:'Întrebarea',of:'din',score:'scor',best:'record',next:'Următoarea →',result:'Rezultat',again:'Din nou',retryWrong:'Repetă greșelile',review:'Ce ai greșit',yourAns:'Răspunsul tău',correctAns:'Corect',bank:'întrebări în bancă',time:'Timp',finish:'Termină',skip:'Sari peste',cats:{istorie:'Istorie',teorie:'Teorie',meridiane:'Meridiane',puncte:'Puncte',cun:'Cun',variante:'Variante',siguranță:'Siguranță',dovezi:'Dovezi',general:'General',pinyin:'Pinyin',ore:'Ore',element:'Elemente'},deck:'Pachet',dPts:'Puncte: cod → nume și localizare',dLoc:'Puncte: localizare → cod',dMer:'Meridiane',dVar:'Variante',dGlo:'Glosar',due:'scadente',newc:'noi',learned:'învățate',flip:'Arată răspunsul',again2:'Din nou',hard:'Greu',good:'Bine',easy:'Ușor',noDue:'Nimic scadent acum. Revino mai târziu sau adaugă cărți noi.',moreNew:'+10 cărți noi',stats:'Statistici',weak:'Categorii de întărit',acc:'acuratețe',answered:'răspunsuri',resetStats:'Resetează statisticile',confirmReset:'Ștergi statisticile și progresul flashcardurilor?',noStats:'Încă nu ai răspunsuri înregistrate.',reveal:'Răspuns'},
en:{title:'Study',tabQuiz:'Quiz',tabCards:'Flashcards',tabProg:'Progress',cat:'Category',all:'All',lvl:'Level',anyLvl:'Any level',n:'Number of questions',mode:'Mode',practice:'Practice (instant feedback)',exam:'Exam (result at the end)',start:'Start',q:'Question',of:'of',score:'score',best:'best',next:'Next →',result:'Result',again:'Again',retryWrong:'Retry mistakes',review:'What you missed',yourAns:'Your answer',correctAns:'Correct',bank:'questions in the bank',time:'Time',finish:'Finish',skip:'Skip',cats:{istorie:'History',teorie:'Theory',meridiane:'Meridians',puncte:'Points',cun:'Cun',variante:'Variants',siguranță:'Safety',dovezi:'Evidence',general:'General',pinyin:'Pinyin',ore:'Hours',element:'Elements'},deck:'Deck',dPts:'Points: code → name and location',dLoc:'Points: location → code',dMer:'Meridians',dVar:'Variants',dGlo:'Glossary',due:'due',newc:'new',learned:'learned',flip:'Show answer',again2:'Again',hard:'Hard',good:'Good',easy:'Easy',noDue:'Nothing due now. Come back later or add new cards.',moreNew:'+10 new cards',stats:'Statistics',weak:'Categories to reinforce',acc:'accuracy',answered:'answers',resetStats:'Reset statistics',confirmReset:'Delete statistics and flashcard progress?',noStats:'No recorded answers yet.',reveal:'Answer'}
};
const su=k=>{const d=STUI[S.lang]||STUI.ro;return d[k]!==undefined?d[k]:STUI.ro[k]};
const suc=c=>{const d=(STUI[S.lang]||STUI.ro).cats||{};return d[c]||STUI.ro.cats[c]||c};
function sst(){if(!S.study||typeof S.study!=='object')S.study={by:{},fc:{},n:0,ok:0};S.study.by=S.study.by||{};S.study.fc=S.study.fc||{};return S.study}
const SQ={tab:'quiz',cat:'',lvl:0,n:10,mode:'practice',run:null,deck:'pts',fc:{queue:[],flip:false,extra:0}};
function qPool(){
  const pool=QBANK.map(x=>({...x,w:x.w.slice()}));
  QM.forEach(x=>pool.push({q:x[0],ok:x[1],w:x[2].slice(0,3),e:'',cat:'general',lvl:1}));
  return pool;
}
function qGen(n){ // întrebări generate din date (pinyin, ore, elemente)
  const out=[];const sh2=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const pp=PT.filter(p=>p.p&&p.c.indexOf('EX')!==0);
  for(let k=0;k<n;k++){
    const t=k%3;
    if(t===0&&pp.length>6){const p=sh2(pp)[0];const w=sh2(pp.filter(x=>x.p!==p.p)).slice(0,3).map(x=>x.p);out.push({q:`Care este numele pinyin al punctului ${p.c}?`,ok:p.p,w,e:`${p.c} = ${p.p}${p.mn?' '+p.mn:''}.`,cat:'pinyin',lvl:2})}
    else if(t===1){const ms=MER.filter(x=>x.t&&x.t!=='—');const m=sh2(ms)[0];const w=sh2(ms.filter(x=>x.t!==m.t)).slice(0,3).map(x=>x.t);out.push({q:`În ce interval orar este maximul meridianului ${m.n}?`,ok:m.t,w,e:`${m.n}: ${m.t}.`,cat:'ore',lvl:2})}
    else{const ms=MER.filter(x=>x.el!=='Extra');const m=sh2(ms)[0];const all=['Lemn','Foc','Pământ','Metal','Apă'];out.push({q:`Cărui element aparține meridianul ${m.n}?`,ok:m.el,w:sh2(all.filter(x=>x!==m.el)).slice(0,3),e:`${m.n}: ${m.el}.`,cat:'element',lvl:1})}
  }
  return out;
}
function qStart(items){
  const sh2=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const it=sh2(items).slice(0,SQ.n==='all'?items.length:+SQ.n).map(x=>({...x,o:sh2([x.ok,...x.w.filter(Boolean)])}));
  SQ.run={items:it,i:0,sc:0,ans:null,picks:[],t0:Date.now(),done:false};render();
}
function qBegin(){
  let pool=qPool().concat(qGen(12));
  if(SQ.cat)pool=pool.filter(x=>x.cat===SQ.cat);
  if(SQ.lvl)pool=pool.filter(x=>x.lvl===+SQ.lvl);
  if(!pool.length)return;
  qStart(pool);
}
function qPick(i){
  const r=SQ.run;if(!r||r.done)return;const it=r.items[r.i];const val=it.o[i];
  if(SQ.mode==='practice'&&r.ans===null){r.log=r.log||[];r.log[r.i]=val} // reținut pentru recapitulare
  if(SQ.mode==='practice'){if(r.ans!==null)return;r.ans=val}
  else{r.picks[r.i]=val}
  const ok=val===it.ok;if(SQ.mode==='practice'||!r.counted||!r.counted[r.i]){r.counted=r.counted||{};r.counted[r.i]=true;if(ok)r.sc++;
    const s=sst();const b=s.by[it.cat]=s.by[it.cat]||[0,0];b[1]++;if(ok)b[0]++;s.n++;if(ok)s.ok++;save()}
  if(SQ.mode==='exam')qNext();else render();
}
function qNext(){
  const r=SQ.run;r.i++;r.ans=null;
  if(r.i>=r.items.length){r.done=true;if(r.sc>(S.best||0)&&SQ.mode==='practice'){S.best=r.sc;save()}}
  render();
}
function vQuizRun(){
  const r=SQ.run;
  if(r.done){
    const wrong=r.items.filter((it,i)=>(SQ.mode==='exam'?r.picks[i]:r.picks[i]||null)!==it.ok&&(SQ.mode==='exam'||true));
    const mins=Math.max(1,Math.round((Date.now()-r.t0)/60000));
    return `<h2>${esc(su('result'))}: ${r.sc} / ${r.items.length}</h2><p class="mut">${esc(su('time'))}: ${mins} min</p>
    ${r.missed&&r.missed.length?'':''}
    ${qReview(r)}
    <div class="bar"><button class="b" onclick="SQ.run=null;render()">${esc(su('again'))}</button>${r.wrongIdx&&r.wrongIdx.length?'':''}<button class="b alt" onclick="qRetryWrong()">${esc(su('retryWrong'))}</button></div>`;
  }
  const it=r.items[r.i];
  return `<p class="mut">${esc(su('q'))} ${r.i+1} ${esc(su('of'))} ${r.items.length} · ${esc(su('score'))} ${r.sc} · ${esc(suc(it.cat))}</p>
  <div class="card"><h3>${esc(it.q)}</h3>
  ${it.o.map((o,i)=>{let c='';if(SQ.mode==='practice'&&r.ans!==null){if(o===it.ok)c=' ok';else if(o===r.ans)c=' no'}else if(SQ.mode==='exam'&&r.picks[r.i]===o)c=' ok';return `<button class="opt${c}" onclick="qPick(${i})">${esc(o)}</button>`}).join('')}
  ${SQ.mode==='practice'&&r.ans!==null?`<p class="mut">${r.ans===it.ok?'✔':'✘'} ${esc(it.e||'')}</p><button class="b" onclick="qNext()">${esc(r.i<r.items.length-1?su('next'):su('finish'))}</button>`:''}
  ${SQ.mode==='exam'?`<button class="b alt" onclick="qNext()">${esc(su('skip'))}</button>`:''}</div>`;
}
function qReview(r){
  // în modul practică, greșelile se rețin în r.picks prin pickLog; aici reconstruim din contorul pe întrebare
  const miss=[];r.items.forEach((it,i)=>{const p=SQ.mode==='exam'?r.picks[i]:(r.log&&r.log[i]);if(p!==it.ok)miss.push({it,p})});
  r.wrongItems=miss.map(m=>m.it);
  if(!miss.length)return '';
  return `<h3>${esc(su('review'))}</h3>`+miss.map(m=>`<div class="card" style="margin:.4rem 0"><p><b>${esc(m.it.q)}</b></p><p class="mut">${esc(su('yourAns'))}: ${esc(m.p||'—')} · ${esc(su('correctAns'))}: <b>${esc(m.it.ok)}</b></p>${m.it.e?`<p class="mut">${esc(m.it.e)}</p>`:''}</div>`).join('');
}
function qRetryWrong(){const r=SQ.run;if(!r||!r.wrongItems||!r.wrongItems.length){SQ.run=null;render();return}SQ.n='all';qStart(r.wrongItems)}
/* --- flashcarduri (Leitner) --- */
const LEIT=[0,1,3,7,16,35];
function fcDeck(k){
  if(k==='pts')return PT.map(p=>({id:'pt:'+p.c,f:`<b style="font-size:1.5rem">${esc(p.c)}</b>`,b:`<b>${esc(p.p)}</b>${p.mn?' — <i>'+esc(p.mn)+'</i>':''}<br>${esc(p.l)}<br><span class="mut">${esc(p.u)}</span>${p.w?'<br><span style="color:var(--acc2)">'+esc(p.w)+'</span>':''}`}));
  if(k==='loc')return PT.filter(p=>p.l).map(p=>({id:'pl:'+p.c,f:esc(p.l),b:`<b style="font-size:1.4rem">${esc(p.c)}</b> ${esc(p.p)}`}));
  if(k==='mer')return MER.map(m=>({id:'m:'+m.c,f:`<b>${esc(m.n)}</b> (${esc(m.c)})`,b:`Element: ${esc(m.el)} · ${esc(m.yy)} · ${esc(m.lim)} · ${m.pts} puncte${m.t!=='—'?` · maxim ${esc(m.t)}`:''}<br>${esc(m.path)}<br><span class="mut">${esc(m.key)}</span>`}));
  if(k==='var')return VAR.map(v=>({id:'v:'+v.id,f:`<b>${esc(v.n)}</b>`,b:`${esc(v.pr)}<br><span class="mut">${esc(v.sig)}</span>`}));
  if(k==='glo')return GLO.map((g,i)=>({id:'g:'+i,f:`<b>${esc(g[0])}</b>`,b:esc(g[1])}));
  return [];
}
function fcState(id){const s=sst().fc[id];return s||null}
function fcBuild(){
  const cards=fcDeck(SQ.deck);const now=Date.now();const st=sst().fc;
  const due=cards.filter(c=>st[c.id]&&st[c.id].d<=now);
  const fresh=cards.filter(c=>!st[c.id]);
  const extra=SQ.fc.extra||0;
  SQ.fc.queue=due.concat(fresh.slice(0,10+extra));
  SQ.fc.flip=false;SQ.fc.stat={due:due.length,fresh:fresh.length,learned:cards.filter(c=>st[c.id]&&st[c.id].b>=3).length,total:cards.length};
}
function fcRate(r){ // 0 din nou, 1 greu, 2 bine, 3 ușor
  const q=SQ.fc.queue;const c=q.shift();if(!c)return;const s=sst().fc;const cur=s[c.id]||{b:0,d:0};
  let b=cur.b;if(r===0)b=1;else if(r===1)b=Math.max(1,b);else if(r===2)b=Math.min(LEIT.length-1,b+1);else b=Math.min(LEIT.length-1,b+2);
  if(b<1)b=1;const days=LEIT[b];s[c.id]={b,d:Date.now()+days*86400000-(r===0?86400000:0)};
  if(r===0)q.push(c); // reia în sesiune
  save();SQ.fc.flip=false;render();
}
function vCards(){
  if(!SQ.fc.queue||SQ.fc.queue===undefined||SQ.fc.built!==SQ.deck){fcBuild();SQ.fc.built=SQ.deck}
  const q=SQ.fc.queue;const st=SQ.fc.stat||{due:0,fresh:0,learned:0,total:0};
  const decks=[['pts','dPts'],['loc','dLoc'],['mer','dMer'],['var','dVar'],['glo','dGlo']];
  return `<div class="bar"><label class="mut">${esc(su('deck'))}: <select onchange="SQ.deck=this.value;SQ.fc.built=null;SQ.fc.extra=0;render()">${decks.map(d=>`<option value="${d[0]}" ${SQ.deck===d[0]?'selected':''}>${esc(su(d[1]))}</option>`).join('')}</select></label></div>
  <p class="mut">${st.due} ${esc(su('due'))} · ${st.fresh} ${esc(su('newc'))} · ${st.learned}/${st.total} ${esc(su('learned'))}</p>
  ${q.length?`<div class="card" style="text-align:center;min-height:160px"><div style="font-size:1.1rem;margin:.4rem 0">${q[0].f}</div>${SQ.fc.flip?`<hr style="border:0;border-top:1px solid var(--line)"><div style="text-align:left">${q[0].b}</div>`:''}</div>
  <div class="bar">${SQ.fc.flip?`<button class="b alt" onclick="fcRate(0)">${esc(su('again2'))}</button><button class="b alt" onclick="fcRate(1)">${esc(su('hard'))}</button><button class="b" onclick="fcRate(2)">${esc(su('good'))}</button><button class="b" onclick="fcRate(3)">${esc(su('easy'))}</button>`:`<button class="b" onclick="SQ.fc.flip=true;render()">${esc(su('flip'))}</button>`}</div><p class="mut">${q.length} ↓</p>`
  :`<div class="card"><p>${esc(su('noDue'))}</p><button class="b" onclick="SQ.fc.extra=(SQ.fc.extra||0)+10;SQ.fc.built=null;render()">${esc(su('moreNew'))}</button></div>`}`;
}
function vProgress(){
  const s=sst();const keys=Object.keys(s.by);
  if(!s.n)return `<p class="mut">${esc(su('noStats'))}</p>`;
  const rows=keys.map(k=>({k,ok:s.by[k][0],n:s.by[k][1],p:Math.round(100*s.by[k][0]/s.by[k][1])})).sort((a,b)=>a.p-b.p);
  return `<div class="card"><b>${s.ok} / ${s.n}</b> ${esc(su('answered'))} · ${esc(su('acc'))} ${Math.round(100*s.ok/s.n)}%</div>
  <h3>${esc(su('weak'))}</h3><div class="tw"><table>${rows.map(r=>`<tr><td>${esc(suc(r.k))}</td><td style="width:50%"><div style="height:8px;border-radius:6px;background:var(--soft);overflow:hidden"><div style="height:100%;width:${r.p}%;background:${r.p<60?'var(--acc2)':'var(--acc)'}"></div></div></td><td>${r.p}% (${r.ok}/${r.n})</td></tr>`).join('')}</table></div>
  <p><button class="b alt" onclick="if(confirm(su('confirmReset'))){S.study={by:{},fc:{},n:0,ok:0};save();SQ.fc.built=null;render()}">${esc(su('resetStats'))}</button></p>`;
}
function vStudy(){
  const tab=SQ.tab;
  const tabs=`<div class="bar"><button class="b ${tab==='quiz'?'':'alt'}" onclick="SQ.tab='quiz';render()">${esc(su('tabQuiz'))}</button><button class="b ${tab==='cards'?'':'alt'}" onclick="SQ.tab='cards';SQ.fc.built=null;render()">${esc(su('tabCards'))}</button><button class="b ${tab==='prog'?'':'alt'}" onclick="SQ.tab='prog';render()">${esc(su('tabProg'))}</button></div>`;
  let body='';
  if(tab==='cards')body=vCards();
  else if(tab==='prog')body=vProgress();
  else if(SQ.run)body=vQuizRun();
  else{
    const cats=[...new Set(qPool().map(x=>x.cat))];
    body=`<p class="mut">${qPool().length} ${esc(su('bank'))}</p>
    <div class="card"><div class="bar">
     <label class="mut">${esc(su('cat'))}: <select onchange="SQ.cat=this.value">${'<option value="">'+esc(su('all'))+'</option>'+cats.map(c=>`<option value="${esc(c)}" ${SQ.cat===c?'selected':''}>${esc(suc(c))}</option>`).join('')}</select></label>
     <label class="mut">${esc(su('lvl'))}: <select onchange="SQ.lvl=+this.value"><option value="0">${esc(su('anyLvl'))}</option>${[1,2,3].map(l=>`<option value="${l}" ${SQ.lvl===l?'selected':''}>${l}</option>`).join('')}</select></label>
     <label class="mut">${esc(su('n'))}: <select onchange="SQ.n=this.value">${[10,20,30,'all'].map(n=>`<option value="${n}" ${String(SQ.n)===String(n)?'selected':''}>${n==='all'?esc(su('all')):n}</option>`).join('')}</select></label>
     <label class="mut">${esc(su('mode'))}: <select onchange="SQ.mode=this.value"><option value="practice" ${SQ.mode==='practice'?'selected':''}>${esc(su('practice'))}</option><option value="exam" ${SQ.mode==='exam'?'selected':''}>${esc(su('exam'))}</option></select></label>
    </div><button class="b" onclick="qBegin()">${esc(su('start'))}</button> <span class="mut">${esc(su('best'))}: ${S.best||0}</span></div>`;
  }
  return `<h1>${esc(su('title'))}</h1>${tabs}${body}`;
}
regView('quiz',vStudy,{},{nonav:true});
