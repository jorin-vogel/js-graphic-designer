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


    var updateScalerPos = function(elem) {
        scaler.setAttribute('x', (elem || el).getBBox().width);
        scaler.setAttribute('y', (elem || el).getBBox().height);
    };


    app.on('element:select', function(item) {
        // // only enable scaling for images in the moment
        if (item.tagName !== 'image') return;
        el = item;
        updateScalerPos();
        app.selected.appendChild(scaler);
    });

    app.on('resize', updateScalerPos);


    app.utils.dragDrop({

        element: scaler,

        start: function(e, data) {
            e.stopPropagation();
            e.preventDefault(); // Firefox thing

            var posScaler = scaler.getBoundingClientRect();

            data.offsetX = app.utils.pageX(e) - (posScaler.left + document.body.scrollLeft);
            data.offsetY = app.utils.pageY(e) - (posScaler.top);

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

                app.emit('resize');
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
