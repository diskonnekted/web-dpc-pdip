const CACHE_NAME = 'marhaen-muda-cache-v1';
const urlsToCache = [
  '/',
  '/genz',
  '/avatar_siti.png',
  '/avatar_budi.png',
  '/avatar_windy.png',
  '/avatar_lia.png',
  '/avatar_aditya.png',
  '/logopdip.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
