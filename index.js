// promisous dependency
window.setImmediate = window.setTimeout;

var graphicDesigner = require('./core');

graphicDesigner.plugins.imageUpload = require('./plugins/imageUpload');
graphicDesigner.plugins.cache = require('./plugins/cache');


window.graphicDesigner = graphicDesigner;
