// see http://vuejs-templates.github.io/webpack for documentation.
const 
    path = require('path'),
    base = require('./base'),
    fs = require('fs')

function getPath(...args) {
    return path.join(base.assetsRoot, ...args);
}
function mapObject(obj, fun) {
    let result = {};

    Object.keys(obj).forEach(key => {
        let rt = fun(obj[key], key);
        
        if (rt) result[key] = rt;
    })
    return result;
}
function getEntrySetting() {
    let result = {
        entry: {},
        template: []
    }
    const pagesPath = path.resolve('./src/pages')
    fs.readdirSync(pagesPath).forEach(pageFile => {
        var fullPath = pagesPath + '/' + pageFile
        try {
            result.entry[pageFile] = fullPath + '/index.js'
            result.template.push({
                chunkName: path.basename(pageFile),
                url: fullPath + '/template.html'
            })
        }
        catch (e) {
            console.error(fullPath + '/index.js not found.\n', e)
        }
    })
    return result
}
let setting = getEntrySetting()

let baseConfig = Object.assign({}, base, {
    entry: setting.entry,
    template: setting.template,
    commonAlias: mapObject(base.commonAlias, value => getPath(value))
})

module.exports = baseConfig
