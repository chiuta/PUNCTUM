/* ================= PROFIL & JURNAL: profil, jurnal, plan, setări, transfer, imprimare ================= */
const HX=['Ștergi tot jurnalul? Nu se poate anula.','Nu ai puncte favorite.','Înlocuiești datele curente cu cele importate?','Ștergi toate datele (favorite, rutine, jurnal, plan, profil)? Nu se poate anula.','Ștergi această intrare din jurnal?'];
const EU={tab:'profil',pk:'p',pi:0,pt:'08:00',pd:[1,2,3,4,5,6,7],code:'',msg:''};
const DAYN=['Lu','Ma','Mi','Jo','Vi','Sâ','Du'];
function euTab(t){EU.tab=t;EU.msg='';render()}

/* ---------- profil ---------- */
function euProfil(){
  return `${EU.msg?`<p class="w pw" role="status">${esc(EU.msg)}</p>`:''}<p>Bifează situațiile care ți se potrivesc. Aplicația le păstrează doar pe acest dispozitiv și le folosește ca să marcheze punctele, variantele și sesiunile nepotrivite pentru tine. Nu este un diagnostic și nu înlocuiește medicul.</p>
  <p class="mut">Profilul marchează puncte, variante, combinații și secvențe de masaj. La sesiunile simple de presopunctură, poarta de siguranță ține cont doar de sarcină, anticoagulante, cancer, circulația și sensibilitatea picioarelor și limfedem; pentru orice altă situație bifată, întreabă medicul înainte de a apăsa ferm.</p>
  ${PFLAGS.map(f=>`<label class="mut" style="display:flex;gap:.6rem;align-items:flex-start;margin:.5rem 0"><input type="checkbox" style="flex:none;min-width:0;width:auto;margin-top:.25rem" ${profOn(f[0])?'checked':''} onchange="euFlag('${f[0]}',this.checked)"> <span>${esc(f[1])}</span></label>`).join('')}
  <div class="warn">Dacă nu bifezi nimic, aplicația nu poate ști ce nu ți se potrivește. Când ai o boală sau iei un tratament, întreabă medicul înainte de masaj sau presopunctură.</div>`;
}
function euFlag(k,v){if(v)S.prof[k]=true;else delete S.prof[k];save()}

/* ---------- jurnal ---------- */
function fmtD(t){const d=new Date(t);const p=n=>String(n).padStart(2,'0');return `${p(d.getDate())}.${p(d.getMonth()+1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`}
function jrStats(){
  const L=S.log.filter(x=>x.b!=null&&x.a!=null);
  if(!L.length)return null;
  const mb=L.reduce((s,x)=>s+x.b,0)/L.length,ma=L.reduce((s,x)=>s+x.a,0)/L.length;
  return{n:L.length,mb:mb.toFixed(1),ma:ma.toFixed(1),d:(ma-mb).toFixed(1),imp:L.filter(x=>x.a<x.b).length,same:L.filter(x=>x.a===x.b).length,worse:L.filter(x=>x.a>x.b).length};
}
function jrChart(){
  const L=S.log.filter(x=>x.b!=null&&x.a!=null).slice(-30);if(L.length<2)return '';
  const W=300,H=110,px=i=>10+i*(W-20)/(L.length-1),py=v=>H-10-v*(H-20)/10;
  const line=(k,c)=>`<polyline fill="none" stroke="${c}" stroke-width="2" points="${L.map((x,i)=>px(i)+','+py(x[k])).join(' ')}"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:420px" role="img" aria-label="Grafic jurnal"><line x1="10" y1="${py(0)}" x2="${W-10}" y2="${py(0)}" stroke="var(--line)"/><line x1="10" y1="${py(10)}" x2="${W-10}" y2="${py(10)}" stroke="var(--line)"/>${line('b','var(--acc2)')}${line('a','var(--acc)')}</svg>
  <p class="mut"><span style="color:var(--acc2)">●</span> Înainte · <span style="color:var(--acc)">●</span> După</p>`;
}
function euJurnal(){
  const st=jrStats();
  return `<p>Scorurile (0–10) înainte și după fiecare sesiune ghidată se salvează doar pe acest dispozitiv. Notează scorul din fereastra „Înainte de sesiune".</p>
  ${st?`<div class="card"><p><b>${st.n}</b> sesiuni cu scor complet</p><p>Media înainte: <b>${st.mb}</b> · media după: <b>${st.ma}</b> · diferență: <b>${st.d}</b></p><p class="mut">Mai bine: <b>${st.imp}</b> · la fel: <b>${st.same}</b> · mai rău: <b>${st.worse}</b></p>${jrChart()}</div>
  <p class="mut">Atenție: aceste cifre nu dovedesc că metoda funcționează. Relaxarea, atenția acordată, trecerea timpului și variația naturală a durerii influențează scorul. Dacă durerea nu scade sau se agravează, vorbește cu medicul.</p>`:`<p class="mut">Nu există încă sesiuni cu scor complet.</p>`}
  ${S.log.length?`<div class="tw"><table><tr><th>Data</th><th>Sesiune</th><th>Înainte</th><th>După</th><th>Notă</th><th></th></tr>${S.log.slice().reverse().map((x,i)=>{const ix=S.log.length-1-i;return `<tr><td>${esc(fmtD(x.t))}</td><td>${esc(x.ti)}</td><td>${x.b==null?'—':x.b}</td><td>${x.a==null?'—':x.a}</td><td>${esc(x.n)}</td><td><button class="b alt" aria-label="Șterge" onclick="jrDel(${ix})">✕</button></td></tr>`}).join('')}</table></div>
  <div class="bar"><button class="b alt" onclick="jrCsv()">⬇ Exportă CSV</button><button class="b alt" onclick="jrClear()">Șterge tot jurnalul</button></div>`:''}`;
}
function jrDel(i){if(!confirm(trWhole('Ștergi această intrare din jurnal?')))return;S.log.splice(i,1);save();render()}
function jrClear(){if(confirm(trWhole('Ștergi tot jurnalul? Nu se poate anula.'))){S.log=[];save();render()}}
function dl(name,mime,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:mime}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},30000)}
function csvCell(s){let t=String(s==null?'':s);if(/^[=+\-@\t\r]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'}
function jrCsv(){
  const rows=[['data','sesiune','inainte','dupa','nota','feedback_partener']].concat(S.log.map(x=>[fmtD(x.t),x.ti,x.b==null?'':x.b,x.a==null?'':x.a,x.n,x.f]));
  dl('punctum-jurnal.csv','text/csv;charset=utf-8','\ufeff'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n'));
}

/* ---------- plan zilnic ---------- */
function planItem(k,i){return k==='p'?{n:PROT[i].t,min:Math.max(1,Math.round(PROT[i].p.length*SES.sec/60))}:k==='s'?{n:MASS[i].n,min:Math.max(1,Math.round(MASS[i].sec/60))}:{n:MASC[i].n,min:MASC[i].dur_min||10}}
function planStart(ix){const x=S.plan[ix];if(!x)return;if(x.k==='p')startSes(x.i);else masStart(x.k,x.i)}
function planOpts(){
  const g=(k,A,f)=>`<optgroup label="${k}">${A.map((a,i)=>`<option value="${f}${i}" ${EU.pk+EU.pi===f+i?'selected':''}>${esc(a)}</option>`).join('')}</optgroup>`;
  return g('Presopunctură',PROT.map(x=>x.t),'p')+g('Puncte apăsate simultan',MASS.map(x=>x.n),'s')+g('Secvențe de masaj',MASC.map(x=>x.n),'c');
}
function planAdd(){
  const v=$('#plSel').value;const k=v[0],i=+v.slice(1);const time=$('#plTime').value||'08:00';
  if(!EU.pd.length)return;
  if(S.plan.length>=60)return;
  S.plan.push({k,i,time,days:EU.pd.slice().sort()});EU.pk=k;EU.pi=i;EU.pt=time;save();render();
}
function planDay(d,on){EU.pd=EU.pd.filter(x=>x!==d);if(on)EU.pd.push(d);}
function planDel(i){S.plan.splice(i,1);save();render()}
function euPlan(){
  const wd=((new Date().getDay()+6)%7)+1;
  const today=S.plan.map((x,i)=>({x,i})).filter(o=>o.x.days.includes(wd)).sort((a,b)=>a.x.time.localeCompare(b.x.time));
  return `<p>Alcătuiește un plan săptămânal de sesiuni. Poți vedea ce ai azi și poți exporta planul în calendar (fișier .ics) pentru memento-uri.</p>
  <h3>Azi</h3>${today.length?`<ul>${today.map(o=>`<li><b>${esc(o.x.time)}</b> ${esc(planItem(o.x.k,o.x.i).n)} <button class="b" onclick="planStart(${o.i})">▶</button></li>`).join('')}</ul>`:'<p class="mut">Nimic planificat pentru azi.</p>'}
  <h3>Adaugă în plan</h3>
  <div class="bar"><select id="plSel" aria-label="Sesiune">${planOpts()}</select><input id="plTime" type="time" value="${esc(EU.pt)}" aria-label="Ora" style="max-width:8rem"></div>
  <div class="bar">${DAYN.map((d,i)=>`<label class="mut" style="display:flex;gap:.3rem;align-items:center"><input type="checkbox" style="flex:none;min-width:0;width:auto" ${EU.pd.includes(i+1)?'checked':''} onchange="planDay(${i+1},this.checked)">${esc(d)}</label>`).join('')}<button class="b" onclick="planAdd()">+ Adaugă</button></div>
  <h3>Planul meu</h3>
  ${S.plan.length?`<div class="tw"><table><tr><th>Ora</th><th>Sesiune</th><th>Zile</th><th></th></tr>${S.plan.map((x,i)=>`<tr><td>${esc(x.time)}</td><td>${esc(planItem(x.k,x.i).n)}</td><td>${x.days.map(d=>esc(DAYN[d-1])).join(' ')}</td><td><button class="b alt" aria-label="Șterge" onclick="planDel(${i})">✕</button></td></tr>`).join('')}</table></div>
  <div class="bar"><button class="b alt" onclick="planIcs()">⬇ Exportă în calendar (.ics)</button><button class="b alt" onclick="planPrint()">🖨 Imprimă planul</button></div>`:'<p class="mut">Planul este gol.</p>'}`;
}
function icsEsc(s){return String(s).replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n')}
function icsFold(l){ // RFC 5545: maximum 75 de octeți pe linie (UTF-8), fără a tăia un caracter
  const enc=new TextEncoder(),o=[];let cur='',n=0,lim=75;
  for(const ch of l){const b=enc.encode(ch).length;if(n+b>lim){o.push(cur);cur=' ';n=1;lim=75}cur+=ch;n+=b}
  o.push(cur);return o.join('\r\n')}
function icsBuild(){
  const p=n=>String(n).padStart(2,'0'),A=['MO','TU','WE','TH','FR','SA','SU'];
  const now=new Date();const stamp=`${now.getUTCFullYear()}${p(now.getUTCMonth()+1)}${p(now.getUTCDate())}T${p(now.getUTCHours())}${p(now.getUTCMinutes())}${p(now.getUTCSeconds())}Z`;
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//PUNCTUM//plan//RO','CALSCALE:GREGORIAN'];
  const seen={};
  S.plan.forEach((x,i)=>{
    if(!x.days.length)return;
    const it=planItem(x.k,x.i);const d=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    for(let n=0;n<7&&!x.days.includes(((d.getDay()+6)%7)+1);n++)d.setDate(d.getDate()+1);
    const ds=`${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}`,hm=x.time.replace(':','');
    const u0=`punctum-${x.k}${x.i}-${hm}-${x.days.join('')}`;seen[u0]=(seen[u0]||0)+1;const uid=u0+(seen[u0]>1?'-'+seen[u0]:'')+'@punctum.local'; // UID stabil: reexportul actualizează seria, nu o dublează
    L.push('BEGIN:VEVENT',`UID:${uid}`,`DTSTAMP:${stamp}`,`DTSTART:${ds}T${hm}00`,`DURATION:PT${it.min}M`,`RRULE:FREQ=WEEKLY;BYDAY=${x.days.map(k=>A[k-1]).join(',')}`,icsFold('SUMMARY:'+icsEsc('PUNCTUM: '+it.n)),icsFold('DESCRIPTION:'+icsEsc('Sesiune ghidată PUNCTUM. Material educativ; nu înlocuiește sfatul medicului.')),'BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:PUNCTUM','END:VALARM','END:VEVENT');
  });
  L.push('END:VCALENDAR');return L.join('\r\n')+'\r\n';
}
function planIcs(){if(!S.plan.length)return;dl('punctum-plan.ics','text/calendar;charset=utf-8',icsBuild())}

/* ---------- imprimare ---------- */
function printHtml(html){
  let d=document.getElementById('cprint');if(d)d.remove();
  d=document.createElement('div');d.id='cprint';d.innerHTML=html;document.body.appendChild(d);if(typeof trNode==='function')trNode(d);document.body.classList.add('cprinting');
  let tm=0;const done=()=>{clearTimeout(tm);document.body.classList.remove('cprinting');const x=document.getElementById('cprint');if(x)x.remove();window.removeEventListener('afterprint',done)};
  window.addEventListener('afterprint',done);
  try{window.print()}catch(e){}
  tm=setTimeout(done,120000); // plasă de siguranță; curățarea reală se face la „afterprint” (pe mobil print() nu blochează)
}
function printFavs(){
  const L=S.fav.map(k=>{const c=k.split('|')[0];return PT.find(p=>p.c===c)}).filter(Boolean);
  if(!L.length){alert(trWhole('Nu ai puncte favorite.'));return}
  printHtml(`<h1>PUNCTUM — carduri de puncte</h1><p>Material educativ; nu înlocuiește sfatul medicului. Presiune confortabilă, 30–60 s, respirație lentă.</p><div class="pcards">${L.map(p=>`<div class="pcard"><h3>${esc(p.c)} ${esc(p.p)}</h3><p><b>Localizare:</b> ${esc(p.l)}</p><p><b>Indicații tradiționale:</b> ${esc(p.u)}</p>${p.w?`<p><b>⚠</b> ${esc(p.w)}</p>`:''}</div>`).join('')}</div>`);
}
function planPrint(){
  if(!S.plan.length)return;
  printHtml(`<h1>PUNCTUM — planul meu</h1><table><tr><th>Ora</th><th>Sesiune</th><th>Zile</th></tr>${S.plan.map(x=>`<tr><td>${esc(x.time)}</td><td>${esc(planItem(x.k,x.i).n)}</td><td>${x.days.map(d=>esc(DAYN[d-1])).join(' ')}</td></tr>`).join('')}</table><p>Material educativ; nu înlocuiește sfatul medicului.</p>`);
}

/* ---------- setări, accesibilitate, transfer ---------- */
function accSet(k,v){S.acc[k]=v;save();applyAcc();render()}
function euSetari(){
  const a=S.acc;
  return `<h3>Accesibilitate</h3>
  <div class="bar"><button class="b alt" onclick="accSet('size',Math.max(0,S.acc.size-1))" aria-label="Text mai mic">A−</button><span class="mut" style="align-self:center">${esc(String(Math.round(ACC_FZ[a.size]*100)))}%</span><button class="b alt" onclick="accSet('size',Math.min(3,S.acc.size+1))" aria-label="Text mai mare">A+</button></div>
  <label class="mut" style="display:flex;gap:.6rem;margin:.4rem 0"><input type="checkbox" style="flex:none;min-width:0;width:auto" ${a.hc?'checked':''} onchange="accSet('hc',this.checked)"> Contrast ridicat</label>
  <label class="mut" style="display:flex;gap:.6rem;margin:.4rem 0"><input type="checkbox" style="flex:none;min-width:0;width:auto" ${a.rm?'checked':''} onchange="accSet('rm',this.checked)"> Fără animații</label>
  <label class="mut" style="display:flex;gap:.6rem;margin:.4rem 0"><input type="checkbox" style="flex:none;min-width:0;width:auto" ${a.voice?'checked':''} onchange="accSet('voice',this.checked)"> Voce în sesiunile ghidate (sinteza vocală a browserului)</label>
  <label class="mut" style="display:flex;gap:.6rem;margin:.4rem 0"><input type="checkbox" style="flex:none;min-width:0;width:auto" ${a.ring?'checked':''} onchange="accSet('ring',this.checked)"> Cerc de respirație în sesiuni</label>
  <h3>Transfer între dispozitive</h3>
  <p class="mut">Datele rămân pe acest dispozitiv. Pentru a le muta, exportă un fișier sau un cod și importă-l pe celălalt dispozitiv.</p>
  <div class="bar"><button class="b alt" onclick="stExport()">⬇ Exportă fișier</button><label class="b alt" style="cursor:pointer">⬆ Importă fișier<input type="file" accept="application/json,.json" style="display:none" onchange="stImportFile(this.files[0]);this.value=''"></label></div>
  <div class="bar"><button class="b alt" onclick="stCode()">Generează cod</button></div>
  <textarea id="stTxt" rows="4" aria-label="Cod" style="width:100%;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink);padding:.5rem">${esc(EU.code)}</textarea>
  <div class="bar"><button class="b alt" onclick="stImportCode()">Importă din cod</button></div>
  ${EU.msg?`<p class="w pw" role="status">${esc(EU.msg)}</p>`:''}
  <h3>Date</h3>
  <button class="b alt" onclick="stReset()">Șterge toate datele din această aplicație</button>`;
}
function stState(){const o=Object.assign({},S);delete o.pre;delete o.preReg;return JSON.stringify(o)} // triajul recent nu se transferă între dispozitive/persoane
function stExport(){const d=new Date(),p=n=>String(n).padStart(2,'0');dl(`punctum-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}.json`,'application/json',stState())}
function b64e(s){return btoa(unescape(encodeURIComponent(s)))}
function b64d(s){return decodeURIComponent(escape(atob(s)))}
function stCode(){EU.code='PUNCTUM1:'+b64e(stState());render()}
function stApply(txt){
  let j;try{j=JSON.parse(txt)}catch(e){EU.msg='Datele nu sunt valide.';render();return}
  if(!j||typeof j!=='object'||Array.isArray(j)){EU.msg='Datele nu sunt valide.';render();return}
  if(!confirm(trWhole('Înlocuiești datele curente cu cele importate?')))return;
  // doar cheile cunoscute (fără triaj recent); se salvează întâi, iar dacă stocarea eșuează starea curentă rămâne neatinsă
  const clean={};SKEYS.forEach(k=>{if(k!=='pre'&&k!=='preReg'&&Object.prototype.hasOwnProperty.call(j,k))clean[k]=j[k]});
  const hadProf=Object.prototype.hasOwnProperty.call(clean,'prof');
  try{localStorage.setItem('punctum',JSON.stringify(clean))}catch(e){EU.msg='Nu s-a putut salva (spațiu insuficient sau stocare blocată). Datele curente au rămas neschimbate.';render();return}
  Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{lang:'ro',theme:'auto',fav:[],best:0});
  load();save();document.documentElement.lang=S.lang;applyAcc();applyTheme();applyI18n();
  EU.tab='profil';EU.msg='Importat. '+(hadProf?'Verifică acum profilul de siguranță: a fost înlocuit cu cel din fișier.':'Fișierul nu conținea profil de siguranță, deci profilul tău a fost șters. Completează-l din nou.');
  render();if(typeof trAll==='function')trAll();
}
function stImportFile(f){if(!f)return;if(f.size>5e6){EU.msg='Fișier prea mare.';render();return}const r=new FileReader();r.onload=()=>stApply(String(r.result));r.onerror=()=>{EU.msg='Datele nu sunt valide.';render()};r.readAsText(f)}
function stImportCode(){const t=($('#stTxt').value||'').trim();if(!t.startsWith('PUNCTUM1:')){EU.msg='Cod invalid.';render();return}let s;try{s=b64d(t.slice(9))}catch(e){EU.msg='Cod invalid.';render();return}stApply(s)}
function stReset(){if(confirm(trWhole('Ștergi toate datele (favorite, rutine, jurnal, plan, profil)? Nu se poate anula.'))){try{localStorage.removeItem('punctum');localStorage.removeItem('acupunctura')}catch(e){}Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{lang:'ro',theme:'auto',fav:[],best:0});load();applyAcc();applyTheme();applyI18n();EU.msg='';render();if(typeof trAll==='function')trAll()}}

/* ---------- vederea ---------- */
function vEu(){
  const T2=[['profil','Profil de siguranță'],['jurnal','Jurnal'],['plan','Plan'],['setari','Setări']];
  const body=EU.tab==='jurnal'?euJurnal():EU.tab==='plan'?euPlan():EU.tab==='setari'?euSetari():euProfil();
  return `<h1>Profil & jurnal</h1>${disc()}
  <div class="bar" role="tablist">${T2.map(t=>`<button class="b ${EU.tab===t[0]?'':'alt'}" role="tab" aria-selected="${EU.tab===t[0]}" onclick="euTab('${t[0]}')">${esc(t[1])}</button>`).join('')}</div>
  ${body}`;
}
regView('eu',vEu,{ro:'Profil & jurnal',en:'Profile & journal',fr:'Profil et journal',it:'Profilo e diario',es:'Perfil y diario',pt:'Perfil e diário',de:'Profil & Tagebuch',hu:'Profil és napló'},{});
