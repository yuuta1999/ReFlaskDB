/* eslint-disable no-undef */
/* eslint-disable indent */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/polyfill')

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [{
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      hash: true
    })
  ]
}
