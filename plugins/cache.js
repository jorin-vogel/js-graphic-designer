var defaults = {
    storageKey: 'graphicDesignerGraphic'
};


function cache(app, options) {

    app
        .on('element', updateCache)
        .on('svg:resize', updateCache)
        .on('background', updateCache);


    function loadFromCache() {
        var backup = localStorage.getItem(options.storageKey);
        if (!backup) return;
        app.container.innerHTML = backup;
        app.svg = app.container.querySelector('svg');
        app.emit('svg:load');
    }

    loadFromCache();


    function updateCache() {
        localStorage.setItem(options.storageKey, app.container.innerHTML);
        app.emit('cache:update');
    }

}


cache.defaults = defaults;

module.exports = cache;
