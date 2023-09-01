const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = (config) => () => {
    return gulp
        .src(config.paths.js)
        .pipe($.eslint({ configFile: '.eslintrc' }))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
};
