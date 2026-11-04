const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');await p.goto(U);
const views=await p.evaluate(()=>NAVX.map(x=>x.k).concat(['home']));let bad=0;
for(const v of [...new Set(views)]){await p.goto(U+'#'+v);await p.waitForTimeout(120);
const r=await p.evaluate(()=>{const o=[];document.querySelectorAll('[onclick]').forEach(e=>{if(!/^(BUTTON|A|SUMMARY|INPUT|SELECT|LABEL)$/.test(e.tagName)&&e.tabIndex<0)o.push(e.tagName+'.'+e.className+': '+(e.textContent||'').slice(0,25))});
document.querySelectorAll('button:not([aria-label])').forEach(e=>{if(!e.textContent.trim())o.push('button vid '+e.outerHTML.slice(0,60))});
document.querySelectorAll('input:not([type=checkbox]):not([aria-label]):not([placeholder])').forEach(e=>o.push('input fără etichetă '+e.id));
document.querySelectorAll('img:not([alt])').forEach(e=>o.push('img fără alt'));return o});
if(r.length){bad+=r.length;console.log(v,[...new Set(r)].slice(0,6))}}
console.log('probleme:',bad);await b.close()})();
