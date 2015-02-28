var defaults = {
    readyClass: 'preview-ready'
};


var preview = function(app, options) {

    var tempPng, previewWindow;

    var button = document.querySelector(options.element);

    var windowOptions = [
        'menubar=0',
        'toolbar=0',
        'scrollbars=0',
        'location=0',
        'personalbar=0',
        'status=0',
        'resizable',
        'chrome',
        'centerscreen',
        'dependent',
        'dialog'
    ];


    var openWindow = function() {
        if (previewWindow) previewWindow.close();

        previewWindow = window.open(
            tempPng.url,
            'preview',
            windowOptions.join(',') + ',width=' + tempPng.width + ',height=' + tempPng.height
        );
    };


    button.addEventListener('click', function() {
        if (tempPng) {
            openWindow();
            app.emit('preview:open');
            return;
        }

        app.createPng().then(function(png) {
            tempPng = png;
            document.body.classList.add(options.readyClass);
            document.addEventListener('click', reset);
            app.emit('preview:ready');
        });
    });


    var reset = function() {
        tempPng = undefined;
        document.body.classList.remove(options.readyClass);
        document.removeEventListener('click', reset);
    };

};

preview.defaults = defaults;



module.exports = preview;
