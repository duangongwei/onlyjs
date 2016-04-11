var webpack = require('webpack');

module.exports = {
    entry: {
        login: './src/js/LoginPage.js'
    },
    output: {
        path: './assets',
        filename: '/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.css'],
        root: ['./node_modules']
    },
    module: {
        preLoaders: [
            //{test: /\.jsx$/, loader: 'eslint', exclude: /node_modules/}
        ],
        loaders: [
            {test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.[jpg|png|gif]$/, loader: 'url?limit=8192'}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    node: {
        fs: "empty"
    },
    devtool: 'source-map',
    contentBase: __dirname + '/src/',
    debug: true,
    cache: true
};