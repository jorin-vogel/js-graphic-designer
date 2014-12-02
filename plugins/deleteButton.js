module.exports = function(app, options) {

    var button = document.querySelector(options.element);


    app.on('element:select', enableDelete);



    function enableDelete(el) {
        button.classList.remove('hide');
        button.addEventListener('click', deleteElement);
        app.on('element:unselect', disableDelete);

        function deleteElement() {
            if (!window.confirm('Soll das ausgewählte Element echt gelöscht werden?')) return;
            el.parentNode.removeChild(el);
            button.classList.add('hide');
            button.removeEventListener('click', deleteElement);
            app
                .off('element:unselect', disableDelete)
                .emit('element:delete', el);
        }

        function disableDelete() {
            app.off('element:unselect', disableDelete);

            button.classList.add('hide');
            button.removeEventListener('click', deleteElement);
        }

    }

};
