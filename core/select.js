var _ = require('./utils');


module.exports = function(app) {

    app
        .on('element:create', select)
        .on('element:delete', clean)
        .on('render', clean)
        .on('svg:load', triggerSelect);


    app.container.addEventListener(_.onDown(), selectTarget);


    function triggerSelect() {
        var el = getSelected();
        if (!el) return;
        app.emit('element:select', el);
    }
    triggerSelect();

    function selectTarget(e) {
        if (e.target === app.svg) {
            clean();
            return;
        }
        var notElement = !e.target.classList.contains(app.config.itemClass);
        if (notElement) return;
        e.stopPropagation();
        var notSelected = !e.target.classList.contains(app.config.itemSelectClass);
        if (notSelected) select(e.target);
    }

    function select(el) {
        clean();
        el.classList.add(app.config.itemSelectClass);
        app.emit('select', el);
    }

    function clean(el) {
        if (!el) el = getSelected();
        if (!el) return;
        el.classList.remove(app.config.itemSelectClass);
        app.emit('element:unselect', el);
    }

    function getSelected() {
        return app.svg.querySelector('.'+app.config.itemClass+'.'+app.config.itemSelectClass);
    }

};
