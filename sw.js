const V='punctum-2.5.1-89b5affca6';const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
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
