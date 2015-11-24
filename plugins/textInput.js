var colorPicker = require('./utils/colorPicker');

var defaults = {
    selectBodyClass: 'text-selected',
    fontSelector: '.text-font',
    fontAttribute: 'data-font',
    color: '#ffffff',
    textWidth: 100,
    textHeight: 30,
    placeholder: 'Insert Text …',
    scaleFactor: 1,
    scaleOffset: 5,
    fontSize: 15
};



var textInput = function(app, options) {

    var el;


    var inputField = document.querySelector(options.input);
    inputField.setAttribute('placeholder', options.placeholder);

    var sizeInputField = document.querySelector(options.sizeInput);
    sizeInputField.value = options.fontSize;
    sizeInputField.setAttribute('min', 0);

    var addBodyClass = function() {
        document.body.classList.add(options.selectBodyClass);
    };

    var removeBodyClass = function() {
        document.body.classList.remove(options.selectBodyClass);
    };


    var updateInputs = function(item) {
        if (item.tagName !== 'text') return;

        el = item;

        inputField.value = el.innerHTML !== options.placeholder ? el.innerHTML : '';
        sizeInputField.value = getFontSize(el);

        app.emit('text:select:font', el.style.fontFamily);
        app.emit('text:select:color', el.style.fill);

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

        inputField.focus();
    };


    var updateText = function() {
        el.innerHTML = inputField.value || options.placeholder;
        app.emit('element:change:text', el);
        app.emit('resize', el);
    };


    var updateSize = function() {
        el.style.fontSize = sizeInputField.value + 'px';
        app.emit('resize', el);
        app.emit('element:font:resize');
    };


    var matchesSelector = function (node, selector) {
        var nodes = (node.parentNode || document).querySelectorAll(selector), i = -1;

        while (nodes[++i] && nodes[i] != node);

        return !!nodes[i];
    };

    var updateFont = function(e) {
        if (! matchesSelector(e.target, options.fontSelector) ) return;

        el.style.fontFamily = e.target.getAttribute(options.fontAttribute);
        app.emit('element:change:font', el);
    };


    var updateColor = function(color) {
        el.style.fill = color;
    };


    var colorChange = function() {
        app.emit('element:change:color', el.style.fill);
    };


    var getFontSize = function(el) {
        return el.style.fontSize.match(/[0-9]+/) || options.fontSize;
    };


    colorPicker(app, {
        element: options.colorPicker,
        image: options.colorImage
    }, updateColor, colorChange);


    document.addEventListener('click', updateFont);

    inputField.addEventListener('change', updateText);
    inputField.addEventListener('input', updateText);
    inputField.addEventListener('keyup', updateText);

    sizeInputField.addEventListener('change', updateSize);
    sizeInputField.addEventListener('input', updateSize);
    sizeInputField.addEventListener('keyup', updateSize);

    document.querySelector(options.createButton)
        .addEventListener('click', createText);

    app.on('element:select', updateInputs);
    app.on('element:unselect', removeBodyClass);

};

textInput.defaults = defaults;


module.exports = textInput;
