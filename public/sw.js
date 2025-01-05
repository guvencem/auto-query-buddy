const CACHE_NAME = 'araba-akademisi-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/0c7dfd7d-d317-4b51-975c-b77e96d1423b.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  // Yeni service worker'ın hemen aktif olmasını sağla
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // Eski önbellekleri temizle
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Yeni service worker'ın hemen kontrolü almasını sağla
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Başarılı yanıtları önbelleğe al
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Çevrimdışıysa önbellekten yanıt ver
        return caches.match(event.request);
      })
  );
});