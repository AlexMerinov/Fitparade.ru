const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    overridePattern: false,
    pattern: ['imagemin-jpeg-recompress', 'imagemin-pngquant']
});
const onError = $.notify.onError('Line: <%= error.lineNumber %>: <%= error.message %>\n<%= error.fileName %> title: <%= error.plugin %>');

module.exports = (config) => () => {
    return  gulp.src(`${config.paths.imagmin}`, {since: gulp.lastRun('imagemin')})
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.newer(`${config.paths.dist}/${config.output.images}/`))
        .pipe($.imagemin([
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.mozjpeg({progressive: true}),
            $.imageminJpegRecompress({
                loops  : 6,
                min    : 60,
                max    : 69,
                quality: 'medium'
            }),
            $.imagemin.svgo(),
            $.imagemin.optipng({optimizationLevel: 3}),
            $.imageminPngquant({quality: [.65,.70], speed: 5})
        ], {
            verbose: true
        }))
        .pipe(gulp.dest(`${config.paths.dist}/${config.output.images}/`));
};
