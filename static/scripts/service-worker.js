const CORE_CACHE_NAME = 'cache-offline';
const CORE_ASSETS = ['/offline', 'styles/main.css'];

self.addEventListener('install', (event) => {
  console.log('install');

  // Pre caching assets - Does not finish install event until this promise below is resolved
  event.waitUntil(
    caches
      .open(CORE_CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  console.log('Fetching:' + req.url);

  // show cached request from cache
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) {
        return cachedRes;
      }
      return fetch(req)
        .then((fetchRes) => fetchRes)
        .catch((err) => {
          return caches
            .open(CORE_CACHE_NAME)
            .then((cache) => cache.match('/offline'));
        });
    })
  );
});
