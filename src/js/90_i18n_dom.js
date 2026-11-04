/* ================= traducere la rulare a textului afișat (sursă: română) ================= */
const I18N_CACHE={};
let I18N_KEYS=null;
function i18nDict(l){
  if(l==='ro')return null;if(I18N_CACHE[l])return I18N_CACHE[l];
  if(document.readyState==='loading')return null; // blocurile i18n vin după script: nu citi un bloc încă incomplet și nu memora absența
  const el=document.getElementById('i18n-'+l);if(!el)return null;
  try{
    if(!I18N_KEYS){const ke=document.getElementById('i18n-keys');I18N_KEYS=JSON.parse(ke.textContent);ke.textContent=''}
    const arr=JSON.parse(el.textContent),d=Object.create(null);
    for(let i=0;i<arr.length;i++)if(arr[i])d[I18N_KEYS[i]]=arr[i];
    I18N_CACHE[l]=d;el.textContent=''; // textul JSON brut nu mai rămâne în DOM după parsare (≈ 0,5 MB × 8 de eliberat)
  }catch(e){I18N_CACHE[l]={}}
  return I18N_CACHE[l];
}
const trNorm=s=>s.replace(/\s+/g,' ').trim();
const TR_LET=/\p{L}/u; // șirurile fără nicio literă (cifre, simboluri) nu au traducere: se sar fără lookup
function trNode(root){
  const d=i18nDict(S.lang);if(!d||!root)return;
  if(root.nodeType===3){trText(root,d);return}
  if(root.nodeType!==1)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const list=[];while(w.nextNode()){const n=w.currentNode,t=n.parentNode&&n.parentNode.nodeName;if(t!=='SCRIPT'&&t!=='STYLE')list.push(n)}
  for(let i=0;i<list.length;i++)trText(list[i],d);
  const attrs=['placeholder','title','aria-label','alt'];
  const els=[root,...root.querySelectorAll('[placeholder],[title],[aria-label],[alt]')];
  els.forEach(e=>attrs.forEach(a=>{if(e.getAttribute&&e.hasAttribute(a)){const v=e.getAttribute(a);if(!TR_LET.test(v))return;const t=d[trNorm(v)];if(t&&t!==v)e.setAttribute(a,t)}}));
}
const TR_EDGE_L=/^[\d\s\/()%.,+\-–:·]+/,TR_EDGE_R=/[\d\s\/()%.,+\-–:·]+$/;
const TR_DONE=new WeakMap(); // nod → {l:limba, v:textul scris de traducător}: un nod deja tradus nu se retraduce (fără bucle sau lanțuri „Data”↔„Date”)
function trText(n,d){
  const raw=n.data;if(!TR_LET.test(raw))return;const dn=TR_DONE.get(n);if(dn&&dn.l===S.lang&&dn.v===raw)return;const k=trNorm(raw);if(!k)return;let t=d[k];
  if(t===undefined&&/\d/.test(k)){ // șir dinamic: „60 / 60 afecțiuni”, „Somn și minte (7)”
    const l=(k.match(TR_EDGE_L)||[''])[0],r=(k.match(TR_EDGE_R)||[''])[0],c=k.slice(l.length,k.length-(r.length&&r.length<k.length?r.length:0));
    const tc=c&&d[c];if(tc)t=l+tc+r;
  }
  if(t!==undefined&&t!==k){const nv=raw.match(/^\s*/)[0]+t+raw.match(/\s*$/)[0];n.data=nv;TR_DONE.set(n,{l:S.lang,v:nv})}
}
function trWatch(){
  if(window.__trObs)return;
  const obs=new MutationObserver(ms=>{if(S.lang==='ro')return;const d=i18nDict(S.lang);ms.forEach(m=>{if(m.type==='characterData'){if(d)trText(m.target,d)}else m.addedNodes.forEach(n=>trNode(n))});obs.takeRecords()}); // takeRecords: scrierile proprii nu mai declanșează observatorul
  obs.observe(document.body,{childList:true,subtree:true,characterData:true});window.__trObs=obs;
}
function trAll(){trNode(document.body)}
/* la schimbarea limbii, <main> tocmai a fost reconstruit (observatorul îi traduce nodurile adăugate): se traduce doar restul paginii, fără a parcurge de două ori sute de carduri */
function trShell(){[...document.body.children].forEach(e=>{if(e.id!=='main')trNode(e)})}
