var eventEmitter = require('./eventEmitter');
var svgElement = require('./svgElement');
var select = require('./select');
var move = require('./move');
var utils = require('./utils');


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
