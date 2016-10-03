var webpack = require('webpack');
var JsDocPlugin = require('jsdoc-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    plugins: [
        new JsDocPlugin({
            conf: './Doc/jsdoc.json'
        }),
        new WebpackShellPlugin({ onBuildStart: ['echo "Webpack Start"'], onBuildEnd: ['cp "./bin/app.bundle.js" "GraphicOutput/js/app.bundle.js"'] })
    ]
};