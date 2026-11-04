/* ================= traducere la rulare a textului afișat (sursă: română) ================= */
const I18N_CACHE={};
let I18N_KEYS=null;
function i18nDict(l){
  if(l==='ro')return null;if(I18N_CACHE[l])return I18N_CACHE[l];
  const el=document.getElementById('i18n-'+l);if(!el)return null;
  try{
    if(!I18N_KEYS)I18N_KEYS=JSON.parse(document.getElementById('i18n-keys').textContent);
    const arr=JSON.parse(el.textContent),d=Object.create(null);
    for(let i=0;i<arr.length;i++)if(arr[i])d[I18N_KEYS[i]]=arr[i];
    I18N_CACHE[l]=d;
  }catch(e){I18N_CACHE[l]={}}
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
const TR_EDGE_L=/^[\d\s\/()%.,+\-–:·]+/,TR_EDGE_R=/[\d\s\/()%.,+\-–:·]+$/;
function trText(n,d){
  const raw=n.data;const k=trNorm(raw);if(!k)return;let t=d[k];
  if(t===undefined&&/\d/.test(k)){ // șir dinamic: „60 / 60 afecțiuni”, „Somn și minte (7)”
    const l=(k.match(TR_EDGE_L)||[''])[0],r=(k.match(TR_EDGE_R)||[''])[0],c=k.slice(l.length,k.length-(r.length&&r.length<k.length?r.length:0));
    const tc=c&&d[c];if(tc)t=l+tc+r;
  }
  if(t!==undefined&&t!==k)n.data=raw.match(/^\s*/)[0]+t+raw.match(/\s*$/)[0];
}
function trWatch(){
  if(window.__trObs)return;
  const obs=new MutationObserver(ms=>{if(S.lang==='ro')return;const d=i18nDict(S.lang);ms.forEach(m=>{if(m.type==='characterData'){if(d)trText(m.target,d)}else m.addedNodes.forEach(n=>trNode(n))})});
  obs.observe(document.body,{childList:true,subtree:true,characterData:true});window.__trObs=obs;
}
function trAll(){trNode(document.body)}
