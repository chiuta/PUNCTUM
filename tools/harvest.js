// node tools/harvest.js [html] -> research/strings_ro.json : toate șirurile românești afișate
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1100,height:900}});
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');await p.goto(U);
const strs=await p.evaluate(()=>{
 const set=new Set();const norm=s=>s.replace(/\s+/g,' ').trim();
 const grab=root=>{const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))continue;const t=norm(n.data);if(t)set.add(t)}
  root.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(e=>['placeholder','title','aria-label','alt'].forEach(a=>{const v=e.getAttribute(a);if(v&&norm(v))set.add(norm(v))}));};
 const box=document.createElement('div');document.body.appendChild(box);
 const fromHtml=h=>{box.innerHTML=h;grab(box)};
 const safe=f=>{try{f()}catch(e){console.log('harvest err',e.message)}};
 // vizualizări (cu detalii deschise)
 NAVX.map(x=>x.k).concat(['home','quiz']).forEach(k=>safe(()=>{S.lang='ro';const r=VREG[k];const h=r?r.fn():'';fromHtml(h)}));
 const mapv={home:vHome,theory:vTheory,mer:vMer,pts:vPts,acu:vAcu,tech:vTech,ear:vEar,cun:vCun,safe:vSafe,quiz:vQuiz,gloss:vGloss};
 Object.values(mapv).forEach(f=>safe(()=>fromHtml(f())));
 safe(()=>fromHtml(PT.map(p=>ptCard(p)).join('')));
 safe(()=>VAR.forEach(v=>fromHtml(vCard(v,true))));
 safe(()=>COURSE.forEach(l=>{fromHtml(`<h1>${l.titlu}</h1><p>${l.descriere||''}</p>`);(l.lectii||[]).forEach(le=>{(le.intrebari||[]).forEach((q,i)=>{cst().ans[le.id+':'+i]=q.corect});fromHtml(crLesson(l,le));(le.intrebari||[]).forEach(q=>{[q.q,q.corect,...(q.gresite||[]),q.explicatie].forEach(x=>x&&set.add(norm(x)))})})}));
 safe(()=>{S.course={done:{},ans:{}}});
 safe(()=>COND.forEach(c=>fromHtml(cndCard(c))));
 safe(()=>QBANK.forEach(q=>[q.q,q.ok,...q.w,q.e].forEach(x=>x&&set.add(norm(x)))));
 safe(()=>QM.forEach(q=>JSON.stringify(q)));
 safe(()=>PROT.forEach(pr=>{fromHtml(JSON.stringify(pr))}));
 safe(()=>GLO.forEach(g=>g.forEach&&g.forEach(x=>typeof x==='string'&&set.add(norm(x)))));
 safe(()=>MER.forEach(m=>Object.values(m).forEach(x=>typeof x==='string'&&set.add(norm(x)))));
 // UI-ul tradus deja în I18N/CRSUI/CONDUI nu se mai traduce prin dicționar; filtrat mai jos
 safe(()=>{MER.forEach(m=>{if(m.key)set.add(norm(m.key))});VAR.forEach(v=>{if(v.zon)set.add(norm(v.zon))})});
 ['CONDUI','MAPUI','CRSUI','STUI','REFUI'].forEach(n=>safe(()=>{const d=eval(n).ro;const add=v=>{if(typeof v==='string')set.add(norm(v));else if(Array.isArray(v))v.forEach(add);else if(v&&typeof v==='object')Object.values(v).forEach(add)};add(d)}));
 // nuclee: fără cifre/punctuație la capete (pt. șiruri dinamice precum „60 / 60 afecțiuni”)
 [...set].forEach(t=>{const c=t.replace(/^[\d\s\/()%.,+\-–:·]+/,'').replace(/[\d\s\/()%.,+\-–:·]+$/,'');if(c&&c!==t&&c.length>2&&t.length<60&&/\d/.test(t))set.add(c)});
 box.remove();return [...set];
});
fs.mkdirSync('research',{recursive:true});
const ro=strs.filter(s=>/[a-zăâîșțĂÂÎȘȚ]{2}/i.test(s)&&!/^[A-Z]{1,3}\d+(-\w+)?$/.test(s)).sort();
fs.writeFileSync('research/strings_live.json',JSON.stringify(ro,null,0));
console.log('șiruri:',ro.length,'caractere:',ro.join('').length);await b.close()})();
