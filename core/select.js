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
        group.setAttribute('transform', el.getAttribute('transform'));
        el.setAttribute('transform', '');
        var neighbor = el.nextSibling;
        group.appendChild(el);
        app.svg.insertBefore(group, neighbor);
        bodyClass(true);
        app.selected = group;
        app.emit('element:select', el);
    };


    var clean = function(el) {
        if (!el) el = getSelected();
        bodyClass(false);
        app.selected = undefined;
        if (!el) return app.emit('element:unselect');
        var group = el.parentNode;
        var neighbor = group.nextSibling;
        group.parentNode.removeChild(group);
        el.classList.remove(app.config.itemSelectClass);
        el.setAttribute('transform', group.getAttribute('transform'));
        app.svg.insertBefore(el, neighbor);
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
