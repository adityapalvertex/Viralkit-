// Bump V whenever you change any file, so users receive the update.
const V='viralkit-v5';
const A=['./','styles.css','data.js','app.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
// A redirected response must never be served for a navigation, so strip the flag.
const clean=r=>r.redirected?new Response(r.body,{status:r.status,statusText:r.statusText,headers:r.headers}):r;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(A.map(u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u);return c.put(u,clean(r))})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const q=e.request;if(q.method!=='GET')return;
  if(q.mode==='navigate'){e.respondWith(fetch(q).catch(()=>caches.match('./')));return}
  e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{
    if(res.ok&&new URL(q.url).origin===location.origin){const cp=clean(res.clone());caches.open(V).then(c=>c.put(q,cp))}
    return res})));
});
