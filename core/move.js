module.exports = function(app) {


    var cursorOffset;
    var animate = app.utils.animation();


    var drag = function(e) {
        var isElement = e.target.classList.contains(app.config.itemSelectClass);
        if (!isElement) return;

        e.preventDefault(); // Firefox thing

        cursorOffset = calcOffset(e, app.selected);

        app.selected.classList.add(app.config.itemDragClass);

        app.svg.addEventListener(app.utils.onMove(), updatePosition);
        document.addEventListener(app.utils.onUp(), drop);
    };


    var updatePosition = function(e) {
        animate(function() {
            app.utils.translateSvg(app.selected, app.utils.pageX(e) - cursorOffset.x, app.utils.pageY(e) - cursorOffset.y);
            app.emit('move', app.selected);
        });
    };


    var drop = function(e) {
        e.preventDefault(); // FF thing

        app.svg.removeEventListener(app.utils.onMove(), updatePosition);
        document.removeEventListener(app.utils.onUp(), drop);

        app.selected.classList.remove(app.config.itemDragClass);

        app.emit('element:change:position', app.selected);
    };


    var calcOffset = function(e, el) {
        var pos = app.utils.translateSvg(el);

        return {
            x: app.utils.pageX(e) - pos.x,
            y: app.utils.pageY(e) - pos.y
        };
    };


    app.container.addEventListener(app.utils.onDown(), drag);

};
