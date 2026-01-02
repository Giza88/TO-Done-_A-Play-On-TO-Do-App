const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"test"'
    })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json']
  },
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  entry: path.join(process.cwd(), conf.paths.src, 'index.js')
};
