var gulp = require('gulp'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st'),
    transform = require('vinyl-transform'),
    browserify = require('browserify');

gulp.task('js', ['es6'], function() {
  var browserified = transform(function(filename) {
    var b = browserify({entries: filename, debug: true, basedir: './build'});
    return b.bundle();
  });

  return gulp.src('build/main.js')
});

gulp.task('es6', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['js'], function(done) {
  http.createServer(
    st({index: 'index.html', cache: false, path: __dirname})
  ).listen(8080, done);
  livereload.listen();
  gulp.watch('src/*', ['js']);
});
