module.exports = function(app) {

    var svg = app.utils.createSvg('svg');

    app.container.innerHTML = ''; // empty first
    app.container.appendChild(svg);

    app.svg = svg;

    app.setSize(app.config.width, app.config.height);


    app.emit('svg:load');

};
