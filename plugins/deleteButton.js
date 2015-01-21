var deleteButton = function(app, options) {

    var button = document.querySelector(options.element);


    var deleteElement = function() {
        if (!app.selected) return;
        if (!window.confirm('Soll das ausgewählte Element echt gelöscht werden?')) return;
        app.selected.parentNode.removeChild(app.selected);
        app.emit('element:delete');
    };


    button.addEventListener('click', deleteElement);

};


module.exports = deleteButton;
