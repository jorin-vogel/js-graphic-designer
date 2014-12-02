module.exports = function(app, options) {


    var back  = options.toBack && document.querySelector(options.toBack);
    var front = options.toFront && document.querySelector(options.toFront);


    app.on('element:select', enableZindex);



    function enableZindex(el) {
        var prev, next;

        function init() {
            app.on('element:unselect', disableZindex);

            if (back) back.addEventListener('click', moveToBack);
            if (front) front.addEventListener('click', moveToFront);
            setRefs();
            if (back)  check(back, prev);
            if (front) check(front, next);
        }

        function setRefs() {
            prev = el.previousElementSibling;
            next = el.nextElementSibling;
        }

        function check(button, neighbor) {
            if (!neighbor || !neighbor.classList.contains(app.config.itemClass)) {
                button.disabled = true;
            }
        }

        function moveToBack() {
            app.svg.insertBefore(el, prev);
            setRefs();
            check(back, prev);
            if (front) front.disabled = false;
            app.emit('element:change:z-index', el);
        }

        function moveToFront() {
            app.svg.insertBefore(el, next.nextElementSibling);
            setRefs();
            check(front, next);
            if (back) back.disabled = false;
            app.emit('element:change:z-index', el);
        }

        function disableZindex() {
            app.off('element:unselect', disableZindex);

            if (back)  disable(back, moveToBack);
            if (front) disable(front, moveToFront);
        }

        init();
    }


    function disable(button, handler) {
        button.disabled = false;
        button.removeEventListener('click', handler);
    }

};
