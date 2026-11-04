/* ================= FEREASTRĂ MODALĂ ACCESIBILĂ (#modal): dialog, focus, capcană de focus, Escape, fundal inert ================= */
const MDL={open:false,opener:null,key:null,idx:0};
const MDL_SEL='button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),[href],[tabindex]:not([tabindex="-1"])';
const mdlBg=()=>[...document.body.children].filter(e=>e.id!=='modal'&&e.id!=='sesLive'&&!/^(SCRIPT|STYLE)$/.test(e.tagName));
const mdlFocusables=()=>[...document.getElementById('modal').querySelectorAll(MDL_SEL)].filter(e=>e.getClientRects().length);
const mdlBox=()=>{const w=document.getElementById('modal').firstElementChild;return w&&(w.querySelector('.box')||w)};
function mdlKey(el){return el.getAttribute('data-f')||el.id||''}
function mdlFocus(el){try{el.focus({preventScroll:false})}catch(e){}}
function mdlClose(){
  MDL.open=false;
  mdlBg().forEach(e=>{e.inert=false;e.removeAttribute('aria-hidden')});
  const o=MDL.opener;MDL.opener=null;MDL.key=null;
  if(o&&o.isConnected&&!o.disabled)mdlFocus(o);
  else{const m=document.getElementById('main');if(m){try{m.focus({preventScroll:true})}catch(e){}}}
}
function mdlSync(){
  const M=document.getElementById('modal'),box=M.firstElementChild;
  if(!box){if(MDL.open)mdlClose();return}
  const was=MDL.open;
  if(!was){ // deschidere: se reține elementul care a declanșat fereastra și fundalul devine inert
    MDL.open=true;const a=document.activeElement;MDL.opener=(a&&a!==document.body&&!M.contains(a))?a:null;MDL.key=null;
    mdlBg().forEach(e=>{e.inert=true;e.setAttribute('aria-hidden','true')});
  }
  const dlg=mdlBox();dlg.setAttribute('role','dialog');dlg.setAttribute('aria-modal','true');
  const h=M.querySelector('[data-mt]')||M.querySelector('h2');
  if(h){h.id='mdlT';dlg.setAttribute('aria-labelledby','mdlT');dlg.removeAttribute('aria-label')}else dlg.setAttribute('aria-label','PUNCTUM');
  if(!dlg.hasAttribute('tabindex'))dlg.setAttribute('tabindex','-1');
  if(!M.contains(document.activeElement)){ // redesenare: focusul revine pe același control (data-f / id); altfel pe cel marcat data-af sau pe primul control
    const f=mdlFocusables();let t=null;
    if(was&&MDL.key){t=f.find(e=>mdlKey(e)===MDL.key)||null}
    if(!t)t=M.querySelector('[data-af]:not([disabled])')||f[0]||dlg;
    if(t)mdlFocus(t);
  }
}
(function(){
  const M=document.getElementById('modal');
  new MutationObserver(mdlSync).observe(M,{childList:true});
  M.addEventListener('focusin',e=>{if(e.target&&e.target.getAttribute)MDL.key=mdlKey(e.target)});
  document.addEventListener('keydown',e=>{
    if(!MDL.open)return;
    if(e.key==='Escape'){
      e.preventDefault();
      if(GATE)gateCancel();else if(SES.on)endSes(false);else M.innerHTML='';
    }else if(e.key==='Tab'){
      const f=mdlFocusables();if(!f.length){e.preventDefault();return}
      const a=f[0],z=f[f.length-1],cur=document.activeElement,inside=M.contains(cur);
      if(e.shiftKey&&(!inside||cur===a||cur===mdlBox())){e.preventDefault();mdlFocus(z)}
      else if(!e.shiftKey&&(!inside||cur===z)){e.preventDefault();mdlFocus(a)}
    }
  });
})();
