const CACHE = 'cherina-v3';

const ASSETS = [
  './index.html',
  './manifest.json',
  './pop.mp3',
  './les_couleurs_et_les_animaux.mp3.mpeg',
  './ch%C3%A9rina.png',
  './ANIMAUX/CHAT.png',
  './ANIMAUX/chien.png',
  './ANIMAUX/POULET.png',
  './ANIMAUX/serpent.png',
  './ANIMAUX/lion.png',
  './ANIMAUX/POISSON.png',
  './ANIMAUX/GIRAFE.png',
  './ANIMAUX/Boeuf.png',
  './ANIMAUX/singe.png',
  './ANIMAUX/chameau.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).catch(() => {
        if (e.request.destination === 'image') {
          const px = Uint8Array.from(
            atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='),
            c => c.charCodeAt(0)
          );
          return new Response(px, { headers: { 'Content-Type': 'image/png' } });
        }
        return Response.error();
      });
    })
  );
});
