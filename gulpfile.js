var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var include = require('gulp-include');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

gulp.task('connectDev', function () {
  connect.server({
    root: ['build'],
    port: 8000,
    livereload: true
  });
});

gulp.task('css', function(done) {
  gulp.src('src/css/**/*.css.styl')
    .pipe( stylus({
      errors: true,
      'include css': true,
      'line numbers': true
    }) )
    .pipe( autoprefixer({ cascade: false }) )
    .pipe(rename(function (path) {
      path.basename = path.basename.substr(0, path.basename.length-4);
      path.extname = '.css';
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('js', function(done) {
  gulp.src('src/js/application.js')
    .pipe( include() )
    .pipe(babel({ presets: ['es2015'] }))
    .pipe( gulp.dest('build/js/') )
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('lib', function(done){
  gulp.src('src/js/lib.js')
    .pipe( include() )
    .pipe( gulp.dest('build/js/') )
    .pipe(connect.reload())
    .on('end', done);
})

gulp.task('jade', function(done) {
  gulp.src('src/views/*.html.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename(function (path) {
      path.basename = path.basename.substr(0, path.basename.length-5);
      path.extname = '.html';
    }))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('img', function(done) {
  gulp.src('src/assets/img/**/*').pipe(gulp.dest('build/img')).on('end', done);
});

gulp.task('ico', function(done) {
  gulp.src('src/assets/ico/*').pipe(gulp.dest('build')).on('end', done);
});

gulp.task('font', function(done) {
  gulp.src([
    'src/vendors/fontello/font/**/*',
    'src/assets/font/**/*'
  ]).pipe(gulp.dest('build/font')).on('end', done);
});

gulp.task('assets', ['img', 'font', 'lib', 'ico']);

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.styl', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/views/**/*.jade', ['jade']);
  gulp.watch(['src/img/**/*', 'src/font/**/*'], ['assets']);
});

gulp.task('build', ['css', 'js', 'jade', 'assets']);

gulp.task('default', ['connectDev', 'watch']);
