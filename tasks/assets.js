const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = (config) => () => {
    return gulp.src(config.paths.fonts, {since: gulp.lastRun('assets')})
        .pipe($.newer(`${config.paths.dist}/${config.output.fonts}/`))
        .pipe(gulp.dest(`${config.paths.dist}/${config.output.fonts}/`));
};
