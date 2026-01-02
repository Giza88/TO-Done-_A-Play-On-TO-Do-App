const conf = require('./gulp.conf');

module.exports = function (config) {
  const configuration = {
    files: [
      'node_modules/es6-shim/es6-shim.js',
      conf.path.src('**/*.spec.js')
    ],
    singleRun: false,
    autoWatch: true,
    frameworks: ['jasmine', 'phantomjs-shim'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-phantomjs-shim',
      'karma-webpack'
    ],
    preprocessors: {
      '**/*.spec.js': ['webpack']
    },
    webpack: require('./webpack-test.conf'),
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['coverage', 'progress'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  };

  config.set(configuration);
};

