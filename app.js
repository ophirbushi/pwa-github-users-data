if ('serviceWorker' in navigator) {
    window.addEventListener('load', onWindowLoad);
}

function onWindowLoad() {
    navigator.serviceWorker.register('/sw.js');
}


var app = (function () {
    'use strict';

    var spinnerElement = document.getElementById('spinner-container');
    var appElement = document.getElementById('app');
    var appData = localStorage.getItem('appData');

    init();

    function init() {
        appData ? onDataAvailable() : getData().then(onDataAvailable);
    }

    function onDataAvailable() {
        appElement.innerHTML = appData;
        localStorage.setItem('appData', appData);
        showContent();
    }

    function getData() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                appData = 'This is mock data';
                resolve();
            }, 3000);
        });
    }

    function showContent() {
        spinnerElement.style.display = 'none';
        appElement.style.display = 'block';
    }

    return {};
})();
