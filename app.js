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
    var userTemplateElement = document.querySelector('.user-template');
    var cachedData = localStorage.getItem('data');

    init();

    function init() {
        getData()
            .then(function (data) {
                onDataAvailable(data);
            })
            .catch(function (error) {
                onDataAvailable(cachedData);
            });
    }

    function onDataAvailable(data) {
        data = JSON.parse(data);
        showContent();

        userTemplateElement.querySelector('.user-name').innerHTML = data.login;
        userTemplateElement.querySelector('.user-avatar').src = data.avatar_url;
        localStorage.setItem('data', JSON.stringify(data));
    }

    function getData() {
        return new Promise(function (resolve, reject) {
            var apiUrl = 'https://api.github.com/users/ophirbushi';
            var request = new XMLHttpRequest();

            request.onreadystatechange = function (e) {
                if (request.readyState === request.DONE) {
                    resolve(request.response);
                }
            };
            request.ontimeout = request.onerror = request.onabort = function (e) {
                reject(e);
            };

            request.open('GET', apiUrl);
            request.send();
        });
    }

    function showContent() {
        spinnerElement.style.display = 'none';
        appElement.style.display = 'block';
    }

    return {};
})();
