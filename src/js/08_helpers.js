/* ================= HELPERS ================= */
const $=s=>document.querySelector(s);
const PREGRE=/sarcin|gravid|Doar sub îndrumare/i; // sursă unică pentru semnalul „sarcină”
const isPregPt=p=>!!(p&&PREGRE.test(p.w||''));
const esc=s=>String(s).replace(/[&<>"'`]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));
function ptCard(p){
  const fav=S.fav.includes(p.c+'|'+p.p);
  const m=MER.find(x=>x.c===p.m);
  return `<div class="card pt" id="pt-${esc(p.c)}">
   <button class="star" onclick="toggleFav('${p.c}','${p.p}')" aria-label="fav">${fav?'★':'☆'}</button>
   <h3><span class="badge" style="background:${MCOL[p.m]}">${esc(p.c)}</span>${esc(p.p)}</h3>
   <p class="mut">${m?esc(m.n):'Puncte extra'} · ${esc(REG[p.r])}</p>
   ${p.mn?`<p class="mut"><i>${esc(p.mn)}</i></p>`:''}
   ${p.vf?`<p class="mut" style="font-size:.8rem">${p.vf==='v'?'✓ Localizare verificată în textul OMS (2008)':'≈ Localizare confirmată din surse secundare'}</p>`:`<p class="mut" style="font-size:.8rem">○ Localizare de verificat în sursa oficială</p>`}
   ${p.tg?`<p>${p.tg.split(',').filter(Boolean).map(t=>`<span class="tag">${esc(t.trim())}</span>`).join('')}</p>`:''}
   <p><b>Localizare:</b> ${esc(p.l)}</p>
   <p><b>Indicații tradiționale:</b> ${esc(p.u)}</p>
   ${p.w?`<p class="w pw" role="note">${esc(p.w)}</p>`:''}
  </div>`}
function toggleFav(c,p){const k=c+'|'+p;const i=S.fav.indexOf(k);if(i<0)S.fav.push(k);else S.fav.splice(i,1);save();if(view()==='pts')renderPtsList();else render();}
function goPoint(c){PF.q=c;PF.m='';PF.r='';PF.fav=false;go('pts')}
function ptLink(c){return `<a href="#pts" onclick="goPoint('${c}')">${c}</a>`}
function trWhole(s){ // traduce șirul întreg înainte de a-l sparge în linkuri (ordinea cuvintelor diferă între limbi)
  if(typeof S==='undefined'||S.lang==='ro'||typeof i18nDict!=='function')return s;
  const d=i18nDict(S.lang);const t=d&&d[String(s).replace(/\s+/g,' ').trim()];return t||s}
function linkify(s){return esc(trWhole(s)).replace(/(^|[^\w-])(LU|LI|ST|SP|HT|SI|BL|KI|PC|TE|GB|LR|CV|GV)(\d{1,2})\b/g,(m,pre,a,b)=>`${pre}<a href="#pts" onclick="goPoint('${a}${b}')">${a}${b}</a>`)}
function warnBox(txt){return `<div class="warn">⚠ ${txt}</div>`}
function disc(){return `<div class="warn">ℹ ${esc(T().disc)}</div>`}

