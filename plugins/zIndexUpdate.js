var zIndexUpdate = function(app, options) {

    var prev, next;

    var back = options.toBack && document.querySelector(options.toBack);
    var front = options.toFront && document.querySelector(options.toFront);


    var moveToBack = function() {
        if (!app.selected) return;

        app.svg.insertBefore(app.selected, prev);
        updateSiblings();
        app.emit('element:change:z-index', app.selected);
    };


    var moveToFront = function() {
        if (!app.selected) return;

        app.svg.insertBefore(app.selected, next.nextElementSibling);
        updateSiblings();
        app.emit('element:change:z-index', app.selected);
    };


    var updateSiblings = function() {
        prev = app.selected && app.selected.previousElementSibling;
        next = app.selected && app.selected.nextElementSibling;

        if (back) check(back, prev);
        if (front) check(front, next);
    };


    var check = function(button, neighbor) {
        button.disabled = !neighbor || !neighbor.classList.contains(app.config.itemClass);
    };


    app.on('ready', updateSiblings);
    app.on('element:select', updateSiblings);
    app.on('element:unselect', updateSiblings);
    if (back) back.addEventListener('click', moveToBack);
    if (front) front.addEventListener('click', moveToFront);

};


module.exports = zIndexUpdate;
