const 
    opn = require('opn'),
    path = require('path'),
    express = require('express'),
    webpack = require('webpack')

let config = require('../config')

let webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.build.conf') : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
let autoOpenBrowser = !!config.dev.autoOpenBrowser

let app = express()
let compiler = webpack(webpackConfig)

//进度
let readline = require('readline')
compiler.apply(new webpack.ProgressPlugin((percentage, msg) => {
    //移动光标
    readline.clearLine(process.stdout);
    console.log('  ' + (percentage * 100).toFixed(2) + '%', msg);
    readline.moveCursor(process.stdout, 0, -1);
}));

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    serverSideRender: false,
    watchOptions: {
        // ignored: 'node_modules/**/*.js', //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫秒内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
    writeToDisk: false,
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('/static'))
app.use('/', express.static(path.resolve(__dirname, config.assetsRoot)));

let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

let server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}

