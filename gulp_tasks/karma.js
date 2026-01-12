const gulp = require('gulp');
const Karma = require('karma').Server;

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);

function karmaSingleRun(done) {
  new Karma({
    configFile: __dirname + '/../conf/karma.conf.js',
    singleRun: true
  }, done).start();
}

function karmaAutoRun(done) {
  new Karma({
    configFile: __dirname + '/../conf/karma-auto.conf.js'
  }, done).start();
}


