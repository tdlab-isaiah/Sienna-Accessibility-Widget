const  path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    mode: 'development', 
    entry: {
        javascript: "./src/index.js",
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
      },
      resolve: {
        extensions: ['*', '.js']
      },
    watch: true,
    // plugins: [new HtmlWebpackPlugin({template: '../src/index.html'})],
    devServer: {
        static: path.resolve(__dirname, './public'),
        port:3000
    }
};