const CACHE_NAME = 'araba-akademisi-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/fonts/Quicksand-Regular.woff2'
];

const CACHE_STRATEGIES = {
  images: {
    cacheName: 'images-cache',
    strategy: 'cache-first',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  fonts: {
    cacheName: 'fonts-cache',
    strategy: 'cache-first',
    maxAge: 90 * 24 * 60 * 60, // 90 days
  },
  static: {
    cacheName: 'static-cache',
    strategy: 'stale-while-revalidate',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('araba-akademisi-'))
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

function shouldCache(url) {
  const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.woff2', '.css', '.js'];
  return extensions.some(ext => url.endsWith(ext));
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle different asset types
  if (url.pathname.includes('/fonts/')) {
    event.respondWith(handleAsset(event.request, CACHE_STRATEGIES.fonts));
  } else if (shouldCache(url.pathname)) {
    event.respondWith(handleAsset(event.request, CACHE_STRATEGIES.images));
  } else {
    event.respondWith(handleAsset(event.request, CACHE_STRATEGIES.static));
  }
});

async function handleAsset(request, strategy) {
  const cache = await caches.open(strategy.cacheName);
  
  if (strategy.strategy === 'cache-first') {
    const cached = await cache.match(request);
    if (cached) return cached;
    
    try {
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    } catch (error) {
      return new Response('Network error', { status: 408 });
    }
  }
  
  if (strategy.strategy === 'stale-while-revalidate') {
    const cached = await cache.match(request);
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    });
    
    return cached || fetchPromise;
  }
}