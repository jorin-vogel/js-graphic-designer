module.exports = function(app) {


    var animate = app.utils.animation();

    app.container.addEventListener(app.utils.onDown(), drag);

    function drag(e) {
        var el = e.target;
        var notElement = !el.classList.contains(app.config.itemClass);
        if (notElement) return;

        e.preventDefault(); // FF thing

        var pos = calcOffset(e, el);

        el.classList.add(app.config.itemDragClass);

        app.svg.addEventListener(app.utils.onMove(), updatePosition);
        document.addEventListener(app.utils.onUp(), drop);

        function updatePosition(e) {
            animate(function() {
                app.utils.translateSvg(el, app.utils.pageX(e) - pos.x, app.utils.pageY(e) - pos.y);
                app.emit('move', el);
            });
        }

        function drop(e) {
            e.preventDefault(); // FF thing

            app.svg.removeEventListener(app.utils.onMove(), updatePosition);
            document.removeEventListener(app.utils.onUp(), drop);

            el.classList.remove(app.config.itemDragClass);

            app.emit('element:change:position', el);
        }
    }


    function calcOffset(e, el) {
        var pos = app.utils.translateSvg(el);

        return {
            x: app.utils.pageX(e) - pos.x,
            y: app.utils.pageY(e) - pos.y
        };
    }

};


