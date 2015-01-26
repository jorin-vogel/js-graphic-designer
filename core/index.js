var eventEmitter = require('./eventEmitter');
var svgElement = require('./svgElement');
var select = require('./select');
var move = require('./move');
var utils = require('./utils');
var uriToPng = require('./uriToPng');


var defaults = {
    width: 500,
    height: 500,
    scaleFactor: 1,
    unit: 'pixel',
    dpi: 300,
    selectBodyClass: 'item-selected',
    itemClass: 'item',
    itemSelectClass: 'selected',
    itemDragClass: 'dragging'
};


var graphicDesigner = function(options) {

    var app = {};

    app.utils = utils;

    app.config = utils.defaults(options, defaults);

    app.container = document.querySelector(app.config.element);

    app.ready = function() {
        app.emit('ready');
        return app;
    };


    app.setSize = function(width, height) {
        if (app.config.unit === 'mm') {
            width = mmToInch(width);
            height = mmToInch(height);
        }
        if (app.config.unit !== 'pixel') {
            width = width * app.config.dpi;
            height = height * app.config.dpi;
        }
        app.svg.setAttribute('width', Math.round(width * app.config.scaleFactor));
        app.svg.setAttribute('height', Math.round(height * app.config.scaleFactor));

        app.emit('svg:resize');

        return app;
    };


    app.createPng = function() {
            app.emit('render');

            var node = app.svg;

            // use original DPI
            var w = parseInt(node.getAttribute('width'), 10);
            var h = parseInt(node.getAttribute('height'), 10);
            node.setAttribute('width' , w / app.config.scaleFactor);
            node.setAttribute('height', h / app.config.scaleFactor);
            node.setAttribute('viewBox', '0 0 '+w+' '+h);

            // http://www.timvasil.com/blog14/post/2014/02/06/How-to-convert-an-SVG-image-into-a-static-image-with-only-JavaScript.aspx
            var svgData = new XMLSerializer().serializeToString(node);
            var blob = new Blob([svgData], { type: 'image/svg+xml' });
            var url = (window.URL || window.webkitURL || window).createObjectURL(blob);

            // reset to work size
            node.setAttribute('width' , w);
            node.setAttribute('height', h);
            node.removeAttribute('viewBox');

            return uriToPng(url);
    };


    // plugin activation shortcuts
    Object.keys(graphicDesigner.plugins).forEach(function(key) {
        app[key] = function(options) {
            var plugin = graphicDesigner.plugins[key];
            plugin(app, utils.defaults(options, plugin.defaults));
            return app;
        };
    });


    eventEmitter(app);
    svgElement(app);
    select(app);
    move(app);


    return app;
};


graphicDesigner.plugins = {};


var mmToInch = function(mm) {
    return Math.round(mm * 3.937) / 100;
};


module.exports = graphicDesigner;
