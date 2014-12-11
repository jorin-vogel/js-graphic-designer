var deleteButton = function(app, options) {

    var button = document.querySelector(options.element);


    var deleteElement = function() {
        if (!app.selected) return;
        if (!window.confirm('Soll das ausgewählte Element echt gelöscht werden?')) return;

        app.selected.parentNode.removeChild(app.selected);
        button.classList.add('hide');
        button.removeEventListener('click', deleteElement);
        app.emit('element:delete', app.selected);
    };


    button.addEventListener('click', deleteElement);

};


module.exports = deleteButton;
