const CACHE_NAME = 'spc-campus-v1';
const OFFLINE_URL = '/index.html';
const ASSETS_TO_CACHE = [
  '/',
  OFFLINE_URL,
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/logo.jpg',
  '/css/main.css' // adjust if your main CSS has a different path
  // add any other static assets you want cached (department logos, fonts, etc.)
];

// Install: cache shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: cleanup old caches
self.addEventListener('activate', (event) => {
  const keep = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => (keep.includes(key) ? null : caches.delete(key))))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for navigation, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // For non-GET requests (POST/PUT/etc) do a pass-through and ensure we return a Response
  if (request.method !== 'GET') {
    event.respondWith(
      fetch(request).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL) || new Response('Offline', { status: 503, statusText: 'Offline' });
        }
        return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
      })
    );
    return;
  }

  // For navigation requests (HTML pages) -> network-first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          // update same-origin cache with latest HTML
          try {
            const urlOrigin = new URL(request.url).origin;
            if (urlOrigin === self.location.origin) {
              const copy = resp.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
            }
          } catch (e) {
            // ignore URL parsing errors
          }
          return resp;
        })
        .catch(() => caches.match(OFFLINE_URL) || new Response('Offline', { status: 503 }))
    );
    return;
  }

  // For other GET requests: cache-first, then network, with safe fallbacks
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          // Only cache successful same-origin GET responses
          try {
            const urlOrigin = new URL(request.url).origin;
            if (response && response.ok && urlOrigin === self.location.origin) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
            }
          } catch (e) {
            // ignore
          }
          return response;
        })
        .catch(() => {
          // Provide sensible fallbacks so we always return a Response
          if (request.destination === 'image') return caches.match('/logo.jpg') || new Response('', { status: 503 });
          // For document-like requests, try offline page
          if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
            return caches.match(OFFLINE_URL) || new Response('Offline', { status: 503 });
          }
          // Generic fallback response for other resources
          return new Response('Network error', { status: 503, statusText: 'Service Unavailable' });
        });
    })
  );
});
