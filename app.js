if ('serviceWorker' in navigator) {
    window.addEventListener('load', onWindowLoad);
}

function onWindowLoad() {
    navigator.serviceWorker.register('/sw.js');
    window.removeEventListener('load', onWindowLoad);
}


var app = (function () {
    'use strict';

    var spinnerElement = document.getElementById('spinner-container');
    var appElement = document.getElementById('app');

    init();

    function _createElement(tplString) {
        var container = document.createElement('div');
        container.innerHTML = tplString;
        return container.firstElementChild;
    }

    function init() {
        var userName = 'ophirbushi';

        getUserData(userName)
            .then(onDataAvailable)
            .catch(function (error) {
                var cachedData = localStorage.getItem('data');
                onDataAvailable(cachedData);
            });
    }

    function onDataAvailable(data) {
        if (data) {
            data = JSON.parse(data);
            renderUserCard(data.login, data.avatar_url);
            localStorage.setItem('data', JSON.stringify(data));
        } else {
            alert('error - could not load data');
        }
        showContent();
    }

    function getUserData(userName) {
        return new Promise(function (resolve, reject) {
            var apiUrl = 'https://api.github.com/users/' + userName;
            var request = new XMLHttpRequest();

            request.onreadystatechange = function (e) {
                if (request.readyState === request.DONE) {
                    if (request.status === 200) resolve(request.response);
                    else reject(request.statusText);
                }
            };

            request.onerror = request.ontimeout = request.onabort = reject;

            request.open('GET', apiUrl);
            request.send();
        });
    }

    function showContent() {
        spinnerElement.style.display = 'none';
        appElement.style.display = 'block';
    }

    function renderUserCard(userName, avatarUrl) {
        var template =
            '<div class="user mdl-card mdl-shadow--4dp" style="margin: 20px auto;">' +
            '   <div class="mdl-card__title">' +
            '       <h2 class="user-name mdl-card__title-text"></h2>' +
            '   </div>' +
            '   <div class="mdl-card__media">' +
            '       <img class="user-avatar" width="100" border="0" alt="" style="padding:10px;">' +
            '   </div>' +
            '</div>';

        var element = _createElement(template);

        element.querySelector('.user-name').innerHTML = userName;

        var img = element.querySelector('img.user-avatar');

        img.setAttribute('src', avatarUrl);

        var onImgLoad = function () {
            appElement.appendChild(element);
            img.removeEventListener('load', onImgLoad);
            img.removeEventListener('error', onImgLoad);
        }

        img.addEventListener('load', onImgLoad);
        img.addEventListener('error', onImgLoad);

    }

    return {};
})();
