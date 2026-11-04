// acoperire profundă: toate cardurile/lecțiile/afecțiunile/variantele randate în fiecare limbă; caută diacritice românești rămase
const {chromium}=require('playwright');const path=require('path');
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1100,height:900}});await p.goto(U);
let total=0;
for(const l of ['en','fr','it','es','pt','de','hu']){
 const r=await p.evaluate(async l=>{setLang(l);S.lang=l;
  const box=document.createElement('div');box.id='deep';document.body.appendChild(box);
  const parts=[];const add=h=>parts.push(h);
  NAVX.map(x=>x.k).concat(['home','quiz']).forEach(k=>{try{add(VREG[k]?VREG[k].fn():'')}catch(e){}});
  try{PT.forEach(x=>add(ptCard(x)))}catch(e){}try{VAR.forEach(v=>add(vCard(v,true)))}catch(e){}
  try{COURSE.forEach(lv=>{lv.lectii.forEach(le=>{(le.intrebari||[]).forEach((q,i)=>{cst().ans[le.id+':'+i]=q.corect});add(crLesson(lv,le))})});S.course={done:{},ans:{}}}catch(e){}
  try{COND.forEach(c=>add(cndCard(c)))}catch(e){}
  try{fcDeck&&['pts','loc','mer','var','glo'].forEach(k=>fcDeck(k).forEach(c=>add('<div>'+c.f+'</div><div>'+c.b+'</div>')))}catch(e){}
  try{QBANK.forEach(q=>add('<p>'+[q.q,q.ok,...q.w,q.e].map(esc).join('</p><p>')+'</p>'))}catch(e){}
  try{PROT.forEach(pr=>add('<p>'+Object.values(pr).filter(x=>typeof x==='string').map(esc).join('</p><p>')+'</p>'))}catch(e){}
  box.innerHTML=parts.join('');
  await new Promise(r=>setTimeout(r,400)); // observatorul DOM traduce nodurile adăugate
  trNode(box); // siguranță: traduce explicit
  const RO=/[ăĂşŞţŢșȘțȚ]|\b(și|pentru|este|sunt|dacă|sau|fără|după|prin|când|mai|dar|care|această|acest|puncte|punct)\b/;
  const w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);let n;const left=new Map();let tot=0;
  while(n=w.nextNode()){const t=n.data.replace(/\s+/g,' ').trim();if(t.length<4)continue;tot++;if(/[ăĂşŞţŢșȘțȚ]/.test(t)||/\b(și|pentru|dacă|sau|fără|după|când|această)\b/.test(t))left.set(t,(left.get(t)||0)+1)}
  box.remove();return{tot,left:[...left.keys()]}},l);
 total+=r.left.length;console.log(l,`${r.left.length} șiruri cu rămășițe românești din ${r.tot}`);r.left.slice(0,12).forEach(x=>console.log('   ',x.slice(0,110)));}
await b.close();process.exit(0)})();
