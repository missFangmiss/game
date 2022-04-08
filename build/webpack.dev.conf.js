
const 
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

let utils = require('./utils')
let config = require('../config')
let baseWebpackConfig = require('./webpack.base.conf')

process.title = 'ePortal-dev-server';
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: false})
    },
    devtool: false, // see SourceMapDevToolPlugin
    plugins: [
        // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
        new webpack.SourceMapDevToolPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new FriendlyErrorsPlugin()
    ].concat(config.template.map(template => {
        let exChunks = config.isBuild ? ['manifest', 'vendor'] : []
        var options = {
            filename: template.chunkName + '.html',
            template: template.url,
            chunks: [...exChunks, template.chunkName],
            inject: true,
            multihtmlCache: true
        }
        return new HtmlWebpackPlugin(options)
    })),
    optimization: {
        runtimeChunk: false,
        minimize: false,
        noEmitOnErrors: true,
        splitChunks: false
    },
})
