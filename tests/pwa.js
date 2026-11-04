// PWA: versiunea service worker-ului legată de conținut, strategie stale-while-revalidate, ștergerea cache-urilor vechi, CSP compatibil
const {chromium}=require('playwright');const path=require('path'),fs=require('fs'),os=require('os'),http=require('http'),crypto=require('crypto'),cp=require('child_process');
const SRC=path.resolve(process.argv[2]||'dist/punctum.html');
let fail=0;const ok=(c,m)=>{console.log((c?'OK   ':'FAIL ')+m);if(!c)fail++};
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'punctum-pwa-'));
const gen=(src,out,arg)=>cp.execFileSync('node',['tools/make_pwa.js'].concat(arg?[arg]:[]),{env:Object.assign({},process.env,{PWA_SRC:src,PWA_OUT:out}),stdio:'pipe'});
const sha=f=>crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0,10);
(async()=>{
 const a=path.join(tmp,'a.html');fs.copyFileSync(SRC,a);
 gen(a,path.join(tmp,'out1'));
 const sw1=fs.readFileSync(path.join(tmp,'out1/sw.js'),'utf8');
 ok(sw1.includes("const V='punctum-"+sha(a)+"'"),'sw.js: versiunea cache = sha1 al aplicației (fără implicit „2.1”)');
 gen(a,path.join(tmp,'out1b'));
 ok(sw1===fs.readFileSync(path.join(tmp,'out1b/sw.js'),'utf8'),'sw.js: reproductibil pentru același conținut');
 const b=path.join(tmp,'b.html');fs.writeFileSync(b,fs.readFileSync(a,'utf8').replace('</body>','<!-- NEWMARK --></body>'));
 gen(b,path.join(tmp,'out2'));
 const sw2=fs.readFileSync(path.join(tmp,'out2/sw.js'),'utf8');
 ok(sw1!==sw2&&sw2.includes('punctum-'+sha(b)),'sw.js: orice modificare a aplicației produce un sw.js diferit');
 ok(/res\.ok&&res\.type==='basic'/.test(sw1)&&/ignoreSearch/.test(sw1)&&/indexOf\('punctum-'\)===0/.test(sw1)&&/icon-maskable-512\.png/.test(sw1)&&/cache:'no-cache'/.test(sw1),'sw.js: doar 200 de aceeași origine, fără query în cheie, șterge cache-urile vechi, icon maskable, revalidare');
 const idx=fs.readFileSync(path.join(tmp,'out1/index.html'),'utf8');
 ok(/manifest-src 'self'/.test(idx)&&/worker-src 'self'/.test(idx)&&!/https?:\/\//.test((idx.match(/Content-Security-Policy" content="([^"]*)"/)||[])[1]||'http'),'PWA: CSP permite manifestul și worker-ul, fără surse externe');
 ok(/register\('sw\.js',\{updateViaCache:'none'\}\)/.test(idx),'PWA: sw.js înregistrat cu updateViaCache:none');
 // funcțional pe http://localhost
 let cur='out1';
 const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(tmp,cur,u);if(!f.startsWith(path.join(tmp,cur))||!fs.existsSync(f)){r.writeHead(404);r.end('no');return}
  const ext=path.extname(f);r.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'}[ext]||'application/octet-stream','Cache-Control':'max-age=3600'});r.end(fs.readFileSync(f))});
 await new Promise(r=>srv.listen(0,'127.0.0.1',r));const port=srv.address().port,U='http://localhost:'+port+'/';
 const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 const ctx=await br.newContext();const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__csp=[];document.addEventListener('securitypolicyviolation',e=>window.__csp.push(e.violatedDirective+'|'+e.blockedURI))});
 await p.goto(U);
 const waitKeys=async(pred,ms)=>{const t=Date.now();let k=[];while(Date.now()-t<ms){k=await p.evaluate(()=>caches.keys());if(pred(k))return k;await p.waitForTimeout(150)}return k};
 await p.evaluate(()=>navigator.serviceWorker.ready.then(()=>1));
 const V1='punctum-'+sha(a),V2='punctum-'+sha(b);
 let keys=await waitKeys(k=>k.includes(V1),8000);
 ok(keys.includes(V1),'SW instalat: cache '+V1+' creat ('+keys+')');
 const files=await p.evaluate(v=>caches.open(v).then(c=>c.keys()).then(ks=>ks.map(r=>new URL(r.url).pathname)),V1);
 ok(['/index.html','/manifest.webmanifest','/icon-192.png','/icon-512.png','/icon-maskable-512.png'].every(f=>files.includes(f)),'precache complet (inclusiv icon maskable): '+files);
 const csp=await p.evaluate(()=>window.__csp.slice());
 ok(csp.length===0,'PWA sub CSP: 0 încălcări (manifest, worker, pictograme) '+csp.slice(0,3));
 // offline
 await ctx.setOffline(true);await p.goto(U+'?x=1#masaj');await p.waitForTimeout(300);
 ok(await p.evaluate(()=>document.querySelector('main h1')&&document.querySelector('main h1').textContent.length>0),'offline: pagina (cu query) se încarcă din cache');
 await ctx.setOffline(false);
 const n1=await p.evaluate(v=>caches.open(v).then(c=>c.keys()).then(k=>k.length),V1);
 await p.goto(U+'?cb=123');await p.waitForTimeout(500);const n2=await p.evaluate(v=>caches.open(v).then(c=>c.keys()).then(k=>k.length),V1);
 ok(n2===n1,'query-urile nu creează intrări noi în cache ('+n1+' → '+n2+')');
 // actualizare: serverul servește out2 (alt sw.js) → noul SW se instalează, cache-ul vechi dispare
 cur='out2';
 await p.goto(U);await p.waitForTimeout(300);
 keys=await waitKeys(k=>k.includes(V2)&&!k.includes(V1),10000);
 ok(keys.includes(V2)&&!keys.includes(V1),'actualizare: noul cache '+V2+' creat, cel vechi șters ('+keys+')');
 const has=await p.evaluate(v=>caches.open(v).then(c=>c.match('index.html')).then(r=>r.text()).then(t=>t.includes('NEWMARK')),V2);
 ok(has,'actualizare: noua versiune este precache-uită');
 await p.goto(U);await p.waitForTimeout(300);
 ok(await p.evaluate(()=>document.querySelector('main h1')!=null),'după actualizare aplicația pornește');
 ok(errs.length===0,'fără erori JS '+errs.slice(0,2));
 await br.close();srv.close();fs.rmSync(tmp,{recursive:true,force:true});
 console.log('REZULTAT:',fail,'FAIL');process.exit(fail?1:0);
})();
