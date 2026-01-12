const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ]
    },
    port: 3001,
    open: false
  };
};


