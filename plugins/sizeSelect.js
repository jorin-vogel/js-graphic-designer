

var defaults = {
    idAttribute: 'value',
    widthAttribute: 'data-width',
    heightAttribute: 'data-height'
};


function sizeSelect(app, options) {

    var selectBox = document.querySelector(options.element);

    app.on('ready', updateSelection);

    selectBox.addEventListener('change', updateSize);


    function updateSelection() {
        var product = app.svg.getAttribute('data-product');
        if (!product) return;
        selectBox.value = product;
    }


    function updateSize() {
        var selectedOption = selectBox.options[selectBox.selectedIndex];
        var width  = selectedOption.getAttribute(options.widthAttribute);
        var height = selectedOption.getAttribute(options.heightAttribute);
        app.svg.setAttribute('data-product', selectBox.value);
        app.setSize(width, height);
    }

}


sizeSelect.defaults = defaults;

module.exports = sizeSelect;
