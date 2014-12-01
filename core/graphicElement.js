var _ = require('./utils');

module.exports = function(app) {

    var container = document.querySelector(app.config.element);

    var svg = _.createSvg('svg');

    container.innerHTML = ''; // empty first
    container.appendChild(svg);

    app.svg = svg;

    app.setSize(app.config.width, app.config.height);

    app.emit('svg:loaded');

};
