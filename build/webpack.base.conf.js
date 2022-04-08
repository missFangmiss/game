const 
    path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader')

let utils = require('./utils')
let config = require('../config')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: config.entry,
    output: {
        path: config.build.buildRoot,
        filename: '[name].[hash].js',
        publicPath: config.isBuild ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.commonAlias
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test')],
                use: [
                    //step-2
                    'babel-loader?cacheDirectory',
                    //step-1
                    'js-conditional-compile-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('font/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                ENV_CONFIG: JSON.stringify(process.env.ENV_CONFIG),
            }
        }),
        // new HtmlWebpackPlugin({
        //     favicon:'./favicon.ico'
        // })
    ],

    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
