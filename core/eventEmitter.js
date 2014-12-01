module.exports = function(obj) {

    var events = {};
    var slice = [].slice;


    // Infinite handlers support:
    // obj.on = function(event) {
    //     var handlers = slice.call(arguments, 1);
    //     for (var i = 0, handler; (handler = handlers[i]); ++i) {
    //         (events[event] = events[event] || []).push(handler);
    //     }
    //     return obj;
    // };

    obj.on = function(event, handler) {
        (events[event] = events[event] || []).push(handler);
        return obj;
    };


    obj.once = function(event, handler) {
        return obj.on(event, function onceWrapper() {
            handler.apply(null, arguments);
            obj.off(event, onceWrapper);
        });
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


    // obj.stop = function(event, handler) {

    //     if (event === "*") {
    //         events = {};
    //     } else if (handler) {
    //         var arr = events[event];
    //         for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
    //             if (cb === handler) {
    //                 arr.splice(i, 1); i--;
    //             }
    //         }
    //     } else {
    //         event.replace(/\S+/g, function(name) {
    //             events[name] = [];
    //         });
    //     }
    //     return obj;
    // };



    return obj;
};
