module.exports = function(obj) {

    var events = {};
    var slice = [].slice;


    obj.on = function(event, handler) {
        (events[event] = events[event] || []).push(handler);
        return obj;
    };


    obj.emit = function(event) {
        var i, handler;
        var args = slice.call(arguments, 1);
        var handlers = [];

        // emit sub:events
        var parts = event.split(':');
        for (i = 1; i <= parts.length; i++) {
            var subHandlers = events[parts.slice(0, i).join(':')];
            if (subHandlers) handlers = handlers.concat(subHandlers);
        }

        for (i = 0, handler;
            (handler = handlers[i]); ++i) {
            handler.apply(null, args);
        }

        return obj;
    };


    // remove specific handler or remove all handlers
    obj.off = function(event, handler) {
        if (handler) {
            var handlers = events[event];
            var i = handlers.indexOf(handler);
            if (i >= 0) handlers.splice(i, 1);
        } else {
            events[event] = [];
        }

        return obj;
    };


    return obj;
};
