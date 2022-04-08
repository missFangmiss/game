module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                modules: false,
                targets: {
                    browsers: require('./package.json').browserslist
                },
                corejs: 3
            }
        ]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@vue/babel-plugin-transform-vue-jsx',
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
          }, 'vant']
       
    ],
    comments: false,
}
