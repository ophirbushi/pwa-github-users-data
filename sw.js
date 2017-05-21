var CACHE_NAME = 'version_21';

self.addEventListener('fetch', function (event) {
    if (event.request.url.indexOf('http://localhost:8080') === 0) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    var fetchPromise = fetch(event.request).then(function (networkResponse) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    return response || fetchPromise;
                })
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
