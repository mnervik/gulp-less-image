const gulp = require('gulp');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Browser Sync
gulp.task('browser-sync', function () {
    browserSync.init({
        files: ['./app/css/*.css', './app/images/*'],
        server: './app'
    });

    // This is just here to do a manual refresh, because the task asks for it
    browserSync.watch('./app/images/*').on('change', browserSync.reload);

    // If you wanted the site to also do a manual-refresh on .css files, uncomment bellow
    //browserSync.watch('./app/css/*.css').on('change', browserSync.reload);
});

// Compile LESS
gulp.task('less', function () {
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/css'));
});

// Minify Images
gulp.task('imagemin', function () {
    gulp.src('./drop-images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/images'));
});

gulp.task('default', ['less', 'imagemin', 'browser-sync'], function () {
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./drop-images/*', ['imagemin']);
});