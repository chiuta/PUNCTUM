// funcții noi: profil, triaj, partener, jurnal, plan/ICS, transfer, durere, căutare naturală, examen, accesibilitate
const {chromium}=require('playwright');const path=require('path');
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');
let fail=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)fail++};
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const c=await b.newContext({viewport:{width:420,height:900}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.goto(U);
const ev=f=>p.evaluate(f);
// profil
ok(await ev(()=>{S.prof={};return !ptCard(PT.find(x=>x.c==='LI4')).includes('profilul tău')}),'fără profil: fără insignă de evitare');
ok(await ev(()=>{S.prof={preg:true};return ptCard(PT.find(x=>isPregPt(x))).includes('profilul tău')}),'profil sarcină: punct de evitat marcat');
ok(await ev(()=>{S.prof={preg:true};const i=MASC.findIndex(r=>r.regiune==='abdomen');masStart('c',i);const blocked=!document.querySelector('#gGo');$('#modal').innerHTML='';GATE=null;return i<0||blocked}),'sarcină + secvență abdomen: sesiune blocată');
ok(await ev(()=>{S.prof={tromboza:true};const i=MASC.findIndex(r=>r.regiune==='picioare');masStart('c',i);const blocked=!document.querySelector('#gGo');$('#modal').innerHTML='';GATE=null;return i<0||blocked}),'tromboză + secvență picioare: blocată');
// triaj
await ev(()=>{S.prof={};S.pre=0;startSes(0)});
ok(await ev(()=>document.querySelectorAll('#modal .gr').length===5),'triaj: 5 semne de alarmă');
await p.check('#modal .gr >> nth=0');
ok(await ev(()=>document.querySelector('#gGo').disabled&&document.querySelector('#gAlarm').style.display!=='none'),'triaj: semn de alarm → pornire blocată + mesaj');
await p.uncheck('#modal .gr >> nth=0');
ok(await ev(()=>!document.querySelector('#gGo').disabled),'triaj: fără semne → pornire permisă');
await p.selectOption('#gB','6');await p.click('#gGo');
ok(await ev(()=>SES.on&&SES.jb===6&&S.pre>0),'sesiune pornită cu scor înainte, triaj reținut');
// jurnal
await ev(()=>{SES.i=SES.pts.length-1;endSes(true)});
ok(await ev(()=>!!document.querySelector('#jA')),'sfârșit sesiune: formular scor după');
await p.selectOption('#jA','2');await p.fill('#jN','=HYPERLINK("x")');await p.click('text=Salvează în jurnal');
ok(await ev(()=>S.log.length===1&&S.log[0].b===6&&S.log[0].a===2),'jurnal: intrare salvată');
ok(await ev(()=>csvCell('=1+1').startsWith('"\'=')),'CSV: protecție împotriva formulelor');
// triaj reținut: a doua sesiune fără casete
await ev(()=>startSes(1));
ok(await ev(()=>document.querySelectorAll('#modal .gr').length===0&&!!document.querySelector('#gGo')),'triaj reținut 2 h');
await ev(()=>{gateCancel()});
// partener
await ev(()=>{S.pre=0;const i=MASC.findIndex(r=>r.cine==='partener');masStart('c',i)});
ok(await ev(()=>document.querySelector('#gGo').disabled),'partener: fără consimțământ pornirea e blocată');
await p.check('#gC');ok(await ev(()=>!document.querySelector('#gGo').disabled),'partener: cu consimțământ permisă');
await p.click('#gGo');
await ev(()=>sesFb('more'));
ok(await ev(()=>document.querySelector('#modal').innerText.includes('mai tare')),'partener: feedback afișat');
await ev(()=>sesFb('stop'));
ok(await ev(()=>!SES.on&&document.querySelector('#modal').innerText.includes('oprită')),'partener: STOP oprește sesiunea');
await ev(()=>{$('#modal').innerHTML=''});
// plan + ICS
await ev(()=>{S.plan=[];EU.pk='s';EU.pi=0;location.hash='#eu';EU.tab='plan';render()});
await p.selectOption('#plSel','s0');await p.click('text=+ Adaugă');
ok(await ev(()=>S.plan.length===1&&S.plan[0].k==='s'),'plan: element adăugat');
const ics=await ev(()=>icsBuild());
ok(/BEGIN:VEVENT/.test(ics)&&/RRULE:FREQ=WEEKLY;BYDAY=/.test(ics)&&ics.split('\r\n').every(l=>l.length<=75),'ICS valid, linii ≤75 caractere');
// transfer
const code=await ev(()=>{S.fav=['LI4|Hegu'];stCode();return EU.code});
ok(code.startsWith('PUNCTUM1:'),'cod de transfer generat');
await ev(()=>{S.fav=[];S.log=[];EU.tab='setari';render()});
await ev(()=>{$('#stTxt').value=EU.code;stImportCode()});
ok(await ev(()=>S.fav.length===1&&S.fav[0]==='LI4|Hegu'),'import din cod restaurează starea');
await ev(()=>stApply(JSON.stringify({"__proto__":{"x":1},"fav":{"a":1},"prof":{"preg":"da"},"acc":{"size":99},"plan":[{"k":"s","i":9999,"time":"99:99","days":[9]}],"log":"x"})));
ok(await ev(()=>Array.isArray(S.fav)&&!S.prof.preg&&S.acc.size===0&&S.plan.length===0&&S.log.length===0&&({}).x===undefined),'import ostil: sanitizat');
// durere
await ev(()=>{location.hash='#durere';DR.z='lombar';DR.s=DS[0];DR.d=DD[0];DR.red=[false,false,false,false,false];render()});
ok(await ev(()=>document.querySelector('#main').innerText.includes('Sugestii')),'durere: sugestii pentru zonă');
await ev(()=>{DR.red=[true,false,false,false,false];render()});
ok(await ev(()=>!!document.querySelector('#main .warn[role=alert]')&&!document.querySelector('#main').innerText.includes('Sugestii')),'durere: semn de alarmă → fără sugestii');
await ev(()=>{DR.red=[false,false,false,false,false];DR.s=DS[4];render()});
ok(await ev(()=>!document.querySelector('#main').innerText.includes('Sugestii')),'durere: arsură/furnicături → fără rutine');
// căutare naturală
await ev(()=>{location.hash='#home'});await p.waitForTimeout(150);await ev(()=>{$('#q').value='mă doare gâtul de la birou';doSearch()});
ok(await ev(()=>document.querySelector('#main').innerText.includes('Ceafă')),'căutare naturală: „mă doare gâtul" → Ceafă');
await ev(()=>{$('#q').value='am durere în piept';doSearch()});
ok(await ev(()=>!!document.querySelector('#main .warn[role=alert]')),'căutare: simptom urgent → alertă 112');
// examen
await ev(()=>{location.hash='#exam';EX.code='ST36';EX.view=mpViewOf('ST36');EX.res=null;render()});
await ev(()=>{const s=document.querySelector('#exSvg');s.scrollIntoView({block:'center'});const a=compPos(EX.view).pos['ST36'][0];const pt=s.createSVGPoint();pt.x=a[0];pt.y=a[1];const q=pt.matrixTransform(s.getScreenCTM());s.dispatchEvent(new MouseEvent('click',{clientX:q.x,clientY:q.y,bubbles:true}))});
ok(await ev(()=>EX.res&&EX.res.lvl==='exact'&&S.exam.n>=1),'examen: apăsare exactă = „exact"');
// accesibilitate
await ev(()=>{accSet('size',3);accSet('hc',true)});
ok(await ev(()=>document.documentElement.style.getPropertyValue('--fz')==='1.5'&&document.documentElement.classList.contains('hc')),'accesibilitate: text mărit + contrast');
await ev(()=>{accSet('size',0);accSet('hc',false)});
ok(errs.length===0,'fără erori JS '+errs.join('|'));
console.log('REZULTAT:',fail,'FAIL');await b.close();process.exit(fail?1:0)})();
