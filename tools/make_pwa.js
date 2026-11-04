// node tools/make_pwa.js [etichetă] : generează dist/pwa/ (index.html + manifest + sw + pictograme)
// Versiunea cache-ului este legată de CONȚINUTUL aplicației (sha1 al lui dist/punctum.html): orice modificare produce un sw.js diferit,
// deci browserul instalează noua versiune și șterge cache-urile vechi. Variabile opționale: PWA_SRC (html sursă), PWA_OUT (director ieșire).
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium}=require('playwright');
const SRC=process.env.PWA_SRC||'dist/punctum.html';
const out=process.env.PWA_OUT||'dist/pwa';fs.mkdirSync(out,{recursive:true});
const hash=crypto.createHash('sha1').update(fs.readFileSync(SRC)).digest('hex').slice(0,10);
const ver=(process.argv[2]?process.argv[2].replace(/[^\w.-]/g,'')+'-':'')+hash;
fs.copyFileSync(SRC,out+'/index.html');
let html=fs.readFileSync(out+'/index.html','utf8');
// CSP pentru varianta PWA: același profil strict, plus manifestul, service worker-ul și pictogramele de pe aceeași origine
const CSP_PWA="default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data: blob:; manifest-src 'self'; worker-src 'self'; base-uri 'none'; form-action 'none'";
if(/http-equiv="Content-Security-Policy"/.test(html))html=html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]*">/,`<meta http-equiv="Content-Security-Policy" content="${CSP_PWA}">`);
else html=html.replace('<meta charset="utf-8">',`<meta charset="utf-8">\n<meta http-equiv="Content-Security-Policy" content="${CSP_PWA}">`);
// legături PWA în <head>
if(!html.includes('rel="manifest"')){
  html=html.replace('<meta name="theme-color" content="#2f7d6d">','<meta name="theme-color" content="#2f7d6d">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-192.png">');
  html=html.replace('</script>\n</body>',`</script>\n<script>if('serviceWorker' in navigator&&location.protocol.startsWith('http')){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(function(){})}</script>\n</body>`);
}
fs.writeFileSync(out+'/index.html',html);
fs.writeFileSync(out+'/manifest.webmanifest',JSON.stringify({name:'PUNCTUM — atlas al terapiilor prin puncte',short_name:'PUNCTUM',description:'Acupunctură, presopunctură și terapii conexe: atlas educativ offline.',start_url:'./index.html',scope:'./',display:'standalone',background_color:'#f6f3ec',theme_color:'#2f7d6d',lang:'ro',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},{src:'icon-maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'},{src:'icon.svg',sizes:'any',type:'image/svg+xml'}]},null,2));
// strategie: stale-while-revalidate (răspuns imediat din cache, actualizare în fundal), doar răspunsuri 200 de pe aceeași origine, fără query în cheie
fs.writeFileSync(out+'/sw.js',`const V='punctum-${ver}';const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.indexOf('punctum-')===0&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==self.location.origin)return;
  const key=new Request(u.origin+u.pathname);
  e.respondWith(caches.open(V).then(c=>c.match(key,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r,{cache:'no-cache'}).then(res=>{if(res&&res.ok&&res.type==='basic')c.put(key,res.clone());return res});
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}
    return net.catch(()=>c.match('./index.html'));
  })));
});
`);
fs.copyFileSync(path.join(__dirname,'icon.svg'),out+'/icon.svg');
(async()=>{
  const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
  const svg=fs.readFileSync(path.join(__dirname,'icon.svg'),'utf8');
  for(const [n,size,mask] of [['icon-192.png',192,false],['icon-512.png',512,false],['icon-maskable-512.png',512,true]]){
    const pg=await br.newPage({viewport:{width:size,height:size}});
    const body=mask?`<body style="margin:0;background:#2f7d6d"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center"><div style="width:${size*0.7}px;height:${size*0.7}px">${svg.replace('<svg ','<svg width="100%" height="100%" ')}</div></div></body>`:`<body style="margin:0;background:transparent">${svg.replace('<svg ','<svg width="'+size+'" height="'+size+'" ')}</body>`;
    await pg.setContent(body);await pg.screenshot({path:out+'/'+n,omitBackground:!mask});await pg.close();
  }
  await br.close();console.log('PWA gata în',out,fs.readdirSync(out).join(', '));
})();
