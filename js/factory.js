/* factory.js */
// this factory returns the Chart Code that was set up to match the .CLASS of the dom element

graphs.factory = function (domElement) {
    for (var type in graphs.types) {
        if ($(domElement).hasClass(type)) {
            var handler = graphs.types[type];
            return handler;
        }
    }
    return null;
};
