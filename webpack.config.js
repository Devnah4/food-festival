// adds the path module
const path = require("path");
// adds the webpack module
const webpack = require("webpack");

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
    // connects webpack to the plugins
    plugins: [
        // makes an exception for the variables
        new webpack.ProvidePlugin({
            // defines the plugin values
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    // Sets the mode webpack will run
    // default value will be production
    mode: 'development'
}

