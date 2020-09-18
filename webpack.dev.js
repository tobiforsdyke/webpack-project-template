const path = require('path');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'none',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', //3. third, injects styles into DOM
                    'css-loader', //2. second, turns css into js
                    'sass-loader' //1. this happens first, turns sass into css
                ]
            }
        ]
    }
});