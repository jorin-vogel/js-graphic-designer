var defaults = {
    color: '#ffffff'
};


var backgroundColorPicker = function(app, options) {

    var background;

    var colorPicker = document.querySelector(options.element);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    colorPicker.appendChild(canvas);


    var ensureBackground = function() {
        background = app.svg.querySelector('.background') || createBackground();
    };


    var createBackground = function() {
        var bg = app.utils.svgCreate('rect');

        bg.setAttribute('fill', options.color);
        bg.setAttribute('width', '100%');
        bg.setAttribute('height', '100%');
        bg.classList.add('background');

        app.svg.insertBefore(bg, app.svg.firstChild);

        return bg;
    };


    var loadImage = function() {
        var image = new Image();
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
        };
        image.src = options.image;
    };


    var updateBackgroundColor = function(e) {
        e.preventDefault(); // for touch events

        var pos = eventPosition(e);
        background.setAttribute('fill', colorAtPos(pos));
    };


    var eventPosition = function(e) {
        var rect = e.target.getBoundingClientRect();

        return {
            left: app.utils.pageX(e) - rect.left - document.body.scrollLeft,
            top: app.utils.pageY(e) - rect.top - document.body.scrollTop
        };
    };


    var colorAtPos = function(pos) {
        var data = ctx.getImageData(pos.left, pos.top, 1, 1).data;
        return 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
    };


    app.utils.dragDrop({

        element: colorPicker,
        start: updateBackgroundColor,
        move: updateBackgroundColor,

        stop: function() {
            app.emit('background:change', background.fill);
        }

    });


    app
        .on('ready', ensureBackground)
        .on('ready', loadImage);


};


backgroundColorPicker.defaults = defaults;

module.exports = backgroundColorPicker;
