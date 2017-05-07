var CACHE_NAME = 'version_5';
var urlsToCache = [
    '/',
    '/styles.css',
    '/app.js',
    'lib/material.blue-amber.min.css',
    'lib/material.min.js',
    'lib/material.min.js.map'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                var fetchPromise = fetch(event.request)
                    .then(function (networkResponse) {
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                    });

                return response || fetchPromise;
            })
    );
});
