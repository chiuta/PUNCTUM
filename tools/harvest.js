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
 safe(()=>{MF.cine='';fromHtml(vMasaj())});
 safe(()=>{PFLAGS.forEach(f=>{S.prof[f[0]]=true});['profil','jurnal','plan','setari'].forEach(t=>{EU.tab=t;if(t==='jurnal'){S.log=[{t:Date.now(),ti:'x',b:5,a:3,n:'',f:0},{t:Date.now(),ti:'x',b:4,a:2,n:'',f:0}]}if(t==='plan'){S.plan=[{k:'p',i:0,time:'08:00',days:[1,2]}]}EU.msg='Datele nu sunt valide.';fromHtml(vEu())});EU.tab='profil';S.log=[];S.plan=[]});
 safe(()=>{DZ.forEach(z=>{DR.z=z.id;DR.s=DS[0];DR.d=DD[0];DR.red=[false,false,false,false,false];fromHtml(vDurere())});DR.s=DS[3];DR.d=DD[2];fromHtml(vDurere());DR.red=[true,false,false,false,false];fromHtml(vDurere());DR.red=[false,false,false,false,false];DR.z='';DR.s='';DR.d=''});
 safe(()=>{['exact','close','miss'].forEach(l=>{EX.res={lvl:l,x:1,y:1,cx:2,cy:2,d:1};EX.tip=true;fromHtml(vExam())});EX.res=null});
 safe(()=>{S.prof.preg=true;S.prof.tromboza=true;MASC.forEach((r,i)=>fromHtml(profBadges(profR('seq',r))));MASS.forEach(c=>fromHtml(profBadges(profR('sim',c))));VAR.forEach(v=>fromHtml(profBadges(profR('var',v))));PT.slice(0,400).forEach(p=>fromHtml(profBadges(profR('pt',p))));S.prof.onco=true;S.prof.anticoag=true;S.prof.pacemaker=true;S.prof.neuropatie=true;S.prof.osteo=true;S.prof.hernie=true;S.prof.piele=true;VAR.forEach(v=>fromHtml(profBadges(profR('var',v))));S.prof={}});
 safe(()=>{GATE={title:'x',steps:[],o:{partner:true},R:[{lv:'stop',k:'preg'}],note:true};gateDraw();fromHtml(document.querySelector('#modal').innerHTML);GATE={title:'x',steps:[{grp:[]}],o:{partner:true},R:[],note:false};gateDraw();fromHtml(document.querySelector('#modal').innerHTML);S.pre=0;GATE=null;SES.jb=3;fromHtml(sesDoneHtml());SES.partner=true;Object.values(FBT).forEach(t=>{SES.fb=t;fromHtml(partnerBar())});SES.fb='';SES.partner=false;SES.jb=null;document.querySelector('#modal').innerHTML=''});
 safe(()=>HX.forEach(t=>set.add(norm(t))));
 safe(()=>['PUNCTUM — carduri de puncte','Material educativ; nu înlocuiește sfatul medicului. Presiune confortabilă, 30–60 s, respirație lentă.','PUNCTUM — planul meu','Material educativ; nu înlocuiește sfatul medicului.'].forEach(t=>set.add(norm(t))));
 safe(()=>fromHtml('<div class="warn"><b>Ce descrii poate fi o urgență.</b> Dacă ai durere în piept, dificultăți de respirație, slăbiciune bruscă, tulburări de vorbire sau sângerare importantă, sună la 112. Nu folosi presopunctura în locul ajutorului medical.</div>'));
 safe(()=>{MASS.forEach((c,i)=>{masStart('s',i);fromHtml(document.querySelector('#modal').innerHTML);endSes(false)});MASC.forEach((r,i)=>{masStart('c',i);r.pasi.forEach((p,j)=>{SES.i=j;drawSes();fromHtml(document.querySelector('#modal').innerHTML)});endSes(false)});document.querySelector('#modal').innerHTML=''});
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
