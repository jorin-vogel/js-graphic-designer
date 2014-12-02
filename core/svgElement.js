var _ = require('./utils');

module.exports = function(app) {

    var svg = _.createSvg('svg');

    app.container.innerHTML = ''; // empty first
    app.container.appendChild(svg);

    app.svg = svg;

    app.setSize(app.config.width, app.config.height);

    app.emit('loadSvg');

};
