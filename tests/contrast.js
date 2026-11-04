// contrast WCAG (text vs fundal efectiv) + ținte tactile pe mobil, în ambele teme
const {chromium}=require('playwright');const path=require('path');
const U='file://'+path.resolve(process.argv[2]||'dist/punctum.html');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});let bad=0;
for(const theme of ['light','dark']){const ctx=await b.newContext({viewport:{width:390,height:800},colorScheme:theme});const p=await ctx.newPage();
 await p.addInitScript(t=>localStorage.setItem('punctum',JSON.stringify({theme:t})),theme);
 const seen=new Map();let small=new Map();
 for(const v of ['home','pts','tech','cond','course','refs','maps','quiz','safe','mer']){await p.goto(U+'#'+v);await p.waitForTimeout(150);
  const r=await p.evaluate(()=>{
   const lum=c=>{let a=c.match(/[\d.]+/g).map(Number);if(c.startsWith('color('))a=a.map(x=>x*255);const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return .2126*f(a[0])+.7152*f(a[1])+.0722*f(a[2])};
   const bg=e=>{while(e){const c=getComputedStyle(e).backgroundColor;const m=c.match(/[\d.]+/g);if(m&&(m.length<4||+m[3]>.9))return c;e=e.parentElement}return 'rgb(255,255,255)'};
   const out=[],sm=[];document.querySelectorAll('main *').forEach(e=>{if(![...e.childNodes].some(n=>n.nodeType===3&&n.data.trim()))return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;
    if(e.closest('.hero,.breath'))return;let b=bg(e);if(e.classList.contains('badge')){const a=b.match(/[\d.]+/g).map(Number);b=`rgb(${Math.round(a[0]*.7)},${Math.round(a[1]*.7)},${Math.round(a[2]*.7)})`}const fg=cs.color;const L1=lum(fg),L2=lum(b);const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);const size=parseFloat(cs.fontSize);const need=(size>=24||(size>=18.66&&+cs.fontWeight>=700))?3:4.5;
    if(cr<need)out.push([e.tagName+'.'+e.className,fg,b,cr.toFixed(2),(e.textContent||'').trim().slice(0,22)]);});
   document.querySelectorAll('main button,main a.b,main select,main input[type=checkbox],main summary').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.height&&(r.height<32||r.width<32))sm.push(e.tagName+':'+(e.textContent||'').trim().slice(0,12)+' '+Math.round(r.width)+'x'+Math.round(r.height))});
   return{out,sm}});
  r.out.forEach(x=>seen.set(x[0]+x[1]+x[2],x));r.sm.forEach(x=>small.set(x,1));}
 console.log(theme,'contrast sub prag:',seen.size);[...seen.values()].slice(0,12).forEach(x=>console.log('  ',x.join(' | ')));
 console.log(theme,'ținte mici (<32px):',small.size,[...small.keys()].slice(0,8));bad+=seen.size;await ctx.close()}
await b.close();process.exit(0)})();
