
const path = require('path');

module.exports = {
    assetsRoot: path.resolve(__dirname, '../src'),
    staticAssets: 'static',
	build: {
        buildRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: './',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
        distIsForServer: false,
    },
    dev: {
        port: 8848,
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        cssSourceMap: true
    },
    commonAlias: {
        'spa@static': 'static',
        'common@lib': 'lib',
        'common@module': 'module',
        'spa@comp_index': 'pages/index/components',
        'spa@comp_admin': 'pages/admin/components',
        'common@api':'api'

    }
}