var _ = require('./utils');


module.exports = function(app) {

    app
        .on('create', select)
        .on('delete', clean)
        .on('render', clean)
        .on('loadSvg', triggerSelect);


    app.container.addEventListener(_.onDown(), selectTarget);


    function triggerSelect() {
        var el = app.svg.querySelector('.element.selected');
        if (!el) return;
        app.emit('select', el);
    }
    triggerSelect();

    function selectTarget(e) {
        if (e.target === app.svg) {
            clean();
            return;
        }
        var notElement = !e.target.classList.contains('element');
        if (notElement) return;
        e.stopPropagation();
        var notSelected = !e.target.classList.contains('selected');
        if (notSelected) select(e.target);
    }

    function select(el) {
        clean();
        el.classList.add('selected');
        app.emit('select', el);
    }

    function clean(el) {
        if (!el) el = app.svg.querySelector('.element.selected');
        if (!el) return;
        el.classList.remove('selected');
        app.emit('unselect', el);
    }

};
