self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open('reminder-app').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.webmanifest',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });
  