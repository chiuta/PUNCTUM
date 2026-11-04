/* ================= traducere la rulare a textului afișat (sursă: română) ================= */
const I18N_CACHE={};
function i18nDict(l){
  if(l==='ro')return null;if(I18N_CACHE[l])return I18N_CACHE[l];
  const el=document.getElementById('i18n-'+l);if(!el)return null;
  try{I18N_CACHE[l]=JSON.parse(el.textContent)}catch(e){I18N_CACHE[l]={}}
  return I18N_CACHE[l];
}
const trNorm=s=>s.replace(/\s+/g,' ').trim();
function trNode(root){
  const d=i18nDict(S.lang);if(!d||!root)return;
  if(root.nodeType===3){trText(root,d);return}
  if(root.nodeType!==1)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const t=n.parentNode&&n.parentNode.nodeName;return(t==='SCRIPT'||t==='STYLE')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  const list=[];while(w.nextNode())list.push(w.currentNode);list.forEach(n=>trText(n,d));
  const attrs=['placeholder','title','aria-label','alt'];
  const els=[root,...root.querySelectorAll('[placeholder],[title],[aria-label],[alt]')];
  els.forEach(e=>attrs.forEach(a=>{if(e.getAttribute&&e.hasAttribute(a)){const v=e.getAttribute(a);const t=d[trNorm(v)];if(t&&t!==v)e.setAttribute(a,t)}}));
}
function trText(n,d){
  const raw=n.data;const k=trNorm(raw);if(!k)return;const t=d[k];
  if(t!==undefined&&t!==k)n.data=raw.match(/^\s*/)[0]+t+raw.match(/\s*$/)[0];
}
function trWatch(){
  if(window.__trObs)return;
  const obs=new MutationObserver(ms=>{if(S.lang==='ro')return;ms.forEach(m=>m.addedNodes.forEach(n=>trNode(n)))});
  obs.observe(document.body,{childList:true,subtree:true});window.__trObs=obs;
}
function trAll(){trNode(document.body)}
