const CACHE_NAME = 'alexiaflix-v22'; // UPDATE: v22 Ajout Navigation.js

const URLS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  // CSS
  'css/main.css',
  'css/components.css',
  'css/player.css',
  // JS Modules
  'js/main.js',
  'js/data.js',
  'js/utils.js',
  'js/player.js',
  'js/modal.js',
  'js/ui.js',
  'js/auth.js',
  'js/fuze.js',   
  'js/search.js', 
  'js/navigation.js', // AJOUTÉ
  // Assets
  'functions/Web/Images/AlexiaFlix%20-%20Logo/AlexiaFlix%20-%20Logo%202.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
          await cache.addAll(URLS_TO_CACHE);
          console.log(`✅ Cache ${CACHE_NAME} installé.`);
      } catch (error) {
          console.error('❌ Erreur cache:', error);
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.endsWith('.mp4')) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});