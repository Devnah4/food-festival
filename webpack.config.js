// adds the module for the webpack bundle analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// adds the path module
const path = require("path");
// adds the webpack module
const webpack = require("webpack");

// Creates the main configuration
// not needed past version 4, but still allows for specificity
module.exports = {
    // Selects the item to be entered into webpack
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js",
    },
    // bundles the inputs into a single file 
    output: {
        // Sets the location of output which should be in a dist folder
        path: __dirname + '/dist',
        // sets the filename
        filename: '[name].bundle.js'
    },
    // adds the module for the webpack bundle analyzer
    module: {
        rules: [
            {
                // searches using REGEX for fils with the extension .jpg
                test: /\.jpg$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name(file) {
                            // Returns the name with the extension
                            return "[path][name].[ext]"
                        },
                        // Sets the location of the output
                        publicPath: function (url) {
                            return url.replace("../", "/assets/")
                        }
                    }
                },
                {
                    loader: 'image-webpack-loader'
                }]
            }
        ]
    },
    // connects webpack to the plugins
    plugins: [
        // makes an exception for the variables
        new webpack.ProvidePlugin({
            // defines the plugin values
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report is sent to an HTML file in dist
        })
    ],
    // Sets the mode webpack will run
    // default value will be production
    mode: 'development'
}

