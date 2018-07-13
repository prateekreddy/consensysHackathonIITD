const path = require('path');
const gulp = require('gulp');
const gulpIgnore = require('gulp-ignore');
const usemin = require('gulp-usemin');
const minifyHtml = require('gulp-minify-html');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const minifyCss = require('gulp-minify-css');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const htmlhint = require('gulp-htmlhint');
const mocha = require('gulp-mocha');

gulp.task('webpack', ['clean'], function() {
  const webPackConfig = require('./webpack.config.js');
  return gulp
    .src(path.resolve(__dirname, 'webclient', 'App.jsx'))
    .pipe(webpackStream(webPackConfig, webpack))
    .pipe(gulp.dest(path.resolve(__dirname, 'webclient', 'assets')));
});

gulp.task('usemin', ['clean'], function() {
  return gulp
  .src([__dirname,'webclient/*.html','webclient/*.js'])
    .pipe(usemin({
      html: [minifyHtml({
        empty: true
      })],
      js: [uglify(), rev()],
      inlinejs: [uglify()],
      css: [rev()],
      inlinecss: [minifyCss()]
    })).pipe(gulp.dest('dist/webclient/'));
});

gulp.task('copy:package.json', ['clean'], function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:server', ['clean'], function() {
  gulp.src(['server/**/*'])
    .pipe(gulp.dest('dist/server/'));
});

gulp.task('copy:assets', ['clean'], function() {
  gulp.src(['webclient/assets'])
    .pipe(gulp.dest('dist/webclient/'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});
const condition = './key.json';
gulp.task('eslint', function() {
  return gulp.src([
      '!gulpfile.js', 'webpack.config.js', '.eslintrc.js',
      'server/webscokets/key.json',
      'webclient/*.jsx', '!dist/**/*'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIgnore.exclude(condition))
    .pipe(eslint.failAfterError())
    .pipe(eslint.result(result => {
      // Called for each ESLint result.

      if (result.errorCount !== 0) {
        console.log(`ESLint result: ${result.filePath}`);
        console.log(`# Messages: ${result.messages.length}`);
        console.log(`# Warnings: ${result.warningCount}`);
        console.log(`# Errors: ${result.errorCount}`);
        result.messages.forEach(function(info) {

          if (info.severity === 2) {
            console.log('\n\nLine Info       : ' + info.line + ':' +
              info.column +
              '\nError Message   : ' + info.message +
              '\nSource Line     : ' + info.source +
              '\nRule            : ' + info.ruleId + '\n\n');
          }

        })
      }
    }));
});

gulp.task('htmlhint', function() {
  return gulp.src(['webclient/**/*.html', '!node_modules/**/*',
      '!bower_components/**/*', '!dist/**/*'
    ])
    .pipe(htmlhint({
      htmlhintrc: '.htmlhintrc'
    }))
    .pipe(htmlhint.failReporter());
});

gulp.task('test', function() {
  return gulp.src(['test/**/*spec.js', 'test/**/*test.js', 'test/*spec.js',
      'test/**/*test.js', '!node_modules/**/*',
      '!bower_components/**/*'
    ], {
      read: false
    })
    .pipe(mocha());
});

gulp.task('copy', ['copy:package.json', 'copy:server', 'copy:assets']);

gulp.task('build', ['eslint', 'webpack', 'usemin', 'copy']);

gulp.task('lint', ['eslint', 'htmlhint']);

gulp.task('default', ['build']);
