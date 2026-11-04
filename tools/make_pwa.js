// node tools/make_pwa.js <versiune> : generează dist/pwa/ (index.html + manifest + sw + pictograme)
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const ver=process.argv[2]||'1.2';
const out='dist/pwa';fs.mkdirSync(out,{recursive:true});
fs.copyFileSync('dist/punctum.html',out+'/index.html');
let html=fs.readFileSync(out+'/index.html','utf8');
// legături PWA în <head>
if(!html.includes('rel="manifest"')){
  html=html.replace('<meta name="theme-color" content="#2f7d6d">','<meta name="theme-color" content="#2f7d6d">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-192.png">');
  html=html.replace('</script>\n</body>',`</script>\n<script>if('serviceWorker' in navigator&&location.protocol.startsWith('http')){navigator.serviceWorker.register('sw.js').catch(function(){})}</script>\n</body>`);
}
fs.writeFileSync(out+'/index.html',html);
fs.writeFileSync(out+'/manifest.webmanifest',JSON.stringify({name:'PUNCTUM — atlas al terapiilor prin puncte',short_name:'PUNCTUM',description:'Acupunctură, presopunctură și terapii conexe: atlas educativ offline.',start_url:'./index.html',scope:'./',display:'standalone',background_color:'#f6f3ec',theme_color:'#2f7d6d',lang:'ro',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},{src:'icon-maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'},{src:'icon.svg',sizes:'any',type:'image/svg+xml'}]},null,2));
fs.writeFileSync(out+'/sw.js',`const V='punctum-${ver}';const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('./index.html'))))});
`);
fs.copyFileSync('tools/icon.svg',out+'/icon.svg');
(async()=>{
  const br=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
  const svg=fs.readFileSync('tools/icon.svg','utf8');
  for(const [n,size,mask] of [['icon-192.png',192,false],['icon-512.png',512,false],['icon-maskable-512.png',512,true]]){
    const pg=await br.newPage({viewport:{width:size,height:size}});
    const body=mask?`<body style="margin:0;background:#2f7d6d"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center"><div style="width:${size*0.7}px;height:${size*0.7}px">${svg.replace('<svg ','<svg width="100%" height="100%" ')}</div></div></body>`:`<body style="margin:0;background:transparent">${svg.replace('<svg ','<svg width="'+size+'" height="'+size+'" ')}</body>`;
    await pg.setContent(body);await pg.screenshot({path:out+'/'+n,omitBackground:!mask});await pg.close();
  }
  await br.close();console.log('PWA gata în',out,fs.readdirSync(out).join(', '));
})();
