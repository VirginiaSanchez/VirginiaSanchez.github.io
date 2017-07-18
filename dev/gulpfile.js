'use strict';

/* eslint-disable no-param-reassign */

// TODO: figure out how to use import instead of require
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const del = require('del');
const config = require('./gulp-config');


gulp.task('default', ['server']);
gulp.task('build', ['clean', 'js', 'css', 'html', 'img']);

gulp.task('clean', () => {
  return del.sync(config.buildPaths.base);
});

gulp.task('js', () => {
  return gulp.src(config.srcPaths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.buildPaths.js));
});

gulp.task('css', function () {
  return gulp.src(config.srcPaths.css)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.buildPaths.css))
    .pipe(browserSync.stream());
});


gulp.task('html', function buildHTML() {
  return gulp.src(config.srcPaths.html)
    .pipe(pug({
      verbose: true,
      pretty: true
    }))
    .pipe(rename(function (path) {
      if (path.basename !== 'home') {
        path.dirname = path.basename;
        path.basename = 'index';
      } else {
        path.dirname = '';
        path.basename = 'index';
      }
    }))
    .pipe(gulp.dest(config.buildPaths.html));
});

gulp.task('img', () => {
  gulp.src(config.srcPaths.img)
    .pipe(imagemin())
    .pipe(gulp.dest(config.buildPaths.img))
    .pipe(browserSync.stream());
});

gulp.task('server', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: config.buildPaths.base
    }
  });

  gulp.watch(config.srcPaths.js, ['js']);
  gulp.watch(config.srcPaths.cssAll, ['css']);
  gulp.watch(config.srcPaths.img, ['img']);
  gulp.watch(config.srcPaths.htmlAll, ['html']);
  gulp.watch([config.buildPaths.html + '/**/*', config.buildPaths.js + '/**/*']).on('change', browserSync.reload);
});
