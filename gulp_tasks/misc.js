const gulp = require('gulp');
const gulpConf = require('../conf/gulp.conf');
const del = require('del');
const path = require('path');

gulp.task('clean', clean);
gulp.task('other', other);

function clean() {
  return del([path.join(gulpConf.paths.dist, '/'), path.join(gulpConf.paths.tmp, '/')]);
}

function other() {
  return gulp.src([
    path.join(gulpConf.paths.src, '/**/*'),
    '!' + path.join(gulpConf.paths.src, '/**/*.{scss,js,html}')
  ])
    .pipe(gulp.dest(gulpConf.paths.tmp));
}

