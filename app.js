if ('serviceWorker' in navigator) {
    window.addEventListener('load', registerServiceWorker);
}

function registerServiceWorker() {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
}
