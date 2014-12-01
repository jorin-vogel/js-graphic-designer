var readImage = require('./utils/readImage');
var _ = require('../core/utils');


module.exports = function(app, options) {

    if (!options) options = {};
    _.defaults(options, { dropZoneClass: 'image-drop' });


    // chrome behaves weird and fires drag enter/leave events randomly
    var throttle;

    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';


    function triggerFileInput() {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, false);
        input.dispatchEvent(event);
    }
    document.querySelector(options.element).addEventListener('click', triggerFileInput);

    input.addEventListener('change', function() {
        // TODO: warn on multiple files
        if (input.files.length !== 1) return;
        readImage(input.files[0]).then(scale).then(center).then(create);
    });


    function dragIn(e) {
        e.preventDefault();
        if (throttle) clearTimeout(throttle);
        // app.el.addClass('image-drop');
    }
    document.addEventListener('dragenter', dragIn);
    document.addEventListener('dragover', dragIn);

        // .on('dragleave', function() {
        //     if (throttle) clearTimeout(throttle);
        //     throttle = setTimeout(function() {
        //         app.el.removeClass('image-drop');
        //     }, 300);
        // })

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        // TODO: warn on big image size
        uploadDropped(e).then(scale).then(placeAt(e)).then(create);
    });


    function uploadDropped(e) {
        // app.el.removeClass('image-drop');
        // TODO: warn on multiple files and return rejected promise
        if (e.dataTransfer.files.length > 1) return;

        return readImage(e.dataTransfer.files[0]);
    }

    // scale to fit in screen
    function scale(image) {
        // NOTE: maybe there is a smarter way for this calcualtion ..
        var rect = app.svg.getBoundingClientRect();
        var factor = Math.min(rect.width / image.width, rect.height / image.height, 1);
        image.width = Math.round(factor * image.width);
        image.height = Math.round(factor * image.height);
        return image;
    }

    function center(image) {
        var rect = app.svg.getBoundingClientRect();
        image.x = Math.round(0.5 * (rect.width - image.width ));
        image.y = Math.round(0.5 * (rect.height - image.height ));
        return image;
    }

    function create(image) {
        var el = _.createSvg('image');
        el.setAttribute('height', image.height);
        el.setAttribute('width', image.width);
        el.setAttribute('class', 'element');
        el.setAttributeNS('http://www.w3.org/1999/xlink','href', image.url);

        _.translateSvg(el, image.x, image.y);

        app.svg.appendChild(el);
        app.emit('create:element', el);
    }

    function placeAt(event) {
        if (event.target !== app.svg) {
            return center;
        }
        return function(image) {
            var rect = app.svg.getBoundingClientRect();
            var top  = rect.top  + document.body.scrollTop;
            var left = rect.left + document.body.scrollLeft;

            image.x = Math.round(event.pageX - left - 0.5 * image.width);
            image.y = Math.round(event.pageY - top  - 0.5 * image.height);

            return image;
        };
    }

    return app;
};
