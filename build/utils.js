var path = require('path')
var config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


exports.assetsPath = function (_path) {
    var assetsSubDirectory = config.isBuild
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.styleLoaders = function (options) {
    options = options || {}
    var cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    function getCssRule(extension, loader, loaderOptions) {
        var use = ['vue-style-loader', cssLoader]

        // rem适配
        use.push(getPostCssLoader(options.sourceMap))

        if (loader) {
            use.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {sourceMap: options.sourceMap})
            })
        }
        if (options.extract) {
            use.splice(1, 0, {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../', // dist/css 相对于 dist 根目录
                }
            })
        }
        return {
            test: new RegExp('\\.' + extension + '$'),
            use: use
        }
    }

    var result = [
        getCssRule('css', false),
        getCssRule('postcss', false),
        getCssRule('less', 'less', { javascriptEnabled: true }),
        getCssRule('sass', 'sass', { indentedSyntax: true }),
        getCssRule('scss', 'sass'),
        getCssRule('stylus', 'stylus'),
        getCssRule('styl', 'stylus')
    ];
    return result;
}
// rem 适配
function getPostCssLoader(sourceMap) {
    return {
        loader: 'postcss-loader',
        options: {
            sourceMap: sourceMap,
            plugins: [
                require('autoprefixer')({
                    overrideBrowserslist: ['iOS >= 7', 'Android >= 5']
                }),
                require('postcss-pxtorem')({
                    // rem 基准度量 16px ≈ 1rem, 数值越小则css数值越大, 反之越小
                    rootValue: 37.5, 
                    propList: ['*']
                })
            ]
        }
    }
}
