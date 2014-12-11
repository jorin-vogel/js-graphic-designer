var Promise = require('promiscuous');
var readImage = require('./utils/readImage');


var imageUpload = function(app, options) {

    var button = document.querySelector(options.element);

    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';


    var uploadFromInput = function() {
        singleFile(input.files)
            .then(readImage)
            .then(scale)
            .then(center)
            .then(create);
    };


    var triggerFileInput = function() {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, false);
        input.dispatchEvent(event);
    };


    var uploadFromDrop = function(e) {
        e.preventDefault();
        dropClass(false);
        // TODO: warn on big image size
        singleFile(e.dataTransfer.files)
            .then(readImage)
            .then(scale)
            .then(placeAt(e))
            .then(create);
    };


    var enableDropClass = function(e) {
        e.preventDefault();
        dropClass(true);
    };


    var disableDropClass = function() {
        dropClass(false);
    };


    var debounce = function(func, wait) {
        var timeout, args, next;

        return function debounced() {
            args = arguments;
            if (timeout) {
                next = true;
                return;
            }

            func.apply(null, args);

            timeout = setTimeout(function() {
                clearTimeout(timeout);
                timeout = undefined;
                if (next) {
                    next = false;
                    debounced.apply(null, args);
                }
            }, wait);
        };
    };


    // need to debounce becuase chrome behaves weird
    // and fires drag enter/leave events randomly
    var dropClass = debounce(function(active) {
        if (options.dropBodyClass) {
            document.body.classList[active ? 'add' : 'remove'](options.dropBodyClass);
        }
    }, 300);


    var singleFile = function(files) {
        return files.length === 1 ? Promise.resolve(files[0]) : Promise.reject();
    };


    // scale to fit in screen
    var scale = function(image) {
        // NOTE: maybe there is a smarter way for this calcualtion ..
        var rect = app.svg.getBoundingClientRect();
        var factor = Math.min(rect.width / image.width, rect.height / image.height, 1);

        image.width = Math.round(factor * image.width);
        image.height = Math.round(factor * image.height);
        return image;
    };


    var center = function(image) {
        var rect = app.svg.getBoundingClientRect();
        image.x = Math.round(0.5 * (rect.width - image.width));
        image.y = Math.round(0.5 * (rect.height - image.height));
        return image;
    };


    var create = function(image) {
        var el = app.utils.createSvg('image');

        el.setAttribute('height', image.height);
        el.setAttribute('width', image.width);
        el.setAttribute('class', app.config.itemClass);
        el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', image.url);

        app.utils.translateSvg(el, image.x, image.y);

        app.svg.appendChild(el);
        app.emit('element:create', el);
    };


    var placeAt = function(event) {
        if (event.target !== app.svg) {
            return center;
        }

        return function(image) {
            var rect = app.svg.getBoundingClientRect();
            var top = rect.top + document.body.scrollTop;
            var left = rect.left + document.body.scrollLeft;

            image.x = Math.round(event.pageX - left - 0.5 * image.width);
            image.y = Math.round(event.pageY - top - 0.5 * image.height);

            return image;
        };
    };


    document.addEventListener('dragenter', enableDropClass);
    document.addEventListener('dragover', enableDropClass);
    document.addEventListener('dragleave', disableDropClass);
    document.addEventListener('drop', uploadFromDrop);
    input.addEventListener('change', uploadFromInput);
    if (button) button.addEventListener('click', triggerFileInput);

};


module.exports = imageUpload;
