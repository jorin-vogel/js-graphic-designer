module.exports = function(app, options, update, done) {

    var colorPicker = document.querySelector(options.element);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    colorPicker.appendChild(canvas);


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
        update(colorAtPos(pos));
    };


    var eventPosition = function(e) {
        var rect = e.target.getBoundingClientRect();
        console.log(app.utils.pageY(e) , rect.top , jQuery(document).scrollTop());

        return {
            left: app.utils.pageX(e) - rect.left - jQuery(document).scrollLeft(),
            top: app.utils.pageY(e) - rect.top - jQuery(document).scrollTop()
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
        stop: done
    });


    app.on('ready', loadImage);

};
