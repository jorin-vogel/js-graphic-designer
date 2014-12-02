// promisous dependency
window.setImmediate = window.setTimeout;

var graphicDesigner = require('./core');

graphicDesigner.plugins.imageUpload = require('./plugins/imageUpload');
graphicDesigner.plugins.cache = require('./plugins/cache');
graphicDesigner.plugins.deleteButton = require('./plugins/deleteButton');
graphicDesigner.plugins.zIndexUpdate = require('./plugins/zIndexUpdate');
graphicDesigner.plugins.backgroundColorPicker = require('./plugins/backgroundColorPicker');
graphicDesigner.plugins.sizeSelect = require('./plugins/sizeSelect');


window.graphicDesigner = graphicDesigner;
