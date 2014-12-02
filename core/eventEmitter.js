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
        var handlers = events[event];

        // NOTE: doesn't log names for once listeners
        // DEBUG
        console.log('EVENT: ', event, ' => ',
            handlers.map(function(f) {
                return f.name;
            }).join(', ') || 'nothing to do ...'
        );

        for (i = 0, handler; (handler = handlers[i]); ++i) {
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
