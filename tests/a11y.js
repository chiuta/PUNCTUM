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
console.log('probleme:',bad);
// ---------- audit runda 2: ținte tactile, câmpuri ≥16 px, reflow la text 150 %, contrast ----------
let f2=0;const OK=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)f2++};
{const ctx=await b.newContext({viewport:{width:360,height:740},hasTouch:true,deviceScaleFactor:2});const q=await ctx.newPage();const errs=[];q.on('pageerror',e=>errs.push(e.message));
 await q.addInitScript(()=>{try{localStorage.setItem('punctum',JSON.stringify({profSeen:true}))}catch(e){}});
 await q.goto(U+'#cond');await q.waitForTimeout(200);
 const t1=await q.evaluate(()=>{const r=e=>{const b=e.getBoundingClientRect();return[Math.round(b.width),Math.round(b.height)]};return{thm:r(document.getElementById('thm')),lang:r(document.getElementById('lang')),q:r(document.getElementById('q')),nav:[...document.querySelectorAll('#nav a')].map(r).reduce((m,x)=>Math.min(m,x[1]),99)}});
 OK(t1.thm[0]>=44&&t1.thm[1]>=44,'buton temă ≥44×44 ('+t1.thm+')');OK(t1.lang[1]>=44&&t1.q[1]>=44&&t1.nav>=44,'selector limbă, căutare, linkuri nav ≥44 px înălțime');
 const t2=await q.evaluate(()=>{document.querySelectorAll('main details').forEach(d=>d.open=true);const a=[...document.querySelectorAll('main .tag a, main a.tag')].find(e=>e.getClientRects().length);if(!a)return null;const r=a.getBoundingClientRect();a.scrollIntoView({block:'center',behavior:'instant'});const r2=a.getBoundingClientRect();const cx=r2.left+r2.width/2;const hits=[-14,14].map(dy=>{const e=document.elementFromPoint(cx,r2.top+r2.height/2+dy);return !!e&&(dy<0?(e===a||a.contains(e)||e.closest('a')===a):!!e.closest('a'))}); /* în jos poate fi zona legăturii vecine */return{h:Math.round(r2.height),hits}});
 OK(t2&&t2.hits.every(Boolean),'tag-uri legături: zona de atingere se extinde ≥14 px deasupra (și acoperă legătura vecină dedesubt) ('+JSON.stringify(t2)+')');
 await q.goto(U+'#masaj');await q.waitForTimeout(150);
 const bh=await q.evaluate(()=>[...document.querySelectorAll('main button.b')].map(e=>e.getBoundingClientRect().height).filter(h=>h>0).reduce((m,h)=>Math.min(m,h),99));
 OK(bh>=43.5,'butoane .b ≥44 px înălțime ('+bh+')');
 // font câmpuri
 const bad=[];for(const v of ['pts','maps','quiz','cond','course','eu','home','mer','tech','masaj','durere']){await q.goto(U+'#'+v);await q.waitForTimeout(120);
  const r=await q.evaluate(()=>[...document.querySelectorAll('input:not([type=checkbox]):not([type=file]):not([type=hidden]),select,textarea')].filter(e=>e.getClientRects().length).map(e=>[e.tagName+(e.id?'#'+e.id:''),parseFloat(getComputedStyle(e).fontSize)]).filter(x=>x[1]<15.99));
  r.forEach(x=>bad.push(v+':'+x.join('=')))}
 OK(bad.length===0,'câmpuri input/select/textarea ≥16 px în 11 vizualizări ('+bad.slice(0,6)+')');
 // hărți: zone de atingere extinse, fără suprapuneri
 const mp=[];for(const vw of ['front','back','handP','handD','footS','footD','ear']){await q.goto(U+'#maps');await q.evaluate(vw=>{if(typeof M!=='undefined'&&VW[vw]){M.view=vw;render()}},vw);await q.waitForTimeout(150);
  const r=await q.evaluate(()=>{const H=[...document.querySelectorAll('#mpSvg .p .hit')].map(e=>{const b=e.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top+b.height/2,r:b.width/2}});if(H.length<2)return null;const sv=document.getElementById('mpSvg'),bs=9*sv.getScreenCTM().a;let ov=0,mx=0;H.forEach(a=>{mx=Math.max(mx,a.r*2)});for(let i=0;i<H.length;i++)for(let j=i+1;j<H.length;j++){const d=Math.hypot(H[i].x-H[j].x,H[i].y-H[j].y);if(d>=2*bs-0.5&&d<H[i].r+H[j].r-1.5)ov++}return{n:H.length,mx:Math.round(mx),ov}});
  if(r)mp.push(vw+':'+JSON.stringify(r))}
 OK(mp.length>0&&mp.every(x=>/"ov":0/.test(x)),'hărți: zonele de atingere ale punctelor nu se suprapun ('+mp.join(' ')+')');
 OK(mp.some(x=>+(x.match(/"mx":(\d+)/)||[0,0])[1]>=40),'hărți: cel puțin pe unele vizualizări zona de atingere ajunge la ≥40 px');
 await ctx.close();
 // reflow: text 150 % pe 320 px, fără defilare orizontală a paginii
 const c2=await b.newContext({viewport:{width:320,height:640}});const r2=await c2.newPage();
 await r2.addInitScript(()=>{try{localStorage.setItem('punctum',JSON.stringify({profSeen:true,acc:{size:3}}))}catch(e){}});
 const wide=[];const all=await (async()=>{await r2.goto(U);return r2.evaluate(()=>[...new Set(NAVX.map(x=>x.k).concat(['home','theory','mer','pts','acu','tech','ear','cun','safe','quiz','gloss']))])})();
 for(const v of all){await r2.goto(U+'#'+v);await r2.waitForTimeout(150);const w=await r2.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);if(w[0]>w[1]+1)wide.push(v+' '+w[0]+'>'+w[1])}
 OK(wide.length===0,'text 150 % pe 320 px: fără defilare orizontală ('+wide.join(', ')+')');await c2.close();
 // contrast: h3 elemente în dark, h2.cc în contrast ridicat (lumină)
 const lumC=`(c)=>{const a=c.match(/[\\d.]+/g).map(Number);if(c.startsWith('color('))for(let i=0;i<3;i++)a[i]*=255;const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return .2126*f(a[0])+.7152*f(a[1])+.0722*f(a[2])}`;
 for(const [name,cs,st,sel,pre] of [['dark h3 elemente','dark',{theme:'dark'},'h3.ec',i=>`selectEl(${i})`],['hc+lumină h2.cc','light',{acc:{hc:true}},'h2.cc',null],['hc+dark h2.cc','dark',{theme:'dark',acc:{hc:true}},'h2.cc',null]]){
  const cx=await b.newContext({viewport:{width:800,height:900},colorScheme:cs});const pg=await cx.newPage();await pg.addInitScript(s=>{try{localStorage.setItem('punctum',JSON.stringify(Object.assign({profSeen:true},s)))}catch(e){}},st);
  await pg.goto(U+(sel==='h3.ec'?'#theory':'#tech'));await pg.waitForTimeout(150);
  const res=await pg.evaluate(async([sel,hasPre,lum])=>{const L=eval(lum);const bgOf=e=>{while(e){const c=getComputedStyle(e).backgroundColor;const m=c.match(/[\d.]+/g);if(m&&(m.length<4||+m[3]>.9))return c;e=e.parentElement}return 'rgb(255,255,255)'};const out=[];
   const chk=()=>document.querySelectorAll(sel).forEach(e=>{const l1=L(getComputedStyle(e).color),l2=L(bgOf(e));out.push((Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05))});
   if(hasPre){for(let i=0;i<5;i++){selectEl(i);chk()}}else chk();return out},[sel,!!pre,lumC]);
  OK(res.length>0&&Math.min(...res)>=4.5,name+': contrast ≥4.5 (min '+(res.length?Math.min(...res).toFixed(2):'n/a')+', '+res.length+' elemente)');await cx.close()}
 OK(errs.length===0,'fără erori JS în testele de accesibilitate '+errs.slice(0,2));
}
await b.close();process.exit(f2?1:0)})();
