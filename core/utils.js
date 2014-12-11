var utils = {};


utils.createSvg = function(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
};


utils.translateSvg = function(el) {
    var values = Array.prototype.slice.call(arguments, 1);
    if (values.length) return setTransformProp(el, 'translate', values);

    var prop = getTransformProp(el, 'translate');
    if (!prop) return {
        x: 0,
        y: 0
    };
    return {
        x: prop[0],
        y: prop[prop.length - 1]
    };
};


var setTransformProp = function(el, prop, values) {
    var old = el.getAttribute('transform');
    var attr;
    if (!old) {
        attr = toTransformProp(prop, values);
    } else if (!old.match(prop)) {
        attr = old + ' ' + toTransformProp(prop, values);
    } else {
        attr = old.replace(new RegExp(prop + '\\((.+?)\\)'), toTransformProp(prop, values));
    }
    return el.setAttribute('transform', attr);
};

var getTransformProp = function(el, prop) {
    var attr = el.getAttribute('transform');
    if (!attr) return;
    var raw = attr.match(prop + '\\((.+?)\\)');
    if (!raw) return;
    return raw[1].trim().split(' ').map(function(val) {
        return parseInt(val, 10);
    });
};


var toTransformProp = function(prop, values) {
    return prop + '(' + values.join(' ') + ')';
};


utils.animation = function() {

    var ani;

    return function(fn) {
        if (ani) window.cancelAnimationFrame(ani);
        ani = window.requestAnimationFrame(fn);
    };

};


utils.isMobile = function() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
};

utils.pageX = function(e) {
    return utils.isMobile() ? e.originalEvent.touches[0].pageX : e.pageX;
};

utils.pageY = function(e) {
    return utils.isMobile() ? e.originalEvent.touches[0].pageY : e.pageY;
};

utils.onMove = function() {
    return utils.isMobile() ? 'touchmove' : 'mousemove';
};

utils.onDown = function() {
    return utils.isMobile() ? 'touchstart' : 'mousedown';
};

utils.onUp = function() {
    return utils.isMobile() ? 'touchend' : 'mouseup';
};


module.exports = utils;
