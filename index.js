// promisous dependency
window.setImmediate = window.setTimeout;

var graphicDesigner = require('./core');

graphicDesigner.plugins.imageUpload = require('./plugins/imageUpload');
graphicDesigner.plugins.cache = require('./plugins/cache');
graphicDesigner.plugins.deleteButton = require('./plugins/deleteButton');


window.graphicDesigner = graphicDesigner;
