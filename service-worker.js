const CACHE_NAME = 'MoonBloom-Cosplays';
const ASSETS = [
  './',
  './index.html', 
  './styles.css',
  './app.js',
  './manifest.json'
];

// Instala o Service Worker e guarda os arquivos essenciais no cache do navegador
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Serve os arquivos direto do cache quando estiver offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});