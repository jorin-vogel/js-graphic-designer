var Promise = require('promiscuous');
var readImage = require('./utils/readImage');


function imageUpload(app, options) {


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

    var button = document.querySelector(options.element);
    if (button) button.addEventListener('click', triggerFileInput);

    input.addEventListener('change', function() {
        if (input.files.length !== 1) return;
        readImage(input.files[0]).then(scale).then(center).then(create);
    });


    function dragIn(e) {
        e.preventDefault();
        if (throttle) clearTimeout(throttle);
        dropClass(true);
    }
    function dragOut() {
        if (throttle) clearTimeout(throttle);
        throttle = setTimeout(function() {
            dropClass(false);
        }, 300);
    }
    document.addEventListener('dragenter', dragIn);
    document.addEventListener('dragover', dragIn);
    document.addEventListener('dragleave', dragOut);

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        dropClass(false);
        // TODO: warn on big image size
        uploadDropped(e).then(scale).then(placeAt(e)).then(create);
    });

    function dropClass(active) {
        if (options.dropBodyClass) {
            document.body.classList[active ? 'add' : 'remove'](options.dropBodyClass);
        }
    }

    function uploadDropped(e) {
        if (e.dataTransfer.files.length > 1) return Promise.reject();
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
        var el = app.utils.createSvg('image');
        el.setAttribute('height', image.height);
        el.setAttribute('width', image.width);
        el.setAttribute('class', app.config.itemClass);
        el.setAttributeNS('http://www.w3.org/1999/xlink','href', image.url);

        app.utils.translateSvg(el, image.x, image.y);

        app.svg.appendChild(el);
        app.emit('element:create', el);
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

}

module.exports = imageUpload;
