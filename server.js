'use strict';

const config = require('./webpack.config');
const express = require('express');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 9000;
const staticDir = path.join(__dirname, 'dist');
const staticIndex = path.join(staticDir, 'index.html');

app.use(historyApiFallback());
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.use((req, res) => {
  res.sendFile(staticIndex);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
