'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, 'src/index'),
    'webpack-hot-middleware/client?reload=true',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __API_URL__: JSON.stringify('http://localhost:3000'),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loaders: ['style', 'css'],
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
