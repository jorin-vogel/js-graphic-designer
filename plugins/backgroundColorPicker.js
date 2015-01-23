var colorPicker = require('./utils/colorPicker');


var defaults = {
    color: '#ffffff'
};


var backgroundColorPicker = function(app, options) {

    var background;


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


    var update = function(color) {
        background.setAttribute('fill', color);
    };


    var done = function() {
        app.emit('background:change', background.fill);
    };



    colorPicker(app, options, update, done);

    app.on('ready', ensureBackground);

};


backgroundColorPicker.defaults = defaults;

module.exports = backgroundColorPicker;
