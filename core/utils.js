// TODO: stolen from lodash

var utils = {};

/** Used to determine if values are of the language type Object */
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional defaults of the same property will be ignored.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The destination object.
 * @param {...Object} [source] The source objects.
 * @param- {Object} [guard] Allows working with `_.reduce` without using its
 *  `key` and `object` arguments as sources.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * var object = { 'name': 'barney' };
 * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'employer': 'slate' }
 */
utils.defaults = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable) return result;
  var args = arguments,
      argsIndex = 0,
      argsLength = typeof guard == 'number' ? 2 : args.length;
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && Object.keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      if (typeof result[index] == 'undefined') result[index] = iterable[index];
    }
    }
  }
  return result;
};



utils.createSvg = function(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
};



utils.translateSvg = function(el) {
    var values = Array.prototype.slice.call(arguments, 1);
    if (values.length) return setProp(el, 'translate', values);

    var prop = getProp(el, 'translate');
    if (!prop) return { x: 0, y: 0 };
    return { x: prop[0], y: prop[prop.length-1] };
};


function setProp(el, prop, values) {
    var old = el.getAttribute('transform');
    var attr;
    if (!old) {
        attr = propStr(prop, values);
    } else if (!old.match(prop)) {
        attr = old + ' ' + propStr(prop, values);
    } else {
        attr = old.replace( new RegExp(prop+'\\((.+?)\\)'), propStr(prop, values) );
    }
    return el.setAttribute('transform', attr);
}

function getProp(el, prop) {
    var attr = el.getAttribute('transform');
    if (!attr) return;
    var raw = attr.match(prop + '\\((.+?)\\)');
    if (!raw) return;
    return raw[1].trim().split(' ').map(function(val) {
        return parseInt(val, 10);
    });
}


function propStr(prop, values) {
    return prop+'('+values.join(' ')+')';
}



utils.animation = function() {

    var ani;

    return function(fn) {
        if (ani) cancelAnimationFrame(ani);
        ani = requestAnimationFrame(fn);
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
