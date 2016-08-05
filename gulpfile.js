var gulp            = require('gulp');
var browserify      = require('browserify');
var source          = require('vinyl-source-stream');
var tsify           = require('tsify');
var watch           = require('gulp-watch');
var concat          = require('gulp-concat');
var browserSync     = require('browser-sync').create();
var ftpEnv          = require('gulp-ftp-env');
var packageConfig   = require('./package.json');
var jsonFile        = require('jsonfile');
var gutil           = require('gulp-util');
var fileExists      = require('file-exists');

gulp.task('tsc', function() {
    return browserify({debug: true})
        .add('lib/index.ts')
        .plugin(tsify)
        .bundle()
        .on('error', function (e) {
            console.log(e.message);
        })
        .pipe(source('mvc.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('dependencies', function() {
    gulp.src([
        'node_modules/handlebars/dist/handlebars.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', ['dependencies', 'tsc'], function() {
    browserSync.init(['dist/'], {
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['tsc', 'dependencies', 'html']);

gulp.task('html:watch', function () {
    watch('*.html', { ignoreInitial: false })
        .pipe(gulp.dest('dist/'));
});

gulp.task('tsc:watch', ['tsc'], function () {
    watch('lib/*.ts', function() {
        gulp.run('tsc');
    });
});

gulp.task('browser-reload:watch', ['browser-sync'], function () {
    watch('dist/', function() {
        browserSync.reload();
    });
});


gulp.task('default', [
    'html:watch',
    'tsc:watch',
    'browser-reload:watch'
]);


/**
 * FTP
 */
gulp.task('generate-config', function() {
    var file = './config.json';
    var obj = {
        url: 'https://stage.jsbench.org',
        ftp: {
            host: '***.***.***.***',
            port: 21,
            user: '**************',
            pass: '**************',
            remotePath: 'www/mvc'
        }
    };
    if (fileExists(file)) {
        var message = 'The config.json file is already here, check credentials before running "gulp deploy".';
        gutil.log(gutil.colors.magenta(message));
    } else {
        jsonFile.spaces = 4;
        jsonFile.writeFile(file, obj);
        gutil.log(gutil.colors.green('The config.json file was generated.'));
        gutil.log(gutil.colors.green('Update FTP credentials to use "gulp deploy"!'));
    }
});

gulp.task('deploy', ['build'], function() {
    var config = require('./config.json');
    config.ftp.remotePath += "-" + packageConfig.version;

    var url = config.url + config.ftp.remotePath.replace('www', '');
    gutil.log(gutil.colors.green('Pushing to ' + url));

    gulp.src('dist/**').pipe(ftpEnv(config.ftp));
});
