/* ================= RENDER ================= */
function render(){
  SRCH=false;
  renderNav();const v=view();const m=$('#main');
  const map={home:vHome,theory:vTheory,mer:vMer,pts:vPts,acu:vAcu,tech:vTech,ear:vEar,cun:vCun,safe:vSafe,quiz:vQuiz,gloss:vGloss};
  const reg=VREG[v];
  m.innerHTML=(reg?reg.fn:(map[v]||vHome))();
  if(v==='pts')renderPtsList();
  if(v==='tech')renderVarList();
  if(reg&&reg.post)reg.post();
}
