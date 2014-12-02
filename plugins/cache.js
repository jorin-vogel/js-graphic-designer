var _ = require('../core/utils');


module.exports = function(app, options) {

    options = _.defaults(options || {}, {
        storageKey: 'graphicDesignerGraphic'
    });


    app.on('element', updateCache);


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


    return app;
};
