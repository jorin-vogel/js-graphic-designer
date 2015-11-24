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


    var updateRotaterPos = function() {
        rotater.setAttribute('x', el.getBBox().width);
        rotater.setAttribute('y', -options.iconHeight + el.getBBox().y);
    };

    app.on('element:select', function(item) {
        el = item;
        updateRotaterPos();
        app.selected.appendChild(rotater);
    });

    app.on('resize', updateRotaterPos);

    app.utils.dragDrop({

        element: rotater,

        start: function(e, data) {
            e.stopPropagation();
            e.preventDefault(); // Firefox thing

            var rect = app.svg.getBoundingClientRect();
            data.pos = app.utils.svgTranslate(app.selected);
            data.pos.x += rect.left + jQuery(document).scrollLeft();
            data.pos.y += rect.top + jQuery(document).scrollTop();

            app.container.classList.add('rotating');
        },

        move: function(e, data) {
            e.preventDefault(); // for touch events

            animate(function() {
                var x = app.utils.pageX(e) - data.pos.x;
                var y = data.pos.y - app.utils.pageY(e);
                var alpha = -Math.atan2(y, x) * RAD_TO_DEG;

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
