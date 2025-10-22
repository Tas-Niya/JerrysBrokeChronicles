const CACHE_NAME = "finance-app-v2"; // 🚨 change version every time you update your app
const urlsToCache = [
  "/",
  "/index.html",
  "/4page2.html",
  "/manifest.json",
  "/service-worker.js",
  "/2style1.css",
  "/5style2.css",
  "/3PAGE1.js",
  "/6PAGE2.js",
  "/icons/EXtryPENSE192.png",
  "/icons/EXtryPENSE512.png"
];

// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting(); // instantly activate new SW
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// ACTIVATE — remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // ensure new SW takes control immediately
});

// FETCH — try network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
