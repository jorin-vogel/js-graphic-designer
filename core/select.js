var _ = require('./utils');


module.exports = function(app) {

    app
        .on('element:create', select)
        .on('element:delete', clean)
        .on('render', clean)
        .on('svg:load', triggerSelect)
        .on('ready', triggerSelect);


    app.container.addEventListener(_.onDown(), selectTarget);


    function triggerSelect() {
        var el = getSelected();
        if (!el) return;
        bodyClass(true);
        app.emit('element:select', el);
    }

    function selectTarget(e) {
        var notElement = !e.target.classList.contains(app.config.itemClass);
        if (notElement) {
            clean();
            return;
        }
        e.stopPropagation();
        var notSelected = !e.target.classList.contains(app.config.itemSelectClass);
        if (notSelected) select(e.target);
    }

    function select(el) {
        clean();
        el.classList.add(app.config.itemSelectClass);
        bodyClass(true);
        app.emit('element:select', el);
    }

    function clean(el) {
        if (!el) el = getSelected();
        if (!el) return;
        el.classList.remove(app.config.itemSelectClass);
        bodyClass(false);
        app.emit('element:unselect', el);
    }

    function getSelected() {
        return app.svg.querySelector('.'+app.config.itemClass+'.'+app.config.itemSelectClass);
    }

    function bodyClass(active) {
        document.body.classList[active ? 'add' : 'remove'](app.config.selectBodyClass);
    }

};
