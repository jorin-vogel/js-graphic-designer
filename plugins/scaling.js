var defaults = {
    iconWidth: 20,
    iconHeight: 20
};


var scaling = function(app, options) {

    var el;
    var animate = app.utils.animation();

    var scaler = app.utils.svgCreate('image');
    scaler.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.image);
    scaler.setAttribute('width', options.iconWidth);
    scaler.setAttribute('height', options.iconHeight);

    app.on('element:select', function(item) {
        el = item;
        scaler.setAttribute('x', el.getAttribute('width'));
        scaler.setAttribute('y', el.getAttribute('height'));
        app.selected.appendChild(scaler);
    });

    app.utils.dragDrop({

        element: scaler,

        start: function(e, data) {
            e.stopPropagation();

            var posScaler = scaler.getBoundingClientRect();

            data.offsetX = app.utils.pageX(e) - (posScaler.left + document.body.scrollLeft);
            data.offsetY = app.utils.pageY(e) - (posScaler.top + document.body.scrollTop);

            app.container.classList.add('resizing');
        },

        move: function(e, data) {
            e.preventDefault(); // for touch events

            var minSize = 50 * app.config.scaleFactor;

            animate(function() {
                var posEl = el.getBoundingClientRect();

                var width = app.utils.pageX(e) - data.offsetX - posEl.left;
                var height = app.utils.pageY(e) - data.offsetY - posEl.top;

                // don't make element to small or negative size
                if (width > minSize) {
                    scaler.setAttribute('x', width);
                    app.utils.svgWidth(el, width);
                }
                if (height > minSize) {
                    scaler.setAttribute('y', height);
                    app.utils.svgHeight(el, height);
                }
                app.emit('resize', el);
            });
        },

        stop: function() {
            app.container.classList.remove('resizing');
            app.emit('element:resize', el);
        }

    });

};

scaling.defaults = defaults;


module.exports = scaling;
