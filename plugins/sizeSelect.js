var _ = require('../core/utils');


module.exports = function(app, options) {

    options = _.defaults(options || {}, {
        idAttribute: 'value',
        widthAttribute: 'data-width',
        heightAttribute: 'data-height'
    });


    var selectBox = document.querySelector(options.element);

    app.on('ready', updateSelection);

    selectBox.addEventListener('change', updateSize);


    function updateSelection() {
        var product = app.svg.getAttribute('data-product');
        if (!product) return;
        console.log(product)
        selectBox.value = product;
    }


    function updateSize() {
        var selectedOption = selectBox.options[selectBox.selectedIndex];
        var width  = selectedOption.getAttribute(options.widthAttribute);
        var height = selectedOption.getAttribute(options.heightAttribute);
        app.svg.setAttribute('data-product', selectBox.value);
        app.setSize(width, height);
    }

};


