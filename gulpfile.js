

var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    min = require('gulp-uglify'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    browser = require("browser-sync").create();

var paths = {
    js : './js/**/*.js',
    jsdir : './js',
    script : './scripts/**/*.js',
    scss : [
        './scss/**/*.scss',
        '!scss/**/*_scsslint_tmp*.scss'
    ],
    cssdir : './css',
    html: './**/*.html'
};

gulp.task('clean', function(){
    del.sync([
        paths.cssdir,
        paths.jsdir
    ]);
});

gulp.task('sass:dev', function(){
    return gulp.src(paths.scss)
            .pipe(sourcemaps.init())
            .pipe(sass({
                sourceComments: 'normal'
                        }).on('error', sass.logError))
            .pipe(size({showFiles: true}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.cssdir))
            .pipe(browser.stream());
});

gulp.task('sass:prod', function(){
    return gulp.src(paths.scss)            
            .pipe(sass({
                outputStyle: 'compressed'
                        }).on('error', sass.logError))
            .pipe(gulp.dest(paths.cssdir))
            
});

gulp.task('watch', function(){
    browser.init({

        server: './'
                    });
    gulp.watch(paths.scss, ['sass.dev']);
    gulp.watch(paths.script, []);
    gulp.watch([paths.html, paths.js]).on('change', browser.reload);
    
});