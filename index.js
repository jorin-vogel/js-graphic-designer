// promisous dependency
window.setImmediate = window.setTimeout;

var graphicDesigner = require('./core');

graphicDesigner.plugins.imageUpload = require('./plugins/imageUpload');


window.graphicDesigner = graphicDesigner;
