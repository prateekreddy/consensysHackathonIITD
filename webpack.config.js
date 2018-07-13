const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
        path.resolve(__dirname, 'webclient', 'App.jsx')
    ],
    output: {
        path: path.resolve(__dirname, 'webclient', 'assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-1']
                }
            },
             {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
             }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()
    ],
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    externals: {
      'react/lib/ReactInjection': true
    }
};
