const CACHE_NAME = 'alexia-hub-v12';

// On met en cache la base de l'app pour un chargement instantané
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './functions/Web/Univers/AlexiaFlix - Logo/Logo.png',
  './functions/Web/Univers/Hello Kitty - Main/HK - Click.mp3',
  './functions/Web/Univers/Hello Kitty - Main/HK - Notif.mp3',
  './functions/Web/Univers/Open site.mp3'
];

// Installation : on précharge les assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Permet au SW de s'activer instantanément sans attendre
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation : on nettoie les vieux caches
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
    })
  );
});

// Stratégie intelligente : Network First avec Dynamic Caching
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Règle d'or : Ne JAMAIS mettre en cache la base de données (liste_films) ni les vidéos
  // Ça te permet de ne plus rien avoir à toucher : tu index et c'est direct sur le site.
  if (url.endsWith('.mp4') || url.includes('liste_films.txt')) {
    return; // On laisse le navigateur faire son boulot en direct !
  }

  event.respondWith(
    fetch(event.request).then(response => {
      // Si la requête internet fonctionne, on en profite pour actualiser discrètement le cache local
      if (response && response.status === 200 && response.type === 'basic') {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
      }
      return response;
    }).catch(() => {
      // Si t'es hors ligne ou que le serveur bug, on sert depuis le cache
      return caches.match(event.request);
    })
  );
});