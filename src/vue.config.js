module.exports = {
    devServer: {
        https: true
    },
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        name: 'Drink',
        themeColor: '#0d33f3',
        manifestOptions: {
            background_color: '#337cec'
        }
    },
    configureWebpack: {
        output: {
            filename: 'static/js/[name].[hash].bundle.js',
            chunkFilename: 'static/js/[name].[hash].chunk.js'
        }
    }
};
