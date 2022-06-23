// adds the webpack module
const webpack = require("webpack");
// adds the module for the webpack bundle analyzer
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// adds the module for the webpack pwa manifest
const WebpackPwaManifest = require("webpack-pwa-manifest");
// adds the path module
const path = require("path");


// Creates the main configuration
// not needed past version 4, but still allows for specificity
const config = {
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
        path: path.join(__dirname + "/dist"),
        // sets the filename
        filename: '[name].bundle.js'
    },
    // adds the module for the webpack bundle analyzer
    module: {
        rules: [
            {
                // searches using REGEX for fils with the extension .jpg
                test: /\.(png|jp?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name(file) {
                            // Returns the name with the extension
                            return "[path][name].[ext]"
                        },
                        // Sets the location of the output
                        publicPath(url) {
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
        }),
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            // Sets the start point for the PWA to the location of the manifest
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // tells webpack not to create a unique fingerprint
            fingerprints:  false,
            // determines whether the link to manifest is added to the html
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    // Sets the mode webpack will run
    // default value will be production
    mode: 'development'
}

module.exports = config;