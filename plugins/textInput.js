var colorPicker = require('./utils/colorPicker');
require('./utils/matchesSelector.poly');


var defaults = {
    selectBodyClass: 'text-selected',
    fontSelector: '.text-font',
    fontAttribute: 'data-font',
    color: '#ffffff',
    textWidth: 100,
    textHeight: 30,
    placeholder: 'Insert Text …',
    scaleFactor: 1,
    scaleOffset: 5
};



var textInput = function(app, options) {

    var el;

    var inputField = document.querySelector(options.input);


    var addBodyClass = function() {
        document.body.classList.add(options.selectBodyClass);
    };

    var removeBodyClass = function() {
        document.body.classList.remove(options.selectBodyClass);
    };


    var updateInputs = function(item) {
        if (item.tagName !== 'text') return;

        el = item;

        inputField.value = el.innerHTML;

        addBodyClass();
    };


    var createText = function() {
        var el = app.utils.svgCreate('text');

        var rect = app.svg.getBoundingClientRect();

        el.setAttribute('class', app.config.itemClass);
        el.innerHTML = options.placeholder;

        app.utils.svgTranslate(el, rect.width / 2, rect.height / 2);

        app.svg.appendChild(el);
        app.emit('element:create', el);
    };


    var updateText = function() {
        el.innerHTML = inputField.value || options.placeholder;
        app.emit('element:change:text', el);
        app.emit('resize');
    };


    var resize = function(h) {
        var size = h * options.scaleFactor + options.scaleOffset;
        if (size < options.scaleOffset) return;
        el.style.fontSize = size;
        app.emit('resize');
        app.emit('element:font:resize');
    };


    var updateFont = function(e) {
        if (! e.target.matchesSelector(options.fontSelector) ) return;

        el.style.fontFamily = e.target.getAttribute(options.fontAttribute);
        app.emit('element:change:font', el);
    };


    var updateColor = function(color) {
        el.style.fill = color;
    };


    var colorChange = function() {
        app.emit('element:change:color', el.style.fill);
    };


    colorPicker(app, {
        element: options.colorPicker,
        image: options.colorImage
    }, updateColor, colorChange);


    document.addEventListener('click', updateFont);

    inputField.addEventListener('change', updateText);
    inputField.addEventListener('keyup', updateText);

    document.querySelector(options.createButton)
        .addEventListener('click', createText);

    app.on('element:select', updateInputs);
    app.on('element:unselect', removeBodyClass);
    app.on('text:scale', resize);
};

textInput.defaults = defaults;


module.exports = textInput;
