/* ================= MASAJ: tehnici, puncte simultane, secvențe ================= */
const MAST=/*@@MAST@@*/;
const MASS=/*@@MASS@@*/;
const MASC=/*@@MASC@@*/;
const MF={cine:''};
const MREG={cap:'Cap',ceafa:'Ceafă',umeri:'Umeri',spate:'Spate',abdomen:'Abdomen',brate:'Brațe și mâini',picioare:'Picioare și tălpi',fata:'Față',intreg:'Corp întreg'};
function masTech(id){return (MAST.tehnici||[]).find(t=>t.id===id)}
function masPts(codes){return (codes||[]).map(c=>PT.find(x=>x.c===c)).filter(Boolean)}
function masPreg(codes){return [...new Set(masPts(codes).filter(isPregPt).map(x=>x.c))]}
function masTags(codes){return masPts(codes).map(x=>`<span class="tag" title="${esc(x.l)}">${ptLink(x.c)} ${esc(x.p)}</span>`).join('')}
function masStart(kind,i){
  let title,steps,o;
  if(kind==='s'){const c=MASS[i];title=c.n;steps=[{grp:masPts(c.pts),t:c.cum,s:c.sec,th:'Presiune simultană'}];o={fixed:true,partner:c.cine==='partener',R:profR('sim',c)}}
  else{const r=MASC[i];title=r.n;steps=r.pasi.map(p=>{const t=masTech(p.teh);return{grp:masPts(p.pts),t:p.t,s:p.sec,th:t?t.n:''}});o={fixed:true,partner:r.cine==='partener',R:profR('seq',r)}}
  sesBegin(title,steps,o);
}
function masFilter(a){return !MF.cine||a.cine===MF.cine}
function masSimCard(c,i){
  const preg=masPreg(c.pts);
  return `<details><summary>${esc(c.n)} <span class="tag">${esc(c.cine==='partener'?'Cu partener':'Singur')}</span></summary>
   <p>${masTags(c.pts)}</p>
   <p><b>Poziție:</b> ${esc(c.poz)}</p>
   <p><b>Cum se apasă simultan:</b> ${esc(c.cum)}</p>
   <p><b>Efect posibil:</b> ${esc(c.ef)}</p>
   <p class="mut">${esc(c.sec)} s</p>
   ${profBadges(profR('sim',c))}
   ${c.nota?`<p class="w">${esc(c.nota)}</p>`:''}
   ${preg.length?`<p class="w" style="color:var(--acc2)">⚠ În sarcină evită: ${preg.join(', ')}.</p>`:''}
   <button class="b" onclick="masStart('s',${i})">▶ Pornește sesiunea ghidată</button> <p></p></details>`}
function masSeqCard(r,i){
  const all=[...new Set(r.pasi.flatMap(p=>p.pts||[]))];const preg=masPreg(all);
  return `<details><summary>${esc(r.n)} <span class="tag">${esc(MREG[r.regiune]||r.regiune)}</span> <span class="tag">${esc(r.cine==='partener'?'Cu partener':'Singur')}</span></summary>
   <p><b>Scop:</b> ${esc(r.scop)}</p>
   <p><b>Poziție:</b> ${esc(r.poz)}</p>
   <p><b>Ai nevoie de:</b> ${esc(r.material)}</p>
   <p class="mut">~${esc(r.dur_min)} min</p>
   ${profBadges(profR('seq',r))}
   <ol>${r.pasi.map(p=>{const t=masTech(p.teh);return `<li>${t?`<i>${esc(t.n)}</i>: `:''}${esc(p.t)}${(p.pts||[]).length?` <span class="mut">(${p.pts.map(c=>ptLink(c)).join(', ')})</span>`:''}</li>`}).join('')}</ol>
   <p class="w">${esc(r.evita)}</p>
   ${r.nota?`<p class="w">${esc(r.nota)}</p>`:''}
   ${preg.length?`<p class="w" style="color:var(--acc2)">⚠ În sarcină evită: ${preg.join(', ')}.</p>`:''}
   <button class="b" onclick="masStart('c',${i})">▶ Pornește sesiunea ghidată</button> <p></p></details>`}
function vMasaj(){
  const sg=MAST.siguranta||{};const L=a=>`<ul>${(a||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  const sim=MASS.map((c,i)=>masFilter(c)?masSimCard(c,i):'').join('');
  const seq=MASC.map((r,i)=>masFilter(r)?masSeqCard(r,i):'').join('');
  return `<h1>Masaj</h1>${disc()}
  <p>Masajul combină mișcări (alunecare, frământare, fricțiune) cu presiune pe puncte. Aici găsești combinații de puncte apăsate în același timp, secvențe pe regiuni și tehnicile de bază, cu sesiuni ghidate cu cronometru. Totul este pentru relaxare și confort, nu pentru tratarea bolilor.</p>
  <div class="warn" role="note"><b>Înainte de a începe:</b> nu face masaj pe piele rănită sau infectată, pe zone umflate, calde și dureroase (posibilă tromboză), în caz de febră, după operații recente sau fără acordul medicului dacă ai o boală gravă ori iei anticoagulante. Presiunea trebuie să fie confortabilă, niciodată ascuțită. Detalii mai jos, la Siguranța masajului.</div>
  <div class="bar"><button class="b ${MF.cine?'alt':''}" onclick="MF.cine='';render()">Toate</button><button class="b ${MF.cine==='singur'?'':'alt'}" onclick="MF.cine='singur';render()">Singur</button><button class="b ${MF.cine==='partener'?'':'alt'}" onclick="MF.cine='partener';render()">Cu partener</button></div>
  <h2>Puncte apăsate simultan</h2>
  <p class="mut">Mai multe puncte stimulate în același timp, cu ambele mâini sau cu partener. Fiecare combinație are sesiune ghidată.</p>
  ${sim||`<p class="mut">${esc(T().noRes)}</p>`}
  <h2>Secvențe de masaj pe regiuni</h2>
  <p class="mut">Rutine complete, pas cu pas: încălzire, tehnici și puncte, apoi relaxare.</p>
  ${seq||`<p class="mut">${esc(T().noRes)}</p>`}
  <h2>Tehnici de bază</h2>
  <div class="tw"><table><tr><th>Tehnică</th><th>Scop</th><th>Cum se face</th><th>Presiune</th><th>Durată</th><th>Se evită</th></tr>${(MAST.tehnici||[]).map(t=>`<tr><td>${esc(t.n)}</td><td>${esc(t.scop)}</td><td>${esc(t.cum)}</td><td>${esc(t.presiune)}</td><td>${esc(t.sec)}</td><td>${esc(t.evita)}</td></tr>`).join('')}</table></div>
  <h2>Siguranța masajului</h2>
  <h3>Nu face masaj dacă</h3>${L(sg.nu_face)}
  <h3>Întreabă medicul înainte dacă</h3>${L(sg.medic)}
  <h3>Oprește imediat dacă</h3>${L(sg.oprire)}
  <h3>În sarcină</h3>${L(sg.sarcina)}
  <h3>Igienă și pregătire</h3>${L(sg.igiena)}
  <h3>Uleiuri și loțiuni</h3>${L(sg.ulei)}
  <h2>Ce spun studiile</h2>
  ${(MAST.dovezi||[]).map(d=>`<div class="card"><p><span class="badge" style="background:${EVC[d.niv]||EVC.x}">${esc((CNU('evL')||{})[d.niv]||d.niv)}</span> <b>${esc(d.t)}</b></p><p class="mut">${esc(d.txt)}</p></div>`).join('')}
  ${(MAST.surse||[]).length?`<h3>Surse</h3><ul>${MAST.surse.map(s=>`<li style="overflow-wrap:anywhere">${esc(s.t)} — <a href="${esc(s.u)}" target="_blank" rel="noopener noreferrer">${esc(s.u.replace(/^https?:\/\//,'').slice(0,60))}</a></li>`).join('')}</ul>`:''}
  <p class="mut">${esc(T().note)}</p>`;
}
regView('masaj',vMasaj,{ro:'Masaj',en:'Massage',fr:'Massage',it:'Massaggio',es:'Masaje',pt:'Massagem',de:'Massage',hu:'Masszázs'},{after:'acu'});
