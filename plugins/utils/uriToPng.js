var Promise = require('promiscuous');

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');


module.exports = function(url) {

    return new Promise(function(resolve) {

        var image = new Image();

        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            resolve({
                url: canvas.toDataURL('image/png'),
                width: image.width,
                height: image.height
            });
        };

        image.src = url;

    });
};
