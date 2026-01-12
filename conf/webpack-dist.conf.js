const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          'babel-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize!sass-loader!postcss-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true, warnings: false}
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [require('autoprefixer')]
      }
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: 'index-[hash].js'
  },
  entry: `./${conf.paths.src}/index.js`
};


