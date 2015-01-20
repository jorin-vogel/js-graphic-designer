var defaults = {
    iconWidth: 20,
    iconHeight: 20
};


var RAD_TO_DEG = 180/Math.PI;

var rotating = function(app, options) {

    var el;
    var animate = app.utils.animation();

    var rotater = app.utils.svgCreate('image');
    rotater.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.image);
    rotater.setAttribute('width', options.iconWidth);
    rotater.setAttribute('height', options.iconHeight);


    var setY = function() {
        rotater.setAttribute('x', el.getAttribute('width'));
    };

    app.on('element:select', function(item) {
        el = item;
        setY();
        rotater.setAttribute('y', -options.iconHeight);
        app.selected.appendChild(rotater);
    });

    app.on('resize', setY);

    app.utils.dragDrop({

        element: rotater,

        start: function(e, data) {
            e.stopPropagation();

            var rect = app.svg.getBoundingClientRect();
            var top = rect.top + document.body.scrollTop;
            var left = rect.left + document.body.scrollLeft;
            data.pos = app.utils.svgTranslate(el);
            data.pos.x += left;
            data.pos.y += top;

            data.start = app.utils.svgRotate(el);

            app.container.classList.add('rotating');
        },

        move: function(e, data) {
            e.preventDefault(); // for touch events

            animate(function() {

                var a = data.pos.y - app.utils.pageY(e);
                var b = app.utils.pageX(e) - data.pos.x;
                var alpha = -Math.atan(a, b) * RAD_TO_DEG;
                console.log(alpha)
                app.utils.svgRotate(app.selected, alpha);

                app.emit('rotate', el);
            });
        },

        stop: function() {
            app.container.classList.remove('rotating');
            app.emit('element:rotate', el);
        }

    });

};

rotating.defaults = defaults;


module.exports = rotating;
