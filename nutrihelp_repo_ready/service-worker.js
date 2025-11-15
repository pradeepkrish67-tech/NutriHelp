const CACHE = 'nutri-cache-v1';
const toCache = ['./','/index.html','/styles.css','/script.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(toCache)));
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('activate', e => { self.clients.claim(); });