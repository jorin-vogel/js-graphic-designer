module.exports = function(app) {

    var animate = app.utils.animation();


    app.utils.dragDrop({

        element: app.container,

        start: function(e, data) {
            var isElement = e.target.classList.contains(app.config.itemSelectClass);
            if (!isElement) return false;

            e.preventDefault(); // Firefox thing

            data.cursorOffset = calcOffset(e, app.selected);
            app.selected.classList.add(app.config.itemDragClass);
        },

        move: function(e, data) {
            animate(function() {
                app.utils.translateSvg(app.selected, app.utils.pageX(e) - data.cursorOffset.x, app.utils.pageY(e) - data.cursorOffset.y);
                app.emit('move', app.selected);
            });
        },

        stop: function(e) {
            e.preventDefault(); // FF thing

            app.selected.classList.remove(app.config.itemDragClass);
            app.emit('element:change:position', app.selected);
        }

    });


    var calcOffset = function(e, el) {
        var pos = app.utils.translateSvg(el);

        return {
            x: app.utils.pageX(e) - pos.x,
            y: app.utils.pageY(e) - pos.y
        };
    };

};
