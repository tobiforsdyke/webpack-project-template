# WEBPACK

From Webpack Youtube course:
https://www.youtube.com/playlist?list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8

## INSTALL WEBPACK:

~~~npm
npm install --save-dev web pack webpack-cli
~~~

## INSTALL LOADERS & PLUGINS:

~~~
npm install --save-dev css-loader style-loader
npm install --save-dev sass-loader node-sass
npm install --save-dev html-webpack-plugin
npm install --save-dev webpack-merge
npm install --save-dev webpack-dev-server
npm install --save-dev file-loader html-loader
npm install --save-dev clean-webpack-plugin
npm install --save-dev jquery popper.js
npm install --save-dev mini-css-extract-plugin
~~~

(jquery and popper.js are required for bootstrap)

Loaders can be found here: https://webpack.js.org/loaders/
And here: https://github.com/webpack-contrib/awesome-webpack#loaders

## ADD TO PACKAGE.JSON:

  "scripts": {
    "start": "webpack-dev-server --config webpack.dev.js --open",
    "build": "webpack --config webpack.prod.js"
  },

## CREATE WEBPACK.CONFIG.JS FILE:

~~~javascript
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/template.html'
    })],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|webp|avif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'assets'
                    }
                }
            }
        ]
    }
};
~~~



## CREATE WEBPACK.DEV.JS FILE:

~~~javascript
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
~~~



## CREATE WEBPACK.PROD.JS FILE:

~~~javascript
const path = require('path');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(config, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. third, extract CSS into files
                    'css-loader', //2. second, turns css into js
                    'sass-loader' //1. this happens first, turns sass into css
                ]
            }
        ]
    }
});
~~~




++++++++++
++ NOTES ++
++++++++++

mode: "development" - (un-minifies the document, set to production when finalising)
devtool: "none" - (removes the eval stuff in the file, makes easier to read in development)

npm start - (exports files to localhost for development viewing)
npm run build - (exports files in production and creates dust directory)

webpack.config.js - holds all common webpack config settings
webpack.dev.js - holds development specific settings
webpack.prod.js - holds production specific settings