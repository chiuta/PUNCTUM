/* ================= HELPERS ================= */
const $=s=>document.querySelector(s);
const DBT={};function dbRun(k,fn,ms){clearTimeout(DBT[k]);DBT[k]=setTimeout(()=>{delete DBT[k];fn()},ms||130)} // debounce per cheie (filtre/căutare)
function dbCancel(){for(const k in DBT){clearTimeout(DBT[k]);delete DBT[k]}}
const HAYC=new WeakMap();function hayOf(o,f){let h=HAYC.get(o);if(h===undefined){h=f(o);HAYC.set(o,h)}return h} // text de căutare calculat o singură dată per obiect
const PREGRE=/sarcin|gravid|Doar sub îndrumare/i; // sursă unică pentru semnalul „sarcină”
const NEEDLEW=/înțep|pneumotorax|adânc|ac\b|ace\b/i;
// puncte pe care textele aplicației le declară de evitat în sarcină, fără ca fișa punctului să aibă avertisment (prudență, nu risc dovedit)
const PREGX=new Set(['BL23','BL25','BL26','BL52','GB30','KI3','LR3','SP4','SP8','SP10']);
const isPregPt=p=>!!(p&&(PREGRE.test(p.w||'')||PREGX.has(p.c)));
const esc=s=>String(s).replace(/[&<>"'`]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}[c]));
function ptCard(p){
  const fav=S.fav.includes(p.c+'|'+p.p);
  const m=MER.find(x=>x.c===p.m);
  return `<div class="card pt" id="pt-${esc(p.c)}">
   <button class="star" data-h-click="1" data-a-1-0="${p.c}" data-a-1-1="${p.p}" aria-label="${esc(TX('fav')+': '+p.c+' '+p.p)}" aria-pressed="${fav}">${fav?'★':'☆'}</button>
   <h3><span class="badge" style="background:${MCOL[p.m]}">${esc(p.c)}</span>${esc(p.p)}</h3>
   <p class="mut">${m?esc(m.n):'Puncte extra'} · ${esc(REG[p.r])}</p>
   ${p.mn?`<p class="mut"><i>${esc(p.mn)}</i></p>`:''}
   ${p.vf?`<p class="mut" style="font-size:.8rem">${p.vf==='v'?'✓ Localizare verificată în textul OMS (2008)':'≈ Localizare confirmată din surse secundare'}</p>`:`<p class="mut" style="font-size:.8rem">○ Localizare de verificat în sursa oficială</p>`}
   ${p.tg?`<p>${p.tg.split(',').filter(Boolean).map(t=>`<span class="tag">${esc(t.trim())}</span>`).join('')}</p>`:''}
   <p><b>Localizare:</b> ${esc(p.l)}</p>
   <p><b>Indicații tradiționale:</b> ${esc(p.u)}</p>
   ${profBadges(profR('pt',p))}
   ${p.w?`<p class="w pw" role="note">${NEEDLEW.test(p.w)&&!PREGRE.test(p.w)?'<span class="mut">Pentru acupunctori: </span>':''}${esc(p.w)}</p>`:''}
   ${PREGX.has(p.c)&&!PREGRE.test(p.w||'')?'<p class="w pw" role="note">În sarcină: prudență. Evită acest punct sau cere avizul medicului ori al moașei.</p>':''}
  </div>`}
function toggleFav(c,p,btn){ // actualizează doar butonul atins; lista se redesenează doar dacă filtrul „Favorite” e activ
  const k=c+'|'+p;const i=S.fav.indexOf(k);if(i<0)S.fav.push(k);else S.fav.splice(i,1);save();
  const on=i<0;
  if(btn&&btn.isConnected){btn.textContent=on?'★':'☆';btn.setAttribute('aria-pressed',on?'true':'false')}
  if(view()==='pts'){if(PF.fav||!btn)renderPtsList()}else if(!btn)render();
}
function goPoint(c){PF.q=c;PF.m='';PF.r='';PF.fav=false;go('pts')}
function ptLink(c){return `<a href="#pts" data-h-click="2" data-a-2-0="${c}">${c}</a>`}
function trWhole(s){ // traduce șirul întreg înainte de a-l sparge în linkuri (ordinea cuvintelor diferă între limbi)
  if(typeof S==='undefined'||S.lang==='ro'||typeof i18nDict!=='function')return s;
  const d=i18nDict(S.lang);const t=d&&d[String(s).replace(/\s+/g,' ').trim()];return t||s}
function linkify(s){return esc(trWhole(s)).replace(/(^|[^\w-])(LU|LI|ST|SP|HT|SI|BL|KI|PC|TE|GB|LR|CV|GV)(\d{1,2})\b/g,(m,pre,a,b)=>`${pre}<a href="#pts" data-h-click="2" data-a-2-0="${a+b}">${a}${b}</a>`)}
function warnBox(txt){return `<div class="warn">⚠ ${txt}</div>`}
function disc(){return `<div class="warn">ℹ ${esc(T().disc)}</div>`}

