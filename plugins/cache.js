var defaults = {
    storageKey: 'graphicDesignerGraphic'
};


var cache = function(app, options) {

    var loadFromCache = function() {
        var backup = localStorage.getItem(options.storageKey);
        if (!backup) return;
        app.container.innerHTML = backup;
        app.svg = app.container.querySelector('svg');
        app.emit('svg:load');
    };


    var updateCache = function() {
        localStorage.setItem(options.storageKey, app.container.innerHTML);
        app.emit('cache:change');
    };



    app
        .on('ready', loadFromCache)
        .on('element', updateCache)
        .on('svg:resize', updateCache)
        .on('background', updateCache);

};


cache.defaults = defaults;

module.exports = cache;
