// Teste automate PUNCTUM: node tests/run.js [fișier.html]
// Cere: NODE_PATH=/opt/npm-tools/node_modules, Chrome în /usr/bin/google-chrome
const path=require('path');
const {chromium}=require('playwright');
const file=path.resolve(process.argv[2]||'dist/punctum.html');
const URL='file://'+file;
const VIEWS=['home','theory','mer','pts','acu','tech','ear','cun','safe','quiz','gloss'];
const EXTRA=(process.env.EXTRA_VIEWS||'').split(',').filter(Boolean);
const LANGS=['ro','en','fr','it','es','pt','de','hu'];
let fails=0,warns=0;
const F=m=>{fails++;console.log('FAIL',m)},W=m=>{warns++;console.log('WARN',m)},O=m=>console.log('OK  ',m);
(async()=>{
  const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
  const ctx=await br.newContext({viewport:{width:390,height:800}});
  const pg=await ctx.newPage();
  const errs=[];pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
  pg.on('console',m=>{if(m.type()==='error'&&!/ResizeObserver/.test(m.text()))errs.push('console: '+m.text())});
  const take=()=>{const e=errs.splice(0);return e};
  await pg.goto(URL);{const ex=await pg.evaluate(()=>NAVX.map(x=>x.k));VIEWS.push(...ex.filter(k=>!VIEWS.includes(k)));take();console.log('vizualizări:',VIEWS.join(','))}
  // 1. fiecare vizualizare, 2 lățimi
  for(const w of [360,1100]){
    await pg.setViewportSize({width:w,height:800});
    for(const v of [...VIEWS,...EXTRA]){
      await pg.goto(URL+'#'+v);await pg.waitForTimeout(150);
      const r=await pg.evaluate(()=>({h1:(document.querySelector('main h1')||{}).textContent||'',len:document.getElementById('main').innerText.length,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
      const e=take();
      if(e.length)F(`${v}@${w} erori: ${e.join(' | ')}`);
      else if(!r.h1||r.len<80)F(`${v}@${w} gol (h1="${r.h1}", ${r.len} caractere)`);
      else if(r.sw>r.cw+1)W(`${v}@${w} defilare orizontală (${r.sw}>${r.cw})`);
      else O(`${v}@${w} ${r.h1.slice(0,30)} (${r.len} car.)`);
    }
  }
  // 2. integritate date
  await pg.goto(URL+'#home');
  const integ=await pg.evaluate(()=>{
    const o=[];const codes=new Set(PT.map(p=>p.c));
    const dup=PT.map(p=>p.c).filter((c,i,a)=>a.indexOf(c)!==i);if(dup.length)o.push('puncte duplicate: '+dup);
    PROT.forEach(p=>p.p.forEach(c=>{if(!codes.has(c))o.push('protocol '+p.t+': cod lipsă '+c)}));
    PT.forEach(p=>{if(!p.p||!p.l||!p.u||!REG[p.r])o.push('punct incomplet '+p.c)});
    const ids=VAR.map(v=>v.id);const dv=ids.filter((x,i)=>ids.indexOf(x)!==i);if(dv.length)o.push('variante duplicate: '+dv);
    VAR.forEach(v=>{if(!v.pas.length||!v.pr||!v.sig)o.push('variantă incompletă '+v.id)});
    MER.forEach(m=>m.key.split(/[ ,()]+/).filter(x=>/^[A-Z]{2}\d+$/.test(x)).forEach(c=>{if(!codes.has(c))o.push('meridian '+m.c+' puncte-cheie: '+c+' nu e în listă')}));
    return o;
  });
  integ.length?integ.forEach(m=>/lipsă|duplic|incomplet/.test(m)?F(m):W(m)):O('integritate date');
  // 3. limbi
  for(const l of LANGS){
    await pg.goto(URL+'#home');await pg.evaluate(l=>setLang(l),l);await pg.waitForTimeout(80);
    const r=await pg.evaluate(()=>({nav:[...document.querySelectorAll('#nav a')].map(a=>a.textContent),ph:document.getElementById('q').placeholder}));
    const e=take();
    if(e.length)F(`limba ${l}: ${e.join(' | ')}`);else if(r.nav.length<11||!r.ph)F(`limba ${l}: UI incomplet`);else O(`limba ${l}: ${r.nav.slice(0,3).join('/')}`);
  }
  await pg.evaluate(()=>setLang('ro'));
  // 4. monkey test
  let seed=12345;const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
  await pg.setViewportSize({width:390,height:800});
  let acts=0;
  for(const v of [...VIEWS,...EXTRA]){
    await pg.goto(URL+'#'+v);
    for(let i=0;i<40;i++){
      const els=await pg.$$('main button, main a, main select, main input, main summary, nav a');
      if(!els.length)break;
      const el=els[Math.floor(rnd()*els.length)];
      try{
        const tag=await el.evaluate(e=>e.tagName+':'+(e.type||''));
        if(/^SELECT/.test(tag)){await el.evaluate(e=>{if(e.options.length){e.selectedIndex=Math.floor(Math.random()*e.options.length);e.dispatchEvent(new Event('change',{bubbles:true}))}})}
        else if(/^INPUT:(search|text|number)/.test(tag)){await el.fill(['a','acu','','LI4','zzz','😀','<b>'][Math.floor(rnd()*7)],{timeout:500})}
        else if(/^INPUT:(checkbox)/.test(tag)){await el.evaluate(e=>e.click())}
        else await el.evaluate(e=>e.click());
        acts++;
      }catch(e){}
      await pg.waitForTimeout(15);
    }
    const e=take();
    // oprește eventuale sesiuni
    await pg.evaluate(()=>{try{if(window.endSes)endSes(false)}catch(e){}document.getElementById('modal').innerHTML=''});
    if(e.length)F(`monkey ${v}: ${[...new Set(e)].slice(0,3).join(' | ')}`);
  }
  O(`monkey test: ${acts} acțiuni`);
  // 5. căutare globală
  for(const q of ['li4','acupresură','moxă','zzzz','<img src=x>','😀']){
    await pg.goto(URL+'#home');await pg.fill('#q',q);await pg.waitForTimeout(80);
    const e=take();if(e.length)F(`căutare "${q}": ${e[0]}`);
  }
  O('căutare globală');
  await br.close();
  console.log(`\nREZULTAT: ${fails} FAIL, ${warns} WARN`);
  process.exit(fails?1:0);
})().catch(e=>{console.log('TEST ERR',e.message);process.exit(2)});
