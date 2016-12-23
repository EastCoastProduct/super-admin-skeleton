'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common-[chunkhash].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __API_URL__: JSON.stringify(process.env.API_URL),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loaders: ['style?singleton', 'css?minimize'],
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['url?limit=10000', 'image-webpack'],
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
    ],
  },
  imageWebpackLoader: {
    gifsicle: {
      optimizationLevel: 3,
    },
    mozjpeg: {
      quality: 65,
    },
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
  },
};
