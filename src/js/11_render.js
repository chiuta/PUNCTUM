/* ================= RENDER ================= */
function render(){
  renderNav();const v=view();const m=$('#main');
  const map={home:vHome,theory:vTheory,mer:vMer,pts:vPts,acu:vAcu,tech:vTech,ear:vEar,cun:vCun,safe:vSafe,quiz:vQuiz,gloss:vGloss};
  m.innerHTML=(map[v]||vHome)();
  if(v==='pts')renderPtsList();
  if(v==='tech')renderVarList();
  if(v==='quiz'&&!QZ.q.length){}
}
/* init */
load();document.documentElement.lang=S.lang;applyTheme();applyI18n();render();
