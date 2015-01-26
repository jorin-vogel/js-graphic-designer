var Promise = require('promiscuous');
var uriToPng = require('../../core/uriToPng');


module.exports = function(file) {

    if (!file.type.match(/image\/*/)) {
        return Promise.reject();
    }

    return new Promise(function(resolve) {

        var reader = new FileReader();

        reader.onloadend = function() {
            var blob = new Blob([this.result], {
                type: file.type
            });
            var url = (window.URL || window.webkitURL || window).createObjectURL(blob);
            resolve(uriToPng(url));
        };

        reader.readAsArrayBuffer(file);

    });

};
