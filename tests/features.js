// funcții noi: profil, triaj, partener, jurnal, plan/ICS, transfer, durere, căutare naturală, examen, accesibilitate
const {chromium}=require('playwright');const path=require('path');
// Confirmările folosesc FFF.dialog (modal), nu confirm() nativ: testele apasă „Da”.
const yes=async p=>{await p.waitForSelector('dialog[data-fff-dialog=confirm] .fff-primary');await p.click('dialog[data-fff-dialog=confirm] .fff-primary');await p.waitForTimeout(150)};
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
await ev(()=>{S.prof={};S.profSeen=true;S.pre=0;startSes(0)});
ok(await ev(()=>document.querySelectorAll('#modal .gr').length===9&&RED.length===9),'triaj: 9 semne de alarmă');
await p.check('#modal .gr >> nth=0');
ok(await ev(()=>document.querySelector('#gGo').disabled&&document.querySelector('#gAlarm').style.display!=='none'&&document.querySelector('#gAlarm').innerText.includes('112')),'triaj: semn de alarm → pornire blocată + mesaj cu 112');
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
// triaj reținut: a doua sesiune din aceeași regiune fără casete; altă regiune → din nou casetele
await ev(()=>startSes(0));
ok(await ev(()=>document.querySelectorAll('#modal .gr').length===0&&!!document.querySelector('#gGo')),'triaj reținut (aceeași regiune, 30 min)');
await ev(()=>{gateCancel()});
await ev(()=>startSes(protIdx('Ochi obosiți')));
ok(await ev(()=>document.querySelectorAll('#modal .gr').length===9),'triaj: altă regiune → se reia lista');
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
await ev(()=>{$('#stTxt').value=EU.code;stImportCode()});await yes(p);
ok(await ev(()=>S.fav.length===1&&S.fav[0]==='LI4|Hegu'),'import din cod restaurează starea');
await ev(()=>{stApply(JSON.stringify({"__proto__":{"x":1},"fav":{"a":1},"prof":{"preg":"da"},"acc":{"size":99},"plan":[{"k":"s","i":9999,"time":"99:99","days":[9]}],"log":"x"}))});await yes(p);
ok(await ev(()=>Array.isArray(S.fav)&&!S.prof.preg&&S.acc.size===0&&S.plan.length===0&&S.log.length===0&&({}).x===undefined),'import ostil: sanitizat');
// durere
await ev(()=>{location.hash='#durere';DR.z='lombar';DR.s=DS[0];DR.d=DD[1];DR.red=RED.map(()=>false);render()});
ok(await ev(()=>document.querySelector('#main').innerText.includes('Sugestii')),'durere: sugestii pentru zonă');
await ev(()=>{DR.red=RED.map((x,i)=>i===0);render()});
ok(await ev(()=>!!document.querySelector('#main .warn[role=alert]')&&!document.querySelector('#main').innerText.includes('Sugestii')),'durere: semn de alarmă → fără sugestii');
await ev(()=>{DR.red=RED.map(()=>false);DR.s=DS[4];render()});
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

// ---------- audit medical runda 2 ----------
await ev(()=>{S.prof={};S.profSeen=true;S.pre=0;GATE=null;$('#modal').innerHTML='';DR.red=RED.map(()=>false);DR.s='';DR.d=''});
// NLR
const urg=await ev(()=>['mă doare pieptul','strângere în piept','dureri de piept','gamba umflată','piciorul umflat și cald','nu pot vorbi','gura strâmbă','amorțit brațul stâng','cea mai puternică durere de cap','ceafă țeapănă și febră','sângerez','vomit sânge','tuse cu sânge','nu pot urina','vreau să mor','nu văd cu un ochi','febra 39','am avut un avc'].filter(t=>!nlUrgent(t)));
ok(urg.length===0,'NLR: formulări de urgență prinse (lipsă: '+urg.join('; ')+')');
const nurg=await ev(()=>['mă doare gâtul de la birou','ochi obosiți după ecran','insomnie și agitație','tensiune în umeri','dureri menstruale ușoare','nas înfundat'].filter(t=>nlUrgent(t)));
ok(nurg.length===0,'NLR: fără fals pozitive pe căutări obișnuite ('+nurg.join('; ')+')');
await ev(()=>{location.hash='#home'});await p.waitForTimeout(150);await ev(()=>{$('#q').value='mă doare pieptul';doSearch()});
ok(await ev(()=>!!document.querySelector('#main .warn[role=alert]')&&document.querySelector('#main').innerText.includes('112')),'căutare „mă doare pieptul” → alertă 112');
// profil gol → avertisment
await ev(()=>{S.prof={};S.profSeen=false;S.pre=0;startSes(0)});
ok(await ev(()=>!!document.querySelector('#gProf')&&!document.querySelector('#gGo')),'profil necompletat: avertisment și fără pornire');
await ev(()=>gateProfSeen());
ok(await ev(()=>S.profSeen===true&&!document.querySelector('#gProf')&&!!document.querySelector('#gGo')),'„Nu am niciuna” → poarta normală');
await ev(()=>{gateCancel();S.pre=0});
await ev(()=>{S.prof={};S.profSeen=false;startSes(0);gateProfil()});
ok(await ev(()=>location.hash==='#eu'&&!document.querySelector('#gProf')),'„Completez profilul” → pagina Eu');
await ev(()=>{S.profSeen=true;location.hash='#home'});
// sarcină blochează secvențele/combinațiile cu puncte nemarcate înainte
const pregBlock=await ev(()=>{const bad=[];S.prof={preg:true};S.profSeen=true;
 [['s',MASS.findIndex(x=>x.id==='s17')],['s',MASS.findIndex(x=>x.id==='s18')],['s',MASS.findIndex(x=>x.id==='s23')],['s',MASS.findIndex(x=>x.id==='s27')],['c',MASC.findIndex(x=>x.id==='r11')],['c',MASC.findIndex(x=>x.id==='r09')]].forEach(([k,i])=>{masStart(k,i);if(document.querySelector('#gGo'))bad.push(k+i);$('#modal').innerHTML='';GATE=null});
 return bad});
ok(pregBlock.length===0,'sarcină: r11/s17/s18/s23/s27/r09 blocate ('+pregBlock+')');
ok(await ev(()=>['BL23','BL25','BL26','BL52','GB30','KI3','LR3','SP4','SP8','SP10'].every(c=>isPregPt(PT.find(x=>x.c===c)))),'sarcină: punctele din PREGX sunt marcate');
// text de siguranță în poartă
await ev(()=>{S.prof={};S.profSeen=true;S.pre=0;masStart('s',MASS.findIndex(x=>x.id==='s30'))});
ok(await ev(()=>document.querySelector('#modal').innerText.includes('Citește înainte')&&document.querySelector('#modal').innerText.includes('pacemaker')),'poarta afișează nota combinației (s30)');
await ev(()=>{gateCancel();S.pre=0;masStart('c',MASC.findIndex(x=>x.id==='r04'))});
ok(await ev(()=>document.querySelector('#modal').innerText.includes('Citește înainte')&&document.querySelector('#modal').innerText.includes('urgențe în aceeași zi')),'poarta afișează „evită” la secvență (r04, TVP)');
await ev(()=>{gateCancel();S.pre=0;startSes(protIdx('Lombalgie'))});
ok(await ev(()=>document.querySelector('#modal').innerText.includes('amorțeală în șa')),'poarta afișează nota protocolului (coadă de cal)');
await ev(()=>{gateCancel();S.pre=0;startCustom('x',['LI4','ST36'],0,{warn:'Semn de alarmă de test'})});
ok(await ev(()=>document.querySelector('#modal').innerText.includes('Semn de alarmă de test')),'poarta afișează semnalele de alarmă ale afecțiunii');
await ev(()=>{gateCancel()});
// Durere: textul de siguranță în carduri + alertă de zonă
await ev(()=>{location.hash='#durere';DR.z='lombar';DR.s=DS[0];DR.d=DD[1];DR.red=RED.map(()=>false);render()});
ok(await ev(()=>document.querySelector('#main').innerText.includes('amorțeală în șa')),'Durere: cardurile arată nota protocolului/secvenței');
await ev(()=>{DR.z='picioare';DR.d=DD[0];render()});
ok(await ev(()=>document.querySelector('#main').innerText.includes('nu masa piciorul')&&!document.querySelector('#main').innerText.includes('Sugestii')),'Durere: picior + „începută azi” → alertă de zonă, fără sugestii');
await ev(()=>{DR.z='cap';DR.d=DD[1];DR.s=DS[6];render()});
ok(await ev(()=>document.querySelector('#main').innerText.includes('Durere de cap nouă')&&!document.querySelector('#main').innerText.includes('Sugestii')),'Durere: slăbiciune/amorțeală tratată ca semn de alarmă');
await ev(()=>{DR.z='';DR.s='';DR.d='';render()});
// cerere de acord medical pentru fiecare „ask”
await ev(()=>{S.prof={anticoag:true};S.profSeen=true;S.pre=0;masStart('c',MASC.findIndex(x=>x.id==='r10'))});
ok(await ev(()=>document.querySelectorAll('#modal .ga').length>=1&&document.querySelector('#modal').innerText.includes('maximum 3 din 10')),'anticoagulante: insignă cu presiune ușoară și bifă de acord medical');
await p.evaluate(()=>{document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);gateChk()});
ok(await ev(()=>document.querySelector('#gGo').disabled),'„ask” fără acord bifat → pornire blocată');
await ev(()=>{document.querySelectorAll('#modal .ga').forEach(x=>x.checked=true);gateChk()});
ok(await ev(()=>!document.querySelector('#gGo').disabled),'„ask” cu acord bifat → pornire permisă');
await ev(()=>{document.querySelector('#gGo').click()});
ok(await ev(()=>SES.on&&document.querySelector('#modal').innerText.includes('maximum 3 din 10')),'anticoagulante: sesiunea afișează presiune ușoară');
await ev(()=>{endSes(false);GATE=null});
// pacemaker / neuropatie / tromboză / abdomen / osteo
const blk=await ev(()=>{const bad=[];
 const T=(prof,k,id)=>{S.prof=prof;S.profSeen=true;const i=(k==='s'?MASS:MASC).findIndex(x=>x.id===id);masStart(k,i);if(document.querySelector('#gGo'))bad.push(Object.keys(prof)[0]+':'+id);$('#modal').innerHTML='';GATE=null};
 T({pacemaker:true},'s','s30');T({osteo:true},'s','s30');T({neuropatie:true},'s','s22');T({neuropatie:true},'s','s27');T({neuropatie:true},'c','r05');T({abdomen:true},'s','s25');T({abdomen:true},'c','r08');T({osteo:true},'c','r11');T({rinichi:true},'s','s16');T({ochi:true},'s','s04');
 S.prof={tromboza:true};S.profSeen=true;startSes(protIdx('Picioare grele'));if(document.querySelector('#gGo'))bad.push('tromboza:PROT picioare');$('#modal').innerHTML='';GATE=null;
 return bad});
ok(blk.length===0,'profil → blocări (pacemaker/osteo/neuropatie/abdomen/rinichi/ochi/tromboză): '+blk);
ok(await ev(()=>['epilepsie','inima','ochi','rinichi','abdomen','limfedem'].every(k=>PFLAGS.some(f=>f[0]===k))),'PFLAGS: bifele noi există');
// copii: atingere ușoară, fără presiune pe puncte
await ev(()=>{S.prof={};S.profSeen=true;S.pre=0;cndStart('colici-sugar')});
ok(await ev(()=>document.querySelector('#modal').innerText.includes('adult responsabil')&&document.querySelector('#modal').innerText.includes('Citește înainte')&&!document.querySelectorAll('#modal .gr').length),'copii: poartă pediatrică cu semnale de alarmă, fără lista adultului');
ok(await ev(()=>document.querySelector('#gGo').disabled),'copii: pornire blocată până la confirmarea adultului');
await ev(()=>{document.querySelector('#modal .gk').checked=true;gateChk();document.querySelector('#gGo').click()});
ok(await ev(()=>SES.on&&SES.child&&SES.fixed&&SES.pts.every(x=>x.s<=20)),'copii: sesiune fixă, pași ≤ 20 s');
ok(await ev(()=>{const t=document.querySelector('#modal').innerText;return t.includes('fără presiune pe puncte')&&!t.includes('Presiune confortabilă')&&!t.includes('s / punct')}),'copii: fără linie de presiune și fără selector de durată');
await ev(()=>{endSes(false);GATE=null});
ok(await ev(()=>COND.filter(c=>c.g==='Copii').every(c=>{S.pre=0;cndStart(c.id);const ok=!!document.querySelector('#modal .gk');$('#modal').innerHTML='';GATE=null;return ok})),'copii: toate afecțiunile din grupul Copii folosesc poarta pediatrică');
// linia de presiune pe pași ușori
await ev(()=>{S.prof={};S.profSeen=true;S.pre=0;masStart('c',MASC.findIndex(x=>x.id==='r08'));document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);gateChk();document.querySelector('#gGo').click()});
ok(await ev(()=>document.querySelector('#modal').innerText.includes('ușoară (2–3 din 10)')&&!document.querySelector('#modal').innerText.includes('Presiune fermă')),'abdomen: linia de presiune este „ușoară”, nu „fermă”');
await ev(()=>{endSes(false);GATE=null});
// jurnal: agravare
await ev(()=>{SES.title='t';SES.jb=2;SES.fbn=0;$('#modal').innerHTML=sesDoneHtml()});
await p.selectOption('#jA','6');await p.click('text=Salvează în jurnal');
ok(await ev(()=>document.querySelector('#modal').innerText.includes('Disconfortul a crescut')),'jurnal: agravare → mesaj de prudență');
await ev(()=>{$('#modal').innerHTML='';S.log=[]});
// BL1 scos din auto-presiune
ok(await ev(()=>!PROT.some(x=>x.t.startsWith('Ochi')&&x.p.includes('BL1'))&&!COND.some(c=>c.pts.includes('BL1'))),'BL1 nu mai e țintă de auto-presiune');

// ---------- audit runda 2 (cod + accesibilitate): fereastra modală, tick, anunțuri ----------
await ev(()=>{S.prof={};S.profSeen=true;S.pre=0;GATE=null;$('#modal').innerHTML='';S.lang='ro';SES.sec=60;SES.dur=60;
 document.getElementById('main').insertAdjacentHTML('afterbegin','<button id="xo" class="b">xo</button>');document.getElementById('xo').addEventListener('click',()=>startSes(0))});
await p.focus('#xo');await p.keyboard.press('Enter');await p.waitForTimeout(80);
const dlg=await ev(()=>{const b=document.querySelector('#modal .box');const t=document.getElementById(b.getAttribute('aria-labelledby')||'');return{role:b.getAttribute('role'),modal:b.getAttribute('aria-modal'),lab:!!t&&t.textContent.length>0,inM:document.getElementById('modal').contains(document.activeElement),
 hdr:document.querySelector('header').inert,main:document.getElementById('main').inert,foot:document.querySelector('footer').inert,live:document.getElementById('sesLive').inert}});
ok(dlg.role==='dialog'&&dlg.modal==='true'&&dlg.lab,'poarta: role=dialog aria-modal aria-labelledby cu titlu');
ok(dlg.inM,'poarta: focusul intră în fereastră');
ok(dlg.hdr&&dlg.main&&dlg.foot&&!dlg.live,'poarta: fundalul este inert (regiunea live nu)');
let trapOk=true;for(let i=0;i<14;i++){await p.keyboard.press('Tab');if(!await ev(()=>document.getElementById('modal').contains(document.activeElement)))trapOk=false}
for(let i=0;i<14;i++){await p.keyboard.press('Shift+Tab');if(!await ev(()=>document.getElementById('modal').contains(document.activeElement)))trapOk=false}
ok(trapOk,'poarta: Tab/Shift+Tab rămân în fereastră (capcană de focus)');
await p.keyboard.press('Escape');await p.waitForTimeout(80);
const esc1=await ev(()=>({empty:document.getElementById('modal').innerHTML==='',gate:GATE,hdr:document.querySelector('header').inert,main:document.getElementById('main').inert,ae:document.activeElement.id}));
ok(esc1.empty&&esc1.gate===null&&!esc1.hdr&&!esc1.main,'Escape închide poarta și scoate inert');
ok(esc1.ae==='xo','focusul revine la butonul care a deschis poarta');
// sesiune: a doua deschidere, trecere prin poartă
await p.focus('#xo');await p.keyboard.press('Enter');await p.waitForTimeout(60);
await ev(()=>{document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);gateChk()});
await p.click('#gGo');await p.waitForTimeout(100);
const ses=await ev(()=>{const b=document.querySelector('#modal .box');const bt=[...document.querySelectorAll('#modal .bar button')].slice(0,4);return{on:SES.on,role:b.getAttribute('role'),inM:document.getElementById('modal').contains(document.activeElement),ae:document.activeElement.getAttribute('data-f'),labs:bt.map(x=>x.getAttribute('aria-label')),timerHidden:document.getElementById('sesT').getAttribute('aria-hidden'),live:document.getElementById('sesLive').textContent}});
ok(ses.on&&ses.role==='dialog'&&ses.inM&&ses.ae==='pause','sesiune: dialog, focus pe Pauză');
ok(ses.labs.every(x=>x&&x.length>3)&&ses.labs[1]==='Pauză','sesiune: ◀ ❚❚ ▶ ✕ au aria-label (ro: '+ses.labs.join(' / ')+')');
ok(ses.timerHidden==='true'&&/^Pasul 1 din \d+: /.test(ses.live),'sesiune: cronometrul ascuns de cititor, pasul anunțat în regiunea live („'+ses.live.slice(0,50)+'”)');
// tick nu reconstruiește: același buton, focus păstrat, regiunea live nu spamează
await ev(()=>{window.__pb=document.querySelector('[data-f=pause]');window.__lm=0;new MutationObserver(m=>{window.__lm+=m.length}).observe(document.getElementById('sesLive'),{childList:true,characterData:true,subtree:true});window.__tm=0;new MutationObserver(m=>{window.__tm+=m.length}).observe(document.getElementById('modal'),{childList:true})});
await p.focus('[data-f=pause]');await p.waitForTimeout(2600);
const tk=await ev(()=>({same:document.querySelector('[data-f=pause]')===window.__pb,focus:document.activeElement===window.__pb,left:SES.left,txt:document.getElementById('sesT').textContent,lm:window.__lm,tm:window.__tm}));
ok(tk.same&&tk.focus,'tick: butonul Pauză nu e înlocuit, focusul rămâne');
ok(tk.tm===0&&tk.lm===0,'tick: modalul nu e rescris, regiunea live nu e actualizată în fiecare secundă (modal '+tk.tm+', live '+tk.lm+')');
ok(tk.left<=58&&tk.txt===String(tk.left),'tick: numărătoarea scade și se afișează ('+tk.left+')');
// click lung peste un tick (mousedown 1.3 s mouseup) pe Pauză
{const bb=await (await p.$('[data-f=pause]')).boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.waitForTimeout(1300);await p.mouse.up();await p.waitForTimeout(50);
 ok(await ev(()=>SES.paused),'click pe Pauză care traversează un tick nu se pierde');
 ok(await ev(()=>document.getElementById('sesLive').textContent.length>0&&document.querySelector('[data-f=pause]').getAttribute('aria-label')==='Reia'),'pauza: eticheta devine „Reia” și se anunță');
 await ev(()=>sesPause());}
// pas următor: anunț nou, focus pe același buton
await p.focus('[data-f=next]');await p.keyboard.press('Enter');await p.waitForTimeout(80);
ok(await ev(()=>/^Pasul 2 din /.test(document.getElementById('sesLive').textContent)&&document.activeElement.getAttribute('data-f')==='next'),'pas următor: anunț „Pasul 2”, focusul rămâne pe ▶');
// Escape oprește sesiunea
await p.keyboard.press('Escape');await p.waitForTimeout(80);
ok(await ev(()=>!SES.on&&document.getElementById('modal').innerHTML===''&&!document.getElementById('main').inert),'Escape în sesiune o oprește și eliberează fundalul');
// pauză când documentul e ascuns; cronometru în timp real
await ev(()=>{S.pre=Date.now();S.preReg=gateReg(PT.filter(x=>PROT[0].p.includes(x.c)),{});startSes(0)});
await ev(()=>{const c=document.querySelector('#gGo');if(c){document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);gateChk();c.click()}});
ok(await ev(()=>SES.on),'sesiune pornită pentru testul de vizibilitate');
await ev(()=>{Object.defineProperty(document,'hidden',{get:()=>true,configurable:true});document.dispatchEvent(new Event('visibilitychange'))});
ok(await ev(()=>SES.paused),'document ascuns → sesiunea intră în pauză');
await ev(()=>{delete document.hidden;sesPause()});
const rt=await ev(()=>{SES.left=40;sesArm();SES.end-=5000;tick();return SES.left});
ok(rt<=36&&rt>=34,'cronometrul se bazează pe timpul real (după 5 s întârziere: '+rt+')');
await ev(()=>{SES.left=1;SES.end=Date.now()-60000;const i=SES.i;tick();window.__i2=SES.i-i});
ok(await ev(()=>window.__i2===1),'tick după o întârziere mare avansează un singur pas');
await ev(()=>{endSes(false)});
// durata rutinei nu schimbă setarea globală
await ev(()=>{SES.sec=60;S.pre=0;sesGo('t',[PT[0],PT[1]],{sec:30})});
ok(await ev(()=>SES.dur===30&&SES.sec===60&&SES.left===30),'rutină de 30 s: SES.dur=30, SES.sec rămâne 60');
await ev(()=>{endSes(false);sesGo('t2',[PT[0],PT[1]],{});});
ok(await ev(()=>SES.dur===60),'sesiunea următoare revine la durata aleasă de utilizator');
await ev(()=>{endSes(false)});
// partener: click pe STOP care traversează un tick
await ev(()=>{S.pre=0;const i=MASC.findIndex(r=>r.cine==='partener');masStart('c',i)});
await ev(()=>{document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);const c=document.getElementById('gC');if(c)c.checked=true;gateChk();document.querySelector('#gGo').click()});
ok(await ev(()=>SES.on&&SES.partner),'partener: sesiune pornită');
{const bb=await (await p.$('[data-f=stop]')).boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.waitForTimeout(1400);await p.mouse.up();await p.waitForTimeout(80);
 ok(await ev(()=>!SES.on&&document.getElementById('modal').innerText.includes('oprită')),'partener: click pe STOP peste un tick oprește sesiunea');}
await ev(()=>{$('#modal').innerHTML=''});
// partener: feedback fără redesenare (butoanele rămân aceleași), se șterge după 6 s
await ev(()=>{S.pre=0;const i=MASC.findIndex(r=>r.cine==='partener');masStart('c',i)});
await ev(()=>{document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);const c=document.getElementById('gC');if(c)c.checked=true;gateChk();document.querySelector('#gGo').click()});
await ev(()=>{window.__sb=document.querySelector('[data-f=more]');sesFb('more')});
ok(await ev(()=>window.__sb===document.querySelector('[data-f=more]')&&!document.getElementById('sesFb').hidden&&document.getElementById('sesFb').textContent.includes('mai tare')),'partener: feedback afișat fără a reconstrui butoanele');
await ev(()=>{endSes(false)});await ev(()=>{$('#modal').innerHTML=''});
// o sesiune nouă nu e suprascrisă de tick-ul uneia în curs
await ev(()=>{S.pre=0;startSes(0)});
await ev(()=>{document.querySelectorAll('#modal .gr').forEach(x=>x.checked=false);gateChk();document.querySelector('#gGo').click()});
await ev(()=>{S.pre=0;masStart('s',0)});
await p.waitForTimeout(1500);
ok(await ev(()=>!SES.on&&!!GATE&&!!document.querySelector('#gGo')&&!!document.querySelector('#modal .gr')),'poarta B nu e suprascrisă de sesiunea A (A încheiată, poarta persistă după 1,5 s)');
await ev(()=>{gateCancel()});
// etichete în limba curentă
await ev(()=>{setLang('en');location.hash='#pts'});await p.waitForTimeout(250);
const lab=await ev(()=>({skip:document.querySelector('.skip').textContent,q:document.getElementById('q').getAttribute('aria-label'),l:document.getElementById('lang').getAttribute('aria-label'),t:document.getElementById('thm').getAttribute('aria-label'),n:document.getElementById('nav').getAttribute('aria-label'),star:document.querySelector('.star').getAttribute('aria-label'),pr:document.querySelector('.star').getAttribute('aria-pressed'),cur:document.querySelector('#nav a[aria-current=page]')&&document.querySelector('#nav a[aria-current=page]').getAttribute('data-k')}));
ok(lab.skip==='Skip to content'&&lab.q==='Search'&&lab.l==='Language'&&/^Theme: /.test(lab.t)&&lab.n==='Main navigation'&&/^Favorite: [A-Z]+\d+ /.test(lab.star)&&lab.pr==='false'&&lab.cur==='pts','etichete aria în en (skip, căutare, limbă, temă, navigare, stea cu numele punctului, aria-current)'+JSON.stringify(lab));
await ev(()=>{setLang('ro')});await p.waitForTimeout(150);
ok(await ev(()=>document.querySelector('.skip').textContent==='Sari la conținut'&&document.getElementById('q').getAttribute('aria-label')==='Caută'),'etichete aria în ro');
// navigarea cu tastatura nu pierde focusul (nav nu se reconstruiește)
await p.focus('#nav a[data-k=theory]');await p.keyboard.press('Enter');await p.waitForTimeout(150);
ok(await ev(()=>document.activeElement.getAttribute('data-k')==='theory'),'nav: focusul rămâne pe linkul activat');
ok(errs.length===0,'fără erori JS '+errs.join('|'));
console.log('REZULTAT:',fail,'FAIL');await b.close();process.exit(fail?1:0)})();
