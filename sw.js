const CACHE_NAME = 'alexiaflix-v5'; // UPDATE: v4 Support Dynamic Caching

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
  'js/navigation.js',
  // Assets (URL Encoded)
  'functions/Web/Univers/AlexiaFlix%20-%20Logo/Logo.png',
  // Hello Kitty Theme Assets (Also cached dynamically by logic, but kept here for default)
  'functions/Web/Univers/Hello%20Kitty%20-%20Main/HK%20-%20Interface.png',
  'functions/Web/Univers/Hello%20Kitty%20-%20Main/HK%20-%20Logo.png',
  'functions/Web/Univers/Hello%20Kitty%20-%20Main/HK%20-%20Click.mp3',
  'functions/Web/Univers/Hello%20Kitty%20-%20Main/HK%20-%20Play%20Media.mp3',
  'functions/Web/Univers/Hello%20Kitty%20-%20Main/HK%20-%20Notif.mp3'
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

// NOUVEAU: Écouteur pour la mise en cache dynamique des thèmes
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_THEME_ASSETS') {
    const assets = event.data.payload;
    if (assets && assets.length > 0) {
      caches.open(CACHE_NAME).then((cache) => {
        // Encodage URL si nécessaire (simple précaution)
        const encodedAssets = assets.map(url => {
            // Si l'URL contient des espaces et n'est pas déjà encodée
            if (url.includes(' ') && !url.includes('%20')) {
                return url.split('/').map(encodeURIComponent).join('/').replace(/%3A/g, ':');
            }
            return url;
        });
        
        cache.addAll(encodedAssets).then(() => {
             console.log('🎨 [SW] Assets du thème mis en cache:', encodedAssets);
        }).catch(err => console.error('❌ [SW] Erreur cache thème:', err));
      });
    }
  }
});
