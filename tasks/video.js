const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = (config) => () => {
    return gulp
        .src(config.paths.video, { since: gulp.lastRun('video') })
        .pipe($.newer(`${config.paths.dist}/${config.output.video}/`))
        .pipe(gulp.dest(`${config.paths.dist}/${config.output.video}/`));
};
