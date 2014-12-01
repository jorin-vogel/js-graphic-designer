var eventEmitter = require('./eventEmitter');
var graphicElement = require('./graphicElement');
var _ = require('./utils');


var graphicDesigner = function(options) {

    var app = {};

    app.config = _.defaults(options || {}, defaults);

    // plugin activation shortcuts
    Object.keys(graphicDesigner).forEach(function(plugin) {
        app[plugin] = function(options) {
            graphicDesigner[plugin](app, options);
        };
    });


    app.setSize = function(width, height) {
        if (app.config.unit === 'mm') {
            width  = mmToInch(width);
            height = mmToInch(height);
        }
        if (app.config.unit !== 'pixel') {
            width  = width  * app.config.dpi;
            height = height * app.config.dpi;
        }
        app.svg.setAttribute('width' , Math.round(width  * app.config.scaleFactor));
        app.svg.setAttribute('height', Math.round(height * app.config.scaleFactor));
    };


    app.eventEmitter();
    app.graphicElement();


    return app;
};


graphicDesigner.eventEmitter = eventEmitter;
graphicDesigner.graphicElement = graphicElement;



var defaults = {
    unit: 'pixel',
    dpi: 300,
    width: 500,
    height: 500,
    scaleFactor: 1,
    selectClass: 'item-selected',
    itemClass: 'item',
    itemSelectClass: 'selected',
    itemDragClass: 'dragging'
};



var mmToInch = function(mm) {
    return Math.round(mm * 3.937) / 100;
};



module.exports = graphicDesigner;
