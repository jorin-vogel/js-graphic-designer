module.exports = function(app) {

    var triggerSelect = function() {
        var el = getSelected();
        if (!el) return;
        select(el);
    };


    var selectTarget = function(e) {
        var notElement = !e.target.classList.contains(app.config.itemClass);
        if (notElement) return clean();

        e.stopPropagation();

        var notSelected = !e.target.classList.contains(app.config.itemSelectClass);
        if (notSelected) select(e.target);
    };


    var select = function(el) {
        clean();
        el.classList.add(app.config.itemSelectClass);
        bodyClass(true);
        app.selected = el;
        app.emit('element:select', el);
    };


    var clean = function(el) {
        if (!el) el = getSelected();
        if (!el) return;

        el.classList.remove(app.config.itemSelectClass);
        bodyClass(false);
        app.selected = undefined;
        app.emit('element:unselect', el);
    };


    var getSelected = function() {
        return app.svg.querySelector('.' + app.config.itemClass + '.' + app.config.itemSelectClass);
    };


    var bodyClass = function(active) {
        document.body.classList[active ? 'add' : 'remove'](app.config.selectBodyClass);
    };


    app
        .on('element:create', select)
        .on('element:delete', clean)
        .on('render', clean)
        .on('svg:load', triggerSelect)
        .on('ready', triggerSelect)
        .container.addEventListener(app.utils.onDown(), selectTarget);

};
