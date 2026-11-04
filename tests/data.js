// integritate încrucișată a datelor + igienă de text + „undefined/NaN” în tot conținutul randat
const {chromium}=require('playwright');const path=require('path');
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1100,height:900}});await p.goto(U);
const r=await p.evaluate(()=>{const E=[],W=[];const e=m=>E.push(m),w=m=>W.push(m);
 const codes=new Set(PT.map(x=>x.c));const TG=x=>String(x.tg||'').split(/[,;·]\s*/).map(t=>t.trim()).filter(Boolean);const WHO={LU:11,LI:20,ST:45,SP:21,HT:9,SI:19,BL:67,KI:27,PC:9,TE:23,GB:44,LR:14,CV:24,GV:28};
 // puncte
 Object.entries(WHO).forEach(([m,n])=>{for(let i=1;i<=n;i++)if(!codes.has(m+i))e('lipsește '+m+i);PT.filter(x=>new RegExp('^'+m+'\\d+$').test(x.c)).forEach(x=>{if(+x.c.slice(m.length)>n)e('cod în plus '+x.c)})});
 const TAGS=['Yuan','Luo','Xi','Mu','Shu-dorsal','He-mare','He-inferior','Jing-puț','Ying-izvor','Shu-pârâu','Jing-râu','Hui','Cheie-vas','Fereastra-cerului','Comandă'];
 PT.forEach(x=>{if(!/^[A-Z]{2}\d{1,2}$|^EX-[A-Za-z]+\d*$/.test(x.c))e('format cod '+x.c);
  ['p','l','u','r'].forEach(k=>{if(!x[k]||!String(x[k]).trim())e('câmp gol '+k+' la '+x.c)});
  if(x.l&&/\s{2,}|\s$|^\s/.test(x.l))w('spații în localizare '+x.c);
  if(x.l&&/[(„][^)”]*$/.test(x.l)&&((x.l.match(/\(/g)||[]).length!==(x.l.match(/\)/g)||[]).length))e('paranteze neînchise '+x.c+': '+x.l.slice(0,40));
  if(x.l&&!/[.)\p{L}\d»”"']$/u.test(x.l.trim()))w('localizare cu final ciudat '+x.c+': …'+x.l.slice(-12));
  TG(x).forEach(t=>{if(!TAGS.includes(t))e('etichetă necunoscută '+x.c+': '+t)});
  if(x.vf&&!/^[vs]$/.test(x.vf))e('verif invalid '+x.c)});
 // eticheta Yuan etc. consistență: puncte Yuan standard
 const YUAN={LU9:1,LI4:1,ST42:1,SP3:1,HT7:1,SI4:1,BL64:1,KI3:1,PC7:1,TE4:1,GB40:1,LR3:1};Object.keys(YUAN).forEach(c=>{const x=PT.find(y=>y.c===c);if(x&&!TG(x).includes('Yuan'))e('lipsește Yuan la '+c)});
 const LUO={LU7:1,LI6:1,ST40:1,SP4:1,HT5:1,SI7:1,BL58:1,KI4:1,PC6:1,TE5:1,GB37:1,LR5:1,CV15:1,GV1:1,SP21:1};Object.keys(LUO).forEach(c=>{const x=PT.find(y=>y.c===c);if(x&&!TG(x).includes('Luo'))e('lipsește Luo la '+c)});
 const XI={LU6:1,LI7:1,ST34:1,SP8:1,HT6:1,SI6:1,BL63:1,KI5:1,PC4:1,TE7:1,GB36:1,LR6:1};Object.keys(XI).forEach(c=>{const x=PT.find(y=>y.c===c);if(x&&!TG(x).includes('Xi'))e('lipsește Xi la '+c)});
 const MU={LU1:1,LI:0,ST25:1,SP15:0,LR14:1,GB24:1,BL:0,KI25:0,CV3:1,CV4:1,CV5:1,CV12:1,CV14:1,CV17:1};['LU1','ST25','LR14','GB24','CV3','CV4','CV5','CV12','CV14','CV17'].forEach(c=>{const x=PT.find(y=>y.c===c);if(x&&!TG(x).includes('Mu'))w('lipsește Mu la '+c)});
 // variante
 VAR.forEach(v=>{if(![0,1,2].includes(v.inv))e('inv '+v.id);if(![1,2,3].includes(v.risc))e('risc '+v.id);if(!'mlwx'.includes(v.ev))e('ev '+v.id);if(!'dpn'.includes(v.auto))e('auto '+v.id);if(!CATN[v.cat])e('cat '+v.id);
  ['n','or','pr','ins','dur','zon','ind','dov','sig','who'].forEach(k=>{if(!v[k]||!String(v[k]).trim())e('variantă '+v.id+' câmp gol '+k)});if(v.pas.length<2)w('variantă cu <2 pași '+v.id);
  // dovezi vs. evaluare: ev x/w nu poate spune „eficace” fără rezerve
  if(/x|w/.test(v.ev)&&/(?<!nu există |nu sunt |fără |lipsesc )\bdovezi (bune|solide|puternice)\b/i.test(v.dov))e('dovezi contradictorii '+v.id);
  // coduri în zone
  (v.zon.match(/(?<![\w-])[A-Z]{2}\d{1,2}\b/g)||[]).forEach(c=>{if(!codes.has(c))e('cod inexistent în '+v.id+'.zon: '+c)})});
 // afecțiuni
 const vids=new Set(VAR.map(v=>v.id));COND.forEach(c=>{(c.pts||[]).forEach(x=>{if(!codes.has(x))e('COND '+c.id+' cod inexistent '+x)});(c.vr||[]).forEach(x=>{if(!vids.has(x))e('COND '+c.id+' variantă inexistentă '+x)})});
 // curs
 const lid=new Set();COURSE.forEach(l=>l.lectii.forEach(le=>{if(lid.has(le.id))e('lecție duplicat '+le.id);lid.add(le.id);(le.puncte||[]).forEach(c=>{if(!codes.has(c))e('lecție '+le.id+' cod inexistent '+c)});(le.variante||[]).forEach(x=>{if(!vids.has(x))e('lecție '+le.id+' variantă inexistentă '+x)});
  if(!(le.text||[]).length)e('lecție fără text '+le.id);(le.intrebari||[]).forEach((q,i)=>{const all=[q.corect,...(q.gresite||[])];if(new Set(all).size!==all.length)e('răspunsuri duplicate '+le.id+':'+i);if((q.gresite||[]).length<2)e('puține distractori '+le.id+':'+i);if(!q.explicatie)w('fără explicație '+le.id+':'+i)})}));
 // protocoale
 PROT.forEach(pr=>pr.p.forEach(c=>{if(!codes.has(c))e('PROT '+pr.t+' cod inexistent '+c)}));
 // quiz
 const qs=new Set();QBANK.concat(QM.map(x=>({q:x[0],ok:x[1],w:x[2].slice(0,3)}))).forEach((q,i)=>{const all=[q.ok,...q.w];if(new Set(all).size!==all.length)e('quiz răspunsuri duplicate: '+q.q.slice(0,50));if(all.some(x=>!x||x.length>70))e('quiz răspuns gol/lung: '+q.q.slice(0,40));if(qs.has(q.q))e('quiz întrebare duplicat: '+q.q.slice(0,40));qs.add(q.q);
  (q.e||'').match(/(?<![\w-])[A-Z]{2}\d{1,2}\b/g)?.forEach(c=>{if(!codes.has(c))w('quiz explicație cod inexistent '+c)})});
 const cats={};QBANK.forEach(q=>cats[q.cat]=(cats[q.cat]||0)+1);
 // glosar
 const gs=new Set();GLO.forEach(g=>{if(gs.has(g[0]))e('glosar duplicat '+g[0]);gs.add(g[0]);if(!g[1])e('glosar gol '+g[0])});
 // meridiane
 MER.forEach(m=>{['n','c','el','yy','path','key'].forEach(k=>{if(!m[k])e('MER '+m.c+' lipsă '+k)})});
 return{E,W,cats,counts:{PT:PT.length,VAR:VAR.length,COND:COND.length,Q:QBANK.length}}});
// igienă de conținut randat în toate limbile
const langs=['ro','en','fr','it','es','pt','de','hu'];const bad=[];
for(const l of langs){await p.goto(U+'#home');await p.evaluate(l=>setLang(l),l);
 const t=await p.evaluate(()=>{const out=[];const views=NAVX.map(x=>x.k).concat(['home','quiz']);views.forEach(k=>{try{const h=VREG[k]?VREG[k].fn():'';const d=document.createElement('div');d.innerHTML=h;document.body.appendChild(d);if(/undefined|NaN|\[object|null\b/.test(d.innerText))out.push(k+': '+(d.innerText.match(/.{0,25}(undefined|NaN|\[object|null\b).{0,15}/)||[''])[0]);d.remove()}catch(e){out.push(k+' eroare '+e.message)}});return out});
 t.forEach(x=>bad.push(l+' '+x))}
console.log('ERORI:',r.E.length);r.E.slice(0,60).forEach(x=>console.log('  E',x));console.log('AVERTISMENTE:',r.W.length);r.W.slice(0,30).forEach(x=>console.log('  W',x));
console.log('quiz pe categorii',JSON.stringify(r.cats),JSON.stringify(r.counts));console.log('randare suspectă:',bad.length);bad.slice(0,15).forEach(x=>console.log('  R',x));
await b.close();process.exit(r.E.length||bad.length?1:0)})();
