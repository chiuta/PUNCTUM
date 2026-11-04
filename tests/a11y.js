const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');await p.goto(U);
const views=await p.evaluate(()=>NAVX.map(x=>x.k).concat(['home']));let bad=0;
for(const v of [...new Set(views)]){await p.goto(U+'#'+v);await p.waitForTimeout(120);
const r=await p.evaluate(()=>{const o=[];document.querySelectorAll('[onclick]').forEach(e=>{if(!/^(BUTTON|A|SUMMARY|INPUT|SELECT|LABEL)$/.test(e.tagName)&&e.tabIndex<0)o.push(e.tagName+'.'+e.className+': '+(e.textContent||'').slice(0,25))});
document.querySelectorAll('button:not([aria-label])').forEach(e=>{if(!e.textContent.trim())o.push('button vid '+e.outerHTML.slice(0,60))});
document.querySelectorAll('input:not([type=checkbox]):not([aria-label]):not([placeholder])').forEach(e=>o.push('input fără etichetă '+e.id));
document.querySelectorAll('img:not([alt])').forEach(e=>o.push('img fără alt'));const ids={};document.querySelectorAll('[id]').forEach(e=>{ids[e.id]=(ids[e.id]||0)+1});Object.entries(ids).forEach(([k,n])=>{if(n>1)o.push('id duplicat '+k+' x'+n)});
document.querySelectorAll('select,input:not([type=hidden])').forEach(e=>{const lab=e.getAttribute('aria-label')||e.getAttribute('aria-labelledby')||(e.id&&document.querySelector('label[for="'+e.id+'"]'))||e.closest('label')||e.getAttribute('title')||e.getAttribute('placeholder');if(!lab)o.push('control fără etichetă: '+e.tagName+e.type+' '+(e.className||''))});
document.querySelectorAll('a[href^=http]').forEach(e=>{if(e.target==='_blank'&&!/noopener/.test(e.rel))o.push('link extern fără noopener '+e.href.slice(0,40))});
return o});
if(r.length){bad+=r.length;console.log(v,[...new Set(r)].slice(0,6))}}
console.log('probleme:',bad);await b.close()})();
