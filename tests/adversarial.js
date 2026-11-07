// teste ostile: stare coruptă, hash-uri deformate, import cu payload, XSS
const {chromium}=require('playwright');const path=require('path');
// Confirmările folosesc FFF.dialog (modal), nu confirm() nativ: testele apasă „Da”.
const yes=async p=>{await p.waitForSelector('dialog[data-fff-dialog=confirm] .fff-primary');await p.click('dialog[data-fff-dialog=confirm] .fff-primary');await p.waitForTimeout(150)};
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
// ---------- audit runda 2 (cod): regresii ----------
const race=(pr,ms,lbl)=>Promise.race([pr,new Promise((_,j)=>setTimeout(()=>j(new Error('TIMEOUT '+lbl)),ms))]);
const mk2=async(init,opts)=>{const c=await b.newContext(opts||{});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());if(init)await p.addInitScript(init);return{c,p,errs}};
// 5. bucla MutationObserver Data/Date în en (setări + jurnal), fără blocaj
{const {c,p,errs}=await mk2(()=>{try{localStorage.setItem('punctum',JSON.stringify({lang:'en',log:[{t:Date.now(),ti:'x',b:3,a:2,n:'',f:0}]}))}catch(e){}});
 await p.goto(U+'#eu');let ok=true,why='';
 for(const t of ['setari','jurnal','plan','profil']){try{await race(p.evaluate(t=>{EU.tab=t;render();return new Promise(r=>setTimeout(r,150))},t),6000,t)}catch(e){ok=false;why=e.message}}
 ok&&!errs.length?O('MutationObserver: setări/jurnal în en fără blocaj'):F('MutationObserver en: '+why+errs);await c.close()}
// 6. lang cu nume din prototip (stare salvată + import ostil)
for(const L of ['constructor','__proto__','toString','hasOwnProperty']){
 const m=await mk2(null);await m.p.addInitScript(l=>{try{localStorage.setItem('punctum','{"lang":"'+l+'"}')}catch(e){}},L);
 await m.p.goto(U);const r=await m.p.evaluate(()=>({lang:S.lang,ftxt:document.getElementById('ftxt').textContent.length,sel:document.getElementById('lang').value,h:document.documentElement.lang}));
 r.lang==='ro'&&r.ftxt>50&&r.sel==='ro'&&!m.errs.length?O('lang prototip '+L):F('lang prototip '+L+JSON.stringify(r)+m.errs);await m.c.close()}
{const {c,p,errs}=await mk2(null);await p.goto(U);await p.evaluate(()=>{stApply('{"lang":"constructor"}')});await yes(p);
 const r=await p.evaluate(()=>({lang:S.lang,ftxt:document.getElementById('ftxt').textContent.length}));
 r.lang==='ro'&&r.ftxt>50&&!errs.length?O('import ostil lang:"constructor"'):F('import lang constructor '+JSON.stringify(r)+errs);await c.close()}
// 7. S.pre din viitor nu dezactivează triajul
for(const pre of [9e15,'Date.now()+3600000']){
 const m=await mk2(null);await m.p.addInitScript(v=>{try{localStorage.setItem('punctum',JSON.stringify({profSeen:true,pre:v==='f'?Date.now()+3600000:v,preReg:'x'}))}catch(e){}},typeof pre==='string'?'f':pre);
 await m.p.goto(U);const n=await m.p.evaluate(()=>{startSes(0);return document.querySelectorAll('#modal .gr').length});
 n===9?O('S.pre din viitor ignorat ('+pre+')'):F('S.pre din viitor: '+n+' casete');await m.c.close()}
{const {c,p}=await mk2(null);await p.goto(U);const r=await p.evaluate(()=>{S.pre=Date.now();S.preReg='x';S.fav=['LI4|Hegu'];const j=JSON.parse(stState());return{has:'pre' in j||'preReg' in j,fav:j.fav.length}});
 !r.has&&r.fav===1?O('export fără S.pre/S.preReg'):F('export conține pre '+JSON.stringify(r));await c.close()}
// 8. import: „Importat.” doar la succes; stocare picată → starea curentă rămâne; chei necunoscute eliminate
{const {c,p,errs}=await mk2(null);await p.goto(U);
 await p.evaluate(()=>{S.fav=['LI4|Hegu'];S.prof={tromboza:true};save();const orig=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error('QuotaExceeded')};
  stApply('{"prof":{"preg":true},"fav":[]}');window.__orig=orig});await yes(p);
 const r=await p.evaluate(()=>{Storage.prototype.setItem=window.__orig;return{msg:EU.msg,prof:JSON.stringify(S.prof),fav:S.fav.length}});
 !/^Importat/.test(r.msg)&&r.prof==='{"tromboza":true}'&&r.fav===1?O('import cu stocare picată: eroare, starea neatinsă'):F('import stocare picată: '+JSON.stringify(r));
 await p.evaluate(()=>{stApply(JSON.stringify({fav:[],junk:'x'.repeat(2e6),__proto__:{a:1},prof:{preg:true}}))});await yes(p);
 const r2=await p.evaluate(()=>{return{msg:EU.msg,tab:EU.tab,junk:S.junk,len:(localStorage.getItem('punctum')||'').length,preg:S.prof.preg}});
 /^Importat\./.test(r2.msg)&&r2.tab==='profil'&&r2.junk===undefined&&r2.len<20000&&r2.preg===true?O('import reușit: mesaj, tab profil, chei necunoscute eliminate'):F('import reușit: '+JSON.stringify(r2).slice(0,200));
 await p.evaluate(()=>{stApply('{"fav":["LI4|Hegu"]}')});await yes(p);const r3=await p.evaluate(()=>EU.msg);
 /profil/i.test(r3)&&/șters|Completează/.test(r3)?O('import fără profil: avertisment explicit'):F('import fără profil: '+r3);
 errs.length?F('erori import '+errs):O('fără erori JS la import');await c.close()}
// 9. „Șterge tot” șterge și cheia veche; migrare cheie veche
{const {c,p,errs}=await mk2(null);await p.addInitScript(()=>{if(window.name!=='seeded'){window.name='seeded';try{localStorage.removeItem('punctum');localStorage.setItem('acupunctura',JSON.stringify({prof:{preg:true},fav:['LI4|Hegu']}))}catch(e){}}});
 await p.goto(U);const r=await p.evaluate(()=>({preg:S.prof.preg,fav:S.fav.length,oldKey:localStorage.getItem('acupunctura'),newKey:!!localStorage.getItem('punctum')}));
 r.preg&&r.fav===1&&r.oldKey===null&&r.newKey?O('migrare acupunctura → punctum (cheia veche dispare)'):F('migrare: '+JSON.stringify(r));
 await p.evaluate(()=>{localStorage.setItem('acupunctura',JSON.stringify({prof:{preg:true}}));stReset()});await yes(p);
 const r2=await p.evaluate(()=>{return{preg:!!S.prof.preg,oldKey:localStorage.getItem('acupunctura'),newKey:localStorage.getItem('punctum')}});
 !r2.preg&&r2.oldKey===null?O('„Șterge tot” șterge și cheia veche acupunctura'):F('stReset: '+JSON.stringify(r2));
 await p.waitForTimeout(300);await p.reload();const r3=await p.evaluate(()=>!!S.prof.preg);!r3?O('după reset și reload profilul nu reînvie'):F('profilul a reînviat după reset');await c.close()}
// 10. scorul „după” nu e presetat la 0
{const {c,p,errs}=await mk2(null);await p.goto(U);
 const r=await p.evaluate(()=>{SES.title='t';SES.jb=3;SES.fbn=0;S.log=[];$('#modal').innerHTML=sesDoneHtml();const v=document.getElementById('jA').value;jrSave();return{v,a:S.log[0]&&S.log[0].a,len:S.log.length}});
 r.v===''&&r.a===null&&r.len===1?O('scor după: implicit „Nu notez”, salvat ca null'):F('scor după presetat: '+JSON.stringify(r));
 const r2=await p.evaluate(()=>{S.log=[];SES.jb=3;$('#modal').innerHTML=sesDoneHtml();const a=document.getElementById('jA');a.value='0';jrSave();const st=jrStats();return{a:S.log[0].a,st:!!st}});
 r2.a===0?O('scor după ales explicit 0 se păstrează'):F('scor 0 explicit pierdut');await c.close()}
// 11. ICS: fără BYDAY gol, UID stabil, linii ≤75 octeți
{const {c,p,errs}=await mk2(()=>{try{localStorage.setItem('punctum',JSON.stringify({plan:[{k:'p',i:0,time:'08:00',days:[]},{k:'p',i:0,time:'09:00',days:[1,3]},{k:'c',i:0,time:'09:00',days:[2]}]}))}catch(e){}});
 await p.goto(U);const r=await p.evaluate(()=>{const a=icsBuild();return{n:S.plan.length,a}});
 await p.waitForTimeout(1200);const r2=await p.evaluate(()=>icsBuild());
 const uids=t=>t.split('\r\n').filter(l=>/^UID:/.test(l));
 r.n===2&&!/BYDAY=(\r|$)/.test(r.a)&&!/BYDAY=;|BYDAY=,/.test(r.a)?O('plan fără zile eliminat; ICS fără BYDAY gol'):F('ICS BYDAY gol: '+r.n);
 JSON.stringify(uids(r.a))===JSON.stringify(uids(r2))&&uids(r.a).length===2&&new Set(uids(r.a)).size===2?O('ICS: UID stabil între exporturi'):F('ICS UID: '+uids(r.a)+' / '+uids(r2));
 const bytes=await p.evaluate(()=>{S.plan=[{k:'c',i:0,time:'10:00',days:[1]}];const t=icsBuild();const e=new TextEncoder();return t.split('\r\n').map(l=>e.encode(l).length)});
 Math.max(...bytes)<=75?O('ICS: linii ≤75 octeți (UTF-8)'):F('ICS linie '+Math.max(...bytes)+' octeți');await c.close()}
// 12. timestamp uriaș în jurnal
{const {c,p,errs}=await mk2(()=>{try{localStorage.setItem('punctum',JSON.stringify({log:[{t:1e300,ti:'x',b:3,a:2,n:'',f:0},{t:'1e300',ti:'y'}]}))}catch(e){}});
 await p.goto(U+'#eu');
 const t=await p.evaluate(()=>{EU.tab='jurnal';render();return document.getElementById('main').innerText});
 !/NaN/.test(t)?O('jurnal: timestamp uriaș fără NaN'):F('jurnal NaN');await c.close()}
// 13. curs cu done/ans de tip greșit
for(const st of [{course:{done:'x',ans:'y'}},{course:{done:[1],ans:[2]}},{course:{done:7,ans:null}}]){
 const {c,p,errs}=await mk2(null);await p.addInitScript(s=>{try{localStorage.setItem('punctum',JSON.stringify(s))}catch(e){}},st);await p.goto(U+'#course');
 const r=await p.evaluate(()=>{const c=cst();const lv=COURSE[0],le=lv.lectii[0];CR.lvl=lv.id;CR.les=le.id;render();try{crAnswer&&crAnswer(le.id,0,0)}catch(e){return 'EXC '+e.message}return typeof c.ans+typeof c.done+Array.isArray(c.ans)+Array.isArray(c.done)});
 !errs.length&&/^objectobjectfalsefalse$/.test(r)?O('curs cu tipuri greșite normalizat'):F('curs tipuri: '+r+errs);await c.close()}
// 14. examen: schimbarea modului resetează rezultatul
{const {c,p,errs}=await mk2(null);await p.goto(U+'#exam');const r=await p.evaluate(()=>{EX.res={lvl:'miss',x:1,y:1,cx:2,cy:2,d:3};EX.tip=true;exMode('all');return{res:EX.res,tip:EX.tip}});
 r.res===null&&r.tip===false?O('examen: exMode resetează rezultatul'):F('exMode: '+JSON.stringify(r));await c.close()}
// 15. detectarea urgenței din căutare
{const {c,p}=await mk2(null);await p.goto(U);const r=await p.evaluate(()=>({
 miss:['durere de piept','dureri de inimă','nu pot să respir','greu să respir','îmi este greu să respir','mă doare pieptul','mi-a amorțit brațul stâng','față căzută','vomit sânge','vreau să mă omor','mă sufoc','am dificultăți de respirație'].filter(t=>!nlUrgent(t)),
 fp:['mă doare gâtul de la birou','ochi obosiți după ecran','insomnie și agitație','tensiune în umeri','dureri menstruale ușoare','nas înfundat','mă doare capul','durere de spate'].filter(t=>nlUrgent(t))}));
 !r.miss.length&&!r.fp.length?O('nlUrgent: golurile din audit acoperite, fără fals pozitive'):F('nlUrgent '+JSON.stringify(r));await c.close()}
// 16. CSP: meta strict, aplicația funcționează fără încălcări, conexiunile externe sunt blocate
{const {c,p,errs}=await mk2(()=>{window.__csp=[];document.addEventListener('securitypolicyviolation',e=>window.__csp.push(e.violatedDirective+'|'+e.blockedURI))});
 await p.goto(U);const meta=await p.evaluate(()=>(document.querySelector('meta[http-equiv="Content-Security-Policy"]')||{}).content||'');
 /default-src 'none'/.test(meta)&&!/https?:/.test(meta)&&!/unsafe-eval/.test(meta)?O('CSP: meta strict (default-src none, fără surse externe, fără unsafe-eval)'):F('CSP meta: '+meta);
 const views=await p.evaluate(()=>NAVX.map(x=>x.k).concat(['home','theory','mer','pts','acu','tech','ear','cun','safe','quiz','gloss','exam']));
 for(const v of [...new Set(views)]){await p.goto(U+'#'+v);await p.waitForTimeout(60)}
 await p.evaluate(()=>{S.profSeen=true;S.pre=0;startSes(0)});await p.waitForTimeout(80);await p.evaluate(()=>{document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);gateChk();document.querySelector('#gGo').click()});await p.waitForTimeout(1300);
 await p.evaluate(()=>{endSes(true)});await p.evaluate(()=>{S.log=[{t:Date.now(),ti:'x',b:3,a:2,n:'',f:0}];EU.tab='jurnal';location.hash='#eu';render()});
 const [dlw]=await Promise.all([p.waitForEvent('download',{timeout:5000}).catch(()=>null),p.evaluate(()=>jrCsv())]);
 dlw?O('CSP: descărcarea (blob:) funcționează'):F('CSP: descărcarea blocată');
 const csp0=await p.evaluate(()=>window.__csp.slice());
 csp0.length===0?O('CSP: 0 încălcări în '+views.length+' vizualizări + sesiune + descărcare'):F('CSP încălcări: '+csp0.slice(0,3));
 const ext=await p.evaluate(()=>fetch('https://example.com/').then(()=>'ok',()=>'blocked'));
 const csp1=await p.evaluate(()=>window.__csp.slice());
 ext==='blocked'&&csp1.some(x=>/connect-src|default-src/.test(x))?O('CSP: fetch extern blocat'):F('CSP: fetch extern permis? '+ext+csp1);
 errs.length?F('erori sub CSP '+errs.slice(0,2)):O('fără erori JS sub CSP');await c.close()}
await b.close();console.log('\nREZULTAT:',fails,'FAIL');process.exit(fails?1:0)})();
