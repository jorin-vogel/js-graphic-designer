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
        var group = app.utils.svgCreate('g');
        el.classList.add(app.config.itemSelectClass);
        group.appendChild(el);
        app.svg.appendChild(group);
        group.setAttribute('transform', el.getAttribute('transform'));
        el.setAttribute('transform', '');
        bodyClass(true);
        app.selected = group;
        app.emit('element:select', el);
    };


    var clean = function(el) {
        if (!el) el = getSelected();
        if (!el) return;

        var group = el.parentNode;
        el.classList.remove(app.config.itemSelectClass);
        app.svg.appendChild(el);
        el.setAttribute('transform', group.getAttribute('transform'));
        group.parentNode.removeChild(group);
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
