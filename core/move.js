var _ = require('./utils');

module.exports = function(app) {


    var animate = _.animation();

    app.container.addEventListener(_.onDown(), drag);

    function drag(e) {
        var el = e.target;
        var notElement = !el.classList.contains('element');
        if (notElement) return;

        e.preventDefault(); // FF thing

        var pos = calcOffset(e, el);

        el.classList.add('dragging');

        app.svg.addEventListener(_.onMove(), updatePosition);
        document.addEventListener(_.onUp(), drop);

        function updatePosition(e) {
            animate(function() {
                _.translateSvg(el, _.pageX(e) - pos.x, _.pageY(e) - pos.y);
                app.emit('move', el);
            });
        }

        function drop(e) {
            e.preventDefault(); // FF thing

            app.svg.removeEventListener(_.onMove(), updatePosition);
            document.removeEventListener(_.onUp(), drop);

            el.classList.remove('dragging');

            app.emit('changePosition', el);
        }
    }

};


function calcOffset(e, el) {
    var pos = _.translateSvg(el);

    return {
        x: _.pageX(e) - pos.x,
        y: _.pageY(e) - pos.y
    };
}
