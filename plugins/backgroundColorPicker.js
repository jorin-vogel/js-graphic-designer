var defaults = {
    color: '#ffffff'
};

var backgroundColorPicker = function(app, options) {

    var background;

    var container = document.querySelector(options.element);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    container.appendChild(canvas);


    var ensureBackground = function() {
        background = app.svg.querySelector('.background') || createBackground();
    };


    var createBackground = function() {
        var bg = app.utils.createSvg('rect');
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


    var startTracking = function(e) {
        container.addEventListener(app.utils.onMove(), updateBackgroundColor);
        container.addEventListener(app.utils.onUp(), stopTracking);
        updateBackgroundColor(e);
    };


    var stopTracking = function() {
        container.removeEventListener(app.utils.onMove(), updateBackgroundColor);
        container.removeEventListener(app.utils.onUp(), stopTracking);
        app.emit('background:change', background.fill);
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


    app
        .on('ready', ensureBackground)
        .on('ready', loadImage);

    container.addEventListener(app.utils.onDown(), startTracking);

};


backgroundColorPicker.defaults = defaults;

module.exports = backgroundColorPicker;
