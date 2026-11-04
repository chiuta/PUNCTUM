// teste ostile: stare coruptă, hash-uri deformate, import cu payload, XSS
const {chromium}=require('playwright');const path=require('path');
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');
let fails=0;const F=m=>{fails++;console.log('FAIL',m)},O=m=>console.log('OK  ',m);
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const mk=async(state)=>{const c=await b.newContext();const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>{errs.push('DIALOG '+d.message());d.dismiss()});
 if(state!==undefined)await p.addInitScript(s=>{try{localStorage.setItem('punctum',s)}catch(e){}},state);return{c,p,errs}};
// 1. stări corupte
const bad={'json-invalid':'{{{','tablou':'[]','lang-invalid':JSON.stringify({lang:'xx'}),'lang-obiect':JSON.stringify({lang:{a:1}}),'course-string':JSON.stringify({course:'x'}),'routines-nontablou':JSON.stringify({routines:'x'}),'routines-null':JSON.stringify({routines:[null,1,{n:5,pts:'x'}]}),'proto':'{"__proto__":{"polluted":1}}','fav-obj':JSON.stringify({fav:7,leit:'x',theme:5}),'nul':'null'};
for(const [k,v] of Object.entries(bad)){const {c,p,errs}=await mk(v);await p.goto(U);for(const h of ['home','pts','tech','cond','course','quiz','maps','refs'])await p.goto(U+'#'+h),await p.waitForTimeout(80);
 const poll=await p.evaluate(()=>({}).polluted);const h1=await p.evaluate(()=>(document.querySelector('main h1')||{}).textContent);
 errs.length||poll?F(`stare ${k}: ${errs.slice(0,2)} poll=${poll}`):O(`stare ${k} (${h1})`);await c.close()}
// 2. hash-uri deformate
{const {c,p,errs}=await mk();for(const h of ['#<img src=x onerror=alert(1)>','#cond:<svg onload=alert(1)>','#cond:"\'><script>alert(1)</script>','#pts:%E0%A4%A','#%','#cond:__proto__','#tech:constructor','#course:../..','#' + 'a'.repeat(5000),'#maps:LI4','#maps:\'"><img src=x onerror=alert(1)>']){await p.goto(U+h);await p.waitForTimeout(100);await p.reload();await p.waitForTimeout(60)}
 errs.length?F('hash: '+errs.slice(0,3)):O('hash-uri deformate');await c.close()}
// 3. import rutine cu payload
{const {c,p,errs}=await mk();await p.goto(U+'#cond');await p.waitForTimeout(150);
 const r=await p.evaluate(()=>{const names=["x');alert(1);('","\"><img src=x onerror=alert(2)>","<script>alert(3)</script>","a\\'+alert(4)+\\'"];
  const fns=Object.keys(window).filter(k=>/import|rtnImp|Import/i.test(k));
  S.routines=names.map((n,i)=>({id:'r'+i,n,pts:['LI4','ST36'],dur:30,fav:false}));save();render();return fns});
 await p.goto(U+'#cond');await p.waitForTimeout(200);
 const html=await p.evaluate(()=>document.getElementById('main').innerHTML);
 // încearcă să apese fiecare buton din zona de rutine
 const btn=await p.$$('main button');for(const x of btn.slice(0,60)){try{await x.evaluate(e=>e.click())}catch(e){}}
 errs.filter(e=>/DIALOG/.test(e)).length?F('XSS prin nume rutină: '+errs.filter(e=>/DIALOG/.test(e))):O('nume rutină cu payload');await c.close()}
// 4. căutare/filtre cu payload
{const {c,p,errs}=await mk();await p.goto(U+'#tech');for(const q of ['<img src=x onerror=alert(5)>',"'\"><script>alert(6)</script>",'\\','%','.*','(((','[','😀'.repeat(500)]){await p.fill('#q',q);await p.waitForTimeout(60);await p.goto(U+'#pts');await p.fill('#q',q);await p.waitForTimeout(40);await p.goto(U+'#cond');await p.waitForTimeout(40);const i=await p.$('main input[type=search],main input[type=text]');if(i)await i.fill(q)}
 errs.length?F('căutare: '+errs.slice(0,2)):O('căutare cu payload');await c.close()}
await b.close();console.log('\nREZULTAT:',fails,'FAIL');process.exit(fails?1:0)})();
