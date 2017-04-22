var CACHE_NAME = 'version_4';
var urlsToCache = [
    '/',
    '/styles.css',
    '/app.js',
    'lib/material.blue-amber.min.css',
    'lib/material.min.js',
    'lib/material.min.js.map'
];


self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );
});
