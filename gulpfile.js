const { src, dest, parallel, watch, task } = require('gulp');
const connect = require('gulp-connect');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const include = require('gulp-include');
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');


function connectDev(cb) {
  connect.server({
    root: ['build'],
    port: 8000,
    livereload: true
  });
  cb();
}

function css(cb) {
  src('src/css/**/*.css.styl')
    .pipe( stylus({
      errors: true,
      'include css': true,
      'line numbers': true
    }) )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename(function (path) {
      path.basename = path.basename.substr(0, path.basename.length-4);
      path.extname = '.css';
    }))
    .pipe(dest('build/css/'))
    .pipe(connect.reload())
    .on('end', cb);
}

function js(cb) {
  src('src/js/application.js')
    .pipe(include())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(dest('build/js/'))
    .pipe(connect.reload())
    .on('end', cb);
}

function lib(cb) {
  src('src/js/lib.js')
    .pipe(include())
    .pipe(dest('build/js/'))
    .pipe(connect.reload())
    .on('end', cb);
}

function templates(cb) {
  src('src/views/*.html.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(rename(function (path) {
      path.basename = path.basename.substr(0, path.basename.length-5);
      path.extname = '.html';
    }))
    .pipe(dest('build/'))
    .pipe(connect.reload())
    .on('end', cb);
  }

function img(cb) {
  src('src/assets/img/**/*')
    .pipe(dest('build/img'))
    .on('end', cb);
}

function ico(cb) {
  src('src/assets/ico/*')
    .pipe(dest('build'))
    .on('end', cb);
}

function doc(cb) {
  src('src/assets/doc/*')
    .pipe(dest('build/doc'))
    .on('end', cb);
}

function font(cb) {
  src([
    'src/vendors/fontello/font/**/*',
    'src/assets/font/**/*'
  ])
    .pipe(dest('build/font'))
    .on('end', cb);
}

const assets = parallel(img, font, lib, ico, doc);

function watchAll(cb) {
  watch('src/css/**/*.styl', css);
  watch('src/js/**/*.js', js);
  watch('src/views/**/*.jade', templates);
  watch(['src/img/**/*', 'src/font/**/*'], assets);
  cb();
}

exports.build = parallel(css, js, templates, assets);
exports.default = parallel(connectDev, watchAll);
