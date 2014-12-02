var _ = require('../core/utils');



module.exports = function(app, options) {

    options = _.defaults(options || {}, {
        color: '#ffffff',
        setButtonColor: true,
        setTextColor: true
    });

    var background;

    var container = document.querySelector(options.element);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    container.appendChild(canvas);

    app.on('ready', ensureBackground);

    container.addEventListener(_.onDown(), startTracking);


    loadImage();



    function ensureBackground() {
        background = app.svg.querySelector('.background');
        if (background) return;
        background = _.createSvg('rect');
        background.setAttribute('fill', options.color);
        background.classList.add('background');
        background.setAttribute('width', '100%');
        background.setAttribute('height', '100%');
        app.svg.insertBefore(background, app.svg.firstChild);
    }


    function loadImage() {
        var image = new Image();
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
        };
        image.src = options.image;
    }


    function startTracking(e) {
        container.addEventListener(_.onMove(), updateBackgroundColor);
        container.addEventListener(_.onUp(), stopTracking);

        updateBackgroundColor(e);
    }


    function stopTracking() {
        container.removeEventListener(_.onMove(), updateBackgroundColor);
        container.removeEventListener(_.onUp(), stopTracking);

        app.emit('background:update', background.fill);
    }


    function updateBackgroundColor(e) {
        e.preventDefault(); // for touch events

        var rect = e.target.getBoundingClientRect();
        var left = _.pageX(e) - rect.left + document.body.scrollLeft;
        var top =  _.pageY(e) - rect.top  + document.body.scrollTop;
        var data = ctx.getImageData(left, top, 1, 1).data;
        var color = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';

        background.setAttribute('fill', color);
    }


};
