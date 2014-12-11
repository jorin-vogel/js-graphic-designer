var defaults = {
    widthAttribute: 'data-width',
    heightAttribute: 'data-height'
};


var sizeSelect = function(app, options) {

    var selectBox = document.querySelector(options.element);


    var updateSelection = function() {
        var product = app.svg.getAttribute('data-product');
        if (!product) return;
        selectBox.value = product;
    };


    var updateSize = function() {
        var selectedOption = selectBox.options[selectBox.selectedIndex];
        var width  = selectedOption.getAttribute(options.widthAttribute);
        var height = selectedOption.getAttribute(options.heightAttribute);
        app.svg.setAttribute('data-product', selectBox.value);
        app.setSize(width, height);
    };


    app.on('ready', updateSelection);
    selectBox.addEventListener('change', updateSize);

};


sizeSelect.defaults = defaults;

module.exports = sizeSelect;
