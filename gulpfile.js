var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var tsify       = require('tsify');

gulp.task('tsc', function() {
    return browserify({debug: true})
        .add('lib/index.ts')
        .plugin(tsify)
        .bundle()
        .on('error', function (e) {
            console.log(e.message);
        })
        .pipe(source('mvc.min.js'))
        .pipe(gulp.dest('dist/'));
});