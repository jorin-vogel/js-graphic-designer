// setImmediate polyfill (promisous dependency)
if (!window.setImmediate) window.setImmediate = window.setTimeout;


var graphicDesigner = require('./core');

graphicDesigner.plugins.imageUpload           = require('./plugins/imageUpload');
graphicDesigner.plugins.cache                 = require('./plugins/cache');
graphicDesigner.plugins.deleteButton          = require('./plugins/deleteButton');
graphicDesigner.plugins.zIndexUpdate          = require('./plugins/zIndexUpdate');
graphicDesigner.plugins.backgroundColorPicker = require('./plugins/backgroundColorPicker');
graphicDesigner.plugins.sizeSelect            = require('./plugins/sizeSelect');
graphicDesigner.plugins.scaling               = require('./plugins/scaling');
graphicDesigner.plugins.rotating               = require('./plugins/rotating');


window.graphicDesigner = graphicDesigner;
