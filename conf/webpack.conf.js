const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const conf = require('./gulp.conf');
const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), conf.paths.src, 'index.html'),
      inject: true,
      filename: 'index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [require('autoprefixer')],
        babel: {
          presets: ['es2015', 'react']
        }
      },
      debug: true
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js',
    publicPath: '/'
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), conf.paths.src, 'index.js')
  ]
};
