'use strict';

var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  eslint      = require('gulp-eslint'),
  source      = require('vinyl-source-stream'),
  buffer      = require('vinyl-buffer'),
  browserify  = require('browserify'),
  watchify    = require('watchify'),
  babelify    = require('babelify'),
  uglify      = require('gulp-uglify'),
  rename      = require('gulp-rename'),
  lrload      = require('livereactload'),
  browserSync = require('browser-sync'),
  jest        = require('jest-cli');

var isProd = process.env.NODE_ENV === 'production'
var SRC = './src';
var DIST = './dist';
var EXAMPLE_SRC = './example';
var EXAMPLE_DIST = './distExample';

var jestConfig = {
  rootDir: SRC,
  collectCoverage: true
}

gulp.task('test', function (done) {
  jest.runCLI({ config: jestConfig }, '.', function () {
    done();
  })
});

gulp.task('tdd', function () {
  gulp.watch([ jestConfig.rootDir + '/**/*.spec.js' ], ['test']);
});

function createBundler(useWatchify, entry) {
  return browserify({
    entries:        entry || EXAMPLE_SRC + '/index.js',
    exclude:      SRC + '/**/*.spec.js',
    transform:    [[babelify, {}]],
    plugin:       isProd || !useWatchify ? [] : [ lrload ],    // no additional configuration is needed
    debug:        !isProd,
    cache:        {},
    packageCache: {},
    fullPaths:    !isProd                       // for watchify
  })
}

function lint(src, isProd) {
  return gulp.src(`${src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(isProd ? eslint.failOnError() : gutil.noop());
}

gulp.task('statics', function () {
  gulp.src(`${EXAMPLE_SRC}/index.html`).pipe(gulp.dest(EXAMPLE_DIST));
})

gulp.task('bundle', function() {
  var bundler = createBundler(false, SRC + '/index.js');

  lint(SRC, true);

  bundler.bundle()
    .pipe(source('index.js'))
    // .pipe(buffer())
    // .pipe(isProd ? uglify() : gutil.noop())
    // .pipe(isProd ? rename({suffix: '.min'}) : gutil.noop())
    .pipe(gulp.dest(DIST));
});


gulp.task('watch', function() {
  // start JS file watching and rebundling with watchify
  var bundler = createBundler(true)
  var watcher = watchify(bundler)
  rebundle()
  return watcher
    .on('error', gutil.log)
    .on('update', rebundle)

  function rebundle() {
    gutil.log('Update JavaScript bundle')
    lint(SRC, isProd)
    watcher
      .bundle()
      .on('error', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest(isProd ? DIST : EXAMPLE_DIST))
  }
});

gulp.task('serve', ['statics'], function () {
  browserSync({
    browser: 'google chrome',
    server: {
      baseDir: EXAMPLE_DIST,
    },
  });
})

gulp.task('dist', ['bundle'])

gulp.task('default', ['serve', 'watch'])
