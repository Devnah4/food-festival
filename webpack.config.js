// adds the path module
const path = require("path");

// Creates the main configuration
// not needed past version 4, but still allows for specificity
module.exports = { 
    // Selects the item to be entered into webpack
    entry: './assets/js/script.js',
    // bundles the inputs into a single file 
    output: {
        // Sets the location of output which should be in a dist folder
        path: path.resolve(__dirname, 'dist'),
        // sets the filename
        filename: 'main.bundle.js'
    },
    // Sets the mode webpack will run
    // default value will be production
    mode: 'development'
}

