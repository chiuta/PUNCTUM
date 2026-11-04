// acoperire traduceri: câte șiruri românești rămân vizibile în fiecare limbă (node tests/i18n_cov.js [html])
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1100,height:900}});
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');await p.goto(U);
const RO=/[ăîșțĂÎȘȚ]|\b(și|pentru|este|sunt|dacă|sau|fără|după|prin|când)\b/i;
const views=await p.evaluate(()=>NAVX.map(x=>x.k).concat(['home','quiz']));
let worst=0;
for(const l of ['en','fr','it','es','pt','de','hu']){
 let ro=0,tot=0,ex=[];
 for(const v of [...new Set(views)]){await p.goto(U+'#'+v);await p.evaluate(l=>setLang(l),l);await p.waitForTimeout(100);
  const r=await p.evaluate(()=>{const o=[];const w=document.createTreeWalker(document.getElementById('main'),NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.data.replace(/\s+/g,' ').trim();if(t.length>3)o.push(t)}return o});
  r.forEach(t=>{tot++;if(RO.test(t)){ro++;if(ex.length<40)ex.push(v+': '+t.slice(0,60))}})}
 const pc=tot?(100*ro/tot).toFixed(1):0;worst=Math.max(worst,+pc);console.log(l,`${ro}/${tot} șiruri rămase în română (${pc}%)`,ex);}
await b.close();process.exit(0)})();
